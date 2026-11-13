# The fear-of-death section: design notes

Written 2026-11-13. This repo is public, so these notes describe the reader
in general terms only. Rule IDs (P1, A15…) are from the
`framework` skill. Each claim is marked **checked** (read in a source),
**judgement** (reasoning, with what would overturn it), or **unverified**.

## Who it is for (P7)

- **Who:** an adult with a strong fear of death, using the site alone.
- **What they already have:** the CBT worksheets archived in Check-in, so the
  vocabulary of thoughts, traps and ratings is not new.
- **Their goal:** a fear they can live alongside. The goal is not to stop
  thinking about death.
- **Constraints:** low energy on many days, and mostly on a phone. It is a
  private site, and each person's entries are theirs alone.
- **What it must not do:** grade her, show streaks, shame her for missing a
  week, show graphic content, or act as if it replaces a therapist.

## What she should be able to do (P8)

Each step ends on one observable act. (The notes below say "she" for the reader.) The act is the step's `goal` in
`src/features/fear/steps.js`, and the "saved" screen shows it.

1. Say in her own words why pushing a death thought away makes the next one louder.
2. Name which part of the fear is loudest and what she does to make it stop.
3. Have a ladder of exposure steps, easiest first.
4. Spot which trap a death thought is in and write a fairer version.
5. Explain, as if to a friend, one way of seeing death that loosens the fear.
6. Name one small thing that matters to do this week.

The lasting skill is the ladder. That is climbing a rung, predicting what
will happen first, then comparing.

## Why these steps

The parts are the ones Furer & Walker (2008) list for CBT for death anxiety:
exposure to death themes, fewer safety behaviors, cognitive reappraisal,
more focus on life goals, and relapse prevention. **Checked from the abstract
only.** The full text was not reachable.

The evidence that this kind of treatment helps:

- Menzies et al. (2018): a meta-analysis of 15 trials found an overall effect
  of g = 0.45, a larger one for CBT, and mostly low study quality. **Checked**
  from the abstract record. The page's wording ("promising rather than
  settled") follows the quality finding.
- An online CBT program for death anxiety has an open trial (20 started, 10
  finished, 60% of finishers improved reliably). Its randomised trial is
  registered and has no results yet. **Checked.** The site does not claim a
  randomised trial shows it works.
- Iverach et al. (2014): death anxiety may sit underneath several anxiety
  disorders. **Checked.**

## How the framework rules are applied

| Rule | Where |
|---|---|
| P1: about 4 new ideas per chunk | Each page holds one idea. The loop page has 4 stages. |
| P26: attempt before reading | Step 1 opens with a guess, and the answer is shown next to it. |
| P28: intuition before mechanism | The smoke-alarm comparison comes before the loop. |
| P31 and P46: a small world for a process over time | The alarm picture (`AlarmSim.jsx`). It opens to free play with no gate. The recall page after it is the check. |
| P43: a simplification needs a route to the full version | The picture is labelled "not real measurements". The "What this rests on" boxes link to the sources. |
| P16 and P21: recall at the end, then show a model answer | The last page of step 1. Steps 4 and 5 use it too. |
| P3: worked example, then a faded one, then her own | Step 4: one worked thought, one with the last part left blank, then her own. |
| P19: every wrong option explains itself | The trap items give feedback on each option. |
| P36: several framings | Step 5 gives four views, each with its honest limit. |
| P11: spaced return | Review questions come back 2, 7 and 21 days after a step (`REVIEW_GAPS`). |
| P32: two session sizes | "The two-minute version" is a quiet line under the main next step. |
| P33 and A15: reward returning, never streaks | A "welcome back" line counts the days she has come back. There are no streaks and no scores. |
| P44: close the loop | Every saved step ends with "Where you pick up". |
| P38: remove what stops her | Each step is short, she can stop anywhere, nothing is graded, and her answers are private. |

## Judgements, with what would overturn them

- **A rung counts as "easier now" after a peak of 3/10 or lower on two
  different days.** Judgement. Two days, so one good day does not count. The
  number 3 is a common working threshold in exposure practice, and no source
  for it was read. Overturn it if she finds rungs marked easier that still
  feel hard. In that case, raise the bar.
- **The exposure session stresses comparing what she predicted with what
  happened, more than waiting for the fear to fall by half.** Judgement. It
  leans on the inhibitory-learning account of exposure. That account was not
  read this session.
- **The review gaps of 2, 7 and 21 days come from the framework's usual
  starting values (P11).** They were not tuned for therapy homework.
- **The quick tool, "The fear is here", asks her to skip the urge and carry
  on with what she was doing, not to breathe it away.** Judgement. Breathing
  used to escape the fear can work as a safety behavior.

## Safety

- Every page links back to the overview, and the overview has the "If it is
  a lot" box: a CBT therapist, and 988 (**checked**, 988lifeline.org).
- Ladder rungs are chosen by her. None is graphic.
- Entries are visible only to the seat that wrote them. The API enforces
  this, and a test covers it.
