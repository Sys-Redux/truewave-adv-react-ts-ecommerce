import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhhW09aFFDkwuHihjl9Smv6ZL4iUzwypI",
  authDomain: "truewave-553ca.firebaseapp.com",
  projectId: "truewave-553ca",
  storageBucket: "truewave-553ca.firebasestorage.app",
  messagingSenderId: "825482410920",
  appId: "1:825482410920:web:801084d4e28630967f7b9d",
  measurementId: "G-E7PN4ZRQ3P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };