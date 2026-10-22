// Publishes issues to dev.to with the canonical URL set to the site, so search
// engines credit the original. Usage: node scripts/crosspost-devto.mjs <file>...
// Needs DEVTO_API_KEY (dev.to > Settings > Extensions) and SITE_URL.
//
// dev.to is extra reach, not part of publishing: a failure here is reported as
// a warning on the workflow run and never fails it. dev.to can also pick issues
// up through its RSS import (Settings > Extensions > RSS Feeds), which needs no key.
import { basename } from 'node:path';
import { readIssue } from './lib.mjs';

const key = process.env.DEVTO_API_KEY;
const site = (process.env.SITE_URL || '').replace(/\/$/, '');
const files = process.argv.slice(2).filter(Boolean);

// Shows as a yellow annotation on the GitHub Actions run summary.
function warn(message) {
  if (process.env.GITHUB_ACTIONS) console.log(`::warning title=dev.to cross-post skipped::${message}`);
  else console.warn(`Warning: ${message}`);
}

if (!key) {
  console.log('DEVTO_API_KEY is not set, so nothing was posted to dev.to.');
  process.exit(0);
}
if (!site) {
  warn('SITE_URL is not set, so the canonical link cannot be built. Nothing was posted.');
  process.exit(0);
}

// dev.to allows roughly one new article every five minutes and answers 429
// with "try again in N seconds"; wait that long and retry, up to twice.
async function postWithRetry(payload, attempts = 3) {
  for (let i = 1; ; i++) {
    const res = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/vnd.forem.api-v1+json' },
      body: JSON.stringify(payload),
    });
    if (res.status !== 429 || i === attempts) return res;
    const wait = Number((await res.text()).match(/(\d+) seconds/)?.[1] ?? 300) + 10;
    console.log(`dev.to rate limit reached; retrying in ${wait} seconds.`);
    await new Promise((r) => setTimeout(r, wait * 1000));
  }
}

for (const file of files) {
  const { data, body } = readIssue(file);
  if (data.draft) {
    console.log(`${file}: draft, skipped.`);
    continue;
  }
  const slug = basename(file, '.md');
  const canonical = `${site}/issues/${slug}/`;

  const markdown = [
    body
      // Site-relative links become absolute so they work on dev.to.
      .replace(/\]\(\/(?!\/)/g, `](${site}/`)
      .trim(),
    '',
    `*Originally published at [${canonical.replace(/^https?:\/\//, '')}](${canonical}). The full Disruption Watch board is at [${site.replace(/^https?:\/\//, '')}/watch](${site}/watch/).*`,
  ].join('\n');

  let res;
  try {
    res = await postWithRetry({
      article: {
        title: `DEV Ahead #${data.issue}: ${data.title}`,
        body_markdown: markdown,
        published: true,
        canonical_url: canonical,
        description: data.summary.slice(0, 250),
        tags: data.tags ?? [],
        series: 'DEV Ahead',
      },
    });
  } catch (e) {
    warn(`${file}: could not reach dev.to (${e.message}). The site is unaffected.`);
    continue;
  }

  if (res.status === 401) {
    warn(
      `${file}: dev.to rejected the API key (401). Create a new key at https://dev.to/settings/extensions, ` +
        'update the DEVTO_API_KEY repository secret, then re-run this workflow. The site is unaffected.',
    );
    continue;
  }
  if (!res.ok) {
    warn(`${file}: dev.to returned ${res.status}: ${(await res.text()).slice(0, 300)}. The site is unaffected.`);
    continue;
  }
  const article = await res.json();
  console.log(`${file}: posted to ${article.url}`);
}
