import React, { useContext, createContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // Import from your new firebase.js

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Sign Up Function
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // 2. Log In Function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 3. Google Sign In/Sign Up (Firebase handles both with the same function)
  function googleSignIn() {
    return signInWithPopup(auth, googleProvider);
  }

  // 4. Log Out Function
  function logout() {
    return signOut(auth);
  }

  // Listen for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup
  }, []);

  // Make all these functions available to the rest of the app
  const value = {
    currentUser,
    signup,
    login,
    googleSignIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}