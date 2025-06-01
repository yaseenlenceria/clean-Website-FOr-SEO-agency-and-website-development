
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
            }
        };

        this.serviceData = {
            'SEO Company': {
                description: 'search engine optimization',
                benefits: ['Higher search rankings', 'Increased website traffic', 'More qualified leads', 'Better online visibility'],
                process: ['SEO Audit', 'Keyword Research', 'On-Page Optimization', 'Content Creation', 'Link Building', 'Performance Monitoring']
            },
            'Digital Marketing Agency': {
                description: 'comprehensive digital marketing',
                benefits: ['Multi-channel marketing', 'Brand awareness growth', 'Lead generation', 'ROI optimization'],
                process: ['Strategy Development', 'Campaign Setup', 'Content Creation', 'Social Media Management', 'PPC Management', 'Analytics & Reporting']
            },
            'Web Design Company': {
                description: 'professional web design and development',
                benefits: ['Modern responsive design', 'User-friendly interface', 'Mobile optimization', 'Fast loading speeds'],
                process: ['Discovery & Planning', 'Design Mockups', 'Development', 'Testing', 'Launch', 'Ongoing Support']
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
        document.getElementById('dynamic-title').textContent = title;
        
        // Update meta description
        document.getElementById('dynamic-description').setAttribute('content', description);
        
        // Update Open Graph tags
        document.getElementById('dynamic-og-title').setAttribute('content', title);
        document.getElementById('dynamic-og-description').setAttribute('content', description);
        document.getElementById('dynamic-og-url').setAttribute('content', `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`);
        
        // Update canonical URL
        document.getElementById('dynamic-canonical').setAttribute('href', `${this.baseUrl}/dynamic-city-page.html?city=${encodeURIComponent(this.city)}&service=${encodeURIComponent(this.service)}`);
    }

    generatePageContent() {
        const container = document.getElementById('dynamic-content-container');
        if (!container) return;

        const cityInfo = this.cityData[this.city] || this.cityData['Birmingham'];
        const serviceInfo = this.serviceData[this.service] || this.serviceData['SEO Company'];

        const content = `
            <!-- Hero Section -->
            <section class="city-hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>Best ${this.service} in ${this.city} | ${this.companyName}</h1>
                        <p>${this.companyName} is a professional ${serviceInfo.description} agency offering innovative ${this.city} solutions. We leverage our extensive industry experience and expertise to help businesses across ${cityInfo.region} get discovered online and grow their customer base.</p>
                        <div class="hero-cta">
                            <a href="contact.html" class="btn btn-primary-modern">Get Free ${this.city} SEO Audit</a>
                            <a href="tel:+448001234567" class="btn btn-outline-modern">
                                <i class="fas fa-phone"></i>
                                Call Now: 0800 123 4567
                            </a>
                        </div>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <strong>500+</strong>
                            <span>Local Clients</span>
                        </div>
                        <div class="stat-item">
                            <strong>300%</strong>
                            <span>Average Traffic Increase</span>
                        </div>
                        <div class="stat-item">
                            <strong>98%</strong>
                            <span>Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Why Choose Us Section -->
            <section class="why-choose-us">
                <div class="container">
                    <h2>Why Choose ${this.companyName} as Your ${this.city} ${this.service}?</h2>
                    <div class="benefits-grid">
                        ${serviceInfo.benefits.map((benefit, index) => `
                            <div class="benefit-card">
                                <div class="benefit-icon">
                                    <i class="fas fa-${this.getBenefitIcon(index)}"></i>
                                </div>
                                <h3>${benefit}</h3>
                                <p>Our proven strategies help ${this.city} businesses achieve ${benefit.toLowerCase()} through expert ${serviceInfo.description}.</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Local Expertise Section -->
            <section class="local-expertise">
                <div class="container">
                    <div class="local-content">
                        <div class="local-info">
                            <h2>Local ${this.city} Expertise</h2>
                            <p>We understand the unique business landscape of ${this.city} and ${cityInfo.region}. Our local expertise helps your business connect with customers in:</p>
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
                            </div>
                        </div>
                        <div class="process-overview">
                            <h3>Our ${this.service} Process</h3>
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

            <!-- Services Section -->
            <section class="services-offered">
                <div class="container">
                    <h2>${this.service} Services in ${this.city}</h2>
                    <div class="services-grid">
                        <div class="service-item">
                            <i class="fas fa-search"></i>
                            <h4>Local SEO</h4>
                            <p>Dominate local search results in ${this.city} and attract customers from ${cityInfo.region}.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-chart-line"></i>
                            <h4>Technical SEO</h4>
                            <p>Optimize your website's technical foundation for better search engine performance.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-content"></i>
                            <h4>Content Marketing</h4>
                            <p>Create engaging content that resonates with your ${this.city} audience.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-link"></i>
                            <h4>Link Building</h4>
                            <p>Build high-quality backlinks from relevant ${this.city} and industry sources.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-mobile-alt"></i>
                            <h4>Mobile SEO</h4>
                            <p>Ensure your website performs perfectly on mobile devices for ${this.city} users.</p>
                        </div>
                        <div class="service-item">
                            <i class="fas fa-analytics"></i>
                            <h4>Analytics & Reporting</h4>
                            <p>Detailed monthly reports showing your progress and ROI in the ${this.city} market.</p>
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
                                <p>"${this.companyName} transformed our online presence. We're now ranking #1 for our main keywords in ${this.city} and seeing 300% more enquiries."</p>
                                <div class="testimonial-author">
                                    <strong>Local Business Owner</strong>
                                    <span>${this.city}</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial">
                            <div class="testimonial-content">
                                <p>"Professional service and outstanding results. Our website traffic has increased dramatically since working with ${this.companyName}."</p>
                                <div class="testimonial-author">
                                    <strong>${this.city} Business</strong>
                                    <span>${cityInfo.region}</span>
                                </div>
                            </div>
                        </div>
                        <div class="testimonial">
                            <div class="testimonial-content">
                                <p>"The team understands the ${this.city} market perfectly. They've helped us reach customers we never thought possible."</p>
                                <div class="testimonial-author">
                                    <strong>Local Company Director</strong>
                                    <span>${this.city}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact CTA Section -->
            <section class="contact-cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2>Ready to Dominate ${this.city} Search Results?</h2>
                        <p>Get a free SEO audit and discover how we can help your business achieve #1 rankings in ${this.city}.</p>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <strong>Call Us</strong>
                                    <span>0800 123 4567</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <strong>Email Us</strong>
                                    <span>hello@outsourcesu.com</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Serving</strong>
                                    <span>${this.city} & ${cityInfo.region}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cta-buttons">
                            <a href="contact.html" class="btn btn-primary-modern">Get Free SEO Audit</a>
                            <a href="tel:+448001234567" class="btn btn-outline-modern">Call Now</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Related Cities Section -->
            <section class="related-cities">
                <div class="container">
                    <h2>We Also Serve</h2>
                    <div class="cities-grid">
                        ${Object.keys(this.cityData).filter(city => city !== this.city).slice(0, 6).map(city => `
                            <div class="city-card">
                                <h4><a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=${encodeURIComponent(this.service)}">${this.service} ${city}</a></h4>
                                <p>Professional ${serviceInfo.description} services in ${city}</p>
                                <a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=${encodeURIComponent(this.service)}" class="learn-more">Learn More →</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        container.innerHTML = content;
    }

    getBenefitIcon(index) {
        const icons = ['chart-line', 'traffic-light', 'bullseye', 'eye'];
        return icons[index] || 'star';
    }

    updateStructuredData() {
        const cityInfo = this.cityData[this.city] || this.cityData['Birmingham'];
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": this.companyName,
            "description": `Best ${this.service} in ${this.city}`,
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
            "areaServed": {
                "@type": "Place",
                "name": `${this.city}, ${cityInfo.region}`
            },
            "service": {
                "@type": "Service",
                "name": this.service,
                "description": `Professional ${this.serviceData[this.service]?.description || 'digital marketing'} services`
            }
        };

        document.getElementById('dynamic-structured-data').textContent = JSON.stringify(structuredData, null, 2);
    }
}

// Export for global access
window.DynamicCityGenerator = DynamicCityGenerator;
