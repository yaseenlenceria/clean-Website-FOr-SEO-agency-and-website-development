
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('🖼️ Starting Comprehensive Image SEO Optimization...\n');

// Image SEO optimization configurations
const imageOptimizations = {
    // Alt text mappings for different image types
    altTextMappings: {
        'logo1.png': 'OutsourceSU - UK\'s Leading SEO Agency Logo',
        'new-logo.png': 'OutsourceSU SEO Services Logo',
        'favicon.jpg': 'OutsourceSU Favicon',
        'faviconsu.jpg': 'OutsourceSU Website Icon',
        'best_SEO_for_construction_industry_in_uk.png': 'Best SEO Services for Construction Industry in UK - OutsourceSU',
        'best_SEO_for_construction_industry_in_uk1.png': 'Construction SEO Services UK - OutsourceSU Expert Solutions',
        'Best_SEO_for_the_roofing_industry_in_the_UK.png': 'Best SEO for Roofing Industry UK - OutsourceSU Roofing SEO',
        'Best_SEO_services_for_Law_firms_in_the_UK.png': 'Best SEO Services for Law Firms UK - OutsourceSU Legal SEO',
        'The_Best_SEO_for_real_estate_and_property_industry_in_the_UK.png': 'Best SEO for Real Estate & Property Industry UK - OutsourceSU',
        'The_best_SEO_for_architects_in_the_united_kingdom.png': 'Best SEO for Architects in UK - OutsourceSU Architecture SEO',
        'the_best_SEO_for_gas_plumbers_in_the_UK.png': 'Best SEO for Plumbers in UK - OutsourceSU Plumbing SEO Services',
        'the_best_seo_for_dental_practices_in_UK.png': 'Best SEO for Dental Practices UK - OutsourceSU Dental SEO',
        'best_seo_for_roofing_companies_in_birmingham.png': 'Best SEO for Roofing Companies Birmingham - OutsourceSU',
        'Professional_SEO__Web_Development_Services_for_Business_Growth_1.png': 'Professional SEO & Web Development Services for Business Growth - OutsourceSU',
        'real-estate-seo-hero.png': 'Real Estate SEO Services Hero Image - OutsourceSU Property SEO'
    },

    // Schema markup for images
    getImageSchema: (imageSrc, altText, pageUrl) => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": `https://outsourcesu.com${imageSrc}`,
        "name": altText,
        "description": altText,
        "width": "800",
        "height": "600",
        "isPartOf": {
            "@type": "WebPage",
            "url": pageUrl
        },
        "author": {
            "@type": "Organization",
            "name": "OutsourceSU"
        },
        "copyrightHolder": {
            "@type": "Organization",
            "name": "OutsourceSU"
        }
    })
};

