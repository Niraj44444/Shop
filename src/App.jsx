import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// A simple Home/Shop component for now
const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Shop App</h1>
      {currentUser ? (
        <p>You are logged in as {currentUser.email}!</p>
        // ADD YOUR LOGOUT BUTTON AND SHOP ITEMS HERE
      ) : (
        <p>Please log in to start shopping.</p>
      )}
    </div>
  );
};

export default function App() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

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