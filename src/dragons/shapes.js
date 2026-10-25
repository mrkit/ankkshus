// Path data for the six player-piece dragons and the wordmark head, all drawn
// facing right in a 64x64 box (32x32 for the mark). Each part has a kind that
// decides how it is painted; see paintAttrs. The preview page is generated
// from this same file so the two never drift.
//
// Kinds:
//   fill  solid body in the piece colour
//   tone  membrane or fin: piece colour at 0.45, outlined in the piece colour
//   line  stroked path in the piece colour, width given by w (default 2)
//   hi    white highlight at 0.18 for eyes, belly and cracks on top of the body
//   hiline  the same highlight as a 2px stroke

export function paintAttrs(part, color) {
  switch (part.kind) {
    case 'fill':
      return { fill: color };
    case 'tone':
      return {
        fill: color,
        fillOpacity: 0.45,
        stroke: color,
        strokeWidth: 2,
        strokeLinejoin: 'round',
      };
    case 'line':
      return {
        fill: 'none',
        stroke: color,
        strokeWidth: part.w ?? 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      };
    case 'hi':
      return { fill: '#fff', fillOpacity: 0.18 };
    case 'hiline':
      return {
        fill: 'none',
        stroke: '#fff',
        strokeOpacity: 0.18,
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      };
    default:
      return {};
  }
}

// Classic western dragon: two folded wing spikes over the back, twin horns,
// a long straight snout and a curl of flame.
export const RED_DRAGON = [
  { kind: 'tone', d: 'M 34 36 L 22 6 L 20 20 L 10 14 L 14 30 Q 24 30 34 36 Z' },
  { kind: 'line', w: 3, d: 'M 22 44 Q 8 50 6 40 Q 6 33 12 34' },
  {
    kind: 'fill',
    d: 'M 34 36 Q 38 26 42 24 L 43 15 L 46 6 L 48 15 L 52 6 L 53 17 L 60 25 L 50 29 L 48 33 L 46 44 L 46 54 L 40 54 L 42 50 Q 36 50 30 50 L 30 54 L 24 54 L 26 48 Q 20 44 22 38 Q 26 33 34 36 Z',
  },
  { kind: 'tone', d: 'M 59 27 Q 66 25 63 17 Q 62 23 57 25 Z' },
  { kind: 'hi', d: 'M 48 34 Q 44 44 44 52 L 46 52 Q 46 44 50 34 Z' },
  { kind: 'hi', d: 'M 50 20 A 1.5 1.5 0 1 0 50 23 A 1.5 1.5 0 1 0 50 20 Z' },
];

// Sea serpent: two round coils with a serrated ridge, a swan-curved neck and
// a finned head, all sitting on a water line, no legs.
export const SEA_SERPENT = [
  {
    kind: 'fill',
    d: 'M 5 34 L 8 26 L 11 30 L 13 22 L 16 29 L 19 25 L 20 34 Z',
  },
  { kind: 'fill', d: 'M 2 48 Q 2 28 12 28 Q 22 28 22 48 Z' },
  { kind: 'fill', d: 'M 27 36 L 30 27 L 33 31 L 36 26 L 38 36 Z' },
  { kind: 'fill', d: 'M 24 48 Q 24 30 32 30 Q 40 30 40 48 Z' },
  {
    kind: 'fill',
    d: 'M 40 48 Q 40 30 44 24 Q 46 18 54 17 L 57 10 L 59 18 L 63 25 Q 63 30 57 31 L 51 31 Q 49 36 49 42 L 49 48 Z',
  },
  { kind: 'tone', d: 'M 43 36 L 34 40 L 44 43 Z' },
  { kind: 'hi', d: 'M 55 22 A 1.5 1.5 0 1 0 55 25 A 1.5 1.5 0 1 0 55 22 Z' },
  { kind: 'hiline', d: 'M 0 48 Q 6 45 12 48 T 24 48 T 36 48 T 48 48 T 60 48' },
];

// Wyvern: wings spread wide to both sides, two bird legs, a barbed tail.
export const WYVERN = [
  {
    kind: 'tone',
    d: 'M 28 32 L 2 12 Q 8 20 5 28 Q 10 32 7 42 Q 20 36 28 40 Z',
  },
  {
    kind: 'tone',
    d: 'M 36 32 L 62 12 Q 56 20 59 28 Q 54 32 57 42 Q 44 36 36 40 Z',
  },
  { kind: 'line', w: 3, d: 'M 27 44 Q 18 50 12 56' },
  { kind: 'fill', d: 'M 7 62 L 10 52 L 17 58 Z' },
  {
    kind: 'fill',
    d: 'M 36 22 L 34 12 L 40 8 L 52 12 L 53 16 L 44 18 L 42 24 Q 40 28 40 36 L 38 46 L 42 56 L 37 56 L 34 48 L 30 48 L 26 56 L 21 56 L 26 46 Q 24 36 28 28 Q 32 24 36 22 Z',
  },
  { kind: 'hi', d: 'M 30 32 Q 28 40 30 46 L 34 46 Q 32 40 34 32 Z' },
  { kind: 'hi', d: 'M 44 12 A 1.5 1.5 0 1 0 44 15 A 1.5 1.5 0 1 0 44 12 Z' },
];

