---
name: ankkshus
description: Two players at the family game table; each check-in is a space on a board, each person a dragon piece.
colors:
  felt: "#1e4d3a"
  felt-deep: "#163b2d"
  felt-line: "rgba(244, 235, 214, 0.1)"
  felt-text: "#f4ebd6"
  felt-text-soft: "#bfd3c6"
  card: "#f4ebd6"
  card-edge: "#e2d4b4"
  card-well: "#ebdfc4"
  input-paper: "#fffaf0"
  ink: "#1f1b17"
  ink-soft: "#5e554b"
  ink-faint: "#6f665a"
  player-a: "#c9402b"
  player-b: "#2c56a6"
  gold: "#d9a93a"
  gold-deep: "#b4871f"
  danger: "#a33a2a"
  space-1: "#f1d58a"
  space-2: "#e3a64a"
  space-3: "#c8623a"
  space-4: "#8e4b6b"
  space-5: "#4f4a86"
  space-6: "#2b2f55"
  space-empty: "#e9dec4"
typography:
  display:
    fontFamily: "Grandstander Variable, Grandstander, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Grandstander Variable, Grandstander, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 1.2vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Grandstander Variable, Grandstander, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  wordmark:
    fontFamily: "Grandstander Variable, Grandstander, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tabular-nums"
  body-small:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  focus: "4px"
  space: "6px"
  md: "8px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "20px"
  gutter: "clamp(16px, 4vw, 40px)"
  panel: "clamp(18px, 3vw, 28px)"
components:
  button-primary:
    backgroundColor: "{colors.player-b}"
    textColor: "{colors.card}"
    rounded: "{rounded.md}"
    padding: "0 1.1em"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#244a93"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 1.1em"
    height: "44px"
  button-gold-hover:
    backgroundColor: "#e6b84f"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 1.1em"
    height: "44px"
  button-quiet-hover:
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    rounded: "{rounded.md}"
    padding: "0 1.1em"
    height: "44px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.panel}"
  input:
    backgroundColor: "{colors.input-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "44px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "40px"
  nav-link-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
    height: "36px"
  chip-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  scale-option:
    backgroundColor: "{colors.input-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "6px 2px"
    height: "56px"
  scale-option-checked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
  board-space:
    backgroundColor: "{colors.space-empty}"
    textColor: "{colors.ink}"
    rounded: "{rounded.space}"
    padding: "5px 7px"
  board-space-start:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.space}"
---

# Design System: ankkshus

Recorded on 2026-10-25 from the shipped code: `src/styles/app.scss`, `src/styles/_board.scss`, `src/styles/_pages.scss`, `src/components/Board.jsx`, `src/app/TopBar.jsx`, `src/dragons/dragons.jsx`, `src/lib/bands.js`, `src/lib/players.js`, and the pages under `src/features/`. Every value below was read from those files. The game page (`luci.html`, `src/game/`) is a separate world with its own colours and is outside this system.

## Overview

**Creative North Star: "The Family Game Table"**

The page is a felt-green table. Everything a person reads sits on card stock laid on the felt: a cream panel with dark brown ink and a short shadow underneath. There are two players, a brother and a sister, each with a colour and a dragon piece. Each check-in is one square space on a serpentine track, coloured by the Burns range it falls in. A person's piece stands on their latest space.

The site has one committed field colour and one data colour scale. Hierarchy comes from size and weight, never from ornament, kickers, or decoration. The display face is a rounded, heavy, hand-lettered sans; body text is the system face so that notes and tables read like plain writing. The whole thing is built phone-first: the board is six columns at phone width and eight above 560px, every control is at least 44px tall, and the top bar wraps its links onto a second row below 720px.

The world refuses the wellness-app arrangement and the D&D costume. There is no big score, no ring, no streak, no parchment texture, no blackletter, no gothic border. A check-in total is shown at body size inside a sentence that quotes Burns' own range, so it is material to weigh rather than a verdict.

**Key Characteristics:**
- One field colour (felt green) under cream card panels; dark brown ink, never black.
- Two player colours (ember red, cobalt) that mean "her" and "him" and nothing else; gold is foil for focus, the Start space, and one button.
- A six-step board scale from pale gold to night is the only data colour.
- Grandstander Variable, bold, slightly tight, for every heading and the wordmark; system stack with tabular numerals for everything else.
- A faint 40px ruled grid on the felt and a faint cell grid inside the board.
- Motion is small and rare: pieces slide 600ms on an exponential ease-out; the first load deals panels in over 180ms.

