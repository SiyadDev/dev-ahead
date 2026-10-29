// Compares today's OpenRouter prices with the snapshot the previous run saved,
// prints what changed, and saves today's snapshot for the next run. The
// routine uses the output for the Watch board's price signs, which need an
// earlier price list to compare against.
//
//   npm run prices              compare, print, save
//   npm run prices -- --dry-run compare and print only

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const FILE = 'src/data/openrouter-prices.json';
const API = 'https://openrouter.ai/api/v1/models';
const dryRun = process.argv.includes('--dry-run');

// Per-token prices from the API, as US dollars per million tokens.
const perMillion = (p) => Math.round(Number(p) * 1e6 * 10000) / 10000;

const res = await fetch(API);
if (!res.ok) {
  console.error(`OpenRouter returned HTTP ${res.status}; no snapshot taken.`);
  process.exit(1);
}
const { data } = await res.json();

// Paid models only; batch duplicates, aliases and free variants are dropped
// so the same model isn't counted twice.
const models = data
  .filter((m) => !m.id.endsWith(':batch') && !m.id.startsWith('~') && !m.id.endsWith(':free'))
  .map((m) => ({
    id: m.id,
    created: new Date(m.created * 1000).toISOString().slice(0, 10),
    input: perMillion(m.pricing?.prompt ?? 0),
    output: perMillion(m.pricing?.completion ?? 0),
  }))
  .filter((m) => m.output > 0)
  .sort((a, b) => a.id.localeCompare(b.id));

const today = new Date().toISOString().slice(0, 10);
const prev = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : null;

const fmt = (m) => `$${m.input} in / $${m.output} out`;
const pct = (a, b) => (a === 0 ? 0 : Math.round(((b - a) / a) * 100));

console.log(`# OpenRouter prices, ${today}`);
console.log(`${models.length} paid models (per million tokens).`);

if (!prev) {
  console.log(`\nNo earlier snapshot in ${FILE}, so there is nothing to compare yet. Today's snapshot is the baseline.`);
} else {
  console.log(`Compared with the snapshot from ${prev.date} (${prev.models.length} models).`);
  const before = new Map(prev.models.map((m) => [m.id, m]));
  const now = new Map(models.map((m) => [m.id, m]));
  const cuts = [];
  const rises = [];
  for (const m of models) {
    const p = before.get(m.id);
    if (!p) continue;
    const dIn = pct(p.input, m.input);
    const dOut = pct(p.output, m.output);
    if (dIn === 0 && dOut === 0) continue;
    const line = `- ${m.id}: ${fmt(p)} → ${fmt(m)} (input ${dIn >= 0 ? '+' : ''}${dIn}%, output ${dOut >= 0 ? '+' : ''}${dOut}%)`;
    (dIn > 0 || dOut > 0 ? rises : cuts).push({ line, big: dIn <= -50 || dOut <= -50 });
  }
  const added = models.filter((m) => !before.has(m.id));
  const removed = prev.models.filter((m) => !now.has(m.id));

  const section = (title, rows) => {
    console.log(`\n## ${title} (${rows.length})`);
    console.log(rows.length ? rows.join('\n') : 'None.');
  };
  section('Price cuts of 50% or more on an existing model', cuts.filter((c) => c.big).map((c) => c.line));
  section('Other price cuts on an existing model', cuts.filter((c) => !c.big).map((c) => c.line));
  section('Price rises on an existing model', rises.map((r) => r.line));
  section('New models', added.map((m) => `- ${m.id} (created ${m.created}): ${fmt(m)}`));
  section('Removed models', removed.map((m) => `- ${m.id}: was ${fmt(m)}`));
}

if (dryRun) {
  console.log(`\nDry run: ${FILE} not updated.`);
} else {
  writeFileSync(FILE, JSON.stringify({ date: today, source: API, models }, null, 2) + '\n');
  console.log(`\nSaved today's snapshot to ${FILE}.`);
}
