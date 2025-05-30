// Global variables for navigation
if (typeof window.navMenu === 'undefined') {
    window.navMenu = null;
    window.navMenuDesktop = null;
    window.navToggle = null;
    window.isNavigationInitialized = false;

    // Global component loading with error handling
    window.componentsLoaded = {
        header: false,
        footer: false
    };
}

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
            // Clean the data to ensure no stray content
            const cleanData = data.trim();
            // Clear any existing content first
            headerElement.innerHTML = '';
            headerElement.innerHTML = cleanData;
            window.componentsLoaded.header = true;

            // Initialize navigation after header is loaded
            setTimeout(() => {
                if (!window.isNavigationInitialized) {
                    initializeNavigation();
                }
            }, 100);
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback for SEO - ensure basic navigation exists
            headerElement.innerHTML = `
                <nav class="navbar">
                    <div class="container">
                        <a href="/index.html" class="navbar-brand">OutsourceSU</a>
                        <ul class="nav-menu">
                            <li><a href="/index.html">Home</a></li>
                            <li><a href="/services.html">Services</a></li>
                            <li><a href="/about.html">About</a></li>
                            <li><a href="/blog.html">Blog</a></li>
                            <li><a href="/contact.html">Contact</a></li>
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
                        <p>&copy; 2025 OutsourceSU. All rights reserved.</p>
                        <nav>
                            <a href="/privacy-policy.html">Privacy Policy</a>
                            <a href="/terms-of-service.html">Terms</a>
                            <a href="/contact.html">Contact</a>
                        </nav>
                    </div>
                </footer>
            `;
        });
}

// Initialize Navigation with proper error handling
function initializeNavigation() {
    if (window.isNavigationInitialized) {
        console.log('Navigation already initialized, skipping...');
        return;
    }
    
    // Mark as initializing to prevent duplicate calls
    window.isNavigationInitialized = true;

    // Wait for elements to be available
    setTimeout(() => {
        window.navToggle = document.querySelector('.nav-toggle, #nav-toggle');
        window.navMenu = document.querySelector('.nav-menu, #nav-menu');
        window.navMenuDesktop = document.querySelector('.nav-menu-desktop, #nav-menu-desktop');

        if (window.navToggle && window.navMenu) {
            console.log('Navigation elements found, initializing...');

            // Remove any existing event listeners
            const newNavToggle = window.navToggle.cloneNode(true);
            window.navToggle.parentNode.replaceChild(newNavToggle, window.navToggle);
            window.navToggle = newNavToggle;

            // Mobile navigation toggle
            window.navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                console.log('Nav toggle clicked');

                window.navMenu.classList.toggle('active');
                window.navToggle.classList.toggle('active');

                // Add body class for mobile menu open state
                if (window.navMenu.classList.contains('active')) {
                    document.body.classList.add('nav-open');
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';
                }
            });

            // Handle mobile dropdown toggles
            const mobileDropdowns = window.navMenu.querySelectorAll('.nav-dropdown');
            mobileDropdowns.forEach(dropdown => {
                const dropdownLink = dropdown.querySelector('.nav-link');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');

                if (dropdownLink && dropdownMenu) {
                    dropdownLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');

                        // Close other dropdowns
                        mobileDropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    });
                }
            });

            // Close mobile menu when clicking on a regular link (not dropdown parent)
            const mobileNavLinks = window.navMenu.querySelectorAll('a:not(.nav-dropdown > .nav-link)');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    window.navMenu.classList.remove('active');
                    window.navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';

                    // Close all dropdowns
                    mobileDropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (window.navMenu && window.navToggle && 
                    !window.navToggle.contains(event.target) && 
                    !window.navMenu.contains(event.target)) {
                    window.navMenu.classList.remove('active');
                    window.navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';
                }
            });

            // Handle window resize to close mobile menu on desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 968) {
                    window.navMenu.classList.remove('active');
                    window.navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';
                }
            });

            console.log('Navigation initialized successfully');
        } else {
            console.log('Navigation elements not found, retrying...');
            // Retry after another delay
            if (document.readyState === 'complete') {
                setTimeout(initializeNavigation, 500);
            }
        }
    }, 100);
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

// Blog post creation and update functions
function createBlogPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-post-card';

    article.innerHTML = `
        <div class="blog-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="blog-category">${post.category}</div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <time datetime="${post.date}">${formatDate(post.date)}</time>
                <span class="read-time">${post.readTime}</span>
            </div>
            <h3><a href="${post.url}">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${post.url}" class="blog-read-more">
                Read Full Article <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return article;
}

function updateBlogPostCard(card, post) {
    const title = card.querySelector('h2 a, h3 a');
    const excerpt = card.querySelector('p');
    const readMoreLinks = card.querySelectorAll('a[href]');
    const date = card.querySelector('time');
    const readTime = card.querySelector('.read-time');
    const tags = card.querySelector('.blog-tags');
    const image = card.querySelector('img');

    if (title) title.textContent = post.title;
    if (excerpt) excerpt.textContent = post.excerpt;
    if (date) {
        date.setAttribute('datetime', post.date);
        date.textContent = formatDate(post.date);
    }
    if (readTime) readTime.textContent = post.readTime;
    if (tags) {
        tags.innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }
    if (image) {
        image.src = post.image;
        image.alt = post.title;
    }

    readMoreLinks.forEach(link => {
        if (link.classList.contains('blog-read-more') || link.closest('h2, h3')) {
            link.href = post.url;
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    addNavbarScrollEffects();

    // Load blog posts if on blog page
    if (window.location.pathname.includes('blog.html') || window.location.pathname.endsWith('/blog')) {
        setTimeout(() => {
            if (typeof window.loadDynamicBlogPosts === 'function') {
                window.loadDynamicBlogPosts();
            }
        }, 500);
    }

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
window.createBlogPostCard = createBlogPostCard;
window.updateBlogPostCard = updateBlogPostCard;
window.formatDate = formatDate;
// Load component function (kept for backwards compatibility)
function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (element) {
        fetch(componentPath)
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;

                // Re-initialize navigation after header is loaded
                if (elementId === 'global-header') {
                    setTimeout(() => {
                        if (!window.isNavigationInitialized) {
                            initializeNavigation();
                        }
                    }, 200);
                }
            })
            .catch(error => console.error('Error loading component:', error));
    }
}