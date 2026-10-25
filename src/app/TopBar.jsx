import { Link, NavLink } from 'react-router-dom';
import { DragonMark } from '../dragons/dragons.jsx';
import { useLogoutMutation } from './api.js';

export function TopBar({ user }) {
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="wordmark" aria-label="ankkshus, home">
          <DragonMark size={28} />
          ankkshus
        </Link>

        <nav aria-label="Main">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/check-in">Check-in</NavLink>
            </li>
            <li>
              <NavLink to="/notes">Notes</NavLink>
            </li>
            <li>
              <NavLink to="/videos">Videos</NavLink>
            </li>
            <li>
              <a href="/luci">Luci</a>
            </li>
          </ul>
        </nav>

        <span className="who">
          {user.username}
          <span aria-hidden="true">·</span>
          <button
            type="button"
            className="btn-link"
            onClick={() => logout()}
            disabled={isLoading}
          >
            Log out
          </button>
        </span>
      </div>
    </header>
  );
}
