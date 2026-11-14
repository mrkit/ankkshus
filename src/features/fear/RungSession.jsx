import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetEntriesQuery, useSaveEntryMutation } from '../../app/api.js';
import { progressFrom } from './progress.js';
import { Rate10 } from './Rate10.jsx';

// One go at a ladder rung, set up as an experiment: predict, do it, compare.
export function RungSession() {
  const { data: entries = [], isLoading: loading } = useGetEntriesQuery();
  const [rung, setRung] = useState(null);
  const [page, setPage] = useState(0);
  const [predicted, setPredicted] = useState(null);
  const [expect, setExpect] = useState('');
  const [peak, setPeak] = useState(null);
  const [end, setEnd] = useState(null);
  const [happened, setHappened] = useState('');
  const [saved, setSaved] = useState(false);
  const [save, { isLoading, error }] = useSaveEntryMutation();

  if (loading) return <p className="muted">Loading…</p>;
  const { ladder, nextRung } = progressFrom(entries);
  const chosen = rung ?? nextRung?.text ?? ladder[0]?.text;

  if (!ladder.length) {
    return (
      <section className="card">
        <h1>No ladder yet</h1>
        <p>Build one first. It takes a few minutes.</p>
        <Link to="/fear/step/ladder" className="btn btn-primary">
          Build your ladder
        </Link>
      </section>
    );
  }

  async function finish() {
    const result = await save({
      step: 'rung',
      before: peak,
      after: end,
      answers: { rung: chosen, predicted, expect, happened },
    });
    if (!result.error) setSaved(true);
  }

  return (
    <article className="fear-step">
      <Link to="/fear" className="back-link">
        ← Fear of death
      </Link>
      <h1>Climb a rung</h1>

      {saved ? (
        <section className="card done-card">
          <h2>{chosen}</h2>
          <dl className="compare">
            <div>
              <dt>You expected the fear to reach</dt>
              <dd>{predicted}/10</dd>
            </div>
            <div>
              <dt>It reached</dt>
              <dd>{peak}/10</dd>
            </div>
            <div>
              <dt>At the end it was</dt>
              <dd>{end}/10</dd>
            </div>
          </dl>
          {expect && (
            <p>
              <strong>You expected:</strong> {expect}
            </p>
          )}
          {happened && (
            <p>
              <strong>What happened:</strong> {happened}
            </p>
          )}
          <p className="muted">
            Doing the same rung again on another day is how it gets easier. When
            it stays at 3 or under on two different days, the ladder marks it
            “easier now”.
          </p>
          <Link to="/fear" className="btn btn-primary">
            Back to the overview
          </Link>
        </section>
      ) : (
        <section className="card step-page">
          {page === 0 && (
            <>
              <label className="field">
                <span>Which rung?</span>
                <select
                  className="input"
                  value={chosen}
                  onChange={(e) => setRung(e.target.value)}
                >
                  {ladder.map((r) => (
                    <option key={r.text} value={r.text}>
                      {r.text} ({r.rating}/10{r.easier ? ', easier now' : ''})
                    </option>
                  ))}
                </select>
              </label>
              <p>Before you start: how high do you think the fear will go?</p>
              <Rate10
                name="predicted"
                value={predicted}
                onChange={setPredicted}
              />
              <label className="field">
                <span>What do you expect will happen?</span>
                <textarea
                  className="textarea"
                  rows={3}
                  value={expect}
                  maxLength={2000}
                  onChange={(e) => setExpect(e.target.value)}
                />
              </label>
              <button
                type="button"
                className="btn btn-primary"
                disabled={predicted === null}
                onClick={() => setPage(1)}
              >
                Next
              </button>
            </>
          )}
          {page === 1 && (
            <>
              <h2>{chosen}</h2>
              <p>Do it now, or whenever you are ready today.</p>
              <ul className="do-list">
                <li>Stay with it a little longer than feels comfortable.</li>
                <li>
                  Skip the things that make the fear stop: googling, checking,
                  asking for reassurance, distracting yourself.
                </li>
                <li>You can stop at any point. Stopping is not failing.</li>
              </ul>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPage(2)}
              >
                I've done it
              </button>
            </>
          )}
          {page === 2 && (
            <>
              <p>How high did the fear go at its worst?</p>
              <Rate10 name="peak" value={peak} onChange={setPeak} />
              <p>And at the end?</p>
              <Rate10 name="end" value={end} onChange={setEnd} />
              <label className="field">
                <span>
                  What actually happened, compared with what you expected?
                </span>
                <textarea
                  className="textarea"
                  rows={3}
                  value={happened}
                  maxLength={2000}
                  onChange={(e) => setHappened(e.target.value)}
                />
              </label>
              {error && (
                <p className="error" role="alert">
                  Could not save. Try again.
                </p>
              )}
              <button
                type="button"
                className="btn btn-primary"
                disabled={peak === null || end === null || isLoading}
                onClick={finish}
              >
                Save
              </button>
            </>
          )}
        </section>
      )}
    </article>
  );
}
