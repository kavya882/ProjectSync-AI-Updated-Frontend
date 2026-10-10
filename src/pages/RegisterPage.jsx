import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const studentIdPattern = /^[A-Za-z0-9._-]{4,20}$/;

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('STUDENT');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanStudentId = studentId.trim();

    if (cleanName.length < 2 || !/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(cleanName)) {
      return 'Please enter a valid full name.';
    }

    if (!emailPattern.test(cleanEmail)) {
      return 'Please enter a valid email address, for example name@example.com.';
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      return 'Password must contain at least one letter and one number.';
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
      return 'Password must contain at least one special character.';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    if (role === 'STUDENT') {
      if (!studentIdPattern.test(cleanStudentId)) {
        return 'Please enter a valid college roll number';
      }
    } else if (department.trim().length < 2) {
      return 'Please enter your department.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const newUser = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        studentId: studentId.trim(),
        department: department.trim()
      });

      if (newUser.role === 'ADMIN' || newUser.role === 'FACULTY') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: 'A letter', valid: /[A-Za-z]/.test(password) },
    { label: 'A number', valid: /[0-9]/.test(password) },
    { label: 'A special character', valid: /[!@#$%^&*(),.?":{}|<>_\-]/.test(password) }
  ];

  return (
    <div className="auth-page auth-page-register">
      <div className="auth-card auth-card-register">
        <div className="auth-brand">
          <div className="auth-logo"><Zap size={26} color="white" /></div>
          <h1>Create Account</h1>
          <p>Set up your ProjectSync AI account</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              className="form-input"
              required
              autoComplete="name"
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              type="email"
              className="form-input"
              required
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="field-hint">Use an email address you actually have access to.</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password</label>
            <div className="password-field">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                required
                autoComplete="new-password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="password-rules">
              {passwordChecks.map((check) => (
                <span key={check.label} className={check.valid ? 'password-rule valid' : 'password-rule'}>
                  <CheckCircle2 size={13} /> {check.label}
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm-password">Confirm Password</label>
            <div className="password-field">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input"
                required
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-role">Account Role</label>
            <select
              id="register-role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Faculty / Admin</option>
            </select>
          </div>

          {role === 'STUDENT' ? (
            <div className="form-group">
              <label className="form-label" htmlFor="register-student-id">Student ID / Roll No.</label>
              <input
                id="register-student-id"
                type="text"
                className="form-input"
                required
                autoComplete="off"
                placeholder="e.g. STU202601"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <div className="field-hint">Enter your actual college ID or roll number.</div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label" htmlFor="register-department">Department</label>
              <input
                id="register-department"
                type="text"
                className="form-input"
                required
                placeholder="e.g. Computer Science & Engineering"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            <UserPlus size={18} />
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
