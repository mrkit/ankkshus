import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSaveFearEntryMutation } from '../../app/api.js';
import { Rate10 } from './Rate10.jsx';

const URGES = [
  'Google something',
  'Ask someone if I am okay',
  'Check my body',
  'Distract myself hard',
  'Leave or avoid something',
];

// The short session: two minutes, for a low day or a fear that is here now.
export function FearNow() {
  const [page, setPage] = useState(0);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [urges, setUrges] = useState([]);
  const [save, { isLoading, error }] = useSaveFearEntryMutation();
  const [saved, setSaved] = useState(false);

  async function finish() {
    const result = await save({
      step: 'now',
      before,
      after,
      answers: { urges },
    });
    if (!result.error) setSaved(true);
  }

  return (
    <article className="fear-step">
      <Link to="/fear" className="back-link">
        ← Fear of death
      </Link>
      <h1>The fear is here</h1>

      {saved ? (
        <section className="card done-card">
          <p>
            It started at <strong>{before}/10</strong> and is at{' '}
            <strong>{after}/10</strong> now. Both numbers are saved on the
            overview, so over time you can see how high it goes and how far it
            comes down.
          </p>
          <Link to="/fear" className="btn btn-primary">
            Done
          </Link>
        </section>
      ) : (
        <section className="card step-page">
          {page === 0 && (
            <>
              <p>How strong is the fear right now?</p>
              <Rate10 name="before" value={before} onChange={setBefore} />
              <button
                type="button"
                className="btn btn-primary"
                disabled={before === null}
                onClick={() => setPage(1)}
              >
                Next
              </button>
            </>
          )}
          {page === 1 && (
            <>
              <p>
                Say to yourself:{' '}
                <strong>
                  “This is the death fear. It is the alarm, not a fire.”
                </strong>
              </p>
              <p>
                Notice where you feel it in your body. You do not have to make
                it go away. It will rise and then fall on its own.
              </p>
              <fieldset className="checks">
                <legend>What do you feel the urge to do?</legend>
                {URGES.map((u) => (
                  <label key={u} className="check">
                    <input
                      type="checkbox"
                      checked={urges.includes(u)}
                      onChange={() =>
                        setUrges(
                          urges.includes(u)
                            ? urges.filter((x) => x !== u)
                            : [...urges, u],
                        )
                      }
                    />
                    <span>{u}</span>
                  </label>
                ))}
              </fieldset>
              <p>
                Try not doing it, just this once. Go back to what you were doing
                and let the fear come along. Come back here when you are ready
                to rate it again.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPage(2)}
              >
                I'm ready to rate it again
              </button>
            </>
          )}
          {page === 2 && (
            <>
              <p>How strong is it now?</p>
              <Rate10 name="after" value={after} onChange={setAfter} />
              {error && (
                <p className="error" role="alert">
                  Could not save. Try again.
                </p>
              )}
              <button
                type="button"
                className="btn btn-primary"
                disabled={after === null || isLoading}
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
