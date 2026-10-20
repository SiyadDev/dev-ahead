# Addition to the DEV Ahead routine prompt

Append this section to the end of the DEV Ahead routine's prompt, after the Google Drive publishing step. Attach the SiyadDev/dev-ahead repository to the routine as a source so the run has a checkout of it.

---

## PUBLIC EDITION: GitHub pull request (after the Drive upload succeeds)

The private brief above stays exactly as it is. Now produce a separate public edition for the open-source site in the `SiyadDev/dev-ahead` repository, which is checked out in your workspace. You draft; Siyad reviews and merges. Never merge the pull request yourself.

1. Read `docs/editorial-guide.md` in the repository and follow it exactly. Read the two most recent files in `src/content/issues/` so the public edition carries its own continuity.
2. Create a branch named `claude/issue-YYYY-MM-DD` (today's date).
3. Write `src/content/issues/YYYY-MM-DD.md` from today's brief, rewritten for public readers:
   - Address the reader as "you". Drop "Your Gap" entirely and turn the experiment into one anyone can do.
   - Cut, or mark as unverified, every item whose only source is a community digest.
   - Use the highest existing `issue` number plus one.
4. Update `src/data/watch.json` from today's Disruption Watch, as the guide describes.
5. Run `npm ci`, then `npm run check`, then `npm run build`. Fix every failure before going on.
6. Commit with the message `Issue N: <title>`, push the branch, and open a pull request titled `DEV Ahead #N: <title>`. The pull request description must contain:
   - **Summary:** two sentences.
   - **Needs your check:** every claim you could not verify at a primary source, as a list, so Siyad knows exactly what to fact-check.
   - **Watch changes:** which entries moved or were added, or "none".
   - **Add your take:** one suggested place in the issue where a paragraph of Siyad's own opinion would add the most, and why.
   - **LinkedIn post draft:** a 120–180 word post announcing the issue, with a hook in the first two lines and the link left as `[link]`. Opinions are fine; do not invent personal experiences or anecdotes. Mark it clearly as a draft.
7. If you cannot open a pull request from this environment, push the branch anyway and put the compare link (`https://github.com/SiyadDev/dev-ahead/compare/main...claude/issue-YYYY-MM-DD`) and the description text in your final summary instead.
8. Note the pull request link in your final summary, next to the Drive file link.

If the repository is not available in your workspace, skip this section, say so in your final summary, and do not fail the run.
