
// This script helps identify all pages that need to be updated
// Run this in browser console on any page to get list of HTML files

const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'analytics.js',
    'best-accountants-seo.html',
    'best-architects-seo.html', 
    'best-dentists-seo.html',
    'best-financial-seo.html',
    'best-law-firm-seo.html',
    'best-plumbers-seo.html',
    'best-roofing-companies-london.html',
    'best-roofing-companies-seo.html',
    'best-roofing-company-seo.html',
    'best-roofing-seo-specialists.html',
    'best-seo-agency-manchester.html',
    'careers.html',
    'commercial-roofing-seo.html',
    'construction-seo.html',
    'contact.html',
    'cookie-policy.html',
    'google-site-verification.html',
    'index.html',
    'our-work.html',
    'privacy-policy.html',
    'process-components.html',
    'professional-seo-services-uk.html',
    'professional-services-seo.html',
    'real-estate-seo.html',
    'roof-repair-seo.html',
    'roof-replacement-seo.html',
    'roofer-seo.html',
    'roofing-company-rankings.html',
    'roofing-seo-services-uk.html',
    'seo-agency-birmingham.html',
    'services.html',
    'terms-of-service.html',
    'top-10-roofing-companies-birmingham.html',
    'top-10-roofing-companies-london.html',
    'top-10-roofing-companies-manchester.html',
    'white-label-seo.html'
];

console.log('HTML files that need header/footer updates:');
htmlFiles.forEach(file => {
    if (file.endsWith('.html')) {
        console.log(file);
    }
});
