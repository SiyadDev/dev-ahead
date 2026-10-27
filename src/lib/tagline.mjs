// The calibration vocabulary, shared by the site (rehype-tags.mjs) and by
// `npm run check`, so what the check accepts is what the site can draw.

export const TAGS = { 'ACT NOW': 'act', WATCH: 'watch', CONTEXT: 'context' };

// Dots filled for each level. "Speculative" appears only in issues from before
// STRICT_FROM; the check no longer accepts it.
export const LEVELS = { speculative: 0, low: 1, medium: 2, high: 3 };

export const HORIZONS = ['already shipping', '12 months', '2+ years', 'may never leave the lab'];

// Issues dated on or after this follow the strict tag-line rules in the
// editorial guide. Earlier issues stay as published.
export const STRICT_FROM = '2026-10-27';

// Reads the text after a tag pill ("Medium confidence, unverified." or
// "Medium confidence. Horizon: 12 months. …"): the level, whether the item is
// unverified, and whatever follows the level.
export function parseConfidence(text) {
  const m = text.match(/^\s*(?:(low|medium|high) confidence|(speculative))\b\.?(.*)$/is);
  if (!m) return null;
  return { level: (m[1] ?? m[2]).toLowerCase(), rest: m[3], unverified: /\bunverified\b/i.test(m[3]) };
}
