// The Burns Depression Checklist: 25 items scored 0 (not at all) to 4
// (extremely), in four sections. The site has used this list since 2020.
const scale = (prompt) => ({ prompt, type: 'scale' });

export default {
  slug: 'burns',
  title: 'Burns Depression Checklist',
  kind: 'checklist',
  order: 0,
  source: "David Burns, from 'The Feeling Good Handbook'.",
  summary:
    'Twenty-five questions about the last week, each scored 0 to 4. ' +
    'It takes a few minutes. The total is kept with the date so the two of you can see how the weeks are going.',
  sections: [
    {
      title: 'Thoughts and feelings',
      intro: 'For each one, how much has it bothered you in the past week?',
      questions: [
        scale('Feeling sad or down in the dumps'),
        scale('Feeling unhappy or blue'),
        scale('Crying spells or tearfulness'),
        scale('Feeling discouraged'),
        scale('Feeling hopeless'),
        scale('Low self-esteem'),
        scale('Feeling worthless or inadequate'),
        scale('Guilt or shame'),
        scale('Criticizing yourself or blaming others'),
        scale('Difficulty making decisions'),
      ],
    },
    {
      title: 'Activities and personal relationships',
      questions: [
        scale('Loss of interest in family, friends or colleagues'),
        scale('Loneliness'),
        scale('Spending less time with family or friends'),
        scale('Loss of motivation'),
        scale('Loss of interest in work or other activities'),
        scale('Avoiding work or other activities'),
        scale('Loss of pleasure or satisfaction in life'),
      ],
    },
    {
      title: 'Physical symptoms',
      questions: [
        scale('Feeling tired'),
        scale('Difficulty sleeping or sleeping too much'),
        scale('Decreased or increased appetite'),
        scale('Loss of interest in sex'),
        scale('Worrying about your health'),
      ],
    },
    {
      title: 'Suicidal urges',
      intro:
        'If any of these is more than 0 right now, the 988 Suicide & Crisis Lifeline answers calls and texts at 988, any time. Telling your brother counts too.',
      questions: [
        scale('Do you have any suicidal thoughts?'),
        scale('Would you like to end your life?'),
        scale('Do you have a plan for harming yourself?'),
      ],
    },
  ],
};
