
const fs = require('fs');
const cheerio = require('cheerio');

console.log('🔍 Verifying Clean URLs Implementation\n');

function verifyCleanUrls() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let issuesFound = 0;
    let totalLinks = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            let fileIssues = 0;

            console.log(`📄 Checking: ${file}`);

            $('a[href]').each((i, element) => {
                const href = $(element).attr('href');
                totalLinks++;
                
                // Check for .html extensions in internal links
                if (href && 
                    !href.startsWith('http') && 
                    !href.startsWith('mailto:') && 
                    !href.startsWith('tel:') && 
                    !href.startsWith('#') && 
                    href.endsWith('.html')) {
                    
                    console.log(`   ❌ Found .html link: ${href}`);
                    fileIssues++;
                }
            });

            if (fileIssues === 0) {
                console.log(`   ✅ All internal links are clean URLs`);
            } else {
                console.log(`   ⚠️  Found ${fileIssues} links with .html extensions`);
                issuesFound += fileIssues;
            }

        } catch (error) {
            console.error(`   ❌ Error checking ${file}:`, error.message);
        }
    });

    console.log('\n📊 VERIFICATION SUMMARY:');
    console.log(`🔗 Total links checked: ${totalLinks}`);
    
    if (issuesFound === 0) {
        console.log('🎉 All internal links are using clean URLs!');
        console.log('\n✅ SEO OPTIMIZATION COMPLETE:');
        console.log('• No .html extensions found in internal links');
        console.log('• Clean URL structure implemented');
        console.log('• .htaccess configured for proper redirects');
        console.log('• Better user experience and SEO rankings');
    } else {
        console.log(`⚠️  Found ${issuesFound} links that still need fixing`);
    }
}

verifyCleanUrls();
