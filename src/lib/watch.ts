import real from '../data/watch.json';
import worst from '../data/watch.worst.json';
import { RUNGS, type Rung } from '../config';

export interface WatchEvent {
  date: string;
  status: Rung;
  note: string;
  // The page the evidence came from, as cited in that issue. Optional.
  source?: string;
}

// A dated, checkable prediction. Probability is a whole percentage; when it
// comes due, `outcome` records how it resolved.
export interface WatchForecast {
  text: string;
  probability: number;
  due: string;
  outcome?: 'yes' | 'no';
  resolvedOn?: string;
}

// What the entry claims, how it can be scored, and the evidence, decided in
// advance, that moves its rating. See docs/hypothesis-register.md.
export interface WatchRegister {
  claim: string;
  forecasts: WatchForecast[];
  comparison?: string;
  alreadyMet?: string[];
  movesUpWhen: string[];
  stallsWhen: string[];
  measuredBy: string;
  reviewBy: string;
}

export interface WatchEntry {
  id: string;
  name: string;
  status: Rung;
  note: string;
  history: WatchEvent[];
  register?: WatchRegister;
}

// FIXTURE=worst swaps in a worst-case board for stress-testing the layout locally.
const data = process.env.FIXTURE === 'worst' ? worst : real;
export const watch = data as { updated: string; entries: WatchEntry[] };

for (const entry of watch.entries) {
  if (!RUNGS.includes(entry.status)) {
    throw new Error(`watch.json: "${entry.id}" has unknown status "${entry.status}"`);
  }
}

export const rungIndex = (status: Rung) => RUNGS.indexOf(status) + 1;

// An entry is new if it was added in the latest board update. The home
// page's "This update" line counts the same entries, so the two always agree.
export function isNew(entry: WatchEntry): boolean {
  const first = entry.history[0];
  return entry.history.length === 1 && !!first && /new entry/i.test(first.note) && first.date === watch.updated;
}

export function formatDate(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(`${d}T00:00:00Z`) : d;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// The date an entry reached its current rung: the earliest event in the
// unbroken run of events at that status, counting back from the latest.
export function onRungSince(entry: WatchEntry): string | undefined {
  let since: string | undefined;
  for (const h of [...entry.history].reverse()) {
    if (h.status !== entry.status) break;
    since = h.date;
  }
  return since;
}

// What the latest board update changed: entries added, entries that moved
// rung, and entries that kept their rung but logged new evidence.
export function latestChanges() {
  const added: WatchEntry[] = [];
  const moved: WatchEntry[] = [];
  const held: WatchEntry[] = [];
  for (const e of watch.entries) {
    const last = e.history.at(-1);
    if (!last || last.date !== watch.updated) continue;
    const before = e.history.at(-2);
    if (isNew(e)) added.push(e);
    else if (before && before.status !== last.status) moved.push(e);
    else held.push(e);
  }
  return { added, moved, held };
}

// A readable label for a source link: the publication where it's known,
// otherwise the site's host name.
export function sourceLabel(href: string): string {
  if (/anthropics\/claude-code\/.*CHANGELOG/i.test(href)) return 'Claude Code changelog';
  if (/arxiv\.org/.test(href)) return 'arXiv';
  return new URL(href).hostname.replace(/^www\./, '');
}

export function rungSlug(rung: Rung): string {
  return rung.toLowerCase().replace(/[^a-z]+/g, '-');
}
