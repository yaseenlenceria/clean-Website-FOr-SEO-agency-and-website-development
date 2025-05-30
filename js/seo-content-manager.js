
// SEO Content Manager - Dynamic content optimization
class SEOContentManager {
    constructor() {
        this.contentTemplates = {
            services: {
                heroTitle: "Professional {service} Services in {location}",
                heroDescription: "Drive more qualified leads with our expert {service} strategies. Proven results for {businessType} across {location}.",
                ctaText: "Get Your Free {service} Audit Today",
                metaTitle: "Best {service} Services {location} | {businessType} SEO Experts",
                metaDescription: "Leading {service} agency in {location}. Specialized strategies for {businessType} with proven results. Get your free consultation today!"
            },
            location: {
                heroTitle: "Top SEO Agency in {location} | OutsourceSU",
                heroDescription: "Dominate local search results in {location} with our proven SEO strategies. Help your business get found by more customers.",
                ctaText: "Get Free {location} SEO Audit",
                metaTitle: "Best SEO Agency {location} | Local SEO Experts | OutsourceSU",
                metaDescription: "Leading SEO agency in {location}. We help local businesses dominate search results and drive more customers. Get your free audit today!"
            },
            directory: {
                heroTitle: "Top 10 {businessType} in {location} 2025",
                heroDescription: "Discover the best {businessType} in {location}. Comprehensive reviews, ratings, and contact information for top-rated companies.",
                ctaText: "List Your Business Here",
                metaTitle: "Top 10 {businessType} {location} 2025 | Best Companies Ranked",
                metaDescription: "Complete list of the best {businessType} in {location} 2025. Read reviews, compare services, and find the perfect company for your needs."
            }
        };

        this.init();
    }

    init() {
        this.optimizeCurrentPage();
        this.addDynamicContent();
        this.optimizeImages();
        this.addInternalLinking();
    }

    optimizeCurrentPage() {
        const pageData = window.dynamicTagging?.getCurrentPageData();
        if (!pageData) return;

        const pageType = this.detectPageType();
        const template = this.contentTemplates[pageType];
        
        if (template) {
            this.replacePlaceholders(template, pageData);
        }
    }

    detectPageType() {
        const path = window.location.pathname;
        if (path.includes('top-10')) return 'directory';
        if (path.includes('manchester') || path.includes('birmingham') || path.includes('london')) return 'location';
        return 'services';
    }

    replacePlaceholders(template, pageData) {
        const replacements = {
            '{service}': pageData.category,
            '{location}': pageData.serviceArea,
            '{businessType}': pageData.businessType
        };

        // Update hero content if exists
        const heroTitle = document.querySelector('.hero-content h1, .page-header h1');
        const heroDescription = document.querySelector('.hero-content p, .page-header p');
        
        if (heroTitle && template.heroTitle) {
            heroTitle.textContent = this.applyReplacements(template.heroTitle, replacements);
        }
        
        if (heroDescription && template.heroDescription) {
            heroDescription.textContent = this.applyReplacements(template.heroDescription, replacements);
        }

        // Update CTA buttons
        const ctaButtons = document.querySelectorAll('.btn-primary-modern, .audit-btn');
        ctaButtons.forEach(btn => {
            if (template.ctaText) {
                btn.textContent = this.applyReplacements(template.ctaText, replacements);
            }
        });
    }

    applyReplacements(text, replacements) {
        let result = text;
        Object.keys(replacements).forEach(key => {
            result = result.replace(new RegExp(key, 'g'), replacements[key]);
        });
        return result;
    }

    addDynamicContent() {
        const pageData = window.dynamicTagging?.getCurrentPageData();
        if (!pageData) return;

        // Add category-specific content sections
        this.addCategoryContent(pageData);
        
        // Add related services
        this.addRelatedServices(pageData);
        
        // Add location-specific content
        this.addLocationContent(pageData);
    }

