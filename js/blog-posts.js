// Auto-generated blog posts data
// Last updated: 2025-05-29T11:19:18.570Z

window.BLOG_POSTS = [
  {
    "filename": "digital-marketing-real-estate-2025 (copy) 1.html",
    "url": "blog/digital-marketing-real-estate-2025 (copy) 1.html",
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
    "featured": false
  },
  {
    "filename": "digital-marketing-real-estate-2025 (copy).html",
    "url": "blog/digital-marketing-real-estate-2025 (copy).html",
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
  }
];

// Function to load blog posts dynamically
window.loadDynamicBlogPosts = function() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid || !window.BLOG_POSTS) return;

    // Clear existing non-featured posts
    const existingPosts = blogGrid.querySelectorAll('.blog-post-card:not(.featured)');
    existingPosts.forEach(post => post.remove());

    // Add all posts
    window.BLOG_POSTS.forEach((post, index) => {
        if (post.featured) {
            // Update featured post
            const featuredPost = blogGrid.querySelector('.blog-post-card.featured');
            if (featuredPost && typeof window.updateBlogPostCard === 'function') {
                window.updateBlogPostCard(featuredPost, post);
            }
        } else {
            // Create new post card
            if (typeof window.createBlogPostCard === 'function') {
                const postCard = window.createBlogPostCard(post);
                blogGrid.appendChild(postCard);
            }
        }
    });

    console.log(`✅ Loaded ${window.BLOG_POSTS.length} blog posts`);
};
