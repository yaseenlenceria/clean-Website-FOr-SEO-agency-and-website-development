// Dynamic Directory Generator for UK Cities and Services
class DynamicDirectoryGenerator {
    constructor() {
        this.baseUrl = 'https://outsourcesu.com';
        this.currentType = 'directory'; // Can be 'directory', 'city', 'service', or 'combined'

        // UK Cities Data
        this.ukCities = {
            'London': {
                region: 'Greater London',
                population: '9 million',
                industries: ['Finance', 'Technology', 'Creative Industries', 'Tourism'],
                description: 'The UK\'s capital and largest city, a global financial and technology hub'
            },
            'Manchester': {
                region: 'Greater Manchester', 
                population: '547,000',
                industries: ['Technology', 'Media', 'Finance', 'Education'],
                description: 'A major northern English city known for its industrial heritage and modern innovation'
            },
            'Birmingham': {
                region: 'West Midlands',
                population: '1.1 million', 
                industries: ['Manufacturing', 'Finance', 'Professional Services', 'Retail'],
                description: 'The UK\'s second-largest city and a major commercial and cultural center'
            },
            'Leeds': {
                region: 'West Yorkshire',
                population: '793,000',
                industries: ['Finance', 'Legal Services', 'Healthcare', 'Manufacturing'],
                description: 'A major city in Northern England with a strong financial and legal sector'
            },
            'Bristol': {
                region: 'South West England',
                population: '463,000',
                industries: ['Aerospace', 'Creative Industries', 'Technology', 'Education'],
                description: 'A vibrant city known for its aerospace industry and creative scene'
            },
            'Liverpool': {
                region: 'Merseyside',
                population: '498,000',
                industries: ['Shipping', 'Tourism', 'Creative Industries', 'Education'], 
                description: 'A historic port city with a rich cultural heritage'
            },
            'Newcastle': {
                region: 'Tyne and Wear',
                population: '300,000',
                industries: ['Technology', 'Education', 'Healthcare', 'Culture'],
                description: 'A major city in North East England known for its nightlife and culture'
            },
            'Sheffield': {
                region: 'South Yorkshire',
                population: '584,000',
                industries: ['Steel', 'Engineering', 'Healthcare', 'Education'],
                description: 'Known as the Steel City, now a center for advanced manufacturing'
            },
            'Cardiff': {
                region: 'Wales',
                population: '362,000',
                industries: ['Government', 'Media', 'Finance', 'Tourism'],
                description: 'The capital of Wales and a major administrative center'
            },
            'Edinburgh': {
                region: 'Scotland',
                population: '518,000',
                industries: ['Finance', 'Tourism', 'Education', 'Government'],
                description: 'Scotland\'s capital and a UNESCO World Heritage site'
            },
            'Glasgow': {
                region: 'Scotland',
                population: '635,000',
                industries: ['Manufacturing', 'Creative Industries', 'Education', 'Healthcare'],
                description: 'Scotland\'s largest city and a major cultural center'
            },
            'Belfast': {
                region: 'Northern Ireland',
                population: '343,000',
                industries: ['Aerospace', 'Technology', 'Tourism', 'Education'],
                description: 'Northern Ireland\'s capital with a growing technology sector'
            },
            'Nottingham': {
                region: 'East Midlands',
                population: '321,000',
                industries: ['Healthcare', 'Education', 'Finance', 'Manufacturing'],
                description: 'A historic city known for its connections to Robin Hood'
            },
            'Leicester': {
                region: 'East Midlands',
                population: '329,000',
                industries: ['Manufacturing', 'Textiles', 'Food Processing', 'Education'],
                description: 'A diverse city with a rich multicultural heritage'
            },
            'Coventry': {
                region: 'West Midlands',
                population: '345,000',
                industries: ['Automotive', 'Aerospace', 'Education', 'Technology'],
                description: 'Known for its automotive industry and modern cathedral'
            }
        };

        // SEO Services Data
        this.seoServices = {
            'Construction SEO': {
                icon: 'fas fa-hammer',
                description: 'Specialized SEO for construction companies, contractors, and building trades',
                benefits: ['Attract high-value projects', 'Build industry authority', 'Generate quality leads', 'Showcase completed work'],
                industries: ['General Contractors', 'Roofing Companies', 'Plumbers', 'Electricians', 'Architects']
            },
            'Law Firm SEO': {
                icon: 'fas fa-balance-scale',
                description: 'Expert SEO services for law firms and legal professionals', 
                benefits: ['Attract high-value clients', 'Build legal authority', 'Increase case inquiries', 'Dominate local searches'],
                industries: ['Personal Injury Law', 'Family Law', 'Criminal Law', 'Corporate Law', 'Immigration Law']
            },
            'Medical SEO': {
                icon: 'fas fa-stethoscope',
                description: 'Healthcare SEO for medical practices and healthcare providers',
                benefits: ['Attract new patients', 'Build medical authority', 'Increase appointments', 'Grow practice revenue'],
                industries: ['General Practice', 'Dental Practices', 'Specialist Clinics', 'Private Healthcare', 'Mental Health']
            },
            'Real Estate SEO': {
                icon: 'fas fa-home',
                description: 'Property and real estate SEO for agents and developers',
                benefits: ['Generate property leads', 'Build market authority', 'Increase listings', 'Attract buyers and sellers'],
                industries: ['Estate Agents', 'Property Developers', 'Lettings Agents', 'Commercial Property', 'Property Management']
            },
            'Financial Services SEO': {
                icon: 'fas fa-chart-line',
                description: 'SEO for financial advisors and financial service providers',
                benefits: ['Attract high-net-worth clients', 'Build financial authority', 'Increase consultations', 'Generate quality leads'],
                industries: ['Financial Advisors', 'Accountants', 'Insurance Brokers', 'Mortgage Brokers', 'Investment Firms']
            },
            'Roofing SEO': {
                icon: 'fas fa-home',
                description: 'Specialized SEO for roofing contractors and companies',
                benefits: ['Emergency repair calls', 'Installation projects', 'Insurance work leads', 'Local area dominance'],
                industries: ['Roof Repairs', 'New Installations', 'Commercial Roofing', 'Emergency Services', 'Roof Maintenance']
            }
        };

        this.init();
    }

