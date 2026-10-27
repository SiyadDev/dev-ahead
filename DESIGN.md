---
name: Ahead of Main
description: "What main hasn't merged yet. A twice-weekly briefing sheet for working developers, built around the Disruption Watch ladder."
colors:
  # Light scheme (default). Source: src/styles/global.css :root
  ink: "#16202a"
  paper: "#f6f7f5"
  cobalt: "#2b59d1"
  cobalt-wash: "#e3eaf9"
  graphite: "#5a6570"
  wash: "#eceff0"
  rule: "#d8dde1"
  rule-strong: "#7b858e"
  rung-1: "#56636f"
  rung-2: "#15665f"
  rung-3: "#8a5a00"
  rung-4: "#8e2b2b"
  # Dark scheme. Same custom properties, redefined under prefers-color-scheme: dark
  ink-dark: "#e6ebef"
  paper-dark: "#141517"
  cobalt-dark: "#86a8ff"
  cobalt-wash-dark: "#1c2433"
  graphite-dark: "#96a3ae"
  wash-dark: "#1d1f22"
  rule-dark: "#2b2e33"
  rule-strong-dark: "#5f6b76"
  rung-1-dark: "#8d9cab"
  rung-2-dark: "#4cc0b6"
  rung-3-dark: "#e5ac3a"
  rung-4-dark: "#e3928a"
typography:
  display:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.3rem, 5.4vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.1rem, 5vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline-issue:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(1.9rem, 4.6vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.25
  standfirst:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.3
  lede:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Source Serif 4, 'Iowan Old Style', Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.62
  section:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  section-sm:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  wordmark:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
  button:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
  label:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    fontFeature: "tnum"
  tag:
    fontFamily: "'Schibsted Grotesk', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.84em"
rounded:
  focus: "2px"
  code: "3px"
  tag: "4px"
  control: "6px"
  panel: "8px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  measure: "33em"
  rail: "13rem"
  wide: "1120px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.cobalt}"
  nav-link:
    textColor: "{colors.graphite}"
    padding: "10px 0"
  nav-link-active:
    textColor: "{colors.ink}"
  tag-act-now:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
  tag-watch:
    textColor: "{colors.cobalt}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
  tag-context:
    textColor: "{colors.graphite}"
    typography: "{typography.tag}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
  ladder-step:
    backgroundColor: "{colors.wash}"
    padding: "12px 16px 16px"
    height: "120px"
  ladder-step-watching:
    textColor: "{colors.rung-1}"
  ladder-step-accelerating:
    textColor: "{colors.rung-2}"
  ladder-step-hitting-the-market:
    textColor: "{colors.rung-3}"
  ladder-step-repricing-the-work:
    textColor: "{colors.rung-4}"
  experiment-panel:
    backgroundColor: "{colors.cobalt-wash}"
    rounded: "{rounded.panel}"
    padding: "8px 32px 24px"
  code-inline:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.code}"
    padding: "0.08em 0.32em"
  feed-field:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
---

# Design System: Ahead of Main

## Overview

**Creative North Star: "The Forecaster's Briefing Sheet"**

Ahead of Main looks like the morning sheet in a forecasting office: one ink on pale, cool paper, a dated header, short blocks of judgement, a source line at the foot of each, and a small mark saying how sure to be. One blue picks out the threads to follow. A single chart, the Disruption Watch ladder, is what everyone looks at first, and it is the site's signature object: a rising four-step staircase that opens the home page and is echoed on /watch, in the favicon and on the social card.

The system is flat, typographic and quiet. Depth comes from a pale wash and hairline rules, never from shadows. The type is split by meaning: the serif (Source Serif 4) carries the editor's judgement, the grotesk (Schibsted Grotesk) carries structure, and the system monospace carries anything you'd paste into a terminal. Density is that of a reading page, not an app: a single 70-character column for prose, generous section breaks (64px), and small, tabular sans metadata around it. Colour beyond Ink, Paper and Cobalt is reserved for data: the four rung colours encode the ladder and nothing else.

