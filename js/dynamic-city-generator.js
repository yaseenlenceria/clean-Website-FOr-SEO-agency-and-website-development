// Dynamic City Generator for SEO Services Pages
class DynamicCityGenerator {
    constructor(city, service) {
        this.city = city || 'Birmingham';
        this.service = service || 'SEO Company';
        this.companyName = 'OutsourceSU';
        this.baseUrl = 'https://outsourcesu.com';

        this.services = [
            'Law Firm SEO',
            'Dentist SEO', 
            'Accountant SEO',
            'Architect SEO',
            'Plumber SEO',
            'Electrician SEO',
            'Heating Engineer SEO',
            'Contractors SEO',
            'Medical SEO',
            'Financial Services SEO',
            'Construction SEO',
            'Professional Services SEO',
            'Real Estate SEO',
            'Roofing SEO'
        ];

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
        this.generateDynamicPage();
        this.updatePageMeta();
        this.initializeAnimations();
    }

    generateDynamicPage() {
        const container = document.getElementById('dynamic-content-container');
        if (!container) return;

        const content = `
            <!-- Hero Section -->
            <section class="hero-modern">
                <div class="hero-background-modern">
                    <div class="hero-overlay-modern"></div>
                </div>
                <div class="container">
                    <div class="hero-content-modern">
                        <h1 class="hero-title-modern">
                            ${this.city} ${this.service} Services
                            <span class="highlight-modern">Driving Results</span>
                        </h1>
                        <p class="hero-subtitle-modern">
                            Professional SEO services in ${this.city}. We help businesses dominate local search results 
                            and drive qualified traffic that converts into customers.
                        </p>
                        <div class="hero-stats-modern">
                            <div class="stat-modern">
                                <span class="stat-number-modern">500+</span>
                                <span class="stat-label-modern">Clients Served</span>
                            </div>
                            <div class="stat-modern">
                                <span class="stat-number-modern">300%</span>
                                <span class="stat-label-modern">Avg Traffic Increase</span>
                            </div>
                            <div class="stat-modern">
                                <span class="stat-number-modern">90 Days</span>
                                <span class="stat-label-modern">To See Results</span>
                            </div>
                        </div>
                        <div class="hero-cta-modern">
                            <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">
                                <i class="fas fa-rocket"></i>
                                Get Free ${this.city} SEO Audit
                            </a>
                            <a href="${this.baseUrl}/our-work" class="btn btn-outline-modern">
                                <i class="fas fa-chart-line"></i>
                                View Case Studies
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Section -->
            <section class="services-section-modern">
                <div class="container">
                    <div class="section-header-modern">
                        <h2>Our ${this.city} SEO Services</h2>
                        <p>Comprehensive digital marketing solutions designed to help your ${this.city} business thrive online</p>
                    </div>
                    <div class="services-grid-modern">
                        <div class="service-card-modern">
                            <div class="service-icon-modern">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3>Local SEO ${this.city}</h3>
                            <p>Dominate local search results in ${this.city} with our proven local SEO strategies. Get found by customers when they need your services most.</p>
                            <ul class="service-features-modern">
                                <li><i class="fas fa-check"></i>Google My Business optimization</li>
                                <li><i class="fas fa-check"></i>Local citation building</li>
                                <li><i class="fas fa-check"></i>Review management</li>
                                <li><i class="fas fa-check"></i>Local keyword targeting</li>
                            </ul>
                        </div>
                        <div class="service-card-modern">
                            <div class="service-icon-modern">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <h3>Technical SEO</h3>
                            <p>Optimize your website's technical foundation for better search engine crawling and indexing in ${this.city} markets.</p>
                            <ul class="service-features-modern">
                                <li><i class="fas fa-check"></i>Site speed optimization</li>
                                <li><i class="fas fa-check"></i>Mobile optimization</li>
                                <li><i class="fas fa-check"></i>Schema markup</li>
                                <li><i class="fas fa-check"></i>Technical audits</li>
                            </ul>
                        </div>
                        <div class="service-card-modern">
                            <div class="service-icon-modern">
                                <i class="fas fa-edit"></i>
                            </div>
                            <h3>Content Marketing</h3>
                            <p>Engaging, SEO-optimized content that resonates with your ${this.city} audience and drives organic traffic.</p>
                            <ul class="service-features-modern">
                                <li><i class="fas fa-check"></i>Keyword research</li>
                                <li><i class="fas fa-check"></i>Content strategy</li>
                                <li><i class="fas fa-check"></i>Blog writing</li>
                                <li><i class="fas fa-check"></i>On-page optimization</li>
                            </ul>
                        </div>
                        <div class="service-card-modern">
                            <div class="service-icon-modern">
                                <i class="fas fa-link"></i>
                            </div>
                            <h3>Link Building</h3>
                            <p>High-quality backlinks from authoritative ${this.city} and industry-relevant websites to boost your search rankings.</p>
                            <ul class="service-features-modern">
                                <li><i class="fas fa-check"></i>Local link building</li>
                                <li><i class="fas fa-check"></i>Industry partnerships</li>
                                <li><i class="fas fa-check"></i>Content outreach</li>
                                <li><i class="fas fa-check"></i>Competitor analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Why Choose Us Section -->
            <section class="why-choose-section-modern">
                <div class="container">
                    <div class="why-choose-content-modern">
                        <div class="why-choose-text-modern">
                            <h2>Why Choose ${this.companyName} for ${this.city} SEO?</h2>
                            <p>We're not just another SEO agency. We're your dedicated partners in digital growth, with deep expertise in the ${this.city} market.</p>
                            <div class="benefits-list-modern">
                                <div class="benefit-item-modern">
                                    <i class="fas fa-trophy"></i>
                                    <div>
                                        <h4>Proven Results</h4>
                                        <p>500+ successful ${this.city} businesses trust us with their SEO</p>
                                    </div>
                                </div>
                                <div class="benefit-item-modern">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div>
                                        <h4>Local Expertise</h4>
                                        <p>Deep understanding of ${this.city} market dynamics</p>
                                    </div>
                                </div>
                                <div class="benefit-item-modern">
                                    <i class="fas fa-chart-line"></i>
                                    <div>
                                        <h4>Transparent Reporting</h4>
                                        <p>Monthly detailed reports showing your progress</p>
                                    </div>
                                </div>
                                <div class="benefit-item-modern">
                                    <i class="fas fa-headset"></i>
                                    <div>
                                        <h4>Dedicated Support</h4>
                                        <p>Direct access to your SEO specialist team</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="why-choose-image-modern">
                            <img src="attached_assets/Professional_SEO__Web_Development_Services_for_Business_Growth_1.png" alt="${this.city} SEO Services" loading="lazy">
                        </div>
                    </div>
                </div>
            </section>

            <!-- Process Section -->
            <section class="process-section-modern">
                <div class="container">
                    <div class="section-header-modern">
                        <h2>Our ${this.city} SEO Process</h2>
                        <p>A proven methodology that delivers consistent results for ${this.city} businesses</p>
                    </div>
                    <div class="process-steps-modern">
                        <div class="process-step-modern">
                            <div class="step-number-modern">01</div>
                            <div class="step-content-modern">
                                <h3>Discovery & Audit</h3>
                                <p>Comprehensive analysis of your current online presence and ${this.city} market opportunities</p>
                            </div>
                        </div>
                        <div class="process-step-modern">
                            <div class="step-number-modern">02</div>
                            <div class="step-content-modern">
                                <h3>Strategy Development</h3>
                                <p>Custom SEO strategy tailored to your business goals and ${this.city} market requirements</p>
                            </div>
                        </div>
                        <div class="process-step-modern">
                            <div class="step-number-modern">03</div>
                            <div class="step-content-modern">
                                <h3>Implementation</h3>
                                <p>Expert execution of on-page, off-page, and technical SEO optimizations</p>
                            </div>
                        </div>
                        <div class="process-step-modern">
                            <div class="step-number-modern">04</div>
                            <div class="step-content-modern">
                                <h3>Monitoring & Optimization</h3>
                                <p>Continuous monitoring with detailed monthly reports and ongoing optimizations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Industries Section -->
            <section class="industries-section-modern">
                <div class="container">
                    <div class="section-header-modern">
                        <h2>Industries We Serve in ${this.city}</h2>
                        <p>Specialized SEO strategies for different business sectors in ${this.city}</p>
                    </div>
                    <div class="industries-grid-modern">
                        ${this.services.map(service => `
                            <div class="industry-card-modern">
                                <div class="industry-icon-modern">
                                    <i class="fas fa-${this.getServiceIcon(service)}"></i>
                                </div>
                                <h3>${service}</h3>
                                <p>Specialized SEO for ${service.replace(' SEO', '').toLowerCase()} businesses in ${this.city}</p>
                                <a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo" class="industry-link-modern">
                                    Learn More <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Testimonials Section -->
            <section class="testimonials-section-modern">
                <div class="container">
                    <div class="section-header-modern">
                        <h2>What Our ${this.city} Clients Say</h2>
                        <p>Real results from real businesses in ${this.city}</p>
                    </div>
                    <div class="testimonials-grid-modern">
                        <div class="testimonial-card-modern">
                            <div class="testimonial-rating-modern">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p>"${this.companyName} transformed our online presence. We're now ranking #1 for our main keywords in ${this.city} and our leads have increased by 400%."</p>
                            <div class="testimonial-author-modern">
                                <strong>Sarah Johnson</strong>
                                <span>${this.city} Business Owner</span>
                            </div>
                        </div>
                        <div class="testimonial-card-modern">
                            <div class="testimonial-rating-modern">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p>"Professional service and outstanding results. Our website traffic has increased by 300% since working with ${this.companyName}. Highly recommended!"</p>
                            <div class="testimonial-author-modern">
                                <strong>Michael Davis</strong>
                                <span>${this.city} Company Director</span>
                            </div>
                        </div>
                        <div class="testimonial-card-modern">
                            <div class="testimonial-rating-modern">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p>"The team at ${this.companyName} really understands the ${this.city} market. Our ROI has been incredible since partnering with them."</p>
                            <div class="testimonial-author-modern">
                                <strong>Emma Thompson</strong>
                                <span>${this.city} Marketing Manager</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="cta-section-modern">
                <div class="container">
                    <div class="cta-content-modern">
                        <h2>Ready to Dominate ${this.city} Search Results?</h2>
                        <p>Get a free SEO audit and discover how we can help your ${this.city} business achieve #1 rankings and drive more qualified leads.</p>
                        <div class="cta-buttons-modern">
                            <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">
                                <i class="fas fa-rocket"></i>
                                Get Free SEO Audit
                            </a>
                            <a href="tel:+448001234567" class="btn btn-outline-modern">
                                <i class="fas fa-phone"></i>
                                Call Now: 0800 123 4567
                            </a>
                        </div>
                        <div class="cta-features-modern">
                            <div class="cta-feature-modern">
                                <i class="fas fa-check-circle"></i>
                                <span>No Long-term Contracts</span>
                            </div>
                            <div class="cta-feature-modern">
                                <i class="fas fa-check-circle"></i>
                                <span>Transparent Pricing</span>
                            </div>
                            <div class="cta-feature-modern">
                                <i class="fas fa-check-circle"></i>
                                <span>Proven Results</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FAQ Section -->
            <section class="faq-section-modern">
                <div class="container">
                    <div class="section-header-modern">
                        <h2>Frequently Asked Questions</h2>
                        <p>Common questions about SEO services in ${this.city}</p>
                    </div>
                    <div class="faq-grid-modern">
                        <div class="faq-item-modern">
                            <h3>How long does SEO take to work in ${this.city}?</h3>
                            <p>Typically, you'll start seeing improvements in 3-6 months, with significant results in 6-12 months. The ${this.city} market competitiveness affects timelines.</p>
                        </div>
                        <div class="faq-item-modern">
                            <h3>Do you guarantee #1 rankings in ${this.city}?</h3>
                            <p>While we can't guarantee specific rankings, we guarantee improved visibility, traffic, and leads. Our ${this.city} clients see an average 300% increase in organic traffic.</p>
                        </div>
                        <div class="faq-item-modern">
                            <h3>What makes your ${this.city} SEO services different?</h3>
                            <p>We combine deep local market knowledge with proven SEO strategies. Our team understands ${this.city} consumer behavior and competition.</p>
                        </div>
                        <div class="faq-item-modern">
                            <h3>Do you work with small businesses in ${this.city}?</h3>
                            <p>Yes! We work with businesses of all sizes in ${this.city}, from startups to established enterprises. Our strategies are scalable to fit any budget.</p>
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

    getServiceIcon(service) {
        const iconMap = {
            'Law Firm SEO': 'gavel',
            'Dentist SEO': 'tooth',
            'Accountant SEO': 'calculator',
            'Architect SEO': 'drafting-compass',
            'Plumber SEO': 'wrench',
            'Electrician SEO': 'bolt',
            'Heating Engineer SEO': 'fire',
            'Contractors SEO': 'hard-hat',
            'Medical SEO': 'stethoscope',
            'Financial Services SEO': 'chart-line',
            'Construction SEO': 'hammer',
            'Professional Services SEO': 'briefcase',
            'Real Estate SEO': 'home',
            'Roofing SEO': 'home'
        };
        return iconMap[service] || 'cog';
    }

    updatePageMeta() {
        document.title = `${this.city} ${this.service} Services | ${this.companyName} - Expert Local SEO`;

        const description = `Professional ${this.service.toLowerCase()} services in ${this.city}. Help your business dominate local search results with proven SEO strategies. Get a free audit today!`;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        } else {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            metaDesc.setAttribute('content', description);
            document.head.appendChild(metaDesc);
        }

        // Update Open Graph tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', `${this.city} ${this.service} Services | ${this.companyName}`);
        }

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', description);
        }

        const ogUrlElement = document.getElementById('dynamic-og-url');
        if (ogUrlElement) ogUrlElement.setAttribute('content', `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`);
        
        // Update canonical URL
        const canonicalElement = document.getElementById('dynamic-canonical');
        if (canonicalElement) canonicalElement.setAttribute('href', `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`);
    }

    initializeAnimations() {
        // Add scroll animations and interactive elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        setTimeout(() => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });
        }, 100);
    }

    slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
}

// Export for global access
window.DynamicCityGenerator = DynamicCityGenerator;