document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. MOBILE MENU LOGIC
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        if (mobileNavContainer && mobileNavOverlay) {
            mobileNavContainer.classList.add('open');
            mobileNavOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Stop scrolling
        }
    }

    function closeMenu() {
        if (mobileNavContainer && mobileNavOverlay) {
            mobileNavContainer.classList.remove('open');
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Resume scrolling
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking any link inside it
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // ============================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 1. Handle Transparency & Logo Switch (via CSS classes)
        if (scrollTop > 50) {
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.add('navbar-transparent');
        }

        // 2. Handle Hide/Show behavior (Hide when scrolling down)
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });


    // ============================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    function reveal() {
        for (let i = 0; i < revealElements.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = revealElements[i].getBoundingClientRect().top;
            let elementVisible = 50;

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Trigger once on load


    // ============================================
    // 4. FORM SUBMISSION (EMAILJS)
    // ============================================
    const contactForm = document.getElementById('sponsorshipForm');
    const submitBtn = document.getElementById('submitBtn'); 

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop page reload

            // Change Button Text to Loading State
            const originalBtnText = submitBtn ? submitBtn.innerText : 'SUBMIT';
            if(submitBtn) {
                submitBtn.innerText = 'SENDING...';
                submitBtn.disabled = true;
            }

            // Prepare Data
            const templateParams = {
                company_name: document.getElementById('company_name').value,
                contact_person: document.getElementById('contact_person').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                tier: document.getElementById('tier').value || "Not Selected"
            };

            // Send via EmailJS
            emailjs.send('service_aiv08ko', 'template_sibyu6g', templateParams)
                .then(function() {
                    // Success
                    alert('Proposal Sent Successfully! We will contact you soon.');
                    contactForm.reset();
                    if(submitBtn) {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    }
                }, function(error) {
                    // Error
                    console.error('FAILED...', error);
                    alert('Failed to send proposal. Please try again.');
                    if(submitBtn) {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    }
                });
        });
    }

});