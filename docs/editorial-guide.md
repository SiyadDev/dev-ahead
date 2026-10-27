# Ahead of Main: editorial guide

This is the spec for every public issue. The routine follows it when it drafts an issue, and `npm run check` enforces the parts that can be checked mechanically.

## Who it's for

Working developers and tech leads who already read the news. Write to "you", the reader. The private brief is written to one person; the public edition never is.

## File and frontmatter

One file per issue: `src/content/issues/YYYY-MM-DD.md`, named for the publish date.

```yaml
---
title: "Three short clauses naming the three biggest things"   # under ~110 characters
issue: 4                       # previous highest + 1, no gaps
date: 2026-10-22
window: "19–22 October 2026"   # the period the issue covers
summary: "Two sentences. What moved, and why a developer should care."
tags: [ai, claude, mcp, devops] # max 4, lowercase letters and numbers only (dev.to rule)
---
```

## Sections, in this order, with these exact headings

1. One short intro paragraph (no heading). Say plainly if it was a quiet window.
2. `## The top 3`: three `### 1. …` items, ranked. Each one: what changed (one paragraph), then a paragraph starting `**Why it matters:**`, then a `Source:` line.
3. `## Signal radar`: 2–4 items as `###` headings. The first line of each is a tag and a confidence level, e.g. `**WATCH** Medium confidence.`
4. `## Research frontier`: 0–3 papers. Link the arXiv abstract page. Give the institution and the horizon (`already shipping`, `12 months`, `2+ years`, `may never leave the lab`). Papers come from the arXiv API and Hugging Face Daily Papers (the routine prompt has the exact queries); the Hugging Face `organization` field is usually the institution. Describe a paper only after reading its abstract page, never from its title or a machine summary. If you couldn't read any paper at source, say so in one line and stop.
5. `## New capabilities to adopt`: things a reader can wire up this week, each with a rough time cost.
6. `## Disruption watch`: a bullet list. Moved or new entries first, with the evidence; then held entries in a line or two. Link the board as `[Watch page](/watch)`.
7. `## Architecture & practice shifts`: how the way software is built and run is changing, and what a working engineer does differently on Monday. (Issues before 27 October 2026 used `## Practice shifts`.)
8. `## This week's experiment`: a 30–90 minute build anyone can do. A `**Build:**` paragraph, then `**Done when:**` and a numbered list.
9. A `---` rule and one italic sourcing line.

## Conventions

- Tags: write exactly `**ACT NOW**`, `**WATCH**` or `**CONTEXT**` at the start of an item. The site turns them into pills; dev.to and LinkedIn show them as bold.
- Sources: a paragraph starting `Source:` or `Sources:` with named links, e.g. `Sources: [The New Stack](https://…), [TechNode](https://…)`. Link the original page, never a search results page.
- Links: absolute `https://` links for external pages; site pages as `/watch`.
- Length: 1,200–1,800 words. Cut before you pad.

## Honesty rules

- Items whose only source is a community digest (for example agents-radar) are either cut or marked `unverified` next to the confidence level, with the digest named in the Source line.
- Vendor benchmark and accuracy claims are attributed to the vendor ("Microsoft's own figures").
- No invented personal experience. No "I've watched teams…" or war stories. Opinions are fine; anecdotes need to be real, and only the author can add those.
- If a section has nothing worth reporting, say so in one line.

## Never include

- Anything addressed to one person: names, "your gap", references to the reader's machine, past experiments they did or didn't do.
- Client names, internal project names, employer details, Drive links or folder IDs.
- The private brief's footer.

## The Watch board (`src/data/watch.json`)

- Update `updated` to the issue date.
- For any entry with new evidence, append `{ "date", "status", "note", "source" }` to its `history` and update its `note`. `source` is the URL the issue cites for that evidence (the first-party page when there is one); leave it out when the issue cites none.
- A status changes only with specific evidence, and the issue's Disruption watch section says what moved it.
- A new entry's first history note starts with `New entry.`
- Statuses are exactly: `Watching`, `Accelerating`, `Hitting the market`, `Repricing the work`.
