// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to trigger CSS animation
                entry.target.classList.add('active');
                // Optional: Stop observing once animated if you only want it to happen once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Optional: Subtle Parallax Effect for Background Elements
    const heroTitle = document.querySelector('.hero-title');
    const circleArt = document.querySelector('.circle-art');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Subtle offset for hero title
        if (heroTitle && scrollY < window.innerHeight) {
            heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
        
        // Subtle rotation/movement for the art circle when in view
        if (circleArt) {
            const rect = circleArt.getBoundingClientRect();
            // Check if element is somewhat in the viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate position relative to center of screen
                const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                circleArt.style.transform = `translateY(${centerOffset * 0.05}px) rotate(${centerOffset * 0.02}deg)`;
            }
        }
    });

    // 3. Initial Load trigger for items already in view (in case observer misses top elements on fast load)
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});
