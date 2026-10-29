// Daily signal collector, run by .github/workflows/collect.yml.
//
// The routine's cloud environment can't reach GitHub's API, so this script
// gathers what it needs from inside GitHub Actions and saves it to the
// `collector-data` branch:
//   - repositories gaining attention fast: stars and forks gained over the
//     last day and week, from daily snapshots
//   - where the candidates come from: topic searches, new repos, and GitHub's
//     own trending page (the source most "trending repos" roundups copy)
//   - the share of public pull requests made by coding agents, for the
//     agentic-coding forecast on the Watch board
//
// Stars are attention, not adoption, and they can be bought. Treat a rising
// repo as a lead to read, never as evidence on its own.
//
//   GITHUB_TOKEN=... OUT_DIR=collector-data node scripts/collect-trending.mjs

import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const OUT = process.env.OUT_DIR || 'collector-data';
if (!TOKEN) {
  console.error('Set GITHUB_TOKEN.');
  process.exit(1);
}

const DAY = 86_400_000;
const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * DAY).toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Topics that tend to carry new skills, plugins, MCP servers and dev tools.
const TOPICS = [
  'mcp', 'model-context-protocol', 'mcp-server', 'claude-code', 'claude-code-plugin', 'agent-skills',
  'claude-skills', 'ai-agents', 'coding-agent', 'ai-coding', 'llm-tools', 'cursor', 'copilot',
  'developer-tools', 'devtools', 'cli', 'testing', 'code-review',
];
// Used only to flag repos likely to matter to developers; the routine still judges.
const DEV_RE =
  /\b(mcp|model context protocol|claude|codex|copilot|cursor|gemini|agent|agents|agentic|skill|skills|plugin|plugins|llm|sdk|cli|devtools?|developer|coding|code review|lint|test(s|ing)?|compiler|ide|terminal|framework|inference|api)\b/i;

async function gh(path, attempt = 0) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if ((res.status === 403 || res.status === 429) && attempt < 3) {
    const reset = Number(res.headers.get('x-ratelimit-reset')) * 1000;
    const wait = Math.min(Math.max(reset - Date.now(), 5_000), 65_000);
    console.log(`Rate limited on ${path}; waiting ${Math.round(wait / 1000)}s.`);
    await sleep(wait);
    return gh(path, attempt + 1);
  }
  if (res.status === 404 || res.status === 451) return null;
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res.json();
}

// Search allows 30 requests a minute; space them out.
async function searchRepos(q, perPage = 30) {
  await sleep(2_200);
  const data = await gh(`/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=${perPage}`);
  return data?.items ?? [];
}
async function countIssues(q) {
  await sleep(2_200);
  const data = await gh(`/search/issues?q=${encodeURIComponent(q)}&per_page=1`);
  return data?.total_count ?? null;
}

async function trendingPage(since) {
  const res = await fetch(`https://github.com/trending?since=${since}`, { headers: { 'User-Agent': 'Mozilla/5.0 (ahead-of-main collector)' } });
  if (!res.ok) {
    console.log(`Trending page (${since}) returned HTTP ${res.status}.`);
    return [];
  }
  const html = await res.text();
  return [...new Set([...html.matchAll(/href="\/([\w.-]+\/[\w.-]+)\/stargazers"/g)].map((m) => m[1]))];
}

// --- 1. Candidates ------------------------------------------------------------
const candidates = new Map(); // repo -> Set of reasons
const add = (repo, why) => {
  if (!candidates.has(repo)) candidates.set(repo, new Set());
  candidates.get(repo).add(why);
};

for (const t of TOPICS) {
  for (const r of await searchRepos(`topic:${t} created:>${daysAgo(60)}`, 30)) add(r.full_name, `new in topic:${t}`);
  for (const r of await searchRepos(`topic:${t} stars:>1000 pushed:>${daysAgo(7)}`, 20)) add(r.full_name, `active in topic:${t}`);
}
for (const r of await searchRepos(`created:>${daysAgo(14)} stars:>200`, 50)) add(r.full_name, 'new in the last 14 days');
const onTrending = {};
for (const since of ['daily', 'weekly']) {
  for (const repo of await trendingPage(since)) {
    add(repo, `GitHub trending (${since})`);
    (onTrending[repo] ??= []).push(since);
  }
}
console.log(`${candidates.size} candidates.`);

// --- 2. Tracked set: keep a repo for 30 days after it was last a candidate ------
mkdirSync(join(OUT, 'snapshots'), { recursive: true });
const trackedFile = join(OUT, 'tracked.json');
const tracked = existsSync(trackedFile) ? JSON.parse(readFileSync(trackedFile, 'utf8')) : {};
for (const repo of candidates.keys()) tracked[repo] = today;
for (const [repo, last] of Object.entries(tracked)) if (last < daysAgo(30)) delete tracked[repo];

