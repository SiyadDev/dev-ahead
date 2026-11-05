// Compares today's OpenRouter prices with the snapshot the previous run saved,
// prints what changed, and saves today's snapshot for the next run. The
// routine uses the output for the Watch board's price signs, which need an
// earlier price list to compare against.
//
// Prices are compared at each model's own lab: the standard endpoint the lab
// runs itself on OpenRouter (Anthropic for Claude, OpenAI for GPT, Google AI
// Studio for Gemini, DeepSeek for DeepSeek, and so on). OpenRouter's headline
// price follows whichever host is listed first, so it moves when hosts are
// reshuffled even though no lab changed a price. Models only third-party hosts
// serve have no lab price and aren't compared.
//
//   npm run prices              compare, print, save
//   npm run prices -- --dry-run compare and print only

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const FILE = 'src/data/openrouter-prices.json';
const API = 'https://openrouter.ai/api/v1/models';
const dryRun = process.argv.includes('--dry-run');

// The endpoint tag a lab uses for its own standard tier, by model author.
// Authors not listed are tried as their own tag.
const LAB_TAG = {
  google: 'google-ai-studio',
  mistralai: 'mistral',
  'x-ai': 'xai',
  qwen: 'alibaba',
  'meta-llama': 'meta',
  amazon: 'amazon-bedrock',
  'bytedance-seed': 'seed',
};

// A lab's standard endpoint may carry a precision suffix ("z-ai/fp8"); that's
// still its standard tier. Any other suffix (flex, priority, fast, a region) is not.
const PRECISION = /^(fp4|fp8|fp16|bf16|mxfp4|nvfp4|int4|int8)$/;
const isOwnEndpoint = (endpointTag, labTag) => {
  if (endpointTag === labTag) return true;
  const [base, ...rest] = endpointTag.split('/');
  return base === labTag && rest.length === 1 && PRECISION.test(rest[0]);
};

// Per-token prices from the API, as US dollars per million tokens.
const perMillion = (p) => Math.round(Number(p) * 1e6 * 10000) / 10000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, attempt = 0) {
  const res = await fetch(url);
  if (res.status === 429 && attempt < 4) {
    await sleep(2_000 * (attempt + 1));
    return getJson(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`OpenRouter returned HTTP ${res.status} for ${url}`);
  return res.json();
}

let data;
try {
  ({ data } = await getJson(API));
} catch (e) {
  console.error(`${e.message}; no snapshot taken.`);
  process.exit(1);
}

// Paid models only; batch duplicates, aliases and free variants are dropped
// so the same model isn't counted twice.
const models = data
  .filter((m) => !m.id.endsWith(':batch') && !m.id.startsWith('~') && !m.id.endsWith(':free'))
  .map((m) => ({
    id: m.id,
    created: new Date(m.created * 1000).toISOString().slice(0, 10),
    input: perMillion(m.pricing?.prompt ?? 0),
    output: perMillion(m.pricing?.completion ?? 0),
    lab: null,
  }))
  .filter((m) => m.output > 0)
  .sort((a, b) => a.id.localeCompare(b.id));

// The lab's own standard endpoint for each model, six requests at a time.
let failed = 0;
for (let i = 0; i < models.length; i += 6) {
  await Promise.all(
    models.slice(i, i + 6).map(async (m) => {
      const author = m.id.split('/')[0];
      const tag = LAB_TAG[author] ?? author;
      try {
        const { data: d } = await getJson(`${API}/${m.id.split(':')[0]}/endpoints`);
        const eps = d?.endpoints ?? [];
        const own = eps.find((e) => e.tag === tag) ?? eps.find((e) => isOwnEndpoint(e.tag, tag));
        if (own) {
          m.lab = {
            provider: own.provider_name,
            input: perMillion(own.pricing?.prompt ?? 0),
            output: perMillion(own.pricing?.completion ?? 0),
          };
        }
      } catch {
        failed++;
      }
    }),
  );
}

const today = new Date().toISOString().slice(0, 10);
const prev = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : null;
const withLab = models.filter((m) => m.lab);

const fmt = (p) => `$${p.input} in / $${p.output} out`;
const pct = (a, b) => (a === 0 ? 0 : Math.round(((b - a) / a) * 100));

console.log(`# OpenRouter prices, ${today}`);
console.log(
  `${models.length} paid models (per million tokens). ${withLab.length} have a price from their own lab and are compared; ` +
    `${models.length - withLab.length} are served only by third-party hosts and aren't.` +
    (failed ? ` Endpoint lookups failed for ${failed}.` : ''),
);

if (!prev) {
  console.log(`\nNo earlier snapshot in ${FILE}, so there is nothing to compare yet. Today's snapshot is the baseline.`);
} else if (!prev.models.some((m) => 'lab' in m)) {
  console.log(
    `\nThe snapshot from ${prev.date} predates lab prices, so there is nothing to compare at the lab's own price yet. ` +
      `Today's snapshot is the first with lab prices; the next run compares against it.`,
  );
} else {
  console.log(`Compared with the snapshot from ${prev.date}, at each lab's own price.`);
  const before = new Map(prev.models.map((m) => [m.id, m]));
  const now = new Map(models.map((m) => [m.id, m]));
  const cuts = [];
  const rises = [];
  for (const m of withLab) {
    const p = before.get(m.id)?.lab;
    if (!p) continue;
    const dIn = pct(p.input, m.lab.input);
    const dOut = pct(p.output, m.lab.output);
    if (dIn === 0 && dOut === 0) continue;
    const line = `- ${m.id} (${m.lab.provider}): ${fmt(p)} → ${fmt(m.lab)} (input ${dIn >= 0 ? '+' : ''}${dIn}%, output ${dOut >= 0 ? '+' : ''}${dOut}%)`;
    (dIn > 0 || dOut > 0 ? rises : cuts).push({ line, big: dIn <= -50 || dOut <= -50 });
  }
  const added = models.filter((m) => !before.has(m.id));
  const removed = prev.models.filter((m) => !now.has(m.id));

  const section = (title, rows) => {
    console.log(`\n## ${title} (${rows.length})`);
    console.log(rows.length ? rows.join('\n') : 'None.');
  };
  section("Lab price cuts of 50% or more on an existing model", cuts.filter((c) => c.big).map((c) => c.line));
  section('Other lab price cuts on an existing model', cuts.filter((c) => !c.big).map((c) => c.line));
  section('Lab price rises on an existing model', rises.map((r) => r.line));
  section(
    'New models',
    added.map((m) => `- ${m.id} (created ${m.created}): ` + (m.lab ? `${fmt(m.lab)} from ${m.lab.provider}` : `${fmt(m)} (third-party hosts only)`)),
  );
  section('Removed models', removed.map((m) => `- ${m.id}`));
}

if (dryRun) {
  console.log(`\nDry run: ${FILE} not updated.`);
} else {
  writeFileSync(FILE, JSON.stringify({ date: today, source: API, priceBasis: "each lab's own standard endpoint", models }, null, 2) + '\n');
  console.log(`\nSaved today's snapshot to ${FILE}.`);
}
