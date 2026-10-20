import data from '../data/watch.json';
import { RUNGS, type Rung } from '../config';

export interface WatchEvent {
  date: string;
  status: Rung;
  note: string;
}

export interface WatchEntry {
  id: string;
  name: string;
  status: Rung;
  note: string;
  history: WatchEvent[];
}

export const watch = data as { updated: string; entries: WatchEntry[] };

for (const entry of watch.entries) {
  if (!RUNGS.includes(entry.status)) {
    throw new Error(`watch.json: "${entry.id}" has unknown status "${entry.status}"`);
  }
}

export const rungIndex = (status: Rung) => RUNGS.indexOf(status) + 1;

// An entry counts as new if its first recorded event is within the last 30 days
// of the board's update date.
export function isNew(entry: WatchEntry): boolean {
  const first = entry.history[0];
  if (!first || !/new entry/i.test(first.note)) return false;
  const days = (Date.parse(watch.updated) - Date.parse(first.date)) / 86_400_000;
  return days <= 30;
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
