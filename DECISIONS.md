# Decisions

Choices made among real alternatives, newest first. Each entry is added in the
same commit as the change it describes. Check here before proposing something
that was already rejected.

## 2026-10-25 — Modernize the stack: React 19, Router 7, Express 5, webpack 5, Dart Sass

**Chosen.** Move every dependency off its 2020 major version. React 19 with
`createRoot`, React Router 7 (`Routes` and `element`), Redux 5 with
`redux-thunk` 3, Express 5, Sequelize 6, bcrypt 6, axios 1, webpack 5 with
babel-loader 10 on Babel 7, and Dart Sass (`sass`) in place of `node-sass`.
The project now requires Node 22 or later.

**Why.** The old pins would not install on Node 24. `bcrypt` 5.0.0 had no
prebuilt binary and failed to compile. `node-sass` 4 does not build on current
Node. The lockfile was version 1. Verified here: a clean `npm install` succeeds,
the production webpack build compiles, the server boots against a Postgres
instance, the main routes return HTML, and sign-up redirects through the new
router in a real browser.

**Considered and rejected.**

- Stay on the old majors and pin Node 14 or 12. Rejected: those runtimes are
  end-of-life, and the native build problem comes back with the next machine.
- React 18 and Router 6 instead of 19 and 7. Rejected: 18 and 6 are a stepping
  stone to the same migration, and the migration is already the expensive part.
- Babel 8. Rejected for now: it is a new major, and Babel 7 is what the plugin
  ecosystem targets. Revisit once the toolchain settles.
- Redux Toolkit `configureStore`. Rejected for this pass: the reducers are
  plain, so `createStore` still works. Adopting RTK would be a second migration.
- Phaser 3 or 4 for the Luci game. Rejected: Phaser 3 and 4 are rewrites of the
  game code, not upgrades. Phaser stays pinned at 2.6.2, served from
  `node_modules` under `/vendor`.

## 2026-10-25 — Route props through a `withNavigate` wrapper, not `useNavigate` in each class

**Chosen.** `src/react/components/withNavigate.jsx` wraps the two class
components that called `props.history.push`: `Login` and `CreatePost`. The
wrapper passes `navigate` down as a prop.

**Why.** Both components are classes wired through `connect`, and rewriting
them as function components would change more code than the redirect itself.
The wrapper keeps the diff to one line per call site.

**Considered and rejected.**

- Rewriting both as function components with hooks. Rejected: it is a larger
  change to code the migration does not otherwise touch.
- Keeping `withRouter`. Rejected: it does not exist in React Router 6 or later.
