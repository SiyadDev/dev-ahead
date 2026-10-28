// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeTags from './src/lib/rehype-tags.mjs';

// The deploy workflow sets SITE_URL and BASE_PATH from the repository, so the
// site works at https://<user>.github.io/<repo>/ with no edits. When a custom
// domain is added, set SITE_URL to it and BASE_PATH to "/" (see README).
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // GitHub Pages serves each page at its slashed address and redirects the
  // rest, so every internal link (url() in src/config.ts) ends in a slash.
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [[rehypeTags, { base }]] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
