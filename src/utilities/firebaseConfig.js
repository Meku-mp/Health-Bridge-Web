// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (use your own credentials from the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCeGd4fqP5eaROlNYaW17UaJJaoWV_tTl8",
  authDomain: "medica-c79e8.firebaseapp.com",
  projectId: "medica-c79e8",
  storageBucket: "medica-c79e8.firebasestorage.app",
  messagingSenderId: "56859932412",
  appId: "1:56859932412:web:1d67b52f4a2f69a1b40979",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
