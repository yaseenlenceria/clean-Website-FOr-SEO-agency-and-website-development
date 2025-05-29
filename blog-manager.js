const fs = require('fs');
const path = require('path');

// Blog configuration
const BLOG_CONFIG = {
    blogDir: './blog',
    outputFile: './js/blog-posts.js',
    defaultCategory: 'Business Growth',
    defaultImage: 'attached_assets/best_SEO_for_construction_industry_in_uk.png'
};

// Function to extract metadata from HTML files
function extractBlogMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const filename = path.basename(filePath);

        // Extract title from various sources
        let title = '';
        const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);

        if (h1Match) {
            title = h1Match[1].replace(/<[^>]*>/g, '').trim();
        } else if (titleMatch) {
            title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        } else {
            // Generate title from filename
            title = filename
                .replace('.html', '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
        }

        // Extract description/excerpt
        let excerpt = '';
        const metaDescMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i);
        const firstPMatch = content.match(/<p[^>]*>(.*?)<\/p>/i);

        if (metaDescMatch) {
            excerpt = metaDescMatch[1].trim();
        } else if (firstPMatch) {
            excerpt = firstPMatch[1].replace(/<[^>]*>/g, '').trim();
            if (excerpt.length > 150) {
                excerpt = excerpt.substring(0, 150) + '...';
            }
        } else {
            excerpt = `Read about ${title.toLowerCase()} and discover expert insights.`;
        }

        // Determine category based on filename/content
        let category = 'Digital Marketing';
        if (filename.includes('roofing') || content.includes('roofing') || title.toLowerCase().includes('roofing')) {
            category = 'Roofing SEO';
        } else if (filename.includes('real-estate') || content.includes('real estate') || title.toLowerCase().includes('real estate')) {
            category = 'Real Estate Marketing';
        } else if (filename.includes('dental') || content.includes('dental') || title.toLowerCase().includes('dental')) {
            category = 'Dental Marketing';
        } else if (filename.includes('birmingham') || content.includes('Birmingham') || title.includes('Birmingham')) {
            category = 'Local Services';
        }

        // Generate appropriate image
        let image = 'attached_assets/best_SEO_for_construction_industry_in_uk.png';
        if (category === 'Roofing SEO') {
            image = 'attached_assets/Best_SEO_for_the_roofing_industry_in_the_UK.png';
        } else if (category === 'Real Estate Marketing') {
            image = 'attached_assets/best_SEO_for_construction_industry_in_uk.png';
        }

        // Generate tags based on category and content
        let tags = [];
        if (category === 'Roofing SEO') {
            tags = ['roofing company SEO', 'roofing contractor marketing', 'local SEO for roofers'];
        } else if (category === 'Real Estate Marketing') {
            tags = ['real estate digital marketing 2025', 'property marketing strategies', 'real estate SEO'];
        } else if (category === 'Dental Marketing') {
            tags = ['dental marketing', 'dental SEO', 'practice growth'];
        } else if (category === 'Local Services') {
            if (title.includes('Birmingham')) {
                tags = ['Birmingham services', 'local roofers', 'West Midlands'];
            } else {
                tags = ['local services', 'business directory', 'service providers'];
            }
        }

        // Estimate read time based on content length
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.max(3, Math.ceil(wordCount / 200)) + ' min read';

        return {
            filename: filename,
            url: `blog/${filename}`,
            title: title,
            excerpt: excerpt,
            category: category,
            date: '2025-01-28', // Default date, can be extracted from meta if available
            readTime: readTime,
            image: image,
            tags: tags,
            featured: filename === 'digital-marketing-real-estate-2025.html'
        };

    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return null;
    }
}

// Main function to scan and generate blog posts
function generateBlogPosts() {
    console.log('🔍 Scanning for blog posts...');

    if (!fs.existsSync(BLOG_CONFIG.blogDir)) {
        console.log('❌ Blog directory not found');
        return;
    }

    const blogFiles = fs.readdirSync(BLOG_CONFIG.blogDir)
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.includes('template'))
        .map(file => path.join(BLOG_CONFIG.blogDir, file));

    console.log(`📄 Found ${blogFiles.length} blog post(s)`);

    const blogPosts = blogFiles
        .map(extractBlogMetadata)
        .filter(post => post !== null)
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

    // Generate JavaScript file with blog posts
    const jsContent = `// Auto-generated blog posts data
// Last updated: ${new Date().toISOString()}

window.BLOG_POSTS = ${JSON.stringify(blogPosts, null, 2)};

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

    console.log(\`✅ Loaded \${window.BLOG_POSTS.length} blog posts\`);
};
`;

    // Write the generated file
    fs.writeFileSync(BLOG_CONFIG.outputFile, jsContent);

    console.log(`✅ Generated blog posts data: ${BLOG_CONFIG.outputFile}`);
    console.log(`📊 Blog posts summary:`);

    blogPosts.forEach(post => {
        console.log(`   • ${post.title} (${post.category})`);
    });

    return blogPosts;
}

// Run the generator
if (require.main === module) {
    generateBlogPosts();
}

module.exports = { generateBlogPosts, extractBlogMetadata };