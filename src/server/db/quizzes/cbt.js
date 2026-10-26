// The online CBT course Anthony's sister is doing, as written check-ins:
// one quiz per course video, one part per worksheet, one prompt per row of
// the worksheet's form. The prompts are in our words; the course's videos and
// original worksheets stay in her Google Drive share and are linked from each
// quiz. Each quiz ends with one recall prompt in the person's own words.

const drive = (id) => `https://drive.google.com/file/d/${id}/view`;
const text = (prompt, help) => ({ prompt, help, type: 'text' });
const long = (prompt, help) => ({ prompt, help, type: 'longtext' });

const source =
  'From the online CBT course your sister is doing. The video and the original worksheet are in her Google Drive share; the link opens them in Drive.';

const belief =
  'A number from 0 to 100. 100 is completely, 0 is not at all. Go by how it felt in the moment, not how it feels now that you have cooled down.';

const intro = {
  slug: 'cbt-intro',
  title: 'CBT intro: getting to know you',
  kind: 'worksheet',
  order: 1,
  source,
  summary:
    'The background a therapist asks for before the first session: what the problem is, how long, what has been tried, health and family. Skip anything you would rather not write here.',
  videoUrl: drive('1Mv9sg4rK-xv_TNq97WtDIOuIaN8M08_b'),
  videoTitle: 'Introduction video: Start Getting Happier Today',
  sections: [
    {
      title: 'The problem',
      intro: 'Short answers are fine. Leave blank what you are not sure about.',
      questions: [
        long('What is the problem, as you would describe it to someone new?'),
        long('What have you tried so far, and how did each attempt go?'),
        long(
          'How long has this been going on? When did it first show up, and have there been stretches when it was absent?',
        ),
        long(
          'Has it been treated before? If so, how and when, and was any medication for it prescribed?',
        ),
      ],
    },
    {
      title: 'Health',
      questions: [
        long('Any disabilities or physical illnesses?'),
        long('Ever been in hospital or had surgery? When, and what for?'),
        long('Any medication you take for a medical condition?'),
      ],
    },
    {
      title: 'Family and background',
      intro:
        'The course asks these to spot patterns that run in a family and to understand how long things have been hard.',
      questions: [
        long(
          'Who do you live with? Is the family together? Siblings, step- or half-siblings?',
        ),
        long(
          'Has anyone in the family been diagnosed with or treated for a mental illness or substance problem? Any serious medical illness in the family?',
        ),
        long('Anything notable about your early childhood or development?'),
        long(
          'How far did you go in school, and were there academic or behavioural problems along the way?',
        ),
        long(
          'How steady has work been? Do you have a career, or something that feels like one?',
        ),
      ],
    },
  ],
};

const section1 = {
  slug: 'cbt-1',
  title: 'CBT 1: how it works',
  kind: 'worksheet',
  order: 2,
  source,
  summary:
    'The first video explains the method. There is no worksheet for it, so this one is three short answers after watching.',
  videoUrl: drive('1OAfXcAjhhpUFYsEpyWJdeX92c5lKePgA'),
  videoTitle: 'Section 1 video: CBT, Cognitive Behavioral Therapy',
  sections: [
    {
      title: 'After the video',
      intro:
        'Close the video before you write. Guessing is fine; the point is to put it in your own words.',
      questions: [
        long(
          'How does CBT connect a situation, the thoughts about it, the feelings that follow, and what you then do?',
        ),
        long(
          'Of thoughts, feelings and actions, which one do you think you have the most say over right now, and why?',
        ),
        text('One thing from the video you want to try this week.'),
      ],
    },
  ],
};

