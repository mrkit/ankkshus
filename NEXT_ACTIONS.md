# Next actions

Anthony's next moves in this project. Maintained by whoever is working here,
person or agent. Rules: ~/.agents/AGENTS.md, "Next actions".

## Doing

## Next

- [ ] Run `npm run db:reset -- --yes` in the project folder, once · added 2026-10-26
  - the local `ankkshus` database has tables from the previous version, and the server now refuses to start on it with the list of missing columns
  - it holds 0 users, 0 notes, 0 check-ins and the 6 sample videos, which the reset seeds again
  - Option: instead set `DATABASE_URL=postgres://localhost/ankkshus_dev` in `.env`; that database already has the new tables, a test sign-up "anthony", one note and two check-ins
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

- [ ] Ask an agent to build the CBT section quizzes from the Drive worksheets and videos · level: standard · waiting on: agent session · added 2026-10-26
  - Google Drive is connected in Claude Code since 2026-10-26
  - 19 worksheets (.docx) and 9 videos (.mp4) in three emails from your sister, all as Drive links
  - each CBT section becomes a worksheet quiz in `src/server/db/quizzes/`, paired with its video, listed in `seed.js`