The current layouts were re-composed around the board. The home page's first viewport is the tagline, a lede, two actions and the ladder. Issue pages put a margin column (dateline and an "In this issue" contents list) beside the reading column. /watch groups entries by rung, highest first, with each rung's meaning stated inline and the latest evidence and its source visible without a click. The rung colours were re-tuned to pass WCAG AA, and the top rung moved from alarm red to oxblood to keep the brand's "calm, not doom". Nothing animates on load: the brief says nothing animates for attention, so state changes are the only motion.

Rejected outright: purple-to-blue gradients, neon "terminal" greens, glow, decorative imagery (stock photos, glowing brains, AI-generated heroes), coloured side-stripe callouts, and kickers or eyebrows above headlines.

**Key Characteristics:**
- One ink on cool paper; Cobalt only for the way onward.
- The ladder is the front page and the only chart; its four colours are data, not decoration.
- Serif for judgement, grotesk for structure, monospace for anything pasteable.
- Flat: tone (wash) and rules (1px, 2px, 4px) do all the separating.
- Light and dark schemes follow the reader's system setting; there is no toggle.
- No load or entrance animation; motion is limited to 160ms colour and chevron transitions on interaction.

## Colors

A near-monochrome briefing palette (blue-black ink on cool off-white) with a single cobalt for links and actions, plus a four-step data ramp for the ladder that runs from cool slate to warm oxblood.

