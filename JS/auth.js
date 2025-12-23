// auth.js
import {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signInAnonymously,
    signInWithPhoneNumber,
    RecaptchaVerifier
} from "./firebase-config.js";

// DOM Elements
const googleBtn = document.getElementById("google-signin-btn");
const emailForm = document.getElementById("email-form");
const phoneBtn = document.getElementById("phone-signin-btn");
const guestBtn = document.getElementById("guest-signin-btn");
const forgotPasswordLink = document.getElementById("forgot-password");
const errorDiv = document.getElementById("auth-error");

const phoneInput = document.getElementById("phone-input");
const verificationSection = document.getElementById("verification-section");
const codeInput = document.getElementById("code-input");
const confirmCodeBtn = document.getElementById("confirm-code-btn");

let confirmationResult; // To store phone auth confirmation

// Utility: Show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}

// Utility: Hide error
function hideError() {
    errorDiv.classList.add("hidden");
}

// Utility: Redirect on success
function onAuthSuccess() {
    // Optional: Store auth state in localStorage for simple client-side check
    localStorage.setItem("authenticated", "true");
    window.location.href = "HTMLs/home.html";
}

// Tab Switching Logic
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
        hideError();
    });
});

// Google Sign-In
googleBtn.addEventListener("click", () => {
    hideError();
    signInWithPopup(auth, googleProvider)
        .then(() => onAuthSuccess())
        .catch((error) => {
            showError(error.message || "Google sign-in failed.");
        });
});

// Email/Password Sign-In
emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideError();
    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => onAuthSuccess())
        .catch((error) => {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                showError("Invalid email or password.");
            } else {
                showError(error.message);
            }
        });
});

// Custom Forgot Password Message
forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    showError("Contact admin via WhatsApp/SMS at +44 7418 315820.");
});

// Phone Authentication
phoneBtn.addEventListener("click", () => {
    hideError();
    const phoneNumber = phoneInput.value.trim();
    if (!phoneNumber) {
        showError("Please enter a valid phone number.");
        return;
    }

    // Initialize reCAPTCHA (invisible)
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
            size: "invisible",
            callback: () => { }
        }, auth);
    }

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
        .then((result) => {
            confirmationResult = result;
            verificationSection.classList.remove("hidden");
            showError("Verification code sent!");
        })
        .catch((error) => {
            showError(error.message || "Failed to send code.");
            window.recaptchaVerifier.render().then((widgetId) => {
                grecaptcha.reset(widgetId);
            });
        });
});

// Confirm Verification Code
confirmCodeBtn.addEventListener("click", () => {
    hideError();
    const code = codeInput.value.trim();
    if (!code || !confirmationResult) {
        showError("Invalid code.");
        return;
    }

    confirmationResult.confirm(code)
        .then(() => onAuthSuccess())
        .catch((error) => {
            showError("Invalid or expired code.");
        });
});

// Guest Sign-In
guestBtn.addEventListener("click", () => {
    hideError();
    signInAnonymously(auth)
        .then(() => onAuthSuccess())
        .catch((error) => {
            showError(error.message || "Guest sign-in failed.");
        });
});

// Optional: Check auth state on load (prevents direct access to protected pages)
auth.onAuthStateChanged((user) => {
    if (user && window.location.pathname !== "/HTMLs/home.html") {
        // If already logged in and not on home, redirect
        onAuthSuccess();
    }
});