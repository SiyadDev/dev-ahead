// Site-wide settings. Fill in the empty links once the accounts exist;
// anything left empty is hidden on the site.
export const SITE = {
  title: 'Ahead of Main',
  tagline: "What main hasn't merged yet.",
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
};

export const RUNGS = [
  'Watching',
  'Accelerating',
  'Hitting the market',
  'Repricing the work',
] as const;

export type Rung = (typeof RUNGS)[number];

// Prefixes a site-relative path with the configured base path.
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

export const repoUrl = SITE.repo ? `https://github.com/${SITE.repo}` : '';
