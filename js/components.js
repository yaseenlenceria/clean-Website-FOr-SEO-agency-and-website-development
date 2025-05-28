
// Enhanced Navigation Component JavaScript
function loadComponent(selector, componentPath) {
    const element = document.querySelector(selector);
    if (element) {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                // Initialize navigation after header is loaded
                if (selector === '#global-header') {
                    initializeNavigation();
                }
            })
            .catch(error => {
                console.error('Error loading component:', error);
                element.innerHTML = '<p>Error loading component</p>';
            });
    }
}

function initializeNavigation() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            // Remove any existing event listeners
            const newNavToggle = navToggle.cloneNode(true);
            navToggle.parentNode.replaceChild(newNavToggle, navToggle);
            
            newNavToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const menu = document.getElementById('nav-menu');
                const toggle = document.getElementById('nav-toggle');
                
                if (menu && toggle) {
                    menu.classList.toggle('active');
                    toggle.classList.toggle('active');
                    
                    // Prevent body scroll when menu is open
                    if (menu.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                    } else {
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                }
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const menu = document.getElementById('nav-menu');
                    const toggle = document.getElementById('nav-toggle');
                    
                    if (menu && toggle) {
                        menu.classList.remove('active');
                        toggle.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                const menu = document.getElementById('nav-menu');
                const toggle = document.getElementById('nav-toggle');
                
                if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const menu = document.getElementById('nav-menu');
                    const toggle = document.getElementById('nav-toggle');
                    
                    if (menu && toggle && menu.classList.contains('active')) {
                        menu.classList.remove('active');
                        toggle.classList.remove('active');
                        document.body.style.overflow = '';
                        document.body.style.position = '';
                        document.body.style.width = '';
                    }
                }
            });
        }
    }, 100);

    // Navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateNavbar() {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Dropdown functionality for desktop
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        let timeoutId;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('#global-header', 'components/header.html');
    loadComponent('#global-footer', 'components/footer.html');
});

// Export functions for global access
window.loadComponent = loadComponent;
window.initializeNavigation = initializeNavigation;
