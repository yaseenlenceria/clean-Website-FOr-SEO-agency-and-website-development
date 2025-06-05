
const fs = require('fs');
const cheerio = require('cheerio');

console.log('🏗️ Implementing Advanced Structured Data (Schema.org)...\n');

// Schema templates for different page types
const schemaTemplates = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OutsourceSU",
        "url": "https://outsourcesu.com",
        "logo": "https://outsourcesu.com/attached_assets/logo1.png",
        "description": "UK's leading SEO agency with 500+ clients ranking #1 on Google",
        "telephone": "+447411575188",
        "email": "info@outsourcesu.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "GB",
            "addressRegion": "England"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "527"
        },
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61576560915041",
            "https://x.com/OutsourceSu",
            "https://www.linkedin.com/company/outsource-su",
            "https://www.youtube.com/@OutsourceSU"
        ]
    },

    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "OutsourceSU",
        "url": "https://outsourcesu.com",
        "description": "UK's leading SEO agency helping businesses dominate search results",
        "publisher": {
            "@type": "Organization",
            "name": "OutsourceSU"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://outsourcesu.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    },

    service: {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "SEO Services",
        "provider": {
            "@type": "Organization",
            "name": "OutsourceSU",
            "url": "https://outsourcesu.com"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United Kingdom"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "SEO Services",
            "itemListElement": []
        }
    },

    breadcrumbList: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
    },

    faq: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    }
};

// Page-specific schema configurations
const pageSchemaConfig = {
    'index.html': {
        schemas: ['organization', 'website'],
        serviceType: 'Digital Marketing Agency',
        breadcrumb: [{ name: 'Home', url: 'https://outsourcesu.com/' }]
    },
    'services.html': {
        schemas: ['service', 'breadcrumbList'],
        serviceType: 'SEO Services',
        breadcrumb: [
            { name: 'Home', url: 'https://outsourcesu.com/' },
            { name: 'Services', url: 'https://outsourcesu.com/services' }
        ]
    },
    'construction-seo.html': {
        schemas: ['service', 'breadcrumbList'],
        serviceType: 'Construction SEO Services',
        breadcrumb: [
            { name: 'Home', url: 'https://outsourcesu.com/' },
            { name: 'Services', url: 'https://outsourcesu.com/services' },
            { name: 'Construction SEO', url: 'https://outsourcesu.com/construction-seo' }
        ]
    },
    'roofing-seo-services-uk.html': {
        schemas: ['service', 'breadcrumbList'],
        serviceType: 'Roofing SEO Services',
        breadcrumb: [
            { name: 'Home', url: 'https://outsourcesu.com/' },
            { name: 'Services', url: 'https://outsourcesu.com/services' },
            { name: 'Roofing SEO', url: 'https://outsourcesu.com/roofing-seo-services-uk' }
        ]
    },
    'professional-services-seo.html': {
        schemas: ['service', 'breadcrumbList'],
        serviceType: 'Professional Services SEO',
        breadcrumb: [
            { name: 'Home', url: 'https://outsourcesu.com/' },
            { name: 'Services', url: 'https://outsourcesu.com/services' },
            { name: 'Professional Services SEO', url: 'https://outsourcesu.com/professional-services-seo' }
        ]
    },
    'contact.html': {
        schemas: ['breadcrumbList'],
        serviceType: 'Contact',
        breadcrumb: [
            { name: 'Home', url: 'https://outsourcesu.com/' },
            { name: 'Contact', url: 'https://outsourcesu.com/contact' }
        ]
    },
    'about.html': {
        schemas: ['breadcrumbList'],
        serviceType: 'About',
        breadcrumb: [
            { name: 'Home', url: 'https://outsourcesu.com/' },
            { name: 'About', url: 'https://outsourcesu.com/about' }
        ]
    }
};

function implementStructuredData() {
    const htmlFiles = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.startsWith('google-') && !file.startsWith('template'))
        .filter(file => file !== 'process-components.html');

    let totalSchemasAdded = 0;

    htmlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(content);
            let schemasAdded = 0;

            console.log(`🏗️ Processing: ${file}`);

            // Remove existing structured data to avoid duplicates
            $('script[type="application/ld+json"]').remove();

            const pageConfig = pageSchemaConfig[file];
            if (pageConfig) {
                // Add configured schemas
                pageConfig.schemas.forEach(schemaType => {
                    const schema = generateSchema(schemaType, pageConfig, file, $);
                    if (schema) {
                        $('head').append(`<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`);
                        schemasAdded++;
                    }
                });
            } else {
                // Add default schemas for other pages
                const defaultSchema = generateDefaultSchema(file, $);
                if (defaultSchema) {
                    $('head').append(`<script type="application/ld+json">${JSON.stringify(defaultSchema, null, 2)}</script>`);
                    schemasAdded++;
                }
            }

            // Add FAQ schema if FAQ content is detected
            const faqSchema = generateFAQSchema($);
            if (faqSchema) {
                $('head').append(`<script type="application/ld+json">${JSON.stringify(faqSchema, null, 2)}</script>`);
                schemasAdded++;
            }

            // Add Article schema for blog pages
            if (file.includes('blog') || file.startsWith('top-10')) {
                const articleSchema = generateArticleSchema(file, $);
                if (articleSchema) {
                    $('head').append(`<script type="application/ld+json">${JSON.stringify(articleSchema, null, 2)}</script>`);
                    schemasAdded++;
                }
            }

            // Add LocalBusiness schema for location-specific pages
            if (file.includes('manchester') || file.includes('birmingham') || file.includes('london')) {
                const localBusinessSchema = generateLocalBusinessSchema(file, $);
                if (localBusinessSchema) {
                    $('head').append(`<script type="application/ld+json">${JSON.stringify(localBusinessSchema, null, 2)}</script>`);
                    schemasAdded++;
                }
            }

            // Save the updated file
            if (schemasAdded > 0) {
                fs.writeFileSync(file, $.html());
                console.log(`  ✅ Added ${schemasAdded} schema markups`);
                totalSchemasAdded += schemasAdded;
            } else {
                console.log(`  ℹ️  No schemas added`);
            }

        } catch (error) {
            console.error(`  ❌ Error processing ${file}:`, error.message);
        }
    });

    console.log(`\n🎉 Structured Data Complete! Added ${totalSchemasAdded} schema markups`);
}