const section2 = {
  slug: 'cbt-2',
  title: 'CBT 2: looking into distress',
  kind: 'worksheet',
  order: 3,
  source,
  summary:
    'Three worksheets: everything that is not right at the moment, the five problems that weigh most, and a long-term goal that follows from them.',
  videoUrl: drive('17zgHcG-U1DbqXa2NdUdLd8FO2nv3lzC-'),
  videoTitle: 'Section 2 video: Looking into Distress',
  sections: [
    {
      title: 'Identifying my problems',
      intro:
        'Take your time. Physical, emotional and behavioural problems all count.',
      questions: [
        long(
          'List everything that is not right in your life right now, one per line.',
          'The course’s examples: feeling low for no clear reason, no appetite or comfort eating, fear of losing someone or a job or money, anxiety, poor sleep, an addiction, an illness or chronic pain, trouble controlling anger, exhaustion and stress, fear of social situations, after-effects of trauma, depression, OCD, relationship trouble.',
        ),
      ],
    },
    {
      title: 'My most significant problems',
      intro:
        'Pick the five from your list with the biggest effect on an ordinary day. For each one, name it, then break it down: how exactly does it show up?',
      questions: [
        long(
          'Problem 1, and how it affects your day to day.',
          'The course’s example names the problem as sleeping difficulties, then breaks it down: cannot fall asleep because of replaying the day; wake several times anxious about tomorrow; nightmares, and exhausted on waking.',
        ),
        long('Problem 2, and how it affects your day to day.'),
        long('Problem 3, and how it affects your day to day.'),
        long('Problem 4, and how it affects your day to day.'),
        long('Problem 5, and how it affects your day to day.'),
        long(
          'Look at the five together. Do they fall into one category? Do they overlap? Does one feed another?',
        ),
      ],
    },
    {
      title: 'My long-term goals',
      intro:
        'Start from the most significant problem. The goal is only about you: nobody controls other people’s behaviour, so if other people are the problem, a goal might be learning to handle their criticism.',
      questions: [
        long('The problem.'),
        long(
          'The long-term goal that follows from it.',
          'The course’s example: the problem is feeling low and wanting to be alone; the goal is to meet friends or family at least once a week, and to set it up even on the days it does not appeal.',
        ),
        long('A second problem, if you want one.'),
        long('The goal that follows from the second problem.'),
      ],
    },
    {
      title: 'In your own words',
      questions: [
        long(
          'One sentence: the problem that matters most right now, and the goal that comes from it.',
        ),
      ],
    },
  ],
};

const section3 = {
  slug: 'cbt-3',
  title: 'CBT 3: problematic behaviour',
  kind: 'worksheet',
  order: 4,
  source,
  summary:
    'Three worksheets: the unhealthy things you do when you are low, what you avoid and what that costs, and one behaviour to replace, with a schedule.',
  videoUrl: drive('1Wqke1YajEC6TQ_VXRKzuswRzSGgqXxBf'),
  videoTitle: 'Section 3 video: Problematic Behavior',
  sections: [
    {
      title: 'My unhealthy behaviours',
      questions: [
        long(
          'Which unhealthy behaviours show up when you are unhappy? Take any from the list and add your own.',
          'The course’s list: reckless things like gambling, drinking, drugs or sex; irregular sleep; little regard for others; risk taking; isolating; staying in bed; not eating regularly; not going outside; not showering; ignoring responsibilities; skipping the exercise you usually do; avoiding problems; putting things off; avoiding hard environments; not answering the phone, emails or post.',
        ),
      ],
    },
    {
      title: 'My avoidance',
      intro:
        'Hiding from the world is tempting when things are bad. The course’s point is that avoidance makes life smaller and the problems bigger, so this part measures your own.',
      questions: [
        long(
          'What are you avoiding?',
          'People, tasks, places, conversations, looking after yourself.',
        ),
        long('How does the avoiding make you feel?'),
        long('How are you avoiding it? What do you do instead?'),
        long('What are the side effects?'),
      ],
    },
    {
      title: 'Challenging one behaviour',
      intro:
        'Do this for your most significant unhealthy behaviour. For the next one, do this check-in again. Writing it down is step one; the step that counts is doing the scheduled thing in the next few days.',
      questions: [
        long(
          'The unhealthy behaviour.',
          'The course’s example: not socialising.',
        ),
        long('The reason for it.'),
        long('Its effects on you.'),
        long('An alternative, healthy behaviour.'),
        long('The possible benefits of the alternative.'),
        long(
          'The schedule: when, and how often.',
          'Specific enough to tick off: a day, a time, a number of times a week.',
        ),
      ],
    },
    {
      title: 'In your own words',
      questions: [
        text(
          'The one scheduled healthy action, and the first time you will do it.',
        ),
      ],
    },
  ],
};