// Eastern lung: a thick S-curved body with no wings, a spiky mane behind a
// long flat-snouted head, and two whiskers.
export const LUNG_DRAGON = [
  { kind: 'fill', d: 'M 2 62 L 9 58 L 3 52 Z' },
  { kind: 'line', w: 7, d: 'M 5 57 Q 2 42 16 42 Q 30 42 30 30 Q 30 20 42 21' },
  { kind: 'hiline', d: 'M 5 57 Q 2 42 16 42 Q 30 42 30 30 Q 30 20 42 21' },
  { kind: 'fill', d: 'M 34 26 L 32 34 L 38 33 Z' },
  { kind: 'fill', d: 'M 20 46 L 18 54 L 24 52 Z' },
  {
    kind: 'tone',
    d: 'M 40 11 Q 28 6 26 16 Q 32 14 28 24 Q 34 20 30 32 Q 38 28 40 26 Z',
  },
  {
    kind: 'fill',
    d: 'M 40 14 L 42 5 L 46 13 L 48 6 L 51 15 L 58 17 Q 64 20 61 25 L 55 27 L 45 29 L 40 27 Z',
  },
  { kind: 'line', w: 1.5, d: 'M 58 26 Q 64 30 60 36' },
  { kind: 'line', w: 1.5, d: 'M 53 28 Q 48 36 42 34' },
  { kind: 'hi', d: 'M 50 18 A 1.5 1.5 0 1 0 50 21 A 1.5 1.5 0 1 0 50 18 Z' },
];

// Frost drake: stocky and low, four big icicles rising from the head and
// neck, one hanging under the chin, and a small wing.
export const FROST_DRAKE = [
  {
    kind: 'fill',
    d: 'M 30 29 L 32 18 L 36 28 L 40 12 L 44 27 L 48 6 L 52 26 L 55 15 L 57 27 Z',
  },
  {
    kind: 'fill',
    d: 'M 40 28 L 52 26 L 60 32 L 61 36 L 56 37 L 58 41 L 50 43 L 48 54 L 40 54 L 40 50 L 28 50 L 28 54 L 18 54 L 18 48 L 12 48 L 4 44 L 10 40 L 12 36 Q 18 28 30 28 Z',
  },
  { kind: 'fill', d: 'M 51 43 L 53 51 L 56 42 Z' },
  { kind: 'tone', d: 'M 30 32 L 20 20 L 22 30 L 14 26 L 20 36 Z' },
  { kind: 'hi', d: 'M 18 44 H 42 V 47 H 18 Z' },
  { kind: 'hi', d: 'M 54 31 A 1.5 1.5 0 1 0 54 34 A 1.5 1.5 0 1 0 54 31 Z' },
];

// Hatchling: round body and round head, one stubby wing, feet forward, and a
// piece of eggshell still sitting on its head.
export const HATCHLING = [
  { kind: 'line', w: 3, d: 'M 18 48 Q 6 50 8 42 Q 8 38 12 40' },
  { kind: 'tone', d: 'M 24 34 L 12 26 L 16 38 Z' },
  {
    kind: 'fill',
    d: 'M 16 44 Q 16 30 30 30 Q 44 30 44 44 Q 44 56 30 56 Q 16 56 16 44 Z',
  },
  { kind: 'fill', d: 'M 22 54 L 20 60 L 30 60 L 30 54 Z' },
  { kind: 'fill', d: 'M 34 54 L 34 60 L 44 60 L 40 54 Z' },
  {
    kind: 'fill',
    d: 'M 30 22 Q 30 10 42 10 Q 54 10 54 22 Q 54 34 42 34 Q 30 34 30 22 Z',
  },
  { kind: 'fill', d: 'M 52 22 Q 60 24 58 28 L 50 30 Z' },
  {
    kind: 'fill',
    d: 'M 31 16 Q 32 4 42 4 Q 52 4 54 16 L 50 12 L 47 17 L 43 12 L 39 17 L 35 12 Z',
  },
  {
    kind: 'hiline',
    d: 'M 31 16 L 35 12 L 39 17 L 43 12 L 47 17 L 50 12 L 54 16',
  },
  { kind: 'hi', d: 'M 25 46 A 7 7 0 1 0 39 46 A 7 7 0 1 0 25 46 Z' },
  { kind: 'hi', d: 'M 44 22 A 2.5 2.5 0 1 0 49 22 A 2.5 2.5 0 1 0 44 22 Z' },
];

// Wordmark head: profile, one horn, open snout, 32x32.
export const DRAGON_MARK = [
  {
    kind: 'fill',
    d: 'M 6 28 L 6 16 L 10 5 L 13 14 L 18 7 L 18 15 L 27 19 L 30 24 L 22 25 L 20 29 Z',
  },
  { kind: 'hi', d: 'M 18 19 A 1.5 1.5 0 1 0 18 22 A 1.5 1.5 0 1 0 18 19 Z' },
];
