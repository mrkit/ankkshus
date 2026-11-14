# Next actions

Anthony's next moves in this project. Maintained by whoever is working here,
person or agent. Rules: ~/.agents/AGENTS.md, "Next actions".

## Doing

## Next

- [ ] Decide who can open the 2011 report under Therapy, "Background" · added 2026-11-13
  - today both seats can open it, like everything else in Therapy; nothing about it is in the public repo
  - Option: both seats, as now
  - Option: only her seat; an agent adds a per-seat check once both passkeys exist (level: quick)

- [ ] Look over the new calm editorial look and tell an agent what to change · added 2026-11-13
  - home, Manual, Therapy, Feelings and Fear of death all use it; the archived Check-in pages keep some old board styling
- [ ] Play one Therapy video on your phone · added 2026-11-13
  - https://ankkshus.com/therapy/5; the files are 29 to 91 MB and stream from the TrueNAS

- [ ] Click through the fear-of-death section yourself before you tell her it is there · added 2026-11-13
  - https://ankkshus.com/fear: six short steps, a ladder, and "The fear is here" two-minute tool
  - the wording is in src/features/fear/steps.js; tell an agent anything to reword
  - your own entries are private to your seat, so trying it does not show up for her
- [ ] Fill in My people at https://ankkshus.com/manual/people, or do it with her · added 2026-11-13
  - car insurance, roadside help, landlord or home insurance, plumber and the rest; each one turns into a call button on the manual pages
  - the "Where things are" note is for the breaker box, main water shut-off and gas shut-off

- [ ] Read the eleven CBT check-ins on the Check-in page and tell an agent what to reword · added 2026-10-26
  - Check-in is now archived: Settings (the gear) → The old site
  - the prompts are rewritten from your sister's worksheets, not copied; the lists and examples are paraphrased in the help text
  - each one links the section's video in her Google Drive share; the link opens Drive and needs your Google login
  - the morning and evening journals are meant to be done daily, so their history grows
- [ ] Read design/point-of-view.md and correct it in your own words · added 2026-10-25
  - it was drafted from your answers in the session, not written by you
- [ ] Decide which dragon each of you gets · added 2026-10-25
  - today: first sign-up is the red dragon, second is the cobalt sea serpent
  - Option: keep sign-up order
  - Option: let each person pick from the six in a settings page (an agent can add it; level: standard)
- [ ] Test the Luci game on a phone · added 2026-10-25
  - touch controls and audio were only checked by reading; keyboard play was checked in a headless browser
- [ ] Create both passkeys at https://ankkshus.com · added 2026-11-01
  - "Setting up a seat?" on the sign-in page; name, then the setup code; 1Password offers to save the passkey
  - save hers to the shared family vault; the first seat is the red dragon, the second the sea serpent
  - read the setup code with: ssh kj grep SETUP_CODE /mnt/kj/docker/websites/ankkshus/.env
  - after both exist, sign-up is refused; to close it for good, blank SETUP_CODE in that .env and redeploy
- [ ] Decide: put the original Luci art and song back into the game? · added 2026-11-05
  - found in Drive/3-Resources/Websites/Assets and .env files from production websites/ankkshus/assets
  - has every file the old game loaded, plus song.mp3, block.png, thumbnail.jpg, and the original wallpapers citydragonweb.jpg and citydragonweb-night.jpg
  - Option: an agent swaps the drawn art for these sprites and plays the song; level: standard
  - Option: keep the drawn version
- [ ] Run `npm run db:reset -- --yes` in the project folder before the next `npm run dev` · added 2026-11-01
  - the users table there still has the old password column, and the server refuses to start on it; it holds 0 users
- [ ] Decide on schema migrations before the next schema change · added 2026-10-25
  - Option: add sequelize-cli migrations now
  - Option: keep `sync()` and `db:reset` until the site holds real check-ins; a schema change then means a rebuild
- [ ] Ask an agent to verify Burns' score ranges against the Feeling Good Handbook · level: quick · added 2026-10-25
  - the six ranges in src/lib/bands.js are from memory, labelled "Burns puts…" in the UI

## Waiting
