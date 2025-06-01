
// Dynamic Directory Generator for UK Cities and Services
class DynamicDirectoryGenerator {
    constructor() {
        this.cities = {
            'England': [
                'Bath', 'Birmingham', 'Bradford', 'Brighton & Hove', 'Bristol', 'Cambridge', 
                'Canterbury', 'Carlisle', 'Chelmsford', 'Chester', 'Chichester', 'Colchester', 
                'Coventry', 'Derby', 'Doncaster', 'Durham', 'Ely', 'Exeter', 'Gloucester', 
                'Hereford', 'Kingston-upon-Hull', 'Lancaster', 'Leeds', 'Leicester', 'Lichfield', 
                'Lincoln', 'Liverpool', 'London', 'Manchester', 'Milton Keynes', 'Newcastle-upon-Tyne', 
                'Norwich', 'Nottingham', 'Oxford', 'Peterborough', 'Plymouth', 'Portsmouth', 
                'Preston', 'Ripon', 'Salford', 'Salisbury', 'Sheffield', 'Southampton', 
                'Southend-on-Sea', 'St Albans', 'Stoke on Trent', 'Sunderland', 'Truro', 
                'Wakefield', 'Wells', 'Westminster', 'Winchester', 'Wolverhampton', 'Worcester', 'York'
            ],
            'Northern Ireland': [
                'Armagh', 'Bangor', 'Belfast', 'Lisburn', 'Londonderry', 'Newry'
            ],
            'Scotland': [
                'Aberdeen', 'Dundee', 'Dunfermline', 'Edinburgh', 'Glasgow', 'Inverness', 'Perth', 'Stirling'
            ],
            'Wales': [
                'Bangor', 'Cardiff', 'Newport', 'St Asaph', 'St Davids', 'Swansea', 'Wrexham'
            ]
        };

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
            'Financial Services SEO'
        ];

