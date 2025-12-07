document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle Logic (Sidebar Style) ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        if (mobileNavContainer && mobileNavOverlay) {
            mobileNavContainer.classList.add('open');
            mobileNavOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }
    }

    function closeMenu() {
        if (mobileNavContainer && mobileNavOverlay) {
            mobileNavContainer.classList.remove('open');
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Close menu when clicking the overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- Navbar Effect (Hide on Scroll Down, Transparent at Top) ---
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 1. Handle Transparency & Logo Switch (via CSS classes)
        // This logic adds/removes the class that triggers the CSS logo swap
        if (scrollTop > 50) {
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
        }

        // 2. Handle Hide/Show behavior
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // Scrolling Down AND not at the very top -> Hide Navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling Up -> Show Navbar
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

});