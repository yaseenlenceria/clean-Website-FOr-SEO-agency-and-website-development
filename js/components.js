
// Enhanced Global Navigation System
let navigationState = {
    isInitialized: false,
    isMobileMenuOpen: false,
    activeDropdown: null
};

// Component loading state
let componentsLoaded = {
    header: false,
    footer: false
};

// Enhanced Header Loading
function loadHeader() {
    const headerElement = document.getElementById('global-header');
    if (!headerElement) return;

    const isInSubdirectory = window.location.pathname.includes('/blog/');
    const headerPath = isInSubdirectory ? '../components/header.html' : 'components/header.html';

    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(data => {
            headerElement.innerHTML = data;
            componentsLoaded.header = true;
            
            // Initialize navigation after header loads
            setTimeout(() => {
                if (!navigationState.isInitialized) {
                    initializeProfessionalNavigation();
                }
            }, 100);
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback navigation
            headerElement.innerHTML = createFallbackNavigation();
        });
}

// Enhanced Footer Loading
function loadFooter() {
    const footerElement = document.getElementById('global-footer');
    if (!footerElement) return;

    const isInSubdirectory = window.location.pathname.includes('/blog/');
    const footerPath = isInSubdirectory ? '../components/footer.html' : 'components/footer.html';

    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(data => {
            footerElement.innerHTML = data;
            componentsLoaded.footer = true;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            footerElement.innerHTML = createFallbackFooter();
        });
}

// Professional Navigation Initialization
function initializeProfessionalNavigation() {
    if (navigationState.isInitialized) return;
    
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('nav-menu-mobile');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.getElementById('mobile-close');
    
    if (!navToggle || !mobileMenu) {
        console.warn('Navigation elements not found');
        return;
    }

    console.log('Initializing professional navigation...');

    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Mobile close button
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    // Mobile overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Mobile dropdown toggles
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileDropdown(this);
        });
    });

    // Desktop dropdown functionality
    const desktopDropdowns = document.querySelectorAll('.nav-dropdown-desktop');
    desktopDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu-desktop');
        
        if (trigger && menu) {
            dropdown.addEventListener('mouseenter', () => showDesktopDropdown(dropdown));
            dropdown.addEventListener('mouseleave', () => hideDesktopDropdown(dropdown));
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navigationState.isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navigationState.isMobileMenuOpen) {
            closeMobileMenu();
        }
    });

    navigationState.isInitialized = true;
    console.log('Professional navigation initialized successfully');
}

// Mobile Menu Functions
function toggleMobileMenu() {
    if (navigationState.isMobileMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('nav-menu-mobile');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const navToggle = document.getElementById('nav-toggle');
    
    if (mobileMenu && mobileOverlay && navToggle) {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        navToggle.classList.add('active');
        document.body.classList.add('mobile-menu-open');
        navigationState.isMobileMenuOpen = true;
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('nav-menu-mobile');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const navToggle = document.getElementById('nav-toggle');
    
    if (mobileMenu && mobileOverlay && navToggle) {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        navigationState.isMobileMenuOpen = false;
        
        // Close all mobile dropdowns
        const openDropdowns = document.querySelectorAll('.mobile-dropdown.active');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Mobile Dropdown Functions
function toggleMobileDropdown(toggle) {
    const dropdown = toggle.closest('.mobile-dropdown');
    const isActive = dropdown.classList.contains('active');
    
    // Close all other mobile dropdowns
    const allDropdowns = document.querySelectorAll('.mobile-dropdown');
    allDropdowns.forEach(dd => {
        if (dd !== dropdown) {
            dd.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('active', !isActive);
}

// Desktop Dropdown Functions
function showDesktopDropdown(dropdown) {
    if (navigationState.activeDropdown && navigationState.activeDropdown !== dropdown) {
        hideDesktopDropdown(navigationState.activeDropdown);
    }
    
    dropdown.classList.add('active');
    navigationState.activeDropdown = dropdown;
}

function hideDesktopDropdown(dropdown) {
    dropdown.classList.remove('active');
    if (navigationState.activeDropdown === dropdown) {
        navigationState.activeDropdown = null;
    }
}

// Fallback Functions
function createFallbackNavigation() {
    return `
        <nav class="navbar fallback-nav">
            <div class="container">
                <a href="/index.html" class="navbar-brand">OutsourceSU</a>
                <ul class="nav-menu-fallback">
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/services.html">Services</a></li>
                    <li><a href="/blog.html">Blog</a></li>
                    <li><a href="/about.html">About</a></li>
                    <li><a href="/contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;
}

function createFallbackFooter() {
    return `
        <footer class="footer fallback-footer">
            <div class="container">
                <p>&copy; 2025 OutsourceSU. All rights reserved.</p>
                <nav class="footer-nav">
                    <a href="/privacy-policy.html">Privacy Policy</a>
                    <a href="/terms-of-service.html">Terms</a>
                    <a href="/contact.html">Contact</a>
                </nav>
            </div>
        </footer>
    `;
}

// Blog Post Card Creation (existing functionality)
function createBlogPostCard(post) {
    return `
        <article class="blog-post-card" data-category="${post.category || 'General'}">
            <a href="${post.url}" class="blog-card-link">
                <div class="blog-card-header">
                    <span class="blog-category">${post.category || 'SEO Tips'}</span>
                    <time class="blog-date" datetime="${post.date}">${formatDate(post.date)}</time>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt || 'Expert SEO insights and strategies...'}</p>
                <div class="blog-card-footer">
                    <span class="read-more">Read Full Article <i class="fas fa-arrow-right"></i></span>
                    <span class="read-time">${post.readTime || '5 min read'}</span>
                </div>
            </a>
        </article>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Auto-initialization
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});

// Export functions for global access
window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.initializeProfessionalNavigation = initializeProfessionalNavigation;
window.createBlogPostCard = createBlogPostCard;
window.formatDate = formatDate;
