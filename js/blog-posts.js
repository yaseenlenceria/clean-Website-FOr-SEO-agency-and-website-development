// Auto-generated blog posts data
// Last updated: 2025-05-29T13:26:14.214Z

window.BLOG_POSTS = [
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
  }
];

// Blog posts data
window.BLOG_POSTS = [
    {
        title: "Digital Marketing for Real Estate 2025: Complete Guide",
        excerpt: "Discover the latest digital marketing strategies that will transform your real estate business in 2025. From AI-powered lead generation to advanced SEO techniques for property websites.",
        category: "Real Estate Marketing",
        date: "2025-01-28",
        readTime: "12 min read",
        image: "/attached_assets/best_SEO_for_construction_industry_in_uk.png",
        url: "/blog/digital-marketing-real-estate-2025.html",
        tags: ["Real Estate SEO", "Digital Marketing", "Lead Generation"],
        featured: false
    },
    {
        title: "Best Roofing Companies SEO 2025: Complete Guide",
        excerpt: "Uncover the top SEO strategies to elevate your roofing business in 2025. From optimizing roofing websites to leveraging AI-driven lead generation techniques.",
        category: "Roofing SEO",
        date: "2025-01-28",
        readTime: "12 min read",
        image: "/attached_assets/Best_SEO_for_the_roofing_industry_in_the_UK.png",
        url: "/blog/best-roofing-companies-seo.html",
        tags: ["Roofing SEO", "Digital Marketing", "Lead Generation"],
        featured: false
    }
];

// Function to load blog posts dynamically
window.loadDynamicBlogPosts = function() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

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
};
