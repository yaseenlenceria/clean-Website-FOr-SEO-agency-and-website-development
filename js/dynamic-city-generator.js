// Dynamic City Page Generator
class DynamicCityGenerator {
    constructor(city, service) {
        this.city = city || 'Birmingham';
        this.service = service || 'SEO Company';
        this.companyName = 'OutsourceSU';
        this.baseUrl = 'https://outsourcesu.com';

        this.cityData = {
            'Birmingham': {
                population: '1.1 million',
                region: 'West Midlands',
                keyIndustries: ['Manufacturing', 'Finance', 'Professional Services', 'Retail'],
                localLandmarks: ['Bullring', 'Birmingham Museum', 'Cadbury World'],
                businessDistricts: ['City Centre', 'Digbeth', 'Jewellery Quarter']
            },
            'Manchester': {
                population: '547,000',
                region: 'Greater Manchester',
                keyIndustries: ['Technology', 'Media', 'Finance', 'Education'],
                localLandmarks: ['Manchester Cathedral', 'Old Trafford', 'The Lowry'],
                businessDistricts: ['City Centre', 'MediaCity', 'Spinningfields']
            },
            'London': {
                population: '9 million',
                region: 'Greater London',
                keyIndustries: ['Finance', 'Technology', 'Creative Industries', 'Tourism'],
                localLandmarks: ['Big Ben', 'Tower Bridge', 'The Shard'],
                businessDistricts: ['City of London', 'Canary Wharf', 'Shoreditch']
            },
            'Leeds': {
                population: '793,000',
                region: 'West Yorkshire',
                keyIndustries: ['Finance', 'Legal Services', 'Healthcare', 'Manufacturing'],
                localLandmarks: ['Leeds Minster', 'Royal Armouries', 'Kirkstall Abbey'],
                businessDistricts: ['City Centre', 'Headingley', 'Chapel Allerton']
            },
            'Bristol': {
                population: '463,000',
                region: 'South West England',
                keyIndustries: ['Aerospace', 'Creative Industries', 'Technology', 'Education'],
                localLandmarks: ['Clifton Suspension Bridge', 'SS Great Britain', 'Bristol Cathedral'],
                businessDistricts: ['City Centre', 'Harbourside', 'Clifton']
            },
            'Cardiff': {
                population: '362,000',
                region: 'Wales',
                keyIndustries: ['Government', 'Media', 'Finance', 'Tourism'],
                localLandmarks: ['Cardiff Castle', 'Millennium Stadium', 'Cardiff Bay'],
                businessDistricts: ['City Centre', 'Cardiff Bay', 'Llanishen']
            },
            'Liverpool': {
                population: '498,000',
                region: 'Merseyside',
                keyIndustries: ['Shipping', 'Tourism', 'Creative Industries', 'Education'],
                localLandmarks: ['Albert Dock', 'Cavern Club', 'Liverpool Cathedral'],
                businessDistricts: ['City Centre', 'Baltic Triangle', 'Knowledge Quarter']
            },
            'Sheffield': {
                population: '584,000',
                region: 'South Yorkshire',
                keyIndustries: ['Steel', 'Engineering', 'Healthcare', 'Education'],
                localLandmarks: ['Sheffield Cathedral', 'Millennium Gallery', 'Peak District'],
                businessDistricts: ['City Centre', 'Kelham Island', 'Ecclesall Road']
            },
            'Newcastle': {
                population: '300,000',
                region: 'Tyne and Wear',
                keyIndustries: ['Technology', 'Education', 'Healthcare', 'Culture'],
                localLandmarks: ['Angel of the North', 'Newcastle Castle', 'Quayside'],
                businessDistricts: ['City Centre', 'Quayside', 'Ouseburn']
            },
            'Edinburgh': {
                population: '518,000',
                region: 'Scotland',
                keyIndustries: ['Finance', 'Tourism', 'Education', 'Government'],
                localLandmarks: ['Edinburgh Castle', 'Royal Mile', 'Arthur\'s Seat'],
                businessDistricts: ['New Town', 'Old Town', 'Leith']
            },
            'Glasgow': {
                population: '635,000',
                region: 'Scotland',
                keyIndustries: ['Manufacturing', 'Creative Industries', 'Education', 'Healthcare'],
                localLandmarks: ['Glasgow Cathedral', 'Kelvingrove', 'Merchant City'],
                businessDistricts: ['City Centre', 'Merchant City', 'West End']
            },
            'Belfast': {
                population: '343,000',
                region: 'Northern Ireland',
                keyIndustries: ['Aerospace', 'Technology', 'Tourism', 'Education'],
                localLandmarks: ['Titanic Belfast', 'City Hall', 'Stormont'],
                businessDistricts: ['City Centre', 'Titanic Quarter', 'Laganside']
            }
        };

        this.servicesData = {
            'SEO Company': {
                description: 'search engine optimization',
                benefits: ['Higher search rankings', 'Increased website traffic', 'More qualified leads', 'Better online visibility'],
                process: ['SEO Audit', 'Keyword Research', 'On-Page Optimization', 'Content Creation', 'Link Building', 'Performance Monitoring']
            },
            'Law Firm SEO': {
                description: 'specialized legal SEO',
                benefits: ['Attract high-value clients', 'Build professional credibility', 'Increase case inquiries', 'Dominate local legal searches'],
                process: ['Legal Market Analysis', 'Practice Area Optimization', 'Local Citations Building', 'Content Marketing', 'Reputation Management', 'Performance Tracking']
            },
            'Dentist SEO': {
                description: 'dental practice SEO',
                benefits: ['Attract new patients', 'Fill appointment schedules', 'Build practice reputation', 'Increase treatment bookings'],
                process: ['Dental Market Research', 'Local SEO Optimization', 'Patient Review Management', 'Service Page Optimization', 'Google My Business', 'Monthly Reporting']
            },
            'Accountant SEO': {
                description: 'accounting firm SEO',
                benefits: ['Attract business clients', 'Build financial expertise authority', 'Increase consultation bookings', 'Grow client base'],
                process: ['Financial Services Analysis', 'Tax Season Optimization', 'Service Area Targeting', 'Content Strategy', 'Local Citations', 'ROI Tracking']
            },
            'Architect SEO': {
                description: 'architectural firm SEO',
                benefits: ['Showcase design portfolio', 'Attract high-value projects', 'Build design authority', 'Increase project inquiries'],
                process: ['Design Market Analysis', 'Portfolio Optimization', 'Project Case Studies', 'Visual Content SEO', 'Local Targeting', 'Performance Analysis']
            },
            'Plumber SEO': {
                description: 'plumbing services SEO',
                benefits: ['Emergency call generation', '24/7 service visibility', 'Local area dominance', 'Increase service bookings'],
                process: ['Emergency SEO Setup', 'Local Maps Optimization', 'Service Area Pages', 'Review Management', 'Mobile Optimization', 'Call Tracking']
            },
            'Electrician SEO': {
                description: 'electrical services SEO',
                benefits: ['Generate urgent calls', 'Build safety reputation', 'Increase installations', 'Dominate local searches'],
                process: ['Electrical Market Analysis', 'Safety Content Creation', 'Emergency Optimization', 'Service Targeting', 'Citation Building', 'Conversion Tracking']
            },
            'Heating Engineer SEO': {
                description: 'heating and HVAC SEO',
                benefits: ['Seasonal service optimization', 'Emergency repair calls', 'Installation inquiries', 'Maintenance contracts'],
                process: ['HVAC Market Research', 'Seasonal Optimization', 'Emergency Call Setup', 'Service Scheduling', 'Review Generation', 'ROI Analysis']
            },
            'Contractors SEO': {
                description: 'construction contractor SEO',
                benefits: ['Win bigger projects', 'Build industry authority', 'Generate quality leads', 'Showcase completed work'],
                process: ['Construction Market Analysis', 'Project Portfolio SEO', 'Bid Opportunity Targeting', 'Content Marketing', 'Local Authority Building', 'Lead Tracking']
            },
            'Medical SEO': {
                description: 'healthcare practice SEO',
                benefits: ['Attract new patients', 'Build medical authority', 'Increase appointments', 'Grow practice revenue'],
                process: ['Healthcare Market Research', 'Medical Content Creation', 'Patient Journey Optimization', 'HIPAA Compliance', 'Reputation Management', 'Analytics Tracking']
            },
            'Financial Services SEO': {
                description: 'financial advisory SEO',
                benefits: ['Attract high-net-worth clients', 'Build financial authority', 'Increase consultations', 'Generate quality leads'],
                process: ['Financial Market Analysis', 'Compliance-First SEO', 'Trust Building Content', 'Service Optimization', 'Authority Building', 'Client Acquisition Tracking']
            },
            'Construction SEO': {
                description: 'construction company SEO',
                benefits: ['Win commercial projects', 'Build industry reputation', 'Generate qualified leads', 'Showcase expertise'],
                process: ['Construction Industry Analysis', 'Project-Based SEO', 'Safety Content Creation', 'Local Authority Building', 'Portfolio Optimization', 'Lead Generation Tracking']
            },
            'Professional Services': {
                description: 'professional services SEO',
                benefits: ['Attract corporate clients', 'Build professional authority', 'Increase service inquiries', 'Generate quality leads'],
                process: ['Professional Market Analysis', 'Service Area Optimization', 'Thought Leadership Content', 'B2B Targeting', 'Industry Authority Building', 'Client Acquisition Metrics']
            },
            'Real Estate SEO': {
                description: 'property and real estate SEO',
                benefits: ['Generate property leads', 'Build market authority', 'Increase listings', 'Attract buyers and sellers'],
                process: ['Property Market Research', 'Location-Based SEO', 'Property Listing Optimization', 'Market Analysis Content', 'Local Authority Building', 'Lead Conversion Tracking']
            },
            'Roofing SEO': {
                description: 'roofing contractor SEO',
                benefits: ['Emergency repair calls', 'Installation projects', 'Insurance work leads', 'Local area dominance'],
                process: ['Roofing Market Analysis', 'Emergency Call Optimization', 'Insurance SEO Targeting', 'Seasonal Campaign Management', 'Review Generation', 'Project Lead Tracking']
            }
        };

        this.init();
    }

