# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two people: Anthony (handle "mrkit") and his sister. Both log in, both read and
write. Nobody else is meant to see it. (Confirmed 2026-10-25.)

Situation: they live apart and use the site to keep up with each other between
visits and calls. She does a depression check-in; he watches how the weeks are
going. Either writes notes. Either adds videos to watch.

## Product Purpose

A private place for a brother to keep up with his sister. Success is that
both of them come back to it on their own: she checks in, he reads it, they
leave each other notes, and they have small shared things (videos, a game) to
talk about. (Purpose confirmed 2026-10-25; the success statement is inferred.)

## Positioning

A two-person site, built by one of them for the other. Nothing here is a
product for the public: no accounts to grow, no feed to optimise. The
depression checklist is kept because it is a real tool they already use, not
because it is a feature.

## Operating Context

- Check-in: the Burns Depression Checklist, 25 items scored 0 to 4, four
  sections (Thoughts and Feelings; Activities and Personal Relationships;
  Physical Symptoms; Suicidal Urges). Items are in `src/server/db/seed.js`.
  Results are to be saved with a date so both can see them over time
  (confirmed 2026-10-25).
- Notes: short posts, newest first, with author and date.
- Videos: a list of YouTube links in channels (seeded with Crash Course
  Philosophy), with thumbnails.
- Game: "Luci", a side-scrolling platformer Anthony built. An alien runs
  right, jumps gaps, outruns a rolling boulder, reaches a goal.
- Hosting: self-hosted on the TrueNAS behind cloudflared (see
  `~/.agents/AGENTS.md`, Hosting).

## Capabilities and Constraints

- Stack: React 19, React Router 7, Redux Toolkit with RTK Query, Vite, Sass;
  Express 5, Sequelize 6 on Postgres; cookie sessions. Node 22.12+.
- Login required for writes. Reads were public in the old build; with two
  users confirmed, the site can be behind login entirely (open decision, see
  NEXT_ACTIONS.md).
- The game's original art and audio live in a gitignored `assets/` folder
  that is not in this checkout. The game is to be rebuilt so it runs without
  that folder (confirmed 2026-10-25: "it does not have to be Phaser").
- The checklist is not a diagnosis. Any UI around it must say so and must
  not present a score as a verdict.
- Undecided: whether anyone beyond the two of them will ever have a login.

## Brand Commitments

- Name: "ankkshus". The joke is that the author cannot spell "anxious"; the
  package description reads "It's not my fault I don't know how many k's are
  in anxious". The site title is the same sentence.
- Voice: warm with the joke intact. Sincere and gentle underneath; keeps the
  self-deprecating humor of the name and the "created by mrkit" sign-off.
  (Confirmed 2026-10-25.)
- Visual world, pinned by Anthony on 2026-10-25: board games (the family
  played them a lot; D&D once) and dragons, of different kinds, which his
  sister loves. This is binding on the redesign.
- Existing assets, not in this checkout: a logo gif (`Ankkshus_logo_no_top.gif`),
  a favicon, a "city dragon" background image, the Luci game art and a song.
  None of these are binding on the redesign; they are evidence of the old look.

## Evidence on Hand

- Real content: the 25 Burns items and their four sections, the six Crash
  Course Philosophy episode links, the game's level and rules. All in the
  repo.
- No real notes or check-in history exist in this checkout. Any sample notes
  or scores shown in design work are synthetic and must be labelled.
- No photos of either person. Do not invent any.

## Product Principles

1. Two people, not users. Copy addresses "you" and names the other person by
   what they are to each other. No onboarding, no growth, no empty-state
   salesmanship.
2. The check-in is care, not measurement. Show change over time gently; never
   a red score, never a verdict. Say what the number is and is not.
3. Everything is a reason to talk. Notes, videos and the game exist to give
   the two of them something to say to each other.
4. Handmade over polished. The site was built by one sibling for the other
   and should read that way: specific, a little funny, never corporate.
5. It has to work on her phone. Reading a note, doing the check-in and
   playing the game all have to be good at phone width.

## Accessibility & Inclusion

The check-in includes items about suicidal thoughts. The page carries a
plain line pointing to the 988 Suicide & Crisis Lifeline (US) next to that
section, written without alarm. No other product-specific requirement was
established.
