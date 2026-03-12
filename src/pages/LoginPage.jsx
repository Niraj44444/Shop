// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../context/AuthContext"; 
import "./LoginPage.css"; // Make sure to create this CSS file!

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { currentUser, loading } = useAuth(); // Changed 'user' to 'currentUser' to match your AuthContext

  // 🔁 Redirect if user already logged in
  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/"); // Send logged-in users to the home/shop page
    }
  }, [currentUser, loading, navigate]);

  // 🔐 Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔑 Google login
  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔁 Forgot password
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className="subtitle">Welcome back to the Shop!</p>

          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: "red", fontSize: '14px' }}>{error}</p>}
          {message && <p style={{ color: "green", fontSize: '14px' }}>{message}</p>}

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <button onClick={handleGoogleLogin} className="google-login-btn">
          Continue with Google
        </button>

        <p className="forgot-password-link">
          <button onClick={handleForgotPassword} className="link-button" style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>
            Forgot Password?
          </button>
        </p>

        <p className="signup-link">
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}