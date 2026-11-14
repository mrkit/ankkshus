import { Link } from 'react-router-dom';
import { useGetContactsQuery, useGetEntriesQuery } from '../../app/api.js';
import { longDate, relativeDate } from '../../lib/dates.js';
import { progressFrom } from '../fear/progress.js';
import { ROLE_GROUPS } from '../manual/contacts.js';
import { SITUATIONS } from '../manual/situations.js';
import { SECTIONS } from '../therapy/course.js';

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
  const { data: entries = [] } = useGetEntriesQuery();
  const fear = progressFrom(
    entries.filter(
      (e) => !e.step.startsWith('therapy') && e.step !== 'feeling',
    ),
  );
  const total = ROLE_GROUPS.flatMap((g) => g.roles).length;
  const common = COMMON.map((slug) => SITUATIONS.find((s) => s.slug === slug));
  const nextSection = SECTIONS.find(
    (s) => !entries.some((e) => e.step === `therapy-${s.n}`),
  );
  const lastFeeling = entries.find((e) => e.step === 'feeling');

  return (
    <>
      <header className="greeting deal">
        <h1>Hi, {user.username}.</h1>
        <p className="muted">{longDate(new Date())}</p>
      </header>

      <div className="home-grid deal">
        <section className="card manual-card" aria-labelledby="manual-title">
          <div className="card-head">
            <h2 id="manual-title">What to do when…</h2>
            <Link to="/manual" className="btn btn-quiet">
              All {SITUATIONS.length}
            </Link>
          </div>
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

        <div className="home-side">
          <section className="card home-tile" aria-labelledby="feel-title">
            <h2 id="feel-title">How are you feeling?</h2>
            <p className="muted">
              {lastFeeling
                ? `Last time: ${lastFeeling.answers.word}, ${relativeDate(lastFeeling.createdAt)}.`
                : 'Place it on the map and find the word for it.'}
            </p>
            <Link to="/feel" className="btn btn-primary">
              Open the feelings map
            </Link>
          </section>

          <section className="card home-tile" aria-labelledby="therapy-title">
            <h2 id="therapy-title">Therapy</h2>
            <p className="muted">
              {nextSection
                ? `Next: section ${nextSection.n}, ${nextSection.title.toLowerCase()}.`
                : 'All four sections have notes saved.'}
            </p>
            <Link
              to={nextSection ? `/therapy/${nextSection.n}` : '/therapy'}
              className="btn btn-quiet"
            >
              {nextSection ? 'Watch and practice' : 'Open'}
            </Link>
          </section>

          <section className="card home-tile" aria-labelledby="fear-title">
            <h2 id="fear-title">Fear of death</h2>
            <p className="muted">
              {fear.reviewsDue.length > 0
                ? 'A short question from before is waiting.'
                : fear.next
                  ? `Next: ${fear.next.title.toLowerCase()} (${fear.next.minutes}).`
                  : 'Next: climb a rung of your ladder.'}
            </p>
            <div className="row">
              <Link to="/fear" className="btn btn-quiet">
                Carry on
              </Link>
              <Link to="/fear/now" className="btn-link">
                The fear is here now
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
