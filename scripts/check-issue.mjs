// Checks every issue and the Watch board before anything is published.
// Runs in CI on each pull request and before each deploy.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readIssue } from './lib.mjs';

const DIR = 'src/content/issues';
const RUNGS = ['Watching', 'Accelerating', 'Hitting the market', 'Repricing the work'];
const SECTIONS = [
  'The top 3',
  'Signal radar',
  'Research frontier',
  'New capabilities to adopt',
  'Disruption watch',
  'Practice shifts',
  "This week's experiment",
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
  /docs\.google\.com|drive\.google\.com/i,
  /\bfolder ID\b/i,
];

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

  for (const section of SECTIONS) {
    if (!body.includes(`\n## ${section}\n`)) fail(`${file}: missing section "## ${section}"`);
  }

  const text = `${JSON.stringify(data)}\n${body}`;
  for (const pattern of PRIVATE) {
    const hit = text.match(pattern);
    if (hit) fail(`${file}: contains private wording "${hit[0]}"`);
  }

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
  }
  for (const pattern of PRIVATE) {
    const hit = JSON.stringify(e).match(pattern);
    if (hit) fail(`watch.json: "${e.id}" contains private wording "${hit[0]}"`);
  }
}

if (errors.length) {
  console.error(`Found ${errors.length} problem(s):\n- ${[...new Set(errors)].join('\n- ')}`);
  process.exit(1);
}
console.log(`Checked ${files.length} issue(s) and ${watch.entries.length} Watch entries. No problems found.`);
