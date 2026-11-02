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
- [ ] Add ankkshus.com as a public hostname on the TrueNAS tunnel, pointing at http://192.168.1.57:8095 · added 2026-11-01
  - Cloudflare Zero Trust dashboard → Networks → Tunnels → the tunnel → Public hostnames; the tunnel is token-managed, so an agent cannot add it from the command line
  - ankkshus.com is on Cloudflare and has no record yet
  - the site is running there already: http://192.168.1.57:8095 answers on the LAN
- [ ] Create both passkeys at https://ankkshus.com once the hostname works · added 2026-11-01
  - "Setting up a seat?" on the sign-in page; name, then the setup code; 1Password offers to save the passkey
  - save hers to the shared family vault; the first seat is the red dragon, the second the sea serpent
  - read the setup code with: ssh kj grep SETUP_CODE /mnt/kj/docker/websites/ankkshus/.env
  - after both exist, sign-up is refused; to close it for good, blank SETUP_CODE in that .env and redeploy
- [ ] Run `npm run db:reset -- --yes` in the project folder before the next `npm run dev` · added 2026-11-01
  - the users table there still has the old password column, and the server refuses to start on it; it holds 0 users
- [ ] Decide on schema migrations before the next schema change · added 2026-10-25
  - Option: add sequelize-cli migrations now
  - Option: keep `sync()` and `db:reset` until the site holds real check-ins; a schema change then means a rebuild
- [ ] Ask an agent to verify Burns' score ranges against the Feeling Good Handbook · level: quick · added 2026-10-25
  - the six ranges in src/lib/bands.js are from memory, labelled "Burns puts…" in the UI

## Waiting
