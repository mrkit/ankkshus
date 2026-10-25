# Next actions

Anthony's next moves in this project. Maintained by whoever is working here,
person or agent. Rules: ~/.agents/AGENTS.md, "Next actions".

## Doing

## Next

- [ ] Authenticate Google Drive in Claude Code (`/mcp`, "claude.ai Google Drive") so the CBT worksheets and videos can be pulled · added 2026-10-25
  - 19 worksheets (.docx) and 9 videos (.mp4) in three emails from your sister, all as Drive links
  - the share links need a Google login; a plain download returned a sign-in page
  - the site's quiz library is ready for them: each CBT section becomes a worksheet quiz with its video
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
  - the old database has the old table names; the new tables are created beside them, and users must sign up again
  - Option: update the compose file on the TrueNAS to build with Node 22 and run `node src/server/index.js`
  - Option: keep pm2 and point it at `src/server/index.js`
- [ ] Decide on schema migrations before the next schema change · added 2026-10-25
  - Option: add sequelize-cli migrations now
  - Option: keep `sync()` and accept that schema changes are manual
- [ ] Ask an agent to verify Burns' score ranges against the Feeling Good Handbook · level: quick · added 2026-10-25
  - the six ranges in src/lib/bands.js are from memory, labelled "Burns puts…" in the UI

## Waiting
