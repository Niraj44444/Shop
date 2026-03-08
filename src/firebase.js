// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Import Auth and Firestore to use in your app
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (Correct Shop Project!)
const firebaseConfig = {
  apiKey: "AIzaSyAHFnlzr7xJPWCsXMhztX1eIk19P56WEfU",
  authDomain: "shop-b835b.firebaseapp.com",
  projectId: "shop-b835b",
  storageBucket: "shop-b835b.firebasestorage.app",
  messagingSenderId: "23147409113",
  appId: "1:23147409113:web:c1e031d8991ce2f12598c8",
  measurementId: "G-LE9ZL7NGYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (Optional, but fine to leave in)
export const analytics = getAnalytics(app);

// Initialize and export Firebase services (This is the important part!)
export const auth = getAuth(app);
export const db = getFirestore(app);