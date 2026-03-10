import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importing Components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Contact from './components/Contact';

// Importing Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* The Navbar usually stays at the top of every page */}
        <Navbar />

        <Routes>
          {/* Home Route: Displays Header and Contact components */}
          <Route path="/" element={
            <>
              <Header />
              <div className="container">
                <h1>Welcome to our Shop</h1>
                <Contact />
              </div>
            </>
          } />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* You can add a specific route for Contact if you prefer it as a separate page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;