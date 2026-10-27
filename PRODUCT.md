# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: working developers and tech leads who already read the news and ship software for a
living. They use AI coding tools daily or are being asked to, make tooling and vendor decisions
for a team or for clients, and need to know which changes deserve an afternoon and which can
wait. They are skeptical of hype, benchmark claims and link dumps.

Secondary: the editor's team and LinkedIn network, who arrive one issue at a time, often from a
shared link and without context, so every page has to stand on its own.

Not for: beginners looking for tutorials, readers who want everything that shipped, investors,
anyone who wants their hype confirmed.

## Product Purpose

Ahead of Main is a twice-weekly brief, published at aheadofmain.com, about what's moving
underneath developer news. It closes the gap between when a change becomes visible (a changelog
line, a paper, a pricing page, a default that flipped) and when most developers hear about it.

Success: a reader knows which shifts are real, how sure to be about each, and what to try this
week, and comes back for the next issue.

## Positioning

An early-signal brief, not a news roundup, link digest, hype feed, research newsletter or
tutorial site. What a neighbouring product can't truthfully copy:

- The Disruption Watch board carries ratings from issue to issue on a four-rung ladder
  (Watching, Accelerating, Hitting the market, Repricing the work), and a rating moves only on
  specific evidence.
- Every item carries a tag (ACT NOW, WATCH, CONTEXT); every early signal carries a confidence
  level.
- Sources are linked at the original page; unverified items are marked.
- Every issue ends with a 30–90 minute experiment with a clear "done when".
- Everything lives in a public repository, so anyone can challenge a rating.

## Operating Context

- Issues are written in Markdown (`src/content/issues/*.md`) by a scheduled research routine,
  arrive as pull requests, and are edited by a person before merge. Format rules live in
  `docs/editorial-guide.md`.
- The same Markdown is cross-posted to dev.to and pasted into LinkedIn, and the full issue goes
  out in RSS. It must stay plain and readable there; all visual treatment (tag pills, source
  lines, confidence marks, the experiment block) is applied by the site at build time
  (`src/lib/rehype-tags.mjs`), never by special Markdown.
- The Watch board is data (`src/data/watch.json`), updated each issue, validated by
  `npm run check`.
- Readers arrive on the home page, on an issue from a shared link, or on /watch.

## Capabilities and Constraints

- Static Astro site deployed to GitHub Pages; base path may be a sub-path until the custom
  domain is live.
- No client-side JavaScript beyond what a feature strictly needs (e.g. a copy button).
- Follow paths today: RSS and dev.to. A LinkedIn newsletter is planned (`SITE.linkedinNewsletter`
  in `src/config.ts`, empty until it exists). No email list exists.
- Watch evidence entries may carry an optional source URL; only sources already cited in an
  issue are used.
- Fixed vocabulary: issue, the board, rung, signal, experiment, confidence (low, medium, high).
  The four rung names and the three tag names are never reworded.

## Brand Commitments

`BRAND.md` is binding for name, voice, tagline, claims, core colours (Ink, Paper, Cobalt) and
typefaces (Literata, Schibsted Grotesk, system monospace, split semantically). Byline is the
handle SiyadDev only. No exclamation marks, no emoji in body copy, never "we".

## Evidence on Hand

- Four published issues (12, 15, 19, 22 October 2026) in `src/content/issues`.
- The Watch board with 13 entries and dated history in `src/data/watch.json`.
- Interim favicon (four rising rung bars) in `public/favicon.svg`.
- No reader counts, testimonials, accuracy record or press. None may be invented, and no
  track-record claim for the board until it has history to show.

## Product Principles

1. Early, with evidence: every claim on a page should lead back to its source.
2. Calibrated over exciting: say how sure to be, and never sound surer than the sources.
3. Useful by Monday: the reader should always be able to find the thing to try.
4. Calm, never behind: nothing should make a careful reader feel behind or alarmed.
5. Open: the board, its history and the way to challenge it are always visible.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast at least 4.5:1 (3:1 for large text and meaningful graphics), full
keyboard use with visible focus, correct heading order, 44px touch targets on mobile, and
reduced-motion respected.
