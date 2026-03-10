import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../Context/AuthContext.jsx';
import { auth } from '../firebase';

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Theme state logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand-logo">
        Insight Reader
      </Link>

      <div className="navbar-actions">
        {/* Link to Home/Contact (since Contact is on the Home page in your App.jsx) */}
        <Link to="/" className="nav-link">
          Home
        </Link>

        {currentUser ? (
          <>
            {/* Removed non-existent links: Bookmark, History, Dashboard, All Books, User */}
            <button onClick={handleLogout} className="btn-primary-nav">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup">
              <button className="btn-primary-nav">Sign Up</button>
            </Link>
          </>
        )}

        {/* 🌗 Theme Toggle remains as it is purely CSS/Logic based */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle dark mode"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}