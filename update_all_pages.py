
import os
import re

def update_html_files():
    # Get all HTML files except the component files
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['header-component.html', 'footer-component.html']]
    
    for file_name in html_files:
        try:
            with open(file_name, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original_content = content
            
            # Replace header/navigation patterns with placeholder
            header_patterns = [
                r'<!-- Navigation Component -->.*?</nav>',
                r'<!-- Header Component Placeholder -->.*?</div>',
                r'<nav class="navbar".*?</nav>',
                r'<!-- Header -->.*?</nav>',
                r'<header.*?>.*?</header>'
            ]
            
            header_placeholder = '    <!-- Header Component Placeholder -->\n    <div id="header-placeholder"></div>'
            
            for pattern in header_patterns:
                if re.search(pattern, content, re.DOTALL):
                    content = re.sub(pattern, header_placeholder, content, flags=re.DOTALL)
                    break
            
            # Replace footer patterns with placeholder
            footer_patterns = [
                r'<!-- Footer Component -->.*?</footer>',
                r'<!-- Footer Component Placeholder -->.*?</div>',
                r'<!-- Footer -->.*?</footer>',
                r'<footer class="footer-modern">.*?</footer>',
                r'<footer class="footer">.*?</footer>',
                r'<footer.*?>.*?</footer>'
            ]
            
            footer_placeholder = '    <!-- Footer Component Placeholder -->\n    <div id="footer-placeholder"></div>'
            
            for pattern in footer_patterns:
                if re.search(pattern, content, re.DOTALL):
                    content = re.sub(pattern, footer_placeholder, content, flags=re.DOTALL)
                    break
            
            # Only write if content changed
            if content != original_content:
                with open(file_name, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Updated {file_name}")
            else:
                print(f"No changes needed for {file_name}")
                
        except Exception as e:
            print(f"Error processing {file_name}: {e}")

if __name__ == "__main__":
    update_html_files()
    print("All pages updated with header and footer components!")
