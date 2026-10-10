
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Zap,
  LogIn,
  AlertCircle,
  Eye,
  EyeOff,
  Moon,
  Sun,
} from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('projectsync_theme') === 'dark'
  );

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem(
      'projectsync_theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();

    if (!emailPattern.test(cleanEmail)) {
      setError(
        'Please enter a valid email address, for example name@example.com.'
      );
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const loggedUser = await login(cleanEmail, password);

      if (
        loggedUser.role === 'ADMIN' ||
        loggedUser.role === 'FACULTY'
      ) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.message ||
          'Login failed. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  const colors = {
    bg: darkMode ? '#111312' : '#f7f5ef',
    card: darkMode ? '#191c1a' : '#ffffff',
    text: darkMode ? '#f4f4ef' : '#171918',
    muted: darkMode ? '#a7ada8' : '#66706a',
    border: darkMode ? '#303430' : '#deded7',
  };

  return (
    <div
      className="auth-page"
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        transition: 'background 0.3s ease, color 0.3s ease',
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={() => setDarkMode((current) => !current)}
        aria-label="Toggle dark/light theme"
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: `1px solid ${colors.border}`,
          background: colors.card,
          color: colors.text,
          cursor: 'pointer',
        }}
      >
        {darkMode ? <Sun size={19} /> : <Moon size={19} />}
      </button>

      <div
        className="auth-card"
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="auth-brand">
          <div className="auth-logo">
            <Zap size={26} color="white" />
          </div>

          <h1 style={{ color: colors.text }}>Welcome Back</h1>

          <p style={{ color: colors.muted }}>
            Sign in to continue to ProjectSync AI
          </p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label
              className="form-label"
              htmlFor="login-email"
              style={{ color: colors.text }}
            >
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              className="form-input"
              required
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: colors.bg,
                color: colors.text,
                borderColor: colors.border,
              }}
            />
          </div>

          <div className="form-group">
            <label
              className="form-label"
              htmlFor="login-password"
              style={{ color: colors.text }}
            >
              Password
            </label>

            <div className="password-field">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: colors.bg,
                  color: colors.text,
                  borderColor: colors.border,
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
                style={{ color: colors.text }}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            <LogIn size={18} />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer" style={{ color: colors.muted }}>
          Don't have an account?{' '}
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;