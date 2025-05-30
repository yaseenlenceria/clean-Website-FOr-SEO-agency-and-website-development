
const fs = require('fs');
const cheerio = require('cheerio');

// Meta configurations for different page types
const metaConfigs = {
    'index.html': {
        title: 'OutsourceSU - Award-Winning SEO Agency UK | Digital Marketing Experts',
        description: 'OutsourceSU is the UK\'s leading SEO agency, helping businesses dominate search results and drive sustainable growth. Proven strategies for construction, professional services, and local businesses.',
        keywords: 'SEO agency UK, SEO services, digital marketing, construction SEO, professional services SEO, local SEO, search engine optimization',
        canonical: 'https://outsourcesu.com/'
    },
    'services.html': {
        title: 'Professional SEO Services UK | Digital Marketing Solutions',
        description: 'Comprehensive SEO services for UK businesses. Technical SEO, content marketing, local SEO, and specialized strategies for construction and professional services.',
        keywords: 'SEO services UK, professional SEO, technical SEO, local SEO, content marketing',
        canonical: 'https://outsourcesu.com/services.html'
    },
    'contact.html': {
        title: 'Contact OutsourceSU | Free SEO Consultation UK',
        description: 'Get your free SEO consultation from the UK\'s leading SEO agency. Contact OutsourceSU today for expert digital marketing advice and strategies.',
        keywords: 'SEO consultation UK, contact SEO agency, free SEO audit',
        canonical: 'https://outsourcesu.com/contact.html'
    }
};

function optimizeMetaTags() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'));

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            // Add missing meta tags - IDENTICAL for mobile and desktop
            if (!$('meta[name="robots"]').length) {
                $('head').append('<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">');
            }
            
            if (!$('meta[name="googlebot"]').length) {
                $('head').append('<meta name="googlebot" content="index, follow">');
            }
            
            // Mobile-first indexing compliance
            if (!$('meta[name="googlebot-mobile"]').length) {
                $('head').append('<meta name="googlebot-mobile" content="index, follow">');
            }
            
            // Ensure mobile viewport is properly set
            const viewport = $('meta[name="viewport"]');
            if (viewport.length) {
                viewport.attr('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
            }
            
            // Add viewport if missing
            if (!$('meta[name="viewport"]').length) {
                $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
            }
            
            // Add charset if missing
            if (!$('meta[charset]').length) {
                $('head').prepend('<meta charset="UTF-8">');
            }
            
            // Add canonical URL if missing
            const config = metaConfigs[file];
            if (config && !$('link[rel="canonical"]').length) {
                $('head').append(`<link rel="canonical" href="${config.canonical}">`);
            }
            
            // Add structured data for pages
            if (file === 'index.html') {
                const structuredData = {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "OutsourceSU",
                    "url": "https://outsourcesu.com",
                    "logo": "https://outsourcesu.com/attached_assets/logo1.png",
                    "description": "UK's leading SEO agency helping businesses dominate search results",
                    "telephone": "+447411575188",
                    "email": "info@outsourcesu.com",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "GB"
                    },
                    "sameAs": [
                        "https://facebook.com/outsourcesu",
                        "https://twitter.com/outsourcesu",
                        "https://linkedin.com/company/outsourcesu"
                    ]
                };
                
                $('head').append(`<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`);
            }
            
            fs.writeFileSync(file, $.html());
            console.log(`Optimized meta tags for ${file}`);
            
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    });
}

optimizeMetaTags();
