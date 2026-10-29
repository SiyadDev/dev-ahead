# Hypothesis register (draft 2, for approval)

Drafted 29 October 2026 and revised the same day after an independent review. A fresh reviewer that hadn't seen the drafting conversation tested every entry against nine tests. Its findings were applied here, after re-checking each new fact it relied on. Nothing on the site or in the routine uses this yet.

The Disruption Watch board asks one question per entry: how far has this shift got? This register turns each entry into a question the routine can answer the same way every run:

- **Claim:** what we think is happening, in words that can turn out wrong.
- **Forecast:** one dated prediction with a probability, worded so a stranger could mark it right or wrong without an argument. The probabilities are starting estimates; scoring them is how they get calibrated.
- **Comparison:** a past shift of the same kind, so the estimate starts from history rather than from this week's excitement.
- **Moves up when / Stalls when:** the evidence, decided in advance, that changes the rating. Each sign has a number and a source.
- **Measured by:** "collector" means the planned daily GitHub Action; "routine" means the twice-weekly run.
- **Review by:** the date the entry gets a hard look even if nothing happened.

## 1. Rules

### Rung rules

Moving up needs the next rung's evidence. An entry whose evidence for its current rung hasn't been seen for three issues is flagged for review.

| Rung | Evidence required |
|---|---|
| **Watching** | Credible early evidence from at least one primary source: a paper, a prototype, one vendor's beta. |
| **Accelerating** | At least three independent builders or vendors working on it, and a growth measure rising for four weeks or more. |
| **Hitting the market** | Generally available from at least two major vendors, and evidence of paid use: a pricing page, an enterprise plan, or adoption numbers from two independent sources. A vendor changing how it bills for its own tool (for example seats to usage) counts here, as market evidence. |
| **Repricing the work** | Direct evidence that what clients pay for the work, or how teams staff, has changed: published rate changes for the work itself, two or more independent surveys, or hiring data. A product feature, or a change in what a tool costs, never qualifies. |

### Measurement rules

- **npm downloads:** npm's API returns zero for some days; five of the 14 days to 28 October were zero. Every weekly figure replaces a zero day with the same weekday from the nearest earlier week. Unrepaired figures understate real volume by about 15%.
- **Hacker News counts:** Algolia search, stories only, phrase in the title only.
- **NVD counts:** exact-phrase keyword match. The collector needs a free NVD API key, because unauthenticated requests time out.
- **Evidence that counts for several entries** is logged once, with every entry it counts for listed. A rung move needs at least one piece of evidence unique to that entry.

## 2. What changed in this draft

### Rating changes (proposed)