function generateSchema(schemaType, pageConfig, file, $) {
    const baseSchema = JSON.parse(JSON.stringify(schemaTemplates[schemaType]));
    
    switch (schemaType) {
        case 'service':
            baseSchema.name = pageConfig.serviceType;
            baseSchema.description = $('meta[name="description"]').attr('content') || '';
            baseSchema.url = `https://outsourcesu.com/${file.replace('.html', '')}`;
            return baseSchema;
            
        case 'breadcrumbList':
            baseSchema.itemListElement = pageConfig.breadcrumb.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }));
            return baseSchema;
            
        default:
            return baseSchema;
    }
}

function generateDefaultSchema(file, $) {
    const title = $('title').text() || '';
    const description = $('meta[name="description"]').attr('content') || '';
    
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": `https://outsourcesu.com/${file.replace('.html', '')}`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://outsourcesu.com/${file.replace('.html', '')}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "OutsourceSU",
            "logo": "https://outsourcesu.com/attached_assets/logo1.png"
        },
        "inLanguage": "en-GB",
        "isPartOf": {
            "@type": "WebSite",
            "name": "OutsourceSU",
            "url": "https://outsourcesu.com"
        }
    };
}

function generateFAQSchema($) {
    const faqs = [];
    
    // Look for FAQ-style content
    $('h3, h4').each((i, element) => {
        const question = $(element).text().trim();
        const nextElement = $(element).next('p, div');
        
        if (question.includes('?') && nextElement.length) {
            const answer = nextElement.text().trim();
            if (answer.length > 20) {
                faqs.push({
                    "@type": "Question",
                    "name": question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer
                    }
                });
            }
        }
    });
    
    if (faqs.length >= 2) {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs
        };
    }
    
    return null;
}

function generateArticleSchema(file, $) {
    const title = $('h1').first().text() || $('title').text();
    const description = $('meta[name="description"]').attr('content') || '';
    const content = $('main, .content, body').text().substring(0, 500);
    
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "articleBody": content,
        "url": `https://outsourcesu.com/${file.replace('.html', '')}`,
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "author": {
            "@type": "Organization",
            "name": "OutsourceSU"
        },
        "publisher": {
            "@type": "Organization",
            "name": "OutsourceSU",
            "logo": "https://outsourcesu.com/attached_assets/logo1.png"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://outsourcesu.com/${file.replace('.html', '')}`
        }
    };
}

function generateLocalBusinessSchema(file, $) {
    const city = file.includes('manchester') ? 'Manchester' : 
                 file.includes('birmingham') ? 'Birmingham' : 
                 file.includes('london') ? 'London' : 'UK';
    
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `OutsourceSU - SEO Agency ${city}`,
        "description": `Leading SEO agency serving ${city} and surrounding areas`,
        "url": `https://outsourcesu.com/${file.replace('.html', '')}`,
        "telephone": "+447411575188",
        "email": "info@outsourcesu.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressCountry": "GB"
        },
        "areaServed": {
            "@type": "City",
            "name": city
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "527"
        }
    };
}

// Run structured data implementation
implementStructuredData();

console.log('\n📊 STRUCTURED DATA IMPLEMENTATION COMPLETE!\n');
console.log('✅ Organization Schema (homepage)');
console.log('✅ Website Schema (homepage)');
console.log('✅ Service Schema (service pages)');
console.log('✅ BreadcrumbList Schema (navigation)');
console.log('✅ Article Schema (blog/content pages)');
console.log('✅ LocalBusiness Schema (location pages)');
console.log('✅ FAQ Schema (detected FAQ content)');
console.log('✅ WebPage Schema (all other pages)');

console.log('\n🎯 SCHEMA BENEFITS:');
console.log('📈 Enhanced search result appearance');
console.log('🎯 Rich snippets eligibility');
console.log('🔍 Better content understanding by search engines');
console.log('📱 Improved mobile search features');
console.log('🌟 Knowledge panel eligibility');