const section4 = {
  slug: 'cbt-4',
  title: 'CBT 4: problematic emotions',
  kind: 'worksheet',
  order: 5,
  source,
  summary:
    'Three worksheets built on one emotion: map it, take it apart into its four components, then decide what you would rather feel and what that takes.',
  videoUrl: drive('1HPSxW8CrEpFT0M8mI0zKel9HU6rxPv8e'),
  videoTitle: 'Section 4 video: Problematic Emotions',
  sections: [
    {
      title: 'My emotional map',
      intro: 'Pick one recent time you felt bad. Work through it in order.',
      questions: [
        long(
          'The trigger. What set the emotion off? A situation, a possible situation, or a thought.',
          'The course’s example: getting fired.',
        ),
        long(
          'Your behaviour. How did the emotion make you act, or want to act?',
          'Shouting, swearing at someone or at yourself, drinking, smoking more, avoiding people.',
        ),
        long(
          'Your emotional diagnosis. In your own words, what is the problem? Look at what you have been doing, feeling and thinking. What would friends or family say was wrong?',
        ),
        text(
          'Your emotional conclusion. The single word for what you are feeling.',
          'Words the course offers: disappointment, embarrassment, hurt, regret, sadness, grief, shame, jealousy, remorse, envy, fear, anger, anxiety, concern, guilt. A dictionary is allowed.',
        ),
      ],
    },
    {
      title: 'The components of my emotion',
      intro: 'Start from the one word you ended the map with.',
      questions: [
        text('The feeling, in one word.'),
        long('Component 1, thoughts. What am I thinking?'),
        long(
          'Component 2, memories and attention. What do I keep remembering, and where does my focus go?',
        ),
        long(
          'Component 3, physical effects. How is my body reacting?',
          'Appetite, sleep, sweating, tension, energy.',
        ),
        long('Component 4, behaviour. How am I behaving?'),
        long(
          'The emotional truth. What am I realising right now, and what can this exercise teach me?',
        ),
      ],
    },
    {
      title: 'Challenging the emotion',
      intro:
        'The course separates unhealthy negative emotions from healthy ones. Rage, anxiety and shame are the unhealthy kind; anger, concern and sadness are the healthy kind that fits the situation and passes.',
      questions: [
        long(
          'The trigger or problematic situation.',
          'The course’s example: a husband asking for a divorce.',
        ),
        text(
          'The unhealthy negative emotion.',
          'In the example: unhealthy rage.',
        ),
        long('How is this emotion causing you additional problems?'),
        long(
          'What healthy negative emotion would you rather feel instead?',
          'In the example: healthy anger and sadness, so the good memories of the marriage survive the divorce.',
        ),
        long(
          'What do you have to do to change the emotion?',
          'In the example: not drinking to numb it, focusing at work, talking to friends, and letting the sadness be felt.',
        ),
      ],
    },
    {
      title: 'In your own words',
      questions: [
        long(
          'One sentence: the emotion you worked on, and the healthy version of it you are aiming for.',
        ),
      ],
    },
  ],
};

const trap = (name, definition, questions) =>
  long(`${name}. ${definition} Does this one catch you?`, questions);

