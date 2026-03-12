import React from "react";
// ✅ Added Link to the imports here
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// A simple Home/Shop component for now
const Home = () => {
  // ✅ Pulled 'logout' from your context so we can use it!
  const { currentUser, logout } = useAuth(); 

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Welcome to the Shop App 🛒</h1>

      {currentUser ? (

        /* WHAT LOGGED IN USERS SEE */
        <div>
          <p>You are logged in as <strong>{currentUser.email}</strong>!</p>

          {/* ✅ Functional Logout Button */}
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
            Log Out
          </button>

          {/* ADD YOUR SHOP ITEMS HERE LATER */}
        </div>

      ) : (

        /* WHAT LOGGED OUT USERS SEE */
        <div>
          <p>Please log in to start shopping.</p>

          {/* ✅ Links to take them to your beautiful new pages */}
          <div style={{ marginTop: '20px' }}>
            <Link to="/login">
              <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>

      )}
    </div>
  );
};

export default function App() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Main App Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={currentUser ? <Navigate to="/" /> : <SignUpPage />} 
        />
      </Routes>
    </Router>
  );
}