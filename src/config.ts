// Site-wide settings. Fill in the empty links once the accounts exist;
// anything left empty is hidden on the site.
export const SITE = {
  title: 'Ahead of Main',
  tagline: 'What main hasn’t merged yet.',
  description:
    'A twice-weekly brief on the tooling, AI capabilities and structural shifts that reach developers before they become headlines. Tracks a running Disruption Watch board.',
  author: 'SiyadDev',
  authorUrl: 'https://github.com/SiyadDev',
  // e.g. https://www.linkedin.com/newsletters/ahead-of-main-1234567890/
  linkedinNewsletter: '',
  // e.g. https://www.linkedin.com/in/your-handle/
  linkedinProfile: '',
  // e.g. https://dev.to/your-handle
  devto: 'https://dev.to/siyaddev',
  // Set automatically in GitHub Actions (owner/repo); override here if needed.
  repo: process.env.GITHUB_REPOSITORY ?? '',
  // Cloudflare Web Analytics site token (Cloudflare > Analytics & Logs >
  // Web Analytics > Add a site). It is public: it ends up in every page.
  cloudflareAnalyticsToken: '',
};

// When the routine runs, in UTC. Keep in step with its cron (30 3 * * 1,4).
// The countdown on the site counts down to the next of these.
export const SCHEDULE = {
  weekdays: [1, 4], // Monday, Thursday (0 = Sunday)
  hourUtc: 3,
  minuteUtc: 30,
  label: 'Monday and Thursday',
};

export const RUNGS = [
  'Watching',
  'Accelerating',
  'Hitting the market',
  'Repricing the work',
] as const;

export type Rung = (typeof RUNGS)[number];

export const RUNG_MEANING: Record<Rung, string> = {
  Watching: "Early evidence from at least one primary source: a paper, a prototype, one vendor's beta.",
  Accelerating: 'At least three independent builders or vendors, and a growth measure rising for four weeks or more.',
  'Hitting the market': 'Generally available from at least two major vendors, with evidence of paid use.',
  'Repricing the work': 'Direct evidence that what clients pay for the work, or how teams staff, has changed.',
};

// Prefixes a site-relative path with the configured base path.
// Pages are linked with their trailing slash, the address GitHub Pages serves
// them at, so a click never costs a redirect. Files (/rss.xml) are left alone.
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  const [, page, rest] = clean.match(/^([^#?]*)(.*)$/)!;
  const slashed = page.endsWith('/') || /\.[a-z0-9]+$/i.test(page) ? page : `${page}/`;
  return `${base}${slashed}${rest}`;
}

export const repoUrl = SITE.repo ? `https://github.com/${SITE.repo}` : '';
