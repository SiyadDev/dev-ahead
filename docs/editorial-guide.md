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
2. `## The top 3`: three `### 1. …` items, ranked. Each one: a tag line with a confidence level (`**ACT NOW** High confidence.`), what changed (one paragraph), then a paragraph starting `**Why it matters:**`, then a `Source:` line.
3. `## Signal radar`: 2–4 items as `###` headings. The first line of each is a tag and a confidence level, e.g. `**WATCH** Medium confidence.`
4. `## Research frontier`: 0–3 papers. Link the arXiv abstract page. The first line of each is the tag, the confidence level, the horizon and the institution: `**WATCH** Medium confidence. Horizon: 12 months. Tsinghua University.` The horizon is exactly one of `already shipping`, `12 months`, `2+ years`, `may never leave the lab`; any qualification goes in the text, not the horizon. Papers come from the arXiv API and Hugging Face Daily Papers (the routine prompt has the exact queries); the Hugging Face `organization` field is usually the institution. Describe a paper only after reading its abstract page, never from its title or a machine summary. If you couldn't read any paper at source, say so in one line and stop.
5. `## New capabilities to adopt`: things a reader can wire up this week, each with a rough time cost. The first line of each item is its tag on its own (`**ACT NOW**`), or the tag and a confidence level.
6. `## Disruption watch`: a bullet list. First, any forecast that resolved or came due, with its outcome and evidence. Then moved or new entries, naming the signpost that moved each one. Then held entries in a line or two. Link the board as `[Watch page](/watch)`.
7. `## Architecture & practice shifts`: how the way software is built and run is changing, and what a working engineer does differently on Monday. Items open with a tag line, as in New capabilities. (Issues before 27 October 2026 used `## Practice shifts`.)
8. `## This week's experiment`: a 30–90 minute build anyone can do. A `**Build:**` paragraph, then `**Done when:**` and a numbered list.
9. A `---` rule and one italic sourcing line.

## Conventions

- Tags: write exactly `**ACT NOW**`, `**WATCH**` or `**CONTEXT**` at the start of an item. The site turns them into pills; dev.to and LinkedIn show them as bold.
- Tag lines: the tag, then optionally the confidence level, and nothing else on that line (research items add the horizon and institution). The level is exactly `Low confidence.`, `Medium confidence.` or `High confidence.`, or with `, unverified` before the full stop: `**WATCH** Medium confidence, unverified.` There is no other level; "Speculative" is written `Low confidence`. Anything you want to say about the confidence goes in the item's text. The site draws the level as three dots, and as rings instead of solid dots when the item is unverified.
- `npm run check` enforces the tag-line formats for issues dated 27 October 2026 or later. Earlier issues stay as published.
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
- For any entry with new evidence, append `{ "date", "status", "note", "source" }` to its `history` and update its `note`. `source` is the URL the issue cites for that evidence (the first-party page when there is one). Evidence the issue doesn't cite a source for doesn't go on the board; from 27 October 2026, `npm run check` rejects a history entry without a `source`. Older entries without one show "No source cited" on /watch.
- A status changes only with specific evidence, and the issue's Disruption watch section says what moved it.
- A new entry's first history note starts with `New entry.`
- Statuses are exactly: `Watching`, `Accelerating`, `Hitting the market`, `Repricing the work`.

### The register on each entry

Every entry carries a `register`: its claim, one or more forecasts, the signs that move it up or stall it (decided in advance), a comparable past shift, where it's measured, and a review date. The reasoning and the rung rules are in [hypothesis-register.md](hypothesis-register.md); read its section 1 before changing any status.

- **Rung rules.** A status moves up only when the next rung's evidence rule is met, or one of the entry's `movesUpWhen` signs is. Name the rule or sign in the history note and in the issue. A met `stallsWhen` sign is reported, and the entry is held or moved down. A product feature never moves an entry to Repricing the work, and neither does a change in what a tool costs.
- **Forecasts are scored as made.** Never change an existing forecast's `text`, `probability` or `due`. When a forecast's due date has passed, set `outcome` to `"yes"` or `"no"` and `resolvedOn` to the date you marked it, using the source the forecast names, and report it first in the Disruption watch section. If you can't resolve it from that source, leave it open and list it under "Needs your check" in the pull request.
- **Changing your mind** means adding a new forecast with a later due date and saying why in the issue, not editing the old one.
- **New entries** need a full register: a claim, at least one forecast (a whole percentage from 1 to 99, a due date, and wording a stranger could mark right or wrong without an argument), at least one `movesUpWhen` and one `stallsWhen` sign with a number and a source, `measuredBy` and `reviewBy`. `npm run check` rejects an entry without one.
- **Evidence that counts for several entries** is logged on each, but a status change needs at least one piece of evidence unique to that entry.
- **Review dates.** When an entry's `reviewBy` has passed, the issue gives it a one-line review: still on the right rung, and is its forecast still the right test?

