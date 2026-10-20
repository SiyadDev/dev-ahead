import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

export function readIssue(path) {
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${path}: missing frontmatter`);
  return { data: parse(match[1]), body: match[2] };
}