        this.companyName = 'OutsourceSU';
        this.baseUrl = 'https://outsourcesu.com';
        this.init();
    }

    init() {
        this.detectDirectoryPage();
        this.generateDynamicContent();
    }

    detectDirectoryPage() {
        const path = window.location.pathname;
        const params = new URLSearchParams(window.location.search);
        
        // Check if this is a city page
        const cityMatch = path.match(/seo-services-(.+)\.html/) || path.match(/best-seo-(.+)\.html/);
        if (cityMatch) {
            this.currentType = 'city';
            this.currentCity = this.decodeCity(cityMatch[1]);
        }
        
        // Check if this is a service page  
        const serviceMatch = path.match(/(.+)-seo\.html/);
        if (serviceMatch && !cityMatch) {
            this.currentType = 'service';
            this.currentService = this.decodeService(serviceMatch[1]);
        }

        // Check if this is a combined city + service page
        const combinedMatch = path.match(/(.+)-seo-(.+)\.html/);
        if (combinedMatch) {
            this.currentType = 'combined';
            this.currentService = this.decodeService(combinedMatch[1]);
            this.currentCity = this.decodeCity(combinedMatch[2]);
        }

        // Check if this is the main directory page
        if (path.includes('directory') || path.includes('locations')) {
            this.currentType = 'directory';
        }
    }

    decodeCity(citySlug) {
        const cityMap = {
            'london': 'London',
            'manchester': 'Manchester', 
            'birmingham': 'Birmingham',
            'cardiff': 'Cardiff',
            'edinburgh': 'Edinburgh',
            'glasgow': 'Glasgow',
            'belfast': 'Belfast',
            'leeds': 'Leeds',
            'liverpool': 'Liverpool',
            'bristol': 'Bristol',
            'newcastle-upon-tyne': 'Newcastle-upon-Tyne',
            'sheffield': 'Sheffield',
            'nottingham': 'Nottingham',
            'brighton-hove': 'Brighton & Hove',
            'stoke-on-trent': 'Stoke on Trent'
        };
        
        return cityMap[citySlug] || citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    decodeService(serviceSlug) {
        const serviceMap = {
            'law-firm': 'Law Firm SEO',
            'dentist': 'Dentist SEO',
            'accountant': 'Accountant SEO', 
            'architect': 'Architect SEO',
            'plumber': 'Plumber SEO',
            'electrician': 'Electrician SEO',
            'heating-engineer': 'Heating Engineer SEO',
            'contractors': 'Contractors SEO',
            'medical': 'Medical SEO',
            'financial-services': 'Financial Services SEO'
        };
        
        return serviceMap[serviceSlug] || serviceSlug.replace(/-/g, ' ') + ' SEO';
    }

    generateDynamicContent() {
        switch (this.currentType) {
            case 'directory':
                this.generateDirectoryPage();
                break;
            case 'city':
                this.generateCityPage();
                break;
            case 'service':
                this.generateServicePage();
                break;
            case 'combined':
                this.generateCombinedPage();
                break;
        }
    }

    generateDirectoryPage() {
        const container = document.querySelector('.directory-content, .container, main, .content-area');
        if (!container) return;

        const directoryContent = `
            <section class="directory-hero">
                <div class="container">
                    <h1>UK SEO Services Directory</h1>
                    <p>Professional SEO services across the United Kingdom. Find expert digital marketing solutions in your city.</p>
                </div>
            </section>

            <section class="directory-search">
                <div class="container">
                    <div class="search-controls">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" id="directory-search" placeholder="Search cities, regions, or services..." />
                            <button type="button" id="clear-search" class="clear-btn" style="display: none;">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="filter-options">
                            <select id="region-filter">
                                <option value="">All Regions</option>
                                <option value="England">England</option>
                                <option value="Scotland">Scotland</option>
                                <option value="Wales">Wales</option>
                                <option value="Northern Ireland">Northern Ireland</option>
                            </select>
                            <select id="service-filter">
                                <option value="">All Services</option>
                                <option value="Law Firm SEO">Law Firm SEO</option>
                                <option value="Dentist SEO">Dentist SEO</option>
                                <option value="Accountant SEO">Accountant SEO</option>
                                <option value="Architect SEO">Architect SEO</option>
                                <option value="Plumber SEO">Plumber SEO</option>
                                <option value="Electrician SEO">Electrician SEO</option>
                                <option value="Heating Engineer SEO">Heating Engineer SEO</option>
                                <option value="Contractors SEO">Contractors SEO</option>
                                <option value="Medical SEO">Medical SEO</option>
                                <option value="Financial Services SEO">Financial Services SEO</option>
                            </select>
                            <button type="button" id="reset-filters" class="btn btn-outline-modern">
                                <i class="fas fa-undo"></i>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                    <div class="search-results-info">
                        <span id="results-count"></span>
                    </div>
                </div>
            </section>

            <section class="cities-directory">
                <div class="container">
                    <h2>SEO Services by City</h2>
                    <div id="cities-container">
                        ${this.generateCitiesGrid()}
                    </div>
                    <div id="no-cities-results" class="no-results" style="display: none;">
                        <i class="fas fa-search"></i>
                        <h3>No cities found</h3>
                        <p>Try adjusting your search terms or filters.</p>
                    </div>
                </div>
            </section>

            <section class="services-directory">
                <div class="container">
                    <h2>SEO Services by Industry</h2>
                    <div id="services-container">
                        ${this.generateServicesGrid()}
                    </div>
                    <div id="no-services-results" class="no-results" style="display: none;">
                        <i class="fas fa-search"></i>
                        <h3>No services found</h3>
                        <p>Try adjusting your search terms or filters.</p>
                    </div>
                </div>
            </section>

            <section class="contact-cta">
                <div class="container">
                    <div class="cta-card">
                        <h3>Ready to Dominate Your Local Market?</h3>
                        <p>Get a free SEO audit and discover how we can help your business rank #1 in search results.</p>
                        <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">Get Free SEO Audit</a>
                    </div>
                </div>
            </section>
        `;

        container.innerHTML = directoryContent;
        this.updatePageMeta('SEO Services Directory UK', 'Find professional SEO services across the UK. Expert digital marketing solutions for all industries and cities.');
        
        // Initialize search functionality
        this.initializeDirectorySearch();
    }

    generateCitiesGrid() {
        let citiesHtml = '';
        
        Object.keys(this.cities).forEach(region => {
            citiesHtml += `
                <div class="region-section">
                    <h3>${region}</h3>
                    <div class="cities-grid">
                        ${this.cities[region].map(city => `
                            <div class="city-card">
                                <h4><a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=SEO Company">${city} SEO Company</a></h4>
                                <p>Professional SEO services in ${city}</p>
                                <a href="dynamic-city-page.html?city=${encodeURIComponent(city)}&service=SEO Company" class="learn-more">View Services →</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        return citiesHtml;
    }

    generateServicesGrid() {
        return `
            <div class="services-grid">
                ${this.services.map(service => `
                    <div class="service-card">
                        <h4><a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo">${service}</a></h4>
                        <p>Specialized SEO for ${service.replace(' SEO', '').toLowerCase()} businesses</p>
                        <a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo" class="learn-more">Learn More →</a>
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateCityPage() {
        const container = document.querySelector('.page-header, .hero-modern, main');
        if (!container) return;

        const cityContent = `
            <section class="city-hero">
                <div class="container">
                    <h1>Best SEO Services in ${this.currentCity} | ${this.companyName}</h1>
                    <p>${this.companyName} is a professional search engine optimisation (SEO) agency offering innovative ${this.currentCity} SEO solutions. We leverage our extensive industry experience and acquired expertise to help businesses across industries get discovered online.</p>
                    <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">Get Free ${this.currentCity} SEO Audit</a>
                </div>
            </section>

            ${this.generateFourSections(this.currentCity)}
            ${this.generateContactCard()}
            ${this.generateServicesForCity(this.currentCity)}
        `;

        if (container.tagName === 'MAIN') {
            container.innerHTML = cityContent;
        } else {
            container.insertAdjacentHTML('afterend', cityContent);
        }

        this.updatePageMeta(
            `Best SEO Services in ${this.currentCity} | ${this.companyName}`,
            `Leading SEO agency in ${this.currentCity}. We help local businesses dominate search results and drive more customers. Professional ${this.currentCity} SEO services.`
        );
    }

    generateServicePage() {
        const container = document.querySelector('.page-header, .hero-modern, main');
        if (!container) return;

        const serviceType = this.currentService.replace(' SEO', '');
        const serviceContent = `
            <section class="service-hero">
                <div class="container">
                    <h1>${this.currentService} Services UK | ${this.companyName}</h1>
                    <p>${this.companyName} is a professional search engine optimisation (SEO) agency offering innovative ${serviceType} SEO solutions. We leverage our extensive industry experience and acquired expertise to help ${serviceType.toLowerCase()} businesses across industries get discovered online.</p>
                    <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">Get Free ${serviceType} SEO Audit</a>
                </div>
            </section>

            ${this.generateFourSections(serviceType, 'service')}
            ${this.generateContactCard()}
            ${this.generateCitiesForService(this.currentService)}
        `;

        if (container.tagName === 'MAIN') {
            container.innerHTML = serviceContent;
        } else {
            container.insertAdjacentHTML('afterend', serviceContent);
        }

        this.updatePageMeta(
            `${this.currentService} Services UK | ${this.companyName}`,
            `Specialized ${this.currentService.toLowerCase()} services across the UK. Expert SEO strategies to help ${serviceType.toLowerCase()} businesses dominate search results.`
        );
    }

    generateCombinedPage() {
        const container = document.querySelector('.page-header, .hero-modern, main');
        if (!container) return;

        const serviceType = this.currentService.replace(' SEO', '');
        const combinedContent = `
            <section class="combined-hero">
                <div class="container">
                    <h1>${this.currentService} in ${this.currentCity} | ${this.companyName}</h1>
                    <p>${this.companyName} is a professional search engine optimisation (SEO) agency offering innovative ${this.currentCity} ${serviceType} SEO solutions. We leverage our extensive industry experience and acquired expertise to help ${serviceType.toLowerCase()} businesses in ${this.currentCity} get discovered online.</p>
                    <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">Get Free ${this.currentCity} ${serviceType} SEO Audit</a>
                </div>
            </section>

            ${this.generateFourSections(`${this.currentCity} ${serviceType}`, 'combined')}
            ${this.generateContactCard()}
        `;

        if (container.tagName === 'MAIN') {
            container.innerHTML = combinedContent;
        } else {
            container.insertAdjacentHTML('afterend', combinedContent);
        }

        this.updatePageMeta(
            `${this.currentService} in ${this.currentCity} | ${this.companyName}`,
            `Expert ${this.currentService.toLowerCase()} services in ${this.currentCity}. Help your ${serviceType.toLowerCase()} business dominate local search results.`
        );
    }

    generateFourSections(location, type = 'city') {
        const sectionContext = type === 'service' ? `${location} businesses` : 
                             type === 'combined' ? `${location} businesses` : 
                             `businesses in ${location}`;

        return `
            <section class="seo-benefits">
                <div class="container">
                    <h2>Why Choose ${this.companyName} for ${location} SEO?</h2>
                    <div class="benefits-grid">
                        <div class="benefit-card">
                            <i class="fas fa-chart-line"></i>
                            <h3>Proven Results</h3>
                            <p>We've helped 500+ ${sectionContext} achieve #1 rankings on Google with our proven SEO strategies.</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-users"></i>
                            <h3>Expert Team</h3>
                            <p>Our certified SEO specialists have deep expertise in ${location} market dynamics and search behavior.</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-map-marker-alt"></i>
                            <h3>Local Expertise</h3>
                            <p>Deep understanding of ${location} market trends and customer behavior patterns.</p>
                        </div>
                        <div class="benefit-card">
                            <i class="fas fa-rocket"></i>
                            <h3>Fast Results</h3>
                            <p>See improvements in search rankings within 90 days with our accelerated SEO methodology.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="seo-process">
                <div class="container">
                    <h2>Our ${location} SEO Process</h2>
                    <div class="process-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <h3>SEO Audit & Analysis</h3>
                            <p>Comprehensive analysis of your current online presence and ${location} market opportunities.</p>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <h3>Strategy Development</h3>
                            <p>Custom SEO strategy tailored to your business goals and ${location} market requirements.</p>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <h3>Implementation</h3>
                            <p>Expert execution of on-page, off-page, and technical SEO optimizations.</p>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <h3>Monitoring & Reporting</h3>
                            <p>Continuous monitoring with detailed monthly reports showing your progress and ROI.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="seo-services">
                <div class="container">
                    <h2>${location} SEO Services We Offer</h2>
                    <div class="services-grid">
                        <div class="service-item">
                            <h4>Local SEO</h4>
                            <p>Dominate local search results and Google My Business listings in ${location}.</p>
                        </div>
                        <div class="service-item">
                            <h4>Technical SEO</h4>
                            <p>Optimize your website's technical foundation for better search performance.</p>
                        </div>
                        <div class="service-item">
                            <h4>Content Marketing</h4>
                            <p>Engaging, SEO-optimized content that resonates with your ${location} audience.</p>
                        </div>
                        <div class="service-item">
                            <h4>Link Building</h4>
                            <p>High-authority backlinks from relevant ${location} and industry sources.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="testimonials">
                <div class="container">
                    <h2>What Our ${location} Clients Say</h2>
                    <div class="testimonials-grid">
                        <div class="testimonial">
                            <p>"${this.companyName} transformed our online presence. We're now ranking #1 for our main keywords in ${location}."</p>
                            <cite>- Local Business Owner</cite>
                        </div>
                        <div class="testimonial">
                            <p>"Professional service and outstanding results. Our website traffic has increased by 300% since working with ${this.companyName}."</p>
                            <cite>- ${location} Business</cite>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generateContactCard() {
        return `
            <section class="contact-card-section">
                <div class="container">
                    <div class="contact-card">
                        <h3>Ready to Dominate Search Results?</h3>
                        <p>Get a free SEO audit and discover how we can help your business achieve #1 rankings.</p>
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>Call: 0800 123 4567</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>Email: hello@outsourcesu.com</span>
                            </div>
                        </div>
                        <a href="${this.baseUrl}/contact" class="btn btn-primary-modern">Get Free SEO Audit</a>
                    </div>
                </div>
            </section>
        `;
    }

    generateServicesForCity(city) {
        return `
            <section class="city-services">
                <div class="container">
                    <h2>SEO Services Available in ${city}</h2>
                    <div class="services-grid">
                        ${this.services.map(service => `
                            <div class="service-card">
                                <h4><a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo-${this.slugify(city)}">${service} in ${city}</a></h4>
                                <p>Specialized ${service.toLowerCase()} for ${city} businesses</p>
                                <a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo-${this.slugify(city)}" class="learn-more">Learn More →</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generateCitiesForService(service) {
        const allCities = Object.values(this.cities).flat();
        return `
            <section class="service-cities">
                <div class="container">
                    <h2>${service} Services Across the UK</h2>
                    <div class="cities-grid">
                        ${allCities.slice(0, 12).map(city => `
                            <div class="city-card">
                                <h4><a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo-${this.slugify(city)}">${service} in ${city}</a></h4>
                                <p>Expert ${service.toLowerCase()} services in ${city}</p>
                                <a href="${this.baseUrl}/${this.slugify(service.replace(' SEO', ''))}-seo-${this.slugify(city)}" class="learn-more">Get Quote →</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    updatePageMeta(title, description) {
        document.title = title;
        
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
            ogTitle.setAttribute('content', title);
        }

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', description);
        }
    }

    slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    initializeDirectorySearch() {
        const searchInput = document.getElementById('directory-search');
        const clearBtn = document.getElementById('clear-search');
        const regionFilter = document.getElementById('region-filter');
        const serviceFilter = document.getElementById('service-filter');
        const resetBtn = document.getElementById('reset-filters');
        const resultsCount = document.getElementById('results-count');

        if (!searchInput) return;

        // Search functionality
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedRegion = regionFilter.value;
            const selectedService = serviceFilter.value;

            // Show/hide clear button
            clearBtn.style.display = searchTerm ? 'block' : 'none';

            // Filter cities
            this.filterCities(searchTerm, selectedRegion);
            
            // Filter services
            this.filterServices(searchTerm, selectedService);

            // Update results count
            this.updateResultsCount();
        };

        // Event listeners
        searchInput.addEventListener('input', performSearch);
        regionFilter.addEventListener('change', performSearch);
        serviceFilter.addEventListener('change', performSearch);

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            performSearch();
            searchInput.focus();
        });

        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            regionFilter.value = '';
            serviceFilter.value = '';
            clearBtn.style.display = 'none';
            performSearch();
        });

        // Initial count
        this.updateResultsCount();

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.blur();
            }
        });
    }

    filterCities(searchTerm, selectedRegion) {
        const citiesContainer = document.getElementById('cities-container');
        const noResultsDiv = document.getElementById('no-cities-results');
        const regionSections = citiesContainer.querySelectorAll('.region-section');
        let visibleCitiesCount = 0;

        regionSections.forEach(section => {
            const regionName = section.querySelector('h3').textContent;
            const cityCards = section.querySelectorAll('.city-card');
            let visibleCitiesInRegion = 0;

            // Check if region matches filter
            const regionMatches = !selectedRegion || regionName === selectedRegion;

            cityCards.forEach(card => {
                const cityName = card.querySelector('h4 a').textContent.toLowerCase();
                const cityText = card.textContent.toLowerCase();

                const matchesSearch = !searchTerm || 
                    cityName.includes(searchTerm) || 
                    cityText.includes(searchTerm);

                if (regionMatches && matchesSearch) {
                    card.style.display = 'block';
                    visibleCitiesInRegion++;
                    visibleCitiesCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide region section
            if (visibleCitiesInRegion > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCitiesCount === 0) {
            noResultsDiv.style.display = 'block';
            citiesContainer.style.display = 'none';
        } else {
            noResultsDiv.style.display = 'none';
            citiesContainer.style.display = 'block';
        }
    }

    filterServices(searchTerm, selectedService) {
        const servicesContainer = document.getElementById('services-container');
        const noResultsDiv = document.getElementById('no-services-results');
        const serviceCards = servicesContainer.querySelectorAll('.service-card');
        let visibleServicesCount = 0;

        serviceCards.forEach(card => {
            const serviceName = card.querySelector('h4 a').textContent.toLowerCase();
            const serviceText = card.textContent.toLowerCase();

            const matchesSearch = !searchTerm || 
                serviceName.includes(searchTerm) || 
                serviceText.includes(searchTerm);

            const matchesFilter = !selectedService || 
                card.querySelector('h4 a').textContent.includes(selectedService);

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                visibleServicesCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleServicesCount === 0) {
            noResultsDiv.style.display = 'block';
            servicesContainer.querySelector('.services-grid').style.display = 'none';
        } else {
            noResultsDiv.style.display = 'none';
            servicesContainer.querySelector('.services-grid').style.display = 'grid';
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (!resultsCount) return;

        const visibleCities = document.querySelectorAll('.city-card[style*="display: block"], .city-card:not([style*="display: none"])').length;
        const visibleServices = document.querySelectorAll('.service-card[style*="display: block"], .service-card:not([style*="display: none"])').length;
        
        const totalVisible = visibleCities + visibleServices;
        
        if (totalVisible === 0) {
            resultsCount.textContent = 'No results found';
        } else {
            resultsCount.textContent = `Showing ${totalVisible} result${totalVisible !== 1 ? 's' : ''} (${visibleCities} cities, ${visibleServices} services)`;
        }
    }
}

// Initialize the dynamic directory generator
document.addEventListener('DOMContentLoaded', function() {
    window.dynamicDirectory = new DynamicDirectoryGenerator();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicDirectoryGenerator;
}
