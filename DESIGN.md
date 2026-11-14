---
name: ankkshus
description: A calm editorial reference for two people: a manual, a therapy course, a feelings map, and a fear-of-death course, set as quiet pages of serif headings on warm paper.
colors:
  table: "#f7f5ef"
  table-text: "#1c1b19"
  table-text-soft: "#57524a"
  card: "#fffdf9"
  card-edge: "#e4ded1"
  card-well: "#f2eee5"
  ink: "#1c1b19"
  ink-soft: "#57524a"
  ink-faint: "#7a7469"
  player-a: "#a8432f"
  player-b: "#1d6a65"
  gold: "#b58a3c"
  danger: "#9e3a2c"
  space-1: "#f1d58a"
  space-2: "#e3a64a"
  space-3: "#c8623a"
  space-4: "#8e4b6b"
  space-5: "#4f4a86"
  space-6: "#2b2f55"
  space-empty: "#e9dec4"
typography:
  display:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 2.9rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.3rem, 1.1rem + 0.8vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, Times New Roman, serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  wordmark:
    fontFamily: "Newsreader Variable, Newsreader, Georgia, Times New Roman, serif"
    fontSize: "1.4rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tabular-nums"
  lede:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  focus: "4px"
  sm: "6px"
  lg: "8px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "20px"
  xl: "24px"
  gutter: "clamp(16px, 4vw, 40px)"
  panel: "clamp(18px, 3vw, 28px)"
  measure: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.player-b}"
    textColor: "{colors.card}"
    rounded: "{rounded.sm}"
    padding: "0 1.1em"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#175752"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 1.1em"
    height: "44px"
  button-gold-hover:
    backgroundColor: "#c79a4a"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 1.1em"
    height: "44px"
  button-quiet-hover:
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
    padding: "0 1.1em"
    height: "44px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.panel}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
    height: "44px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    padding: "0 12px"
    height: "40px"
  nav-link-current:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "40px"
  chip-on:
    backgroundColor: "{colors.player-b}"
    textColor: "#ffffff"
  rate-option:
    backgroundColor: "#fffaf0"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "44px"
  rate-option-on:
    backgroundColor: "{colors.player-b}"
    textColor: "{colors.card}"
  well:
    backgroundColor: "{colors.card-well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  sos:
    backgroundColor: "{colors.danger}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "14px 18px"
  tag:
    backgroundColor: "{colors.card-well}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: ankkshus

Recorded on 2026-11-13 from the shipped code: `src/styles/app.scss`, `src/styles/_guide.scss`, `src/app/TopBar.jsx`, `src/main.jsx`, and the pages under `src/features/` (home, manual, therapy, feel, fear, settings). The archived pages (Check-in, Notes, Videos) are styled by `src/styles/_pages.scss` and `src/styles/_board.scss`; they are legacy and described only where they still affect shared tokens. The game page (`luci.html`, `src/game/`) is a separate world and is outside this system.

## Overview

**Creative North Star: "Calm Editorial"**

The site reads like a well-set reference book. Pages are warm paper white with deep ink text. Headings are Newsreader, a text serif, at medium weight. Body text is the reader's system sans at 17px. One muted teal is the only accent: it marks the primary action, links inside panels, the current nav item, focus, and a chosen answer.

Content sits on white sheets with a 1px hairline edge and an 8px corner. Nothing casts a shadow. Lists are divided by 1px rules, not boxes. The city-dragon watercolour from the first ankkshus appears only on the home page, faint, under a heavy paper wash.

The four sections in the top bar are Manual ("what to do when"), Therapy, Feelings map, and Fear of death. Check-in, Notes and Videos are archived and reached from Settings. Those archived pages keep the earlier board-game look: a board of coloured spaces, dragon pieces, and two player colours.

Hierarchy comes from the serif, size, and weight. There are no kickers, no big scores, no rings or streaks, and no decoration added to a heading. The layout is phone-first: every control is at least 44px tall, and the top bar puts its four links on a second row below 720px.

