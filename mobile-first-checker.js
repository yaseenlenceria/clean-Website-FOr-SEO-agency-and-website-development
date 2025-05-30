
const fs = require('fs');
const cheerio = require('cheerio');

console.log('📱 Mobile-First Indexing Compliance Checker\n');

function checkMobileFirstCompliance() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let totalIssues = 0;

    htmlFiles.forEach(file => {
        console.log(`📄 Checking: ${file}`);
        
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            let fileIssues = 0;

            // Check 1: Robots meta tags consistency
            const robotsMeta = $('meta[name="robots"]').attr('content');
            if (!robotsMeta) {
                console.log('   ❌ Missing robots meta tag');
                fileIssues++;
            } else if (robotsMeta.includes('noindex') || robotsMeta.includes('nofollow')) {
                console.log('   ⚠️  Robots meta contains noindex/nofollow - ensure mobile version is identical');
            } else {
                console.log('   ✅ Robots meta tag present and accessible');
            }

            // Check 2: Mobile viewport
            const viewport = $('meta[name="viewport"]').attr('content');
            if (!viewport) {
                console.log('   ❌ Missing viewport meta tag');
                fileIssues++;
            } else if (!viewport.includes('width=device-width')) {
                console.log('   ❌ Viewport not mobile-optimized');
                fileIssues++;
            } else {
                console.log('   ✅ Mobile viewport properly configured');
            }

            // Check 3: Lazy loading compliance
            const lazyImages = $('img[loading="lazy"]');
            const aboveFoldImages = $('img').slice(0, 3); // First 3 images considered above-fold
            
            aboveFoldImages.each((i, img) => {
                if ($(img).attr('loading') === 'lazy') {
                    console.log('   ⚠️  Above-fold image has lazy loading - may delay rendering');
                }
            });

            // Check 4: Resource accessibility
            const externalResources = [];
            $('link[href], script[src], img[src]').each((i, elem) => {
                const href = $(elem).attr('href') || $(elem).attr('src');
                if (href && href.startsWith('http')) {
                    externalResources.push(href);
                }
            });

            if (externalResources.length > 0) {
                console.log(`   📊 Found ${externalResources.length} external resources`);
            }

            // Check 5: Content structure for mobile-first
            const hasMainContent = $('main, .main-content, .content').length > 0;
            if (!hasMainContent) {
                console.log('   ⚠️  No clear main content structure detected');
            }

            // Check 6: Mobile-specific meta tags
            const mobileOptimized = $('meta[name="apple-mobile-web-app-capable"], meta[name="mobile-web-app-capable"]').length > 0;
            if (mobileOptimized) {
                console.log('   ✅ Mobile app meta tags present');
            }

            if (fileIssues === 0) {
                console.log('   🎉 Mobile-first indexing compliant!\n');
            } else {
                console.log(`   ⚠️  ${fileIssues} issues found\n`);
                totalIssues += fileIssues;
            }

        } catch (error) {
            console.error(`   ❌ Error checking ${file}:`, error.message);
            totalIssues++;
        }
    });

    // Summary
    console.log('\n📊 MOBILE-FIRST INDEXING SUMMARY:');
    if (totalIssues === 0) {
        console.log('🎉 All pages are mobile-first indexing compliant!');
    } else {
        console.log(`⚠️  Found ${totalIssues} total issues across all pages`);
    }

    console.log('\n📋 MOBILE-FIRST INDEXING CHECKLIST:');
    console.log('✅ Use identical robots meta tags on mobile and desktop');
    console.log('✅ Ensure all resources are crawlable in robots.txt');
    console.log('✅ Don\'t lazy-load primary/above-fold content');
    console.log('✅ Make sure content is identical on mobile and desktop');
    console.log('✅ Test with Google Mobile-Friendly Test');
    console.log('✅ Verify in Google Search Console Mobile Usability report');

    console.log('\n🔗 TESTING TOOLS:');
    console.log('• Mobile-Friendly Test: https://search.google.com/test/mobile-friendly');
    console.log('• PageSpeed Insights: https://pagespeed.web.dev/');
    console.log('• Search Console: https://search.google.com/search-console');
    console.log('• Rich Results Test: https://search.google.com/test/rich-results');
}

checkMobileFirstCompliance();
