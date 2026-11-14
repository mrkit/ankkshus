// The CBT course sections 5 to 8: the videos and original worksheets live in
// assets/cbt (gitignored, served only to signed-in people). The worksheets
// can also be filled in online; `quizzes` are their slugs in Check-in.
// The before/after questions and the practice are written for this site.

const ws = (file, title) => ({ file: `/cbt/${file}`, title });

export const SECTIONS = [
  {
    n: 5,
    title: 'Problematic thoughts',
    video: '/cbt/section-5.mp4',
    before:
      'Think of the last time you felt bad. What went through your head right before the feeling?',
    after: {
      prompt:
        'In your own words: what is a negative automatic thought, and what can you do with one once you notice it?',
      model:
        'A thought that pops up on its own after a trigger and makes things feel worse than they are. Once you notice it, you can name the thought trap it falls into, look for the evidence for and against it, and write a more balanced version.',
    },
    practice: 'traps',
    quizzes: [{ slug: 'cbt-5', title: 'Catch and challenge a thought' }],
    worksheets: [
      ws(
        'worksheet-5-1-identifying-your-negative-automatic-thoughts.docx',
        '5.1 Identifying your negative automatic thoughts',
      ),
      ws('worksheet-5-2-my-thought-traps.docx', '5.2 My thought traps'),
      ws(
        'worksheet-5-3-challenging-your-negative-automatic-thoughts.docx',
        '5.3 Challenging your negative automatic thoughts',
      ),
    ],
  },
  {
    n: 6,
    title: 'Actively working on being happier',
    video: '/cbt/section-6.mp4',
    before:
      'If you wrote three lines every morning and every evening, what do you guess would change after a month?',
    after: {
      prompt:
        'In your own words: why does the course ask for a journal twice a day?',
      model:
        'Writing at the start and end of each day trains you to notice what you are grateful for, to decide how you want the day to feel, and to look back on it. The repetition is the point: it builds the habit of noticing good things.',
    },
    practice: 'journal',
    quizzes: [
      { slug: 'cbt-6-why', title: 'Why my journal matters' },
      { slug: 'cbt-6-morning', title: 'Morning journal' },
      { slug: 'cbt-6-evening', title: 'Evening journal' },
    ],
    worksheets: [
      ws(
        'worksheet-6-1-why-my-journal-is-important-to-me.docx',
        '6.1 Why my journal is important to me',
      ),
      ws('worksheet-6-2-journal.docx', '6.2 Journal'),
    ],
  },
  {
    n: 7,
    title: 'Self-esteem: stop rating yourself',
    video: '/cbt/section-7.mp4',
    before: 'What is a name you call yourself when something goes wrong?',
    after: {
      prompt:
        'In your own words: what is wrong with labeling yourself, and what do you put in its place?',
      model:
        'A label like "stupid" rates your whole self on one moment. The alternative is a self-accepting statement that describes what you did rather than who you are, and then collecting evidence that supports it.',
    },
    practice: 'labels',
    quizzes: [{ slug: 'cbt-7', title: 'Labels and self-accepting attitudes' }],
    worksheets: [
      ws(
        'worksheet-7-1-my-common-labels-and-better-self-accepting-attitudes.docx',
        '7.1 My common labels and better self-accepting attitudes',
      ),
      ws(
        'worksheet-7-2-reinforcing-your-self-accepting-attitude.docx',
        '7.2 Reinforcing your self-accepting attitude',
      ),
    ],
  },
  {
    n: 8,
    title: 'Looking to the future',
    video: '/cbt/section-8.mp4',
    before:
      'Of everything you have tried so far, which one thing would you want to keep doing a year from now?',
    after: {
      prompt:
        'In your own words: what goes in a toolbox, and when do you open it?',
      model:
        'The techniques that worked for you, written down in detail, with the situations that call for each. You open it when old patterns come back, and you review your goals and set new ones.',
    },
    practice: 'toolbox',
    quizzes: [{ slug: 'cbt-8', title: 'Goals and my toolbox' }],
    worksheets: [
      ws(
        'worksheet-8-1-evaluating-my-goals-and-setting-new-ones.docx',
        '8.1 Evaluating my goals (and setting new ones)',
      ),
      ws(
        'worksheet-8-2-my-toolbox-for-a-happier-now.docx',
        '8.2 My toolbox for a happier now',
      ),
    ],
  },
];

