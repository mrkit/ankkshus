import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetContactsQuery, useSaveContactMutation } from '../../app/api.js';
import { FIXED, ROLE_GROUPS, telHref } from './contacts.js';

function RoleForm({ spec, saved }) {
  const [form, setForm] = useState({ name: '', phone: '', note: '' });
  const [status, setStatus] = useState('');
  const [save, { isLoading }] = useSaveContactMutation();

  useEffect(() => {
    setForm({
      name: saved?.name ?? '',
      phone: saved?.phone ?? '',
      note: saved?.note ?? '',
    });
  }, [saved]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setStatus('');
  };

  async function onSubmit(event) {
    event.preventDefault();
    const result = await save({ role: spec.role, ...form });
    setStatus(result.error ? 'Could not save. Try again.' : 'Saved.');
  }

  const id = `c-${spec.role}`;
  return (
    <form className="role-form" id={spec.role} onSubmit={onSubmit}>
      <div className="role-head">
        <h3>{spec.label}</h3>
        {spec.hint && <p className="muted">{spec.hint}</p>}
      </div>
      <div className="role-fields">
        {!spec.noteOnly && (
          <>
            <label className="field">
              <span>Name</span>
              <input
                className="input"
                id={`${id}-name`}
                value={form.name}
                onChange={set('name')}
                maxLength={120}
                autoComplete="off"
                data-1p-ignore
              />
            </label>
            <label className="field">
              <span>Phone</span>
              <input
                className="input"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                maxLength={40}
                autoComplete="off"
                data-1p-ignore
              />
            </label>
          </>
        )}
        <label className="field role-note">
          <span>Note</span>
          <input
            className="input"
            value={form.note}
            onChange={set('note')}
            maxLength={500}
            autoComplete="off"
          />
        </label>
      </div>
      <div className="row">
        <button type="submit" className="btn btn-quiet" disabled={isLoading}>
          Save
        </button>
        {saved?.phone && (
          <a href={telHref(saved.phone)} className="btn-link">
            Test call
          </a>
        )}
        <span className="muted" role="status">
          {status}
        </span>
      </div>
    </form>
  );
}

export function PeoplePage() {
  const { data: contacts = [], isLoading } = useGetContactsQuery();
  const { hash } = useLocation();

  // "Add a number" links land on the right slot with its first box focused.
  useEffect(() => {
    if (isLoading || !hash) return;
    const form = document.getElementById(hash.slice(1));
    form?.scrollIntoView({ block: 'center' });
    form?.querySelector('input')?.focus({ preventScroll: true });
  }, [hash, isLoading]);

  return (
    <>
      <Link to="/manual" className="back-link">
        ← The manual
      </Link>
      <div className="page-title">
        <h1>My people</h1>
      </div>
      <p className="muted lede">
        Fill these in once. Each page of the manual then shows a call button for
        the right person. Both of you can edit this list. Leave a slot blank and
        save to clear it.
      </p>

      <section className="card">
        <h2>Always the same</h2>
        <ul className="fixed-list">
          {Object.values(FIXED).map((f) => (
            <li key={f.phone}>
              <a href={telHref(f.phone)}>
                <strong>{f.phone}</strong> {f.label}
              </a>
              <span className="muted"> {f.hint}</span>
            </li>
          ))}
        </ul>
      </section>

      {isLoading ? (
        <p className="muted">Loading…</p>
      ) : (
        ROLE_GROUPS.map((group) => (
          <section key={group.title} className="card people-group">
            <h2>{group.title}</h2>
            {group.roles.map((spec) => (
              <RoleForm
                key={spec.role}
                spec={spec}
                saved={contacts.find((c) => c.role === spec.role)}
              />
            ))}
          </section>
        ))
      )}
    </>
  );
}