    init() {
        this.parseUrlAndSetData();
        this.updatePageMeta();
        this.generatePageContent();
        this.updateStructuredData();
    }

    parseUrlAndSetData() {
        const urlParams = new URLSearchParams(window.location.search);
        const pathname = window.location.pathname;

        if (urlParams.get('city') || urlParams.get('service')) {
            this.city = urlParams.get('city') || this.city;
            this.service = urlParams.get('service') || this.service;
            return;
        }

        const cleanUrlMatch = pathname.match(/best-seo-company-([a-zA-Z0-9\-]+)\.html$/);
        if (cleanUrlMatch) {
            this.city = this.unslugify(cleanUrlMatch[1]);
            this.service = 'SEO Company';
            return;
        }

        const serviceUrlMatch = pathname.match(/best-([a-zA-Z0-9\-]+)-seo-services-uk\.html$/);
        if (serviceUrlMatch) {
            this.service = this.unslugify(serviceUrlMatch[1]) + ' SEO';
            return;
        }
    }

    unslugify(slug) {
        return slug.replace(/-/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace(/&/g, '&');
    }

    updatePageMeta() {
        const title = `Best ${this.service} in ${this.city} | ${this.companyName}`;
        const description = `Leading ${this.service.toLowerCase()} in ${this.city}. Professional ${this.servicesData[this.service]?.description || 'digital marketing'} services to help your business grow online. Get your free consultation today!`;

        document.title = title;
        const titleElement = document.getElementById('dynamic-title');
        if (titleElement) titleElement.textContent = title;

        const descElement = document.getElementById('dynamic-description');
        if (descElement) descElement.setAttribute('content', description);

        const ogTitleElement = document.getElementById('dynamic-og-title');
        if (ogTitleElement) ogTitleElement.setAttribute('content', title);

        const ogDescElement = document.getElementById('dynamic-og-description');
        if (ogDescElement) ogDescElement.setAttribute('content', description);

        const ogUrlElement = document.getElementById('dynamic-og-url');
        if (ogUrlElement) ogUrlElement.setAttribute('content', `${this.baseUrl}/best-seo-company-${this.slugify(this.city)}.html`);

        const canonicalElement = document.getElementById('dynamic-canonical');
        if (canonicalElement) canonicalElement.setAttribute('href', `${this.baseUrl}/best-seo-company-${this.slugify(this.city)}.html`);
    }

    generatePageContent() {
        const container = document.getElementById('dynamic-content-container');
        if (!container) return;

        const cityInfo = this.cityData[this.city] || this.cityData['Birmingham'];
        const serviceInfo = this.servicesData[this.service] || this.servicesData['SEO Company'];

        const content = `
            <!-- Hero Section - Matching Homepage Style -->
            <section class="hero-modern">
                <div class="floating-particles"></div>
                <div class="container">
                    <div class="hero-content-grid">
                        <div class="hero-left">
                            <div class="award-badge">
                                <i class="fas fa-trophy"></i>
                                <span>Trusted ${this.service} in ${this.city}</span>
                            </div>
                            <h1>Best ${this.service} in ${this.city} | ${this.companyName}</h1>
                            <p>We're passionate about helping ${this.city} businesses reach their full potential online. Our friendly team specializes in supporting construction companies, law firms, dental practices, and local businesses. Through our collaborative approach, we work together to achieve meaningful growth and lasting online success in ${cityInfo.region}.</p>
                            <div class="hero-buttons">
                                <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">
                                    <i class="fas fa-search"></i>
                                    Get Your Free Audit
                                </a>
                                <a href="tel:+447411575188" class="btn btn-secondary-modern">
                                    <i class="fas fa-phone"></i>
                                    Call: 07411575188
                                </a>
                            </div>
                        </div>
                        <div class="hero-right">
                            <div class="audit-card">
                                <div class="audit-header">
                                    <span class="audit-label">Valuable Insights - Completely FREE</span>
                                    <h3>FREE ${this.city.toUpperCase()} SEO AUDIT</h3>
                                </div>
                                <div class="audit-cta">
                                    <a href="${this.baseUrl}/contact" class="btn-audit">
                                        <i class="fas fa-search"></i>
                                        Claim Your FREE Audit
                                    </a>
                                </div>
                                <div class="audit-features">
                                    <ul>
                                        <li>✓ 47-point website analysis</li>
                                        <li>✓ ${this.city} competitor research</li>
                                        <li>✓ Custom SEO action plan</li>
                                        <li>✓ No obligations • Takes 2 minutes</li>
                                        <li>✓ Insights from 500+ UK businesses</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="cta-section-modern">
                <div class="container">
                    <div class="cta-content-modern">
                        <h2>Ready to Elevate Your ${this.city} Digital Presence?</h2>
                        <p>Partner with OutsourceSU and discover how we can help you achieve sustainable growth and establish market leadership in ${this.city}. Schedule a free consultation to get started.</p>
                        <div class="cta-buttons-modern">
                            <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">
                                <i class="fas fa-rocket"></i>
                                Get Free Consultation
                            </a>
                            <a href="tel:07411575188" class="btn btn-outline-modern">
                                <i class="fas fa-phone"></i>
                                Call: 07411575188
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;

        container.innerHTML = content;
    }

    slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    updateStructuredData() {
        const cityInfo = this.cityData[this.city] || this.cityData['Birmingham'];
        const serviceInfo = this.servicesData[this.service] || this.servicesData['SEO Company'];

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `${this.companyName} - ${this.service} ${this.city}`,
            "description": `Best ${this.service} in ${this.city}. Professional ${serviceInfo.description} services to help your business grow online.`,
            "url": `${this.baseUrl}/best-seo-company-${this.slugify(this.city)}`,
            "logo": {
                "@type": "ImageObject",
                "url": `${this.baseUrl}/attached_assets/logo1.png`
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": this.city,
                "addressRegion": cityInfo.region,
                "addressCountry": "UK"
            },
            "serviceType": this.service,
            "provider": {
                "@type": "Organization",
                "name": this.companyName,
                "url": this.baseUrl,
                "telephone": "+447411575188",
                "email": "info@outsourcesu.com"
            }
        };

        const structuredDataElement = document.getElementById('dynamic-structured-data');
        if (structuredDataElement) {
            structuredDataElement.textContent = JSON.stringify(structuredData, null, 2);
        }
    }
}

// Export for global access
window.DynamicCityGenerator = DynamicCityGenerator;