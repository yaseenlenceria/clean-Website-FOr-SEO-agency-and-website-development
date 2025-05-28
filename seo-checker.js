
const fs = require('fs');
const cheerio = require('cheerio');

function checkSEO() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'));

    const report = [];

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            const issues = [];
            const passed = [];

            // Check title
            const title = $('title').text();
            if (!title) {
                issues.push('Missing title tag');
            } else if (title.length < 30 || title.length > 60) {
                issues.push(`Title length (${title.length}) should be 30-60 characters`);
            } else {
                passed.push('Title tag optimized');
            }

            // Check meta description
            const description = $('meta[name="description"]').attr('content');
            if (!description) {
                issues.push('Missing meta description');
            } else if (description.length < 120 || description.length > 160) {
                issues.push(`Meta description length (${description.length}) should be 120-160 characters`);
            } else {
                passed.push('Meta description optimized');
            }

            // Check canonical URL
            if (!$('link[rel="canonical"]').length) {
                issues.push('Missing canonical URL');
            } else {
                passed.push('Canonical URL present');
            }

            // Check H1 tags
            const h1Count = $('h1').length;
            if (h1Count === 0) {
                issues.push('Missing H1 tag');
            } else if (h1Count > 1) {
                issues.push(`Multiple H1 tags found (${h1Count})`);
            } else {
                passed.push('Single H1 tag present');
            }

            // Check images alt text
            const images = $('img');
            let imagesWithoutAlt = 0;
            images.each((i, img) => {
                if (!$(img).attr('alt')) {
                    imagesWithoutAlt++;
                }
            });
            
            if (imagesWithoutAlt > 0) {
                issues.push(`${imagesWithoutAlt} images missing alt text`);
            } else if (images.length > 0) {
                passed.push('All images have alt text');
            }

            // Check internal links
            const internalLinks = $('a[href^="/"], a[href$=".html"]').length;
            if (internalLinks < 3) {
                issues.push('Few internal links (less than 3)');
            } else {
                passed.push(`Good internal linking (${internalLinks} links)`);
            }

            // Check structured data
            if (!$('script[type="application/ld+json"]').length) {
                issues.push('No structured data found');
            } else {
                passed.push('Structured data present');
            }

            report.push({
                file,
                issues,
                passed,
                score: Math.round((passed.length / (passed.length + issues.length)) * 100)
            });

        } catch (error) {
            report.push({
                file,
                issues: [`Error processing file: ${error.message}`],
                passed: [],
                score: 0
            });
        }
    });

    // Generate report
    console.log('\n=== SEO AUDIT REPORT ===\n');
    
    report.forEach(({ file, issues, passed, score }) => {
        console.log(`\n📄 ${file} (Score: ${score}%)`);
        console.log('─'.repeat(50));
        
        if (passed.length > 0) {
            console.log('✅ Passed:');
            passed.forEach(item => console.log(`   • ${item}`));
        }
        
        if (issues.length > 0) {
            console.log('❌ Issues:');
            issues.forEach(item => console.log(`   • ${item}`));
        }
    });

    const averageScore = Math.round(report.reduce((sum, item) => sum + item.score, 0) / report.length);
    console.log(`\n📊 Overall SEO Score: ${averageScore}%`);
    
    if (averageScore >= 80) {
        console.log('🎉 Excellent SEO! Your site is well optimized.');
    } else if (averageScore >= 60) {
        console.log('👍 Good SEO, but there\'s room for improvement.');
    } else {
        console.log('⚠️  SEO needs improvement. Focus on fixing the issues above.');
    }
}

checkSEO();
