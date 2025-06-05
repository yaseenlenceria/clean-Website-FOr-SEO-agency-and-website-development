
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('🔍 Advanced Image SEO Optimization for Google Search Results...\n');

// Enhanced SEO configurations for images
const advancedImageSEO = {
    // Industry-specific alt text patterns
    industryKeywords: {
        'construction': 'Construction SEO Services UK - Professional Building Industry Marketing',
        'roofing': 'Roofing SEO Services UK - Expert Roofer Digital Marketing Solutions',
        'dental': 'Dental SEO Services UK - Professional Dental Practice Marketing',
        'law': 'Law Firm SEO Services UK - Legal Practice Digital Marketing',
        'real-estate': 'Real Estate SEO Services UK - Property Marketing Specialists',
        'plumber': 'Plumber SEO Services UK - Professional Plumbing Marketing',
        'architect': 'Architect SEO Services UK - Architecture Firm Digital Marketing',
        'medical': 'Medical SEO Services UK - Healthcare Practice Marketing',
        'accountant': 'Accountant SEO Services UK - Accounting Firm Digital Marketing',
        'contractor': 'Contractor SEO Services UK - Trade Professional Marketing'
    },

    // City-specific keywords for local SEO
    cityKeywords: {
        'london': 'London',
        'manchester': 'Manchester', 
        'birmingham': 'Birmingham',
        'glasgow': 'Glasgow',
        'leeds': 'Leeds',
        'liverpool': 'Liverpool',
        'newcastle': 'Newcastle',
        'galway': 'Galway'
    },

    // Rich snippet schema for images
    getImageSchema: (imageUrl, altText, pageTitle, industry) => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": imageUrl,
        "name": altText,
        "description": altText,
        "width": "800",
        "height": "600",
        "encodingFormat": "image/png",
        "contentUrl": imageUrl,
        "caption": altText,
        "creator": {
            "@type": "Organization",
            "name": "OutsourceSU",
            "url": "https://outsourcesu.com"
        },
        "copyrightHolder": {
            "@type": "Organization", 
            "name": "OutsourceSU"
        },
        "license": "https://outsourcesu.com/terms-of-service.html",
        "acquireLicensePage": "https://outsourcesu.com/contact",
        "creditText": "OutsourceSU - UK's Leading SEO Agency",
        "isPartOf": {
            "@type": "WebPage",
            "name": pageTitle,
            "url": `https://outsourcesu.com/${pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        },
        "about": {
            "@type": "Service",
            "serviceType": `${industry} SEO Services`,
            "provider": {
                "@type": "Organization",
                "name": "OutsourceSU"
            }
        }
    })
};

function optimizeImagesForGoogleSearch() {
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

            console.log(`🖼️ Optimizing images for Google Search in: ${file}`);

            // Detect page industry and location from filename/content
            const pageIndustry = detectIndustry(file, $('title').text());
            const pageCity = detectCity(file, $('title').text());
            const pageTitle = $('title').text() || file.replace('.html', '');

            // 1. Optimize all images with enhanced SEO
            $('img').each((i, img) => {
                const $img = $(img);
                const src = $img.attr('src') || '';
                const currentAlt = $img.attr('alt') || '';

                // Ensure proper URL format
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    $img.attr('src', '/' + src);
                    pageOptimizations++;
                }

                // Generate SEO-optimized alt text
                const optimizedAlt = generateSEOAltText(src, currentAlt, pageIndustry, pageCity, file);
                $img.attr('alt', optimizedAlt);
                pageOptimizations++;

                // Add title attribute for better accessibility and SEO
                $img.attr('title', optimizedAlt);
                pageOptimizations++;

                // Add proper dimensions for CLS optimization
                if (!$img.attr('width') || !$img.attr('height')) {
                    if (src.includes('logo')) {
                        $img.attr('width', '200').attr('height', '65');
                    } else {
                        $img.attr('width', '800').attr('height', '600');
                    }
                    pageOptimizations += 2;
                }

                // Add loading optimization
                if (!src.includes('logo') && !src.includes('favicon') && !$img.attr('loading')) {
                    $img.attr('loading', 'lazy');
                    pageOptimizations++;
                }

                // Add fetchpriority for hero images
                if (src.includes('hero') || src.includes('Professional_SEO') || i === 0) {
                    $img.attr('fetchpriority', 'high');
                    pageOptimizations++;
                }

                // Add decoding attribute for performance
                $img.attr('decoding', 'async');
                pageOptimizations++;

                // Add data attributes for SEO tools
                $img.attr('data-seo-optimized', 'true');
                $img.attr('data-industry', pageIndustry);
                if (pageCity) $img.attr('data-location', pageCity);
                pageOptimizations += 2;
            });

            // 2. Add image structured data for the main hero image
            const heroImage = $('img').first();
            if (heroImage.length) {
                const heroSrc = heroImage.attr('src');
                const heroAlt = heroImage.attr('alt');
                if (heroSrc && heroAlt) {
                    const fullImageUrl = heroSrc.startsWith('http') ? heroSrc : `https://outsourcesu.com${heroSrc}`;
                    const imageSchema = advancedImageSEO.getImageSchema(fullImageUrl, heroAlt, pageTitle, pageIndustry);
                    
                    // Remove existing image schema to avoid duplicates
                    $('script[type="application/ld+json"]').each((i, script) => {
                        if ($(script).html().includes('ImageObject')) {
                            $(script).remove();
                        }
                    });

                    $('head').append(`<script type="application/ld+json">${JSON.stringify(imageSchema, null, 2)}</script>`);
                    pageOptimizations++;
                }
            }

            // 3. Optimize Open Graph images with better metadata
            let ogImage = $('meta[property="og:image"]');
            if (ogImage.length) {
                const ogContent = ogImage.attr('content');
                if (ogContent && !ogContent.startsWith('http')) {
                    ogImage.attr('content', `https://outsourcesu.com${ogContent}`);
                }
            } else {
                // Add comprehensive OG image tags
                $('head').append('<meta property="og:image" content="https://outsourcesu.com/attached_assets/Professional_SEO__Web_Development_Services_for_Business_Growth_1.png">');
                pageOptimizations++;
            }

            // Add additional OG image properties
            if (!$('meta[property="og:image:width"]').length) {
                $('head').append('<meta property="og:image:width" content="1200">');
                $('head').append('<meta property="og:image:height" content="630">');
                $('head').append('<meta property="og:image:type" content="image/png">');
                $('head').append(`<meta property="og:image:alt" content="OutsourceSU ${pageIndustry} SEO Services - UK's Leading Digital Marketing Agency">`);
                pageOptimizations += 4;
            }

            // 4. Optimize Twitter Card images
            if (!$('meta[name="twitter:image"]').length) {
                $('head').append('<meta name="twitter:image" content="https://outsourcesu.com/attached_assets/Professional_SEO__Web_Development_Services_for_Business_Growth_1.png">');
                $('head').append(`<meta name="twitter:image:alt" content="OutsourceSU ${pageIndustry} SEO Services UK">`);
                pageOptimizations += 2;
            }

            // 5. Add image preloading for critical images
            const criticalImages = $('img').slice(0, 2); // First 2 images
            criticalImages.each((i, img) => {
                const src = $(img).attr('src');
                if (src && !$(`link[rel="preload"][href="${src}"]`).length) {
                    $('head').append(`<link rel="preload" as="image" href="${src}" fetchpriority="high">`);
                    pageOptimizations++;
                }
            });

            // 6. Add image sitemap reference in head
            if (!$('link[rel="sitemap"][title*="Image"]').length) {
                $('head').append('<link rel="sitemap" type="application/xml" title="Image Sitemap" href="/image-sitemap.xml">');
                pageOptimizations++;
            }

            // Save optimized file
            fs.writeFileSync(file, $.html());

            console.log(`  ✅ Applied ${pageOptimizations} advanced image SEO optimizations to ${file}`);
            totalOptimizations += pageOptimizations;

        } catch (error) {
            console.error(`  ❌ Error processing ${file}:`, error.message);
        }
    });

    console.log(`\n🎉 Advanced Image SEO Complete! Applied ${totalOptimizations} total optimizations\n`);
}

