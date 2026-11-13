import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../app/api.js';

export function SettingsPage({ user }) {
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <>
      <div className="page-title">
        <h1>Settings</h1>
      </div>
      <div className="settings-grid">
        <section className="card">
          <h2>The manual</h2>
          <p>
            <Link to="/manual/people">My people</Link>: the names and numbers
            the manual uses for its call buttons. Both of you can edit them.
          </p>
        </section>

        <section className="card">
          <h2>The old site</h2>
          <p className="muted">
            Archived. Everything still works and nothing was deleted.
          </p>
          <ul className="archive-list">
            <li>
              <Link to="/check-in">Check-in</Link>
              <span className="muted"> · the CBT worksheets and the board</span>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/videos">Videos</Link>
            </li>
            <li>
              <a href="/luci">Luci</a>
              <span className="muted"> · the game</span>
            </li>
          </ul>
        </section>

        <section className="card">
          <h2>You</h2>
          <p>Signed in as {user.username}.</p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => logout()}
            disabled={isLoading}
          >
            Log out
          </button>
        </section>
      </div>
    </>
  );
}
