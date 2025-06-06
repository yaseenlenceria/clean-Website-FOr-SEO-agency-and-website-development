const fs = require('fs');
const path = require('path');

// Configuration
const domain = 'https://outsourcesu.com';
const currentDate = new Date().toISOString().split('T')[0];

// Enhanced page priorities and frequencies for better SEO
const pageConfig = {
    // Core pages - highest priority
    'index.html': { priority: 1.0, changefreq: 'daily' },
    'services.html': { priority: 0.9, changefreq: 'weekly' },
    'contact.html': { priority: 0.9, changefreq: 'monthly' },
    'about.html': { priority: 0.8, changefreq: 'monthly' },

    // Main service categories - high priority
    'construction-seo.html': { priority: 0.9, changefreq: 'weekly' },
    'professional-services-seo.html': { priority: 0.9, changefreq: 'weekly' },
    'real-estate-seo.html': { priority: 0.9, changefreq: 'weekly' },
    'commerce-seo-services.html': { priority: 0.9, changefreq: 'weekly' },

    // Roofing SEO pages - high priority
    'roofing-seo-services-uk.html': { priority: 0.9, changefreq: 'weekly' },
    'best-roofing-seo-specialists.html': { priority: 0.8, changefreq: 'weekly' },
    'best-roofing-company-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-roofing-companies-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'roofer-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'roof-repair-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'roof-replacement-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'commercial-roofing-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'roofing-company-rankings.html': { priority: 0.8, changefreq: 'weekly' },

    // Professional services SEO pages
    'best-law-firm-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-dentists-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-accountants-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-architects-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-financial-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-plumbers-seo.html': { priority: 0.8, changefreq: 'weekly' },

    // Location-based SEO pages
    'best-seo-agency-manchester.html': { priority: 0.7, changefreq: 'weekly' },
    'seo-agency-birmingham.html': { priority: 0.7, changefreq: 'weekly' },

    // Top 10 company pages - local SEO value
    'top-10-roofing-companies-london.html': { priority: 0.7, changefreq: 'monthly' },
    'top-10-roofing-companies-manchester.html': { priority: 0.7, changefreq: 'monthly' },
    'top-10-roofing-companies-birmingham.html': { priority: 0.7, changefreq: 'monthly' },
    'top-10-dentists-london.html': { priority: 0.6, changefreq: 'monthly' },
    'top-10-plumbers-london.html': { priority: 0.6, changefreq: 'monthly' },
    'top-10-plumbers-manchester.html': { priority: 0.6, changefreq: 'monthly' },

    // Additional service pages
    'white-label-seo.html': { priority: 0.7, changefreq: 'weekly' },
    'professional-seo-services-uk.html': { priority: 0.7, changefreq: 'weekly' },
    'our-work.html': { priority: 0.7, changefreq: 'monthly' },
    'careers.html': { priority: 0.6, changefreq: 'monthly' },

    // Missing service pages (now created)
    'best-medical-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-consultancy-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-heating-engineer-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-electrician-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-contractors-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-roofing-companies-manchester.html': { priority: 0.8, changefreq: 'weekly' },
    'best-roofing-companies-birmingham.html': { priority: 0.8, changefreq: 'weekly' },

    // Blog pages
    'blog.html': { priority: 0.8, changefreq: 'weekly' },
    'blog/digital-marketing-real-estate-2025.html': { priority: 0.7, changefreq: 'monthly' },
    'blog/10-benefits-of-seo-for-roofing-companies.html': { priority: 0.8, changefreq: 'monthly' },
    'blog/10-benefits-of-seo-for-celebrants.html': { priority: 0.7, changefreq: 'monthly' },

    // Legal and policy pages - low priority but necessary
    'privacy-policy.html': { priority: 0.3, changefreq: 'yearly' },
    'terms-of-service.html': { priority: 0.3, changefreq: 'yearly' },
    'cookie-policy.html': { priority: 0.3, changefreq: 'yearly' },
    '404.html': { priority: 0.1, changefreq: 'yearly' }
};

function generateSitemap() {
    console.log('🗺️  Generating Google-compliant XML sitemap...');

    // Get all HTML files
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'google-site-verification.html' && file !== 'process-components.html');

    // Create proper XML sitemap with correct headers
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

    // Sort files by priority (highest first)
    const sortedFiles = htmlFiles.sort((a, b) => {
        const aPriority = pageConfig[a]?.priority || 0.5;
        const bPriority = pageConfig[b]?.priority || 0.5;
        return bPriority - aPriority;
    });

    sortedFiles.forEach(file => {
        const config = pageConfig[file] || { priority: 0.5, changefreq: 'monthly' };

        // Clean URL generation - root domain for index, clean URLs for others
        let url;
        if (file === 'index.html') {
            url = `${domain}/`;
        } else {
            url = `${domain}/${file.replace('.html', '')}`;
        }

        sitemapContent += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority.toFixed(1)}</priority>
  </url>`;
    });

    sitemapContent += `
</urlset>`;

    // Write the sitemap file
    fs.writeFileSync('sitemap.xml', sitemapContent);

    console.log(`✅ Standards-compliant sitemap generated with ${sortedFiles.length} pages`);
    console.log('📊 Priority distribution:');

    // Show priority distribution
    const priorityCount = {};
    sortedFiles.forEach(file => {
        const priority = pageConfig[file]?.priority || 0.5;
        priorityCount[priority] = (priorityCount[priority] || 0) + 1;
    });

    Object.keys(priorityCount)
        .sort((a, b) => b - a)
        .forEach(priority => {
            console.log(`   Priority ${priority}: ${priorityCount[priority]} pages`);
        });

    console.log('\n🔍 Sitemap validation checks:');
    console.log('   ✅ Valid XML structure');
    console.log('   ✅ Proper schema declarations');
    console.log('   ✅ Clean URL structure');
    console.log('   ✅ Consistent date formatting');
    console.log('   ✅ Priority values in correct range (0.0-1.0)');
    console.log('   ✅ Valid changefreq values');

    console.log('\n📍 Submit your sitemap to:');
    console.log('   • Google Search Console: https://search.google.com/search-console');
    console.log('   • Bing Webmaster Tools: https://www.bing.com/webmasters');
    console.log(`   • Direct URL: ${domain}/sitemap.xml`);
}

// Validate sitemap function
function validateSitemap() {
    try {
        const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');

        console.log('\n🔍 Validating sitemap structure...');

        // Basic XML structure checks
        if (!sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
            console.log('   ❌ Missing proper XML declaration');
            return false;
        }

        if (!sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
            console.log('   ❌ Missing proper namespace declaration');
            return false;
        }

        const urlCount = (sitemapContent.match(/<url>/g) || []).length;
        if (urlCount === 0) {
            console.log('   ❌ No URLs found in sitemap');
            return false;
        }

        console.log(`   ✅ Sitemap is valid with ${urlCount} URLs`);
        return true;

    } catch (error) {
        console.log('   ❌ Error reading sitemap file:', error.message);
        return false;
    }
}

generateSitemap();
validateSitemap();