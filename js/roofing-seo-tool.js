
// Roofing SEO Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('seoCheckerForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultsContainer = document.getElementById('resultsContainer');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        runSEOAnalysis();
    });

    function runSEOAnalysis() {
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        resultsContainer.style.display = 'none';

        // Get form data
        const formData = {
            url: document.getElementById('website-url').value,
            businessName: document.getElementById('business-name').value,
            location: document.getElementById('target-location').value,
            services: document.getElementById('roofing-services').value,
            email: document.getElementById('email').value
        };

        // Simulate analysis (replace with real analysis logic)
        setTimeout(() => {
            analyzeWebsite(formData);
        }, 3000);
    }

    function analyzeWebsite(data) {
        // Simulate SEO analysis
        const analysis = performSEOAnalysis(data);
        
        // Hide loading and show results
        loadingSpinner.style.display = 'none';
        resultsContainer.style.display = 'block';

        // Display results
        displayResults(analysis);

        // Send data to your backend (optional)
        submitLeadData(data, analysis);

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function performSEOAnalysis(data) {
        // Simulate various SEO checks
        const issues = [];
        const warnings = [];
        const passed = [];

        // Simulate random issues for demonstration
        const possibleIssues = [
            {
                type: 'error',
                title: 'Missing Title Tag Optimization',
                description: 'Your website title doesn\'t target roofing keywords effectively',
                impact: 'High',
                solution: 'Add location-based roofing keywords to your title tags'
            },
            {
                type: 'error',
                title: 'No Google My Business Optimization',
                description: 'Your Google My Business listing isn\'t fully optimized for roofing searches',
                impact: 'Critical',
                solution: 'Complete your GMB profile with roofing-specific categories and descriptions'
            },
            {
                type: 'warning',
                title: 'Missing Local Schema Markup',
                description: 'Your website lacks local business schema markup',
                impact: 'Medium',
                solution: 'Add structured data to help Google understand your roofing business'
            },
            {
                type: 'warning',
                title: 'Slow Page Loading Speed',
                description: 'Your website takes longer than 3 seconds to load',
                impact: 'High',
                solution: 'Optimize images and improve server response time'
            },
            {
                type: 'error',
                title: 'Missing Roofing Service Pages',
                description: 'No dedicated pages for specific roofing services',
                impact: 'High',
                solution: 'Create separate pages for roof repair, replacement, and emergency services'
            },
            {
                type: 'warning',
                title: 'Limited Customer Reviews',
                description: 'Not enough online reviews for local SEO ranking',
                impact: 'Medium',
                solution: 'Implement a review generation strategy'
            }
        ];

        const passedChecks = [
            'Mobile-friendly design detected',
            'HTTPS security certificate found',
            'Contact information visible',
            'Local phone number detected'
        ];

        // Randomly select issues
        const selectedIssues = possibleIssues.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
        const selectedPassed = passedChecks.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

        // Calculate score based on issues
        const totalChecks = selectedIssues.length + selectedPassed.length;
        const errorCount = selectedIssues.filter(issue => issue.type === 'error').length;
        const warningCount = selectedIssues.filter(issue => issue.type === 'warning').length;
        
        let score = Math.max(20, 100 - (errorCount * 20) - (warningCount * 10));
        score = Math.min(85, score); // Cap at 85% to encourage improvement

        return {
            score: score,
            issues: selectedIssues,
            passed: selectedPassed,
            recommendations: generateRecommendations(selectedIssues, data)
        };
    }

    function generateRecommendations(issues, data) {
        const recommendations = [
            `Optimize your website for "${data.location} roofing" keywords`,
            `Create dedicated service pages for roof repair in ${data.location}`,
            'Set up Google My Business with roofing-specific categories',
            'Build local citations on roofing directories',
            'Generate customer reviews and testimonials',
            'Add before/after photos of roofing projects',
            'Create content about roofing materials and techniques',
            'Optimize for emergency roofing searches'
        ];

        return recommendations.slice(0, 5);
    }

    function displayResults(analysis) {
        // Display score
        const scoreCircle = document.getElementById('scoreCircle');
        const scoreValue = document.getElementById('scoreValue');
        const scoreTitle = document.getElementById('scoreTitle');
        const scoreDescription = document.getElementById('scoreDescription');

        scoreValue.textContent = analysis.score;

        // Set score color based on value
        if (analysis.score >= 80) {
            scoreCircle.className = 'score-circle score-excellent';
            scoreTitle.textContent = 'Excellent SEO Performance!';
            scoreDescription.textContent = 'Your roofing website has strong SEO fundamentals';
        } else if (analysis.score >= 60) {
            scoreCircle.className = 'score-circle score-good';
            scoreTitle.textContent = 'Good SEO Foundation';
            scoreDescription.textContent = 'Your roofing website has potential with some improvements needed';
        } else {
            scoreCircle.className = 'score-circle score-poor';
            scoreTitle.textContent = 'SEO Needs Improvement';
            scoreDescription.textContent = 'Your roofing website needs significant SEO optimization';
        }

        // Display analysis results
        const analysisResults = document.getElementById('analysisResults');
        analysisResults.innerHTML = '';

        // Add passed checks
        if (analysis.passed.length > 0) {
            analysis.passed.forEach(item => {
                const passedItem = document.createElement('div');
                passedItem.className = 'analysis-item passed';
                passedItem.style.borderLeftColor = '#28a745';
                passedItem.style.background = 'linear-gradient(135deg, #d4edda, #ffffff)';
                passedItem.innerHTML = `
                    <h4><i class="fas fa-check-circle" style="color: #28a745; margin-right: 10px;"></i> ${item}</h4>
                    <p style="color: #155724; font-weight: 500;">✓ This SEO element is properly implemented</p>
                `;
                analysisResults.appendChild(passedItem);
            });
        }

        // Add issues
        analysis.issues.forEach(issue => {
            const issueItem = document.createElement('div');
            issueItem.className = `analysis-item ${issue.type}`;
            const icon = issue.type === 'error' ? 'fas fa-times-circle' : 'fas fa-exclamation-triangle';
            const iconColor = issue.type === 'error' ? '#e74c3c' : '#f39c12';
            
            issueItem.innerHTML = `
                <h4><i class="${icon}" style="color: ${iconColor}; margin-right: 10px;"></i> ${issue.title}</h4>
                <p><strong style="color: #2c3e50;">Issue:</strong> <span style="color: #555;">${issue.description}</span></p>
                <p><strong style="color: #2c3e50;">Impact:</strong> <span style="color: #e67e22; font-weight: 600;">${issue.impact}</span></p>
                <p><strong style="color: #2c3e50;">Solution:</strong> <span style="color: #27ae60; font-weight: 500;">${issue.solution}</span></p>
            `;
            analysisResults.appendChild(issueItem);
        });

        // Add recommendations
        if (analysis.recommendations.length > 0) {
            const recommendationsSection = document.createElement('div');
            recommendationsSection.className = 'analysis-item recommendations';
            recommendationsSection.style.borderLeftColor = '#17a2b8';
            recommendationsSection.style.background = 'linear-gradient(135deg, #e6f7ff, #ffffff)';
            recommendationsSection.innerHTML = `
                <h4><i class="fas fa-lightbulb" style="color: #17a2b8; margin-right: 10px;"></i> Recommended Next Steps for Your Roofing Business</h4>
                <p style="color: #0c5460; margin-bottom: 15px;">Here are the most important SEO improvements to prioritize:</p>
                <ul style="list-style: none; padding-left: 0;">
                    ${analysis.recommendations.map((rec, index) => `
                        <li style="background: rgba(23,162,184,0.1); padding: 12px 15px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid #17a2b8; color: #0c5460; font-weight: 500;">
                            <i class="fas fa-arrow-right" style="color: #17a2b8; margin-right: 8px;"></i>
                            ${rec}
                        </li>
                    `).join('')}
                </ul>
            `;
            analysisResults.appendChild(recommendationsSection);
        }
    }

    function submitLeadData(formData, analysis) {
        // Submit lead data to your backend/CRM
        const leadData = {
            ...formData,
            score: analysis.score,
            timestamp: new Date().toISOString(),
            source: 'roofing-seo-tool'
        };

        // Example: Send to your backend
        fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData)
        }).catch(error => {
            console.log('Lead tracking not configured:', error);
        });

        // Example: Send to Google Analytics (if configured)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'seo_tool_completed', {
                'event_category': 'roofing_seo_tool',
                'event_label': formData.location,
                'value': analysis.score
            });
        }
    }
});
