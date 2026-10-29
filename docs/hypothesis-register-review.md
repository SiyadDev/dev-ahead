# Review of the hypothesis register draft

> **Superseded.** This is the record of the first review of draft 1. An independent review followed, and its findings, with corrections, became [draft 2 of the register](hypothesis-register.md), which is what `src/data/watch.json` now carries.

Reviewed 29 October 2026 against [hypothesis-register.md](hypothesis-register.md). This is a separate pass using nine tests. Each entry gets a pass or fail per test and a suggested rewrite for every failure. The thresholds and probabilities are yours to decide; the rewrites are suggestions.

Facts were checked against primary sources the same day: vendor docs, AWS and Microsoft announcements, Anthropic's MCP donation post, CISA's Known Exploited Vulnerabilities list, NVD, npm, and Indeed Hiring Lab's data.

## The tests

1. **Resolvable:** could a stranger mark it right or wrong on the date, without an argument?
2. **Tests the claim:** does the forecast measure what the claim says, or something nearby?
3. **Not already true:** is it already true, or nearly, today?
4. **Numbers add up:** given the current trend, is the probability plausible?
5. **Spread:** are the probabilities spread out, or bunched where they hedge?
6. **Concrete stall signs:** does each stall sign have a number and a source?
7. **History right:** do the historical comparisons hold up?
8. **Overlap:** do entries move on the same evidence?
9. **Collectable:** can the evidence actually be gathered by the routine or the collector?

## Scorecard

✅ pass · ❌ fail · ⚠️ partly · – not applicable

| Entry | 1 Resolvable | 2 Tests claim | 3 Not already true | 4 Numbers | 6 Stall signs | 9 Collectable |
|---|---|---|---|---|---|---|
| Ultra-cheap and open-weight models | ✅ | ❌ | ✅ | ⚠️ no trend data | ⚠️ | ✅ |
| Agentic coding | ✅ | ❌ | ✅ | ❌ too low | ❌ | ✅ |
| Context engineering | ❌ | ⚠️ | ❌ | – | ✅ | ✅ |
| MCP | ✅ | ⚠️ | ⚠️ one signpost met | ❌ too low | ❌ | ✅ |
| App generation | ✅ | ❌ | ❌ | – | ❌ | ❌ |
| Decision models and routing | ❌ | ✅ | ⚠️ | – | ✅ | ✅ |
| Harness layer | ✅ | ✅ | ❌ | – | ❌ | ✅ |
| AI-native infrastructure | ⚠️ | ✅ | ❌ | – | ❌ | ✅ |
| Autonomous QA | ❌ | ✅ | ✅ | ⚠️ | ❌ | ⚠️ |
| Design generation | ❌ | ⚠️ | ⚠️ unchecked | – | ✅ | ✅ |
| Pricing pressure | ✅ | ❌ | ✅ | ❌ too high | ✅ | ❌ |
| Agent-scale source control | ❌ | ✅ | ✅ | – | ❌ | ✅ |
| Auditable agent actions | ⚠️ | ✅ | ⚠️ | – | ❌ | ✅ |
| Portable skills | ✅ | ✅ | ❌ | – | ⚠️ | ✅ |
| Agent supply-chain security | ⚠️ | ✅ | ⚠️ one signpost met | – | ⚠️ | ✅ |

Tests 5, 7 and 8 apply to the register as a whole and are covered after the entries.

**Bottom line:** no entry passes every test. Six forecasts are already true or nearly so today, three probabilities are clearly off on the arithmetic, and one entry's own data points against its claim.

## The five findings that matter most

