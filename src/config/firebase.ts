import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAy3FsmHtQ9Tg8EJs1IvIg13TQoEomw74M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "local-22f77.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "local-22f77",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "local-22f77.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1031471798738",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1031471798738:web:c668924bd8c04737b9900b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-72XZ8NJJ37"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);


