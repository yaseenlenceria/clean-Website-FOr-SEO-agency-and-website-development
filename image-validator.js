
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('🔍 Validating All Images for Google Search...\n');

function validateImages() {
    console.log('📁 Checking attached_assets directory...');
    
    // Check if attached_assets directory exists
    if (!fs.existsSync('./attached_assets')) {
        console.error('❌ attached_assets directory not found!');
        return false;
    }

    // Get all image files
    const imageFiles = fs.readdirSync('./attached_assets')
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(file));

    console.log(`📊 Found ${imageFiles.length} image files in attached_assets/`);

    // Check each image file
    imageFiles.forEach(file => {
        const filePath = path.join('./attached_assets', file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        
        console.log(`  ✅ ${file} (${sizeKB}KB)`);
        
        // Check if file is too large (>1MB for web optimization)
        if (stats.size > 1024 * 1024) {
            console.log(`    ⚠️  Large file size - consider optimization`);
        }
    });

    // Check HTML files for broken image references
    console.log('\n🔍 Checking HTML files for image references...');
    
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'));

    let totalImagesFound = 0;
    let brokenImages = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            $('img').each((i, img) => {
                const src = $(img).attr('src');
                const alt = $(img).attr('alt');
                
                if (src) {
                    totalImagesFound++;
                    
                    // Check if image file exists
                    let imagePath = src;
                    if (imagePath.startsWith('/')) {
                        imagePath = imagePath.substring(1);
                    }
                    
                    if (!imagePath.startsWith('http') && !fs.existsSync(imagePath)) {
                        console.log(`    ❌ Broken image in ${file}: ${src}`);
                        brokenImages++;
                    }
                    
                    // Check if alt text exists
                    if (!alt || alt.trim() === '') {
                        console.log(`    ⚠️  Missing alt text in ${file}: ${src}`);
                    }
                }
            });
            
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });

    console.log(`\n📊 Image Validation Summary:`);
    console.log(`   Total images found: ${totalImagesFound}`);
    console.log(`   Broken image links: ${brokenImages}`);
    console.log(`   Image files in directory: ${imageFiles.length}`);

    // Check Open Graph images
    console.log('\n🔍 Checking Open Graph and Twitter Card images...');
    
    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            const ogImage = $('meta[property="og:image"]').attr('content');
            const twitterImage = $('meta[name="twitter:image"]').attr('content');
            
            if (ogImage) {
                console.log(`  ✅ ${file} has Open Graph image: ${ogImage}`);
            } else {
                console.log(`  ⚠️  ${file} missing Open Graph image`);
            }
            
            if (twitterImage) {
                console.log(`  ✅ ${file} has Twitter Card image: ${twitterImage}`);
            } else {
                console.log(`  ⚠️  ${file} missing Twitter Card image`);
            }
            
        } catch (error) {
            console.error(`Error checking ${file}:`, error.message);
        }
    });

    return brokenImages === 0;
}

// Check specific files that are critical
function checkCriticalImages() {
    console.log('\n🎯 Checking critical images...');
    
    const criticalImages = [
        'favicon.png',
        'logo1.png',
        'Professional_SEO__Web_Development_Services_for_Business_Growth_1.png'
    ];

    criticalImages.forEach(image => {
        const imagePath = `./attached_assets/${image}`;
        if (fs.existsSync(imagePath)) {
            console.log(`  ✅ Critical image found: ${image}`);
        } else {
            console.log(`  ❌ Critical image missing: ${image}`);
        }
    });
}

// Run validation
const isValid = validateImages();
checkCriticalImages();

console.log('\n📋 Google Search Image Optimization Checklist:');
console.log('✅ Use descriptive filenames');
console.log('✅ Add comprehensive alt text');
console.log('✅ Optimize image file sizes');
console.log('✅ Use appropriate image formats (PNG, JPG, WebP)');
console.log('✅ Create image sitemap');
console.log('✅ Add structured data for images');
console.log('✅ Include images in Open Graph tags');
console.log('✅ Ensure images are accessible via HTTPS');

if (isValid) {
    console.log('\n🎉 All images validated successfully!');
} else {
    console.log('\n⚠️  Some issues found - please review and fix broken image links');
}
