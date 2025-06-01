
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
            <!-- Hero Section -->
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
                            <p>${this.companyName} is a professional ${serviceInfo.description} agency offering tried-and-tested ${this.city} solutions tailored according to your unique needs. We leverage our extensive industry experience and expertise to help businesses across ${cityInfo.region} get discovered online and achieve maximum ROI.</p>
                            <div class="hero-buttons">
                                <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">
                                    <i class="fas fa-search"></i>
                                    Get Free ${this.city} SEO Audit
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
                                    <a href="${this.baseUrl}/contact.html" class="btn-audit">
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

            <!-- Why Choose Us Section -->
            <section class="why-choose-us">
                <div class="container">
                    <h2>Why Choose ${this.companyName} as Your ${this.city} ${this.service}?</h2>
                    <p class="section-intro">Entrust your website only to seasoned specialists. We understand that choosing the right digital marketing partner is crucial for your business success.</p>
                    <div class="benefits-grid">
                        ${serviceInfo.benefits.map((benefit, index) => `
                            <div class="benefit-card">
                                <div class="benefit-icon">
                                    <i class="fas fa-${this.getBenefitIcon(index)}"></i>
                                </div>
                                <h3>${benefit}</h3>
                                <p>Our proven strategies help ${this.city} businesses achieve ${benefit.toLowerCase()} through expert ${serviceInfo.description}. We use white-hat techniques and data-driven approaches.</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Services Section -->
            <section class="services-offered">
                <div class="container">
                    <h2>Our Comprehensive ${this.service} Services in ${this.city}</h2>
                    <p class="section-intro">We offer a complete range of SEO services designed to maximize your online presence and drive qualified leads to your business.</p>
                    <div class="services-grid">
                        <div class="service-item">
                            <i class="fas fa-search"></i>
                            <h4>Keyword Research & Strategy</h4>
                            <p>We take the time to look for and understand the search terms your ${this.city} target audience is using. Our keyword research forms the foundation of successful campaigns.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <h4>Local SEO ${this.city}</h4>
                            <p>Dominate local search results in ${this.city} with Google Business Profile optimization and local citation building to attract customers from ${cityInfo.region}.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-link"></i>
                            <h4>Link Building</h4>
                            <p>Build high-quality backlinks from relevant ${this.city} and industry sources using white-hat techniques to boost your authority and search rankings.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-edit"></i>
                            <h4>Content Writing</h4>
                            <p>Our skilled editorial team creates high-quality, optimized, and original content that appeals to search engines and draws prospects to your business.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-cogs"></i>
                            <h4>Technical SEO</h4>
                            <p>We implement practical techniques like technical SEO audits, fixing broken links, and improving site speed to keep your website crawlable and indexable.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-chart-line"></i>
                            <h4>On-Page SEO</h4>
                            <p>Proven on-page SEO tactics including keyword-rich meta descriptions, optimized title tags, and structured data to improve your search visibility.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-mobile-alt"></i>
                            <h4>Mobile SEO</h4>
                            <p>Ensure your website performs perfectly on mobile devices for ${this.city} users with mobile-first optimization strategies.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-analytics"></i>
                            <h4>Analytics & Reporting</h4>
                            <p>Comprehensive monthly reports showing your progress, ROI, and performance metrics in the ${this.city} market with actionable insights.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Local Expertise Section -->
            <section class="local-expertise">
                <div class="container">
                    <div class="local-content">
                        <div class="local-info">
                            <h2>Local ${this.city} Expertise You Can Trust</h2>
                            <p>We understand the unique business landscape of ${this.city} and ${cityInfo.region}. Our local expertise helps your business connect with customers across all major business districts and surrounding areas.</p>
                            <div class="local-areas">
                                ${cityInfo.businessDistricts.map(district => `
                                    <div class="area-tag">${district}</div>
                                `).join('')}
                            </div>
                            <div class="city-stats">
                                <div class="city-stat">
                                    <i class="fas fa-users"></i>
                                    <strong>Population:</strong> ${cityInfo.population}
                                </div>
                                <div class="city-stat">
                                    <i class="fas fa-building"></i>
                                    <strong>Key Industries:</strong> ${cityInfo.keyIndustries.join(', ')}
                                </div>
                                <div class="city-stat">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <strong>Region:</strong> ${cityInfo.region}
                                </div>
                            </div>
                        </div>
                        <div class="process-overview">
                            <h3>Our Proven ${this.service} Process</h3>
                            <p>We follow a streamlined, results-driven process that delivers measurable results for ${this.city} businesses.</p>
                            <div class="process-steps">
                                ${serviceInfo.process.map((step, index) => `
                                    <div class="process-step">
                                        <div class="step-number">${index + 1}</div>
                                        <span>${step}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Why Choose OutsourceSU Section -->
            <section class="why-outsourcesu">
                <div class="container">
                    <h2>Why Choose ${this.companyName} As Your ${this.city} SEO Agency</h2>
                    <div class="reasons-grid">
                        <div class="reason-card">
                            <div class="reason-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <h4>We Keep Our SEO Skills Sharp</h4>
                            <p>We understand that SEO never remains stagnant since Google updates its ranking factors regularly. Our strategists stay current with algorithm changes and industry trends.</p>
                        </div>
                        <div class="reason-card">
                            <div class="reason-icon">
                                <i class="fas fa-puzzle-piece"></i>
                            </div>
                            <h4>Avoid Cookie-Cutter Approaches</h4>
                            <p>Your unique business needs deserve unique solutions. We create bespoke SEO strategies relevant to your needs, branding, and goals in the ${this.city} market.</p>
                        </div>
                        <div class="reason-card">
                            <div class="reason-icon">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <h4>Streamlined Collaboration</h4>
                            <p>Your dedicated SEO consultant works closely with you, serving as the point person for all your SEO needs with relentless support and timely executions.</p>
                        </div>
                        <div class="reason-card">
                            <div class="reason-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h4>We Keep You in the Loop</h4>
                            <p>Regular updates with upfront, complete, and actionable reports. You'll always know how your ${this.city} SEO campaigns are performing.</p>
                        </div>
                        <div class="reason-card">
                            <div class="reason-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <h4>Full-Service Digital Agency</h4>
                            <p>Beyond SEO, we offer web design, PPC, social media marketing, and more. Your one-stop shop for all digital marketing needs in ${this.city}.</p>
                        </div>
                        <div class="reason-card">
                            <div class="reason-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h4>Trusted & Ethical Practices</h4>
                            <p>We're committed to honesty and personal accountability, using only white-hat SEO techniques that deliver sustainable, long-term results.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Testimonials Section -->
            <section class="testimonials">
                <div class="container">
                    <h2>What Our ${this.city} Clients Say</h2>
                    <div class="testimonials-grid">
                        <div class="testimonial">
                            <div class="testimonial-content">
                                <p>"${this.companyName} transformed our online presence completely. We're now ranking #1 for our main keywords in ${this.city} and seeing 300% more qualified enquiries every month."</p>
                                <div class="testimonial-author">
                                    <strong>Sarah Mitchell</strong>
                                    <span>Local Business Owner, ${this.city}</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial">
                            <div class="testimonial-content">
                                <p>"Professional service and outstanding results. Our website traffic has increased dramatically since working with ${this.companyName}. They really understand the ${this.city} market."</p>
                                <div class="testimonial-author">
                                    <strong>James Thompson</strong>
                                    <span>${this.city} Business Director</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial">
                            <div class="testimonial-content">
                                <p>"The team understands the ${this.city} market perfectly. They've helped us reach customers we never thought possible and our ROI has been exceptional."</p>
                                <div class="testimonial-author">
                                    <strong>Emma Wilson</strong>
                                    <span>Company Director, ${cityInfo.region}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Industry Services Section -->
            <section class="industry-services">
                <div class="container">
                    <h2>Specialized SEO Services for ${this.city} Industries</h2>
                    <p class="section-intro">We provide tailored SEO solutions for various industries, understanding the unique challenges and opportunities each sector faces.</p>
                    <div class="industry-grid">
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-law-firm-seo.html">Law Firm SEO</a></h4>
                            <p>Specialized SEO for legal practices in ${this.city}</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-dentists-seo.html">Dentist SEO</a></h4>
                            <p>Dental practice SEO to attract new patients</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-accountants-seo.html">Accountant SEO</a></h4>
                            <p>Financial services SEO for accounting firms</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-architects-seo.html">Architect SEO</a></h4>
                            <p>Professional SEO for architectural firms</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-plumbers-seo.html">Plumber SEO</a></h4>
                            <p>Local SEO for plumbing services</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-electrician-seo.html">Electrician SEO</a></h4>
                            <p>Electrical contractor SEO services</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-heating-engineer-seo.html">Heating Engineer SEO</a></h4>
                            <p>HVAC and heating specialist SEO</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-contractors-seo.html">Contractors SEO</a></h4>
                            <p>Construction contractor SEO services</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-medical-seo.html">Medical SEO</a></h4>
                            <p>Healthcare practice SEO solutions</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/best-financial-seo.html">Financial Services SEO</a></h4>
                            <p>Financial advisory and services SEO</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/construction-seo.html">Construction SEO</a></h4>
                            <p>Construction company digital marketing</p>
                        </div>
                        <div class="industry-card">
                            <h4><a href="${this.baseUrl}/real-estate-seo.html">Real Estate SEO</a></h4>
                            <p>Property and real estate SEO services</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Free SEO Audit Section -->
            <section class="free-audit-section">
                <div class="container">
                    <div class="audit-content">
                        <h2>Get Your FREE Instant SEO Audit Report Now!</h2>
                        <p>Discover exactly what's holding your website back from ranking #1 in ${this.city}. Our comprehensive SEO audit reveals:</p>
                        <ul class="audit-benefits">
                            <li><i class="fas fa-check"></i> Technical SEO issues affecting your rankings</li>
                            <li><i class="fas fa-check"></i> Keyword opportunities you're missing</li>
                            <li><i class="fas fa-check"></i> Competitor analysis and gaps</li>
                            <li><i class="fas fa-check"></i> Local SEO optimization opportunities</li>
                            <li><i class="fas fa-check"></i> Content strategy recommendations</li>
                        </ul>
                        <div class="audit-cta">
                            <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">Get Free SEO Audit</a>
                            <p class="audit-note">No obligations • Detailed 20-page report • ${this.city} market analysis included</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact CTA Section -->
            <section class="contact-cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Ready to Dominate ${this.city} Search Results?</h2>
                        <p>Get a free SEO consultation and discover how we can help your business achieve #1 rankings in ${this.city}. Join hundreds of successful businesses that trust ${this.companyName}.</p>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <strong>Call Us</strong>
                                    <span>07411575188</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <strong>Email Us</strong>
                                    <span>info@outsourcesu.com</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Serving</strong>
                                    <span>${this.city} & ${cityInfo.region}</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Response Time</strong>
                                    <span>Within 1 Hour</span>
                                </div>
                            </div>
                        </div>
                        <div class="cta-buttons">
                            <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">
                                <i class="fas fa-rocket"></i>
                                Get Free Consultation
                            </a>
                            <a href="tel:+447411575188" class="btn btn-outline-modern">
                                <i class="fas fa-phone"></i>
                                Call: 07411575188
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Related Cities Section -->
            <section class="related-cities">
                <div class="container">
                    <h2>We Also Serve These UK Locations</h2>
                    <p class="section-intro">Discover our professional SEO services in other major UK cities and regions.</p>
                    <div class="cities-grid">
                        ${Object.keys(this.cityData).filter(city => city !== this.city).slice(0, 8).map(city => `
                            <div class="city-card">
                                <h4><a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=${encodeURIComponent(this.service)}">${this.service} ${city}</a></h4>
                                <p>Professional ${this.serviceData[this.service]?.description || 'SEO'} services in ${city}</p>
                                <a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=${encodeURIComponent(this.service)}" class="learn-more">Learn More →</a>
                            </div>
                        `).join('')}
                    </div>
                    <div class="view-all-cities">
                        <a href="${this.baseUrl}/uk-directory.html" class="btn btn-outline-modern">View All UK Locations</a>
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
