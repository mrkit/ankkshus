import { Link } from 'react-router-dom';
import { FIXED, ROLES, telHref } from './contacts.js';

// One "who to call" row: the saved person with a call button, or a prompt to
// fill the slot in.
export function ContactLine({ role, why, when, contacts }) {
  const fixed = FIXED[role];
  const saved = contacts.find((c) => c.role === role);
  const label = fixed?.label ?? ROLES[role]?.label ?? role;
  const contact = fixed ?? saved;

  return (
    <li className={`contact-line${fixed ? ' is-fixed' : ''}`}>
      <div className="contact-text">
        <span className="contact-label">
          {label}
          {when && (
            <span className="tag">
              {when === 'rent' ? 'If you rent' : 'If you own'}
            </span>
          )}
        </span>
        {contact?.name && contact.name !== contact.phone && (
          <span className="contact-name">{contact.name}</span>
        )}
        {why && <span className="contact-why">{why}</span>}
        {saved?.note && <span className="contact-note">{saved.note}</span>}
      </div>
      {contact?.phone ? (
        <a className="btn btn-primary call-btn" href={telHref(contact.phone)}>
          Call {contact.phone}
        </a>
      ) : (
        <Link className="btn btn-quiet call-btn" to={`/manual/people#${role}`}>
          Add a number
        </Link>
      )}
    </li>
  );
}