## Colors

A warm, dark table with light card stock on it, two saturated player colours, gold foil, and a graded data scale.

### Primary
- **Felt** (`felt`): the page background, the one committed field. `felt-deep` is defined for a darker edge but no shipped rule uses it yet.
- **Card** (`card`): every panel, the top bar, and the text colour on the felt. Felt text at rest is this cream; secondary text on the felt is `felt-text-soft`.
- **Ink** (`ink`): all text on card stock, the current nav pill, the checked scale option, the pressed chip. `ink-soft` is secondary text on card; `ink-faint` is placeholder text only.

### Secondary
- **Ember red** (`player-a`): the first player's piece, her legend swatch, and the dragon mark in the wordmark and the login mark. Never used for errors.
- **Cobalt** (`player-b`): the second player's piece, the primary button, links inside panels, the input caret and focus border, and `accent-color`.
- **Gold** (`gold`): the 3px focus ring on every element, the Start space, the board space hover ring, finished progress steps, text selection on the felt, and the `btn-gold` action ("Do it now"). `gold-deep` is defined and unused.

### Tertiary
- **Board scale** (`space-1` to `space-6`): pale gold, amber, rust, plum, indigo, night. One colour per Burns range (0-5, 6-10, 11-25, 26-50, 51-75, 76-100), set in `src/lib/bands.js`. Spaces in ranges 3 to 6 switch their text to `card`. The same colours fill the legend swatches, the history-table swatch, and the result sentence swatch. `space-empty` is a space with no check-in on it.
- **Danger** (`danger`): error text and the outline of a danger button. Error text inside a panel sits on a pale pink well (#f8e3dd). The crisis well (#fff3d6, `.crisis`) is styled but not rendered anywhere; the 988 line ships as a muted section intro.

### Neutral
- **Card edge** (`card-edge`): 2px borders on inputs, scale options, and chips; 1px rules between questions, answers, and table rows.
- **Card well** (`card-well`): the board's base under the spaces, nav link hover, and the image placeholder behind thumbnails.
- **Input paper** (`input-paper`): the lighter cream inside inputs, textareas, and scale options, so they read as fields on the card.
- **Felt line** (`felt-line`): the 1px rules of the 40px grid drawn on the felt.

### Named Rules
**The One Data Colour Rule.** Only the six board-scale colours encode a value. Player colours identify a person, gold marks focus or the Start space, and nothing else carries meaning by hue.

**The Ink Not Black Rule.** Text on card stock is `ink` (#1f1b17). Pure black appears nowhere, including shadows, which are translucent black at 12% to 55%.

**The Two Players Rule.** `player-a` and `player-b` are assigned by sign-up order in `src/lib/players.js` and are never used as a brand accent. The primary button borrows cobalt because it is the host's colour, not because cobalt is "the brand".

## Typography

**Display Font:** Grandstander Variable (self-hosted via `@fontsource-variable/grandstander`, imported in `src/main.jsx`; falls back to Grandstander, then `system-ui`)
**Body Font:** `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`

**Character:** Headings are heavy, rounded and hand-lettered, with slight negative tracking (-0.02em) and balanced wrapping. Everything else is the reader's own system face at 17px with tabular numerals, so a note reads like a note and a column of totals lines up.

### Hierarchy
- **Display** (700, `clamp(2rem, 1.4rem + 2.6vw, 3.25rem)`, 1.1): the page H1, for example "Hi, mrkit." and "Saved.".
- **Headline** (700, `clamp(1.375rem, 1.1rem + 1.2vw, 1.875rem)`, 1.1): panel H2s such as "The board", "Notes", "Newest video", and quiz section titles.
- **Title** (700, 1.125rem, 1.1): H3s inside panels: a note's title, an answer section.
- **Wordmark** (800, 1.35rem on the top bar, 1.6rem on the login card): "ankkshus" beside the dragon mark.
- **Body** (400, 1.0625rem, 1.5, tabular numerals): all prose, buttons at weight 600, field labels at 600 and 0.95rem.
- **Body small** (0.95rem): metadata, help text, table cells, legend at 0.9rem, footer at 0.9rem.
- **Label** (700, 0.78rem, 0.06em, uppercase): table column headers only.

### Named Rules
**The Rank By Weight Rule.** Inside a table or a list, rows share one size and rank is carried by weight (700 for the total or the relative date, 400 for the long date). The uppercase column header is the only size change a table makes.

**The Number In A Sentence Rule.** A check-in total appears at body size (1.1rem in `.result-total`) as "Total 24." followed by Burns' own range for it. It is never set in display size, never alone, and never coloured by the danger token.

**The No Kicker Rule.** Headings carry their own weight. There is no eyebrow, kicker, or overline above any heading; `.eyebrow-free` exists only to make that explicit.

## Layout

The shell is a three-row grid (top bar, main, footer) with a single column pinned to the viewport (`minmax(0, 1fr)`) so nothing can widen the page. `main` is capped at 1180px, centred, with a horizontal gutter of `clamp(16px, 4vw, 40px)` and vertical padding of `clamp(20px, 4vw, 40px)` top and 56px bottom.

The home page stacks greeting, board panel, notes panel, newest video, and game card in one column at phone width. At 900px and above it becomes two columns: content and a 320px right column. Panels within a column stack with 16px gaps (`.stack`); the home grid uses 20px. The check-in library goes to two columns at 720px; the video grid is `auto-fill, minmax(220px, 1fr)` at 14px gaps.

The board is a square grid of spaces, six columns under 560px and eight above, with an 8px gap and 8px padding. Cells are square (`aspect-ratio: 1`). The piece layer is an identical grid laid over the spaces, so a piece sized to one cell moves one space when translated by `100% + gap`. The quiz runner is capped at 760px; the login card at 420px; prose inside notes and question prompts at `--measure` (68ch).

Rhythm uses 4, 6, 8, 10, 12, 14, 16, 18, 20 px steps; 8, 12 and 16 are the common ones. Every interactive element is at least 44px tall (buttons, inputs), 40px for nav links, 36px for chips, 56px for scale options. Hover rules are wrapped in `@media (hover: hover) and (pointer: fine)` so touch devices get no sticky hover state.

The top bar is sticky at the top with the wordmark on the left, nav in the middle, and the signed-in name with "Log out" on the right. Below 720px it wraps: wordmark and name on the first row, nav links on a second row.

## Elevation & Depth

Depth is the physical stack of card stock on felt. Panels and the top bar carry a short offset shadow; nothing else lifts. Fields and the board sit in slightly different creams (`input-paper`, `card-well`) rather than casting shadows. The board's spaces have an inset 3px bottom edge so they read as tiles; dragon pieces have a drop shadow so they stand on the tile.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 0 rgba(0,0,0,0.12), 0 12px 28px -14px rgba(0,0,0,0.5)`): every `.card` panel.
- **Raise** (`box-shadow: 0 2px 0 rgba(0,0,0,0.16), 0 18px 36px -16px rgba(0,0,0,0.55)`): defined as `--shadow-raise`; no shipped rule uses it yet.
- **Top bar** (`box-shadow: 0 2px 0 rgba(0,0,0,0.14), 0 10px 24px -14px rgba(0,0,0,0.45)`): the sticky header.
- **Tile edge** (`box-shadow: inset 0 -3px 0 rgba(0,0,0,0.12)`): every board space with a check-in.
- **Piece** (`filter: drop-shadow(0 3px 2px rgba(0,0,0,0.35))`): dragon pieces on the board.
- **Space hover** (`0 0 0 3px var(--gold)` added to the tile edge): pointer hover on a space that is a link.

### Named Rules
**The Card On Felt Rule.** Shadows exist only to say "this panel is lying on the table". A shadow is never used for hover, for emphasis, or on a control.

**The Soft Ground Rule.** The felt carries a radial highlight (`rgba(255,255,255,0.08)` ellipse at 50% -20%) and a 40px ruled grid at 10% cream. Panels never carry textures or gradients.

## Shapes

Corners are gently rounded and tiered by size: 14px on panels, 8px on buttons, inputs, the board, scale options and wells, 6px on board spaces and thumbnails, 4px on the focus ring, 3px on legend swatches, track bars and progress steps. Nav links and chips are pills (999px).

Borders are 2px on controls (inputs, scale options, chips, quiet buttons) and 1px rules elsewhere. Quiet and danger buttons draw their border in `currentColor`. Empty board spaces are outlined with a 1px inset ring at 10% ink and no fill.

The track between spaces is a 6px bar with 3px radius at 30% ink, drawn from each space toward the next, right or left along a row and down at a row's end. The dragon pieces are flat SVG silhouettes drawn in one flat colour (plus the paint attributes from `src/dragons/shapes.js`), all facing right and mirrored when the row runs leftward.

## Components

### Buttons
Real `<button>` or `<a>` elements with the `.btn` base: inline-flex, 44px minimum height, `0 1.1em` padding, 8px radius, 2px transparent border, weight 600, `font: inherit`. Active state nudges down 1px over 120ms on `--ease-out`. Disabled is 55% opacity.
- **Primary** (`btn-primary`): cobalt fill, cream text; hover #244a93. Used for the one action on a surface: "Check in today", "Begin", "Next part", "Save", "Back to the table".
- **Gold** (`btn-gold`): gold fill, ink text; hover #e6b84f. Used once, for "Do it now" on the history page.
- **Quiet** (`btn-quiet`): transparent, border in `currentColor`; hover 6% black. "Write a note", "Not now", "Back", "History".
- **Danger** (`btn-danger`): transparent, text and border in `danger`. No hover rule.
- **Link button** (`btn-link`): text with a 1px underline at 0.18em offset; "Log out" in the top bar.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** `card`, text in `ink`.
- **Shadow Strategy:** the Card shadow; see Elevation.
- **Border:** none.
- **Internal Padding:** `clamp(18px, 3vw, 28px)`.
- Inside a card, links turn cobalt, selection becomes cobalt on cream, and `.muted` becomes `ink-soft`. Panel headers (`.page-title`, `.board-head`) are a flex row with the heading on the left and one action on the right, wrapping at narrow widths.

### Inputs / Fields
- **Style:** `input-paper` fill, 2px `card-edge` border, 8px radius, `10px 12px` padding, 44px minimum height, cobalt caret, placeholder in `ink-faint`. A `.field` is a grid with a 6px gap and a 600-weight label at 0.95rem.
- **Focus:** border turns cobalt; the global 3px gold outline is suppressed on text inputs only.
- **Error:** `.error` text in `danger` at weight 600; inside a card it sits on a #f8e3dd well with 8px radius.

### Navigation
The top bar is card stock, sticky, with its own shadow. The wordmark is the dragon mark (28px, ember red) plus "ankkshus" in Grandstander 800 at 1.35rem. Links are 40px pills at 12px side padding, weight 600, `ink-soft` text; the current page is an ink pill with cream text; hover (pointer only) is a `card-well` pill with ink text. The signed-in name and "Log out" sit right in `ink-soft`. Below 720px the nav drops to a full-width second row and wraps.

### Chips
Pill buttons (`.chip`) at 36px with a 2px `card-edge` border on `card`, weight 600; pressed (`aria-pressed="true"`) is an ink pill with cream text. Used for channel filters on the videos page.

### The Board (signature)
A serpentine track of square spaces on a `card-well` plate with a faint 1/6 cell grid at 7% ink. The first space is "Start" in gold, set in Grandstander. Each following space is one check-in: a link filled with its band colour, the total top-left at 700 weight (`clamp(0.7rem, 0.55rem + 0.6vw, 0.95rem)`), the short date bottom-left at 0.625rem and 80% opacity. Cells with no check-in are outlined only. Track bars join consecutive spaces. The last twelve check-ins show on the home board; the result page shows eleven plus the new one.

Pieces are 60% of a cell, standing in the lower corners (slot 0 at `translate(22%, 18%)`, slot 1 at `translate(-22%, 18%)`) so the number stays readable. A piece is positioned by `--row` and `--col` and slides with `transition: translate 600ms var(--ease-out)`. Under `prefers-reduced-motion: reduce` the slide is replaced by a 200ms opacity transition. On the result page the new check-in is withheld for 450ms and then revealed, so the piece is seen to move.

Above the board, `.players` lists each person as their dragon at 26px in their colour next to their name in ink. Below it, `.board-legend` lists the six ranges with 14px swatches at 3px radius in `ink-soft` at 0.9rem.

### Dragon pieces
Six flat SVG silhouettes in `src/dragons/dragons.jsx`: Red dragon, Sea serpent, Wyvern, Lung dragon, Frost drake, Hatchling, each on a 64-unit box, drawn facing right, mirrored via `facing="left"`. The colour is passed in, so any piece can take either player colour. `DragonMark` is a 32-unit mark for the wordmark and login card. Sign-up order picks the piece (first user Red dragon, second Sea serpent) until a chosen piece replaces the default.

### Quiz runner
A 760px column. Progress is a row of 28x6px bars at 3px radius: 25% cream for pending, gold for done, cream for the current part, with "Part n of m" beside it in `felt-text-soft` at 600. Each section is a card with the H2, an intro in `.muted`, and questions separated by 1px `card-edge` rules with 16px vertical padding.

The 0 to 4 scale is five equal columns at a 6px gap. Each option is a label with a hidden radio: `input-paper`, 2px `card-edge` border, 8px radius, 56px minimum height, the digit at 700 over a word ("Not at all" to "Extremely") at 500 and 0.7rem in `ink-soft`. Checked becomes ink with cream text. Keyboard focus draws the 3px gold ring. Below 420px the words are hidden and the digits stay.

The result card says "Saved." as an H1, then "Total N." at body size with the band swatch (18px, 4px radius) and the sentence "Burns puts a to b as 'label'", then the change from last time in `.muted`, then the line that a checklist is not a diagnosis, then the small board.

### History table
`.history` at 0.95rem, collapsed borders, `10px 8px` cell padding, 1px `card-edge` row rules. Headers are the Label style (0.78rem, uppercase, 0.06em, `ink-soft`). The "When" cell stacks a bold relative date over the muted full date. The total cell is weight 700 with tabular numerals and a 14px band swatch before it.

### Motion
- **Piece slide:** `translate 600ms cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`). Reduced motion: 200ms opacity only.
- **First-load deal:** children of `.deal` start at `opacity: 0; translate: 0 6px` via `@starting-style` and settle over 180ms on `--ease-out`, each child 40ms after the previous, up to eight. Reduced motion: no translate, opacity only.
- **Controls:** buttons, nav links, chips and scale options change colour over 120ms `ease`; the button press is 120ms on `--ease-out`. Reduced motion removes button transitions.
- `--ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`) is defined and unused.

