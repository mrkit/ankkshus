import { Link, useParams } from 'react-router-dom';
import { useGetContactsQuery } from '../../app/api.js';
import { ContactLine } from './ContactLine.jsx';
import { bySlug } from './situations.js';

export function SituationPage() {
  const { slug } = useParams();
  const situation = bySlug[slug];
  const { data: contacts = [] } = useGetContactsQuery();

  if (!situation) {
    return (
      <p className="muted">
        That page is not in the manual.{' '}
        <Link to="/manual">Back to the list</Link>.
      </p>
    );
  }

  const { title, danger, now, steps, call, after, sources } = situation;

  return (
    <article className="situation">
      <Link to="/manual" className="back-link">
        ← All situations
      </Link>
      <h1>{title}</h1>

      {danger && (
        <a className="sos" href="tel:911">
          <strong>Anyone in danger?</strong>
          <span>Call 911</span>
        </a>
      )}

      <section className="card">
        <h2>Right now</h2>
        <ol className="do-list">
          {now.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
        {steps && (
          <div className="steps-box">
            <h3>{steps.title}</h3>
            <ol>
              {steps.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Who to call</h2>
        <ul className="contact-list">
          {call.map((c) => (
            <ContactLine key={c.role} {...c} contacts={contacts} />
          ))}
        </ul>
      </section>

      {after.length > 0 && (
        <section className="card">
          <h2>After</h2>
          <ul className="do-list">
            {after.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {sources && (
        <p className="sources muted">
          Safety steps checked against:{' '}
          {sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && '; '}
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </span>
          ))}
          .
        </p>
      )}
    </article>
  );
}
