// Checks every issue and the Watch board before anything is published.
// Runs in CI on each pull request and before each deploy.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readIssue } from './lib.mjs';
import { HORIZONS, STRICT_FROM } from '../src/lib/tagline.mjs';

const DIR = 'src/content/issues';
const RUNGS = ['Watching', 'Accelerating', 'Hitting the market', 'Repricing the work'];
// Each section with the headings it may use. Issues before 27 October 2026
// used "Practice shifts"; later issues use "Architecture & practice shifts".
const SECTIONS = [
  ['The top 3'],
  ['Signal radar'],
  ['Research frontier'],
  ['New capabilities to adopt'],
  ['Disruption watch'],
  ['Architecture & practice shifts', 'Practice shifts'],
  ["This week's experiment"],
];

// Phrases from the private brief that must never reach the public edition.
const PRIVATE = [
  /\bSyd\b/,
  /\bSiyad\b(?!Dev)/,
  /\bRahman\b/,
  /your gap/i,
  /private research brief/i,
  /compiled for/i,
  /\bSovera\b/i,
  /I can'?t see your machine/i,
  /\bDEV Digest\b/i,
  /docs\.google\.com|drive\.google\.com/i,
  /\bfolder ID\b/i,
];

// The tag line each section's items open with (editorial guide, "Tag lines").
// Anything else would render without its confidence mark, or with the wrong one.
const TAG = '\\*\\*(?:ACT NOW|WATCH|CONTEXT)\\*\\*';
const LEVEL = ' (?:Low|Medium|High) confidence(?:, unverified)?\\.';
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const TAGLINES = {
  levelled: [new RegExp(`^${TAG}${LEVEL}$`), '**WATCH** Medium confidence.'],
  paper: [
    new RegExp(`^${TAG}${LEVEL} Horizon: (?:${HORIZONS.map(escape).join('|')})\\. \\S.*$`),
    `**WATCH** Medium confidence. Horizon: 12 months. Institution. (horizon is one of: ${HORIZONS.join(', ')})`,
  ],
  plain: [new RegExp(`^${TAG}(?:${LEVEL})?$`), '**ACT NOW**'],
};
const SECTION_TAGLINE = {
  'The top 3': 'levelled',
  'Signal radar': 'levelled',
  'Research frontier': 'paper',
  'New capabilities to adopt': 'plain',
  'Architecture & practice shifts': 'plain',
};

