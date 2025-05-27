
#!/usr/bin/env python3

import os
import re

# Define the new navigation structure
NEW_NAVIGATION = '''            <div class="nav-menu" id="nav-menu">
                <a href="index.html" class="nav-link">Home</a>
                
                <div class="nav-dropdown">
                    <a href="services.html" class="nav-link">Services <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu services-dropdown">
                        <div class="dropdown-section">
                            <h4>Core Services</h4>
                            <a href="construction-seo.html">Construction SEO</a>
                            <a href="professional-services-seo.html">Professional Services SEO</a>
                            <a href="real-estate-seo.html">Real Estate SEO</a>
                            <a href="local-seo-services.html">Local SEO Services</a>
                        </div>
                        <div class="dropdown-section">
                            <a href="services.html" class="view-all-btn">View All Services</a>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="nav-link">Industries <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu industries-dropdown">
                        <div class="dropdown-section">
                            <h4>Construction & Trade</h4>
                            <a href="roofing-seo-services-uk.html">Roofing SEO</a>
                            <a href="best-plumbers-seo.html">Plumber SEO</a>
                            <a href="best-architects-seo.html">Architect SEO</a>
                        </div>
                        <div class="dropdown-section">
                            <h4>Professional Services</h4>
                            <a href="best-law-firm-seo.html">Law Firm SEO</a>
                            <a href="best-dentists-seo.html">Dentist SEO</a>
                            <a href="best-accountants-seo.html">Accountant SEO</a>
                            <a href="best-financial-seo.html">Financial Services SEO</a>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="nav-link">Resources <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu resources-dropdown">
                        <div class="dropdown-section">
                            <h4>Learn & Explore</h4>
                            <a href="blog.html">SEO Blog</a>
                            <a href="case-studies.html">Case Studies</a>
                            <a href="our-work.html">Our Work</a>
                        </div>
                        <div class="dropdown-section">
                            <h4>Tools & Pricing</h4>
                            <a href="seo-audit-tool.html">Free SEO Audit</a>
                            <a href="pricing.html">Pricing</a>
                        </div>
                    </div>
                </div>
                
                <div class="nav-dropdown">
                    <a href="#" class="nav-link">Top Companies <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu companies-dropdown">
                        <div class="dropdown-section">
                            <h4>London</h4>
                            <a href="top-10-roofing-companies-london.html">Top 10 Roofing Companies</a>
                            <a href="top-10-plumbers-london.html">Top 10 Plumbers</a>
                        </div>
                        <div class="dropdown-section">
                            <h4>Manchester</h4>
                            <a href="top-10-roofing-companies-manchester.html">Top 10 Roofing Companies</a>
                        </div>
                        <div class="dropdown-section">
                            <h4>Birmingham</h4>
                            <a href="top-10-roofing-companies-birmingham.html">Top 10 Roofing Companies</a>
                        </div>
                    </div>
                </div>
                
                <a href="about.html" class="nav-link">About</a>
                <a href="contact.html" class="nav-link">Contact</a>
                <a href="contact.html" class="nav-cta">Get Free Audit</a>
            </div>'''

NEW_FOOTER_SECTIONS = '''                <div class="footer-section-modern">
                    <div class="footer-logo">
                        <img src="attached_assets/logo1.png" alt="OutsourceSU Logo" class="footer-logo-image">
                    </div>
                    <p>Professional SEO and digital marketing services delivering real results for businesses across the UK.</p>
                    <div class="social-links-modern">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-section-modern">
                    <h4>Our Services</h4>
                    <ul>
                        <li><a href="construction-seo.html">Construction SEO</a></li>
                        <li><a href="professional-services-seo.html">Professional Services SEO</a></li>
                        <li><a href="real-estate-seo.html">Real Estate SEO</a></li>
                        <li><a href="local-seo-services.html">Local SEO Services</a></li>
                        <li><a href="services.html">All Services</a></li>
                    </ul>
                </div>
                <div class="footer-section-modern">
                    <h4>Industries We Serve</h4>
                    <ul>
                        <li><a href="roofing-seo-services-uk.html">Roofing SEO Services UK</a></li>
                        <li><a href="best-law-firm-seo.html">Law Firm SEO</a></li>
                        <li><a href="best-dentists-seo.html">Dentist SEO</a></li>
                        <li><a href="best-accountants-seo.html">Accountant SEO</a></li>
                        <li><a href="best-plumbers-seo.html">Plumber SEO</a></li>
                        <li><a href="best-architects-seo.html">Architect SEO</a></li>
                    </ul>
                </div>
                <div class="footer-section-modern">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="case-studies.html">Case Studies</a></li>
                        <li><a href="our-work.html">Our Work</a></li>
                        <li><a href="seo-audit-tool.html">Free SEO Audit</a></li>
                        <li><a href="blog.html">SEO Blog</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                    </ul>
                </div>
                <div class="footer-section-modern">
                    <h4>Top 10 Companies</h4>
                    <ul>
                        <li><a href="top-10-roofing-companies-london.html">Top 10 Roofing London</a></li>
                        <li><a href="top-10-plumbers-london.html">Top 10 Plumbers London</a></li>
                        <li><a href="top-10-electricians-london.html">Top 10 Electricians London</a></li>
                        <li><a href="top-10-dentists-london.html">Top 10 Dentists London</a></li>
                        <li><a href="top-10-law-firms-london.html">Top 10 Law Firms London</a></li>
                    </ul>
                </div>
                <div class="footer-section-modern">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="careers.html">Careers</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="sitemap.xml">Sitemap</a></li>
                    </ul>
                </div>
                <div class="footer-section-modern">
                    <h4>Contact OutsourceSU</h4>
                    <div class="contact-info-modern">
                        <p><i class="fas fa-phone"></i> 07411575188</p>
                        <p><i class="fas fa-envelope"></i> contact@outsourcesu.com</p>
                        <p><i class="fas fa-map-marker-alt"></i> London, Manchester, Birmingham</p>
                    </div>
                </div>'''

def update_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update navigation
        nav_pattern = r'<div class="nav-menu" id="nav-menu">.*?</div>'
        content = re.sub(nav_pattern, NEW_NAVIGATION, content, flags=re.DOTALL)
        
        # Update footer sections
        footer_pattern = r'<div class="footer-content-modern">.*?<div class="footer-bottom-modern">'
        replacement = f'<div class="footer-content-modern">\n{NEW_FOOTER_SECTIONS}\n            </div>\n            <div class="footer-bottom-modern">'
        content = re.sub(footer_pattern, replacement, content, flags=re.DOTALL)
        
        # Update footer bottom
        footer_bottom_pattern = r'<p>&copy; 2024 OutsourceSU\.com\. All rights reserved\..*?</p>'
        footer_bottom_replacement = '<p>&copy; 2024 OutsourceSU.com. All rights reserved. | <a href="privacy-policy.html">Privacy Policy</a> | <a href="terms-of-service.html">Terms of Service</a> | <a href="cookie-policy.html">Cookie Policy</a></p>'
        content = re.sub(footer_bottom_pattern, footer_bottom_replacement, content, flags=re.DOTALL)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated: {file_path}")
        
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

# Get all HTML files except index.html, about.html, services.html, contact.html, and blog files
html_files = []
for root, dirs, files in os.walk('.'):
    if 'blog' in root:
        continue
    for file in files:
        if file.endswith('.html') and file not in ['index.html', 'about.html', 'services.html', 'contact.html', 'careers.html']:
            html_files.append(os.path.join(root, file))

print(f"Found {len(html_files)} files to update")
for file_path in html_files:
    update_file(file_path)

print("Navigation update complete!")
