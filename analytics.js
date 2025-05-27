
// Analytics and SEO Tracking
(function() {
    'use strict';

    // Google Analytics 4 Setup (replace with your actual GA4 ID)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID'); // Replace with actual ID

    // Track SEO-relevant events
    function trackSEOEvents() {
        // Track search queries from internal search
        const searchInputs = document.querySelectorAll('input[type="search"], input[name*="search"]');
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                gtag('event', 'search', {
                    search_term: this.value
                });
            });
        });

        // Track phone number clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                gtag('event', 'phone_call', {
                    event_category: 'contact',
                    event_label: this.href.replace('tel:', '')
                });
            });
        });

        // Track email clicks
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function() {
                gtag('event', 'email_click', {
                    event_category: 'contact',
                    event_label: this.href.replace('mailto:', '')
                });
            });
        });

        // Track CTA button clicks
        const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta, .btn-audit');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: this.textContent.trim(),
                    event_location: window.location.pathname
                });
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 90];
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                scrollMilestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !window[`scroll_${milestone}_tracked`]) {
                        gtag('event', 'scroll', {
                            event_category: 'engagement',
                            event_label: `${milestone}%`,
                            value: milestone
                        });
                        window[`scroll_${milestone}_tracked`] = true;
                    }
                });
            }
        });
    }

    // Track page performance for SEO insights
    function trackPagePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    const domTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;

                    gtag('event', 'page_performance', {
                        event_category: 'performance',
                        load_time: loadTime,
                        dom_time: domTime,
                        page: window.location.pathname
                    });
                }, 1000);
            });
        }
    }

    // Initialize tracking when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            trackSEOEvents();
            trackPagePerformance();
        });
    } else {
        trackSEOEvents();
        trackPagePerformance();
    }

    // Track service page interactions
    if (window.location.pathname.includes('-seo.html')) {
        // Track service-specific interactions
        const serviceCards = document.querySelectorAll('.service-card, .help-card');
        serviceCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                const serviceName = this.querySelector('h3')?.textContent || `Service ${index + 1}`;
                gtag('event', 'service_interaction', {
                    event_category: 'services',
                    event_label: serviceName,
                    service_page: window.location.pathname
                });
            });
        });
    }

})();