function detectIndustry(filename, pageTitle) {
    const text = (filename + ' ' + pageTitle).toLowerCase();
    
    for (const [industry, keywords] of Object.entries(advancedImageSEO.industryKeywords)) {
        if (text.includes(industry)) {
            return industry.charAt(0).toUpperCase() + industry.slice(1);
        }
    }
    
    return 'SEO Services';
}

function detectCity(filename, pageTitle) {
    const text = (filename + ' ' + pageTitle).toLowerCase();
    
    for (const [city, name] of Object.entries(advancedImageSEO.cityKeywords)) {
        if (text.includes(city)) {
            return name;
        }
    }
    
    return 'UK';
}

function generateSEOAltText(src, currentAlt, industry, city, filename) {
    const filename_lower = src.toLowerCase();
    
    // If already has good alt text, enhance it
    if (currentAlt && currentAlt.length > 20 && currentAlt.includes('OutsourceSU')) {
        return currentAlt;
    }
    
    // Logo images
    if (filename_lower.includes('logo')) {
        return 'OutsourceSU - UK\'s Leading SEO Agency Logo - Professional Digital Marketing Services';
    }
    
    // Favicon
    if (filename_lower.includes('favicon')) {
        return 'OutsourceSU Website Icon - UK SEO Agency Favicon';
    }
    
    // Industry-specific images
    if (filename_lower.includes('construction')) {
        return `Best ${industry} SEO Services in ${city} - OutsourceSU Professional Construction Digital Marketing Solutions`;
    }
    
    if (filename_lower.includes('roofing')) {
        return `Best Roofing SEO Services in ${city} - OutsourceSU Expert Roofer Digital Marketing Agency`;
    }
    
    if (filename_lower.includes('dental')) {
        return `Best Dental SEO Services in ${city} - OutsourceSU Professional Dental Practice Marketing`;
    }
    
    if (filename_lower.includes('law')) {
        return `Best Law Firm SEO Services in ${city} - OutsourceSU Legal Practice Digital Marketing Experts`;
    }
    
    if (filename_lower.includes('real-estate') || filename_lower.includes('property')) {
        return `Best Real Estate SEO Services in ${city} - OutsourceSU Property Marketing Specialists`;
    }
    
    if (filename_lower.includes('plumber')) {
        return `Best Plumber SEO Services in ${city} - OutsourceSU Professional Plumbing Marketing Solutions`;
    }
    
    if (filename_lower.includes('architect')) {
        return `Best Architect SEO Services in ${city} - OutsourceSU Architecture Firm Digital Marketing`;
    }
    
    // Hero/main images
    if (filename_lower.includes('professional_seo') || filename_lower.includes('hero')) {
        return `OutsourceSU Professional SEO & Web Development Services for Business Growth - ${city}'s Leading Digital Marketing Agency`;
    }
    
    // Default enhanced alt text
    return `OutsourceSU ${industry} SEO Services ${city} - UK's Leading Digital Marketing Agency with 500+ Clients Ranking #1`;
}

