// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Your web app's Firebase configuration
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
export const auth = getAuth(app);