1. **Six forecasts would resolve "yes" almost immediately.**
   - **Agent sandboxes:** AWS and Azure already have generally available agent sandboxes (AgentCore since October 2025; Container Apps Sandboxes since 23 September 2026).
   - **Portable skills:** Cursor, GitHub Copilot in VS Code, Gemini CLI and OpenAI Codex already document SKILL.md support.
   - **App generation:** Lovable, Bolt and v0 all already sell enterprise plans.
   - **Harness layer:** Claude Code, Cursor, Copilot CLI and Codex all already have hooks that can block an action, and Claude Code and Cursor have plugin marketplaces.
   - **Context engineering:** memory files and compaction are already standard features.
   - **MCP:** its "neutral foundation" signpost was met on 9 December 2025, when Anthropic donated MCP to the Agentic AI Foundation.

   These forecasts teach nothing. They need to move to the next open question.
2. **The pricing-pressure entry's own data points the other way.** Indeed's US software development postings index rose from 65.3 to 80.8 over the past year, a 24% recovery in demand for developers. That doesn't disprove pressure on rates, but it's evidence against the direction of the claim. PR #12 proposes moving this entry *up* a rung; the data says hold or move down.
3. **Two download forecasts are far too cautious.**
   - **MCP SDK:** grew 3.3% a week over the last 14 weeks; reaching 100M needs only 1.3% a week.
   - **Agent SDKs:** grew 3.6% a week; doubling needs 2.0%.

   At 60–65%, both are bets almost anyone would take. Either the target moves up, or the probability goes to around 90%.
