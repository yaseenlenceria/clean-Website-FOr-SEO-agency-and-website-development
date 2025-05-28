
const fs = require('fs');
const cheerio = require('cheerio');

// Enhanced meta configurations for all pages
const metaConfigs = {
    'index.html': {
        title: 'OutsourceSU - Award-Winning SEO Agency UK | Digital Marketing Experts',
        description: 'OutsourceSU is the UK\'s leading SEO agency, helping businesses dominate search results and drive sustainable growth. Proven strategies for construction, professional services, and local businesses.',
        keywords: 'SEO agency UK, SEO services, digital marketing, construction SEO, professional services SEO, local SEO, search engine optimization',
        canonical: 'https://outsourcesu.com/',
        ogType: 'website'
    },
    'services.html': {
        title: 'Professional SEO Services UK | Digital Marketing Solutions',
        description: 'Comprehensive SEO services for UK businesses. Technical SEO, content marketing, local SEO, and specialized strategies for construction and professional services.',
        keywords: 'SEO services UK, professional SEO, technical SEO, local SEO, content marketing',
        canonical: 'https://outsourcesu.com/services.html',
        ogType: 'website'
    },
    'contact.html': {
        title: 'Contact OutsourceSU | Free SEO Consultation UK',
        description: 'Get your free SEO consultation from the UK\'s leading SEO agency. Contact OutsourceSU today for expert digital marketing advice and strategies.',
        keywords: 'SEO consultation UK, contact SEO agency, free SEO audit',
        canonical: 'https://outsourcesu.com/contact.html',
        ogType: 'website'
    },
    'about.html': {
        title: 'About OutsourceSU - UK\'s Leading SEO Agency',
        description: 'Learn about OutsourceSU, the UK\'s leading SEO agency. Our team of experts helps businesses dominate search results and drive sustainable growth.',
        keywords: 'about OutsourceSU, SEO agency team, UK SEO experts',
        canonical: 'https://outsourcesu.com/about.html',
        ogType: 'website'
    },
    'construction-seo.html': {
        title: 'Best Construction SEO Services UK | Construction Digital Marketing',
        description: 'Drive more qualified leads for your construction business with our specialized SEO strategies for contractors, builders, and trade professionals.',
        keywords: 'construction SEO, contractor SEO, builder SEO, construction digital marketing',
        canonical: 'https://outsourcesu.com/construction-seo.html',
        ogType: 'service'
    },
    'professional-services-seo.html': {
        title: 'Professional Services SEO UK | Law Firm, Dentist, Accountant SEO',
        description: 'Attract high-value clients with our specialized SEO strategies for law firms, dentists, accountants, and professional service providers.',
        keywords: 'professional services SEO, law firm SEO, dentist SEO, accountant SEO',
        canonical: 'https://outsourcesu.com/professional-services-seo.html',
        ogType: 'service'
    }
};

function optimizeAllPages() {
    console.log('🚀 Starting comprehensive SEO optimization...\n');

    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'));

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            console.log(`📄 Optimizing: ${file}`);

            // Add missing essential meta tags
            if (!$('meta[charset]').length) {
                $('head').prepend('<meta charset="UTF-8">');
            }

            if (!$('meta[name="viewport"]').length) {
                $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
            }

            // Add robots meta
            if (!$('meta[name="robots"]').length) {
                $('head').append('<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">');
            }

            if (!$('meta[name="googlebot"]').length) {
                $('head').append('<meta name="googlebot" content="index, follow">');
            }

            // Add Google Site Verification
            if (!$('meta[name="google-site-verification"]').length) {
                $('head').append('<meta name="google-site-verification" content="ornn-7cs4m1xk0nv5pm_0t7_uihoek2oopxudyrik4q">');
            }

            // Add/update meta tags from config
            const config = metaConfigs[file];
            if (config) {
                // Update title
                if ($('title').length) {
                    $('title').text(config.title);
                } else {
                    $('head').append(`<title>${config.title}</title>`);
                }

                // Update meta description
                if ($('meta[name="description"]').length) {
                    $('meta[name="description"]').attr('content', config.description);
                } else {
                    $('head').append(`<meta name="description" content="${config.description}">`);
                }

                // Add keywords
                if (!$('meta[name="keywords"]').length) {
                    $('head').append(`<meta name="keywords" content="${config.keywords}">`);
                }

                // Add canonical URL
                if (!$('link[rel="canonical"]').length) {
                    $('head').append(`<link rel="canonical" href="${config.canonical}">`);
                }

                // Add Open Graph tags
                if (!$('meta[property="og:title"]').length) {
                    $('head').append(`<meta property="og:title" content="${config.title}">`);
                }
                if (!$('meta[property="og:description"]').length) {
                    $('head').append(`<meta property="og:description" content="${config.description}">`);
                }
                if (!$('meta[property="og:type"]').length) {
                    $('head').append(`<meta property="og:type" content="${config.ogType || 'website'}">`);
                }
                if (!$('meta[property="og:url"]').length) {
                    $('head').append(`<meta property="og:url" content="${config.canonical}">`);
                }
                if (!$('meta[property="og:image"]').length) {
                    $('head').append('<meta property="og:image" content="https://outsourcesu.com/attached_assets/logo1.png">');
                }

                // Add Twitter Cards
                if (!$('meta[name="twitter:card"]').length) {
                    $('head').append('<meta name="twitter:card" content="summary_large_image">');
                }
                if (!$('meta[name="twitter:title"]').length) {
                    $('head').append(`<meta name="twitter:title" content="${config.title}">`);
                }
                if (!$('meta[name="twitter:description"]').length) {
                    $('head').append(`<meta name="twitter:description" content="${config.description}">`);
                }
            }

            // Add structured data for specific pages
            if (file === 'index.html' && !$('script[type="application/ld+json"]').length) {
                const structuredData = {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "OutsourceSU",
                    "url": "https://outsourcesu.com",
                    "logo": "https://outsourcesu.com/attached_assets/logo1.png",
                    "description": "UK's leading SEO agency helping businesses dominate search results and drive sustainable growth",
                    "telephone": "+447411575188",
                    "email": "info@outsourcesu.com",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "GB",
                        "addressRegion": "England"
                    },
                    "areaServed": {
                        "@type": "Country",
                        "name": "United Kingdom"
                    },
                    "sameAs": [
                        "https://facebook.com/outsourcesu",
                        "https://twitter.com/outsourcesu",
                        "https://linkedin.com/company/outsourcesu"
                    ]
                };
                $('head').append(`<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`);
            }

            // Add alt text to images missing it
            $('img').each((i, img) => {
                if (!$(img).attr('alt')) {
                    const src = $(img).attr('src') || '';
                    const fileName = src.split('/').pop() || '';
                    const altText = fileName.replace(/[-_]/g, ' ').replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
                    $(img).attr('alt', altText || 'OutsourceSU SEO Services');
                }
            });

            // Add missing lang attribute
            if (!$('html').attr('lang')) {
                $('html').attr('lang', 'en');
            }

            // Ensure proper heading structure
            const h1Count = $('h1').length;
            if (h1Count === 0) {
                console.log(`  ⚠️  No H1 tag found in ${file}`);
            } else if (h1Count > 1) {
                console.log(`  ⚠️  Multiple H1 tags found in ${file} (${h1Count})`);
            }

            fs.writeFileSync(file, $.html());
            console.log(`  ✅ Optimized ${file}`);

        } catch (error) {
            console.error(`  ❌ Error processing ${file}:`, error.message);
        }
    });

    console.log('\n🎉 SEO optimization completed!\n');
}

optimizeAllPages();
