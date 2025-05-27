
import os
import re

def update_html_files():
    # Header component HTML
    header_component = '''    <!-- Header Component Placeholder -->
    <div id="header-placeholder">
        <!-- Navigation Component -->
        <nav class="navbar" id="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html">
                        <img src="attached_assets/logo1.png" alt="OutsourceSU Logo" class="logo-image">
                    </a>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <a href="index.html" class="nav-link">Home</a>
                    <div class="nav-dropdown">
                        <a href="services.html" class="nav-link">Services <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="construction-seo.html">Construction SEO</a>
                            <a href="professional-services-seo.html">Professional Services</a>
                            <a href="real-estate-seo.html">Real Estate SEO</a>
                            <a href="services.html">View All Services</a>
                        </div>
                    </div>
                    <div class="nav-dropdown">
                        <a href="#" class="nav-link">Industries <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="roofing-seo-services-uk.html">Roofing SEO Services UK</a>
                            <a href="best-law-firm-seo.html">Law Firm SEO</a>
                            <a href="best-dentists-seo.html">Dentist SEO</a>
                            <a href="best-accountants-seo.html">Accountant SEO</a>
                            <a href="best-architects-seo.html">Architect SEO</a>
                            <a href="best-financial-seo.html">Financial Services SEO</a>
                            <a href="best-plumbers-seo.html">Plumber SEO</a>
                        </div>
                    </div>
                    <div class="nav-dropdown">
                        <a href="#" class="nav-link">Top 10 Companies <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="top-10-roofing-companies-london.html">Top 10 Roofing Companies London</a>
                            <a href="top-10-roofing-companies-manchester.html">Top 10 Roofing Companies Manchester</a>
                            <a href="top-10-roofing-companies-birmingham.html">Top 10 Roofing Companies Birmingham</a>
                            <a href="top-10-plumbers-london.html">Top 10 Plumbers London</a>
                            <a href="contact.html">Contact for Manchester Plumbers</a>
                            <a href="contact.html">Contact for London Electricians</a>
                            <a href="contact.html">Contact for London Dentists</a>
                            <a href="contact.html">Contact for Manchester Dentists</a>
                            <a href="contact.html">Contact for London Law Firms</a>
                            <a href="contact.html">Contact for London Accountants</a>
                            <a href="contact.html">Contact for London Architects</a>
                            <a href="contact.html">Contact for Financial Advisors</a>
                        </div>
                    </div>
                    <a href="about.html" class="nav-link">About</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                    <a href="contact.html" class="nav-cta">Get Free Audit</a>
                </div>
                <div class="nav-toggle" id="nav-toggle">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </div>
        </nav>
    </div>'''

    # Get all HTML files in the current directory
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'header-component.html']
    
    for file_name in html_files:
        try:
            with open(file_name, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Pattern to match navigation section (various formats)
            patterns = [
                r'<!-- Navigation Component -->.*?</nav>',
                r'<!-- Sticky CTA Button for Mobile -->.*?</div>\s*<!-- Navigation Component -->.*?</nav>',
                r'<nav class="navbar".*?</nav>',
                r'<!-- Header Component Placeholder -->.*?</div>'
            ]
            
            updated = False
            for pattern in patterns:
                if re.search(pattern, content, re.DOTALL):
                    content = re.sub(pattern, header_component, content, flags=re.DOTALL)
                    updated = True
                    break
            
            if updated:
                with open(file_name, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Updated {file_name}")
            else:
                print(f"No navigation found in {file_name}")
                
        except Exception as e:
            print(f"Error processing {file_name}: {e}")

if __name__ == "__main__":
    update_html_files()
    print("Header component update completed!")
