// Publishes issues to dev.to with the canonical URL set to the site, so search
// engines credit the original. Usage: node scripts/crosspost-devto.mjs <file>...
// Needs DEVTO_API_KEY (dev.to > Settings > Extensions) and SITE_URL.
import { basename } from 'node:path';
import { readIssue } from './lib.mjs';

const key = process.env.DEVTO_API_KEY;
const site = (process.env.SITE_URL || '').replace(/\/$/, '');
const files = process.argv.slice(2).filter(Boolean);

if (!key) {
  console.log('DEVTO_API_KEY is not set, so nothing was posted to dev.to.');
  process.exit(0);
}
if (!site) {
  console.error('SITE_URL is not set, so the canonical link cannot be built.');
  process.exit(1);
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

  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/vnd.forem.api-v1+json' },
    body: JSON.stringify({
      article: {
        title: `DEV Ahead #${data.issue}: ${data.title}`,
        body_markdown: markdown,
        published: true,
        canonical_url: canonical,
        description: data.summary.slice(0, 250),
        tags: data.tags ?? [],
        series: 'DEV Ahead',
      },
    }),
  });

  if (!res.ok) {
    console.error(`${file}: dev.to returned ${res.status}: ${await res.text()}`);
    process.exitCode = 1;
    continue;
  }
  const article = await res.json();
  console.log(`${file}: posted to ${article.url}`);
}
