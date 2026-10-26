import { getCollection } from 'astro:content';

export async function getIssues() {
  const all = await getCollection('issues', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

// The numbered items under "The top 3", without their "1." prefixes.
export function topThree(headings: Heading[]): Heading[] {
  const start = headings.findIndex((h) => h.depth === 2 && h.slug === 'the-top-3');
  if (start === -1) return [];
  const out: Heading[] = [];
  for (const h of headings.slice(start + 1)) {
    if (h.depth <= 2) break;
    if (h.depth === 3) out.push({ ...h, text: h.text.replace(/^\d+\.\s*/, '') });
  }
  return out;
}

// The issue's sections, each with how many items it holds.
export function sections(headings: Heading[]) {
  const out: (Heading & { items: number })[] = [];
  for (const h of headings) {
    if (h.depth === 2) out.push({ ...h, items: 0 });
    else if (h.depth === 3 && out.length) out[out.length - 1].items++;
  }
  return out;
}

export function tagCounts(markdown: string): Record<'ACT NOW' | 'WATCH' | 'CONTEXT', number> {
  const count = (tag: string) => markdown.split(`**${tag}**`).length - 1;
  return { 'ACT NOW': count('ACT NOW'), WATCH: count('WATCH'), CONTEXT: count('CONTEXT') };
}

// Issue titles are plain strings, but may name code in backticks
// (`CLAUDE_CODE_...`). On the page that becomes <code>; anywhere plain text
// is needed (the <title>, RSS) the backticks are dropped.
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function titleHtml(title: string): string {
  return escapeHtml(title).replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function plainTitle(title: string): string {
  return title.replace(/`/g, '');
}
