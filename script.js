document.addEventListener('DOMContentLoaded', function() {
    // Core Web Vitals Optimization
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-priority="high"]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add structured data for breadcrumbs
    function generateBreadcrumbSchema() {
        const breadcrumbs = document.querySelectorAll('.breadcrumb-nav a, .breadcrumb-nav span:last-child');
        if (breadcrumbs.length > 1) {
            const breadcrumbList = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": []
            };

            breadcrumbs.forEach((item, index) => {
                if (item.tagName === 'A') {
                    breadcrumbList.itemListElement.push({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": item.textContent.trim(),
                        "item": item.href
                    });
                } else {
                    breadcrumbList.itemListElement.push({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": item.textContent.trim()
                    });
                }
            });

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(breadcrumbList);
            document.head.appendChild(script);
        }
    }

    // Generate breadcrumb schema
    generateBreadcrumbSchema();

    // Track Core Web Vitals
    if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }

    // Navigation functionality will be handled by components.js
    // This is kept for compatibility with pages not yet updated

    // Mobile navigation is now handled in components.js

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

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.process-card, .help-card, .service-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Phone number formatting for CTA buttons
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone click events (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'header_phone'
                });
            }
        });
    });

    // Form validation (for contact forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#d1d5db';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});

// Navigation is now handled in components.js
// This section has been moved to avoid conflicts

// Utility functions for dynamic content
function updatePageContent(pageData) {
    // Function to dynamically update page content
    const elements = {
        title: document.querySelector('title'),
        h1: document.querySelector('h1'),
        metaDescription: document.querySelector('meta[name="description"]'),
        heroText: document.querySelector('.hero-content p'),
        ctaHeading: document.querySelector('.cta-content h2'),
        ctaText: document.querySelector('.cta-content p')
    };

    Object.keys(pageData).forEach(key => {
        if (elements[key]) {
            if (key === 'metaDescription') {
                elements[key].setAttribute('content', pageData[key]);
            } else {
                elements[key].textContent = pageData[key];
            }
        }
    });
}

// Service data for dynamic content
const serviceData = window.serviceData || {
    'construction-seo': {
        title: 'Best Construction SEO Services UK | Contractors & Builders',
        h1: 'Construction SEO - Drive More Leads for Your Building Business',
        metaDescription: 'Expert Construction SEO services for contractors, builders, roofers and trade businesses. Dominate local search and generate quality leads.',
        services: [
            'Local SEO for Contractors',
            'Roofing Company SEO',
            'Plumber SEO Services',
            'Construction Website Design',
            'Trade Business Marketing'
        ]
    },
    'professional-services-seo': {
        title: 'Professional Services SEO | Law Firms, Dentists, Accountants',
        h1: 'Professional Services SEO - Attract High-Value Clients',
        metaDescription: 'Specialized SEO for professional services including law firms, dental practices, accounting firms and financial advisors.',
        services: [
            'Law Firm SEO',
            'Dental Practice SEO',
            'Accountant SEO',
            'Financial Advisor SEO',
            'Medical Practice SEO'
        ]
    }
};

function initializePage() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    if (serviceData[currentPage]) {
        updatePageContent(serviceData[currentPage]);
    }
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Universal FAQ Toggle Function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');

    // Close all other FAQs
    document.querySelectorAll('.faq-answer.active, .faq-answer-modern.active').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
            const question = item.previousElementSibling;
            question.classList.remove('active');
            const questionIcon = question.querySelector('i');
            if (questionIcon) {
                questionIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Toggle current FAQ
    answer.classList.toggle('active');
    element.classList.toggle('active');

    // Rotate icon
    if (icon) {
        if (answer.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// Alternative function name for compatibility
function toggleFaq(element) {
    toggleFAQ(element);
}

// Initialize FAQ functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Handle FAQ questions with onclick attributes
    document.querySelectorAll('.faq-question, .faq-question-modern').forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });

    // Handle FAQ buttons (for newer implementations)
    document.querySelectorAll('.faq-item button').forEach(button => {
        button.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
});

// Add any additional JavaScript functionality here