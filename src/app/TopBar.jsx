import { Link, NavLink } from 'react-router-dom';
import { DragonMark } from '../dragons/dragons.jsx';

export function TopBar() {
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
              <NavLink to="/manual">Manual</NavLink>
            </li>
            <li>
              <NavLink to="/fear">Fear of death</NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className="nav-settings"
                aria-label="Settings"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 0 0 1.7 1l.3 2.5h4l.4-2.5a7.4 7.4 0 0 0 1.7-1l2.4 1 2-3.4zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
                    transform="translate(-1 0)"
                  />
                </svg>
                <span className="nav-settings-label">Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
