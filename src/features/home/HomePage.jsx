import { Link } from 'react-router-dom';
import { useGetContactsQuery, useGetFearEntriesQuery } from '../../app/api.js';
import { longDate } from '../../lib/dates.js';
import { progressFrom } from '../fear/progress.js';
import { ROLE_GROUPS } from '../manual/contacts.js';
import { SITUATIONS } from '../manual/situations.js';

const COMMON = [
  'car-crash',
  'battery-dead',
  'fridge-stopped',
  'water-leak',
  'power-out',
  'lost-wallet',
];

export function HomePage({ user }) {
  const { data: contacts = [] } = useGetContactsQuery();
  const { data: entries = [] } = useGetFearEntriesQuery();
  const p = progressFrom(entries);
  const total = ROLE_GROUPS.flatMap((g) => g.roles).length;
  const common = COMMON.map((slug) => SITUATIONS.find((s) => s.slug === slug));

  return (
    <>
      <div className="greeting deal">
        <h1>Hi, {user.username}.</h1>
        <p className="muted">{longDate(new Date())}</p>
      </div>

      <div className="home-grid deal">
        <section className="card manual-card" aria-labelledby="manual-title">
          <div className="page-title" style={{ marginBottom: 8 }}>
            <h2 id="manual-title">What to do when…</h2>
            <Link to="/manual" className="btn btn-primary">
              Open the manual
            </Link>
          </div>
          <p className="muted">
            {SITUATIONS.length} situations, each with the steps for right now
            and who to call.
          </p>
          <ul className="quick-list">
            {common.map((s) => (
              <li key={s.slug}>
                <Link to={`/manual/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
          {contacts.length < total && (
            <p className="nudge">
              {contacts.length} of {total} numbers filled in.{' '}
              <Link to="/manual/people">Add more</Link> so the call buttons
              work.
            </p>
          )}
        </section>

        <section className="card fear-card" aria-labelledby="fear-title">
          <h2 id="fear-title">Fear of death</h2>
          {p.reviewsDue.length > 0 ? (
            <p>A short question from before is waiting.</p>
          ) : p.next ? (
            <p>
              {entries.length ? 'Next' : 'Start with'}:{' '}
              <strong>{p.next.title}</strong>
              <span className="muted"> · {p.next.minutes}</span>
            </p>
          ) : (
            <p>Next: climb a rung of your ladder.</p>
          )}
          <div className="row">
            <Link to="/fear" className="btn btn-primary">
              {entries.length ? 'Carry on' : 'Have a look'}
            </Link>
            <Link to="/fear/now" className="btn-link">
              The fear is here now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