    init() {
        // Only initialize if we're on the directory page
        if (window.location.pathname.includes('uk-directory') || 
            window.location.pathname.includes('directory')) {
            this.generateDynamicContent();
        }
    }

    generateDynamicContent() {
        const container = document.querySelector('.directory-main') || document.querySelector('main');
        if (!container) return;

        const directoryContent = `
            <!-- Hero Section - Dark background with white audit card -->
            <section class="hero-modern" style="background: var(--dark-bg);">
                <div class="floating-particles"></div>
                <div class="container">
                    <div class="hero-content-grid">
                        <div class="hero-left">
                            <div class="award-badge" style="background: var(--card-bg); border: 1px solid var(--border-dark); color: var(--accent-green);">
                                <i class="fas fa-trophy"></i>
                                <span>Trusted SEO Services Across the UK</span>
                            </div>
                            <h1 style="color: var(--text-white);">UK SEO Services Directory</h1>
                            <p style="color: var(--text-gray);">Find professional SEO services across the United Kingdom. We help businesses in every major UK city achieve top Google rankings and drive more customers. Discover expert digital marketing solutions tailored to your location and industry.</p>
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
                                    <h3 style="color: #333; background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-green) 50%, var(--secondary-color) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">FREE UK SEO AUDIT</h3>
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
                                        <li style="color: #333;">✓ UK competitor research</li>
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

            <!-- Image Showcase Section - Dark background with proper text colors -->
            <section class="image-showcase" style="background: var(--darker-bg);">
                <div class="container">
                    <div class="showcase-content">
                        <div class="showcase-text-left">
                            <h3 style="color: var(--primary-color);">UK-Wide Expertise</h3>
                            <p style="color: var(--text-gray);">We specialize in helping businesses across all major UK cities achieve online success through proven SEO strategies.</p>
                            <ul class="showcase-features">
                                <li style="color: var(--text-light-gray);">Local SEO for every UK region</li>
                                <li style="color: var(--text-light-gray);">Industry-specific strategies</li>
                                <li style="color: var(--text-light-gray);">Proven track record across the UK</li>
                                <li style="color: var(--text-light-gray);">Dedicated account management</li>
                            </ul>
                        </div>
                        <div class="showcase-image">
                            <img src="attached_assets/Professional_SEO__Web_Development_Services_for_Business_Growth_1.png" alt="UK SEO Services Directory - Professional SEO Across All UK Cities" class="featured-image">
                        </div>
                        <div class="showcase-text-right">
                            <h3 style="color: var(--primary-color);">Nationwide Results</h3>
                            <p style="color: var(--text-gray);">From London to Edinburgh, Manchester to Cardiff - we've helped businesses across the UK achieve top Google rankings and drive sustainable growth.</p>
                            <ul class="showcase-features">
                                <li style="color: var(--text-light-gray);">500+ successful UK businesses</li>
                                <li style="color: var(--text-light-gray);">Average 300% increase in leads</li>
                                <li style="color: var(--text-light-gray);">Top 3 Google rankings guaranteed</li>
                                <li style="color: var(--text-light-gray);">24/7 UK-based support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- SEO Process Section - Dark background with white cards -->
            <section class="seo-process-section" style="background: var(--dark-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">How Our UK SEO Process Works</h2>
                        <p style="color: var(--text-gray);">Simple, transparent steps to boost your search rankings across any UK location</p>
                    </div>
                    <div class="process-timeline">
                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">1</div>
                            <div class="step-badge free-badge">FREE</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-search-plus"></i>
                            </div>
                            <h3 style="color: #333;">Complete UK Website Review</h3>
                            <p style="color: #555;">We conduct a comprehensive analysis of your website to identify opportunities specific to your UK market and location.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Technical SEO audit</li>
                                <li style="color: #333;">UK market analysis</li>
                                <li style="color: #333;">Local competitor research</li>
                                <li style="color: #333;">Mobile optimization review</li>
                            </ul>
                        </div>

                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">2</div>
                            <div class="step-badge free-badge">FREE</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 style="color: #333;">UK Competitor Research</h3>
                            <p style="color: #555;">We analyze your competitors across your target UK locations to identify opportunities and develop winning strategies.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Competitor keyword analysis</li>
                                <li style="color: #333;">UK market gap analysis</li>
                                <li style="color: #333;">Content strategy review</li>
                                <li style="color: #333;">Local authority building opportunities</li>
                            </ul>
                        </div>

                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">3</div>
                            <div class="step-badge free-badge">FREE</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3 style="color: #333;">Detailed UK SEO Report</h3>
                            <p style="color: #555;">You'll receive a comprehensive report with actionable insights and a clear plan to improve your search rankings across the UK.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Priority action items</li>
                                <li style="color: #333;">UK keyword opportunities</li>
                                <li style="color: #333;">Technical recommendations</li>
                                <li style="color: #333;">ROI projections</li>
                            </ul>
                        </div>
                    </div>

                    <div class="phase-separator">
                        <div class="phase-text" style="color: var(--text-white);">Ready to Explore the Next Steps?</div>
                    </div>

                    <div class="process-timeline">
                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">4</div>
                            <div class="step-badge paid-badge">PAID</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3 style="color: #333;">UK Strategy Implementation</h3>
                            <p style="color: #555;">Our expert team implements the SEO strategy across your target UK locations, addressing technical aspects and optimizing for local visibility.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Technical fixes implementation</li>
                                <li style="color: #333;">UK-focused on-page optimization</li>
                                <li style="color: #333;">Local content creation</li>
                                <li style="color: #333;">Multi-location SEO setup</li>
                            </ul>
                        </div>

                        <div class="process-step-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="step-number" style="background: var(--primary-color); color: white;">5</div>
                            <div class="step-badge paid-badge">ONGOING</div>
                            <div class="step-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3 style="color: #333;">Monitor & Optimize Across UK</h3>
                            <p style="color: #555;">We continuously monitor and optimize your SEO performance to ensure sustained growth across all your target UK locations.</p>
                            <ul class="step-features">
                                <li style="color: #333;">Monthly UK performance reports</li>
                                <li style="color: #333;">Multi-location ranking tracking</li>
                                <li style="color: #333;">Content updates</li>
                                <li style="color: #333;">Strategy refinements</li>
                            </ul>
                        </div>
                    </div>

                    <div class="process-cta" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                        <h3 style="color: #333;">Get Your Free UK SEO Analysis Today</h3>
                        <p style="color: #555;">Discover how we can help your business thrive across the UK. Get your comprehensive website review, competitor analysis, and custom SEO strategy - completely free.</p>
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

            <!-- Our Approach Section - Dark background with white cards -->
            <section class="process-section-modern" style="background: var(--darker-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">Our UK-Wide Approach</h2>
                        <p style="color: var(--text-gray);">A collaborative, 4-step process to achieve lasting SEO success across the United Kingdom</p>
                    </div>
                    <div class="process-grid-modern">
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">01</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-search"></i>
                            </div>
                            <h3 style="color: #333;">Comprehensive UK SEO Audit</h3>
                            <p style="color: #555;">We begin with a deep dive into your website, UK competitors, and local market dynamics to uncover growth opportunities.</p>
                        </div>
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">02</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <h3 style="color: #333;">UK Strategic Planning</h3>
                            <p style="color: #555;">We develop a custom SEO strategy tailored to your industry, UK target locations, and specific business objectives.</p>
                        </div>
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">03</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <h3 style="color: #333;">Expert UK Implementation</h3>
                            <p style="color: #555;">Our team implements on-page, off-page, and technical SEO improvements using proven methods for UK markets.</p>
                        </div>
                        <div class="process-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="process-number" style="color: var(--primary-color);">04</div>
                            <div class="process-icon-modern">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <h3 style="color: #333;">Monitor & Optimize</h3>
                            <p style="color: #555;">We provide continuous monitoring, detailed UK reporting, and data-driven optimization to ensure sustained improvement.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Showcase - Dark background with white service cards -->
            <section class="services-showcase" style="background: var(--dark-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">SEO Services Across the UK</h2>
                        <p style="color: var(--text-gray);">Specialized SEO solutions for every industry and location across the United Kingdom</p>
                    </div>
                    <div class="services-grid-modern">
                        ${Object.entries(this.seoServices).map(([service, data]) => `
                            <div class="service-card-modern" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                                <div class="service-icon-modern">
                                    <i class="${data.icon}"></i>
                                </div>
                                <h3 style="color: #333;">${service} Across UK</h3>
                                <p style="color: #555;">${data.description} - available in all major UK cities and regions.</p>
                                <ul class="service-highlights">
                                    ${data.benefits.slice(0, 4).map(benefit => `<li style="color: #333;">${benefit}</li>`).join('')}
                                </ul>
                                <a href="${this.getServiceUrl(service)}" class="service-link" style="color: var(--primary-color);">
                                    Explore ${service} <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- UK Cities Directory -->
            <section class="cities-directory" style="background: var(--darker-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">Find SEO Services in Your UK City</h2>
                        <p style="color: var(--text-gray);">Professional SEO services available across all major UK cities and regions</p>
                    </div>

                    <!-- Search and Filter -->
                    <div class="directory-search" style="background: var(--card-bg);">
                        <div class="search-controls">
                            <div class="search-bar">
                                <i class="fas fa-search" style="color: var(--text-gray);"></i>
                                <input type="text" id="city-search" placeholder="Search for your city or region..." style="background: var(--darker-bg); color: var(--text-white); border: 1px solid var(--border-dark);">
                                <button class="clear-btn" id="clear-search" style="display: none; color: var(--text-gray);">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="filter-options">
                                <select id="region-filter" style="background: var(--darker-bg); color: var(--text-white); border: 1px solid var(--border-dark);">
                                    <option value="">All Regions</option>
                                    <option value="England">England</option>
                                    <option value="Scotland">Scotland</option>
                                    <option value="Wales">Wales</option>
                                    <option value="Northern Ireland">Northern Ireland</option>
                                </select>
                                <select id="population-filter" style="background: var(--darker-bg); color: var(--text-white); border: 1px solid var(--border-dark);">
                                    <option value="">All Sizes</option>
                                    <option value="large">Large Cities (500k+)</option>
                                    <option value="medium">Medium Cities (200k-500k)</option>
                                    <option value="small">Smaller Cities (<200k)</option>
                                </select>
                            </div>
                            <div class="search-results-info" id="search-results" style="color: var(--text-gray);">
                                Showing all ${Object.keys(this.ukCities).length} UK locations
                            </div>
                        </div>
                    </div>

                    <div class="cities-grid-modern" id="cities-grid">
                        ${Object.entries(this.ukCities).map(([city, data]) => `
                            <div class="city-card-modern" data-city="${city}" data-region="${data.region}" data-population="${this.getCitySize(data.population)}" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                                <div class="service-icon-modern">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <h4><a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=SEO%20Company" style="color: #333; text-decoration: none;">SEO Services ${city}</a></h4>
                                <p style="color: #555;">Professional SEO services in ${city}, ${data.region}. Local expertise for ${city} businesses with proven results.</p>
                                <div class="service-highlights">
                                    <span class="highlight-tag" style="background: rgba(255, 107, 53, 0.1); color: var(--primary-color);">Population: ${data.population}</span>
                                    <span class="highlight-tag" style="background: rgba(255, 107, 53, 0.1); color: var(--primary-color);">${data.region}</span>
                                    <span class="highlight-tag" style="background: rgba(255, 107, 53, 0.1); color: var(--primary-color);">Local Experts</span>
                                </div>
                                <a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=SEO%20Company" class="service-link" style="color: var(--primary-color);">
                                    View ${city} SEO <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        `).join('')}
                    </div>

                    <!-- No Results -->
                    <div class="no-results" id="no-results" style="display: none; color: var(--text-gray);">
                        <i class="fas fa-search" style="color: var(--text-gray);"></i>
                        <h3 style="color: var(--text-white);">No cities found</h3>
                        <p style="color: var(--text-gray);">Try adjusting your search criteria or browse all available locations above.</p>
                    </div>
                </div>
            </section>

            <!-- Testimonials Section - Card background with white testimonial cards -->
            <section class="testimonials-section" style="background: var(--card-bg);">
                <div class="container">
                    <div class="section-header-modern">
                        <h2 style="color: var(--text-white);">Success Stories Across the UK</h2>
                        <p style="color: var(--text-gray);">Real results from businesses we've helped across the United Kingdom</p>
                    </div>
                    <div class="testimonials-grid">
                        <div class="testimonial-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="stars" style="color: #ffc107;">★★★★★</div>
                            <blockquote style="color: #333;">"OutsourceSU helped our London law firm achieve #1 rankings for 'solicitors London' and increased our client inquiries by 400% in just 6 months."</blockquote>
                            <cite style="color: var(--primary-color);">— James Mitchell, Senior Partner, Mitchell & Associates Law (London)</cite>
                        </div>
                        <div class="testimonial-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="stars" style="color: #ffc107;">★★★★★</div>
                            <blockquote style="color: #333;">"As a construction company in Manchester, we struggled with online visibility. OutsourceSU's targeted SEO strategy doubled our project inquiries within 4 months."</blockquote>
                            <cite style="color: var(--primary-color);">— Sarah Thompson, MD, Thompson Construction Ltd (Manchester)</cite>
                        </div>
                        <div class="testimonial-card" style="background: white; color: #333; border: 1px solid #e0e0e0;">
                            <div class="stars" style="color: #ffc107;">★★★★★</div>
                            <blockquote style="color: #333;">"Our Birmingham dental practice now gets 50+ new patient inquiries per month thanks to OutsourceSU's expert dental SEO strategies."</blockquote>
                            <cite style="color: var(--primary-color);">— Dr. Michael Brown, Brown Dental Practice (Birmingham)</cite>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section - Dark gradient background with proper button styling -->
            <section class="cta-section-modern" style="background: var(--gradient-dark);">
                <div class="container">
                    <div class="cta-content-modern">
                        <h2 style="color: var(--text-white);">Ready to Dominate Your Local Market?</h2>
                        <p style="color: var(--text-gray);">Get a free SEO audit and discover how we can help your business rank #1 in search results across the UK.</p>
                        <div class="cta-buttons-modern">
                            <a href="${this.baseUrl}/contact.html" class="btn btn-primary-modern">
                                <i class="fas fa-rocket"></i>
                                Get Free SEO Audit
                            </a>
                            <a href="tel:07411575188" class="btn btn-outline-modern" style="border: 2px solid var(--primary-color); color: var(--text-white);">
                                <i class="fas fa-phone"></i>
                                Call: 07411575188
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;

        container.innerHTML = directoryContent;
    }

