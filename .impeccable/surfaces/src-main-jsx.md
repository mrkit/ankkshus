---

version: 1
slug: "src-main-jsx"
primary_target: "src/main.jsx"
related_targets: ["src/app/App.jsx","index.html"]
---

# Surface: the whole app shell, home first

Scope: web app, Operate mode. Two signed-in users (a brother and a sister). Jobs: read what is new from the other one, do or review a check-in, write a note, add or watch a video, open the game. Everything behind login.

Audience and constraints: see PRODUCT.md. Phone width is the first viewport that has to work. The check-in is not a diagnosis and no screen may present a score as a verdict. World pinned by Anthony: board games and dragons.

## Direction contract

THESIS: Two players at the family game table. Each check-in is a space on a board track; each person is a dragon piece standing on their latest space. The site refuses the wellness-app arrangement (no big score, no progress ring, no streak) and the D&D costume (no parchment, no blackletter, no gothic borders).

OWN-WORLD: The table. Ground is felt green (#1E4D3A), the page's one committed field. Panels are card stock (#F4EBD6) with ink #1F1B17, never black, and a soft offset shadow as if lying on the felt. Player colours are the two pieces: ember red (#C9402B) for her, cobalt (#2C56A6) for him; gold (#D9A93A) is foil for focus rings and the active space. Board spaces run a six-step scale from pale gold through amber, rust, plum, indigo to night (#F1D58A, #E3A64A, #C8623A, #8E4B6B, #4F4A86, #2B2F55), the only data colour. Display face Grandstander, bold, with slight negative tracking; body in the system stack with tabular numerals. Faint ruled grid behind any board or table. Standard web controls: filled cobalt primary on panels, 8px radius, 44px touch targets.

STORY: You open it, see the board, where her dragon and yours stand, read the newest note, and either check in (move your piece), write back, or pick something to watch. Nothing asks for attention it has not earned.

FIRST VIEWPORT (phone and desktop): felt-green page with a card-stock top bar: a small dragon mark, the wordmark "ankkshus", links Home, Check-in, Notes, Videos, Luci, and the signed-in name. H1 "Hi, {name}." with today's date. Then the board: a serpentine track of square spaces on a visible faint grid, one space per check-in across the last twelve, coloured by band, each person's dragon piece on their latest space. The primary action "Check in today" sits beside the board when there is no check-in today. Below: the two newest notes on card panels and "Write a note"; on desktop a right column with the newest video and the Luci game as a card.

FORM: The family game table, pinned by the user on 2026-10-25, replacing the roll's almanac (seed key 098443e3, telemetry sent for the assigned card). Raises kept from the earlier hand: hierarchy by scale not ornament; every check-in drawn at one fixed scale so weeks compare; a visible grid as the board's armature; one type size inside tables with rank by weight and case. Signature motion: a dragon piece slides along the track to its new space after a check-in, exponential ease-out, 600ms, respecting reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- CBT worksheet contents wait on Google Drive access.
- Which dragon each person gets as their piece: default her = red dragon, him = blue; let each pick from the set later.
