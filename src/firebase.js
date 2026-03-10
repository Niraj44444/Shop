import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Included from your new project

// ✅ Dual fallback: use Vite/Replit secret if available, otherwise fallback to public key
const firebaseConfig = {
  const mySecret = process.env['VITE_FIREBASE_API_KEY'],
  authDomain: "shop-7adf4.firebaseapp.com",
  projectId: "shop-7adf4",
  storageBucket: "shop-7adf4.firebasestorage.app",
  messagingSenderId: "502364202727",
  appId: "1:502364202727:web:4c2402e9d7bdac0c41e442",
  measurementId: "G-4JGJJ8YYLX"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize & Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);