    getServiceUrl(service) {
        return `/${this.slugify(service.replace(' SEO', ''))}-seo.html`;
    }

    getCitySize(population) {
        const numPopulation = parseInt(population.replace(/[^\d]/g, ''));
        if (numPopulation >= 500000) {
            return 'large';
        } else if (numPopulation >= 200000) {
            return 'medium';
        } else {
            return 'small';
        }
    }

    slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if the element with class 'directory-main' exists before initializing
    const directoryMainElement = document.querySelector('.directory-main') || document.querySelector('main');
    if (directoryMainElement) {
        // Add CSS variables to the root element
        document.documentElement.style.setProperty('--dark-bg', '#121212');
        document.documentElement.style.setProperty('--darker-bg', '#181818');
        document.documentElement.style.setProperty('--card-bg', '#242424');
        document.documentElement.style.setProperty('--border-dark', '#333');
        document.documentElement.style.setProperty('--text-white', '#fff');
        document.documentElement.style.setProperty('--text-gray', '#999');
        document.documentElement.style.setProperty('--text-light-gray', '#ccc');
        document.documentElement.style.setProperty('--primary-color', '#ff6b35');        document.documentElement.style.setProperty('--secondary-color', '#f7c59f');
        document.documentElement.style.setProperty('--accent-green', '#4caf50');
        document.documentElement.style.setProperty('--gradient-dark', 'linear-gradient(to right, #1e3c72, #2a5298)');
        document.documentElement.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, #f0f2f0 0%, #000c40 100%)');

        window.dynamicDirectory = new DynamicDirectoryGenerator();

        // City Search Functionality
        const citySearchInput = document.getElementById('city-search');
        const regionFilterSelect = document.getElementById('region-filter');
        const populationFilterSelect = document.getElementById('population-filter');
        const clearSearchButton = document.getElementById('clear-search');
        const citiesGrid = document.getElementById('cities-grid');
        const noResultsDiv = document.getElementById('no-results');
        const searchResultsInfo = document.getElementById('search-results');

        // Initialize display
        updateDisplay();

        // Event Listeners
        citySearchInput.addEventListener('input', updateDisplay);
        regionFilterSelect.addEventListener('change', updateDisplay);
        populationFilterSelect.addEventListener('change', updateDisplay);

        clearSearchButton.addEventListener('click', () => {
            citySearchInput.value = '';
            updateDisplay();
        });

        function updateDisplay() {
            const searchTerm = citySearchInput.value.toLowerCase();
            const selectedRegion = regionFilterSelect.value;
            const selectedPopulation = populationFilterSelect.value;

            let visibleCitiesCount = 0;
            let totalCities = 0;

            Array.from(citiesGrid.children).forEach(cityCard => {
                const city = cityCard.dataset.city.toLowerCase();
                const region = cityCard.dataset.region;
                const population = cityCard.dataset.population;

                const matchesSearch = city.includes(searchTerm);
                const matchesRegion = selectedRegion === '' || region === selectedRegion;
                const matchesPopulation = selectedPopulation === '' || population === selectedPopulation;

                if (matchesSearch && matchesRegion && matchesPopulation) {
                    cityCard.style.display = 'block';
                    visibleCitiesCount++;
                } else {
                    cityCard.style.display = 'none';
                }
                totalCities++;
            });

            // Show/Hide No Results Message
            if (visibleCitiesCount === 0) {
                noResultsDiv.style.display = 'block';
            } else {
                noResultsDiv.style.display = 'none';
            }

            // Update Search Results Info
            searchResultsInfo.textContent = `Showing ${visibleCitiesCount} of ${Object.keys(window.dynamicDirectory.ukCities).length} UK locations`;
            clearSearchButton.style.display = citySearchInput.value ? 'inline-block' : 'none';
        }
    }
});