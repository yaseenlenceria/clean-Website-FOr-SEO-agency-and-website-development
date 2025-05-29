
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
    
    // Legal and policy pages - low priority but necessary
    'privacy-policy.html': { priority: 0.3, changefreq: 'yearly' },
    'terms-of-service.html': { priority: 0.3, changefreq: 'yearly' },
    'cookie-policy.html': { priority: 0.3, changefreq: 'yearly' },
    '404.html': { priority: 0.1, changefreq: 'yearly' }
};

function generateSitemap() {
    console.log('🗺️  Generating enhanced sitemap...');

    // Get all HTML files
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'google-site-verification.html' && file !== 'process-components.html');

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
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
        // Always use clean URLs without .html extension, root domain for index
        let url;
        if (file === 'index.html') {
            url = domain + '/';
        } else {
            url = `${domain}/${file.replace('.html', '')}`;
        }
        
        sitemapContent += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>`;

        // Add image sitemap data for pages with images
        if (file === 'index.html') {
            sitemapContent += `
    <image:image>
      <image:loc>https://outsourcesu.com/attached_assets/logo1.png</image:loc>
      <image:title>OutsourceSU Logo</image:title>
      <image:caption>OutsourceSU - Leading SEO Agency UK</image:caption>
    </image:image>`;
        }

        sitemapContent += `
  </url>`;
    });

    sitemapContent += `
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemapContent);
    
    console.log(`✅ Enhanced sitemap generated with ${sortedFiles.length} pages`);
    console.log('📊 Page distribution:');
    
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
}

generateSitemap();
