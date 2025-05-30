
const fs = require('fs');
const cheerio = require('cheerio');

console.log('⚡ Starting Performance Optimization for Core Web Vitals...\n');

function optimizePerformance() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            console.log(`⚡ Optimizing performance for: ${file}`);

            // 1. Critical Resource Preloading
            if (!$('link[rel="preload"]').length) {
                $('head').append('<link rel="preload" href="style.css" as="style">');
                $('head').append('<link rel="preload" href="attached_assets/logo1.png" as="image">');
                $('head').append('<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" as="style">');
            }

            // 2. DNS Prefetch for external resources
            if (!$('link[rel="dns-prefetch"]').length) {
                $('head').append('<link rel="dns-prefetch" href="//fonts.googleapis.com">');
                $('head').append('<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">');
                $('head').append('<link rel="dns-prefetch" href="//www.googletagmanager.com">');
            }

            // 3. Preconnect to critical origins
            if (!$('link[rel="preconnect"]').length) {
                $('head').append('<link rel="preconnect" href="https://fonts.googleapis.com">');
                $('head').append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
            }

            // 4. Lazy loading for images
            $('img').each((i, img) => {
                const src = $(img).attr('src');
                if (src && !src.includes('logo') && !$(img).attr('loading')) {
                    $(img).attr('loading', 'lazy');
                }
            });

            // 5. Add performance monitoring script
            const performanceScript = `
<script>
// Core Web Vitals monitoring
function measureWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
    }).observe({entryTypes: ['largest-contentful-paint']});

    // First Input Delay
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    }).observe({entryTypes: ['first-input']});

    // Cumulative Layout Shift
    let cumulativeLayoutShiftScore = 0;
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
                cumulativeLayoutShiftScore += entry.value;
            }
        });
        console.log('CLS:', cumulativeLayoutShiftScore);
    }).observe({entryTypes: ['layout-shift']});
}

// Initialize after DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', measureWebVitals);
} else {
    measureWebVitals();
}

// Preload critical resources
const criticalResources = [
    '/attached_assets/logo1.png',
    '/services',
    '/contact'
];

criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource;
    document.head.appendChild(link);
});
</script>`;

            if (!$('script').text().includes('measureWebVitals')) {
                $('body').append(performanceScript);
            }

            fs.writeFileSync(file, $.html());
            console.log(`  ✅ Performance optimized for ${file}`);

        } catch (error) {
            console.error(`  ❌ Error optimizing ${file}:`, error.message);
        }
    });
}

optimizePerformance();

console.log('\n🎉 Performance Optimization Complete!\n');
console.log('✅ Critical resource preloading');
console.log('✅ DNS prefetch optimization');
console.log('✅ Image lazy loading');
console.log('✅ Core Web Vitals monitoring');
console.log('✅ Resource prefetching');
console.log('\n📊 Expected improvements:');
console.log('🚀 Faster page load times');
console.log('📱 Better mobile performance');
console.log('⚡ Improved Core Web Vitals scores');
console.log('🎯 Enhanced user experience');