export const sectionByN = Object.fromEntries(
  SECTIONS.map((s) => [String(s.n), s]),
);

// The ten thought traps from worksheet 5.2, each described in our own words.
export const TRAPS = {
  catastrophizing: [
    'Catastrophizing',
    'jumps from a small problem to the worst outcome',
  ],
  extreme: ['Extreme thinking', 'sees it as all good or all bad'],
  demanding: [
    'Demanding',
    'insists things must go a certain way ("must", "should")',
  ],
  predictive: [
    'Predictive thinking',
    'treats a guess about the future as fact',
  ],
  mindreading: ['Mind reading', 'assumes what someone else is thinking'],
  emotive: [
    'Emotive interpretation',
    'takes a feeling as proof ("I feel it, so it is true")',
  ],
  labeling: ['Labeling', 'sums up a whole person in one harsh word'],
  selective: ['Selective observation', 'notices only the bad parts'],
  antipositive: ['Anti-positive', 'explains away anything good'],
  personalization: [
    'Personalization',
    'makes yourself the cause of things outside your control',
  ],
};

// Each item offers its answer plus three traps it is easy to mix up with.
export const TRAP_ITEMS = [
  {
    thought:
      'I forgot to reply to her text. Now she will never speak to me again.',
    answer: 'catastrophizing',
    options: [
      'catastrophizing',
      'predictive',
      'mindreading',
      'personalization',
    ],
  },
  {
    thought: 'He went quiet at dinner. He must think I am boring.',
    answer: 'mindreading',
    options: ['mindreading', 'personalization', 'emotive', 'predictive'],
  },
  {
    thought: 'I feel like a failure, so I must be one.',
    answer: 'emotive',
    options: ['emotive', 'labeling', 'extreme', 'selective'],
  },
  {
    thought: 'The holiday had one rainy day. It was ruined.',
    answer: 'extreme',
    options: ['extreme', 'selective', 'catastrophizing', 'antipositive'],
  },
  {
    thought: 'My boss said the report was good, but she says that to everyone.',
    answer: 'antipositive',
    options: ['antipositive', 'selective', 'mindreading', 'demanding'],
  },
  {
    thought: 'People should always text back within the hour.',
    answer: 'demanding',
    options: ['demanding', 'extreme', 'mindreading', 'labeling'],
  },
  {
    thought: 'I burnt the toast. I am such an idiot.',
    answer: 'labeling',
    options: ['labeling', 'emotive', 'catastrophizing', 'extreme'],
  },
  {
    thought: 'The interview will go badly, so there is no point preparing.',
    answer: 'predictive',
    options: ['predictive', 'catastrophizing', 'antipositive', 'emotive'],
  },
  {
    thought: 'Everyone at the party was having fun except me.',
    answer: 'selective',
    options: ['selective', 'extreme', 'personalization', 'mindreading'],
  },
  {
    thought: 'My friend is in a bad mood. I must have done something.',
    answer: 'personalization',
    options: ['personalization', 'mindreading', 'emotive', 'demanding'],
  },
];

// Tools from across the site, for the section 8 toolbox.
export const TOOLS = [
  {
    id: 'challenge',
    label: 'Challenge a negative thought',
    to: '/check-in/cbt-5',
  },
  {
    id: 'journal',
    label: 'Morning and evening journal',
    to: '/check-in/cbt-6-morning',
  },
  {
    id: 'labels',
    label: 'Swap a label for a self-accepting statement',
    to: '/therapy/7',
  },
  { id: 'feel', label: 'Name the feeling on the feelings map', to: '/feel' },
  {
    id: 'fear-now',
    label: 'Let the fear rise and fall (two minutes)',
    to: '/fear/now',
  },
  { id: 'ladder', label: 'Climb a rung of the fear ladder', to: '/fear/rung' },
  {
    id: 'checklist',
    label: 'The Burns checklist, to see the trend',
    to: '/check-in/burns',
  },
];
