import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; // Make sure this path points to your firebase.js
import Login from './Login';
import Signup from './Signup';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // State to toggle between showing the Login or Signup component
  const [showLogin, setShowLogin] = useState(true);

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="App" style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>

      {/* IF USER IS LOGGED IN */}
      {user ? (
        <div style={{ textAlign: 'center' }}>
          <h1>Shop Dashboard</h1>
          <p>Welcome, {user.email}</p>
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
            Log Out
          </button>

          {/* Put your actual shop components here */}

        </div>
      ) : (

        /* IF USER IS NOT LOGGED IN */
        <div>
          {/* Main Toggle Buttons at the top */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <button 
              onClick={() => setShowLogin(true)} 
              style={{ flex: 1, padding: '10px', backgroundColor: showLogin ? '#ddd' : '#f9f9f9', border: '1px solid #ccc' }}>
              Log In
            </button>
            <button 
              onClick={() => setShowLogin(false)} 
              style={{ flex: 1, padding: '10px', backgroundColor: !showLogin ? '#ddd' : '#f9f9f9', border: '1px solid #ccc' }}>
              Sign Up
            </button>
          </div>

          {/* Render the correct component based on state */}
          {showLogin ? (
            <Login switchToSignup={() => setShowLogin(false)} />
          ) : (
            <Signup switchToLogin={() => setShowLogin(true)} />
          )}
        </div>

      )}
    </div>
  );
}

export default App;