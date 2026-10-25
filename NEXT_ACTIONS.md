# Next actions

Anthony's next moves in this project. Maintained by whoever is working here,
person or agent. Rules: ~/.agents/AGENTS.md, "Next actions".

## Doing

## Next

- [ ] Decide whether to merge the modernize branch to master · added 2026-10-25
  - Option: merge after Opus review passes and you run the app once on your own machine
  - Option: keep the branch and merge later, if Luci or the Distillery needs more testing first
- [ ] Ask an agent to fix the sign-up duplicate check in src/server/api/signUp.js · level: quick · added 2026-10-25
  - the lookup matches on username AND the raw password, but stored passwords are bcrypt hashes, so it never finds an existing user
  - duplicates can be created
- [ ] Ask an agent to stop returning password hashes from /api/login and /api/signUp · level: quick · added 2026-10-25
  - both responses send the full user row, including the bcrypt hash
- [ ] Ask an agent to move the Sass @import rules to @use · level: standard · added 2026-10-25
  - Dart Sass warns that @import is removed in Dart Sass 3.0.0
- [ ] Ask an agent to port the Luci game from Phaser 2 to Phaser 4 · level: judgement · added 2026-10-25
  - Phaser 2.6.2 is pinned and works; this is a rewrite, not an upgrade

## Waiting
