// Auto-generated blog posts data
// Last updated: 2025-05-29T17:58:44.274Z

window.BLOG_POSTS = [
  {
    "filename": "top-uk-digital-marketing-agencies-2025.html",
    "url": "blog/top-uk-digital-marketing-agencies-2025.html",
    "title": "Top 15 Digital Marketing Agencies in the UK (2025)",
    "excerpt": "Comprehensive ranking of the best UK digital marketing agencies. OutsourceSU ranked #1 for performance and client results.",
    "category": "Agency Rankings",
    "date": "2025-01-28",
    "readTime": "12 min read",
    "image": "attached_assets/best_SEO_for_construction_industry_in_uk.png",
    "tags": [
      "digital marketing agencies",
      "UK agencies",
      "agency rankings"
    ],
    "featured": true
  },
  {
    "filename": "best-roofers-in-birmingham.html",
    "url": "blog/best-roofers-in-birmingham.html",
    "title": "7 Best Roofing Companies in Birmingham (2025)",
    "excerpt": "Expert insights and strategies for your business.",
    "category": "Business Growth",
    "date": "2025-05-29",
    "readTime": "1 min read",
    "image": "attached_assets/best_SEO_for_construction_industry_in_uk.png",
    "tags": [
      "SEO",
      "Digital Marketing",
      "Business Growth"
    ],
    "featured": false
  },
  {
    "filename": "best-roofing-companies-seo.html",
    "url": "blog/best-roofing-companies-seo.html",
    "title": "How to Do SEO for Roofing Companies in 4 Simple Steps",
    "excerpt": "Complete guide to roofing company SEO in 2025. Learn the 4 essential steps to dominate local search results, generate more leads, and grow your roofing business online.",
    "category": "Roofing SEO",
    "date": "2025-05-29",
    "readTime": "8 min read",
    "image": "attached_assets/Best_SEO_for_the_roofing_industry_in_the_UK.png",
    "tags": [
      "roofing company SEO",
      "roofing contractor marketing",
      "local SEO for roofers"
    ],
    "featured": false
  },
  {
    "filename": "digital-marketing-real-estate-2025.html",
    "url": "blog/digital-marketing-real-estate-2025.html",
    "title": "Digital Marketing for Real Estate 2025: Complete Guide",
    "excerpt": "Complete guide to real estate digital marketing in 2025. Learn advanced SEO strategies, AI-powered lead generation, and proven techniques to dominate the property market online.",
    "category": "Real Estate Marketing",
    "date": "2025-05-29",
    "readTime": "11 min read",
    "image": "attached_assets/best_SEO_for_construction_industry_in_uk.png",
    "tags": [
      "real estate digital marketing 2025",
      "property marketing strategies",
      "real estate SEO"
    ],
    "featured": true
  },
  {
    "filename": "top-5-dental-digital-marketing-agencies.html",
    "url": "blog/top-5-dental-digital-marketing-agencies.html",
    "title": "Top 5 Dental Marketing Agencies in the UK (2025)",
    "excerpt": "Discover the best dental marketing agencies in the UK for 2025. Compare services, specialties, and find the perfect partner to grow your dental practice online.",
    "category": "Business Growth",
    "date": "2025-05-29",
    "readTime": "7 min read",
    "image": "attached_assets/best_SEO_for_construction_industry_in_uk.png",
    "tags": [
      "dental marketing agencies",
      "dental SEO",
      "practice growth"
    ],
    "featured": false
  }
];

// Helper function to format dates
window.formatDate = function(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
};

// Function to create blog post cards
window.createBlogPostCard = function(post) {
    const postCard = document.createElement('div');
    postCard.className = 'blog-post-card';
    postCard.setAttribute('data-category', post.category);
    
    postCard.innerHTML = `
        <div class="blog-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="blog-overlay">
                <span class="blog-category">${post.category}</span>
            </div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date">${window.formatDate(post.date)}</span>
                <span class="blog-read-time">${post.readTime}</span>
            </div>
            <h3><a href="${post.url}" title="${post.title}">${post.title}</a></h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${post.url}" class="blog-read-more" title="Read ${post.title}">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    // Make entire card clickable
    postCard.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A') {
            window.location.href = post.url;
        }
    });
    
    return postCard;
};

// Function to update existing blog post cards
window.updateBlogPostCard = function(cardElement, post) {
    if (!cardElement) return;
    
    const img = cardElement.querySelector('.blog-image img');
    const category = cardElement.querySelector('.blog-category');
    const date = cardElement.querySelector('.blog-date');
    const readTime = cardElement.querySelector('.blog-read-time');
    const title = cardElement.querySelector('h3 a');
    const excerpt = cardElement.querySelector('.blog-excerpt');
    const tagsContainer = cardElement.querySelector('.blog-tags');
    const readMore = cardElement.querySelector('.blog-read-more');
    
    if (img) img.src = post.image;
    if (img) img.alt = post.title;
    if (category) category.textContent = post.category;
    if (date) date.textContent = window.formatDate(post.date);
    if (readTime) readTime.textContent = post.readTime;
    if (title) {
        title.textContent = post.title;
        title.href = post.url;
        title.title = post.title;
    }
    if (excerpt) excerpt.textContent = post.excerpt;
    if (tagsContainer) {
        tagsContainer.innerHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }
    if (readMore) {
        readMore.href = post.url;
        readMore.title = `Read ${post.title}`;
    }
};

// Function to load blog posts dynamically
window.loadDynamicBlogPosts = function() {
    const blogGrid = document.querySelector('.blog-grid, #dynamic-blog-grid');
    if (!blogGrid || !window.BLOG_POSTS) return;

    // Clear existing content
    blogGrid.innerHTML = '';

    // Add all blog posts to the grid
    window.BLOG_POSTS.forEach((post, index) => {
        const postCard = window.createBlogPostCard(post);
        if (post.featured) {
            postCard.classList.add('featured');
        }
        blogGrid.appendChild(postCard);
    });

    console.log(`✅ Loaded ${window.BLOG_POSTS.length} blog posts`);
};