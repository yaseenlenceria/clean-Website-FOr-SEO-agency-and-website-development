
const fs = require('fs');
const cheerio = require('cheerio');

console.log('🔗 Starting Advanced Internal Linking Optimization...\n');

// Enhanced keyword mapping for intelligent internal linking
const keywordToPageMapping = {
    // Service keywords
    'construction seo': { url: 'construction-seo', priority: 9, title: 'Construction SEO Services UK' },
    'roofing seo': { url: 'roofing-seo-services-uk', priority: 9, title: 'Roofing SEO Services UK' },
    'professional services seo': { url: 'professional-services-seo', priority: 9, title: 'Professional Services SEO' },
    'law firm seo': { url: 'best-law-firm-seo', priority: 8, title: 'Law Firm SEO Services' },
    'dental seo': { url: 'best-dentists-seo', priority: 8, title: 'Dental SEO Services' },
    'real estate seo': { url: 'real-estate-seo', priority: 8, title: 'Real Estate SEO Services' },
    'architect seo': { url: 'best-architects-seo', priority: 7, title: 'Architect SEO Services' },
    'contractor seo': { url: 'best-contractors-seo', priority: 7, title: 'Contractor SEO Services' },
    'plumber seo': { url: 'best-plumbers-seo', priority: 7, title: 'Plumber SEO Services' },
    
    // Location-based keywords
    'manchester seo': { url: 'best-seo-agency-manchester', priority: 8, title: 'SEO Agency Manchester' },
    'birmingham seo': { url: 'seo-agency-birmingham', priority: 8, title: 'SEO Agency Birmingham' },
    'manchester roofing': { url: 'best-roofing-companies-manchester', priority: 7, title: 'Best Roofing Companies Manchester' },
    'birmingham roofing': { url: 'best-roofing-companies-birmingham', priority: 7, title: 'Best Roofing Companies Birmingham' },
    'london roofing': { url: 'best-roofing-companies-london', priority: 7, title: 'Best Roofing Companies London' },
    
    // Service types
    'roof repair': { url: 'roof-repair-seo', priority: 7, title: 'Roof Repair SEO' },
    'roof replacement': { url: 'roof-replacement-seo', priority: 7, title: 'Roof Replacement SEO' },
    'commercial roofing': { url: 'commercial-roofing-seo', priority: 7, title: 'Commercial Roofing SEO' },
    'white label seo': { url: 'white-label-seo', priority: 6, title: 'White Label SEO Services' },
    
    // Core pages
    'seo services': { url: 'services', priority: 9, title: 'SEO Services' },
    'ecommerce seo': { url: 'commerce-seo-services', priority: 8, title: 'Ecommerce SEO Services' },
    'shopify seo': { url: 'commerce-seo-services', priority: 8, title: 'Shopify SEO Services' },
    'woocommerce seo': { url: 'commerce-seo-services', priority: 8, title: 'WooCommerce SEO Services' },
    'online store seo': { url: 'commerce-seo-services', priority: 8, title: 'Online Store SEO Services' },
    'commerce seo': { url: 'commerce-seo-services', priority: 8, title: 'Commerce SEO Services' },
    'magento seo': { url: 'commerce-seo-services', priority: 8, title: 'Magento SEO Services' },
    
    // Blog content keywords
    'seo for roofing companies': { url: 'blog/10-benefits-of-seo-for-roofing-companies', priority: 7, title: '10 Benefits of SEO for Roofing Companies' },
    'roofing business marketing': { url: 'blog/10-benefits-of-seo-for-roofing-companies', priority: 7, title: 'Roofing Business Marketing Guide' },
    'seo for celebrants': { url: 'blog/10-benefits-of-seo-for-celebrants', priority: 6, title: 'SEO for Celebrants' },
    'celebrant marketing': { url: 'blog/10-benefits-of-seo-for-celebrants', priority: 6, title: 'Celebrant Marketing Guide' },
    'contact us': { url: 'contact', priority: 8, title: 'Contact OutsourceSU' },
    'about us': { url: 'about', priority: 7, title: 'About OutsourceSU' },
    'our work': { url: 'our-work', priority: 7, title: 'Our Work - Case Studies' },
    'blog': { url: 'blog', priority: 6, title: 'SEO Blog & Resources' }
};

