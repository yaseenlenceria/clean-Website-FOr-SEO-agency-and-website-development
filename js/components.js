
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

        // Mobile menu toggle functionality
        if (navToggle && navMenu) {
            // Clear any existing event listeners
            navToggle.replaceWith(navToggle.cloneNode(true));
            const newNavToggle = document.getElementById('nav-toggle');
            
            newNavToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const currentMenu = document.getElementById('nav-menu');
                const currentToggle = document.getElementById('nav-toggle');
                
                if (currentMenu && currentToggle) {
                    const isActive = currentMenu.classList.contains('active');
                    
                    if (isActive) {
                        closeMenu();
                    } else {
                        openMenu();
                    }
                }
            });

            // Function to open menu
            function openMenu() {
                const menu = document.getElementById('nav-menu');
                const toggle = document.getElementById('nav-toggle');
                
                if (menu && toggle) {
                    menu.classList.add('active');
                    toggle.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                    document.body.style.top = `-${window.scrollY}px`;
                }
            }

            // Function to close menu
            function closeMenu() {
                const menu = document.getElementById('nav-menu');
                const toggle = document.getElementById('nav-toggle');
                
                if (menu && toggle) {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    
                    const scrollY = document.body.style.top;
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }

            // Close mobile menu when clicking on a link (but not dropdowns)
            document.addEventListener('click', function(e) {
                const clickedLink = e.target.closest('.nav-link');
                const clickedDropdown = e.target.closest('.nav-dropdown');
                const menu = document.getElementById('nav-menu');
                const toggle = document.getElementById('nav-toggle');
                
                // Close menu if clicking on a direct nav link (not dropdown parent)
                if (clickedLink && !clickedDropdown && menu && menu.classList.contains('active')) {
                    setTimeout(closeMenu, 150); // Small delay for better UX
                }
                
                // Close menu if clicking outside navigation
                if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
                    closeMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const menu = document.getElementById('nav-menu');
                    if (menu && menu.classList.contains('active')) {
                        closeMenu();
                    }
                }
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 968) {
                    closeMenu();
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