## Do's and Don'ts

### Do:
- **Do** put everything a person reads on a `.card` panel; the felt holds only headings, muted lines, the progress row and the footer.
- **Do** keep every control at 44px or taller and real: `<button>`, `<a>`, `<input>`, with the global 3px gold `:focus-visible` ring.
- **Do** colour a value only with the six `space-n` tokens and always show the matching legend or Burns sentence beside it.
- **Do** show a total as "Total N." at body size inside a sentence that quotes Burns' range, followed by the line that a checklist is not a diagnosis.
- **Do** build phone width first: one column, six board columns, wrapping top bar; widen at 560, 720 and 900px.
- **Do** keep tables at one size with rank by weight; headers are the only uppercase text in the system.
- **Do** keep every page behind login; the login card is the only surface an unauthenticated visitor sees.
- **Do** move a piece with `translate` on `--ease-out` at 600ms and give reduced motion an opacity-only path.

### Don't:
- **Don't** show a score large, alone, in red, or with a verdict word of your own; Burns' label is quoted, never asserted.
- **Don't** add rings, streaks, progress percentages, or any wellness-app chart; the board is the only picture of change.
- **Don't** use parchment, blackletter, gothic borders, or textured panels; panels are flat cream with one shadow.
- **Don't** use `player-a` or `player-b` as a decorative accent; they name a person.
- **Don't** add kickers, eyebrows, or overlines above headings.
- **Don't** set body text or UI copy in Grandstander; it is for headings, the wordmark, and the Start space only.
- **Don't** use pure black for text or shadow, or a system display face in place of Grandstander.
- **Don't** add hover-only affordances outside `@media (hover: hover) and (pointer: fine)`.
- **Don't** carry the Luci game's colours (#0052e7 sky, #3d8f3a ground, #9be36b alien) onto any surface other than its home-page card; the game is its own world.