4. **Agentic coding's forecast measures the wrong thing.** Downloads count CI pipelines and bots, not developers' habits. The claim is about how developers work, so the forecast needs a survey or usage measure.
5. **Two of the four historical comparisons I checked are wrong.**
   - **Merge queues:** took about nine years to become a built-in GitHub feature (Rust's bors in 2014 to general availability on 12 July 2023), not three.
   - **SWE-bench:** the comparison mixes two benchmarks. The 2% figure is the original SWE-bench; the 70%+ figures are SWE-bench Verified, an easier subset.

   By the test's own logic, the unchecked comparisons can't be trusted until they're checked.

## Entry by entry

### Ultra-cheap and open-weight models
- ❌ **Test 2.** The median price across OpenRouter's catalogue changes whenever expensive models are added or removed, so it doesn't measure "the price of a given level of capability".
- ⚠️ **Test 4.** No price history yet, so the 55% can't be checked against a trend.
- ⚠️ **Test 6.** "Open releases keep moving to restrictive licences" has no number.
- **Rewrite:**
  - *Forecast:* by 30 April 2027, a fixed basket of prices falls by 30% or more from its 1 November 2026 level. The basket is the output price of the cheapest current model on OpenRouter from each of Anthropic, OpenAI, Google and DeepSeek, weighted equally. **Suggested: 55%**, kept until the collector has a few months of history.
  - *Licence stall sign:* "3 or more of the 5 most-downloaded new open-weight models in a quarter (Hugging Face) ship under a non-OSI licence."

### Agentic coding and orchestration
- ❌ **Test 2.** Downloads don't measure developer habits.
- ❌ **Test 4.** At the current pace the download forecast lands at about 3.4×, so 60% is too low.
- ❌ **Test 6.** "Repeated reports that agent work costs more to review than it saves" has no number or source.
- **Rewrite:**
  - *Forecast:* in the 2027 Stack Overflow Developer Survey, more than 50% of professional developers say they use AI agents at work at least weekly. The baseline is the 2026 survey's figure, to fill in from the published results before you set the number. **Suggested: 45%**, pending that baseline.
  - *Downloads:* keep them as a supporting indicator, not the forecast.
  - *Stall sign:* "combined agent SDK weekly downloads fall for 8 weeks in a row (collector)".

### Context engineering
- ❌ **Test 1.** "Major coding tools" and "a headline feature" are judgement calls.
- ❌ **Test 3.** Memory files and compaction already exist in Claude Code, Cursor, Copilot and Gemini CLI.
- ⚠️ **Test 2.** Tool features show vendors building it, not that it has replaced prompt wording as the core skill.
- **Rewrite:**
  - *Forecast:* in 3 consecutive months before 30 June 2027, Hacker News has 30 or more stories a month matching "context engineering" (Algolia search; now 12 in 30 days). That measures whether practitioners adopt the idea. **Suggested: 25%.**
  - *Stall sign:* "fewer than 5 stories a month for 3 months in a row".

### MCP and tool protocols
- ⚠️ **Test 2.** Downloads include CI and bots. They're a fair proxy for an integration layer, but not perfect.
- ⚠️ **Test 3.** The neutral-foundation signpost was met in December 2025. Remove it, and log it as evidence.
- ❌ **Test 4.** 100M needs 1.3% a week against 3.3% observed, so 65% is too low.
- ❌ **Test 6.** "A security incident leads enterprises to block MCP servers" has no number or source.
- **Rewrite:**
  - *Forecast:* weekly npm downloads of `@modelcontextprotocol/sdk` reach **150M** by 30 April 2027. That needs 2.9% a week, roughly the current pace, so it's a real test. **Suggested: 45%.** (Or keep 100M at 90%, but a near-certain forecast teaches little.)
  - *Stall signs:*
    - "a competing protocol is documented as supported by 2 or more of OpenAI, Google, GitHub and Cursor";
    - "an MCP server or SDK vulnerability is added to CISA's Known Exploited Vulnerabilities list".

### App and full-stack generation platforms
- ❌ **Test 2.** Enterprise plans show the vendors' ambition, not that greenfield work moved to them.
- ❌ **Test 3.** Lovable, Bolt and v0 already have enterprise plans with SSO.
- ❌ **Test 6.** "Reports of security problems spread" has no number or source.
- ❌ **Test 9.** No feed for Lovable or Bolt is in the routine, and nothing measures greenfield work moving.
- **Rewrite:** the hardest entry on the board to measure honestly. Two options:
  - (a) Hold at Accelerating with **no forecast** until a source exists, and say so on the board.
  - (b) A forecast on the vendors' own numbers: "Lovable publishes an annual revenue figure by 30 June 2027 at least 2× its latest published figure, confirmed by a second outlet". It's vendor-reported, so mark it that way.

  Either way, add Lovable's and Bolt's changelogs or blogs to the routine.

### Small decision models and model routing (merged)
- ❌ **Test 1.** "A hosted decision or classifier model as a product" needs defining, and the providers need naming.
- ⚠️ **Test 3.** Safety classifiers (moderation, guard models) already exist and would make it trivially true.
- **Rewrite:**
  - *Forecast:* by 31 March 2027, at least 2 of Anthropic, OpenAI, Google, AWS and Mistral list a model in their own model catalogue described as a router, decision or scoring model for agent workflows. Moderation and safety classifiers don't count. **Suggested: 35%.**

### Harness and plugin layer
- ❌ **Test 3.** Already true: blocking hooks in Claude Code, Cursor, Copilot CLI and Codex; marketplaces in Claude Code and Cursor.
- ❌ **Test 6.** "Teams stop trusting hooks" has no number.
- **Rewrite:**
  - *Forecast:* by 30 June 2027, the plugin marketplace of Claude Code, Cursor, Copilot or Codex lists **paid** third-party plugins billed through the marketplace. That's the next step from free extension points to an economy. **Suggested: 35%.**
  - *Stall sign:* "a vendor removes or restricts third-party hooks or plugins, citing security".

### AI-native infrastructure
- ❌ **Test 3.** Already true for AWS (AgentCore, generally available since 13 October 2025) and Azure (Container Apps Sandboxes, generally available since 23 September 2026). Google Cloud wasn't checked.
- ❌ **Test 6.** "Sandbox escapes or cost overruns" has no number.
- ⚠️ **Test 1.** "A sandbox product aimed at agents" was loose.
- **Rewrite:**
  - *Rung:* the entry has the evidence the rules need for "Hitting the market" (generally available from two major vendors with paid use). Log those two launches and the "no evidence" flag clears.
  - *Forecast:* by 30 June 2027, at least 2 of Claude Code, Cursor, Copilot and Codex run background tasks in a cloud sandbox by default, according to their docs. **Suggested: 50%**, after checking today's defaults.
  - *Stall sign:* "a sandbox-escape CVE with a CVSS score of 8 or more in AgentCore, Container Apps Sandboxes, Cloudflare's sandbox or E2B".

### Autonomous QA and test generation
- ❌ **Test 1.** "An agentic test or checker-writing benchmark" lets you pick the benchmark afterwards.
- ⚠️ **Test 4.** The SWE-bench comparison it leans on mixes two benchmarks (test 7).
- ❌ **Test 6.** "Reports of flaky tests spread" has no number.
- ⚠️ **Test 9.** Nobody has checked that CheckerBench publishes a leaderboard that can be checked.
- **Rewrite:**
  - *Forecast:* the best score on **CheckerBench**, as reported in its paper updates or leaderboard, reaches 70% by 30 June 2027 (now 45.3%). **Suggested: 40%**, if a leaderboard exists. If it doesn't, pick a benchmark that has one.
  - *Stall sign:* "GitHub or GitLab deprecates or rolls back a test-generation feature".

### Design generation
- ❌ **Test 1.** "Design-generation products" are unnamed.
- ⚠️ **Test 2.** The forecast mixes two questions.
- ⚠️ **Test 3.** Not checked whether Figma Make or Google Stitch are already generally available.
- **Rewrite:** since the only evidence points down, test the downside directly.
  - *Forecast:* by 30 June 2027, at least one more standalone design-generation product from Figma, Google, Adobe, Canva, OpenAI or Anthropic is shut down or folded into another product. **Suggested: 50%.**

### Downward pressure on dev and agency pricing
- ❌ **Test 2.** Postings measure demand for developers, not rates.
- ❌ **Test 4.** The index rose 15.5 points last year. If that continues it reaches about 91 by June 2027, so "still below 85" at 65% is too high; roughly 30% fits the trend.
- ❌ **Test 9.** No source covers rates directly.
- **Rewrite:**
  - *Rung:* by the rung rules it has no evidence for Accelerating (three independent sources and a rising measure). **Suggest Watching** until a direct rate source exists, and decline PR #12's move up.
  - *Forecast (indirect, labelled as such):* Indeed's US software development postings index is below 80.8 (its 23 October 2026 level) on 30 June 2027. **Suggested: 30%.**
  - *Direct source to find:* freelance-platform rate reports or an agency rate survey published at least yearly.

### Source control and review built for many agents
- ❌ **Test 1.** "Aimed specifically at many concurrent agents" is a judgement call.
- ❌ **Test 6.** "Agents keep working fine through ordinary branches" has no number.
- ❌ **Test 7.** The merge-queue comparison is wrong: about nine years, not three.
- **Rewrite:**
  - *Forecast:* Cursor Origin leaves beta (generally available on Cursor's changelog) by 30 June 2027. It's binary and checkable. **Suggested: 65%.**
  - *Second forecast:* GitHub's changelog announces a generally available feature whose announcement names multiple agents working on one repository at once. **Suggested: 40%.**

### Observable and auditable agent actions
- ⚠️ **Test 1.** The OpenTelemetry half is checkable through the conventions' published status. The "three vendors emit them" half needs the vendors named.
- ⚠️ **Test 3.** Claude Code already exports OpenTelemetry data, so the vendor half may be partly true.
- ❌ **Test 6.** "Enterprises accept vendor dashboards" has no number.
- **Rewrite:** split it into two.
  - *Forecast 1:* OpenTelemetry's semantic conventions for AI agent spans are marked Stable by 30 June 2027. These conventions have stayed experimental for a long time. **Suggested: 30%.**
  - *Forecast 2:* at least 3 of Claude Code, Cursor, Copilot, Codex and Gemini CLI document an OpenTelemetry export of per-tool-call events. **Suggested: 70%**, after checking today's count.

### Portable agent skills
- ❌ **Test 3.** Already true: Cursor, GitHub Copilot in VS Code, Gemini CLI and OpenAI Codex document SKILL.md support.
- ⚠️ **Test 6.** "A malicious-skill incident" has no source.
- **Rewrite:**
  - *Forecast:* by 30 June 2027, the Agent Skills specification has a versioned 1.0 release under the Agentic AI Foundation, with maintainers from at least 2 companies other than Anthropic. **Suggested: 50%.**
  - *Stall sign:* "a CVE or published incident involving a malicious skill, reported by 2 independent security outlets".

### Agent supply-chain security
- ⚠️ **Test 3.** One move-up signpost is already met. NVD lists 100 CVEs mentioning "Model Context Protocol" published since 1 July 2026, about 25 a month. Also, the MCP registry already verifies publisher namespaces through GitHub sign-in, which may already meet the forecast. Check before keeping it.
- ⚠️ **Test 1.** "Signed or verified publishers" needs defining.
- **Rewrite:**
  - *Forecast:* by 30 June 2027, a vulnerability in an MCP server or SDK, an agent skill, or an agent plugin is added to CISA's Known Exploited Vulnerabilities list. Baseline: AI tooling already appears there about once a month (Langflow six times, LiteLLM once), but nothing MCP-specific yet. **Suggested: 55%.**
  - *Baseline to keep:* the monthly count of NVD CVEs mentioning MCP, about 25 now.

## Across the register

### Test 5: spread ❌
All 15 draft probabilities sat between 50% and 75%, which is hedging. After the rewrites, the suggestions run from 25% to 70%, with 90% available for MCP if you keep the 100M target. That's better but still narrow.

The real fix is the betting pass: for each number, ask whether you'd take either side at those odds. Wherever you'd happily take one side, move the number.

### Test 7: historical comparisons ⚠️

| Comparison | Check | Result |
|---|---|---|
| Language Server Protocol, 2016 | Microsoft announced it on 27 June 2016 | ✅ date right; "about three years to near-universal" not verified |
| AWS CloudTrail, 2013 | launched 13 November 2013 | ✅ date right; "compliance default in about three years" not verified |
| Merge queues "about three years" | GitHub general availability on 12 July 2023; Rust's bors from about 2014 | ❌ about nine years |
| SWE-bench "2% to 70% in two years" | the two figures come from different benchmarks | ❌ mixed benchmarks |

Two of four are wrong, so the rest need checking before they anchor any estimate. They are DevOps, Docker, GitHub Actions, AI autocomplete, website builders, stock photography and cloud price declines.

### Test 8: overlap ⚠️
These pairs move on shared evidence:
- Open-weight pricing ↔ decision models (cheap frontier models undercut decision models).
- Harness layer ↔ auditable actions.
- Supply-chain security ↔ portable skills and MCP.

Suggested rule: log each piece of evidence once and list every entry it counts for. A rung move needs at least one piece of evidence unique to that entry.

### Test 9: collection gaps ❌

| Needed | Status |
|---|---|
| Lovable and Bolt changelogs | not in the routine |
| Direct rate data for dev and agency work | no source identified |
| Stack Overflow survey | yearly, read by hand in July |
| CheckerBench leaderboard | existence not checked |
| OpenTelemetry convention status | reachable as a raw GitHub file |
| CISA KEV and NVD | reachable; need allowlisting for the routine, or collection by the Action |
| npm, PyPI, Hacker News, OpenRouter | reachable; need the collector Action |

## What's left for you

The review can mark what's wrong; the final calls are yours.

1. **Resolution pass:** read each rewritten forecast and check you could mark it on the date without an argument.
2. **Betting pass:** mark each suggested probability as too high, too low or fine.
3. **Expert pass:** pick the three entries you know best from your own work and argue against them.
4. **Decisions:**
   - pricing pressure: Watching, or keep Accelerating?
   - app generation: no forecast, or the vendor-revenue one?
   - MCP: 150M at 45%, or 100M at 90%?
