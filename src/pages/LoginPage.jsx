import React, { useState, useEffect } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../Context/AuthContext.jsx"; 
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { currentUser, loading } = useAuth(); // Consistent naming

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/"); 
    }
  }, [currentUser, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.message);
    }
  };

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

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className="subtitle">Welcome back!</p>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: "red", fontSize: '0.8rem' }}>{error}</p>}
          {message && <p style={{ color: "green", fontSize: '0.8rem' }}>{message}</p>}

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <button onClick={handleGoogleLogin} className="google-login-btn">
          Continue with Google
        </button>

        <p className="forgot-password-link">
          <button onClick={handleForgotPassword} className="link-button">
            Forgot Password?
          </button>
        </p>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}