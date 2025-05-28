
// Global variables
let navMenu = null;
let header = null;
let footer = null;

// Load header component
async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        if (!response.ok) throw new Error('Header not found');
        const headerHTML = await response.text();
        const headerContainer = document.getElementById('global-header');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
            initializeNavigation();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load footer component
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        if (!response.ok) throw new Error('Footer not found');
        const footerHTML = await response.text();
        const footerContainer = document.getElementById('global-footer');
        if (footerContainer) {
            footerContainer.innerHTML = footerHTML;
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Dropdown functionality
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        });
    });
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    addSEOEnhancements();
    
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
