# Publishing an issue

Twice a week the routine writes your private brief to Drive and opens a pull request here with the public edition. Publishing it takes about 20 minutes.

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
2. On LinkedIn, choose **Write article**, pick the Ahead of Main newsletter, and paste. Headings, bold, links and lists carry over.
3. Title: `Ahead of Main #N: <title>`. Add a line at the end linking to the issue on your site.
4. Publish. Subscribers are notified automatically.
5. Optionally share it with the LinkedIn post draft from the pull request, rewritten in your own words.

## One-time setup

- **GitHub Pages:** in the repository, go to Settings, then Pages, and set Source to **GitHub Actions**.
- **dev.to, option A (no key, recommended while dev.to's key page is broken):** dev.to Settings, then Extensions, then **Manage my RSS feeds**. Add `https://siyaddev.github.io/dev-ahead/rss.xml` and tick the option to mark the RSS source as the canonical URL. New issues arrive as drafts on your dev.to dashboard; publish each with one click. The feed carries the full issue text.
- **dev.to, option B (automatic):** create an API key under dev.to Settings, then Extensions, then **DEV Community API Keys**. In the repository go to Settings, then Secrets and variables, then Actions, and add it as `DEVTO_API_KEY`. Use A or B, not both, or each issue appears twice.
- **LinkedIn newsletter:** on LinkedIn choose **Write article**, then **Create a newsletter**. Call it Ahead of Main, twice weekly. Put its URL in `linkedinNewsletter` in `src/config.ts`.
- **Links:** fill in `linkedinProfile` and `devto` in `src/config.ts`.

## Custom domain: aheadofmain.com

The domain is registered on Cloudflare.

1. Verify the domain for your account first, so nobody else can point a Pages site at it: GitHub profile Settings, then Pages, then **Add a domain**. GitHub gives you a TXT record; add it in Cloudflare, then click Verify.
2. In Cloudflare DNS for aheadofmain.com, add these records with the proxy **off** (grey cloud, "DNS only"), so GitHub can issue the HTTPS certificate:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` for `www`: `siyaddev.github.io`
3. In the repository go to Settings, then Pages, then Custom domain, enter `aheadofmain.com` and save. Once the DNS check passes and the certificate is issued, tick **Enforce HTTPS**.
4. Re-run the "Deploy site" workflow. The workflow reads the live URL from Pages, so canonical links, the RSS feed and dev.to links switch to the new domain with no code changes. The old github.io address redirects to the domain.
5. In dev.to's RSS settings, change the feed URL to `https://aheadofmain.com/rss.xml`.

## Analytics: Cloudflare Web Analytics

1. In Cloudflare, go to **Analytics & Logs**, then **Web Analytics**, then **Add a site**, and enter `aheadofmain.com`. Because the DNS records are "DNS only", choose the JavaScript snippet option rather than automatic setup.
2. Copy the `token` value from the snippet (the string after `"token":`). It isn't a secret; it ends up in every page.
3. Put it in `cloudflareAnalyticsToken` in `src/config.ts` and merge. The script is added to production builds only, and the About page then mentions it.
4. Visits show up in Cloudflare under Web Analytics within a few minutes of the deploy.

## Countdown to the next issue

The home page and the end of every issue say when the next issue is due ("Next issue Thursday, in about 1 day, 21 hours"). It counts down to the routine's run time, set in `SCHEDULE` in `src/config.ts`. If you change the routine's schedule, change `SCHEDULE` to match. When a run has happened but its issue isn't merged yet, the line says the issue is being edited instead.