    addCategoryContent(pageData) {
        const contentArea = document.querySelector('.services-grid, .content-area, main');
        if (!contentArea) return;

        const categoryContent = document.createElement('div');
        categoryContent.className = 'dynamic-category-content';
        categoryContent.innerHTML = `
            <section class="category-benefits">
                <div class="container">
                    <h2>Why Choose Our ${pageData.category}?</h2>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <i class="fas fa-chart-line"></i>
                            <h3>Proven Results</h3>
                            <p>Track record of success in ${pageData.serviceArea} ${pageData.businessType} industry</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-users"></i>
                            <h3>Expert Team</h3>
                            <p>Specialized professionals with deep ${pageData.category.toLowerCase()} knowledge</p>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <h3>Local Expertise</h3>
                            <p>Deep understanding of ${pageData.serviceArea} market dynamics</p>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insert after existing content
        const insertPoint = document.querySelector('.services-section, .hero-modern');
        if (insertPoint && insertPoint.nextSibling) {
            insertPoint.parentNode.insertBefore(categoryContent, insertPoint.nextSibling);
        } else {
            contentArea.appendChild(categoryContent);
        }
    }

    addRelatedServices(pageData) {
        const relatedServices = this.getRelatedServices(pageData.category);
        if (relatedServices.length === 0) return;

        const relatedSection = document.createElement('div');
        relatedSection.className = 'related-services-section';
        relatedSection.innerHTML = `
            <section class="related-services">
                <div class="container">
                    <h2>Related Services</h2>
                    <div class="related-services-grid">
                        ${relatedServices.map(service => `
                            <div class="related-service-card">
                                <h3><a href="${service.url}">${service.name}</a></h3>
                                <p>${service.description}</p>
                                <a href="${service.url}" class="learn-more">Learn More →</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        // Add to page
        const footer = document.querySelector('#global-footer, footer');
        if (footer) {
            footer.parentNode.insertBefore(relatedSection, footer);
        }
    }

    getRelatedServices(category) {
        const serviceMap = {
            'Construction Services': [
                { name: 'Roofing SEO', url: 'roofing-seo-services-uk', description: 'Specialized SEO for roofing companies' },
                { name: 'Contractor SEO', url: 'best-contractors-seo', description: 'Marketing for general contractors' }
            ],
            'Roofing Services': [
                { name: 'Construction SEO', url: 'construction-seo', description: 'SEO for construction companies' },
                { name: 'Commercial Roofing SEO', url: 'commercial-roofing-seo', description: 'B2B roofing marketing' }
            ],
            'Professional Services': [
                { name: 'Law Firm SEO', url: 'best-law-firm-seo', description: 'Legal practice marketing' },
                { name: 'Dental SEO', url: 'best-dentists-seo', description: 'Dental practice growth' }
            ],
            'Legal Services': [
                { name: 'Professional Services SEO', url: 'professional-services-seo', description: 'Marketing for professionals' },
                { name: 'Medical SEO', url: 'best-medical-seo', description: 'Healthcare marketing' }
            ]
        };

        return serviceMap[category] || [];
    }

    addLocationContent(pageData) {
        if (pageData.serviceArea === 'UK') return;

        const locationContent = document.createElement('div');
        locationContent.className = 'location-specific-content';
        locationContent.innerHTML = `
            <section class="location-info">
                <div class="container">
                    <h2>Serving ${pageData.serviceArea} Businesses</h2>
                    <p>We understand the unique challenges and opportunities for ${pageData.businessType} businesses in ${pageData.serviceArea}. Our local expertise helps you connect with your target audience effectively.</p>
                    <div class="location-stats">
                        <div class="stat-item">
                            <strong>Local Clients</strong>
                            <span>50+ businesses served in ${pageData.serviceArea}</span>
                        </div>
                        <div class="stat-item">
                            <strong>Average Growth</strong>
                            <span>200% increase in local visibility</span>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Add before CTA section
        const ctaSection = document.querySelector('.cta-section-modern');
        if (ctaSection) {
            ctaSection.parentNode.insertBefore(locationContent, ctaSection);
        }
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        const pageData = window.dynamicTagging?.getCurrentPageData();
        
        images.forEach(img => {
            if (!img.alt || img.alt === '') {
                const src = img.src || '';
                let altText = `OutsourceSU - ${pageData.category}`;
                
                if (src.includes('logo')) {
                    altText = `OutsourceSU - ${pageData.category} in ${pageData.serviceArea}`;
                } else if (pageData.serviceArea !== 'UK') {
                    altText = `${pageData.category} ${pageData.serviceArea} - OutsourceSU`;
                }
                
                img.alt = altText;
            }
        });
    }

    addInternalLinking() {
        const pageData = window.dynamicTagging?.getCurrentPageData();
        const content = document.querySelector('.content-area, main, .page-content');
        
        if (!content) return;

        // Add contextual internal links
        const linkOpportunities = this.findLinkOpportunities(pageData);
        this.insertInternalLinks(content, linkOpportunities);
    }

    findLinkOpportunities(pageData) {
        const opportunities = [];
        
        // Service-specific links
        if (pageData.category.includes('Roofing')) {
            opportunities.push({
                keyword: 'construction SEO',
                url: 'construction-seo',
                title: 'Construction SEO Services'
            });
        }
        
        if (pageData.category.includes('Legal')) {
            opportunities.push({
                keyword: 'professional services',
                url: 'professional-services-seo',
                title: 'Professional Services SEO'
            });
        }

        // Location-specific links
        if (pageData.serviceArea !== 'UK') {
            opportunities.push({
                keyword: 'SEO services',
                url: 'services',
                title: `SEO Services - OutsourceSU`
            });
        }

        return opportunities;
    }

    insertInternalLinks(content, opportunities) {
        opportunities.forEach(opp => {
            const textNodes = this.getTextNodes(content);
            textNodes.forEach(node => {
                if (node.textContent.toLowerCase().includes(opp.keyword.toLowerCase())) {
                    const regex = new RegExp(`\\b${opp.keyword}\\b`, 'gi');
                    if (regex.test(node.textContent)) {
                        const newHTML = node.textContent.replace(regex, 
                            `<a href="${opp.url}" title="${opp.title}">${opp.keyword}</a>`
                        );
                        const wrapper = document.createElement('span');
                        wrapper.innerHTML = newHTML;
                        node.parentNode.replaceChild(wrapper, node);
                    }
                }
            });
        });
    }

    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.parentNode.tagName === 'A' || 
                        node.parentNode.tagName === 'SCRIPT' ||
                        node.parentNode.tagName === 'STYLE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        return textNodes;
    }
}

// Initialize after dynamic tagging
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.dynamicTagging) {
            window.seoContentManager = new SEOContentManager();
        }
    }, 100);
});
