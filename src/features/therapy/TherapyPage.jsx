import { Link } from 'react-router-dom';
import { useGetEntriesQuery } from '../../app/api.js';
import { SECTIONS } from './course.js';

export function TherapyPage() {
  const { data: entries = [] } = useGetEntriesQuery();
  const done = new Set(entries.map((e) => e.step));

  return (
    <div className="therapy">
      <header className="page-head">
        <h1>Therapy</h1>
        <p className="lede">
          The CBT course, sections 5 to 8. Each section has its video, a
          question before you watch, one after, a short practice, and the
          worksheets, which you can fill in here or download.
        </p>
      </header>

      <ol className="section-list">
        {SECTIONS.map((s) => (
          <li key={s.n}>
            <Link to={`/therapy/${s.n}`} className="section-row">
              <span className="section-num">{s.n}</span>
              <span className="section-title">{s.title}</span>
              <span className="section-state">
                {done.has(`therapy-${s.n}`) ? 'Notes saved' : 'Not started'}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="muted therapy-foot">
        Sections 1 to 4 and the Burns checklist are in{' '}
        <Link to="/check-in">Check-in</Link>, under Settings.
      </p>
    </div>
  );
}