**Key Characteristics:**
- Warm paper (#F7F5EF) page, white sheets (#FFFDF9) with a 1px `card-edge` hairline, deep ink (#1C1B19) text.
- One accent, muted teal (#1D6A65). Its token is still named `player-b` because the archived pages use it.
- Newsreader Variable at weight 500 to 600 for headings, the wordmark, and a few large numbers; system sans with tabular numerals for everything else.
- No shadows. Separation is by hairline rules and by the `card-well` tint.
- The watercolour shows on the home page only, behind a paper wash of 94% to 55% opacity.
- Motion is small: a 180ms first-load fade on some pages and 120ms colour changes on controls.

## Colors

Warm neutrals carry almost everything. Teal is the one accent; red is reserved for danger and the dragon mark.

### Primary

- **Table** (`table`): the page background and, at 94% opacity, the sticky top bar. Text on it is `table-text`; secondary text is `table-text-soft`.
- **Card** (`card`): every `.card` and `.panel` sheet, the chip fill, and the welcome-back note.
- **Ink** (`ink`): all text on sheets. `ink-soft` is secondary text, the lede, nav links, and metadata. `ink-faint` is placeholder text, the Therapy section numbers, the day-strip labels, and the arrow on list links.

### Secondary

- **Teal** (`player-b`, also exposed as `--accent`): the primary button, links inside a sheet, the current nav underline, the input caret and focus border, the 2px focus outline, selection inside a sheet, a chosen chip or rating, the correct trap answer, the feelings-map marker, filled day-strip halves, and `accent-color`. Hover on the primary button is #175752. Page-level text selection is a pale teal, #CFE3E0.
- **Gold** (`gold`): one button, "Answer it" on the fear page when a review is due (`btn-gold`, hover #C79A4A).
- **Ember** (`player-a`): the dragon mark beside the wordmark. On new pages it has no other use.

### Tertiary

- **Danger** (`danger`): error text, the danger button, the red dot beside urgent manual entries, the wrong trap answer, and the 911 strip (`.sos`), the one place red is a background. Errors inside a sheet sit on a pale pink well (#F8E3DD).
- **Feelings map tints** (page-local, in `_guide.scss`): four quadrant fills (#F3DCD3, #F4E8CC, #DBE2EA, #DDE8DC) and four matching swatch colours for the history list (rust #C9705A, ochre #C9A14A, slate #6F86A3, sage #7F9C7C). They encode the quadrant a feeling was placed in and are not used elsewhere.
- **Board scale** (`space-1` to `space-6`, `space-empty`): legacy. Used by the archived Check-in board, one colour per Burns range. On a new page, `space-1` to `space-3` still fill the alarm meter in the fear course (`.sim-meter`).

### Neutral

- **Card edge** (`card-edge`): the 1px border on every sheet, chip and the feelings map; the top bar's bottom rule; the 1px dividers between list rows; the 2px border on rating options.
- **Card well** (`card-well`): tinted insets inside a sheet: step boxes, reveals, the alarm picture, comparison cells, trap feedback, tags, and empty day-strip halves.
- **Input white** (#FFFFFF, not a token): text inputs and textareas, with a #D6CFC0 border.

### Named Rules

**The One Accent Rule.** Teal is the only accent on new pages. It marks an action, a link, the current place, focus, or a choice the reader made. It is never a fill for decoration.

**The Ink Not Black Rule.** Text is `ink` (#1C1B19). Pure black is used only as the backdrop of the course video (#111) and in the 6% quiet-button hover.

**The Red Means Danger Rule.** `danger` appears only for errors, urgent entries, a wrong answer, and the 911 strip. The ember of the dragon mark is a separate token and stays on the mark.

## Typography

**Display Font:** Newsreader Variable (self-hosted via `@fontsource-variable/newsreader`, imported in `src/main.jsx`; falls back to Newsreader, Georgia, then Times New Roman)
**Body Font:** `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`

**Character:** Headings are a text serif at medium weight with -0.01em tracking, 1.15 line height and balanced wrapping. Body text is the system face at 17px with tabular numerals, so lists of numbers and times line up.

### Hierarchy

- **Display** (500, `clamp(2rem, 1.5rem + 2vw, 2.9rem)`, 1.15): the page H1, for example "Hi, mrkit." on home.
- **Headline** (500, `clamp(1.3rem, 1.1rem + 0.8vw, 1.6rem)`, 1.15): H2s on sheets, such as "What to do when…" and "How are you feeling?".
- **Title** (600, 1.15rem): H3s inside sheets and step boxes.
- **Wordmark** (600, 1.4rem): "ankkshus" beside the dragon mark in the top bar.
- **Serif numerals**: the Therapy section number (1.8rem, `ink-faint`), the section title (1.35rem), and the value in a comparison cell (`.compare dd`, 1.8rem, 500).
- **Lede** (1.08rem, `ink-soft`, max `--measure`): the paragraph under a page H1.
- **Body** (400, 1.0625rem, 1.5, tabular numerals): all prose. Buttons are weight 600; field labels 600 at 0.95rem.
- **Body small** (0.85rem to 0.95rem): metadata, contact notes, map axis labels, sources, footer at 0.9rem. Day-strip labels are 0.75rem.

### Named Rules

**The Serif For Headings Rule.** Newsreader sets headings, the wordmark, and a few large numbers. Body text, buttons, labels and form fields stay in the system sans.

**The Rank By Weight Rule.** Inside a list, rows share one size and rank is carried by weight (600 to 700 for the label, 400 for the detail in `ink-soft`).

**The No Kicker Rule.** Headings carry their own weight. There is no eyebrow, kicker, or overline above any heading.

## Layout

The shell is a three-row grid (top bar, main, footer) with one column pinned to the viewport (`minmax(0, 1fr)`) so nothing widens the page. `main` is capped at 1180px, centred, with a gutter of `clamp(16px, 4vw, 40px)` and padding of `clamp(20px, 4vw, 40px)` top and 56px bottom.

Reading columns are narrower: prose and ledes stop at `--measure` (66ch); a situation or fear step at 760px; a Therapy section page at 820px; the Therapy section list at 760px.

Two-column layouts appear only on wide screens: home and the fear page become content plus a 320px side column at 900px; the feelings map gets a 360px side column at 960px; the manual groups go to two columns at 760px; Settings goes to three at 900px. Below those widths everything stacks with 16px gaps (24px on the feelings page).

Rhythm uses 4, 6, 8, 10, 12, 14, 16, 18, 20 and 24px steps; 8, 12 and 16 are the common ones. Buttons and inputs are at least 44px tall, list links 48px, nav links and chips 40px. Hover rules sit inside `@media (hover: hover) and (pointer: fine)`.

The top bar is sticky: wordmark left, four section links, then a gear icon with the word "Settings". Below 720px the links move to a full-width second row that scrolls sideways if needed, the gear stays on the first row with its label hidden, and link padding tightens to 8px.

## Elevation & Depth

There is no elevation. `--shadow-card` is set to `none`. Sheets are separated from the page by a 1px `card-edge` border and a slightly lighter fill. Insets inside a sheet use the `card-well` tint. The top bar is translucent paper with a 6px backdrop blur and a 1px bottom rule.

### Shadow Vocabulary

- **Nav underline** (`box-shadow: inset 0 -2px 0 var(--player-b)`): the current section link. It is the only `box-shadow` on new pages and draws a 2px line.
- Legacy only: the archived board keeps a 3px inset tile edge, a gold hover ring, and a drop shadow on dragon pieces (`_board.scss`).

### Named Rules

**The Hairline Rule.** Separation is a 1px `card-edge` line: around sheets, between list rows, under the top bar. Shadows are not used for depth, hover, or emphasis.

**The Quiet Ground Rule.** The page is flat `table` colour. Only the home page shows the watercolour, on a fixed layer behind a paper gradient (94% to 55% opacity on wide screens, 95% to 60% below 900px). No grid, texture, or pattern anywhere.

## Shapes

Two corner sizes: 8px (`--radius-lg`) on sheets, the 911 strip and the feelings map; 6px (`--radius`) on buttons, inputs, the welcome-back note, wells, rating options, comparison cells and the course video. The focus outline is 4px. Chips, tags and the alarm meter are pills (999px). Small marks are circles: the danger dot (10px) and the feeling swatch (12px). Day-strip halves and history bars round only their outer corners at 4px.

Borders are 1px nearly everywhere. Quiet and danger buttons draw a 2px border in `currentColor`; rating options use a 2px `card-edge` border.

## Components

### Buttons

`.btn` base: inline-flex, 44px minimum height, `0 1.1em` padding, 6px radius, 2px transparent border, weight 600, `font: inherit`. Active nudges down 1px over 120ms on `--ease-out`. Disabled is 55% opacity.
- **Primary** (`btn-primary`): teal fill, card-white text; hover #175752. "Open the feelings map", "Save", step actions.
- **Gold** (`btn-gold`): gold fill, ink text; hover #C79A4A. Only "Answer it" on the fear page.
- **Quiet** (`btn-quiet`): transparent with a `currentColor` border; hover 6% black. "Carry on", "Watch and practice", "All N".
- **Danger** (`btn-danger`): transparent, text and border in `danger`. No hover rule.
- **Link button** (`btn-link`): underlined text at 0.18em offset, for secondary actions such as "The fear is here now".

### Cards / Containers

- **Corner Style:** 8px.
- **Background:** `card`, text `ink`.
- **Shadow Strategy:** none; see Elevation.
- **Border:** 1px `card-edge`.
- **Internal Padding:** `clamp(18px, 3vw, 28px)`.
- Inside a sheet, links turn teal, selection is teal on card white, and `.muted` becomes `ink-soft`. `.panel` is the same sheet with a 14px grid gap. `.card-head` is a row with the H2 left and one action right.
- **Well** (`.steps-box`, `.reveal`, `.sim`, `.compare div`, `.trap-feedback`): `card-well` fill, 6px radius, 10px to 16px padding, no border.

### Inputs / Fields

- **Style:** white fill, 1px #D6CFC0 border, 6px radius, `10px 12px` padding, 44px minimum height, teal caret, placeholder in `ink-faint`. `.field` is a grid with a 6px gap and a 600-weight label at 0.95rem. The manual search input is 52px tall at 1.05rem.
- **Focus:** border turns teal; the outline is removed on text inputs only. Everything else gets the global 2px teal `:focus-visible` outline at 2px offset.
- **Checkboxes** (`.check`): native input at 20px in a 44px row.
- **Error:** `.error` in `danger` at 600; inside a sheet on a #F8E3DD well.

### Navigation

The top bar is translucent paper, sticky, with a 1px bottom rule. The wordmark is the 22px dragon mark in ember plus "ankkshus" in Newsreader 600 at 1.4rem. Section links are 40px tall, 12px side padding, weight 500, `ink-soft`; hover turns them `ink`. The current link is `ink` with a 2px teal underline drawn as an inset shadow. Settings is an SVG gear with its label, `ink-soft`, turning `ink` when current.

### Lists

- **Ruled list** (`.situation-list`, `.contact-list`, `.log-list`, `.feel-history`, `.ladder-builder`, `.toolbox`): no bullets, 1px `card-edge` rule between rows.
- **List link** (`.situation-link`, `.quick-list a`): 48px row, weight 500 to 600, `ink`, hover teal. Urgent manual entries lead with the danger dot.
- **Section row** (Therapy): a three-column grid of serif number, serif title, and a state line in `ink-soft`, with 18px vertical padding and 1px rules above and below. Hover turns the title teal. Below 520px the state drops under the title.

### Chips and tags

- **Chip** (`.chip`, feelings words): 40px pill, 1px `card-edge` border, `card` fill, 14px side padding. Chosen (`.is-on`) is a teal pill with white text.
- **Tag** (`.tag`): small pill on `card-well`, `ink-soft`, 0.8rem at 600. Marks the evidence level on a source or a contact.

### 911 strip

`.sos`: a full-width link on `danger` with white text, 8px radius, `14px 18px` padding, the number in 700 at 1.15rem. It heads the manual and every urgent situation.

### Rating 0 to 10

`.rate10-row`: eleven equal columns at a 4px gap, max 520px. Each option is a label over a hidden radio, 44px tall, 6px radius, 2px `card-edge` border on #FFFAF0, the digit at 700 with tabular numerals. Chosen is teal with card-white text. End labels sit below at 0.85rem.

### Feelings map

A square SVG in a 1px `card-edge` frame with 8px corners and a crosshair cursor. Four muted quadrant fills, axis lines at 25% ink, words at 11px in `ink-soft`, past points in ink at 35%, and the current point as a teal dot with an 18% teal halo. Axis labels sit outside the square at 0.85rem, 600, `ink-soft`; the side labels run vertically.

### Fear course pieces

- **Alarm picture** (`.sim`): a well with an 18px pill meter (fill `space-1` to `space-3`, 400ms on `--ease-out`) and a bar history of up to 40px bars, teal for "let it be" and #9A9187 for "pushed away".
- **Comparison** (`.compare`): auto-fit cells of at least 150px on `card-well`, label in `ink-soft` at 0.9rem over a Newsreader value at 1.8rem.
- **Trap options**: quiet buttons in one or two columns, left-aligned. A correct pick turns teal; a wrong pick gets a `danger` border and text.

### Practice day strip

Fourteen columns at a 4px gap, max 560px. Each day is two 14px halves (morning, evening) on `card-well`, filled teal when done, with a 0.75rem `ink-faint` label.

### Archived pages (legacy)

Check-in, Notes and Videos still render with `_pages.scss` and `_board.scss`: the serpentine board of `space-n` coloured squares, dragon pieces sliding 600ms on `--ease-out`, player colours in a legend, the 0 to 4 quiz scale, an uppercase-headed history table, and video chips. They inherit the new tokens where they share them, so their teal and paper match the rest of the site. New pages should not reuse these patterns.

### Motion

- **First-load fade** (`.deal`, on home and the archived pages): children start at `opacity: 0; translate: 0 6px` via `@starting-style` and settle over 180ms on `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`), 40ms apart, up to eight. Reduced motion: opacity only.
- **Controls**: buttons, nav links, section titles and rating options change colour over 120ms; the button press is 120ms on `--ease-out`. Reduced motion removes button transitions.
- **Alarm meter**: `transform 400ms var(--ease-out)`; none under reduced motion.

## Do's and Don'ts

### Do:

- **Do** put grouped content on a `.card` sheet with a 1px `card-edge` border and no shadow.
- **Do** separate list rows with a 1px `card-edge` rule rather than boxing each row.
- **Do** use teal for one primary action per surface, links in a sheet, the current place, focus, and the reader's own choice.
- **Do** set headings in Newsreader at 500 (H3 at 600) and everything else in the system sans.
- **Do** keep controls at 44px or taller and real (`<button>`, `<a>`, `<input>`), with the 2px teal `:focus-visible` outline.
- **Do** keep reading columns to 66ch for prose and 760px to 820px for step and section pages.
- **Do** build phone width first and widen at 520, 560, 600, 700, 720, 760, 900 and 960px as the page needs.
- **Do** keep every page behind login.

### Don't:

- **Don't** add shadows, gradients or textures to sheets or controls.
- **Don't** show the watercolour anywhere but the home page.
- **Don't** add a second accent colour, or use `danger` for anything but danger.
- **Don't** add kickers, eyebrows, or overlines above headings.
- **Don't** set body text, buttons or labels in Newsreader.
- **Don't** bring the archived board-game look (board spaces, dragon pieces, player colours, gold foil) onto new pages.
- **Don't** add hover-only affordances outside `@media (hover: hover) and (pointer: fine)`.
- **Don't** carry the Luci game's colours (#0052e7 sky, #3d8f3a ground, #9be36b alien) onto any site page; the game is its own world.
