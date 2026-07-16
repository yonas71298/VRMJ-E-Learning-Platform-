import { NavLink, useNavigate } from 'react-router-dom';
import { clearSession } from '../services/api';
import './Navbar.css';

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    onLogout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <img src="/img/logo.png" alt="" className="navbar__logo-img" />
          <span className="navbar__brand-text">
            <span className="navbar__title">VRMJ</span>
            <span className="navbar__subtitle">E - Learning</span>
          </span>
        </NavLink>

        {user ? (
          <>
            <nav className="navbar__links" aria-label="Main">
              <NavLink to="/" end>
                Explore
              </NavLink>
              <NavLink to="/favorites">Saved</NavLink>
              <NavLink to="/profile">My Profile</NavLink>
            </nav>
            <div className="navbar__user">
              <span className="navbar__avatar" aria-hidden="true">
                {getInitials(user.name)}
              </span>
              <span className="navbar__greeting">{user.name.split(' ')[0]}</span>
              <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </>
        ) : (
          <nav className="navbar__links navbar__links--auth" aria-label="Auth">
            <NavLink to="/login">Sign in</NavLink>
            <NavLink to="/signup" className="btn btn--primary btn--sm">
              Join free
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
