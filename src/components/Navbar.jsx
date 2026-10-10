
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import { LogOut, User as UserIcon, FolderGit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { projects, activeProject, selectProject } = useProject();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-project-select">
        {user && user.role === 'STUDENT' && (
          <>
            <FolderGit2
              size={18}
              style={{ color: 'var(--primary)' }}
            />

            <span
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                fontWeight: 500
              }}
            >
              Active Project:
            </span>

            <select
              className="form-select"
              style={{
                width: 'auto',
                padding: '0.35rem 0.75rem',
                fontSize: '0.88rem',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)'
              }}
              value={activeProject ? activeProject._id : ''}
              onChange={(e) => {
                const found = projects.find(
                  (p) => p._id === e.target.value
                );
                selectProject(found || null);
              }}
            >
              {projects.length === 0 ? (
                <option value="">No Active Projects</option>
              ) : (
                projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title} ({p.team ? p.team.name : 'No Team'})
                  </option>
                ))
              )}
            </select>
          </>
        )}
      </div>

      <div className="navbar-user-info">
        {user && (
          <>
            <span className={`user-badge ${user.role.toLowerCase()}`}>
              {user.role}
            </span>

            <div
              style={{
                textAlign: 'right',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-soft)',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <UserIcon size={16} />
              </div>

              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-main)'
                }}
              >
                {user.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              title="Logout"
              style={{ padding: '0.4rem 0.6rem' }}
            >
              <LogOut size={16} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;