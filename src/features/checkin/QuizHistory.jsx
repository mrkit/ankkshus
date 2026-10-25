import { Link, useParams } from 'react-router-dom';
import { useGetQuizAttemptsQuery, useGetQuizQuery } from '../../app/api.js';
import { bandColor, bandFor } from '../../lib/bands.js';
import { fullDate, relativeDate } from '../../lib/dates.js';

export function QuizHistory() {
  const { slug } = useParams();
  const { data: quiz } = useGetQuizQuery(slug);
  const { data: attempts = [], isLoading } = useGetQuizAttemptsQuery(slug);

  return (
    <>
      <div className="page-title">
        <div>
          <h1>{quiz?.title ?? 'History'}</h1>
          <p className="muted">
            Every time either of you did this one, newest first.
          </p>
        </div>
        <Link to={`/check-in/${slug}`} className="btn btn-gold">
          Do it now
        </Link>
      </div>

      <section className="card">
        {isLoading && <p className="muted">Looking back…</p>}
        {!isLoading && attempts.length === 0 && (
          <p className="empty">Nobody has done this one yet.</p>
        )}
        {attempts.length > 0 && (
          <table className="history">
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">Who</th>
                {quiz?.kind === 'checklist' && <th scope="col">Total</th>}
                <th scope="col">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => {
                const band = bandFor(a.total);
                return (
                  <tr key={a.id}>
                    <td>
                      <strong>{relativeDate(a.completedAt)}</strong>
                      <br />
                      <span className="muted">{fullDate(a.completedAt)}</span>
                    </td>
                    <td>{a.user?.username}</td>
                    {quiz?.kind === 'checklist' && (
                      <td className="num">
                        <span
                          className="swatch"
                          style={{ background: bandColor(band) }}
                        />
                        {a.total}
                      </td>
                    )}
                    <td>
                      <Link to={`/check-in/attempts/${a.id}`}>Open</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
