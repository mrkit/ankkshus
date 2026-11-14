# ankkshus

A private site for two people, a brother and his sister. It has four
sections. The first is a "what to do when" manual (car crash, dead battery,
fridge, leaks, gas, lost wallet), whose call buttons come from a shared list
of people and numbers. The second is Therapy, the CBT course from its
introduction to section 8, with videos, practice and worksheets. The third is a feelings map. The
fourth is a step-by-step section for the fear of death. The first version of the
site (notes, a depression checklist, videos and the Luci game) is archived
under Settings.

## Stack

- **Client:** React 19, React Router 7, Redux Toolkit with RTK Query, Vite, Sass. Display face Grandstander, self-hosted from npm.
- **Game:** plain canvas 2D and Web Audio in `src/game/`, drawn in code with no image files, built as a second Vite entry (`luci.html`).
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
database yet. It never drops a table and never adds a column to an existing
one. When the tables are from an older version of this app, the server stops
and lists the missing columns. Then either run `npm run db:reset -- --yes`,
which drops every table in that database and rebuilds them with the sample
content, or point `DATABASE_URL` at a new database.

Sign-in is by passkey only. A seat is a name plus a passkey, and creating one
needs the setup code (`SETUP_CODE`; `dev-setup` in development). After two
seats exist, sign-up is refused. The first seat is the red dragon, the second
the sea serpent. To hand someone a seat, create it from a password manager and
save the passkey to a shared vault. A passkey belongs to one origin:
`http://localhost:5173` under `npm run dev`, `PASSKEY_ORIGIN` elsewhere.

## Deploy

It runs on the TrueNAS in `/mnt/kj/docker/websites/ankkshus`, from
`compose.yml`: the app container (`ankkshus`, port 8095 on the host) and its
own Postgres 17 (`ankkshus-db`), whose data is in `./data/postgres` there. The
`.env` beside the compose file holds `JWT_SECRET`, `POSTGRES_PASSWORD` and
`SETUP_CODE`, and is readable by its owner only. `PASSKEY_ORIGIN` defaults to
`https://ankkshus.com` in the compose file.

To deploy a change: `git pull && sudo -n docker compose up -d --build --force-recreate`.

The Cloudflare tunnel's public hostname points at `http://192.168.1.57:8095`.
Passkeys and the `Secure` session cookie both need `https://ankkshus.com`; the
LAN address serves pages but cannot sign anyone in.

## Scripts

| Command                           | What it does                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `npm run dev`                     | API with watch mode and the Vite dev server together                                                   |
| `npm run build`                   | Builds the client and the game into `dist/`                                                            |
| `npm start`                       | Runs the API with NODE_ENV=production. Serves `dist/` if it exists. Needs `JWT_SECRET`.                |
| `npm run db:seed`                 | Adds any missing sample videos and quizzes                                                             |
| `npm run db:reset -- --yes`       | Drops every table and rebuilds them with the sample content; local databases only, never in production |
| `npm test`                        | API tests. Needs `TEST_DATABASE_URL`, and the name must contain "test"                                 |
| `npm run lint` / `npm run format` | Biome                                                                                                  |

## Content

- The manual is `src/features/manual/situations.js`. Each situation has steps for right now, who to call (roles from `contacts.js`, optionally limited to renters or owners), what to do after, and the sources its safety steps were checked against.
- Therapy is `src/features/therapy/course.js`. The videos and original worksheets are in `assets/cbt/` (gitignored: `section-0.mp4`, the intro, through `section-8.mp4`, and 19 `worksheet-*.docx`, from the Drive share and a zip of the first four worksheets, 2026-11-13).
- `assets/records/` (gitignored) holds earlier documents shown under Therapy, "Background". Each file's name is its title on the page, so nothing personal sits in the code. `/records/*` and `/api/records` need a session. The server sends `/cbt/*` only to a signed-in person. The TrueNAS keeps its own copy of `assets/cbt/` and `assets/records/`, as it does for the images.
- The feelings map is `src/features/feel/`. Its words and their positions are in `words.js`.
- The fear-of-death section is `src/features/fear/steps.js`. Its design and evidence are in `design/fear-section.md`. Entries are private to each seat.

- Quizzes are defined in `src/server/db/quizzes/*.js` and listed in `seed.js`. A quiz is a `checklist` (items scored 0 to 4, a total is kept) or a `worksheet` (written prompts; `text` is one line, `longtext` a paragraph). Add a file, list it, restart.
- `quizzes/cbt.js` holds the online CBT course as eleven worksheet quizzes, one per course video. The videos and original worksheets live in a Google Drive share, and each quiz links to its own.
- `assets/` is gitignored. Vite serves it from the site root, so `assets/images/x.png` is `/images/x.png`, and the build copies it into `dist/`. The game needs nothing from it.
- The site needs five files in `assets/images/`, made from the first ankkshus (`Drive/1-Projects/Web_ankkshus/ankkshus 2.0/public/images`): `city-dragon-2400.webp` and `city-dragon-1400.webp` (the wallpaper, an Adobe Stock image, so it stays out of this public repo), `ankkshus-logo.png`, `ankkshus-ribbon.png` and `favicon.png`. The TrueNAS keeps its own copy in `assets/images/` beside the compose file; the Docker build picks it up.

## Design

`PRODUCT.md` holds product truth. `design/point-of-view.md` and
`design/taste.md` hold the creative brief. `DESIGN.md` records the visual
system once the finish review has run. Decisions are in `DECISIONS.md`.