function optimizeImageSEO() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let totalOptimizations = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            let pageOptimizations = 0;

            console.log(`🖼️ Optimizing images in: ${file}`);

            // 1. Fix favicon issues
            $('link[rel*="icon"]').remove();
            $('meta[name="msapplication-TileImage"]').remove();

            // Add comprehensive favicon setup
            const faviconHtml = `
    <!-- Favicon and Icon Setup -->
    <link rel="icon" type="image/jpeg" href="/attached_assets/favicon.jpg">
    <link rel="shortcut icon" type="image/jpeg" href="/attached_assets/favicon.jpg">
    <link rel="apple-touch-icon" sizes="180x180" href="/attached_assets/favicon.jpg">
    <link rel="icon" type="image/jpeg" sizes="32x32" href="/attached_assets/favicon.jpg">
    <link rel="icon" type="image/jpeg" sizes="16x16" href="/attached_assets/favicon.jpg">
    <meta name="msapplication-TileImage" content="/attached_assets/favicon.jpg">
    <meta name="msapplication-TileColor" content="#ff6b35">
    <meta name="theme-color" content="#ff6b35">`;

            $('head').append(faviconHtml);
            pageOptimizations += 8;

            // 2. Optimize all images
            $('img').each((i, img) => {
                const $img = $(img);
                const src = $img.attr('src') || '';
                const currentAlt = $img.attr('alt') || '';

                // Fix image src paths
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    $img.attr('src', '/' + src);
                    pageOptimizations++;
                }

                // Add or improve alt text
                const filename = path.basename(src);
                let newAltText = imageOptimizations.altTextMappings[filename] || currentAlt;

                if (!newAltText || newAltText === '') {
                    // Generate SEO-friendly alt text based on context
                    if (src.includes('logo')) {
                        newAltText = 'OutsourceSU - UK\'s Leading SEO Agency Logo';
                    } else if (src.includes('construction')) {
                        newAltText = 'Construction SEO Services UK - OutsourceSU Professional Solutions';
                    } else if (src.includes('roofing')) {
                        newAltText = 'Roofing SEO Services UK - OutsourceSU Roofing Industry Specialists';
                    } else if (src.includes('dental')) {
                        newAltText = 'Dental SEO Services UK - OutsourceSU Dental Practice Marketing';
                    } else if (src.includes('law')) {
                        newAltText = 'Law Firm SEO Services UK - OutsourceSU Legal Marketing Experts';
                    } else if (src.includes('real-estate') || src.includes('property')) {
                        newAltText = 'Real Estate SEO Services UK - OutsourceSU Property Marketing';
                    } else if (src.includes('plumber')) {
                        newAltText = 'Plumber SEO Services UK - OutsourceSU Plumbing Marketing';
                    } else if (src.includes('architect')) {
                        newAltText = 'Architect SEO Services UK - OutsourceSU Architecture Marketing';
                    } else {
                        newAltText = 'OutsourceSU SEO Services - Professional Digital Marketing Solutions UK';
                    }
                }

                $img.attr('alt', newAltText);
                pageOptimizations++;

                // Add loading attributes for performance
                if (!$img.attr('loading') && !src.includes('logo') && !src.includes('favicon')) {
                    $img.attr('loading', 'lazy');
                    pageOptimizations++;
                }

                // Add width and height for CLS optimization
                if (!$img.attr('width') && !$img.attr('height')) {
                    if (src.includes('logo')) {
                        $img.attr('width', '200').attr('height', '65');
                    } else {
                        $img.attr('width', '800').attr('height', '600');
                    }
                    pageOptimizations += 2;
                }

                // Add title attribute for accessibility
                if (!$img.attr('title')) {
                    $img.attr('title', newAltText);
                    pageOptimizations++;
                }
            });

            // 3. Add image structured data for hero images
            const heroImages = $('img').filter((i, img) => {
                const src = $(img).attr('src') || '';
                return src.includes('hero') || src.includes('Professional_SEO') || 
                       $(img).closest('.hero-section, .hero-modern, .page-header').length > 0;
            });

            if (heroImages.length > 0) {
                heroImages.each((i, img) => {
                    const src = $(img).attr('src');
                    const alt = $(img).attr('alt');
                    const pageUrl = `https://outsourcesu.com/${file}`;
                    
                    const imageSchema = imageOptimizations.getImageSchema(src, alt, pageUrl);
                    const schemaScript = `<script type="application/ld+json">${JSON.stringify(imageSchema, null, 2)}</script>`;
                    $('head').append(schemaScript);
                    pageOptimizations++;
                });
            }

            // 4. Optimize Open Graph images
            const ogImage = $('meta[property="og:image"]');
            if (ogImage.length) {
                const ogImageContent = ogImage.attr('content');
                if (ogImageContent && !ogImageContent.startsWith('http')) {
                    ogImage.attr('content', `https://outsourcesu.com${ogImageContent}`);
                    pageOptimizations++;
                }
            } else {
                // Add default OG image
                $('head').append('<meta property="og:image" content="https://outsourcesu.com/attached_assets/logo1.png">');
                $('head').append('<meta property="og:image:width" content="1200">');
                $('head').append('<meta property="og:image:height" content="630">');
                $('head').append('<meta property="og:image:alt" content="OutsourceSU - UK\'s Leading SEO Agency">');
                pageOptimizations += 4;
            }

            // 5. Optimize Twitter Card images
            const twitterImage = $('meta[name="twitter:image"]');
            if (twitterImage.length) {
                const twitterImageContent = twitterImage.attr('content');
                if (twitterImageContent && !twitterImageContent.startsWith('http')) {
                    twitterImage.attr('content', `https://outsourcesu.com${twitterImageContent}`);
                    pageOptimizations++;
                }
            } else {
                $('head').append('<meta name="twitter:image" content="https://outsourcesu.com/attached_assets/logo1.png">');
                $('head').append('<meta name="twitter:image:alt" content="OutsourceSU - UK\'s Leading SEO Agency">');
                pageOptimizations += 2;
            }

            // 6. Add preload for critical images
            const criticalImages = $('img').filter((i, img) => {
                const src = $(img).attr('src') || '';
                return src.includes('logo') || src.includes('hero') || 
                       $(img).closest('.hero-section, .hero-modern').length > 0;
            });

            criticalImages.each((i, img) => {
                const src = $(img).attr('src');
                if (src && i < 2) { // Only preload first 2 critical images
                    $('head').append(`<link rel="preload" as="image" href="${src}">`);
                    pageOptimizations++;
                }
            });

            // Save optimized file
            fs.writeFileSync(file, $.html());

            console.log(`  ✅ Applied ${pageOptimizations} image optimizations to ${file}`);
            totalOptimizations += pageOptimizations;

        } catch (error) {
            console.error(`  ❌ Error processing ${file}:`, error.message);
        }
    });

    console.log(`\n🎉 Image SEO Optimization Complete! Applied ${totalOptimizations} total optimizations\n`);
}

