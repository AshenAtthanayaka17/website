import { auth } from "./firebase-init.js";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const googleBtn = document.getElementById("googleBtn");
const guestBtn = document.getElementById("guestBtn");
const emailTab = document.getElementById("emailTab");
const mobileTab = document.getElementById("mobileTab");
const emailForm = document.getElementById("emailForm");
const mobileForm = document.getElementById("mobileForm");
const continueEmailBtn = document.getElementById("continueEmailBtn");
const continuePhoneBtn = document.getElementById("continuePhoneBtn");
const errorMsg = document.getElementById("errorMsg");

const provider = new GoogleAuthProvider();

// Google Sign In
googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "HTMLs/home.html";
        })
        .catch((error) => {
            errorMsg.textContent = error.message;
            errorMsg.style.display = "block";
        });
});

// Guest Login
guestBtn.addEventListener("click", () => {
    signInAnonymously(auth)
        .then(() => {
            window.location.href = "HTMLs/home.html";
        })
        .catch((error) => {
            errorMsg.textContent = error.message;
            errorMsg.style.display = "block";
        });
});

// Tab switching
emailTab.addEventListener("click", () => {
    emailTab.classList.add("active");
    mobileTab.classList.remove("active");
    emailForm.style.display = "block";
    mobileForm.style.display = "none";
});

mobileTab.addEventListener("click", () => {
    mobileTab.classList.add("active");
    emailTab.classList.remove("active");
    mobileForm.style.display = "block";
    emailForm.style.display = "none";
});

// Email continue (you can implement passwordless email link)
continueEmailBtn.addEventListener("click", () => {
    const email = document.getElementById("emailInput").value;
    if (!email) return;

    const actionCodeSettings = {
        url: window.location.origin + "/HTMLs/home.html",
        handleCodeInApp: true
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
            alert("Check your email for the login link!");
        })
        .catch((err) => {
            errorMsg.textContent = err.message;
            errorMsg.style.display = "block";
        });
});

// Phone (basic setup with reCAPTCHA)
let appVerifier;
continuePhoneBtn.addEventListener("click", () => {
    const phone = document.getElementById("phoneInput").value;
    if (!phone) return;

    if (!appVerifier) {
        appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible'
        });
    }

    signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            // You would normally show OTP input here
            const otp = prompt("Enter OTP");
            return confirmationResult.confirm(otp);
        })
        .then(() => {
            window.location.href = "HTMLs/home.html";
        })
        .catch((err) => {
            errorMsg.textContent = err.message;
            errorMsg.style.display = "block";
        });
});