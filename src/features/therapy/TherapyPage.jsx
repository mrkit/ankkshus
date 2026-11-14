import { Link } from 'react-router-dom';
import { useGetEntriesQuery, useGetRecordsQuery } from '../../app/api.js';
import { SECTIONS } from './course.js';

export function TherapyPage() {
  const { data: entries = [] } = useGetEntriesQuery();
  const done = new Set(entries.map((e) => e.step));
  const { data: records = [] } = useGetRecordsQuery();

  return (
    <div className="therapy">
      <header className="page-head">
        <h1>Therapy</h1>
        <p className="lede">
          The CBT course, from the introduction to section 8. Each section has
          its video, a question before you watch, one after, a short practice,
          and the worksheets, which you can fill in here or download.
        </p>
      </header>

      <ol className="section-list">
        {SECTIONS.map((s) => (
          <li key={s.n}>
            <Link to={`/therapy/${s.n}`} className="section-row">
              <span className="section-num">{s.n === 0 ? '·' : s.n}</span>
              <span className="section-title">{s.title}</span>
              <span className="section-state">
                {done.has(`therapy-${s.n}`) ? 'Notes saved' : 'Not started'}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {records.length > 0 && (
        <section className="panel records">
          <h2>Background</h2>
          <p className="muted">Earlier documents, kept here for reference.</p>
          <ul className="sheet-list">
            {records.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="muted therapy-foot">
        The Burns checklist and every worksheet's history are in{' '}
        <Link to="/check-in">Check-in</Link>, under Settings.
      </p>
    </div>
  );
}
