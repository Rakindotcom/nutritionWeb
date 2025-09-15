// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDy_kxjFmNNBJcxrap7OwADmXA8MyQ9Lmw",
  authDomain: "healthedu-2949c.firebaseapp.com",
  projectId: "healthedu-2949c",
  storageBucket: "healthedu-2949c.firebasestorage.app",
  messagingSenderId: "255366260478",
  appId: "1:255366260478:web:9af95b7cbec77cdc0467af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;