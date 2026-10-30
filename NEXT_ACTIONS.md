# Next actions

Anthony's next moves in this project. Maintained by whoever is working here,
person or agent. Rules: ~/.agents/AGENTS.md, "Next actions".

## Doing

## Next

- [ ] Read the eleven CBT check-ins on the Check-in page and tell an agent what to reword · added 2026-10-26
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
- [ ] Decide how to deploy the new build on the TrueNAS · added 2026-10-25
  - `npm run build`, then `npm start` with DATABASE_URL and JWT_SECRET set; Node 22.12+
  - the old database's tables keep their old columns, and the server refuses to start on them; deploy against a new database (`createdb`) or run `npm run db:reset -- --yes` there once, and both of you sign up again
  - Option: update the compose file on the TrueNAS to build with Node 22 and run `node src/server/index.js`
  - Option: keep pm2 and point it at `src/server/index.js`
- [ ] Decide on schema migrations before the next schema change · added 2026-10-25
  - Option: add sequelize-cli migrations now
  - Option: keep `sync()` and `db:reset` until the site holds real check-ins; a schema change then means a rebuild
- [ ] Ask an agent to verify Burns' score ranges against the Feeling Good Handbook · level: quick · added 2026-10-25
  - the six ranges in src/lib/bands.js are from memory, labelled "Burns puts…" in the UI

## Waiting
