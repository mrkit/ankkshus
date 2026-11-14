// Feeling words placed on two axes: pleasantness (x, -1 to 1) and energy
// (y, -1 to 1). This is the circumplex model of affect (Russell, 1980).
// The placements are approximate, set by hand for this site.
export const WORDS = [
  // More energy, unpleasant
  ['furious', -0.95, 0.85],
  ['enraged', -0.9, 0.92],
  ['panicked', -0.82, 0.96],
  ['terrified', -0.9, 0.78],
  ['overwhelmed', -0.72, 0.62],
  ['anxious', -0.6, 0.72],
  ['stressed', -0.58, 0.64],
  ['frustrated', -0.66, 0.52],
  ['tense', -0.38, 0.58],
  ['nervous', -0.44, 0.66],
  ['irritated', -0.5, 0.44],
  ['worried', -0.52, 0.38],
  ['jealous', -0.62, 0.32],
  ['annoyed', -0.38, 0.34],
  ['restless', -0.26, 0.5],
  ['embarrassed', -0.5, 0.24],
  // More energy, pleasant
  ['thrilled', 0.84, 0.92],
  ['excited', 0.74, 0.84],
  ['elated', 0.9, 0.78],
  ['energized', 0.58, 0.76],
  ['inspired', 0.66, 0.64],
  ['joyful', 0.9, 0.58],
  ['motivated', 0.48, 0.6],
  ['playful', 0.62, 0.52],
  ['cheerful', 0.72, 0.46],
  ['proud', 0.7, 0.4],
  ['curious', 0.34, 0.44],
  ['hopeful', 0.54, 0.3],
  ['surprised', 0.18, 0.78],
  // Less energy, unpleasant
  ['hopeless', -0.9, -0.58],
  ['depressed', -0.84, -0.7],
  ['empty', -0.62, -0.7],
  ['exhausted', -0.5, -0.86],
  ['drained', -0.56, -0.76],
  ['numb', -0.4, -0.82],
  ['lonely', -0.66, -0.44],
  ['sad', -0.72, -0.38],
  ['down', -0.5, -0.46],
  ['discouraged', -0.64, -0.32],
  ['disappointed', -0.6, -0.22],
  ['ashamed', -0.76, -0.18],
  ['guilty', -0.58, -0.1],
  ['bored', -0.34, -0.58],
  ['tired', -0.24, -0.7],
  // Less energy, pleasant
  ['serene', 0.76, -0.72],
  ['peaceful', 0.7, -0.64],
  ['relaxed', 0.64, -0.58],
  ['cozy', 0.58, -0.52],
  ['calm', 0.6, -0.46],
  ['safe', 0.54, -0.4],
  ['at ease', 0.48, -0.34],
  ['content', 0.7, -0.28],
  ['fulfilled', 0.8, -0.24],
  ['satisfied', 0.64, -0.18],
  ['grateful', 0.76, -0.12],
  ['loved', 0.82, -0.06],
  ['mellow', 0.4, -0.6],
  ['thoughtful', 0.24, -0.26],
  ['sleepy', 0.18, -0.86],
];

export const QUADRANTS = {
  hu: {
    name: 'More energy, unpleasant',
    tone: 'rust',
    help: [
      'Breathe out longer than you breathe in, a few times.',
      'Move: a short walk, stairs, shake out your hands.',
      'Name it out loud: “I am feeling ___.” Studies of putting feelings into words find it can make them less intense.',
    ],
  },
  hp: {
    name: 'More energy, pleasant',
    tone: 'ochre',
    help: [
      'Tell someone. Sharing a good moment tends to make it last.',
      'Use the energy on something you have been putting off.',
      'Notice what led here, so you can find your way back.',
    ],
  },
  lu: {
    name: 'Less energy, unpleasant',
    tone: 'slate',
    help: [
      'Do one small thing: a glass of water, open a window, a shower.',
      'Text one person, even just “thinking of you”.',
      'Be as kind to yourself as you would be to a friend who feels this.',
    ],
  },
  lp: {
    name: 'Less energy, pleasant',
    tone: 'sage',
    help: [
      'Stay with it for a minute before moving on.',
      'Write down one thing that made it possible.',
      'Protect it: leave the phone in the other room for a while.',
    ],
  },
};

export const quadrantOf = (x, y) =>
  `${y >= 0 ? 'h' : 'l'}${x >= 0 ? 'p' : 'u'}`;

export function nearest(x, y, count = 6) {
  return [...WORDS]
    .map(([word, wx, wy]) => ({
      word,
      x: wx,
      y: wy,
      d: Math.hypot(wx - x, wy - y),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count);
}
