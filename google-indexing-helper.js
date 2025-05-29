
const fs = require('fs');

// Google Indexing Helper - Manual Submission URLs
console.log('🔍 Google Search Console Submission Helper\n');

const domain = 'https://outsourcesu.com';
const pages = [
    '',  // Homepage
    '/services',
    '/contact',
    '/about',
    '/construction-seo',
    '/professional-services-seo',
    '/real-estate-seo',
    '/roofing-seo-services-uk',
    '/best-roofing-seo-specialists',
    '/best-roofing-company-seo',
    '/best-law-firm-seo',
    '/best-dentists-seo',
    '/best-accountants-seo',
    '/best-architects-seo',
    '/best-financial-seo',
    '/best-plumbers-seo',
    '/white-label-seo',
    '/professional-seo-services-uk'
];

console.log('📋 PRIORITY PAGES FOR MANUAL SUBMISSION:');
console.log('Submit these URLs manually in Google Search Console:\n');

pages.forEach((page, index) => {
    const url = domain + page;
    console.log(`${index + 1}. ${url}`);
});

console.log('\n🚀 SUBMISSION STEPS:');
console.log('1. Go to: https://search.google.com/search-console');
console.log('2. Select your property: outsourcesu.com');
console.log('3. Go to "URL Inspection" tool');
console.log('4. Enter each URL above and click "Request Indexing"');
console.log('5. Submit sitemap: https://outsourcesu.com/sitemap.xml');

console.log('\n📊 ADDITIONAL CHECKS:');
console.log('✅ Sitemap validation: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
console.log('✅ Robots.txt test: https://support.google.com/webmasters/answer/6062598');
console.log('✅ Mobile-friendly test: https://search.google.com/test/mobile-friendly');
console.log('✅ Page speed insights: https://pagespeed.web.dev/');

// Generate CSV for bulk submission
let csvContent = 'URL,Priority\n';
pages.forEach(page => {
    csvContent += `${domain}${page},High\n`;
});

fs.writeFileSync('priority-pages.csv', csvContent);
console.log('\n💾 Created priority-pages.csv for bulk tracking');
