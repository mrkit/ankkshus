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
- [ ] Decide how to deploy ankkshus on the TrueNAS · added 2026-10-25
  - `npm run build`, then `npm start` with DATABASE_URL and JWT_SECRET set; Node 22.12+; `npm start` sets NODE_ENV=production
  - nothing to migrate (checked 2026-11-01): no ankkshus container, folder or database on the TrueNAS or the Synology; the 2018–2020 AWS deploy's RDS host no longer resolves; both of you sign up fresh
  - the TrueNAS has no compose file for it yet, and no Postgres besides Immich's
  - Option: a new folder under /mnt/kj/docker/websites/ with a compose file for the app (Node 22) and its own Postgres container, behind cloudflared
  - Option: the app container only, with a database added to an existing Postgres; less to run, but it couples this site to another app's database
- [ ] Decide on schema migrations before the next schema change · added 2026-10-25
  - Option: add sequelize-cli migrations now
  - Option: keep `sync()` and `db:reset` until the site holds real check-ins; a schema change then means a rebuild
- [ ] Ask an agent to verify Burns' score ranges against the Feeling Good Handbook · level: quick · added 2026-10-25
  - the six ranges in src/lib/bands.js are from memory, labelled "Burns puts…" in the UI

## Waiting
