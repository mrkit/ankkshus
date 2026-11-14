import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetEntriesQuery, useSaveEntryMutation } from '../../app/api.js';
import { Ask } from '../fear/Blocks.jsx';
import { sectionByN } from './course.js';
import {
  AvoidanceCost,
  EmotionParts,
  JournalDays,
  LabelSwap,
  ProblemRanker,
  ThoughtFeelingAction,
  Toolbox,
  TrapSorter,
} from './Practice.jsx';

const PRACTICE_TITLE = {
  tfa: 'Practice: thought, feeling or action?',
  problems: 'Practice: rank your problems',
  avoid: 'Practice: weigh up an avoidance',
  emotion: 'Practice: take an emotion apart',
  traps: 'Practice: spot the trap',
  journal: 'Your journal',
  labels: 'Practice: swap a label',
  toolbox: 'Practice: build your toolbox',
};

export function SectionPage({ user }) {
  const { n } = useParams();
  const section = sectionByN[n];
  const { data: entries = [], isLoading } = useGetEntriesQuery();
  const [answers, setAnswers] = useState(null);
  const [status, setStatus] = useState('');
  const [save, { isLoading: saving }] = useSaveEntryMutation();
  const step = `therapy-${n}`;

  useEffect(() => {
    if (isLoading || answers) return;
    setAnswers(entries.find((e) => e.step === step)?.answers ?? {});
  }, [isLoading, entries, step, answers]);

  if (!section) return <p className="muted">That section does not exist.</p>;
  if (!answers) return <p className="muted">Loading…</p>;

  const set = (key) => (value) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStatus('');
  };

  async function onSave() {
    const result = await save({ step, answers });
    setStatus(result.error ? 'Could not save. Try again.' : 'Saved.');
  }

  const next = sectionByN[String(section.n + 1)];

  return (
    <article className="section-page">
      <Link to="/therapy" className="back-link">
        ← Therapy
      </Link>
      <header className="page-head">
        <h1>
          {section.n === 0
            ? `Introduction: ${section.title}`
            : `${section.n}. ${section.title}`}
        </h1>
      </header>

      <section className="panel">
        <h2>Before you watch</h2>
        <Ask
          kind="guess"
          block={{
            prompt: section.before,
            button: 'Keep this for later',
            revealTitle: 'Now watch',
            reveal: [
              'Keep your answer in mind while you watch. The question after the video asks you to compare.',
            ],
          }}
          value={answers.before}
          set={set('before')}
        />
      </section>

      <section className="panel">
        <h2>The video</h2>
        {/* biome-ignore lint/a11y/useMediaCaption: the course videos ship without caption files */}
        <video
          className="course-video"
          src={section.video}
          controls
          preload="metadata"
          playsInline
        />
      </section>

      <section className="panel">
        <h2>After you watch</h2>
        <Ask
          kind="recall"
          block={section.after}
          value={answers.after}
          set={set('after')}
        />
      </section>

      {section.practice && (
        <section className="panel">
          <h2>{PRACTICE_TITLE[section.practice]}</h2>
          {section.practice === 'tfa' && (
            <ThoughtFeelingAction value={answers.tfa} set={set('tfa')} />
          )}
          {section.practice === 'problems' && (
            <ProblemRanker value={answers.problems} set={set('problems')} />
          )}
          {section.practice === 'avoid' && (
            <AvoidanceCost value={answers.avoid} set={set('avoid')} />
          )}
          {section.practice === 'emotion' && (
            <EmotionParts value={answers.emotion} set={set('emotion')} />
          )}
          {section.practice === 'traps' && (
            <TrapSorter value={answers.traps} set={set('traps')} />
          )}
          {section.practice === 'journal' && <JournalDays user={user} />}
          {section.practice === 'labels' && (
            <LabelSwap value={answers.labels} set={set('labels')} />
          )}
          {section.practice === 'toolbox' && (
            <Toolbox value={answers.toolbox} set={set('toolbox')} />
          )}
        </section>
      )}

      <section className="panel">
        <h2>Worksheets</h2>
        <ul className="sheet-list">
          {section.quizzes.map((q) => (
            <li key={q.slug}>
              <Link to={`/check-in/${q.slug}`}>{q.title}</Link>
              <span className="muted"> · fill in here</span>
            </li>
          ))}
          {section.worksheets.map((w) => (
            <li key={w.file}>
              <a href={w.file} download>
                {w.title}
              </a>
              <span className="muted"> · original, Word file</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="row section-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSave}
          disabled={saving}
        >
          Save my notes
        </button>
        <span className="muted" role="status">
          {status}
        </span>
        {next && (
          <Link to={`/therapy/${next.n}`} className="next-link">
            Next: {next.title} →
          </Link>
        )}
      </div>
      <p className="muted">Only you can see your notes.</p>
    </article>
  );
}