// Create comprehensive image sitemap with enhanced metadata
function createEnhancedImageSitemap() {
    console.log('🗺️ Creating enhanced image sitemap for Google...');
    
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    let totalImages = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            const pageUrl = file === 'index.html' ? 'https://outsourcesu.com/' : `https://outsourcesu.com/${file.replace('.html', '')}`;
            const pageIndustry = detectIndustry(file, $('title').text());
            const pageCity = detectCity(file, $('title').text());
            
            const images = [];
            $('img').each((i, img) => {
                const src = $(img).attr('src');
                const alt = $(img).attr('alt') || '';
                
                if (src && !src.startsWith('data:') && !src.includes('placeholder')) {
                    const imageUrl = src.startsWith('http') ? src : `https://outsourcesu.com${src}`;
                    
                    images.push({
                        url: imageUrl,
                        caption: alt,
                        title: alt,
                        license: 'https://outsourcesu.com/terms-of-service.html',
                        geoLocation: `${pageCity}, United Kingdom`
                    });
                }
            });

            if (images.length > 0) {
                sitemapContent += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>`;

                images.forEach(image => {
                    sitemapContent += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
      <image:license>${image.license}</image:license>
      <image:geo_location>${image.geoLocation}</image:geo_location>
    </image:image>`;
                    totalImages++;
                });

                sitemapContent += `
  </url>`;
            }

        } catch (error) {
            console.error(`Error processing ${file} for sitemap:`, error.message);
        }
    });

    sitemapContent += `
</urlset>`;

    fs.writeFileSync('image-sitemap.xml', sitemapContent);
    console.log(`✅ Enhanced image sitemap created with ${totalImages} images`);
}

