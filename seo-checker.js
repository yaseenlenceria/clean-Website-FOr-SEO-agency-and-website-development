
const fs = require('fs');
const cheerio = require('cheerio');

function checkSEO() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    const report = [];
    let totalIssues = 0;
    let totalPassed = 0;

    console.log('\n🔍 COMPREHENSIVE SEO AUDIT REPORT');
    console.log('═'.repeat(60));

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            const issues = [];
            const passed = [];
            const warnings = [];

            // Check title tag
            const title = $('title').text().trim();
            if (!title) {
                issues.push('❌ Missing title tag');
            } else if (title.length < 30) {
                warnings.push(`⚠️  Title too short (${title.length} chars) - recommend 30-60`);
            } else if (title.length > 60) {
                warnings.push(`⚠️  Title too long (${title.length} chars) - recommend 30-60`);
            } else {
                passed.push('✅ Title tag optimized');
            }

            // Check meta description
            const description = $('meta[name="description"]').attr('content');
            if (!description) {
                issues.push('❌ Missing meta description');
            } else if (description.length < 120) {
                warnings.push(`⚠️  Meta description too short (${description.length} chars)`);
            } else if (description.length > 160) {
                warnings.push(`⚠️  Meta description too long (${description.length} chars)`);
            } else {
                passed.push('✅ Meta description optimized');
            }

            // Check canonical URL
            if (!$('link[rel="canonical"]').length) {
                issues.push('❌ Missing canonical URL');
            } else {
                passed.push('✅ Canonical URL present');
            }

            // Check H1 tags
            const h1Count = $('h1').length;
            const h1Text = $('h1').first().text().trim();
            if (h1Count === 0) {
                issues.push('❌ Missing H1 tag');
            } else if (h1Count > 1) {
                issues.push(`❌ Multiple H1 tags found (${h1Count})`);
            } else if (h1Text.length < 20) {
                warnings.push('⚠️  H1 tag might be too short');
            } else {
                passed.push('✅ Single H1 tag present');
            }

            // Check heading hierarchy
            const headings = {
                h1: $('h1').length,
                h2: $('h2').length,
                h3: $('h3').length,
                h4: $('h4').length,
                h5: $('h5').length,
                h6: $('h6').length
            };

            if (headings.h2 === 0 && headings.h1 > 0) {
                warnings.push('⚠️  No H2 tags found - improve content structure');
            } else if (headings.h2 > 0) {
                passed.push('✅ Good heading structure');
            }

            // Check images alt text
            const images = $('img');
            let imagesWithoutAlt = 0;
            let imagesWithEmptyAlt = 0;
            
            images.each((i, img) => {
                const alt = $(img).attr('alt');
                if (!alt) {
                    imagesWithoutAlt++;
                } else if (alt.trim() === '') {
                    imagesWithEmptyAlt++;
                }
            });
            
            if (imagesWithoutAlt > 0) {
                issues.push(`❌ ${imagesWithoutAlt} images missing alt text`);
            } else if (imagesWithEmptyAlt > 0) {
                warnings.push(`⚠️  ${imagesWithEmptyAlt} images have empty alt text`);
            } else if (images.length > 0) {
                passed.push('✅ All images have alt text');
            }

            // Check internal links
            const internalLinks = $('a[href^="/"], a[href$=".html"], a[href^="index.html"], a[href^="services.html"], a[href^="contact.html"], a[href^="about.html"]').length;
            if (internalLinks < 3) {
                warnings.push(`⚠️  Few internal links (${internalLinks}) - improve interlinking`);
            } else {
                passed.push(`✅ Good internal linking (${internalLinks} links)`);
            }

            // Check external links
            const externalLinks = $('a[href^="http"]:not([href*="outsourcesu.com"])').length;
            if (externalLinks > 0) {
                // Check if external links have proper attributes
                let externalLinksWithoutRel = 0;
                $('a[href^="http"]:not([href*="outsourcesu.com"])').each((i, link) => {
                    if (!$(link).attr('rel')) {
                        externalLinksWithoutRel++;
                    }
                });
                
                if (externalLinksWithoutRel > 0) {
                    warnings.push(`⚠️  ${externalLinksWithoutRel} external links missing rel attributes`);
                }
            }

            // Check structured data
            const structuredData = $('script[type="application/ld+json"]').length;
            if (structuredData === 0) {
                if (file === 'index.html') {
                    issues.push('❌ No structured data found (critical for homepage)');
                } else {
                    warnings.push('⚠️  No structured data found');
                }
            } else {
                passed.push('✅ Structured data present');
            }

            // Check Open Graph tags
            const ogTags = {
                title: $('meta[property="og:title"]').length,
                description: $('meta[property="og:description"]').length,
                image: $('meta[property="og:image"]').length,
                url: $('meta[property="og:url"]').length
            };

            const missingOG = Object.keys(ogTags).filter(tag => ogTags[tag] === 0);
            if (missingOG.length > 0) {
                warnings.push(`⚠️  Missing Open Graph: ${missingOG.join(', ')}`);
            } else {
                passed.push('✅ Complete Open Graph tags');
            }

            // Check meta viewport
            if (!$('meta[name="viewport"]').length) {
                issues.push('❌ Missing viewport meta tag');
            } else {
                passed.push('✅ Viewport meta tag present');
            }

            // Check lang attribute
            if (!$('html').attr('lang')) {
                issues.push('❌ Missing lang attribute on html tag');
            } else {
                passed.push('✅ Language declared');
            }

            // Check robots meta
            if (!$('meta[name="robots"]').length) {
                warnings.push('⚠️  Missing robots meta tag');
            } else {
                passed.push('✅ Robots meta tag present');
            }

            // Content analysis
            const textContent = $('body').text().replace(/\s+/g, ' ').trim();
            const wordCount = textContent.split(' ').length;
            
            if (wordCount < 300) {
                warnings.push(`⚠️  Low word count (${wordCount}) - consider adding more content`);
            } else if (wordCount > 300) {
                passed.push(`✅ Good content length (${wordCount} words)`);
            }

            // Page load considerations
            const scriptTags = $('script').length;
            const linkTags = $('link').length;
            
            if (scriptTags > 10) {
                warnings.push(`⚠️  Many script tags (${scriptTags}) - may affect load speed`);
            }

            const score = Math.round((passed.length / (passed.length + issues.length + warnings.length * 0.5)) * 100);

            report.push({
                file,
                issues,
                passed,
                warnings,
                score,
                wordCount,
                headingStructure: headings
            });

            totalIssues += issues.length;
            totalPassed += passed.length;

        } catch (error) {
            report.push({
                file,
                issues: [`❌ Error processing file: ${error.message}`],
                passed: [],
                warnings: [],
                score: 0
            });
        }
    });

    // Generate detailed report
    report.forEach(({ file, issues, passed, warnings, score, wordCount, headingStructure }) => {
        console.log(`\n📄 ${file.toUpperCase()}`);
        console.log(`   Score: ${score}% | Words: ${wordCount || 'N/A'}`);
        console.log('─'.repeat(50));
        
        if (passed.length > 0) {
            console.log('✅ PASSED:');
            passed.forEach(item => console.log(`   ${item}`));
        }
        
        if (warnings.length > 0) {
            console.log('⚠️  WARNINGS:');
            warnings.forEach(item => console.log(`   ${item}`));
        }
        
        if (issues.length > 0) {
            console.log('❌ ISSUES:');
            issues.forEach(item => console.log(`   ${item}`));
        }

        if (headingStructure) {
            const headingInfo = Object.entries(headingStructure)
                .filter(([tag, count]) => count > 0)
                .map(([tag, count]) => `${tag.toUpperCase()}:${count}`)
                .join(', ');
            if (headingInfo) {
                console.log(`📊 Headings: ${headingInfo}`);
            }
        }
    });

    const averageScore = Math.round(report.reduce((sum, item) => sum + item.score, 0) / report.length);
    
    console.log('\n' + '═'.repeat(60));
    console.log(`📊 OVERALL SEO HEALTH: ${averageScore}%`);
    console.log(`📈 Total Passed Checks: ${totalPassed}`);
    console.log(`⚠️  Total Issues: ${totalIssues}`);
    console.log(`📄 Pages Analyzed: ${report.length}`);
    
    if (averageScore >= 85) {
        console.log('🎉 EXCELLENT! Your site is very well optimized for search engines.');
    } else if (averageScore >= 70) {
        console.log('👍 GOOD! Your SEO is solid but there\'s room for improvement.');
    } else if (averageScore >= 50) {
        console.log('⚡ NEEDS WORK! Focus on fixing the critical issues above.');
    } else {
        console.log('🚨 CRITICAL! Your site needs immediate SEO attention.');
    }

    console.log('\n🎯 NEXT STEPS FOR RANKING:');
    console.log('   1. Fix all critical issues (❌)');
    console.log('   2. Address warnings (⚠️) for better optimization');
    console.log('   3. Build quality backlinks to your site');
    console.log('   4. Create regular, high-quality content');
    console.log('   5. Monitor and track your rankings');
    
    return report;
}

checkSEO();
