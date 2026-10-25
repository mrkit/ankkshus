import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from './api.js';

export function Header() {
  const navigate = useNavigate();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const user = data?.user;

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header>
      <Link to="/">
        <div id="ankkshus" className="ankkshus" />
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/distillery">Distillery</NavLink>
          </li>
          <li>
            {user ? (
              <button
                type="button"
                className="link-button"
                onClick={handleLogout}
              >
                Logout {user.username}
              </button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
