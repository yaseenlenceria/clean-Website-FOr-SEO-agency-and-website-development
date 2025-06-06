
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

        this.serviceData = {
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
        this.updatePageMeta();
        this.generatePageContent();
        this.updateStructuredData();
    }

    updatePageMeta() {
        const title = `Best ${this.service} in ${this.city} | ${this.companyName}`;
        const description = `Leading ${this.service.toLowerCase()} in ${this.city}. Professional ${this.serviceData[this.service]?.description || 'digital marketing'} services to help your business grow online. Get your free consultation today!`;
        
        // Update title
        document.title = title;
        const titleElement = document.getElementById('dynamic-title');
        if (titleElement) titleElement.textContent = title;
        
        // Update meta description
        const descElement = document.getElementById('dynamic-description');
        if (descElement) descElement.setAttribute('content', description);
        
        // Update Open Graph tags
        const ogTitleElement = document.getElementById('dynamic-og-title');
        if (ogTitleElement) ogTitleElement.setAttribute('content', title);
        
        const ogDescElement = document.getElementById('dynamic-og-description');
        if (ogDescElement) ogDescElement.setAttribute('content', description);
        
        const ogUrlElement = document.getElementById('dynamic-og-url');
        if (ogUrlElement) ogUrlElement.setAttribute('content', `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`);
        
        // Update canonical URL
        const canonicalElement = document.getElementById('dynamic-canonical');
        if (canonicalElement) canonicalElement.setAttribute('href', `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`);
    }

    generatePageContent() {
        const container = document.getElementById('dynamic-content-container');
        if (!container) return;

        const cityInfo = this.cityData[this.city] || this.cityData['Birmingham'];
        const serviceInfo = this.serviceData[this.service] || this.serviceData['SEO Company'];

        const content = `
            <!-- Hero Section - Matching Homepage Style -->
            <section class="hero-modern" style="background: var(--dark-bg);">
                <div class="floating-particles"></div>
                <div class="container">
                    <div class="hero-content-grid">
                        <div class="hero-left">
                            <div class="award-badge" style="background: var(--card-bg); border: 1px solid var(--border-dark); color: var(--accent-green);">
                                <i class="fas fa-trophy"></i>
                                <span>Trusted ${this.service} in ${this.city}</span>
                            </div>
                            <h1 style="color: var(--text-white);">Best ${this.service} in ${this.city} | ${this.companyName}</h1>
                            <p style="color: var(--text-gray);">We're passionate about helping ${this.city} businesses reach their full potential online. Our friendly team specializes in supporting construction companies, law firms, dental practices, and local businesses. Through our collaborative approach, we work together to achieve meaningful growth and lasting online success in ${cityInfo.region}.</p>
                            <div class="hero-buttons">
                                <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">
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
                            <div class="audit-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                                <div class="audit-header">
                                    <span class="audit-label" style="background: var(--accent-green); color: white;">Valuable Insights - Completely FREE</span>
                                    <h3 style="color: #333; background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-green) 50%, var(--secondary-color) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">FREE ${this.city.toUpperCase()} SEO AUDIT</h3>
                                </div>
                                <div class="audit-cta">
                                    <a href="${this.baseUrl}/contact.html" class="btn-audit">
                                        <i class="fas fa-search"></i>
                                        Claim Your FREE Audit
                                    </a>
                                </div>
                                <div class="audit-features">
                                    <ul>
                                        <li style="color: #333;">✓ 47-point website analysis</li>
                                        <li style="color: #333;">✓ ${this.city} competitor research</li>
                                        <li style="color: #333;">✓ Custom SEO action plan</li>
                                        <li style="color: #333;">✓ No obligations • Takes 2 minutes</li>
                                        <li style="color: #333;">✓ Insights from 500+ UK businesses</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Image Showcase Section - Matching Homepage -->
            <section class="image-showcase" style="background: var(--darker-bg);">
                <div class="container">
                    <div class="showcase-content">
                        <div class="showcase-text-left">
                            <h3 style="color: var(--primary-color);">${this.city} Specialists</h3>
                            <p style="color: var(--text-gray);">We focus on helping ${this.city} businesses in high-value industries where we've consistently delivered exceptional results and understand their unique local challenges.</p>
                            <ul class="showcase-features">
                                <li style="color: var(--text-light-gray);">Construction & Trade Companies in ${this.city}</li>
                                <li style="color: var(--text-light-gray);">Law Firms & Legal Services in ${cityInfo.region}</li>
                                <li style="color: var(--text-light-gray);">Dental & Medical Practices</li>
                                <li style="color: var(--text-light-gray);">Local ${this.city} Service Businesses</li>
                            </ul>
                        </div>
                        <div class="showcase-image">
                            <img src="attached_assets/Professional_SEO__Web_Development_Services_for_Business_Growth_1.png" alt="OutsourceSU - Best ${this.service} in ${this.city} - 500+ Clients Ranked #1" class="featured-image">
                        </div>
                        <div class="showcase-text-right">
                            <h3 style="color: var(--primary-color);">Proven ${this.city} Results</h3>
                            <p style="color: var(--text-gray);">Our data-driven SEO strategies have consistently helped ${this.city} businesses achieve top Google rankings and significantly increase their leads. We focus on long-term, sustainable growth in ${cityInfo.region}.</p>
                            <ul class="showcase-features">
                                <li style="color: var(--text-light-gray);">Top Google Rankings in ${this.city}</li>
                                <li style="color: var(--text-light-gray);">Substantial Increase in Website Traffic</li>
                                <li style="color: var(--text-light-gray);">Higher Quality Lead Generation</li>
                                <li style="color: var(--text-light-gray);">${this.city}-Specific Strategies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SEO Process Section - Matching Homepage -->
            <section class="seo-process-section" style="background: var(--darker-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">How Our ${this.city} SEO Process Works</h2>
                        <p style="color: var(--text-gray);">Simple, transparent steps to boost your search rankings and drive more relevant traffic in ${this.city}</p>
                    </div>
                    <div class="process-timeline">
                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">1</div>
                            <div class="step-badge free-badge">FREE</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-search-plus"></i>
                            </div>
                            <h3 style="color: #333;">Complete ${this.city} Website Review</h3>
                            <p style="color: #555;">We conduct a comprehensive analysis of your website to identify technical considerations, content opportunities, and areas for improvement specific to the ${this.city} market.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Technical SEO audit</li>
                                <li style="color: #333;">${this.city} content analysis</li>
                                <li style="color: #333;">Speed & performance check</li>
                                <li style="color: #333;">Mobile optimization review</li>
                            </ul>
                        </div>

                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">2</div>
                            <div class="step-badge free-badge">FREE</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 style="color: #333;">${this.city} Competitor Research</h3>
                            <p style="color: #555;">We'll analyze your ${this.city} competitors' strategies to understand what's working in your local market and identify opportunities for you to stand out.</p>
                            <ul class="step-features">
                                <li style="color: #333;">${this.city} competitor keyword analysis</li>
                                <li style="color: #333;">Local backlink gap analysis</li>
                                <li style="color: #333;">Content strategy review</li>
                                <li style="color: #333;">${cityInfo.region} market opportunity mapping</li>
                            </ul>
                        </div>

                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">3</div>
                            <div class="step-badge free-badge">FREE</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3 style="color: #333;">Detailed ${this.city} SEO Report</h3>
                            <p style="color: #555;">You'll receive a comprehensive report with actionable insights and a clear plan to improve your search rankings in ${this.city} and ${cityInfo.region}.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Priority action items for ${this.city}</li>
                                <li style="color: #333;">Local keyword opportunities</li>
                                <li style="color: #333;">Technical recommendations</li>
                                <li style="color: #333;">ROI projections</li>
                            </ul>
                        </div>
                    </div>

                    <div class="phase-separator">
                        <div class="phase-text">Ready to Explore the Next Steps in ${this.city}?</div>
                    </div>

                    <div class="process-timeline">
                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">4</div>
                            <div class="step-badge paid-badge">PAID</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3 style="color: #333;">${this.city} Strategy Implementation</h3>
                            <p style="color: #555;">Our expert team implements the SEO strategy specifically for ${this.city}, addressing technical aspects and optimizing your website for improved local visibility.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Technical fixes implementation</li>
                                <li style="color: #333;">On-page optimization for ${this.city}</li>
                                <li style="color: #333;">Local content creation & optimization</li>
                                <li style="color: #333;">${this.city} local SEO setup</li>
                            </ul>
                        </div>

                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">5</div>
                            <div class="step-badge paid-badge">ONGOING</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3 style="color: #333;">Monitor & Optimize for ${this.city}</h3>
                            <p style="color: #555;">We continuously monitor and optimize your SEO performance to ensure sustained growth and improved search rankings in ${this.city} and surrounding areas.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Monthly ${this.city} performance reports</li>
                                <li style="color: #333;">Local ranking tracking</li>
                                <li style="color: #333;">Content updates</li>
                                <li style="color: #333;">Strategy refinements</li>
                            </ul>
                        </div>
                    </div>

                    <div class="process-cta" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                        <h3 style="color: #333;">Get Your Free ${this.city} SEO Analysis Today</h3>
                        <p style="color: #555;">Discover how we can help your ${this.city} business thrive. Get your comprehensive website review, competitor analysis, and custom SEO strategy - completely free and without obligation.</p>
                        <div class="process-cta-buttons">
                            <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">
                                <i class="fas fa-search"></i>
                                Get Free SEO Analysis
                            </a>
                            <a href="tel:07411575188" class="btn btn-outline-modern" style="border: 2px solid var(--primary-color); color: var(--primary-color);">
                                <i class="fas fa-phone"></i>
                                Call: 07411575188
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Our Approach Section - Matching Homepage -->
            <section class="process-section-modern" style="background: var(--dark-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">Our ${this.city} Approach</h2>
                        <p style="color: var(--text-gray);">A collaborative, 4-step process to achieve lasting SEO success in ${this.city}</p>
                    </div>
                    <div class="process-grid-modern">
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">01</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3 style="color: #333;">Comprehensive ${this.city} SEO Audit</h3>
                            <p style="color: #555;">We begin with a deep dive into your website, ${this.city} competitors, and local market dynamics to uncover growth opportunities.</p>
                        </div>
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">02</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <h3 style="color: #333;">${this.city} Strategic Planning</h3>
                            <p style="color: #555;">We'll develop a custom SEO strategy tailored to your industry, ${this.city} target audience, and specific business objectives.</p>
                        </div>
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">03</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <h3 style="color: #333;">Expert ${this.city} Implementation</h3>
                            <p style="color: #555;">Our team will implement on-page, off-page, and technical SEO improvements using proven, effective methods for the ${this.city} market.</p>
                        </div>
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">04</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3 style="color: #333;">Monitor & Optimize</h3>
                            <p style="color: #555;">We provide continuous monitoring, detailed ${this.city} reporting, and data-driven optimization to ensure sustained improvement.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Showcase - Matching Homepage -->
            <section class="services-showcase" style="background: var(--darker-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">How We Can Help ${this.city} Businesses</h2>
                        <p style="color: var(--text-gray);">Specialized SEO solutions designed to drive growth for your ${this.city} business</p>
                    </div>
                    <div class="services-grid-modern">
                        <div class="service-card-modern" data-industry="construction" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="service-icon-modern">
                                <i class="fas fa-hammer"></i>
                            </div>
                            <h3 style="color: #333;">Construction & Trade SEO in ${this.city}</h3>
                            <p style="color: #555;">Improve your online visibility for contractors, roofers, plumbers, and construction companies in ${this.city} with our specialized SEO strategies.</p>
                            <ul class="service-highlights">
                                <li style="color: #333;">Roofing SEO Specialists in ${this.city}</li>
                                <li style="color: #333;">Plumber SEO Services</li>
                                <li style="color: #333;">Construction Company SEO</li>
                                <li style="color: #333;">Architect SEO</li>
                            </ul>
                            <a href="${this.baseUrl}/construction-seo.html" class="service-link" style="color: var(--primary-color);">
                                Explore Services <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>

                        <div class="service-card-modern" data-industry="professional" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="service-icon-modern">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                            <h3 style="color: #333;">Professional Services SEO in ${this.city}</h3>
                            <p style="color: #555;">Attract more clients for law firms, dentists, accountants, and financial services in ${this.city} with our expert SEO solutions.</p>
                            <ul class="service-highlights">
                                <li style="color: #333;">Law Firm SEO in ${this.city}</li>
                                <li style="color: #333;">Dentist SEO</li>
                                <li style="color: #333;">Accountant SEO</li>
                                <li style="color: #333;">Financial Services SEO</li>
                            </ul>
                            <a href="${this.baseUrl}/professional-services-seo.html" class="service-link" style="color: var(--primary-color);">
                                Explore Services <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>

                        <div class="service-card-modern" data-industry="realestate" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="service-icon-modern">
                                <i class="fas fa-home"></i>
                            </div>
                            <h3 style="color: #333;">Real Estate & Property SEO in ${this.city}</h3>
                            <p style="color: #555;">Generate quality leads for real estate agents and property companies in ${this.city} with our comprehensive SEO strategies.</p>
                            <ul class="service-highlights">
                                <li style="color: #333;">Estate Agent SEO in ${this.city}</li>
                                <li style="color: #333;">Property Management SEO</li>
                                <li style="color: #333;">Commercial Property SEO</li>
                                <li style="color: #333;">Lettings Agent SEO</li>
                            </ul>
                            <a href="${this.baseUrl}/real-estate-seo.html" class="service-link" style="color: var(--primary-color);">
                                Explore Services <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>

                        <div class="service-card-modern" data-industry="agency" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="service-icon-modern">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <h3 style="color: #333;">Agency Partnership Services</h3>
                            <p style="color: #555;">Enhance your service offerings with white-label SEO and partnership opportunities for ${this.city} agencies.</p>
                            <ul class="service-highlights">
                                <li style="color: #333;">White Label SEO</li>
                                <li style="color: #333;">Agency Partnerships</li>
                                <li style="color: #333;">Reseller Programs</li>
                                <li style="color: #333;">Custom Solutions</li>
                            </ul>
                            <a href="${this.baseUrl}/services.html" class="service-link" style="color: var(--primary-color);">
                                Explore Services <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Testimonials Section - Matching Homepage -->
            <section class="testimonials-section" style="background: var(--card-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">${this.city} Client Success Stories</h2>
                        <p style="color: var(--text-gray);">Hear from ${this.city} businesses achieving real results</p>
                    </div>
                    <div class="testimonials-grid">
                        <div class="testimonial-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="stars" style="color: #ffc107;">★★★★★</div>
                            <blockquote style="color: #333;">"OutsourceSU helped our construction company in ${this.city} go from page 3 to #1 on Google in just 4 months, resulting in a 400% increase in quality leads!"</blockquote>
                            <cite style="color: var(--primary-color);">— John Thompson, Managing Director, Thompson Construction Ltd (${this.city})</cite>
                        </div>
                        <div class="testimonial-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="stars" style="color: #ffc107;">★★★★★</div>
                            <blockquote style="color: #333;">"As a law firm in ${this.city}, we needed expert SEO, and OutsourceSU delivered. We now rank #1 for 'solicitors ${this.city},' and our revenue has doubled."</blockquote>
                            <cite style="color: var(--primary-color);">— Sarah Williams, Partner, Williams & Associates Law (${this.city})</cite>
                        </div>
                        <div class="testimonial-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="stars" style="color: #ffc107;">★★★★★</div>
                            <blockquote style="color: #333;">"The best investment we've made. Our dental practice in ${this.city} now gets 50+ new patient inquiries per month thanks to OutsourceSU's dental SEO expertise."</blockquote>
                            <cite style="color: var(--primary-color);">— Dr. Michael Brown, Brown Dental Practice (${this.city})</cite>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section - Matching Homepage -->
            <section class="cta-section-modern" style="background: var(--gradient-dark);">
                <div class="container">
                    <div class="cta-content-modern">
                        <h2 style="color: var(--text-white);">Ready to Elevate Your ${this.city} Digital Presence?</h2>
                        <p style="color: var(--text-gray);">Partner with OutsourceSU and discover how we can help you achieve sustainable growth and establish market leadership in ${this.city}. Schedule a free consultation to get started.</p>
                        <div class="cta-buttons-modern">
                            <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">
                                <i class="fas fa-rocket"></i>
                                Get Free Consultation
                            </a>
                            <a href="tel:07411575188" class="btn btn-outline-modern" style="border: 2px solid var(--primary-color); color: var(--text-white);">
                                <i class="fas fa-phone"></i>
                                Call: 07411575188
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Related Cities Section -->
            <section class="related-cities" style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">We Also Serve These UK Locations</h2>
                        <p style="color: var(--text-light-gray);">Discover our professional SEO services in other major UK cities and regions.</p>
                    </div>
                    <div class="cities-grid-modern">
                        ${Object.keys(this.cityData).filter(city => city !== this.city).slice(0, 8).map(city => `
                            <div class="service-card-modern related-city-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                                <div class="service-icon-modern">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <h3><a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=${encodeURIComponent(this.service)}" style="color: #333; text-decoration: none;">${this.service} ${city}</a></h3>
                                <p style="color: #555;">Professional ${this.serviceData[this.service]?.description || 'SEO'} services in ${city}. Local expertise for ${this.cityData[city]?.region || 'the region'} businesses.</p>
                                <ul class="service-highlights">
                                    <li style="color: #333;">Local ${city} SEO specialists</li>
                                    <li style="color: #333;">Proven ${this.cityData[city]?.region || 'regional'} results</li>
                                    <li style="color: #333;">Industry-specific strategies</li>
                                    <li style="color: #333;">Free consultation available</li>
                                </ul>
                                <a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=${encodeURIComponent(this.service)}" class="service-link" style="color: var(--primary-color);">
                                    Learn More <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                    <div class="view-all-cities" style="text-align: center; margin-top: 40px;">
                        <a href="${this.baseUrl}/uk-directory.html" class="btn btn-outline-modern" style="border: 2px solid var(--primary-color); color: var(--text-white);">View All UK Locations</a>
                    </div>
                </div>
            </section>
        `;

        container.innerHTML = content;
    }

    getBenefitIcon(index) {
        const icons = ['chart-line', 'users', 'bullseye', 'eye', 'star', 'trophy'];
        return icons[index] || 'star';
    }

    updateStructuredData() {
        const cityInfo = this.cityData[this.city] || this.cityData['Birmingham'];
        const serviceInfo = this.serviceData[this.service] || this.serviceData['SEO Company'];
        
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `${this.companyName} - ${this.service} ${this.city}`,
            "description": `Best ${this.service} in ${this.city}. Professional ${serviceInfo.description} services to help your business grow online.`,
            "url": `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`,
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
            "areaServed": [
                {
                    "@type": "Place",
                    "name": `${this.city}, ${cityInfo.region}`
                },
                {
                    "@type": "Place", 
                    "name": cityInfo.region
                }
            ],
            "serviceType": this.service,
            "provider": {
                "@type": "Organization",
                "name": this.companyName,
                "url": this.baseUrl,
                "telephone": "+447411575188",
                "email": "info@outsourcesu.com"
            },
            "priceRange": "£500-£5000",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "247"
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
