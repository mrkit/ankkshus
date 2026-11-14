import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetEntriesQuery, useSaveEntryMutation } from '../../app/api.js';
import { REVIEWS, stepBySlug } from './steps.js';

// A spaced recall question from a finished step: answer first, then compare.
export function ReviewPage() {
  const { slug } = useParams();
  const review = REVIEWS[slug];
  const { data: entries = [] } = useGetEntriesQuery();
  const [text, setText] = useState('');
  const [shown, setShown] = useState(false);
  const [saved, setSaved] = useState(false);
  const [save, { isLoading }] = useSaveEntryMutation();

  if (!review) return <p className="muted">That question does not exist.</p>;
  const earlier = entries.find((e) => e.step === slug)?.answers ?? {};
  const compare = review.compare?.(earlier);

  async function show() {
    setShown(true);
    const result = await save({ step: `review-${slug}`, answers: { text } });
    if (!result.error) setSaved(true);
  }

  return (
    <article className="fear-step">
      <Link to="/fear" className="back-link">
        ← Fear of death
      </Link>
      <h1>A question from “{stepBySlug[slug].title}”</h1>
      <section className="card step-page">
        <label className="field">
          <span>{review.prompt}</span>
          <textarea
            className="textarea"
            rows={4}
            value={text}
            readOnly={shown}
            maxLength={2000}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        {!shown ? (
          <button
            type="button"
            className="btn btn-primary"
            disabled={!text.trim() || isLoading}
            onClick={show}
          >
            Compare
          </button>
        ) : (
          <div className="reveal">
            <p>{review.model}</p>
            {compare && <blockquote>{compare}</blockquote>}
            {saved && <p className="muted">Saved.</p>}
            <Link to="/fear" className="btn btn-primary">
              Back to the overview
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}
