// Simple scroll animation example
document.addEventListener('scroll', () => {
    document.querySelectorAll('.glass').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});