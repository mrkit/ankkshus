// The fear-of-death section. Design notes, persona and the evidence for each
// claim are in design/fear-section.md. Each step is a short run of pages;
// each page holds a few blocks. Block types are rendered by StepRunner.jsx:
//   text      paragraphs (array of strings)
//   guess     ask first, then show `reveal` beside the answer (attempt before intake)
//   recall    ask with the page closed, then show `model` (recall from nothing)
//   rate-list options, each rated 0 to 10 if ticked
//   checks    tick any number of options, plus an "other" box
//   write     a free-text answer
//   sim       the alarm picture (AlarmSim.jsx)
//   traps     "which trap is this?" items with feedback on every option
//   ladder    choose and rate rungs (LadderBuilder.jsx)
//   sources   what a claim on this step rests on, and how sure it is

export const SOURCES = {
  menzies2018: {
    label:
      'Menzies, Zuccala, Sharpe & Dar-Nimrod (2018), meta-analysis of 15 trials, Journal of Anxiety Disorders 59:64–73',
    url: 'https://doi.org/10.1016/j.janxdis.2018.09.004',
  },
  iverach2014: {
    label:
      'Iverach, Menzies & Menzies (2014), Clinical Psychology Review 34(7):580–593',
    url: 'https://doi.org/10.1016/j.cpr.2014.09.002',
  },
  furer2008: {
    label:
      'Furer & Walker (2008), "Death anxiety: a cognitive-behavioral approach", Journal of Cognitive Psychotherapy 22(2):167–182',
    url: 'https://doi.org/10.1891/0889-8391.22.2.167',
  },
  sep: {
    label: 'Stanford Encyclopedia of Philosophy, "Death"',
    url: 'https://plato.stanford.edu/entries/death/',
  },
};

export const TRAPS = {
  odds: 'Overestimating the odds',
  magic: 'Thinking makes it happen',
  certain: 'Needing to be sure',
  worst: 'Picturing the worst version',
};

export const TRAP_DEFS = {
  odds: 'treats something rare as likely, or a common feeling as a sign of danger',
  magic: 'treats a thought as if it could change what happens',
  certain: 'makes feeling okay depend on knowing something no one can know',
  worst: 'picks the most frightening version and treats it as the only one',
};