// Related content mapping for contextual linking
const relatedContentMapping = {
    'construction-seo': ['best-contractors-seo', 'roofing-seo-services-uk', 'best-architects-seo'],
    'roofing-seo-services-uk': ['construction-seo', 'roof-repair-seo', 'commercial-roofing-seo', 'blog/10-benefits-of-seo-for-roofing-companies'],
    'professional-services-seo': ['best-law-firm-seo', 'best-dentists-seo', 'best-accountants-seo', 'blog/10-benefits-of-seo-for-celebrants'],
    'commerce-seo-services': ['services', 'professional-services-seo', 'construction-seo'],
    'best-law-firm-seo': ['professional-services-seo', 'best-accountants-seo', 'best-consultancy-seo'],
    'best-dentists-seo': ['professional-services-seo', 'best-medical-seo', 'top-10-dentists-london'],
    'real-estate-seo': ['construction-seo', 'best-architects-seo', 'professional-services-seo']
};

function analyzeCurrentLinks() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    const linkAnalysis = {};
    
    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            
            const internalLinks = [];
            $('a[href]').each((i, element) => {
                const href = $(element).attr('href');
                if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#')) {
                    internalLinks.push({
                        href: href,
                        text: $(element).text().trim(),
                        title: $(element).attr('title') || ''
                    });
                }
            });
            
            linkAnalysis[file] = {
                totalLinks: internalLinks.length,
                links: internalLinks,
                wordCount: $('body').text().replace(/\s+/g, ' ').split(' ').length
            };
            
        } catch (error) {
            console.error(`Error analyzing ${file}:`, error.message);
        }
    });
    
    return linkAnalysis;
}

function addIntelligentInternalLinks() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let totalLinksAdded = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            const currentPage = file.replace('.html', '');
            let linksAdded = 0;

            console.log(`🔗 Processing: ${file}`);

            // Add contextual internal links based on content
            const bodyText = $('body').text().toLowerCase();
            const existingLinks = new Set();
            
            // Track existing links to avoid duplicates
            $('a[href]').each((i, element) => {
                const href = $(element).attr('href');
                if (href && !href.startsWith('http')) {
                    existingLinks.add(href.replace('.html', '').replace('/', ''));
                }
            });

            // Add keyword-based internal links
            Object.keys(keywordToPageMapping).forEach(keyword => {
                const linkData = keywordToPageMapping[keyword];
                const targetPage = linkData.url;
                
                // Don't link to self
                if (targetPage === currentPage) return;
                
                // Don't add if link already exists
                if (existingLinks.has(targetPage)) return;
                
                // Check if keyword exists in content
                const keywordRegex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
                if (keywordRegex.test(bodyText)) {
                    // Find the first occurrence in a paragraph and replace it
                    $('p, div.content, div.description').each((i, element) => {
                        const elementText = $(element).html();
                        if (elementText && keywordRegex.test(elementText) && linksAdded < 5) {
                            const newHTML = elementText.replace(keywordRegex, 
                                `<a href="${targetPage}" title="${linkData.title}" class="internal-link">${keyword}</a>`
                            );
                            $(element).html(newHTML);
                            existingLinks.add(targetPage);
                            linksAdded++;
                            return false; // Only replace first occurrence
                        }
                    });
                }
            });

            // Add related content links section
            if (relatedContentMapping[currentPage]) {
                const relatedPages = relatedContentMapping[currentPage];
                let relatedLinksHTML = '<div class="related-content-links" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;"><h3>Related Services</h3><ul style="list-style: none; padding: 0;">';
                
                relatedPages.forEach(relatedPage => {
                    if (!existingLinks.has(relatedPage)) {
                        const pageTitle = getPageTitle(relatedPage);
                        relatedLinksHTML += `<li style="margin: 8px 0;"><a href="${relatedPage}" title="${pageTitle}" class="related-link">→ ${pageTitle}</a></li>`;
                        linksAdded++;
                    }
                });
                
                relatedLinksHTML += '</ul></div>';
                
                // Insert before footer or at end of main content
                const insertPoint = $('.cta-section-modern, #global-footer, footer').first();
                if (insertPoint.length) {
                    insertPoint.before(relatedLinksHTML);
                } else {
                    $('main, .main-content, body').append(relatedLinksHTML);
                }
            }

            // Add breadcrumb navigation for better internal linking
            if (!$('.breadcrumb').length && currentPage !== 'index') {
                const breadcrumbHTML = generateBreadcrumb(currentPage);
                if (breadcrumbHTML) {
                    $('main, .page-header, .hero-modern').first().prepend(breadcrumbHTML);
                    linksAdded++;
                }
            }

            // Save the updated file
            if (linksAdded > 0) {
                fs.writeFileSync(file, $.html());
                console.log(`  ✅ Added ${linksAdded} internal links`);
                totalLinksAdded += linksAdded;
            } else {
                console.log(`  ℹ️  No new links added (may already be optimized)`);
            }

        } catch (error) {
            console.error(`  ❌ Error processing ${file}:`, error.message);
        }
    });

    console.log(`\n🎉 Internal Linking Complete! Added ${totalLinksAdded} strategic internal links`);
}

