// Global variables
let navMenu = null;
let header = null;
let footer = null;

// Global component loading with error handling
let componentsLoaded = {
    header: false,
    footer: false
};

// Load Header Component
function loadHeader() {
    const headerElement = document.getElementById('global-header');
    if (!headerElement) return;

    fetch('components/header.html')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(data => {
            headerElement.innerHTML = data;
            componentsLoaded.header = true;

            // Initialize navigation after header is loaded
            setTimeout(initializeNavigation, 100);
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
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact</a></li>
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

    fetch('components/footer.html')
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
    // Wait for DOM elements to be available
    const checkElements = () => {
        const navToggle = document.querySelector('.nav-toggle');
        navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            console.log('Navigation elements found, initializing...');
            
            // Remove any existing listeners to prevent duplicates
            const newNavToggle = navToggle.cloneNode(true);
            navToggle.parentNode.replaceChild(newNavToggle, navToggle);

            newNavToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Nav toggle clicked');
                navMenu.classList.toggle('active');
                newNavToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    console.log('Nav link clicked, closing menu');
                    navMenu.classList.remove('active');
                    newNavToggle.classList.remove('active');
                });
            });

            // Initialize dropdown functionality
            const dropdowns = document.querySelectorAll('.nav-dropdown');
            
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                if (link && menu) {
                    // Desktop hover behavior
                    if (window.innerWidth > 968) {
                        dropdown.addEventListener('mouseenter', () => {
                            dropdown.classList.add('open');
                            dropdown.setAttribute('aria-expanded', 'true');
                        });
                        
                        dropdown.addEventListener('mouseleave', () => {
                            dropdown.classList.remove('open');
                            dropdown.setAttribute('aria-expanded', 'false');
                        });
                    } else {
                        // Mobile click behavior
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            const isOpen = dropdown.classList.contains('open');
                            
                            // Close all other dropdowns
                            dropdowns.forEach(d => {
                                d.classList.remove('open');
                                d.setAttribute('aria-expanded', 'false');
                            });
                            
                            // Toggle current dropdown
                            if (!isOpen) {
                                dropdown.classList.add('open');
                                dropdown.setAttribute('aria-expanded', 'true');
                            }
                        });
                    }
                    
                    // Keyboard navigation
                    dropdown.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const isOpen = dropdown.classList.contains('open');
                            
                            dropdowns.forEach(d => {
                                d.classList.remove('open');
                                d.setAttribute('aria-expanded', 'false');
                            });
                            
                            if (!isOpen) {
                                dropdown.classList.add('open');
                                dropdown.setAttribute('aria-expanded', 'true');
                            }
                        }
                        
                        if (e.key === 'Escape') {
                            dropdown.classList.remove('open');
                            dropdown.setAttribute('aria-expanded', 'false');
                        }
                    });
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (navMenu && newNavToggle && 
                    !newNavToggle.contains(event.target) && 
                    !navMenu.contains(event.target)) {
                    navMenu.classList.remove('active');
                    newNavToggle.classList.remove('active');
                }
                
                // Close dropdowns when clicking outside
                if (!event.target.closest('.nav-dropdown')) {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('open');
                        dropdown.setAttribute('aria-expanded', 'false');
                    });
                }
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 968) {
                    // Reset mobile menu
                    navMenu.classList.remove('active');
                    newNavToggle.classList.remove('active');
                    
                    // Reset dropdowns for desktop
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('open');
                        dropdown.setAttribute('aria-expanded', 'false');
                    });
                }
            });

            console.log('Navigation initialized successfully');
        } else {
            console.log('Navigation elements not found yet...');
        }
    };

    // Try multiple times to ensure elements are loaded
    setTimeout(checkElements, 100);
    setTimeout(checkElements, 300);
    setTimeout(checkElements, 700);
    setTimeout(checkElements, 1500);
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

    // Backup initialization
    setTimeout(() => {
        if (!componentsLoaded.header || !componentsLoaded.footer) {
            console.log('Retrying component load...');
            if (!componentsLoaded.header) loadHeader();
            if (!componentsLoaded.footer) loadFooter();
        }
    }, 2000);
});

// Ensure navigation works even if components fail
window.addEventListener('load', function() {
    setTimeout(initializeNavigation, 1000);
});

// Export for global access
window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.initializeNavigation = initializeNavigation;