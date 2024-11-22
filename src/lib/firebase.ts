import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBcV2hUdwnfYZrt37R4B63GS6lUi6nUvho",
  authDomain: "moody-e1f4b.firebaseapp.com",
  projectId: "moody-e1f4b",
  storageBucket: "moody-e1f4b.firebasestorage.app",
  messagingSenderId: "695406885883",
  appId: "1:695406885883:web:d19d809919a0398e30a95e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);