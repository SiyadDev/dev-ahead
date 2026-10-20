import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, url } from '../config';
import { getIssues } from '../lib/issues';

export async function GET(context: APIContext) {
  const issues = await getIssues();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site).href,
    items: issues.map((i) => ({
      title: `Issue ${i.data.issue}: ${i.data.title}`,
      description: i.data.summary,
      pubDate: i.data.date,
      link: url(`/issues/${i.id}/`),
      categories: i.data.tags,
    })),
    customData: '<language>en-gb</language>',
  });
}
