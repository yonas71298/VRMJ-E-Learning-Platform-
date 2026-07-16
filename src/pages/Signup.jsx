import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findUserByEmail, saveUser } from '../services/api';
import './AuthPages.css';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skillsOffer: '',
    skillsWant: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) {
      next.name = 'Full name is required.';
    } else if (form.name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.';
    } else if (findUserByEmail(form.email)) {
      next.email = 'An account with this email already exists.';
    }

    if (!form.password) {
      next.password = 'Password is required.';
    } else if (form.password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    } else if (!/[A-Za-z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      next.password = 'Use letters and at least one number.';
    }

    if (!form.confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }

    if (!form.skillsOffer.trim()) {
      next.skillsOffer = 'Tell us one skill you can teach.';
    }
    if (!form.skillsWant.trim()) {
      next.skillsWant = 'Tell us one skill you want to learn.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    saveUser({
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      skillsOffer: form.skillsOffer.trim(),
      skillsWant: form.skillsWant.trim(),
      bio: '',
      createdAt: new Date().toISOString(),
    });

    setSuccess('Account created! Redirecting to login…');
    setTimeout(() => navigate('/login'), 900);
  };

  return (
    <div className="vrmj-auth">
      <div className="vrmj-auth__bg" aria-hidden="true" />
      <div className="vrmj-auth__overlay" aria-hidden="true" />

      <div className="vrmj-auth__corner-logo">
        <img src="/img/logo.png" alt="VRMJ E Learning Platform" />
      </div>

      <div className="vrmj-auth__content">
        <div className="vrmj-login-card vrmj-login-card--wide">
          <img
            src="/img/logo.png"
            alt="VRMJ E Learning Platform"
            className="vrmj-login-card__logo"
          />

          <h2>Create Account</h2>
          <p className="vrmj-login-card__lead">
            Sign up to continue your learning journey
          </p>

          <form className="vrmj-form vrmj-signup-grid" onSubmit={handleSubmit} noValidate>
            <label className="vrmj-field">
              <span className="visually-hidden">Full name</span>
              <span className="vrmj-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                autoComplete="name"
              />
            </label>
            {errors.name && <span className="form-error">{errors.name}</span>}

            <label className="vrmj-field">
              <span className="visually-hidden">Email</span>
              <span className="vrmj-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
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
                autoComplete="new-password"
              />
              <button
                type="button"
                className="vrmj-field__toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </label>
            {errors.password && <span className="form-error">{errors.password}</span>}

            <label className="vrmj-field">
              <span className="visually-hidden">Confirm password</span>
              <span className="vrmj-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                autoComplete="new-password"
              />
            </label>
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword}</span>
            )}

            <label className="vrmj-field span-2">
              <span className="visually-hidden">Skill you can offer</span>
              <input
                type="text"
                name="skillsOffer"
                value={form.skillsOffer}
                onChange={handleChange}
                placeholder="Skill you can offer"
                style={{ paddingLeft: '1rem' }}
              />
            </label>
            {errors.skillsOffer && <span className="form-error span-2">{errors.skillsOffer}</span>}

            <label className="vrmj-field span-2">
              <span className="visually-hidden">Skill you want to learn</span>
              <input
                type="text"
                name="skillsWant"
                value={form.skillsWant}
                onChange={handleChange}
                placeholder="Skill you want to learn"
                style={{ paddingLeft: '1rem' }}
              />
            </label>
            {errors.skillsWant && <span className="form-error span-2">{errors.skillsWant}</span>}

            {success && <p className="form-success span-2">{success}</p>}

            <button type="submit" className="vrmj-login-btn span-2">
              Sign Up
            </button>
          </form>

          <p className="vrmj-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
