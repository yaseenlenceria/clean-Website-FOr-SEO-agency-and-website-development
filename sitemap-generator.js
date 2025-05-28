
const fs = require('fs');
const path = require('path');

// Configuration
const domain = 'https://outsourcesu.com';
const currentDate = new Date().toISOString().split('T')[0];

// Page priorities and frequencies
const pageConfig = {
    'index.html': { priority: 1.0, changefreq: 'daily' },
    'services.html': { priority: 0.9, changefreq: 'weekly' },
    'contact.html': { priority: 0.8, changefreq: 'monthly' },
    'about.html': { priority: 0.7, changefreq: 'monthly' },
    // SEO Service Pages
    'construction-seo.html': { priority: 0.9, changefreq: 'weekly' },
    'professional-services-seo.html': { priority: 0.9, changefreq: 'weekly' },
    'roofing-seo-services-uk.html': { priority: 0.9, changefreq: 'weekly' },
    'best-law-firm-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-dentists-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-accountants-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-architects-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-financial-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'best-plumbers-seo.html': { priority: 0.8, changefreq: 'weekly' },
    'real-estate-seo.html': { priority: 0.8, changefreq: 'weekly' },
    // Location Pages
    'best-seo-agency-manchester.html': { priority: 0.7, changefreq: 'weekly' },
    'seo-agency-birmingham.html': { priority: 0.7, changefreq: 'weekly' },
    // Company Pages
    'our-work.html': { priority: 0.7, changefreq: 'monthly' },
    'careers.html': { priority: 0.6, changefreq: 'monthly' },
    'white-label-seo.html': { priority: 0.7, changefreq: 'weekly' },
    // Legal Pages
    'privacy-policy.html': { priority: 0.3, changefreq: 'yearly' },
    'terms-of-service.html': { priority: 0.3, changefreq: 'yearly' },
    'cookie-policy.html': { priority: 0.3, changefreq: 'yearly' },
    '404.html': { priority: 0.1, changefreq: 'yearly' }
};

function generateSitemap() {
    // Get all HTML files
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'));

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    htmlFiles.forEach(file => {
        const config = pageConfig[file] || { priority: 0.5, changefreq: 'monthly' };
        const url = file === 'index.html' ? domain + '/' : `${domain}/${file}`;
        
        sitemapContent += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`;
    });

    sitemapContent += `
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemapContent);
    console.log('Sitemap generated successfully!');
}

generateSitemap();
