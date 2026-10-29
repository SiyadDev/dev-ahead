# Addition to the routine prompt

Append this section to the end of the routine's prompt, after the Google Drive publishing step. Attach the SiyadDev/dev-ahead repository to the routine as a source so the run has a checkout of it.

---

## PUBLIC EDITION: GitHub pull request (after the Drive upload succeeds)

The private brief above stays exactly as it is. Now produce a separate public edition for the open-source site in the `SiyadDev/dev-ahead` repository, which is checked out in your workspace. You draft; the author (SiyadDev) reviews and merges. Never merge the pull request yourself.

1. Read `docs/editorial-guide.md` in the repository and follow it exactly. Read the two most recent files in `src/content/issues/` so the public edition carries its own continuity.
2. Create a branch named `claude/issue-YYYY-MM-DD` (today's date). If this session is only allowed to push to a different branch, use that branch and say so in one line at the top of the pull request.
3. Write `src/content/issues/YYYY-MM-DD.md` from today's brief, rewritten for public readers:
   - Address the reader as "you". Drop "Your Gap" entirely and turn the experiment into one anyone can do.
   - Cut, or mark as unverified, every item whose only source is a community digest.
   - Use the highest existing `issue` number plus one.
   - Keep it to 1,200–1,800 words (link text counts, link addresses don't). `npm run check` rejects an issue over 1,900 words, so cut before you run it.
4. Update `src/data/watch.json` from today's Disruption Watch and the Step 0B signpost check, as the guide describes, including "The register on each entry". Every new entry needs a full register; `npm run check` rejects one without it.
5. Run `npm ci`, then `npm run check`, then `npm run build`. Fix every failure before going on.
6. Commit with the message `Issue N: <title>`, push the branch, and open a pull request titled `Ahead of Main #N: <title>`. The pull request description must contain:
   - **Summary:** two sentences.
   - **Needs your check:** every claim you could not verify at a primary source, as a list, so the author knows exactly what to fact-check.
   - **Watch changes:** forecasts resolved, entries moved or added (with the rule or sign that moved each), or "none".
   - **Signposts checked:** a table from Step 0B: entry, sign, and met / not met / not measurable this run.
   - **Challenged:** the list from the challenge pass: item, the objection, and kept / changed / cut.
   - **Sources checked:** the coverage log from Step 1 as a short table: each fixed source, reached or failed, and how many entries fell inside the window.
   - **Add your take:** one suggested place in the issue where a paragraph of the author's own opinion would add the most, and why.
   - **LinkedIn post draft:** a 120–180 word post announcing the issue, with a hook in the first two lines and the link left as `[link]`. Opinions are fine; do not invent personal experiences or anecdotes. Mark it clearly as a draft.
7. If you cannot open a pull request from this environment, push the branch anyway and put the compare link (`https://github.com/SiyadDev/dev-ahead/compare/main...claude/issue-YYYY-MM-DD`) and the description text in your final summary instead.
8. Note the pull request link in your final summary, next to the Drive file link, and list any fixed source that failed.

If the repository is not available in your workspace, skip this section, say so in your final summary, and do not fail the run.