// --- 3. Today's counts ----------------------------------------------------------
const details = {};
const repos = Object.keys(tracked);
for (let i = 0; i < repos.length; i += 8) {
  await Promise.all(
    repos.slice(i, i + 8).map(async (repo) => {
      const r = await gh(`/repos/${repo}`);
      if (!r || r.archived) return;
      details[repo] = {
        stars: r.stargazers_count,
        forks: r.forks_count,
        description: (r.description ?? '').slice(0, 200),
        topics: r.topics ?? [],
        language: r.language,
        createdAt: r.created_at.slice(0, 10),
        pushedAt: r.pushed_at.slice(0, 10),
      };
    }),
  );
}
const snapshot = Object.fromEntries(Object.entries(details).map(([repo, d]) => [repo, [d.stars, d.forks]]));
writeFileSync(join(OUT, 'snapshots', `${today}.json`), JSON.stringify(snapshot) + '\n');

// Keep 45 days of snapshots.
for (const f of readdirSync(join(OUT, 'snapshots'))) {
  if (f.slice(0, 10) < daysAgo(45)) rmSync(join(OUT, 'snapshots', f));
}

// --- 4. Gains -------------------------------------------------------------------
const dates = readdirSync(join(OUT, 'snapshots')).map((f) => f.slice(0, 10)).filter((d) => d < today).sort();
const load = (d) => (d ? JSON.parse(readFileSync(join(OUT, 'snapshots', `${d}.json`), 'utf8')) : null);
const base1 = dates.at(-1) ?? null; // most recent earlier snapshot
const base7 = dates.filter((d) => d <= daysAgo(7)).at(-1) ?? null; // latest one at least 7 days old
const snap1 = load(base1);
const snap7 = load(base7);
const gain = (snap, repo, i) => (snap && snap[repo] ? details[repo][i === 0 ? 'stars' : 'forks'] - snap[repo][i] : null);

const rows = Object.entries(details).map(([repo, d]) => ({
  repo,
  url: `https://github.com/${repo}`,
  ...d,
  starsGained1d: gain(snap1, repo, 0),
  starsGained7d: gain(snap7, repo, 0),
  forksGained7d: gain(snap7, repo, 1),
  devRelevant: DEV_RE.test(`${repo} ${d.description} ${d.topics.join(' ')}`),
  onTrendingPage: onTrending[repo] ?? [],
  foundBy: [...(candidates.get(repo) ?? ['tracked'])].slice(0, 4),
}));

const rising = rows
  .filter((r) => r.starsGained7d !== null)
  .sort((a, b) => b.starsGained7d - a.starsGained7d)
  .slice(0, 100);
const newRepos = rows
  .filter((r) => r.createdAt >= daysAgo(30))
  .sort((a, b) => b.stars - a.stars)
  .slice(0, 50);

// --- 5. Agent share of public pull requests --------------------------------------
async function prShare(from, to) {
  const range = `created:${from}..${to}`;
  const total = await countIssues(`is:pr is:public ${range}`);
  const claudeCode = await countIssues(`is:pr is:public "Generated with Claude Code" in:body ${range}`);
  const copilotAgent = await countIssues(`is:pr is:public author:app/copilot-swe-agent ${range}`);
  const share = total ? Math.round(((claudeCode + copilotAgent) / total) * 1000) / 10 : null;
  return { from, to, total, claudeCode, copilotAgent, sharePercent: share };
}
const now = new Date();
const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
const lastMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
const iso = (d) => d.toISOString().slice(0, 10);
const prs = {
  lastFullMonth: await prShare(iso(lastMonthStart), iso(new Date(monthStart - DAY))),
  monthToDate: await prShare(iso(monthStart), today),
};

// --- 6. Write -------------------------------------------------------------------
const out = {
  generatedAt: new Date().toISOString(),
  note: 'Stars are attention, not adoption, and can be bought. A rising repo is a lead to read, not evidence on its own.',
  comparedWith: { oneDay: base1, sevenDays: base7 },
  tracked: Object.keys(details).length,
  agentPullRequestShare: prs,
  rising,
  newRepos,
};
writeFileSync(join(OUT, 'trending.json'), JSON.stringify(out, null, 2) + '\n');
writeFileSync(trackedFile, JSON.stringify(tracked, null, 1) + '\n');
writeFileSync(
  join(OUT, 'README.md'),
  `# Collector data

Written daily by \`.github/workflows/collect.yml\` (script: \`scripts/collect-trending.mjs\` on \`main\`). Don't edit by hand.

- \`trending.json\`: repos gaining stars and forks fastest over 7 days (\`rising\`), the biggest repos created in the last 30 days (\`newRepos\`), and the share of public pull requests made by Claude Code or Copilot's coding agent (\`agentPullRequestShare\`).
- \`snapshots/YYYY-MM-DD.json\`: each tracked repo's [stars, forks] that day, kept for 45 days.
- \`tracked.json\`: repos being tracked, with the last day each was a candidate.

Stars are attention, not adoption, and can be bought. Treat a rising repo as a lead to read, not as evidence.
`,
);
console.log(
  `Tracked ${out.tracked}. 7-day gains vs ${base7 ?? 'none yet'}; 1-day vs ${base1 ?? 'none yet'}. ` +
    `Agent PR share, last full month: ${prs.lastFullMonth.sharePercent}%.`,
);
