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

        // Extract title
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const title = (titleMatch?.[1] || h1Match?.[1] || 'Untitled Post')
            .replace(/\s*\|\s*OutsourceSU.*$/i, '')
            .trim();

        // Extract description
        const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
        const excerpt = descMatch?.[1] || 'Expert insights and strategies for your business.';

        // Extract keywords for tags
        const keywordsMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["']/i);
        const keywords = keywordsMatch?.[1] || '';
        const tags = keywords.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).slice(0, 3);
        if (tags.length === 0) {
            if (filePath.includes('real-estate')) tags.push('Real Estate SEO', 'Digital Marketing', 'Lead Generation');
            else if (filePath.includes('roofing')) tags.push('Roofing SEO', 'Construction Marketing', 'Local SEO');
            else tags.push('SEO', 'Digital Marketing', 'Business Growth');
        }

        // Extract category from filename or content
        let category = BLOG_CONFIG.defaultCategory;
        if (filePath.includes('real-estate')) category = 'Real Estate Marketing';
        else if (filePath.includes('roofing')) category = 'Roofing SEO';
        else if (filePath.includes('construction')) category = 'Construction SEO';
        else if (filePath.includes('law') || filePath.includes('legal')) category = 'Legal Marketing';

        // Get file stats for date
        const stats = fs.statSync(filePath);
        const date = stats.mtime.toISOString().split('T')[0];

        // Estimate reading time (average 200 words per minute)
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Set appropriate image based on category
        let image = BLOG_CONFIG.defaultImage;
        if (filePath.includes('roofing')) {
            image = 'attached_assets/Best_SEO_for_the_roofing_industry_in_the_UK.png';
        }

        return {
            filename: path.basename(filePath),
            url: `blog/${path.basename(filePath)}`,
            title,
            excerpt,
            category,
            date,
            readTime: `${readTime} min read`,
            image,
            tags,
            featured: filePath.includes('digital-marketing-real-estate-2025.html') && !filePath.includes('copy')
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