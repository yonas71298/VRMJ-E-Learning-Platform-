import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findUserByEmail, setSession } from '../services/api';
import './AuthPages.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      next.password = 'Password is required.';
    } else if (form.password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = findUserByEmail(form.email);
    if (!user || user.password !== form.password) {
      setSubmitError('Invalid email or password. Please sign up first if you are new.');
      return;
    }

    const session = setSession(user);
    onLogin(session);
    navigate('/');
  };

  return (
    <div className="vrmj-auth">
      <div className="vrmj-auth__bg" aria-hidden="true" />
      <div className="vrmj-auth__overlay" aria-hidden="true" />

      <div className="vrmj-auth__corner-logo">
        <img src="/img/logo.png" alt="VRMJ E Learning Platform" />
      </div>

      <div className="vrmj-auth__content">
        <div className="vrmj-login-card">
          <img
            src="/img/logo.png"
            alt="VRMJ E Learning Platform"
            className="vrmj-login-card__logo"
          />

          <h2>Welcome Back!</h2>
          <p className="vrmj-login-card__lead">
            Login to continue your learning journey
          </p>

          <form className="vrmj-form" onSubmit={handleSubmit} noValidate>
            <label className="vrmj-field">
              <span className="visually-hidden">Username / Email</span>
              <span className="vrmj-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Username / Email"
                autoComplete="email"
              />
            </label>
            {errors.email && <span className="form-error">{errors.email}</span>}

            <label className="vrmj-field">
              <span className="visually-hidden">Password</span>
              <span className="vrmj-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="vrmj-field__toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </label>
            {errors.password && <span className="form-error">{errors.password}</span>}

            <div className="vrmj-form__row">
              <label className="vrmj-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <button
                type="button"
                className="vrmj-link-btn"
                onClick={() =>
                  setSubmitError('Password reset is not available yet. Please contact support.')
                }
              >
                Forgot Password?
              </button>
            </div>

            {submitError && <p className="form-error form-error--block">{submitError}</p>}

            <button type="submit" className="vrmj-login-btn">
              Login
            </button>
          </form>

          <div className="vrmj-divider">
            <span>or continue with</span>
          </div>

          <div className="vrmj-social">
            <button type="button" className="vrmj-social__btn" aria-label="Continue with Google" title="Demo UI">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3 2.3c1.8-1.6 2.8-4 2.8-6.8 0-.7-.1-1.3-.2-1.9H12z" />
                <path fill="#34A853" d="M6.6 14.3l-.8.6-2.5 1.9C5 19.2 8.3 21 12 21c2.4 0 4.4-.8 5.9-2.1l-3-2.3c-.8.5-1.8.9-2.9.9-2.2 0-4.1-1.5-4.8-3.5z" />
                <path fill="#FBBC05" d="M3.3 7.2C2.5 8.7 2 10.3 2 12s.5 3.3 1.3 4.8l3.3-2.5C6.2 13.4 6 12.7 6 12s.2-1.4.6-2.1L3.3 7.2z" />
                <path fill="#4285F4" d="M12 6c1.3 0 2.5.5 3.4 1.3l2.6-2.6C16.4 3.3 14.4 2.5 12 2.5 8.3 2.5 5 4.3 3.3 7.2l3.3 2.5C7.9 7.5 9.8 6 12 6z" />
              </svg>
            </button>
            <button type="button" className="vrmj-social__btn" aria-label="Continue with Microsoft" title="Demo UI">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#F25022" d="M3 3h8.5v8.5H3z" />
                <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5z" />
                <path fill="#00A4EF" d="M3 12.5h8.5V21H3z" />
                <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5z" />
              </svg>
            </button>
            <button type="button" className="vrmj-social__btn" aria-label="Continue with Apple" title="Demo UI">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#111">
                <path d="M16.4 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.2-3.7zM14.3 6.5c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2z" />
              </svg>
            </button>
          </div>

          <p className="vrmj-switch">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      <footer className="vrmj-features">
        <div className="vrmj-features__item">
          <span className="vrmj-features__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 3h7l5 5v13H7z" />
              <path d="M14 3v5h5" />
            </svg>
          </span>
          <div>
            <strong>Quality Courses</strong>
            <p>Learn from experts</p>
          </div>
        </div>
        <div className="vrmj-features__item">
          <span className="vrmj-features__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12a8 8 0 0 1 14-5" />
              <path d="M18 4v3h-3" />
              <path d="M20 12a8 8 0 0 1-14 5" />
              <path d="M6 20v-3h3" />
            </svg>
          </span>
          <div>
            <strong>Flexible Learning</strong>
            <p>Study at your pace</p>
          </div>
        </div>
        <div className="vrmj-features__item">
          <span className="vrmj-features__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <div>
            <strong>Track Progress</strong>
            <p>Monitor your growth</p>
          </div>
        </div>
        <div className="vrmj-features__item">
          <span className="vrmj-features__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7z" />
            </svg>
          </span>
          <div>
            <strong>Achieve Goals</strong>
            <p>Shape your future</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