// Update robots.txt for image SEO
function updateRobotsForImages() {
    console.log('🤖 Updating robots.txt for image SEO...');

    const robotsContent = `User-agent: *
Allow: /

# Image optimization for Google Search
Allow: /attached_assets/
Allow: *.png$
Allow: *.jpg$
Allow: *.jpeg$
Allow: *.gif$
Allow: *.webp$
Allow: *.svg$
Allow: *.ico$

# Sitemaps
Sitemap: https://outsourcesu.com/sitemap-index.xml
Sitemap: https://outsourcesu.com/sitemap.xml
Sitemap: https://outsourcesu.com/image-sitemap.xml

# Google Image Bot specific rules
User-agent: Googlebot-Image
Allow: /attached_assets/
Allow: *.png$
Allow: *.jpg$
Allow: *.jpeg$
Allow: *.gif$
Allow: *.webp$
Allow: *.svg$
Allow: *.ico$

# Crawl delay for SEO tools
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10
`;

    fs.writeFileSync('robots.txt', robotsContent);
    console.log('✅ robots.txt updated for enhanced image SEO');
}

// Run all optimizations
console.log('🚀 Starting advanced image SEO optimization for Google Search...\n');
optimizeImagesForGoogleSearch();
createEnhancedImageSitemap();
updateRobotsForImages();

console.log('\n📊 ADVANCED IMAGE SEO OPTIMIZATION COMPLETE!\n');
console.log('✅ Industry-specific alt text optimization');
console.log('✅ Location-based image targeting');
console.log('✅ Enhanced structured data for images');
console.log('✅ Comprehensive image sitemap');
console.log('✅ Optimized Open Graph & Twitter images');
console.log('✅ Image preloading for performance');
console.log('✅ Google Image Bot optimization');
console.log('✅ Rich snippet image markup');

console.log('\n🎯 GOOGLE SEARCH VISIBILITY IMPROVEMENTS:');
console.log('🔍 Images optimized for Google Image Search');
console.log('📍 Location-based image SEO');
console.log('🏢 Industry-specific image targeting');
console.log('⚡ Core Web Vitals image optimization');
console.log('🖼️ Rich snippet image support');
console.log('📱 Mobile-first image indexing');
console.log('🌐 Enhanced social media image sharing');

console.log('\n📈 NEXT STEPS:');
console.log('1. Submit image sitemap to Google Search Console');
console.log('2. Monitor image performance in Google Search Console');
console.log('3. Check image indexing status in Google Image Search');
console.log('4. Test images with Google Rich Results Test');
