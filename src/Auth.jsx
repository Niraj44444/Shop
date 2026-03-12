import React, { useState } from 'react';
import { auth } from './firebase'; // Import the auth object we exported
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 1. Sign Up with Email and Password
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      alert("Account created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  // 2. Log In with Email and Password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      alert("Logged in successfully!");
    } catch (err) {
      setError("Failed to log in. Check your credentials.");
    }
  };

  // 3. Log In with Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Sign Up / Log In</h2>

      {/* Error Message Display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button onClick={handleLogin} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Log In
        </button>
        <button onClick={handleSignUp} style={{ padding: '8px 16px' }}>
          Sign Up
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleGoogleSignIn} style={{ padding: '10px 20px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;