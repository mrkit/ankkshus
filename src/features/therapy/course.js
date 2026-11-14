// The CBT course, introduction to section 8: the videos and original worksheets live in
// assets/cbt (gitignored, served only to signed-in people). The worksheets
// can also be filled in online; `quizzes` are their slugs in Check-in.
// The before/after questions and the practice are written for this site.

const ws = (file, title) => ({ file: `/cbt/${file}`, title });

export const SECTIONS = [
  {
    n: 0,
    title: 'Start getting happier today',
    video: '/cbt/section-0.mp4',
    before:
      'What would be different in a normal week if this course worked for you?',
    after: {
      prompt:
        'In your own words: what does the course ask of you, and what does it promise in return?',
      model:
        'It asks you to watch each section and do its worksheets honestly, at your own pace. In return it gives you the CBT tools to notice and change the thoughts, behaviors and emotions that keep you unhappy.',
    },
    practice: null,
    quizzes: [{ slug: 'cbt-intro', title: 'Getting to know you' }],
    worksheets: [
      ws(
        'worksheet-0-1-getting-to-know-you.docx',
        'Introduction: getting to know you',
      ),
    ],
  },
  {
    n: 1,
    title: 'How CBT works',
    video: '/cbt/section-1.mp4',
    before:
      'Guess: if you change one of your thoughts, your feelings or your actions, what happens to the other two?',
    after: {
      prompt:
        'In your own words: how are thoughts, feelings and behavior connected?',
      model:
        'Each one feeds the other two. A thought changes how you feel, the feeling changes what you do, and what you do feeds back into what you think. CBT works by changing the thoughts and behaviors, which you can reach directly, so the feelings follow.',
    },
    practice: 'tfa',
    quizzes: [{ slug: 'cbt-1', title: 'After the video' }],
    worksheets: [],
  },
  {
    n: 2,
    title: 'Looking into distress',
    video: '/cbt/section-2.mp4',
    before:
      'If you had to name the one problem that affects your days most, what would it be?',
    after: {
      prompt:
        'In your own words: why list every problem first, then pick five, then set goals?',
      model:
        'Writing everything down shows the whole picture. Picking the five with the biggest effect tells you where to start, and seeing how they affect each other shows which one to work on first. Goals are only about you, since other people’s behavior is not yours to control.',
    },
    practice: 'problems',
    quizzes: [{ slug: 'cbt-2', title: 'Problems and goals' }],
    worksheets: [
      ws(
        'worksheet-2-1-identifying-my-problems.docx',
        '2.1 Identifying my problems',
      ),
      ws(
        'worksheet-2-2-my-most-significant-problems.docx',
        '2.2 My most significant problems',
      ),
      ws('worksheet-2-3-my-long-term-goals.docx', '2.3 My long-term goals'),
    ],
  },
  {
    n: 3,
    title: 'Problematic behavior',
    video: '/cbt/section-3.mp4',
    before: 'What is something you avoid? Guess what it costs you over a year.',
    after: {
      prompt:
        'In your own words: why does avoiding things make life harder, and what do you do instead?',
      model:
        'Avoiding brings relief now, but it shrinks your life and keeps the problem in place. Instead you name the unhealthy behavior, choose a healthy one to replace it, and put time for it in your calendar.',
    },
    practice: 'avoid',
    quizzes: [{ slug: 'cbt-3', title: 'Unhealthy behaviors and avoidance' }],
    worksheets: [
      ws(
        'worksheet-3-1-my-unhealthy-behaviors.docx',
        '3.1 My unhealthy behaviors',
      ),
      ws(
        'worksheet-3-2-my-avoidance-behavior.docx',
        '3.2 My avoidance behavior',
      ),
      ws(
        'worksheet-3-3-challenging-my-most-significant-negative-behavior.docx',
        '3.3 Challenging my most significant negative behavior',
      ),
    ],
  },
  {
    n: 4,
    title: 'Problematic emotions',
    video: '/cbt/section-4.mp4',
    before:
      'Think of a strong feeling you had this week. Was it about the event itself, or about what you told yourself about it?',
    after: {
      prompt:
        'In your own words: how do you take an emotion apart and challenge it?',
      model:
        'First name the emotion precisely. Then look at the pieces behind it, such as the situation, the thoughts and what it did to your body and actions. Then question the thoughts, so a healthier emotion can take its place.',
    },
    practice: 'emotion',
    quizzes: [{ slug: 'cbt-4', title: 'My emotions' }],
    worksheets: [
      ws('worksheet-4-1-my-emotional-map.docx', '4.1 My emotional map'),
      ws(
        'worksheet-4-2-the-components-of-my-emotion.docx',
        '4.2 The components of my emotion',
      ),
      ws(
        'worksheet-4-3-challenging-my-negative-unhealthy-emotions.docx',
        '4.3 Challenging my negative unhealthy emotions',
      ),
    ],
  },
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

// Section 1: thought, feeling or action?
export const TFA_ITEMS = [
  ['I am going to mess this up.', 'thought'],
  ['Anxious.', 'feeling'],
  ['I cancelled the plans.', 'action'],
  ['Nobody really likes me.', 'thought'],
  ['Embarrassed.', 'feeling'],
  ['I stayed in bed until noon.', 'action'],
  ['This will never get better.', 'thought'],
  ['I texted a friend back.', 'action'],
  ['Lonely.', 'feeling'],
];

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
