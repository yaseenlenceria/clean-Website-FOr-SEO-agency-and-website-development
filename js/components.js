
// Global Components Loader
document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('global-header').innerHTML = data;
            
            // Initialize navigation after loading
            initializeNavigation();
            
            // Set active navigation link
            setActiveNavLink();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('global-footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Initialize Navigation Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid var(--border-dark)';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid var(--border-dark)';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}
