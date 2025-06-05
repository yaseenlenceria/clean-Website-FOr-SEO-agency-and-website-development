
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('🖼️ Generating Image Sitemap for Google Search...\n');

const domain = 'https://outsourcesu.com';
const currentDate = new Date().toISOString();

// Image metadata configurations
const imageMetadata = {
    'logo1.png': {
        caption: 'OutsourceSU - UK\'s Leading SEO Agency Logo',
        geoLocation: 'London, UK',
        title: 'OutsourceSU SEO Agency Logo',
        license: 'https://outsourcesu.com/terms-of-service.html'
    },
    'Professional_SEO__Web_Development_Services_for_Business_Growth_1.png': {
        caption: 'Professional SEO & Web Development Services for Business Growth',
        geoLocation: 'United Kingdom',
        title: 'OutsourceSU Professional SEO Services',
        license: 'https://outsourcesu.com/terms-of-service.html'
    },
    'best_SEO_for_construction_industry_in_uk.png': {
        caption: 'Best SEO Services for Construction Industry in UK',
        geoLocation: 'United Kingdom',
        title: 'Construction SEO Services UK',
        license: 'https://outsourcesu.com/terms-of-service.html'
    },
    'Best_SEO_for_the_roofing_industry_in_the_UK.png': {
        caption: 'Best SEO for Roofing Industry UK',
        geoLocation: 'United Kingdom',
        title: 'Roofing SEO Services UK',
        license: 'https://outsourcesu.com/terms-of-service.html'
    },
    'favicon.png': {
        caption: 'OutsourceSU Website Icon',
        geoLocation: 'United Kingdom',
        title: 'OutsourceSU Favicon',
        license: 'https://outsourcesu.com/terms-of-service.html'
    }
};

function generateImageSitemap() {
    // Get all HTML files
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let imageSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    let totalImages = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            // Get page URL
            let pageUrl;
            if (file === 'index.html') {
                pageUrl = `${domain}/`;
            } else {
                pageUrl = `${domain}/${file.replace('.html', '')}`;
            }

            // Find all images on this page
            const images = [];
            $('img').each((i, img) => {
                const src = $(img).attr('src');
                const alt = $(img).attr('alt') || '';
                
                if (src && !src.startsWith('data:') && !src.includes('placeholder')) {
                    // Ensure proper URL format
                    let imageUrl = src;
                    if (!imageUrl.startsWith('http')) {
                        if (imageUrl.startsWith('/')) {
                            imageUrl = `${domain}${imageUrl}`;
                        } else {
                            imageUrl = `${domain}/${imageUrl}`;
                        }
                    }

                    const filename = path.basename(src);
                    const metadata = imageMetadata[filename] || {
                        caption: alt || 'OutsourceSU SEO Services',
                        geoLocation: 'United Kingdom',
                        title: alt || 'OutsourceSU SEO Services',
                        license: 'https://outsourcesu.com/terms-of-service.html'
                    };

                    images.push({
                        url: imageUrl,
                        caption: metadata.caption,
                        geoLocation: metadata.geoLocation,
                        title: metadata.title,
                        license: metadata.license
                    });
                }
            });

            // Add page with images to sitemap
            if (images.length > 0) {
                imageSitemapContent += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${currentDate}</lastmod>`;

                images.forEach(image => {
                    imageSitemapContent += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:geo_location>${image.geoLocation}</image:geo_location>
      <image:title>${image.title}</image:title>
      <image:license>${image.license}</image:license>
    </image:image>`;
                    totalImages++;
                });

                imageSitemapContent += `
  </url>`;
            }

        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });

    imageSitemapContent += `
</urlset>`;

    // Write image sitemap
    fs.writeFileSync('image-sitemap.xml', imageSitemapContent);
    
    console.log(`✅ Image sitemap generated with ${totalImages} images`);
    console.log(`📍 Image sitemap URL: ${domain}/image-sitemap.xml`);
    
    return totalImages;
}

// Update main sitemap to include image sitemap
function updateMainSitemap() {
    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${domain}/image-sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

    fs.writeFileSync('sitemap-index.xml', sitemapIndexContent);
    console.log('✅ Main sitemap index updated');
}

// Generate robots.txt with image sitemap reference
function updateRobotsTxt() {
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

# Sitemaps
Sitemap: ${domain}/sitemap-index.xml
Sitemap: ${domain}/sitemap.xml
Sitemap: ${domain}/image-sitemap.xml

# Google Image Bot
User-agent: Googlebot-Image
Allow: /attached_assets/
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.webp
Allow: *.svg
Allow: *.ico

# Crawl delay for bots
User-agent: AhrefsBot
Crawl-delay: 10
`;

    fs.writeFileSync('robots.txt', robotsContent);
    console.log('✅ robots.txt updated with image sitemap');
}

// Run image sitemap generation
const imageCount = generateImageSitemap();
updateMainSitemap();
updateRobotsTxt();

console.log('\n🎉 Image SEO Optimization Complete!');
console.log(`📊 Generated image sitemap with ${imageCount} images`);
console.log('🔍 Submit your image sitemap to Google Search Console');
console.log(`📍 Image Sitemap URL: ${domain}/image-sitemap.xml`);
console.log(`📍 Main Sitemap Index: ${domain}/sitemap-index.xml`);
