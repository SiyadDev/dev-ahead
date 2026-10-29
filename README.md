# Collector data

Written daily by `.github/workflows/collect.yml` (script: `scripts/collect-trending.mjs` on `main`). Don't edit by hand.

- `trending.json`: repos gaining stars and forks fastest over 7 days (`rising`), the biggest repos created in the last 30 days (`newRepos`), and the share of public pull requests made by Claude Code or Copilot's coding agent (`agentPullRequestShare`).
- `snapshots/YYYY-MM-DD.json`: each tracked repo's [stars, forks] that day, kept for 45 days.
- `tracked.json`: repos being tracked, with the last day each was a candidate.

Stars are attention, not adoption, and can be bought. Treat a rising repo as a lead to read, not as evidence.