const section5 = {
  slug: 'cbt-5',
  title: 'CBT 5: problematic thoughts',
  kind: 'worksheet',
  order: 6,
  source,
  summary:
    'The longest section. Catch a negative automatic thought, check it against ten thought traps, pick your top five, then challenge one thought with proof and disproof. Work at your own pace; blanks are fine.',
  videoUrl: drive('1Q6YD0kAptDnpqxXPUoJCIMDmOUxlyoZC'),
  videoTitle: 'Section 5 video: Problematic Thoughts',
  sections: [
    {
      title: 'Identifying a negative automatic thought',
      intro:
        'Think of a specific event that sets your problem off. Re-live it as closely as you can, and notice the thoughts that pop up on their own. Those are the automatic ones.',
      questions: [
        long(
          'The trigger. What happened, when, where, and who else was there?',
          'A trigger can also be a memory, an image, a sound or a smell. The course’s example: a colleague got the promotion, announced in front of the whole office.',
        ),
        long(
          'The negative automatic thought, as specifically as you can.',
          'In the example: my boss does not like me; my hard work is never acknowledged; everyone thinks the colleague is better than me.',
        ),
        text('How strongly did you believe the thought, 0 to 100?', belief),
        long(
          'The emotion. What were you feeling?',
          'In the example: hurt, low, embarrassed, and not at all glad for the colleague.',
        ),
      ],
    },
    {
      title: 'Thought traps, one to five',
      intro:
        'For each trap that catches you, write the situation where it happens and the answers to the questions under it. Skip the ones that do not fit.',
      questions: [
        trap(
          'Catastrophising',
          'Expecting the worst imaginable outcome from a small incident, and underrating your ability to handle it.',
          'Picture a situation that sets it off. What is the proof for the catastrophe? What is the proof against it?',
        ),
        trap(
          'Extreme thinking',
          'Everything is either good or bad, black or white. One rainy day and the whole trip was a disaster.',
          'What proof says the part you are fixed on is the most important part? What other parts of the situation are there, and what is a fairer value for the whole?',
        ),
        trap(
          'Demanding',
          'Expecting yourself and others to follow your rules, and getting upset when things do not go that way.',
          'What language do you use, in your head and out loud: must, have to, should? Do you accept that other people run on their own rules? Are the demands realistic, and are they helping or hurting? How could they become preferences without dropping your standards?',
        ),
        trap(
          'Predictive thinking',
          'Making a prediction about the future and treating it as already true, which stops you acting.',
          'What past situations colour the prediction? What is the proof it will happen, and what is the proof against? Are the risks really too high to act anyway, and what would you gain by acting?',
        ),
        trap(
          'Mind reading',
          'Assuming other people are thinking negative, judging things about you.',
          'Could the assumption be wrong? What are some other explanations? How could you test whether it is true?',
        ),
      ],
    },
    {
      title: 'Thought traps, six to ten',
      questions: [
        trap(
          'Emotive interpretation',
          'Because you feel something, you take the feeling as proof it is true.',
          'How might the feeling be distorting the facts? Which facts could you be ignoring? If you waited to calm down before concluding, how would the situation look?',
        ),
        trap(
          'Labelling',
          'Giving yourself or someone else a label when things go wrong: one missed exam, and you are useless at school.',
          'Which labels do you give yourself and others? Are they fair? What proof is there for and against them? What do they stop you seeing? Could you label the situation instead of the person?',
        ),
        trap(
          'Selective observation',
          'Only taking in the information that supports what you already believe about yourself, and filtering out the rest.',
          'Which part of your life are you filtering? What is the filter hiding? What would you gain by looking at all of it?',
        ),
        trap(
          'Anti-positive',
          'Turning something positive into something negative: they only asked me out because they feel sorry for me.',
          'What positive feedback have you had lately, and how did you respond? Did you believe the person? What would acknowledging it do for you?',
        ),
        trap(
          'Personalisation',
          'Blaming yourself for whatever goes wrong around you, including things you had no part in.',
          'What else contributed to the outcome, or to how people reacted? Seen from the outside, how much of it is really yours?',
        ),
      ],
    },
    {
      title: 'My top five thought traps',
      questions: [
        long(
          'The five traps you want to work on, most common first.',
          'Naming them raises the odds of catching yourself in the act next time.',
        ),
      ],
    },
    {
      title: 'Challenging a thought: the thought',
      intro:
        'Pick one negative automatic thought that gets in the way day to day and that you want to change. The first four answers can repeat what you wrote earlier.',
      questions: [
        long('The trigger, as specifically as possible.'),
        long('The negative automatic thought.'),
        text('How strongly you believed it in the moment, 0 to 100.', belief),
        long('The emotion. What were your feelings?'),
      ],
    },
    {
      title: 'Challenging a thought: the challenge',
      questions: [
        long(
          'Proof. What supports the thought?',
          'In the course’s example: looked at plainly, the colleague getting the promotion means the boss judged them more suitable for that job.',
        ),
        long(
          'Disproof. What goes against the thought being true?',
          'In the example: the colleague had been there longer and had the skills; my work has been acknowledged before; and this is the extreme-thinking trap, because not getting one position does not mean nobody likes me.',
        ),
        text('How strongly you believe the disproof, 0 to 100.'),
        long(
          'An alternative thought.',
          'In the example: the promotion means the boss thought the colleague the best fit for that role, which says nothing about whether the boss likes me, and plenty of other people did not get it either.',
        ),
        text(
          'How strongly you believe the original thought now, 0 to 100.',
          'Compare it with the number you gave in the moment. In the example it went from 90 to 1.',
        ),
      ],
    },
    {
      title: 'In your own words',
      questions: [
        long(
          'Your most common thought trap, and the alternative thought you will reach for next time it fires.',
        ),
      ],
    },
  ],
};

