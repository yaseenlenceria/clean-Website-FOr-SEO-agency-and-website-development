// Global variables
let navMenu = null;
let navMenuDesktop = null;
let navToggle = null;
let isNavigationInitialized = false;

// Global component loading with error handling
let componentsLoaded = {
    header: false,
    footer: false
};

// Load Header Component
function loadHeader() {
    const headerElement = document.getElementById('global-header');
    if (!headerElement) return;

    // Determine if we're in a subdirectory
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

            // Initialize navigation after header is loaded
            setTimeout(() => {
                if (!isNavigationInitialized) {
                    initializeNavigation();
                }
            }, 200);
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback for SEO - ensure basic navigation exists
            headerElement.innerHTML = `
                <nav class="navbar">
                    <div class="container">
                        <a href="index.html" class="navbar-brand">OutsourceSU</a>
                        <ul class="nav-menu">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li>
                                <a href="about.html" class="nav-link">
                                    <i class="fas fa-info-circle"></i>
                                    About
                                </a>
                                <a href="blog.html" class="nav-link">
                                    <i class="fas fa-blog"></i>
                                    Blog
                                </a>
                                <a href="contact.html" class="nav-link">
                                    <i class="fas fa-envelope"></i>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            `;
        });
}

// Load Footer Component
function loadFooter() {
    const footerElement = document.getElementById('global-footer');
    if (!footerElement) return;

    // Determine if we're in a subdirectory
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
            // Fallback footer for SEO
            footerElement.innerHTML = `
                <footer class="footer">
                    <div class="container">
                        <p>&copy; 2024 OutsourceSU. All rights reserved.</p>
                        <nav>
                            <a href="privacy-policy.html">Privacy Policy</a>
                            <a href="terms-of-service.html">Terms</a>
                            <a href="contact.html">Contact</a>
                        </nav>
                    </div>
                </footer>
            `;
        });
}

// Initialize Navigation with proper error handling
function initializeNavigation() {
    if (isNavigationInitialized) {
        console.log('Navigation already initialized, skipping...');
        return;
    }

    navToggle = document.querySelector('.nav-toggle');
    navMenu = document.querySelector('.nav-menu');
    navMenuDesktop = document.querySelector('.nav-menu-desktop');

    if (navToggle && navMenu) {
        console.log('Navigation elements found, initializing...');

        // Mobile navigation toggle
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = navMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu && navToggle && 
                !navToggle.contains(event.target) && 
                !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Handle window resize to close mobile menu on desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 968) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        isNavigationInitialized = true;
        console.log('Navigation initialized successfully');
    } else {
        console.log('Navigation elements not found yet...');
    }
}

// Add scroll effects to navbar
function addNavbarScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// SEO enhancements
function addSEOEnhancements() {
    // Add breadcrumb structured data
    const breadcrumb = document.querySelector('.breadcrumb-nav');
    if (breadcrumb) {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": []
        };

        const breadcrumbLinks = breadcrumb.querySelectorAll('a');
        breadcrumbLinks.forEach((link, index) => {
            breadcrumbData.itemListElement.push({
                "@type": "ListItem",
                "position": index + 1,
                "name": link.textContent,
                "item": link.href
            });
        });

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbData);
        document.head.appendChild(script);
    }

    // Add FAQ structured data if FAQ section exists
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
        const faqItems = faqSection.querySelectorAll('.faq-item');
        if (faqItems.length > 0) {
            const faqData = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": []
            };

            faqItems.forEach(item => {
                const question = item.querySelector('h3, .faq-question');
                const answer = item.querySelector('p, .faq-answer');

                if (question && answer) {
                    faqData.mainEntity.push({
                        "@type": "Question",
                        "name": question.textContent,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": answer.textContent
                        }
                    });
                }
            });

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(faqData);
            document.head.appendChild(script);
        }
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    addSEOEnhancements();
    addNavbarScrollEffects();

    // Add lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Export for global access
window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.initializeNavigation = initializeNavigation;