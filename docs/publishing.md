# Publishing an issue

Twice a week the DEV Ahead routine writes your private brief to Drive and opens a pull request here with the public edition. Publishing it takes about 20 minutes.

## 1. Review the pull request (about 15 minutes)

- Read the **Needs your check** list in the pull request description and check each claim. Cut anything you can't stand behind.
- Read the issue as a stranger would. Does the Top 3 teach something a Hacker News reader doesn't already know?
- Add your own take where the description suggests, or wherever you have a real opinion or experience. This is the part that builds your reputation, so make it yours.
- Edit on GitHub directly, or check out the branch locally and run `npm run dev` to preview.
- The **Check issue** status must be green.

## 2. Merge

Merging to `main` automatically:

- rebuilds and deploys the site, and
- tries to cross-post the issue to dev.to through its API (needs `DEVTO_API_KEY`). If dev.to rejects it, the run shows a yellow warning instead of failing; the site is never affected.

Then, if you use dev.to's RSS import instead (see setup below), open your dev.to dashboard, find the imported draft and press **Publish**.

## 3. Post it to your LinkedIn newsletter (about 5 minutes)

LinkedIn has no API for newsletters, so this step is by hand.

1. Open the published issue on your site and copy the article body, from the intro paragraph down to the sourcing line.
2. On LinkedIn, choose **Write article**, pick the DEV Ahead newsletter, and paste. Headings, bold, links and lists carry over.
3. Title: `DEV Ahead #N: <title>`. Add a line at the end linking to the issue on your site.
4. Publish. Subscribers are notified automatically.
5. Optionally share it with the LinkedIn post draft from the pull request, rewritten in your own words.

## One-time setup

- **GitHub Pages:** in the repository, go to Settings, then Pages, and set Source to **GitHub Actions**.
- **dev.to, option A (no key, recommended while dev.to's key page is broken):** dev.to Settings, then Extensions, then **Manage my RSS feeds**. Add `https://siyaddev.github.io/dev-ahead/rss.xml` and tick the option to mark the RSS source as the canonical URL. New issues arrive as drafts on your dev.to dashboard; publish each with one click. The feed carries the full issue text.
- **dev.to, option B (automatic):** create an API key under dev.to Settings, then Extensions, then **DEV Community API Keys**. In the repository go to Settings, then Secrets and variables, then Actions, and add it as `DEVTO_API_KEY`. Use A or B, not both, or each issue appears twice.
- **LinkedIn newsletter:** on LinkedIn choose **Write article**, then **Create a newsletter**. Call it DEV Ahead, twice weekly. Put its URL in `linkedinNewsletter` in `src/config.ts`.
- **Links:** fill in `linkedinProfile` and `devto` in `src/config.ts`.

## Adding a custom domain later

1. Buy the domain (for example through Cloudflare Registrar).
2. In the repository go to Settings, then Pages, then Custom domain, and enter it. GitHub shows the DNS records to add.
3. Nothing else changes: the deploy workflow reads the live URL from Pages, so canonical links, RSS and dev.to links switch to the new domain on the next deploy.