| Entry | Now on the board | Proposed | Why |
|---|---|---|---|
| Ultra-cheap and open-weight models | Repricing | **Keep** | Direct price evidence logged |
| Agentic coding | Repricing | **Hitting the market** | Only product evidence logged. Copilot's move to usage billing counts as market evidence under the rules above. |
| Context engineering | Repricing | **Watching** | Hacker News titles fell from 41 a month (July 2025) to 5 (October 2026); the features it relies on are now automatic |
| MCP | Repricing | **Hitting the market** | A standards question; there's no repricing end point |
| App generation + design generation | Repricing / Accelerating | **Merged, Accelerating** | Same shift; v0 is evidence for both |
| Model routing and decision models | Hitting the market | **Accelerating** | Its own stall sign is already met: frontier models got cheap enough |
| AI-native infrastructure | Hitting the market | **Keep, evidence now logged** | AWS AgentCore generally available since 13 October 2025; Azure Container Apps Sandboxes since 23 September 2026 |
| Autonomous QA | Hitting the market | **Accelerating** | Benchmark evidence only |
| Pricing pressure | Accelerating (PR #12 proposes up) | **Watching** | Developer postings rose 24% in a year; no rate data exists |
| Agent supply-chain security | not on the board | **New, Watching** | No security entry yet |

### Corrected baselines (29 October 2026)

| Measure | Value |
|---|---|
| npm `@modelcontextprotocol/sdk`, repaired week to 27 Oct | 85.2M (76.7M three weeks earlier) |
| npm `@modelcontextprotocol/core` (MCP v2, at 2.4.0), repaired week to 27 Oct | 23.6M (12.9M three weeks earlier) |
| Agent sandbox SDKs (`e2b`, `@vercel/sandbox`, `@daytonaio/sdk`, `@cloudflare/sandbox`), last week, unrepaired | 10.1M |
| Public GitHub pull requests with "Generated with Claude Code" in the body, September 2026 | 18.1% of all public PRs (6% in April, per the reviewer) |
| Indeed US software development postings index (Feb 2020 = 100) | 80.8 on 23 Oct 2026; 64–65 a year earlier |
| NVD CVEs, exact phrase "MCP server", by quarter in 2026 | Q1 27 · Q2 61 · Q3 120 |
| Hacker News stories with "context engineering" in the title | 41 in July 2025 → 5 in October 2026 (reviewer) |
| Figma: paid customers over $10k ARR using the Figma agent weekly | over 50% as of 31 July 2026 (Figma's Q2 results) |
| OpenRouter paid models / median output price | 429 / $2.00 per million tokens; models added since July have a median of $2.50 |

## 3. Entries

### Ultra-cheap and open-weight models
- **Rung:** Repricing the work.
- **Claim:** The price of a given level of capability keeps falling fast enough that teams re-plan AI costs every quarter.
- **Forecast:** On 30 April 2027, the cheapest paid OpenRouter model (excluding `:batch` and `~` alias entries) scoring at least Claude Sonnet 5.5's 29 October 2026 score on the Artificial Analysis Intelligence Index costs at most 50% of today's cheapest model at that bar, on output price. Snapshot both today. **60%.**
- **Comparison:** cloud compute and storage prices fell steadily for a decade; LLM prices per capability fell much faster in 2023–2025.
- **Moves up / holds when:** a frontier lab cuts a tier by 50% or more (OpenRouter).
- **Stalls when:** any of Anthropic, OpenAI, Google or DeepSeek raises a list price on OpenRouter; or 3 of the 5 most-downloaded new open-weight models in a quarter ship under a non-OSI licence (Hugging Face).
- **Measured by:** collector (OpenRouter, Hugging Face). The Artificial Analysis index needs a data source: its API or a weekly read.
- **Review by:** 31 January 2027.

### Agentic coding and orchestration
- **Rung:** Hitting the market.
- **Claim:** Handing multi-step tasks to agents becomes the default way working developers use AI.
- **Forecast:** Of public GitHub pull requests created 1–28 June 2027, at least 30% have "Generated with Claude Code" in the body or are authored by `app/copilot-swe-agent` (GitHub search, `total_count`). **55%.**
- **Comparison:** AI coding tools reached a majority of surveyed developers about two years after launch (Stack Overflow: 44% in 2023, 62% in 2024, from the reviewer's memory).
- **Moves up to Repricing when:** two independent surveys or rate reports show what clients pay for development changing.
- **Stalls when:** the pull-request share falls for 3 months in a row; combined agent SDK downloads fall for 8 weeks in a row.
- **Measured by:** collector (GitHub search API, npm). It measures two tools, not the whole market, so read it as a floor.
- **Review by:** 31 March 2027.

### Context engineering
- **Rung:** Watching.
- **Claim:** Deciding what goes into a model's context replaces prompt wording as the core skill.
- **Forecast:** At least 30 Hacker News stories with "context engineering" in the title from 1 April to 30 June 2027 (13 in the last quarter). **15%.**
- **Comparison:** "DevOps" took years to go from a conference term to a job title. Many such terms never make it.
- **Moves up when:** 10 or more title stories a month for 3 months.
- **Stalls when:** fewer than 5 a month for 3 months (already the case in October).
- **Measured by:** collector (Hacker News).
- **Review by:** 31 January 2027. The reviewer recommends merging this into the harness entry at that review if it's still falling.

### MCP and tool protocols
- **Rung:** Hitting the market.
- **Claim:** MCP becomes the standard way tools plug into agents, the way the Language Server Protocol did for editors.
- **Forecast:** Combined npm downloads of `@modelcontextprotocol/sdk` and `@modelcontextprotocol/core` for the 7 days ending 30 April 2027, zero days repaired, are at least 200M (108.8M now). That needs about 2.4% a week against roughly 3–7% recently. **55%.**
- **Comparison:** LSP was announced on 27 June 2016 and reached broad editor support in a few years (exact pace unverified).
- **Already met:** neutral governance. Anthropic donated MCP to the Agentic AI Foundation on 9 December 2025.
- **Stalls when:** a competing protocol is documented as supported by 2 or more of OpenAI, Google, GitHub and Cursor; an MCP server or SDK vulnerability is added to CISA's Known Exploited Vulnerabilities list; combined growth stays below 1% a week for 8 weeks.
- **Measured by:** collector (npm, CISA KEV); routine (vendor docs).
- **Review by:** 31 January 2027.

### Generated software and UI replacing build work (app generation and design generation, merged)
- **Rung:** Accelerating.
- **Claim:** Generation platforms take over a share of greenfield build and routine UI work.
- **Forecast A (market):** by 30 June 2027, Lovable or its CEO publicly states annual recurring revenue of at least $1B. Mid-2026 figures were about $500–600M, from secondary sources that conflict. **50%.** This is vendor-reported and tests the market, not replacement.
- **Forecast B (use):** a Figma results release published by 30 June 2027 reports that at least 70% of paid customers with more than $10k ARR use the Figma agent weekly. It was over 50% as of 31 July 2026. If Figma stops reporting the figure, this resolves No. **40%.**
- **Comparison:** website builders took most small-business brochure sites over about five years, but not custom apps; stock photography cut routine commissioned work but not brand work. Expect a split, not wholesale replacement.
- **Moves up to Repricing when:** two independent agency or freelancer surveys report fewer greenfield contracts or lower rates for them.
- **Stalls when:** another standalone generation product from Figma, Google, Adobe, Canva, OpenAI or Anthropic is shut down (standalone Claude Design closes on 14 December 2026); Figma's weekly-use figure falls.
- **Measured by:** routine (company announcements, Figma's quarterly results). Lovable and Bolt changelog sources still need adding.
- **Review by:** 31 March 2027.

### Model routing and decision models
- **Rung:** Accelerating.
- **Claim:** Cheap, specialised calls and automatic routers replace one big model call for routine agent steps.
- **Forecast:** by 31 March 2027, OpenAI, Anthropic or Google documents a generally available API option that routes each request automatically among its own models, priced on its pricing page. **30%.** Confirm before adopting that none exists today; neither review verified this.
- **Comparison:** the move from one big database to specialised stores (cache, search, queue).
- **Moves up when:** two independent published cost studies show routing cutting spend by half at the same quality.
- **Stalls when:** cheap frontier models keep falling in price. Haiku 5.5 is $0.10 in and $0.50 out per million tokens, and DeepSeek V4.1 Flash is $0.045 in, so a separate decision model saves little. This entry moves opposite to the open-weight entry.
- **Measured by:** routine (provider docs and pricing pages); collector (OpenRouter).
- **Review by:** 31 March 2027.

### Harness and plugin layer: hooks, skills, mods
- **Rung:** Hitting the market.
- **Claim:** Hooks and plugins become the main way teams customise agents, and an economy forms around them.
- **Already met:** Claude Code, Cursor, Copilot CLI and Codex all have hooks that can block an action; Claude Code and Cursor have plugin marketplaces.
- **Forecast:** by 30 June 2027, the official Claude Code, Cursor or Copilot plugin marketplace sells a paid plugin. Cursor currently requires listings to be open source. **20%.**
- **Comparison:** editor extension marketplaces stayed mostly free for years.
- **Stalls when:** a vendor removes or restricts third-party hooks or plugins, citing security.
- **Measured by:** routine (marketplace docs and changelogs).
- **Review by:** 31 March 2027.

### AI-native infrastructure: sandboxes, computer use, cloud dev environments
- **Rung:** Hitting the market. Evidence: AWS AgentCore, generally available since 13 October 2025; Azure Container Apps Sandboxes, generally available since 23 September 2026.
- **Claim:** Isolated sandboxes become the standard place agents run, rather than developers' laptops.
- **Forecast:** combined npm downloads of `e2b`, `@vercel/sandbox`, `@daytonaio/sdk` and `@cloudflare/sandbox` for the 7 days ending 30 June 2027, zero days repaired, reach at least 32M. That's 3× October's roughly 10.7M; June 2026 was about 4.3M. **50%.**
- **Comparison:** CI moved from office servers to hosted runners over about five years.
- **Stalls when:** a sandbox-escape CVE with a CVSS score of 8 or more in any of these products (NVD); combined downloads fall for 8 weeks in a row.
- **Measured by:** collector (npm, NVD); routine (cloud changelogs).
- **Review by:** 31 January 2027.

### Autonomous QA and test generation
- **Rung:** Accelerating.
- **Claim:** Agents write and maintain a meaningful share of tests in real codebases.
- **Forecast:** the best published score on CheckerBench reaches at least 70% by 30 June 2027 (45.3% now). **35%.** It's a weak test of the claim, and it depends on labs reporting CheckerBench at all. The reviewer reports SWT-bench Verified is already at 87.5% (not re-checked), which is why the forecast names one benchmark.
- **Comparison:** SWE-bench scores rose from about 2% on the full set (2023) to above 70% on the easier Verified subset, so the history is not like for like.
- **Moves up when:** GitHub or GitLab ship native test generation as generally available.
- **Stalls when:** GitHub or GitLab deprecate or roll back a test-generation feature.
- **Measured by:** routine (papers, changelogs). Where CheckerBench scores are published still needs finding.
- **Review by:** 31 March 2027.

### Downward pressure on dev and agency pricing
- **Rung:** Watching. Don't merge PR #12's proposed move up.
- **Claim:** What clients pay for development and agency work falls as AI raises output per person.
- **Forecast:** Indeed's US "total postings" index for Software Development, the value dated 30 June 2027 and read on 7 July, is below 85 (80.8 now, rising about 1.3 points a month). **25%.** Postings measure demand, not rates, so this is indirect.
- **Comparison:** offshoring in the 2000s lowered rates for routine work while specialist rates rose. Expect a split.
- **Moves up when:** a direct rate source (a freelance platform's rate report or an agency rate survey, published at least yearly) shows routine build rates falling, confirmed by a second source.
- **Stalls when:** postings keep rising for two more quarters, which is the current direction.
- **Measured by:** collector or routine (Indeed Hiring Lab, a raw GitHub file both can reach). A direct rate source still needs finding.
- **Review by:** 31 January 2027.

### Source control and review built for many agents on one repo
- **Rung:** Watching.
- **Claim:** Git hosting and code review get rebuilt for many agents working on one repository at once.
- **Forecast:** by 30 June 2027, GitHub's changelog announces a generally available feature whose docs explicitly coordinate concurrent agent changes to the same branch or pull request, for example locking, conflict arbitration, or stacked merges across agent sessions. Parallel agents working in separate pull requests don't count. **30%.**
- **Comparison:** merge queues took about nine years to become a built-in GitHub feature (Rust's bors in about 2014 to general availability on 12 July 2023).
- **Moves up when:** three vendors ship it (Cursor Origin is one).
- **Stalls when:** 12 months pass with no vendor shipping same-branch coordination beyond beta.
- **Measured by:** routine (GitHub, GitLab and Cursor changelogs).
- **Review by:** 31 March 2027.

### Observable and auditable agent actions
- **Rung:** Watching.
- **Claim:** A full record of what an agent did, and who approved it, becomes a requirement for buying agent tools.
- **Forecast:** by 30 June 2027, an OpenTelemetry semantic conventions release marks the `invoke_agent` and `execute_tool` spans as Stable (GitHub releases). The AI conventions are all still at "Development" status, with no timeline. **20%.**
- **Comparison:** AWS CloudTrail launched on 13 November 2013 and became a compliance default (pace unverified).
- **Note:** telemetry is not an audit or approval trail. A stronger signpost would be a regulator or standard naming agent audit logs.
- **Stalls when:** 12 months pass without a second vendor shipping exportable per-action approval logs.
- **Measured by:** routine (OpenTelemetry releases, vendor docs).
- **Review by:** 31 March 2027.

### Portable agent skills (SKILL.md)
- **Rung:** Hitting the market.
- **Already met:** OpenAI, GitHub, Cursor, Google (Gemini CLI) and Microsoft document SKILL.md support; the standard moved to the Agentic AI Foundation on 22 October 2026, with maintainers from Anthropic, Google and OpenAI.
- **Forecast:** by 30 June 2027, agentskills.io publishes a versioned specification release, 1.0 or later. Versioned releases are on the foundation's proposed roadmap. **55%.**
- **Comparison:** container formats moved to a foundation (OCI, 2015), which standardised images and runtimes, but not the Dockerfile itself.
- **Stalls when:** a CVE or published incident involving a malicious skill is reported by two independent security outlets; a major vendor forks the format.
- **Measured by:** routine (agentskills.io, foundation announcements).
- **Review by:** 31 January 2027.

### Agent supply-chain security (new)
- **Rung:** Watching.
- **Claim:** Skills, MCP servers and plugins become a target the way npm packages did, and a security layer for agents becomes standard.
- **Already met:** the MCP Registry verifies publisher namespaces through GitHub or DNS.
- **Forecast:** NVD CVEs published 1 April to 30 June 2027 with the exact phrase "MCP server" number at least 400. Quarterly counts this year were 27, 61 and 120, roughly doubling; 400 needs about 1.5× a quarter. **50%.**
- **Comparison:** npm and PyPI moved from open publishing to two-factor and signed releases after a run of attacks over about five years.
- **Moves up when:** an MCP server or SDK, agent skill or agent plugin vulnerability is added to CISA's Known Exploited Vulnerabilities list. AI tooling already appears there about once a month (Langflow six times, LiteLLM once), but nothing MCP-specific yet.
- **Stalls when:** quarterly counts stop rising for two quarters.
- **Measured by:** collector (NVD with an API key, CISA KEV).
- **Review by:** 31 January 2027.

## 4. Across the register

- **Spread:** the forecasts now run from 15% to 60%, against 50–75% in draft 1. There's still no high-confidence call; a few 85–90% forecasts would make the scoring more informative.
- **Overlap:** MCP, agent SDKs, sandboxes, skills and the harness layer ride the same wave of agent building. One security incident would hit the stall signs of MCP, skills, harness and supply chain at once. The open-weight and routing entries move in opposite directions on the same prices. The measurement rule above handles double counting.
- **Still to collect:** the Artificial Analysis index, Lovable and Bolt sources, a direct rate source for dev work, where CheckerBench scores are published, and an NVD API key.
- **Facts from the reviewer not re-checked here:** SWT-bench Verified at 87.5%; Copilot's move to usage billing from 1 June 2026 (Thursday's run also reported it); Lovable's revenue range; the 2023 and 2024 Stack Overflow figures.
