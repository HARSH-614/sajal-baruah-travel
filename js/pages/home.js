/**
 * Oxim - Homepage Interactivity
 * Handles scroll reveals, dynamic interactions, and carousel mechanics.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS transition
                entry.target.classList.add('active');
                // Unobserve after animating once for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial hero text animation triggers immediately
    const heroTexts = document.querySelectorAll('.hero-section .reveal-text');
    setTimeout(() => {
        heroTexts.forEach(el => el.classList.add('active'));
    }, 100);

    // Apply observer to other elements that need revealing
    const revealElements = document.querySelectorAll('.destination-card, .india-card, .package-card, .founder-grid > div');
    revealElements.forEach(el => {
        // Prepare them for reveal
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // When intersected, apply reset styles directly or via class
        const observerOverride = new IntersectionObserver((ents, obs) => {
            ents.forEach(e => {
                if(e.isIntersecting) {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                    obs.unobserve(e.target);
                }
            });
        }, observerOptions);
        
        observerOverride.observe(el);
    });

    // 2. Search Form Interception
    const searchForm = document.getElementById('main-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            // Let the form naturally GET route to destinations.html 
            // In a real SPA we might intercept e.preventDefault() here.
            const dest = document.getElementById('destination').value;
            console.log(`Routing search for: ${dest}`);
        });
    }

    // 3. Carousel Drag Support (Optional Enhancement for Desktop)
    const carousel = document.getElementById('ne-carousel');
    if(carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});
