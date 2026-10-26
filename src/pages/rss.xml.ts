import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, url } from '../config';
import { getIssues, plainTitle } from '../lib/issues';

// Each item carries the full issue as HTML (content:encoded), so feed readers
// and dev.to's RSS import get the whole issue, not just the summary. The HTML
// is the same sanitised output the site renders; site-relative links are made
// absolute so they still work off-site.
export async function GET(context: APIContext) {
  const issues = await getIssues();
  const origin = new URL(context.site!).origin;
  const absolute = (html: string) => html.replace(/(href|src)="\/(?!\/)/g, `$1="${origin}/`);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site).href,
    items: issues.map((i) => {
      const link = new URL(url(`/issues/${i.id}/`), context.site).href;
      const body = absolute(i.rendered?.html ?? `<p>${i.data.summary}</p>`);
      const footer = `<hr /><p><em>Originally published at <a href="${link}">${link}</a>. The full Disruption Watch board is at <a href="${origin}${url('/watch/')}">${origin}${url('/watch/')}</a>.</em></p>`;
      return {
        title: `Ahead of Main #${i.data.issue}: ${plainTitle(i.data.title)}`,
        description: i.data.summary,
        pubDate: i.data.date,
        link,
        categories: i.data.tags,
        content: body + footer,
      };
    }),
    customData: '<language>en-gb</language>',
  });
}