const section6why = {
  slug: 'cbt-6-why',
  title: 'CBT 6: why my journal matters',
  kind: 'worksheet',
  order: 7,
  source,
  summary:
    'One paragraph, written once, before the morning and evening journals begin. The two journals are their own check-ins.',
  videoUrl: drive('1tn-q1ZKzBg048nYDB6PIaOFhl9Ro-_6p'),
  videoTitle: 'Section 6 video: Actively Working on Being Happier',
  sections: [
    {
      title: 'Why my journal is important to me',
      questions: [
        long(
          'Why is writing in a journal each morning and evening important to you? Be specific.',
          'The course’s example runs: because I want to be happier, and the journal makes me notice what I can be grateful for, review my day, and be more present and kinder to myself.',
        ),
      ],
    },
  ],
};

const morning = {
  slug: 'cbt-6-morning',
  title: 'Morning journal',
  kind: 'worksheet',
  order: 8,
  source,
  summary:
    'Five short answers before the day starts. Meant to be done daily, so the history is the point.',
  videoUrl: drive('1tn-q1ZKzBg048nYDB6PIaOFhl9Ro-_6p'),
  videoTitle: 'Section 6 video: Actively Working on Being Happier',
  sections: [
    {
      title: 'Morning',
      questions: [
        long(
          'Three things I am grateful for.',
          'Be specific: not “my partner” but the thing they did. Small counts, and repeats count; the repetition is the training. On a bad morning, being awake and breathing is a valid first one.',
        ),
        text(
          'How do I want to feel today?',
          'Calm, content, strong, confident, energetic. Even a few moments of it in the day is the aim.',
        ),
        long(
          'What will I do today to feel that way?',
          'Tiny and finishable today: a walk at six, a phone call, a hug, flowers. Brightening someone else’s day works too.',
        ),
        text(
          'Today’s affirmation. I am…',
          'Who you want to show up as today, stated boldly even if you do not believe it yet. Either repeat the same one until it sticks, or write the one today needs.',
        ),
        long('Other things on my mind.'),
      ],
    },
  ],
};

const evening = {
  slug: 'cbt-6-evening',
  title: 'Evening journal',
  kind: 'worksheet',
  order: 9,
  source,
  summary: 'Four answers to close the day. Meant to be done daily.',
  videoUrl: drive('1tn-q1ZKzBg048nYDB6PIaOFhl9Ro-_6p'),
  videoTitle: 'Section 6 video: Actively Working on Being Happier',
  sections: [
    {
      title: 'Evening',
      questions: [
        long(
          'Three great things that happened today.',
          'Big or small: a good meal, a real conversation, a conflict you sidestepped that you would not have before. On a day that feels empty, dig; the course’s position is that the inner voice saying nothing happened is wrong.',
        ),
        long(
          'What could I have done to make today even better?',
          'For learning, not for scoring. If the morning plan did not happen, make it smaller for tomorrow. If the same answer keeps coming back, that is a habit worth changing.',
        ),
        long(
          'Were there situations or people that set off negative feelings and thoughts? What can I learn from it, and what are other ways of thinking, feeling and acting?',
        ),
        long('Other things on my mind.'),
      ],
    },
  ],
};

