# Next actions

Anthony's next moves in this project. Maintained by whoever is working here,
person or agent. Rules: ~/.agents/AGENTS.md, "Next actions".

## Doing

## Next

- [ ] Test the Luci game in a browser with the real assets · added 2026-10-25
  - assets/ is gitignored and was missing from the checkout the port was built in
  - check the boot, the level load, the sounds, and the missing-asset message
- [ ] Decide whether to merge the modernize branch to master · added 2026-10-25
  - Option: merge after you have run it locally once with your real assets and database
  - Option: keep the branch until the Luci game is checked
- [ ] Decide how to deploy the new build on the TrueNAS · added 2026-10-25
  - the new build runs `npm run build`, then `npm start` with DATABASE_URL and JWT_SECRET set
  - Option: update the compose file and Dockerfile on the TrueNAS to build with Node 22 and run `node src/server/index.js`
  - Option: keep pm2 and point it at `src/server/index.js`
  - the repo has no Dockerfile, so the TrueNAS compose setup is out of sight from here
- [ ] Decide on schema migrations before the next schema change · added 2026-10-25
  - Option: add sequelize-cli migrations now
  - Option: keep `sync()` and accept that schema changes are manual
- [ ] Decide how to authorize the Distillery pages · added 2026-10-25
  - writes are gated by a session cookie, but the Distillery pages are public to read
  - Option: keep it: this is a personal site and reads are meant to be public
  - Option: gate the Distillery behind login too

## Waiting
