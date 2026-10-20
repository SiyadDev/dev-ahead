import { getCollection } from 'astro:content';

export async function getIssues() {
  const all = await getCollection('issues', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
