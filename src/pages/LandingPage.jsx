
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Sun, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('projectsync_theme') === 'dark'
  );

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('projectsync_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const colors = {
    bg: darkMode ? '#111312' : '#f7f5ef',
    text: darkMode ? '#f5f5f2' : '#171918',
    muted: darkMode ? '#a7ada8' : '#66706a',
    border: darkMode ? '#2d322f' : '#deded7',
    accent: '#718878',
    accentBg: darkMode ? '#263229' : '#e8eee9',
    button: darkMode ? '#f5f5f2' : '#171918',
    buttonText: darkMode ? '#171918' : '#ffffff',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        color: colors.text,
        transition: 'all 0.3s ease',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <header
        style={{
          height: '76px',
          padding: '0 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '18px', fontWeight: 700 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: colors.button,
              color: colors.buttonText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
            }}
          >
            P
          </div>
          ProjectSync
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={() => setDarkMode((current) => !current)}
            aria-label="Toggle theme"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: `1px solid ${colors.border}`,
              background: 'transparent',
              color: colors.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link to="/login" style={{ color: colors.text, textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
            Sign In
          </Link>

          <Link
            to="/register"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              background: colors.button,
              color: colors.buttonText,
              padding: '13px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Get Started <ArrowRight size={17} />
          </Link>
        </div>
      </header>

      <main
        style={{
          minHeight: 'calc(100vh - 76px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 24px',
        }}
      >
        <div style={{ maxWidth: '900px', width: '100%' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              padding: '10px 17px',
              borderRadius: '30px',
              background: colors.accentBg,
              color: colors.accent,
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.09em',
              marginBottom: '30px',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: colors.accent }} />
            STUDENT PROJECT COLLABORATION
          </div>

          <h1 style={{ margin: 0, fontSize: 'clamp(58px, 9vw, 110px)', lineHeight: '0.92', letterSpacing: '-0.06em', fontWeight: 500 }}>
            <span style={{ display: 'block', color: colors.text }}>Make every</span>
            <span style={{ display: 'block', color: colors.accent, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 500 }}>
              contribution
            </span>
            <span style={{ display: 'block', color: colors.accent, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 500 }}>
              count.
            </span>
          </h1>

          <p style={{ maxWidth: '600px', margin: '34px auto 30px', color: colors.muted, fontSize: '17px', lineHeight: '1.7' }}>
            ProjectSync helps student teams organize projects, track
            contributions, manage tasks, and understand project progress —
            all in one place.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '13px', flexWrap: 'wrap' }}>
            <Link
              to="/register"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: colors.button,
                color: colors.buttonText,
                padding: '15px 23px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              Get Started <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: `1px solid ${colors.border}`,
                color: colors.text,
                padding: '14px 23px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              Sign In
            </Link>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: colors.muted, fontSize: '13px' }}>
            <CheckCircle2 size={16} color={colors.accent} />
            Built for academic project teams
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;