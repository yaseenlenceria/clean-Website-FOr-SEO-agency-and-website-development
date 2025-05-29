// Auto-generated blog posts data
// Last updated: 2025-05-29T13:26:14.214Z

window.BLOG_POSTS = [
  {
    "filename": "digital-marketing-real-estate-2025.html",
    "url": "blog/digital-marketing-real-estate-2025.html",
    "title": "Digital Marketing for Real Estate 2025: Complete Guide",
    "excerpt": "Complete guide to real estate digital marketing in 2025. Learn advanced SEO strategies, AI-powered lead generation, and proven techniques to dominate the property market online.",
    "category": "Real Estate Marketing",
    "date": "2025-01-28",
    "readTime": "12 min read",
    "image": "attached_assets/best_SEO_for_construction_industry_in_uk.png",
    "tags": [
      "real estate digital marketing 2025",
      "property marketing strategies",
      "real estate SEO"
    ],
    "featured": true
  },
  {
    "filename": "best-roofing-companies-seo.html",
    "url": "blog/best-roofing-companies-seo.html",
    "title": "How to Do SEO for Roofing Companies in 4 Simple Steps",
    "excerpt": "Complete guide to roofing company SEO in 2025. Learn the 4 essential steps to dominate local search results, generate more leads, and grow your roofing business online.",
    "category": "Roofing SEO",
    "date": "2025-01-28",
    "readTime": "8 min read",
    "image": "attached_assets/Best_SEO_for_the_roofing_industry_in_the_UK.png",
    "tags": [
      "roofing company SEO",
      "roofing contractor marketing",
      "local SEO for roofers"
    ],
    "featured": false
  }
];

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Function to load blog posts dynamically
window.loadDynamicBlogPosts = function() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;
    
    console.log(`✅ Loaded ${window.BLOG_POSTS ? window.BLOG_POSTS.length : 0} blog posts`);
    
    // Clear existing dynamic content but keep manually added posts
    const existingPosts = blogGrid.querySelectorAll('.blog-post-card');
    
    // Add new blog posts to the grid
    window.BLOG_POSTS.forEach((post, index) => {
        // Check if this post already exists
        const existingPost = Array.from(existingPosts).find(card => {
            const titleLink = card.querySelector('h2 a, h3 a');
            return titleLink && titleLink.textContent.trim() === post.title;
        });

        if (existingPost) {
            // Update existing post
            updateBlogPostCard(existingPost, post);
        } else {
            // Create new post card
            const postCard = createBlogPostCard(post);
            blogGrid.appendChild(postCard);
        }
    });

    console.log(`✅ Loaded ${window.BLOG_POSTS.length} blog posts`);
};

// Helper function to create blog post card
function createBlogPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-post-card featured';

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
            <h2><a href="${post.url}">${post.title}</a></h2>
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

// Helper function to update existing blog post card
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