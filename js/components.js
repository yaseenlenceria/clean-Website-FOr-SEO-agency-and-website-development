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
    
    // Load blog posts if on blog page
    if (window.location.pathname.includes('blog.html') || window.location.pathname.endsWith('/blog')) {
        setTimeout(loadBlogPosts, 500); // Small delay to ensure DOM is ready
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

// Dynamic Blog Posts Loading
async function loadBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    // Known blog posts with metadata
    const blogPosts = [
        {
            url: 'blog/digital-marketing-real-estate-2025.html',
            title: 'Digital Marketing for Real Estate 2025: Complete Guide',
            excerpt: 'Discover the latest digital marketing strategies that will transform your real estate business in 2025. From AI-powered lead generation to advanced SEO techniques for property websites.',
            category: 'Real Estate Marketing',
            date: '2025-01-28',
            readTime: '12 min read',
            image: 'attached_assets/best_SEO_for_construction_industry_in_uk.png',
            tags: ['Real Estate SEO', 'Digital Marketing', 'Lead Generation'],
            featured: true
        }
        // Add more blog posts here as needed
    ];

    // Clear existing blog posts except featured
    const existingPosts = blogGrid.querySelectorAll('.blog-post-card:not(.featured)');
    existingPosts.forEach(post => post.remove());

    // Try to detect additional blog posts dynamically
    try {
        const blogFiles = [
            'digital-marketing-real-estate-2025.html',
            'digital-marketing-real-estate-2025 (copy).html',
            'digital-marketing-real-estate-2025 (copy) 1.html'
        ];

        for (const file of blogFiles) {
            // Skip if already in our known posts
            if (blogPosts.some(post => post.url.includes(file.replace(' (copy)', '').replace(' 1', '')))) {
                continue;
            }

            // Try to fetch and parse the blog post
            try {
                const response = await fetch(`blog/${file}`);
                if (response.ok) {
                    const content = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(content, 'text/html');
                    
                    const title = doc.querySelector('h1')?.textContent || 
                                 doc.querySelector('title')?.textContent || 
                                 'Untitled Blog Post';
                    
                    const metaDesc = doc.querySelector('meta[name="description"]')?.content || 
                                    'Expert insights and strategies for your business growth.';

                    // Add to blog posts array
                    blogPosts.push({
                        url: `blog/${file}`,
                        title: title.replace(' | OutsourceSU', ''),
                        excerpt: metaDesc,
                        category: 'Business Growth',
                        date: new Date().toISOString().split('T')[0],
                        readTime: '8 min read',
                        image: 'attached_assets/best_SEO_for_construction_industry_in_uk.png',
                        tags: ['SEO', 'Digital Marketing', 'Business'],
                        featured: false
                    });
                }
            } catch (error) {
                console.log(`Could not load blog post: ${file}`);
            }
        }
    } catch (error) {
        console.log('Dynamic blog detection not available');
    }

    // Render all blog posts
    blogPosts.forEach((post, index) => {
        if (index === 0 && post.featured) {
            // Update featured post if it exists
            const featuredPost = blogGrid.querySelector('.blog-post-card.featured');
            if (featuredPost) {
                updateBlogPostCard(featuredPost, post);
            }
        } else {
            // Create new blog post card
            const postCard = createBlogPostCard(post);
            blogGrid.appendChild(postCard);
        }
    });
}

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

// Export for global access
window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.initializeNavigation = initializeNavigation;
window.loadBlogPosts = loadBlogPosts;