function checkTaglines(file, body) {
  let section;
  const lines = body.split('\n');
  const opening = new Set();
  lines.forEach((line, i) => {
    const h2 = line.match(/^## (.+)$/);
    if (h2) section = h2[1].trim();
    const rule = SECTION_TAGLINE[section];
    if (rule && /^### /.test(line)) {
      const at = lines.findIndex((l, j) => j > i && l.trim());
      const first = at === -1 ? '' : lines[at];
      opening.add(at);
      const [pattern, example] = TAGLINES[rule];
      if (!pattern.test(first.trim())) {
        fail(`${file}: "${line.slice(4, 60)}" in ${section} must open with a tag line like ${example}; found "${first.slice(0, 60)}"`);
      }
    } else if (!opening.has(i) && new RegExp(`^${TAG}`).test(line) && !Object.values(TAGLINES).some(([p]) => p.test(line.trim()))) {
      fail(`${file}: tag line "${line.slice(0, 60)}" doesn't match any tag-line format in the editorial guide`);
    }
  });
}

const errors = [];
const fail = (msg) => errors.push(msg);

const files = readdirSync(DIR).filter((f) => f.endsWith('.md')).sort();
const numbers = new Map();

for (const file of files) {
  const path = join(DIR, file);
  let issue;
  try {
    issue = readIssue(path);
  } catch (e) {
    fail(e.message);
    continue;
  }
  const { data, body } = issue;

  for (const key of ['title', 'issue', 'date', 'window', 'summary']) {
    if (data[key] === undefined || data[key] === '') fail(`${file}: frontmatter is missing "${key}"`);
  }

  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  if (file !== `${date}.md`) fail(`${file}: file name should match its date (${date}.md)`);

  if (numbers.has(data.issue)) fail(`${file}: issue number ${data.issue} is also used by ${numbers.get(data.issue)}`);
  numbers.set(data.issue, file);

  const tags = data.tags ?? [];
  if (tags.length > 4) fail(`${file}: dev.to allows at most 4 tags`);
  for (const t of tags) if (!/^[a-z0-9]+$/.test(t)) fail(`${file}: tag "${t}" must be lowercase letters and numbers`);

  for (const names of SECTIONS) {
    if (!names.some((name) => body.includes(`\n## ${name}\n`))) fail(`${file}: missing section "## ${names[0]}"`);
  }

  if (date >= STRICT_FROM) checkTaglines(file, body);

  const text = `${JSON.stringify(data)}\n${body}`;
  for (const pattern of PRIVATE) {
    const hit = text.match(pattern);
    if (hit) fail(`${file}: contains private wording "${hit[0]}"`);
  }

  // Raw HTML and script URLs are not allowed: issues are Markdown only.
  const prose = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const tag = prose.match(/<\/?[a-zA-Z][^>]*>/);
  if (tag && !/^<https?:\/\//.test(tag[0])) fail(`${file}: contains raw HTML "${tag[0].slice(0, 40)}"; use Markdown instead`);
  if (/\]\(\s*(javascript|vbscript|data):/i.test(body)) fail(`${file}: contains a script link`);

  if (/\]\((?!https?:\/\/|\/|#|mailto:)/.test(body)) fail(`${file}: has a relative link; use https:// or a site path starting with /`);
}

const sorted = [...numbers.keys()].sort((a, b) => a - b);
sorted.forEach((n, i) => {
  if (n !== i + 1) fail(`issue numbers should run 1..${sorted.length} with no gaps; found ${sorted.join(', ')}`);
});

const watch = JSON.parse(readFileSync('src/data/watch.json', 'utf8'));
const ids = new Set();
for (const e of watch.entries) {
  if (ids.has(e.id)) fail(`watch.json: duplicate id "${e.id}"`);
  ids.add(e.id);
  if (!RUNGS.includes(e.status)) fail(`watch.json: "${e.id}" has unknown status "${e.status}"`);
  for (const h of e.history ?? []) {
    if (!RUNGS.includes(h.status)) fail(`watch.json: "${e.id}" history has unknown status "${h.status}"`);
    if (h.source !== undefined && !/^https:\/\/\S+$/.test(h.source)) {
      fail(`watch.json: "${e.id}" history on ${h.date} has a source that isn't an https URL`);
    }
    if (h.source === undefined && h.date >= STRICT_FROM) {
      fail(`watch.json: "${e.id}" history on ${h.date} has no source; log only evidence the issue cites`);
    }
  }
  if (e.register) checkRegister(e.id, e.register);
  for (const pattern of PRIVATE) {
    const hit = JSON.stringify(e).match(pattern);
    if (hit) fail(`watch.json: "${e.id}" contains private wording "${hit[0]}"`);
  }
}

// The hypothesis register on each entry: a claim, at least one forecast that
// can be scored, and signposts decided in advance (docs/hypothesis-register.md).
function checkRegister(id, r) {
  const isDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);
  const nonEmpty = (s) => typeof s === 'string' && s.trim() !== '';
  const where = `watch.json: "${id}" register`;
  if (!nonEmpty(r.claim)) fail(`${where} has no claim`);
  if (!Array.isArray(r.forecasts) || r.forecasts.length === 0) fail(`${where} needs at least one forecast`);
  for (const f of r.forecasts ?? []) {
    if (!nonEmpty(f.text)) fail(`${where} has a forecast with no text`);
    if (!Number.isInteger(f.probability) || f.probability < 1 || f.probability > 99) {
      fail(`${where} forecast probability must be a whole percentage from 1 to 99`);
    }
    if (!isDate(f.due)) fail(`${where} forecast due date must be YYYY-MM-DD`);
    if (f.outcome !== undefined && !['yes', 'no'].includes(f.outcome)) fail(`${where} forecast outcome must be "yes" or "no"`);
    if (f.outcome !== undefined && !isDate(f.resolvedOn)) fail(`${where} resolved forecast needs resolvedOn as YYYY-MM-DD`);
  }
  for (const key of ['movesUpWhen', 'stallsWhen']) {
    if (!Array.isArray(r[key]) || r[key].length === 0 || !r[key].every(nonEmpty)) fail(`${where} needs at least one "${key}" sign`);
  }
  if (!nonEmpty(r.measuredBy)) fail(`${where} has no measuredBy`);
  if (!isDate(r.reviewBy)) fail(`${where} reviewBy must be YYYY-MM-DD`);
}

if (errors.length) {
  console.error(`Found ${errors.length} problem(s):\n- ${[...new Set(errors)].join('\n- ')}`);
  process.exit(1);
}
console.log(`Checked ${files.length} issue(s) and ${watch.entries.length} Watch entries. No problems found.`);