function getPageTitle(filename) {
    const titles = {
        'construction-seo': 'Construction SEO Services',
        'roofing-seo-services-uk': 'Roofing SEO Services UK',
        'professional-services-seo': 'Professional Services SEO',
        'best-law-firm-seo': 'Law Firm SEO Services',
        'best-dentists-seo': 'Dental SEO Services',
        'real-estate-seo': 'Real Estate SEO Services',
        'services': 'Our SEO Services',
        'contact': 'Contact Us',
        'about': 'About OutsourceSU',
        'our-work': 'Our Work & Case Studies'
    };
    
    return titles[filename] || filename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function generateBreadcrumb(currentPage) {
    const breadcrumbMap = {
        'construction-seo': [{ text: 'Services', url: 'services' }, { text: 'Construction SEO', url: '' }],
        'roofing-seo-services-uk': [{ text: 'Services', url: 'services' }, { text: 'Roofing SEO', url: '' }],
        'professional-services-seo': [{ text: 'Services', url: 'services' }, { text: 'Professional Services SEO', url: '' }],
        'best-law-firm-seo': [{ text: 'Services', url: 'services' }, { text: 'Professional Services', url: 'professional-services-seo' }, { text: 'Law Firm SEO', url: '' }],
        'contact': [{ text: 'Contact', url: '' }],
        'about': [{ text: 'About', url: '' }]
    };
    
    const breadcrumb = breadcrumbMap[currentPage];
    if (!breadcrumb) return null;
    
    let breadcrumbHTML = '<nav class="breadcrumb" style="margin: 20px 0; font-size: 14px;"><a href="/" title="Home">Home</a>';
    
    breadcrumb.forEach((item, index) => {
        if (item.url) {
            breadcrumbHTML += ` → <a href="${item.url}" title="${item.text}">${item.text}</a>`;
        } else {
            breadcrumbHTML += ` → <span>${item.text}</span>`;
        }
    });
    
    breadcrumbHTML += '</nav>';
    return breadcrumbHTML;
}

function generateInternalLinkingReport() {
    const analysis = analyzeCurrentLinks();
    
    console.log('\n📊 INTERNAL LINKING ANALYSIS REPORT\n');
    console.log('Page\t\t\t\tLinks\tWords\tRatio');
    console.log('─'.repeat(60));
    
    Object.keys(analysis).forEach(page => {
        const data = analysis[page];
        const ratio = (data.totalLinks / data.wordCount * 100).toFixed(2);
        console.log(`${page.padEnd(30)}\t${data.totalLinks}\t${data.wordCount}\t${ratio}%`);
    });
    
    console.log('\n📈 RECOMMENDATIONS:');
    console.log('✅ Aim for 1-3% internal link ratio');
    console.log('✅ Use descriptive anchor text');
    console.log('✅ Link to related, valuable content');
    console.log('✅ Avoid over-optimization');
}

// Run internal linking optimization
addIntelligentInternalLinks();
generateInternalLinkingReport();