export const STEPS = [
  {
    slug: 'how-it-works',
    title: 'How the fear works',
    minutes: '10 minutes',
    goal: 'You can say, in your own words, why pushing a death thought away makes the next one louder.',
    pages: [
      {
        blocks: [
          {
            type: 'guess',
            key: 'guess',
            prompt:
              'Before you read anything: when you push a thought about death away, what do you think happens to the next one?',
            reveal: [
              'Most people guess it goes away. It does, for a while. Then it comes back, often louder. The rest of this step is why.',
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Picture a smoke alarm that goes off when you make toast. It is doing its job, keeping you alive. It is just set too sensitive.',
              'Fear of death works like that alarm. It goes off at a thought, a headline, or a twinge in your chest, when nothing is on fire.',
              'This fear is common, and it has a name: death anxiety. Researchers think it sits underneath many other worries, like health anxiety and panic.',
            ],
          },
          { type: 'sources', ids: ['iverach2014'], status: 'checked' },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Here is the loop that keeps the alarm loud:',
              '1. A thought about death arrives.',
              '2. The alarm goes off: dread, a racing heart.',
              '3. You do something to make it stop. You change the subject, google a symptom, ask someone to tell you it is fine, or stay away from anything to do with death.',
              '4. Relief comes, so your brain learns that the thought really was dangerous, and turns the alarm up for next time.',
              'The way out runs the other way. Let the thought come, skip step 3, and let the alarm rise and fall on its own. Each time, it learns the thought was not a fire.',
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Try it in a picture. Each round a thought arrives. Choose what you do with it and watch what the alarm does next time.',
            ],
          },
          { type: 'sim' },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            body: [
              'This is the core of cognitive behavioral therapy (CBT) for fear of death. In a review of 15 trials, treatment lowered death anxiety, and CBT lowered it more than the other therapies did. Most of the trials were small or of low quality, so treat this as promising rather than settled.',
              'The next steps follow the parts a CBT therapist would use: name the fear, face it a small step at a time, catch the thoughts that feed it, and put energy into the life you have.',
            ],
          },
          {
            type: 'sources',
            ids: ['menzies2018', 'furer2008'],
            status: 'checked',
            note: 'The review found an overall effect of g = 0.45 and a larger one for CBT. The Furer & Walker components were confirmed from the abstract only.',
          },
        ],
      },
      {
        blocks: [
          {
            type: 'recall',
            key: 'recall',
            prompt:
              'Without scrolling back: why does pushing a death thought away make the next one louder?',
            model:
              'Pushing it away brings relief, and the relief teaches your brain the thought was dangerous. So the alarm goes off harder next time. Letting the thought stay until the alarm settles teaches the opposite.',
          },
        ],
      },
    ],
  },
  {
    slug: 'name-it',
    title: 'Name your fear',
    minutes: '5 minutes',
    goal: 'You know which part of the fear is loudest and what you do to make it stop.',
    pages: [
      {
        blocks: [
          {
            type: 'text',
            body: [
              '"Fear of death" is usually a few fears together. Tick the ones that are yours and rate how strong each is, from 0 (not at all) to 10 (the worst).',
            ],
          },
          {
            type: 'rate-list',
            key: 'parts',
            options: [
              'Not existing any more',
              'The dying itself: pain or illness',
              'Not knowing what comes after',
              'Leaving people behind',
              'People I love dying',
              'Dying before I have done what I want to',
              'Losing control of my body or mind',
            ],
          },
          {
            type: 'write',
            key: 'partOther',
            prompt: 'Anything else?',
            short: true,
          },
        ],
      },
      {
        blocks: [
          {
            type: 'checks',
            key: 'safety',
            prompt: 'When the fear shows up, what do you do to make it stop?',
            options: [
              'Google symptoms',
              'Ask someone to tell me I am okay',
              'Check my body (pulse, lumps, breathing)',
              'Keep busy so I cannot think',
              'Avoid funerals, hospitals, or films about death',
              'Avoid anything that plans for death, like a will',
              'Scroll or watch something until it passes',
            ],
          },
          {
            type: 'text',
            body: [
              'Each of these brings relief now. Each is also step 3 of the loop from the first step. You do not have to stop any of them today. Noticing them is the first part.',
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'write',
            key: 'loudest',
            prompt:
              'In one sentence, what is the part you are most afraid of? Write it the way you would say it out loud.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ladder',
    title: 'Build your ladder',
    minutes: '10 minutes',
    goal: 'You have a list of small steps toward the fear, easiest first.',
    pages: [
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Facing a fear a small step at a time is how the alarm learns. A ladder is the list of those steps, from easy to hard.',
              'Tick the ones you could imagine trying, and rate how hard each would feel from 0 to 10. Add your own. You will only ever climb one rung at a time, and you choose when.',
            ],
          },
          { type: 'ladder', key: 'rungs' },
          {
            type: 'text',
            body: [
              'Start with a rung around 3 or 4: hard enough to feel it, easy enough to stay with it.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'thoughts',
    title: 'Catch the thought',
    minutes: '10 minutes',
    goal: 'You can spot which trap a death thought falls into and write a fairer version of it.',
    pages: [
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Some thoughts make the alarm louder than the facts justify. Four traps come up most:',
              `${TRAPS.odds}: "This headache means something is badly wrong."`,
              `${TRAPS.magic}: "If I think about dying, it is more likely to happen."`,
              `${TRAPS.certain}: "I cannot relax until I know what happens after."`,
              `${TRAPS.worst}: "Dying will be unbearable."`,
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Here is one worked all the way through.',
              'Thought: "My chest feels tight. This is a heart attack."',
              `Trap: ${TRAPS.odds}.`,
              'Fairer version: "Chest tightness is very often anxiety, and I have felt this before when I was scared. If it comes with pain spreading to my arm or jaw, sweating or trouble breathing, I call 911. Otherwise I let it pass."',
              'The fairer version is not "everything is fine". It is the realistic odds, plus a plan for the rare case.',
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'traps',
            key: 'traps',
            items: [
              {
                thought: '"Writing a will is tempting fate."',
                answer: 'magic',
                why: 'Writing about death has no effect on when it happens. Making a plan is something people do so the ones they love are looked after.',
              },
              {
                thought:
                  '"I can\'t enjoy today because I don\'t know what death is like."',
                answer: 'certain',
                why: 'Nobody can be certain what death is like. The trap is making peace depend on an answer no one has.',
              },
              {
                thought: '"When I go, it will be slow and agonising."',
                answer: 'worst',
                why: 'It picks the most frightening version and treats it as the only one. Hospice and palliative care teams exist to treat pain and breathlessness at the end of life.',
              },
              {
                thought:
                  '"I keep reading about young people dying suddenly. That will be me."',
                answer: 'odds',
                why: 'Sudden deaths make the news because they are rare. Reading about many of them makes them feel common.',
              },
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Now this one has a gap at the end. The thought and trap are given; you write the fairer version.',
              'Thought: "If I let myself think about death, I will never stop being scared."',
              'Trap: Picturing the worst version.',
            ],
          },
          {
            type: 'recall',
            key: 'faded',
            prompt: 'Fairer version:',
            model:
              'One possibility: "When I have let the fear stay before, it rose and then came down. Thinking about death is uncomfortable, and discomfort passes."',
          },
        ],
      },
      {
        blocks: [
          {
            type: 'write',
            key: 'ownThought',
            prompt:
              'Now one of yours. What is a death thought you had recently?',
          },
          {
            type: 'checks',
            key: 'ownTrap',
            prompt: 'Which trap or traps is it?',
            options: Object.values(TRAPS),
            noOther: true,
          },
          { type: 'write', key: 'ownFair', prompt: 'A fairer version:' },
        ],
      },
    ],
  },
  {
    slug: 'other-views',
    title: 'Other ways to look at it',
    minutes: '10 minutes',
    goal: 'You have one way of seeing death that loosens the fear a little, in your own words.',
    pages: [
      {
        blocks: [
          {
            type: 'text',
            body: [
              'People have thought about this for thousands of years. Here are four ideas that some people find calming. They are philosophy, not treatment. Take the ones that help and leave the rest.',
            ],
          },
          {
            type: 'text',
            title: 'Epicurus, about 300 BC',
            body: [
              '"When we are, death is not, and when death is present, then we are not." Being dead is not something you will experience, so it cannot hurt you.',
              'Where it falls short: it speaks to being dead, not to the fear of dying or of missing out on life.',
            ],
          },
          {
            type: 'text',
            title: 'Lucretius, about 50 BC',
            body: [
              'You did not exist for billions of years before you were born, and that does not frighten you. After death is the same kind of nothing.',
              'Where it falls short: the time before birth did not take anything from you, and death takes the future you would have had.',
            ],
          },
          { type: 'sources', ids: ['sep'], status: 'checked' },
        ],
      },
      {
        blocks: [
          {
            type: 'text',
            title: 'Ripples',
            body: [
              'The psychiatrist Irvin Yalom wrote about "rippling": the ways a life keeps reaching people after it ends. A habit you taught someone, a kindness, the way your niece will laugh because you made her laugh.',
            ],
          },
          {
            type: 'text',
            title: 'What death gives',
            body: [
              'Many people who have faced death closely say that afterwards they wasted less time on what did not matter. A limit is part of why a day counts.',
            ],
          },
          {
            type: 'text',
            title: 'Your own beliefs',
            body: [
              'If you have a faith or a belief about what comes after, it belongs here too. This page does not take a side.',
            ],
          },
        ],
      },
      {
        blocks: [
          {
            type: 'write',
            key: 'helps',
            prompt:
              'Which idea helped, even a little? Explain it in your own words, as if to a friend who is scared.',
          },
        ],
      },
    ],
  },
  {
    slug: 'live-it',
    title: 'Live like it counts',
    minutes: '10 minutes',
    goal: 'You have one small thing to do this week that matters to you.',
    pages: [
      {
        blocks: [
          {
            type: 'text',
            body: [
              'Fear of death often takes energy away from living. The last part of the work turns that around: put attention into the life you have.',
            ],
          },
          {
            type: 'write',
            key: 'matters',
            prompt: 'What are the three things that matter most to you?',
          },
          {
            type: 'write',
            key: 'regret',
            prompt: 'What would you be sad never to have done?',
          },
        ],
      },
      {
        blocks: [
          {
            type: 'write',
            key: 'thisWeek',
            prompt:
              'Pick one small thing from that list you could do this week. Small enough to actually happen.',
            short: true,
          },
          {
            type: 'text',
            body: [
              'When you come back, the section will ask whether you did it. You can keep climbing your ladder in the meantime.',
            ],
          },
        ],
      },
    ],
  },
];

export const stepBySlug = Object.fromEntries(STEPS.map((s) => [s.slug, s]));

// Rungs offered on the ladder, roughly easy to hard for most people.
export const SUGGESTED_RUNGS = [
  'Say the word "death" out loud five times',
  'Write "I will die one day" and read it aloud',
  'Read the obituary of someone you never met',
  'Watch a film scene where a character dies',
  'Look at photos of an old cemetery',
  'Ask someone how they feel about death, and listen',
  'Write a letter to someone you love, to be read after you die',
  'Choose the music for your own funeral',
  'Visit a cemetery and read the stones',
  'Write your own obituary',
  'Make a will, or fill in an advance directive',
];

// Spaced review: after a step is done, a short recall question comes back
// after these gaps in days.
export const REVIEW_GAPS = [2, 7, 21];

export const REVIEWS = {
  'how-it-works': {
    prompt: 'Why does pushing a death thought away make the next one louder?',
    model: STEPS[0].pages.at(-1).blocks[0].model,
  },
  'name-it': {
    prompt:
      'What part of the fear is loudest for you right now, and what do you usually do to make it stop?',
    model:
      'Compare with what you wrote last time (below). It is fine if it has changed.',
    compare: (answers) => answers.loudest,
  },
  thoughts: {
    prompt:
      'Write a death thought you had this week, name its trap, and write a fairer version.',
    model:
      'A fairer version gives the realistic odds and a plan for the rare case. It does not promise everything is fine.',
  },
  'other-views': {
    prompt: 'In two sentences, the idea about death that helps you most:',
    model: 'Last time you wrote:',
    compare: (answers) => answers.helps,
  },
  'live-it': {
    prompt: 'Did you do the small thing you picked? What is the next one?',
    model: 'Last time you picked:',
    compare: (answers) => answers.thisWeek,
  },
};
