import type { APIContext } from 'astro';
import { url } from '../config';

// Everything is public; point crawlers at the sitemap the build generates.
export function GET(context: APIContext) {
  const sitemap = new URL(url('/sitemap-index.xml'), context.site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
