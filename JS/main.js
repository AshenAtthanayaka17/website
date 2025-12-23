// main.js - Common functionality across all pages

import { auth } from "./firebase-config.js";

// ========================
// Page Loader
// ========================
const pageLoader = document.getElementById("page-loader");

function hideLoader() {
    if (pageLoader) {
        pageLoader.classList.add("hidden");
    }
}

// Hide loader after everything is loaded
window.addEventListener("load", () => {
    setTimeout(hideLoader, 800); // Small delay for smooth effect
});

// ========================
// Realtime UTC Clock (Navbar)
// ========================
const utcClock = document.getElementById("utc-clock");

function updateUTCClock() {
    if (!utcClock) return;
    const now = new Date();
    const utcString = now.toUTCString().split(" ")[4]; // HH:MM:SS
    utcClock.textContent = `UTC ${utcString}`;
}

if (utcClock) {
    updateUTCClock();
    setInterval(updateUTCClock, 1000);
}

// ========================
// Sticky Navbar Active Link Highlight
// ========================
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        link.classList.remove("active");
        // Match exact or folder-based (e.g., /HTMLs/home.html → Home)
        if (link.getAttribute("href") === currentPath.split("/").pop() ||
            (currentPath.includes(link.getAttribute("href")) && link.getAttribute("href") !== "#")) {
            link.classList.add("active");
        }
    });
}

if (navLinks.length > 0) {
    setActiveNavLink();
}

// ========================
// Animated Gears Background (Canvas)
// ========================
const gearCanvas = document.getElementById("gear-bg");

if (gearCanvas) {
    const ctx = gearCanvas.getContext("2d");
    gearCanvas.width = window.innerWidth;
    gearCanvas.height = window.innerHeight;

    // Simple gear drawing function
    function drawGear(x, y, radius, teeth = 12, rotation = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = "rgba(100, 255, 218, 0.05)";
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        // Teeth
        ctx.strokeStyle = "#64ffda";
        ctx.lineWidth = 2;
        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(radius * Math.cos(angle), radius * Math.sin(angle));
            ctx.lineTo((radius + 15) * Math.cos(angle), (radius + 15) * Math.sin(angle));
            ctx.stroke();
        }
        ctx.restore();
    }

    // Gear positions and speeds
    const gears = [
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.2, radius: 60, speed: 0.005 },
        { x: window.innerWidth * 0.85, y: window.innerHeight * 0.3, radius: 80, speed: -0.008 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7, radius: 50, speed: 0.01 },
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.8, radius: 70, speed: -0.006 }
    ];

    let rotation = 0;

    function animateGears() {
        ctx.clearRect(0, 0, gearCanvas.width, gearCanvas.height);
        gears.forEach((gear, i) => {
            drawGear(gear.x, gear.y, gear.radius, 14, rotation * (i % 2 === 0 ? 1 : -1) * gear.speed * 100);
        });
        rotation += 0.01;
        requestAnimationFrame(animateGears);
    }

    animateGears();

    // Resize handler
    window.addEventListener("resize", () => {
        gearCanvas.width = window.innerWidth;
        gearCanvas.height = window.innerHeight;
        gears[0].x = window.innerWidth * 0.1;
        gears[1].x = window.innerWidth * 0.85;
        gears[2].x = window.innerWidth * 0.3;
        gears[3].x = window.innerWidth * 0.7;
    });
}

// ========================
// Seasonal Effect: Winter Snow Particles (Default)
// ========================
const seasonalOverlay = document.getElementById("seasonal-overlay");

function createSnowParticle() {
    if (!seasonalOverlay) return;

    const particle = document.createElement("div");
    particle.classList.add("snow-particle");

    // Random size, position, duration, delay
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.5;

    seasonalOverlay.appendChild(particle);

    // Remove after animation ends to prevent DOM bloat
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create 50 snow particles on load (Winter default)
if (seasonalOverlay) {
    for (let i = 0; i < 50; i++) {
        createSnowParticle();
    }
    // Continuously add new ones
    setInterval(createSnowParticle, 600);
}

// ========================
// Christmas Countdown Teaser Update (Dec 23, 2025)
// ========================
const countdownElement = document.getElementById("countdown");

if (countdownElement) {
    const today = new Date("2025-12-23");
    const christmas = new Date("2025-12-25");
    const diffDays = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        countdownElement.textContent = diffDays;
    } else if (diffDays === 0) {
        countdownElement.textContent = "TODAY!";
        countdownElement.style.animation = "pulse 1s infinite";
    } else {
        countdownElement.textContent = "MERRY CHRISTMAS!";
        countdownElement.style.color = "#ff6b6b";
    }
}

// ========================
// Simple Auth Check (Prevent direct access to protected pages)
// ========================
auth.onAuthStateChanged((user) => {
    const isLoginPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
    if (!user && !isLoginPage) {
        // Redirect to login if not authenticated and not on login page
        window.location.href = "../index.html";
    } else if (user && isLoginPage) {
        // Redirect to home if already logged in on login page
        window.location.href = "HTMLs/home.html";
    }
});