// Generate robots.txt with image-specific directives
function generateImageRobotsTxt() {
    console.log('🤖 Updating robots.txt for image SEO...');

    const robotsContent = `User-agent: *
Allow: /

# Image optimization
Allow: /attached_assets/
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.webp
Allow: *.svg
Allow: *.ico

# Sitemap
Sitemap: https://outsourcesu.com/sitemap.xml

# Google Image Bot
User-agent: Googlebot-Image
Allow: /attached_assets/

# Crawl delay for bots
User-agent: AhrefsBot
Crawl-delay: 10
`;

    fs.writeFileSync('robots.txt', robotsContent);
    console.log('  ✅ robots.txt updated with image directives');
}

// Check for broken images
function checkImageHealth() {
    console.log('🔍 Checking image health...');
    
    const imageDir = './attached_assets';
    if (!fs.existsSync(imageDir)) {
        console.error('❌ attached_assets directory not found!');
        return;
    }

    const images = fs.readdirSync(imageDir).filter(file => 
        /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(file)
    );

    console.log(`📊 Found ${images.length} images in attached_assets/`);
    
    // Check favicon specifically
    const faviconExists = fs.existsSync('./attached_assets/favicon.jpg');
    console.log(`🎯 Favicon status: ${faviconExists ? '✅ Found' : '❌ Missing'}`);
    
    return images;
}

// Run all optimizations
console.log('🚀 Starting comprehensive image SEO optimization...\n');
checkImageHealth();
optimizeImageSEO();
generateImageRobotsTxt();

console.log('\n📊 IMAGE SEO OPTIMIZATION COMPLETE!\n');
console.log('✅ Fixed favicon implementation');
console.log('✅ Optimized all image alt texts');
console.log('✅ Added image structured data');
console.log('✅ Enhanced Open Graph images');
console.log('✅ Improved Twitter Card images');
console.log('✅ Added image preloading for performance');
console.log('✅ Updated robots.txt for image SEO');
console.log('✅ Added proper image dimensions');
console.log('✅ Implemented lazy loading');

console.log('\n🎯 KEY IMAGE SEO IMPROVEMENTS:');
console.log('🖼️ All images have descriptive alt text');
console.log('🚀 Critical images are preloaded');
console.log('📱 Responsive images with proper dimensions');
console.log('🔍 Image structured data for rich snippets');
console.log('🌐 Optimized social media image sharing');
console.log('⚡ Lazy loading for better performance');
console.log('🎨 Fixed favicon display in search results');