### Primary
- **Cobalt** (#2b59d1; dark #86a8ff): the thread to follow. Every link, the ACT NOW tag fill, the WATCH tag outline, the "New" marker on the board, the experiment heading, the primary button's hover fill, the focus ring and the text caret. "Main" in the wordmark. 5.66:1 on Paper in light, 7.85:1 in dark.
- **Cobalt Wash** (#e3eaf9; dark #1c2433): the only tinted surface. Fills the experiment panel, text selection, and the highlight on a targeted /watch entry.

### Neutral
- **Ink** (#16202a; dark #e6ebef): all primary text, headings, the primary button fill, the 2px section rules and the active-nav underline. A blue-black that reads as printed type, never pure black.
- **Paper** (#f6f7f5; dark #141517): the page ground, and text on Ink or Cobalt fills. In dark mode the ground is a neutral graphite with no blue tint, so Cobalt and the rung colours carry the only hue on the page.
- **Graphite** (#5a6570; dark #96a3ae): secondary text. Ledes, summaries, metadata, dates, counts, source lines, footer, inactive nav. 5.54:1 on Paper.
- **Board Wash** (#eceff0; dark #1d1f22): the ladder steps, the /watch rung index, inline code and the feed address field. The only "surface" besides Paper.
- **Rule** (#d8dde1; dark #2b2e33): 1px hairlines between list items, archive rows, evidence rows and around the contents list. Decorative separation only; never the sole carrier of meaning.
- **Rule Strong** (#7b858e; dark #5f6b76): a hairline that still reads as a mark, at 3:1 or better on Paper. Empty confidence dots, empty rung pips, the CONTEXT tag outline.

### Data Encoding (the ladder)
The four rung colours are a data encoding of the Disruption Watch ladder, not identity colours. They step from cool to warm as a shift advances. Every rung passes 4.5:1 on Paper and on Board Wash in both schemes.
- **Survey Slate** (#56636f; dark #8d9cab): Watching. Deliberately close to Graphite: the lowest rung is the quietest.
- **Harbour Teal** (#15665f; dark #4cc0b6): Accelerating.
- **Burnt Ochre** (#8a5a00; dark #e5ac3a): Hitting the market.
- **Oxblood** (#8e2b2b; dark #e3928a): Repricing the work. Serious, not alarming.

### Named Rules
**The One Thread Rule.** Cobalt means "go here" or "do this": links, the ACT NOW tag, focus, the experiment. It never fills anything larger than the experiment panel and never decorates.

**The Data-Not-Identity Rule.** Rung colours appear only where a rung is being shown: the ladder's top caps and labels, the /watch rung index, rung section heads and their pips. A rung colour always sits with the rung's name in text; colour is never the only signal.

**The Calm Ceiling Rule.** Nothing on the site may read as an alert. The highest rung is oxblood, not red; there is no error red, no warning yellow and no glow anywhere in the palette.

## Typography

**Display Font:** Source Serif 4 (with 'Iowan Old Style', Georgia, serif), variable optical size 8–60, weights 400–700, italic 400
**Structure Font:** Schibsted Grotesk (with ui-sans-serif, system-ui, sans-serif), weights 400, 600, 700, 800
**Mono Font:** system monospace (ui-monospace, 'SF Mono', Menlo, monospace)

**Character:** A bookish newspaper serif with optical sizing does the talking; a compact Scandinavian grotesk does the signposting. Headlines are serif at a light-medium weight (500) with tight negative tracking, so they read as judgement rather than shouting.

### Hierarchy
- **Display** (Source Serif 4 500, clamp(2.3rem, 5.4vw, 4rem), line-height 1.02, -0.025em): the home page tagline only.
- **Headline** (Source Serif 4 500, clamp(2.1rem, 5vw, 3rem), 1.06, -0.02em): page titles on /watch, /about, /follow, /issues, 404.
- **Issue headline** (Source Serif 4 500, clamp(1.9rem, 4.6vw, 2.8rem), 1.08, -0.02em, max 22em): the issue title, set as three short clauses.
- **Title** (Source Serif 4 600, 1.3rem, 1.25): item headings inside issues (the top-3 items step up to 1.4rem), and entry names on /watch. The latest-issue title on home is serif 500 at clamp(1.5rem, 3.2vw, 2rem).
- **Standfirst** (Source Serif 4 400, 1.45rem, 1.3, Ink): the one-line promise under a page title ("Ratings move on evidence, not on noise.").
- **Lede** (Source Serif 4 400, 1.2rem, 1.5–1.55, Graphite): the home lede, page intros, the issue summary.
- **Body** (Source Serif 4 400, 1.125rem, 1.62): all running text, capped at the 33em measure (about 70 characters). Headings use `text-wrap: balance`; paragraphs and list items use `text-wrap: pretty`.
- **Section** (Schibsted Grotesk 700, 1.4rem, 1.2, -0.015em): section heads inside issues and About, and rung heads on /watch, each sitting under a rule. Index-page sections, the ladder head, the follow cards and the issue close use the smaller 1.15rem step.
- **Label** (Schibsted Grotesk 400–700, 0.85–0.95rem, Graphite, tabular figures): datelines, meta lines, counts, source lines, evidence rows, contents list, nav (0.95rem), footer.
- **Tag** (Schibsted Grotesk 700, 0.74rem, line-height 1, +0.02em): ACT NOW, WATCH, CONTEXT. Capitals come from the text itself, not from `text-transform`.
- **Mono** (system monospace, 0.84em inline; 0.9rem/1.5 in blocks): code, commands, version numbers, environment variables, the RSS address.

### Named Rules
**The Semantic Split Rule.** Serif for what the reader weighs (headlines, item titles, prose, the pager's issue titles), grotesk for how the page is organised (nav, section heads, dates, counts, tags, buttons), monospace for anything pasteable. Pick the face by role, never by looks.

**The Measure Rule.** Running text never exceeds the measure (33em, about 70 characters of Source Serif 4 at body size).

**The Quiet Caps Rule.** The three tags are the only text set in capitals, and they are typed that way in the Markdown. No uppercase labels, no letter-spaced small caps elsewhere.

## Layout

A single centred shell (max 1120px) with 16px side padding, widening to 32px from 720px. Spacing runs on a 4px-based scale (s1 4px through s9 96px); sections are separated by s8 (64px), the footer by s9 (96px), page heads get s7 above and s6 below.

**Home.** The first viewport is the board. The tagline spans the full width; below it the lede (max 36em) and the two actions sit side by side from 900px, then the ladder follows directly. Below the fold: the latest issue in two columns from 900px (title and summary left, the top 3 and the "things to try" line right), then the archive.

**The ladder.** Four equal columns with 3px gutters. Every step stretches to the busiest one and starts 48px higher than the rung below (offsets 144, 96, 48 and 0px from the top), so the board always reads as a rising staircase whatever the entry counts. Below 720px it becomes a single stacked column with the highest rung first.

**Issue pages.** From 1000px, a two-column grid: a 13rem margin column and the 33em reading column, 64px apart. The margin column holds the dateline ("Issue 4", the date, the window covered) and the "In this issue" contents list with item counts and a tag tally, and stays sticky as you read. Below 1000px the margin column dissolves and the order becomes dateline, title, contents (as a wrapping inline list), text, close.

**/watch.** Page head, then a four-column rung index (four rung tiles, highest first, each with pips for its level; 2×2 below 900px), then one section per rung, highest first, each capped at 820px wide. Each entry shows its name, "On this rung since", its note at the measure, the latest dated evidence with its source host inline, and earlier evidence behind a disclosure.

**Responsive steps** observed: 520px (archive rows, evidence rows and the pager stack; the experiment panel bleeds 8px wider), 640px (issue close goes two-column), 720px (shell padding, ladder and rung index), 760px (follow cards two-up), 900px (home front and latest issue), 1000px (issue margin column).

### Named Rules
**The Board First Rule.** On the home page, the ladder is in the first viewport at desktop widths. Nothing is placed between the actions and the board.

**The Highest First Rule.** Wherever rungs stack vertically (the /watch sections, the narrow-screen ladder), the most advanced rung leads.

**The Margin Column Rule.** On an issue, orientation (date, window, contents) lives in the margin; the reading column carries only the issue.

## Elevation & Depth

The system is flat. There are no drop shadows anywhere. Depth is conveyed by two tones (Paper ground, Board Wash or Cobalt Wash surfaces) and three weights of rule. The only `box-shadow` declarations are 1px inset outlines (the WATCH and CONTEXT tags, empty confidence dots and rung pips) and a flat Cobalt Wash spread that extends the highlight around a targeted /watch entry; none of them lift anything.

### Named Rules
**The Flat Sheet Rule.** Nothing floats. If something needs to stand apart, give it Board Wash or a rule, never a shadow or glow.

**The Three Rules Rule.** A 1px Rule separates items in a list; a 2px Ink rule opens a section; a 4px rung-coloured rule caps a rung. Each weight has one meaning.

## Shapes

Mostly square. Ladder steps, rung index cells and rung heads have no radius; their only shape is the coloured cap on top. Small radii appear only on interactive or inline objects: the focus ring and targeted-entry highlight (2px), inline code (3px), tag pills and the skip link (4px), buttons, code blocks and the feed field (6px), and the experiment panel (8px), the one rounded block on the page. Confidence dots are 7px circles; rung pips are 16×6px bars with a 1px radius, a small echo of the ladder's steps.

## Components

### Buttons
Plain, firm and few: at most two per view.
- **Shape:** gently rounded (6px), 44px minimum height, 24px horizontal padding, Schibsted Grotesk 600 at 1rem.
- **Primary:** Ink fill with Paper text ("Read issue 4", "Follow Ahead of Main").
- **Secondary:** transparent with a 1px Ink border and Ink text ("Follow", the follow-page links).
- **Hover / Focus:** primary turns Cobalt; secondary's border and text turn Cobalt. Background, border and colour transition at 160ms ease-out. Focus is the global 2px Cobalt outline at 3px offset.

### Navigation
- **Masthead:** the wordmark (Schibsted Grotesk 800, "Ahead of" in Ink, "Main" in Cobalt) left, four links right, a 1px Rule below. Wraps onto two lines on mobile.
- **Links:** Graphite, no underline, 10px vertical padding so each target is at least 44px tall. Hover goes to Ink. The current page is Ink with a 2px Ink underline.
- **Footer:** Graphite sans at 0.9rem with a 1px Rule above; byline left, "Elsewhere" links right.
- **Skip link:** an Ink pill with Paper text that appears on focus.

### Tag pills (chips)
The three tags are applied at build time from plain `**ACT NOW**`, `**WATCH**`, `**CONTEXT**` in the Markdown.
- **ACT NOW:** solid Cobalt with Paper text.
- **WATCH:** Cobalt text with a 1px inset Cobalt outline.
- **CONTEXT:** Graphite text with a 1px inset Rule Strong outline.
- **Shape:** 4px radius, 5px × 8px padding, 0.74rem bold grotesk. Fill strength tracks urgency: filled, outlined, quiet.

### Tag line and confidence mark
A paragraph that opens with a tag becomes the item's tag line: the pill, then a confidence mark, in Graphite sans at 0.85rem. The confidence mark is three 7px dots filled in Ink to the level (one for low, two for medium, three for high; empty dots are Rule Strong outlines), followed by the level in words ("Medium confidence") in Ink 600. The words always appear; the dots never stand alone.

### Source line and aside
A paragraph starting "Source:" or "Sources:" is set as a quiet source line: Graphite sans at 0.85rem, its links Graphite and turning Cobalt on hover. A paragraph that is only italics is an aside, in Graphite serif at 1rem.

### The experiment panel
The issue's closing build ("This week's experiment") is gathered into one block: Cobalt Wash fill, 8px radius, 8px/32px/24px padding (16px sides and an 8px bleed below 520px). Its heading drops the section rule and turns Cobalt; the first paragraph after it is Ink at 1.2rem. It is the only filled block in an issue.

### Cards / Containers
There are no cards. Grouping is done with rules and Board Wash: follow-page sections open with a 2px Ink rule, archive and board rows are separated by 1px Rules, earlier evidence by 1px dashed Rules.

### Inputs / Fields
- **Feed address:** the RSS URL in monospace on Board Wash, 6px radius, 44px tall, `user-select: all`, with an Ink "Copy address" button beside it (Cobalt on hover). The button is hidden until JavaScript confirms the clipboard is available, and a polite live region reports the result.

### The Disruption Watch ladder (signature component)
Four steps, Watching to Repricing the work, rising left to right. Each step is a Board Wash column with a 4px top cap in its rung colour, the rung name and count in that colour (Schibsted Grotesk 700, 0.95rem), and its entries as quiet Ink links (0.9rem, line-height 1.35) with a small Cobalt "New" marker where an entry is new. A 2px Ink rule and the heading "Disruption Watch" with its update date sit above; a footer line states what changed in this update and links to the evidence.

**Motion:** none on load. The ladder renders in place, because BRAND.md rules out anything that animates for attention. Interaction feedback is limited to 160ms ease-out transitions: button colours, and the evidence-log chevron on /watch turning when the log opens.

### Rung heads and pips (/watch)
Each rung section opens with a 4px cap in the rung colour, then a heading row: four 16×6px pips filled in the rung colour up to the rung's position (empty pips are Rule Strong outlines), the rung name in its colour (Schibsted Grotesk 700, 1.4rem), and the count in Graphite. The rung's meaning follows in Graphite sans. A targeted entry (from a ladder link) gets a flat Cobalt Wash highlight.

### Code
Inline code sits on Board Wash with a 3px radius. Code blocks use Shiki's github-light and github-dark themes (switched by colour scheme), 0.9rem, 16px padding, 6px radius, scrolling horizontally.

## Do's and Don'ts

### Do:
- **Do** open the home page with the tagline, the lede, two actions and the ladder, in that order, with the ladder inside the first desktop viewport.
- **Do** use the four rung colours only to show a rung, always next to the rung's name, and list rungs highest first wherever they stack.
- **Do** keep running text inside the 33em measure, and put issue orientation (dateline, contents) in the 13rem margin column.
- **Do** separate with rules: 1px Rule between items, 2px Ink above a section, 4px rung colour above a rung.
- **Do** set ACT NOW, WATCH and CONTEXT as filled, outlined and quiet pills, and pair every confidence mark's dots with the level in words.
- **Do** give every interactive target at least 44px of height and the 2px Cobalt focus outline.
- **Do** check every new colour pairing for 4.5:1 text contrast (3:1 for marks) in both light and dark.
- **Do** keep motion to short interaction feedback (colour, a chevron turning), and wrap anything larger in `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** use gradients, glow, neon greens or purple-to-blue anything; surfaces are flat Paper, Board Wash or Cobalt Wash.
- **Don't** use drop shadows to lift a surface.
- **Don't** add coloured side-stripe (border-left) callouts; emphasis comes from the experiment panel's fill or a top rule.
- **Don't** put kickers or eyebrows above headlines, or set any label other than the three tags in capitals.
- **Don't** use decorative imagery: no stock photos, glowing brains, robot hands, git-branch ornaments or AI-generated images. Social cards are rendered from HTML in the brand fonts.
- **Don't** use red for the top rung or anywhere else; the ceiling is oxblood.
- **Don't** use Cobalt as a decorative or background colour beyond Cobalt Wash in the experiment panel, selection and targeted entries.
- **Don't** set prose in the grotesk or headlines in the monospace; choose the face by its role.
- **Don't** add load, entrance or scroll animation; interface state changes stay at 160ms transitions.
