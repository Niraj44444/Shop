import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // If successful, Firebase automatically logs the user in.
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create an Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSignUp}>
        <div>
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Create Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Sign Up
        </button>
      </form>

      <button onClick={handleGoogleSignIn} style={{ width: '100%', padding: '10px', backgroundColor: '#4285F4', color: 'white', border: 'none', marginBottom: '15px' }}>
        Sign up with Google
      </button>

      <p>Already have an account? <button onClick={switchToLogin} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>Login here</button></p>
    </div>
  );
};

export default Signup;