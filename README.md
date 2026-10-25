# ankkshus

A personal site: a blog, a video list, a depression checklist, and the Luci game.

## Stack

- **Client:** React 19, React Router 7, Redux Toolkit with RTK Query, Vite, Sass.
- **Game:** Phaser 4, built as a second Vite entry (`src/phaser/luci.html`).
- **Server:** Node 22.12+, Express 5, Sequelize 6 on Postgres, zod validation, cookie sessions.

## Setup

```sh
nvm use            # reads .nvmrc (Node 22)
npm install
cp .env.example .env
createdb ankkshus  # or point DATABASE_URL at an existing database
npm run dev        # API on :3000, Vite on :5173 (proxies /api)
```

The server creates missing tables and adds sample content into an empty database. It never drops tables.

## Scripts

| Command                           | What it does                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`                     | API with watch mode and the Vite dev server together                         |
| `npm run build`                   | Builds the client into `dist/`                                               |
| `npm start`                       | Runs the API in production. Serves `dist/` if it exists. Needs `JWT_SECRET`. |
| `npm run db:seed`                 | Adds sample content if the database is empty                                 |
| `npm test`                        | API tests. Needs `TEST_DATABASE_URL`, and the name must contain "test"       |
| `npm run lint` / `npm run format` | Biome                                                                        |

## Assets

Images and audio live in `assets/` (gitignored). Vite serves that folder from the site root, so `assets/images/x.png` is `/images/x.png`.

## Auth

`POST /api/auth/signup` and `POST /api/auth/login` set an httpOnly session cookie. Writes to posts and videos require that cookie. Reads are public.
