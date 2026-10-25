# Decisions

Choices made among real alternatives, newest first. Each entry is added in the
same commit as the change it describes. Check here before proposing something
that was already rejected.


## 2026-10-25 — Full modernization: Vite, RTK Query, cookie sessions, ESM, Biome, Vitest

**Chosen.** Vite replaces webpack. Client data goes through RTK Query, which
replaces hand-written thunks and axios. Auth uses an httpOnly session cookie
holding a signed JWT. Writes require it. The server is ESM with zod
validation, Biome for lint and format, and Vitest with supertest for API tests.
The app moves to REST routes keyed by id. The old routes keyed videos by title
and posts by an unused body field. The server never drops tables on start.

**Why.** The old build pinned webpack 4 and Babel 7 presets, and the code had
bugs that came from its shape: a `force: true` sync that wiped the database on
every boot, a bearer token read from localStorage that nothing ever set, and
server state copied into Redux by hand.

**Considered and rejected.**

- Keep webpack 5. Rejected: more config for the same output, and Vite handles
  Sass and JSX without loaders.
- Rspack or Parcel. Rejected: Vite has the larger ecosystem and the simplest
  config for this app.
- Keep thunks and axios. Rejected: RTK Query gives caching and invalidation for
  the same code size.
- TanStack Query. Rejected: it duplicates what RTK Query already provides here,
  since Redux is in the stack anyway.
- A bearer token in localStorage. Rejected: scripts on the page can read it. An
  httpOnly cookie cannot be read by page scripts.
- Server-side session rows in the database. Rejected: one more table and lookup
  for a single-user site. A signed token is enough.
- Prisma or Drizzle in place of Sequelize. Rejected for now: the models are
  small, and the migration cost is higher than the gain. Revisit when schema
  changes start.
- ESLint plus Prettier. Rejected: Biome is one tool and one config.
- Jest. Rejected: Vitest runs ESM with the same config as Vite.

## 2026-10-25 — Luci port: fix behaviour the Phaser 2 code never delivered

**Chosen.** While porting, these Phaser 2 behaviours were changed on purpose.
Each is a read from the code, not a run, because the assets are not in this checkout.

- Peasants walk right at the running speed. The old code read `this.RUNNING_SPEED` inside a callback with no context, so velocity became NaN.
- The goal is a physics sprite, so touching it wins. The old `.scale.setTo(2)` returned a Point, so the goal likely had no body.
- The canvas centres with CENTER_BOTH. The old pageAlign names were misspelt.
- One `ending` flag stops repeated win, death and game-over transitions.
- Dropped: an empty 3-second timer, a debug log, the GameOver and YouWon reload of 'logo' (YouWon used a wrong path), and Luci's unused 'hurting' animation.

**Why.** Each one either crashed, never fired, or was dead code. Reverting the
peasant speed is a one-line change if the old feel was intended.

**Considered and rejected.**

- A line-by-line port that kept the bugs. Rejected: the bugs make the game unplayable as written.

## 2026-10-25 — Supersedes the Phaser pin: port the Luci game to Phaser 4

**Chosen.** Port the Luci game from Phaser 2 to Phaser 4 as ES modules, built
as a second Vite entry. Game assets are served from the site root.

**Why.** Phaser 2 was loaded from a `/vendor` copy of `node_modules`, and that
copy was the only reason the old server exposed `node_modules`. Porting removes
the workaround and the global script order.

**Considered and rejected.**

- Keep Phaser 2 pinned. Rejected: it keeps the old loader and global-script
  layout alive, and the project is meant to be modern throughout.
- Phaser 3. Rejected: it is still a second port for the same work.

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
