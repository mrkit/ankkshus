# ankkshus

A private site for two people, a brother and his sister, to keep up with each
other. Notes, a depression checklist kept over time, videos to watch, and the
Luci game. Themed as the family game table: each check-in is a space on a
board, and each person is a dragon piece.

## Stack

- **Client:** React 19, React Router 7, Redux Toolkit with RTK Query, Vite, Sass. Display face Grandstander, self-hosted from npm.
- **Game:** plain canvas 2D and Web Audio in `src/game/`, no assets, built as a second Vite entry (`luci.html`).
- **Server:** Node 22.12+, Express 5, Sequelize 6 on Postgres, zod validation, httpOnly cookie sessions. Every route is behind login.

## Setup

```sh
nvm use            # reads .nvmrc (Node 22)
npm install
cp .env.example .env
createdb ankkshus  # or point DATABASE_URL at an existing database
npm run dev        # API on :3000, Vite on :5173 (proxies /api)
```

On start the server creates any missing tables and adds what is missing:
the sample videos when there are none, and any quiz whose slug is not in the
database yet. It never drops tables.

The first two people to sign up are the two players. Sign-up order picks the
dragon and colour for now.

## Scripts

| Command                           | What it does                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`                     | API with watch mode and the Vite dev server together                         |
| `npm run build`                   | Builds the client and the game into `dist/`                                  |
| `npm start`                       | Runs the API in production. Serves `dist/` if it exists. Needs `JWT_SECRET`. |
| `npm run db:seed`                 | Adds any missing sample videos and quizzes                                   |
| `npm test`                        | API tests. Needs `TEST_DATABASE_URL`, and the name must contain "test"       |
| `npm run lint` / `npm run format` | Biome                                                                        |

## Content

- Quizzes are defined in `src/server/db/quizzes/*.js` and listed in `seed.js`. A quiz is a `checklist` (items scored 0 to 4, a total is kept) or a `worksheet` (written prompts). Add a file, list it, restart.
- `assets/` is gitignored. Vite serves it from the site root, so `assets/images/x.png` is `/images/x.png`. The game needs nothing from it.

## Design

`PRODUCT.md` holds product truth. `design/point-of-view.md` and
`design/taste.md` hold the creative brief. `DESIGN.md` records the visual
system once the finish review has run. Decisions are in `DECISIONS.md`.
