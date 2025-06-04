// Dynamic Tagging and Category System for SEO Optimization
class DynamicTaggingSystem {
    constructor() {
        this.pageCategories = {
            // Service Categories
            'construction-seo.html': {
                category: 'Construction Services',
                tags: ['construction SEO', 'contractor marketing', 'builder SEO', 'trade SEO'],
                businessType: 'Construction',
                serviceArea: 'UK'
            },
            'best-contractors-seo.html': {
                category: 'Contractor Services',
                tags: ['contractor SEO', 'contractor marketing', 'construction contractor SEO', 'general contractor SEO'],
                businessType: 'Construction',
                serviceArea: 'UK'
            },
            'roofing-seo-services-uk.html': {
                category: 'Roofing Services',
                tags: ['roofing SEO', 'roofer marketing', 'roof repair SEO', 'commercial roofing'],
                businessType: 'Roofing',
                serviceArea: 'UK'
            },
            'best-roofing-companies-seo.html': {
                category: 'Roofing Services',
                tags: ['roofing SEO', 'roofer marketing', 'best roofing companies', 'roofing SEO specialists'],
                businessType: 'Roofing',
                serviceArea: 'UK'
            },
            'professional-services-seo.html': {
                category: 'Professional Services',
                tags: ['professional SEO', 'law firm SEO', 'medical SEO', 'consultancy SEO'],
                businessType: 'Professional Services',
                serviceArea: 'UK'
            },
            'best-dentists-seo.html': {
                category: 'Dental Services',
                tags: ['dental SEO', 'dentist marketing', 'dental practice SEO', 'oral health marketing'],
                businessType: 'Healthcare',
                serviceArea: 'UK'
            },
            'best-law-firm-seo.html': {
                category: 'Legal Services',
                tags: ['law firm SEO', 'legal marketing', 'solicitor SEO', 'barrister marketing'],
                businessType: 'Legal',
                serviceArea: 'UK'
            },
            'real-estate-seo.html': {
                category: 'Real Estate Services',
                tags: ['real estate SEO', 'property marketing', 'estate agent SEO', 'property development'],
                businessType: 'Real Estate',
                serviceArea: 'UK'
            },
            // Location Pages
            'best-seo-agency-manchester.html': {
                category: 'Local SEO Services',
                tags: ['Manchester SEO', 'local SEO Manchester', 'digital marketing Manchester'],
                businessType: 'SEO Agency',
                serviceArea: 'Manchester'
            },
            'seo-agency-birmingham.html': {
                category: 'Local SEO Services',
                tags: ['Birmingham SEO', 'local SEO Birmingham', 'digital marketing Birmingham'],
                businessType: 'SEO Agency',
                serviceArea: 'Birmingham'
            },
            // Blog Categories
            'blog.html': {
                category: 'Blog & Resources',
                tags: ['SEO tips', 'digital marketing insights', 'business growth', 'marketing strategies'],
                businessType: 'Educational Content',
                serviceArea: 'UK'
            },
            'best-galway-roofing.html': {
                category: 'Local Roofing Directory',
                tags: ['Galway roofing companies', 'best roofers Galway', 'roofing directory Galway', 'top roofing companies', 'Ireland roofing'],
                businessType: 'Local Directory',
                serviceArea: 'Galway'
            }
        };

        this.globalTags = [
            'SEO agency UK',
            'digital marketing',
            'search engine optimization',
            'online marketing',
            'website optimization',
            'Google ranking',
            'lead generation',
            'business growth'
        ];

        this.init();
    }

    init() {
        this.detectPageCategory();
        this.addDynamicTags();
        this.addStructuredData();
        this.addBreadcrumbSchema();
        this.optimizeMetaTags();
    }

