import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetContactsQuery } from '../../app/api.js';
import { ROLE_GROUPS } from './contacts.js';
import { GROUPS, SITUATIONS } from './situations.js';

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');

function matches(situation, query) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  const hay = norm(`${situation.title} ${situation.keywords}`);
  return words.every((w) => hay.includes(w));
}

export function ManualPage() {
  const [query, setQuery] = useState('');
  const { data: contacts = [] } = useGetContactsQuery();
  const found = query.trim()
    ? SITUATIONS.filter((s) => matches(s, query))
    : SITUATIONS;
  const total = ROLE_GROUPS.flatMap((g) => g.roles).length;

  return (
    <>
      <div className="page-title">
        <h1>What to do when…</h1>
        <Link to="/manual/people" className="btn btn-quiet">
          My people
        </Link>
      </div>

      <a className="sos" href="tel:911">
        <strong>Someone hurt, or in danger?</strong>
        <span>Call 911</span>
      </a>

      <label className="field manual-search">
        <span className="sr-only">Search the manual</span>
        <input
          className="input"
          type="search"
          placeholder="What happened? Try “fridge”, “battery”, “leak”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </label>

      {found.length === 0 && (
        <p className="card empty">
          Nothing matches “{query}”. Try one word, or call{' '}
          <Link to="/manual/people">someone on your list</Link>.
        </p>
      )}

      <div className="manual-groups">
        {GROUPS.map((group) => {
          const items = found.filter((s) => s.group === group.id);
          if (!items.length) return null;
          return (
            <section key={group.id} className="card manual-group">
              <h2>{group.title}</h2>
              <ul className="situation-list">
                {items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/manual/${s.slug}`}
                      className="plain situation-link"
                    >
                      {s.danger && (
                        <span
                          className="danger-dot"
                          role="img"
                          aria-label="Urgent"
                        />
                      )}
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="muted manual-foot">
        {contacts.length} of {total} people and numbers filled in.{' '}
        <Link to="/manual/people">Fill in more</Link> and every page shows a
        call button for the right person.
      </p>
    </>
  );
}
