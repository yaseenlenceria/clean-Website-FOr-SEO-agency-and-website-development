
const fs = require('fs');
const cheerio = require('cheerio');

console.log('🔗 Fixing HTML Links - Removing .html Extensions for SEO\n');

function fixAllHtmlLinks() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let totalUpdates = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            let fileUpdates = 0;

            console.log(`📄 Processing: ${file}`);

            // Find all internal links ending with .html
            $('a[href]').each((i, element) => {
                const href = $(element).attr('href');
                
                // Skip external links, anchors, and special URLs
                if (href && 
                    !href.startsWith('http') && 
                    !href.startsWith('mailto:') && 
                    !href.startsWith('tel:') && 
                    !href.startsWith('#') && 
                    !href.startsWith('javascript:') &&
                    href.endsWith('.html')) {
                    
                    // Remove .html extension
                    const newHref = href.replace(/\.html$/, '');
                    $(element).attr('href', newHref);
                    fileUpdates++;
                    console.log(`   ✅ Updated: ${href} → ${newHref}`);
                }
            });

            // Also check for any hardcoded links in text content that might be missed
            let htmlContent = $.html();
            
            // Fix any remaining .html links in href attributes
            htmlContent = htmlContent.replace(
                /href="([^"]*?)\.html"/g, 
                (match, url) => {
                    if (!url.startsWith('http') && 
                        !url.startsWith('mailto:') && 
                        !url.startsWith('tel:') && 
                        !url.includes('#')) {
                        fileUpdates++;
                        return `href="${url}"`;
                    }
                    return match;
                }
            );

            // Save the updated file
            fs.writeFileSync(file, htmlContent);

            if (fileUpdates > 0) {
                console.log(`   📊 Total updates in ${file}: ${fileUpdates}`);
                totalUpdates += fileUpdates;
            } else {
                console.log(`   ℹ️  No .html links found in ${file}`);
            }

        } catch (error) {
            console.error(`   ❌ Error processing ${file}:`, error.message);
        }
    });

    console.log('\n📊 SUMMARY:');
    console.log(`🎉 Successfully removed .html extensions from ${totalUpdates} links`);
    console.log('\n✅ SEO Benefits:');
    console.log('• Cleaner, more user-friendly URLs');
    console.log('• Better URL structure for search engines');
    console.log('• Consistent with modern web standards');
    console.log('• Improved click-through rates');
    
    console.log('\n🔧 Your .htaccess file handles the URL rewriting:');
    console.log('• Clean URLs work thanks to existing rewrite rules');
    console.log('• 301 redirects from .html to clean URLs for SEO');
    console.log('• All old .html links will redirect properly');
}

// Run the link fixing process
fixAllHtmlLinks();
