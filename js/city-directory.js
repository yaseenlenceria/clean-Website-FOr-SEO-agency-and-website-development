
// Dynamic City Directory System
class CityDirectorySystem {
    constructor() {
        this.cities = [
            { name: 'Cardiff', region: 'Wales', population: '365,000' },
            { name: 'Leeds', region: 'Yorkshire', population: '790,000' },
            { name: 'Sheffield', region: 'Yorkshire', population: '580,000' },
            { name: 'Bristol', region: 'South West', population: '460,000' },
            { name: 'Liverpool', region: 'North West', population: '498,000' },
            { name: 'Newcastle', region: 'North East', population: '300,000' },
            { name: 'Nottingham', region: 'East Midlands', population: '330,000' },
            { name: 'Brighton', region: 'South East', population: '290,000' },
            { name: 'Edinburgh', region: 'Scotland', population: '540,000' },
            { name: 'Glasgow', region: 'Scotland', population: '635,000' },
            { name: 'Belfast', region: 'Northern Ireland', population: '345,000' },
            { name: 'Southampton', region: 'South East', population: '270,000' }
        ];

        this.services = [
            'Local SEO Services',
            'Technical SEO Audits',
            'Content Marketing',
            'Link Building',
            'Google My Business Optimization',
            'E-commerce SEO',
            'PPC Management',
            'Social Media Marketing'
        ];

        this.init();
    }

    init() {
        this.renderCityGrid();
        this.generateCityPages();
    }

    renderCityGrid() {
        const grid = document.getElementById('cities-grid');
        if (!grid) return;

        const citiesHTML = this.cities.map(city => `
            <div class="city-card">
                <div class="city-info">
                    <h3><i class="fas fa-map-marker-alt"></i> ${city.name}</h3>
                    <p class="region">${city.region}</p>
                    <p class="population">Population: ${city.population}</p>
                </div>
                <div class="city-services">
                    <h4>Our Services:</h4>
                    <ul>
                        <li>Local SEO</li>
                        <li>Technical SEO</li>
                        <li>Content Marketing</li>
                        <li>PPC Management</li>
                    </ul>
                </div>
                <a href="seo-company-${city.name.toLowerCase()}.html" class="btn btn-primary-modern">
                    View ${city.name} SEO Services
                </a>
            </div>
        `).join('');

        grid.innerHTML = citiesHTML;
    }

    generateCityPages() {
        // This would generate individual city pages - for now we'll create the template
        this.cities.forEach(city => {
            this.createCityPageTemplate(city);
        });
    }

    createCityPageTemplate(city) {
        // Template for individual city pages
        console.log(`Generated template for ${city.name}`);
    }

    getCityPageContent(cityName) {
        return {
            title: `Professional SEO Company ${cityName} | OutsourceSU`,
            h1: `${cityName} SEO Company - Drive More Traffic & Leads`,
            description: `Professional search engine optimisation (SEO) agency offering innovative ${cityName} SEO solutions. We leverage our extensive industry experience and acquired expertise to help businesses across industries get discovered online.`,
            services: this.services,
            benefits: [
                'Proven Track Record',
                'Local Market Expertise', 
                'Transparent Reporting',
                'Dedicated Account Manager'
            ]
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CityDirectorySystem();
});