    detectPageCategory() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.currentPageData = this.pageCategories[currentPage] || this.getDefaultCategory(currentPage);
    }

    getDefaultCategory(page) {
        // Auto-detect category based on page name patterns
        if (page.includes('roofing')) {
            return {
                category: 'Roofing Services',
                tags: ['roofing SEO', 'roofer marketing'],
                businessType: 'Roofing',
                serviceArea: 'UK'
            };
        } else if (page.includes('construction')) {
            return {
                category: 'Construction Services',
                tags: ['construction SEO', 'contractor marketing'],
                businessType: 'Construction',
                serviceArea: 'UK'
            };
        } else if (page.includes('law') || page.includes('legal')) {
            return {
                category: 'Legal Services',
                tags: ['law firm SEO', 'legal marketing'],
                businessType: 'Legal',
                serviceArea: 'UK'
            };
        } else if (page.includes('dental') || page.includes('dentist')) {
            return {
                category: 'Dental Services',
                tags: ['dental SEO', 'dentist marketing'],
                businessType: 'Healthcare',
                serviceArea: 'UK'
            };
        } else if (page.includes('top-10')) {
            return {
                category: 'Local Business Listings',
                tags: ['local business', 'top companies', 'business directory'],
                businessType: 'Directory',
                serviceArea: this.extractLocationFromPage(page)
            };
        } else {
            return {
                category: 'SEO Services',
                tags: ['SEO services', 'digital marketing'],
                businessType: 'SEO Agency',
                serviceArea: 'UK'
            };
        }
    }

    extractLocationFromPage(page) {
        if (page.includes('london')) return 'London';
        if (page.includes('manchester')) return 'Manchester';
        if (page.includes('birmingham')) return 'Birmingham';
        return 'UK';
    }

    addDynamicTags() {
        const head = document.head;

        // Add category meta tag
        this.addMetaTag('category', this.currentPageData.category);

        // Add business type
        this.addMetaTag('business-type', this.currentPageData.businessType);

        // Add service area
        this.addMetaTag('service-area', this.currentPageData.serviceArea);

        // Add dynamic keywords
        const allTags = [...this.currentPageData.tags, ...this.globalTags];
        const existingKeywords = document.querySelector('meta[name="keywords"]');
        if (existingKeywords) {
            const currentKeywords = existingKeywords.getAttribute('content');
            const newKeywords = currentKeywords + ', ' + allTags.join(', ');
            existingKeywords.setAttribute('content', newKeywords);
        } else {
            this.addMetaTag('keywords', allTags.join(', '));
        }

        // Add topic tags for better content classification
        this.addMetaTag('topics', this.currentPageData.tags.join(', '));
    }

    addMetaTag(name, content) {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }

    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": document.title,
            "description": document.querySelector('meta[name="description"]')?.getAttribute('content'),
            "url": window.location.href,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            },
            "about": {
                "@type": "Thing",
                "name": this.currentPageData.category,
                "description": `Professional ${this.currentPageData.category.toLowerCase()} in ${this.currentPageData.serviceArea}`
            },
            "audience": {
                "@type": "Audience",
                "audienceType": this.currentPageData.businessType
            },
            "keywords": this.currentPageData.tags.join(', '),
            "inLanguage": "en-GB",
            "isPartOf": {
                "@type": "WebSite",
                "name": "OutsourceSU",
                "url": "https://outsourcesu.com"
            },
            "provider": {
                "@type": "Organization",
                "name": "OutsourceSU",
                "url": "https://outsourcesu.com",
                "logo": "https://outsourcesu.com/attached_assets/logo1.png",
                "sameAs": [
                    "https://www.facebook.com/profile.php?id=61576560915041",
                    "https://x.com/OutsourceSu",
                    "https://www.linkedin.com/company/outsource-su",
                    "https://www.youtube.com/@OutsourceSU"
                ]
            }
        };

        // Add service-specific structured data
        if (this.currentPageData.businessType !== 'Educational Content') {
            structuredData.mainEntity = {
                "@type": "Service",
                "name": `${this.currentPageData.category} - OutsourceSU`,
                "description": `Professional ${this.currentPageData.category.toLowerCase()} services in ${this.currentPageData.serviceArea}`,
                "serviceType": this.currentPageData.category,
                "areaServed": this.currentPageData.serviceArea,
                "provider": structuredData.provider
            };
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(script);
    }

    addBreadcrumbSchema() {
        const breadcrumbList = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://outsourcesu.com/"
                }
            ]
        };

        // Add category breadcrumb
        if (this.currentPageData.category !== 'SEO Services') {
            breadcrumbList.itemListElement.push({
                "@type": "ListItem",
                "position": 2,
                "name": this.currentPageData.category,
                "item": window.location.href
            });
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbList, null, 2);
        document.head.appendChild(script);
    }

    optimizeMetaTags() {
        // Add Open Graph type based on content
        const ogType = document.querySelector('meta[property="og:type"]');
        if (ogType) {
            if (this.currentPageData.businessType === 'Educational Content') {
                ogType.setAttribute('content', 'article');
            } else {
                ogType.setAttribute('content', 'website');
            }
        }

        // Add category to Open Graph
        const ogCategory = document.createElement('meta');
        ogCategory.setAttribute('property', 'og:category');
        ogCategory.setAttribute('content', this.currentPageData.category);
        document.head.appendChild(ogCategory);

        // Add location information for local pages
        if (this.currentPageData.serviceArea !== 'UK') {
            const ogLocality = document.createElement('meta');
            ogLocality.setAttribute('property', 'og:locality');
            ogLocality.setAttribute('content', this.currentPageData.serviceArea);
            document.head.appendChild(ogLocality);
        }
    }

    // Public method to get current page data
    getCurrentPageData() {
        return this.currentPageData;
    }

    // Public method to add custom tags
    addCustomTags(tags) {
        this.currentPageData.tags = [...this.currentPageData.tags, ...tags];
        this.addDynamicTags();
    }
}

// Initialize the dynamic tagging system
document.addEventListener('DOMContentLoaded', function() {
    if (!window.dynamicTagging) {
        window.dynamicTagging = new DynamicTaggingSystem();
    }

    // Category tag functionality removed to prevent stray elements

    // Only show in development/testing
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) {
       // document.body.appendChild(categoryIndicator);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicTaggingSystem;
}