const section7 = {
  slug: 'cbt-7',
  title: 'CBT 7: self-esteem',
  kind: 'worksheet',
  order: 10,
  source,
  summary:
    'Two worksheets: the labels you give yourself and the self-accepting attitudes to replace them, then the evidence for the new attitude from a real situation.',
  videoUrl: drive('1xFW73Wb6LtJ_c0V-zuXuqXvAGBYBe4Hb'),
  videoTitle: 'Section 7 video: Looking at Self Esteem, Stop Rating Yourself',
  sections: [
    {
      title: 'My common labels',
      questions: [
        long(
          'The general areas where you rate yourself.',
          'In the course’s example: career and job success, and social competence.',
        ),
        long(
          'The negative labels you give yourself.',
          'In the example: a failure, inadequate, useless.',
        ),
        long('Why these labels are bad for you. Pin it down.'),
        long(
          'What alternative, self-accepting attitudes would be better for you?',
          'The example’s version: a human being, capable of both success and failure; a mistake at work does not make me a failure; and there are friends and colleagues who like me, which must mean something.',
        ),
      ],
    },
    {
      title: 'Reinforcing the self-accepting attitude',
      intro:
        'One real situation. The habit this builds is noticing that the evidence for the self-accepting attitude outweighs the evidence for the label.',
      questions: [
        long(
          'A negative situation that set you off calling yourself names.',
          'In the example: stumbling over answers in a job interview.',
        ),
        long('The label you gave yourself in that situation.'),
        long('The self-accepting attitude that would have been better.'),
        long(
          'The evidence that supports the self-accepting attitude.',
          'In the example: the interviewers smiled, asked a lot of questions and seemed interested; it was a good conversation.',
        ),
      ],
    },
    {
      title: 'In your own words',
      questions: [
        text(
          'The label you use most, and the attitude you are replacing it with.',
        ),
      ],
    },
  ],
};

const section8 = {
  slug: 'cbt-8',
  title: 'CBT 8: looking to the future',
  kind: 'worksheet',
  order: 11,
  source,
  summary:
    'The last two worksheets: how the goals from section 2 went, and the toolbox that keeps the results: values, actions, and the journal and activity plan.',
  videoUrl: drive('1xz8OtyqDY1zpw_utpfq23fZre-PnBhha'),
  videoTitle: 'Section 8 video: Looking to the Future',
  sections: [
    {
      title: 'Evaluating my goals',
      questions: [
        long('The goals you set in section 2.'),
        long(
          'Have you reached them? How far along is each?',
          'The course notes that some problems from the start, the ones set aside to focus on the significant ones, may not be problems any more.',
        ),
        long('New goals.'),
      ],
    },
    {
      title: 'My toolbox for a happier now',
      intro:
        'The course calls this the worksheet that makes the results last. Detail helps; take the time.',
      questions: [
        long(
          'Life-values. What are your real life-values, and what are the imaginary ones?',
          'In the course’s example: family, friends, health and contributing to others are real; the career that was supposed to be a passion turned out to be draining.',
        ),
        long(
          'Actions. Is your schedule consistent with your long-term values? What do you need to add and remove to live more in tune with them?',
        ),
        long(
          'Journal and activity plan. How will you keep your values and your actions consistent from here on?',
          'In the example: daily notes on the phone of situations handled badly or better than before, what to be grateful for, and a weekly activity plan with room for exercise, family and friends.',
        ),
      ],
    },
    {
      title: 'In your own words',
      questions: [
        text('The one sentence you would tell yourself on a bad day.'),
      ],
    },
  ],
};

export default [
  intro,
  section1,
  section2,
  section3,
  section4,
  section5,
  section6why,
  morning,
  evening,
  section7,
  section8,
];
