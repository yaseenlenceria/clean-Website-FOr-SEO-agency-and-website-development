
// Global Components Loader
document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    loadHeaderComponent();
    
    // Load Footer
    loadFooterComponent();
});

// Load Header Component
function loadHeaderComponent() {
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const headerContainer = document.getElementById('global-header');
            if (headerContainer) {
                headerContainer.innerHTML = data;
                
                // Initialize navigation after loading
                setTimeout(() => {
                    initializeNavigation();
                    setActiveNavLink();
                }, 100);
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback basic header
            const headerContainer = document.getElementById('global-header');
            if (headerContainer) {
                headerContainer.innerHTML = `
                    <nav style="background: #1a1a1a; padding: 1rem; position: fixed; top: 0; left: 0; right: 0; z-index: 1000;">
                        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                            <a href="index.html" style="color: #3b82f6; font-weight: bold; text-decoration: none;">OutsourceSU</a>
                            <div style="display: flex; gap: 2rem;">
                                <a href="index.html" style="color: white; text-decoration: none;">Home</a>
                                <a href="services.html" style="color: white; text-decoration: none;">Services</a>
                                <a href="about.html" style="color: white; text-decoration: none;">About</a>
                                <a href="contact.html" style="color: white; text-decoration: none;">Contact</a>
                            </div>
                        </div>
                    </nav>
                `;
            }
        });
}

// Load Footer Component
function loadFooterComponent() {
    fetch('components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const footerContainer = document.getElementById('global-footer');
            if (footerContainer) {
                footerContainer.innerHTML = data;
                initializeFooter();
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback basic footer
            const footerContainer = document.getElementById('global-footer');
            if (footerContainer) {
                footerContainer.innerHTML = `
                    <footer style="background: #1a1a1a; color: white; padding: 2rem; text-align: center;">
                        <p>&copy; 2024 OutsourceSU. All rights reserved.</p>
                    </footer>
                `;
            }
        });
}

// Initialize Navigation Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                closeNav();
            } else {
                openNav();
            }
        });
    }

    // Mobile overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            closeNav();
        });
    }

    // Close mobile menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-link-modern');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's a dropdown trigger
            if (!link.classList.contains('dropdown-trigger')) {
                closeNav();
            }
        });
    });

    // Handle dropdown triggers on mobile
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = trigger.parentElement.querySelector('.dropdown-menu-modern');
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });

    // Navbar scroll effect
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                navbar.style.transform = currentScroll > lastScroll && currentScroll > 200 ? 'translateY(-100%)' : 'translateY(0)';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Close navigation on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });

    // Close navigation on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeNav();
        }
    });

    function openNav() {
        if (navMenu && navToggle && mobileOverlay) {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeNav() {
        if (navMenu && navToggle && mobileOverlay) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Initialize Footer Functionality
function initializeFooter() {
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend
            console.log('Newsletter signup:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Social links tracking
    const socialLinks = document.querySelectorAll('.social-links-modern a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track social media clicks for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'event_category': 'social',
                    'event_label': this.getAttribute('aria-label')
                });
            }
        });
    });
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link-modern');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Utility function to check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Export functions for external use
window.OutsourceSUComponents = {
    loadHeader: loadHeaderComponent,
    loadFooter: loadFooterComponent,
    initNav: initializeNavigation,
    setActiveLink: setActiveNavLink,
    isMobile: isMobile
};
