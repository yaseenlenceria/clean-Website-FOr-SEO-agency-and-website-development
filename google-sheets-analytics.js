
// Google Sheets Analytics Integration
class GoogleSheetsAnalytics {
    constructor() {
        this.sheetId = '1P2JdHNXFe-iDn8kEPuqUR_gBd3EPKbc9';
        this.apiKey = 'YOUR_GOOGLE_API_KEY'; // Add this to your environment
        this.baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}`;
        this.initializeTracking();
    }

    initializeTracking() {
        this.trackPageViews();
        this.trackUserBehavior();
        this.trackConversions();
        this.trackSEOMetrics();
        this.trackFormSubmissions();
    }

    async logToSheet(sheetName, data) {
        try {
            const timestamp = new Date().toISOString();
            const rowData = [timestamp, ...Object.values(data)];
            
            // Using Google Apps Script Web App as proxy (more reliable than direct API)
            const webAppUrl = 'https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec';
            
            await fetch(webAppUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sheetName: sheetName,
                    data: rowData
                })
            });
        } catch (error) {
            console.log('Analytics logging failed:', error);
        }
    }

    trackPageViews() {
        const pageData = {
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            userAgent: navigator.userAgent.substring(0, 100),
            sessionId: this.getSessionId(),
            userId: this.getUserId()
        };

        this.logToSheet('PageViews', pageData);
    }

    trackUserBehavior() {
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (scrollPercent % 25 === 0 && scrollPercent > 0) {
                    this.logToSheet('ScrollTracking', {
                        page: window.location.pathname,
                        scrollDepth: scrollPercent,
                        sessionId: this.getSessionId()
                    });
                }
            }
        });

        // Track click events
        document.addEventListener('click', (e) => {
            const element = e.target;
            if (element.tagName === 'A' || element.classList.contains('btn')) {
                this.logToSheet('ClickTracking', {
                    page: window.location.pathname,
                    elementType: element.tagName,
                    elementText: element.textContent.trim().substring(0, 50),
                    elementHref: element.href || '',
                    sessionId: this.getSessionId()
                });
            }
        });

        // Track time on page
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            this.logToSheet('TimeOnPage', {
                page: window.location.pathname,
                timeSpent: timeOnPage,
                sessionId: this.getSessionId()
            });
        });
    }

    trackConversions() {
        // Track form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            this.logToSheet('FormSubmissions', {
                page: window.location.pathname,
                formId: form.id || 'unknown',
                formAction: form.action || '',
                sessionId: this.getSessionId()
            });
        });

        // Track phone clicks
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.href.startsWith('tel:')) {
                this.logToSheet('PhoneClicks', {
                    page: window.location.pathname,
                    phoneNumber: e.target.href.replace('tel:', ''),
                    sessionId: this.getSessionId()
                });
            }
        });

        // Track email clicks
        document.addEventListener('click', (e) => {
            if (e.target.href && e.target.href.startsWith('mailto:')) {
                this.logToSheet('EmailClicks', {
                    page: window.location.pathname,
                    email: e.target.href.replace('mailto:', ''),
                    sessionId: this.getSessionId()
                });
            }
        });
    }

    trackSEOMetrics() {
        // Track search queries (if internal search exists)
        const searchInputs = document.querySelectorAll('input[type="search"]');
        searchInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.length > 2) {
                    this.logToSheet('SearchQueries', {
                        page: window.location.pathname,
                        searchTerm: input.value,
                        sessionId: this.getSessionId()
                    });
                }
            });
        });

        // Track page performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                this.logToSheet('PagePerformance', {
                    page: window.location.pathname,
                    loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    firstPaint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0),
                    sessionId: this.getSessionId()
                });
            }, 1000);
        });
    }

    trackFormSubmissions() {
        // Enhanced form tracking with field validation
        document.addEventListener('submit', (e) => {
            const form = e.target;
            const formData = new FormData(form);
            const fields = {};
            
            for (let [key, value] of formData.entries()) {
                if (key !== 'password' && key !== 'email') { // Don't log sensitive data
                    fields[key] = value.length; // Log field length, not content
                }
            }

            this.logToSheet('DetailedFormSubmissions', {
                page: window.location.pathname,
                formId: form.id || 'unknown',
                fieldCount: Object.keys(fields).length,
                formMethod: form.method || 'GET',
                sessionId: this.getSessionId()
            });
        });
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session', sessionId);
        }
        return sessionId;
    }

    getUserId() {
        let userId = localStorage.getItem('analytics_user');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user', userId);
        }
        return userId;
    }
}

// Initialize Google Sheets Analytics
document.addEventListener('DOMContentLoaded', () => {
    if (!window.googleSheetsAnalytics) {
        window.googleSheetsAnalytics = new GoogleSheetsAnalytics();
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleSheetsAnalytics;
}
