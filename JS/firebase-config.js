// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signInAnonymously,
    signInWithPhoneNumber,
    RecaptchaVerifier
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your Firebase configuration object - REPLACE WITH YOUR ACTUAL CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyAxA4GHwsZkSd4cJMlDJB3eru20D0cGiYQ",
    authDomain: "ashenatthanayaka17.firebaseapp.com",
    projectId: "ashenatthanayaka17",
    storageBucket: "ashenatthanayaka17.firebasestorage.app",
    messagingSenderId: "670715739594",
    appId: "1:670715739594:web:ef0c6ff3608949582be333",
    measurementId: "G-RXPS00RRML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export for use in auth.js
export {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signInAnonymously,
    signInWithPhoneNumber,
    RecaptchaVerifier
};