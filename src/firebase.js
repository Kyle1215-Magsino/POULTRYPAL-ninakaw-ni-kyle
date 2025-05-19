// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDS306zxZbCILUUD2sJmfwE-3nIsL7j5oY",
  authDomain: "poultrypal-62d9e.firebaseapp.com",
  projectId: "poultrypal-62d9e",
  storageBucket: "poultrypal-62d9e.firebasestorage.app",
  messagingSenderId: "1058482518328",
  appId: "1:1058482518328:web:3b09602aff6e73e2a6a9cd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };

