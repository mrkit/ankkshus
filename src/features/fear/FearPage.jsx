import { Link } from 'react-router-dom';
import { useGetFearEntriesQuery } from '../../app/api.js';
import { relativeDate } from '../../lib/dates.js';
import { progressFrom } from './progress.js';
import { REVIEWS, STEPS } from './steps.js';

export function FearPage() {
  const { data: entries = [], isLoading } = useGetFearEntriesQuery();
  if (isLoading) return <p className="muted">Loading…</p>;

  const p = progressFrom(entries);
  const started = entries.length > 0;

  return (
    <div className="fear">
      <div className="page-title">
        <h1>Fear of death</h1>
      </div>
      <p className="lede muted">
        A step-by-step way to make the fear smaller, built on the parts of
        cognitive behavioral therapy (CBT) used for it. Go at your own pace,
        stop whenever you want, and nothing is graded. Only you can see what you
        write here.
      </p>

      {started && p.daysAway >= 3 && (
        <p className="welcome-back">
          Welcome back. Your last visit was {p.daysAway} days ago, and you have
          come back on {p.days} different days so far.
        </p>
      )}

      <div className="fear-grid">
        <div className="stack">
          {p.reviewsDue.length > 0 && (
            <section className="card review-card">
              <h2>A question from before</h2>
              <p>{REVIEWS[p.reviewsDue[0]].prompt}</p>
              <p className="muted">
                Answer from memory first, then compare. Recalling it is what
                makes it last.
              </p>
              <Link
                to={`/fear/review/${p.reviewsDue[0]}`}
                className="btn btn-gold"
              >
                Answer it
              </Link>
            </section>
          )}

          <section className="card next-card">
            {p.next ? (
              <>
                <h2>{started ? 'Next step' : 'Start here'}</h2>
                <p className="next-title">
                  <strong>{p.next.title}</strong>
                  <span className="muted"> · {p.next.minutes}</span>
                </p>
                <p className="muted">{p.next.goal}</p>
                <Link
                  to={`/fear/step/${p.next.slug}`}
                  className="btn btn-primary"
                >
                  {started ? 'Carry on' : 'Begin'}
                </Link>
              </>
            ) : (
              <>
                <h2>Next: climb a rung</h2>
                <p className="muted">
                  All six steps are done. The ladder is the part to keep doing.
                </p>
                <Link to="/fear/rung" className="btn btn-primary">
                  Climb a rung
                </Link>
              </>
            )}
            <p className="short-version">
              Low on energy, or the fear is here right now?{' '}
              <Link to="/fear/now">The two-minute version</Link>
            </p>
          </section>

          {p.ladder.length > 0 && (
            <section className="card">
              <div className="page-title" style={{ marginBottom: 8 }}>
                <h2>Your ladder</h2>
                <Link to="/fear/rung" className="btn btn-quiet">
                  Climb a rung
                </Link>
              </div>
              <ol className="ladder">
                {p.ladder.map((r) => (
                  <li key={r.text} className={r.easier ? 'is-easier' : ''}>
                    <span className="ladder-text">{r.text}</span>
                    <span className="ladder-meta muted">
                      expected {r.rating}/10
                      {r.tries > 0 &&
                        ` · tried ${r.tries}× · last peak ${r.lastPeak}/10`}
                      {r.easier && ' · easier now'}
                    </span>
                  </li>
                ))}
              </ol>
              <Link to="/fear/step/ladder" className="btn-link">
                Change the ladder
              </Link>
            </section>
          )}

          {p.logs.length > 0 && (
            <section className="card">
              <h2>When the fear showed up</h2>
              <ul className="log-list">
                {p.logs.map((log) => (
                  <li key={log.id}>
                    <span>{relativeDate(log.createdAt)}</span>
                    <span>
                      {log.before}/10 → {log.after ?? '?'}/10
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="stack">
          <section className="card">
            <h2>The steps</h2>
            <ol className="step-list">
              {STEPS.map((s) => (
                <li
                  key={s.slug}
                  className={p.done.has(s.slug) ? 'is-done' : ''}
                >
                  <Link to={`/fear/step/${s.slug}`}>{s.title}</Link>
                  <span className="muted">
                    {p.done.has(s.slug) ? ' · done' : ` · ${s.minutes}`}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="card care-card">
            <h2>If it is a lot</h2>
            <p>
              This is not a therapist. If the fear is stopping you sleeping,
              working or going out, a therapist who does CBT can work through
              these same steps with you.
            </p>
            <p>
              If you ever think about ending your life, call or text{' '}
              <a href="tel:988">988</a>, any hour.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
