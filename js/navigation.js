/**
 * Oxim - Navigation Interactions
 * Handles scroll detection for glassmorphism navbar and mobile menus.
 */
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle logic will be expanded here
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    mobileBtn.addEventListener('click', () => {
        // Toggle mobile menu class (UI to be built in phase 2)
        console.log('Mobile menu triggered - Requires Phase 2 Expansion');
    });
});
