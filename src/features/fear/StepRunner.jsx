import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetEntriesQuery, useSaveEntryMutation } from '../../app/api.js';
import { Block } from './Blocks.jsx';
import { progressFrom } from './progress.js';
import { STEPS, stepBySlug } from './steps.js';

export function StepRunner() {
  const { slug } = useParams();
  const step = stepBySlug[slug];
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);
  const [save, { isLoading, error }] = useSaveEntryMutation();
  const { data: entries = [] } = useGetEntriesQuery();
  const heading = useRef(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: move focus to the heading whenever the page changes
  useEffect(() => {
    heading.current?.focus();
  }, [page, saved]);

  // The ladder step starts from the ladder already built, so it can be edited.
  useEffect(() => {
    if (slug !== 'ladder') return;
    const rungs = entries.find((e) => e.step === 'ladder')?.answers?.rungs;
    if (rungs) setAnswers((a) => (a.rungs ? a : { ...a, rungs }));
  }, [slug, entries]);

  if (!step) return <p className="muted">That step does not exist.</p>;

  const last = page === step.pages.length - 1;
  const setAnswer = (key, value) => setAnswers((a) => ({ ...a, [key]: value }));

  async function finish() {
    const result = await save({ step: slug, answers });
    if (!result.error) setSaved(true);
  }

  if (saved) {
    const { next } = progressFrom([
      { step: slug, createdAt: new Date() },
      ...entries,
    ]);
    return (
      <article className="fear-step">
        <section className="card done-card">
          <h1 ref={heading} tabIndex={-1}>
            {step.title}: saved
          </h1>
          <p>
            <strong>What this step was for:</strong> {step.goal}
          </p>
          <p>A short question from it will come back in a couple of days.</p>
          <h2>Where you pick up</h2>
          {next ? (
            <p>
              Next time: <strong>{next.title}</strong> ({next.minutes}).
            </p>
          ) : (
            <p>
              Next time: <strong>climb a rung of your ladder.</strong>
            </p>
          )}
          <div className="row">
            <Link to="/fear" className="btn btn-primary">
              Back to the overview
            </Link>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="fear-step">
      <Link to="/fear" className="back-link">
        ← Fear of death
      </Link>
      <div className="step-head">
        <h1 ref={heading} tabIndex={-1}>
          {step.title}
        </h1>
        <span className="muted">
          Page {page + 1} of {step.pages.length} · step{' '}
          {STEPS.indexOf(step) + 1} of {STEPS.length}
        </span>
      </div>

      <section className="card step-page" key={page}>
        {step.pages[page].blocks.map((block, i) => (
          <Block
            key={block.key ?? i}
            block={block}
            answers={answers}
            setAnswer={setAnswer}
          />
        ))}
      </section>

      {error && (
        <p className="error" role="alert">
          Could not save. Your answers are still here; try again.
        </p>
      )}

      <div className="row step-nav">
        {page > 0 && (
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => setPage(page - 1)}
          >
            Back
          </button>
        )}
        {last ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={finish}
            disabled={isLoading}
          >
            Save and finish
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
        <Link to="/fear" className="btn-link stop-link">
          Stop here
        </Link>
      </div>
    </article>
  );
}
