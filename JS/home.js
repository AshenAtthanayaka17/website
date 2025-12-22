// Typed text effect
const texts = ["Full-Stack Developer", "UI/UX Designer", "Tech Enthusiast", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

const typedElement = document.getElementById('typed');

function type() {
    currentText = texts[textIndex];

    if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => { isDeleting = true; }, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});

// Optional: Smooth scroll for CTA
document.querySelector('.cta-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});