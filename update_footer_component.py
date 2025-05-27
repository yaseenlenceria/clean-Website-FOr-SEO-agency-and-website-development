
import os
import re

def update_html_files():
    # Get all HTML files in the current directory
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['header-component.html', 'footer-component.html']]
    
    # Footer component placeholder
    footer_placeholder = '    <!-- Footer Component Placeholder -->\n    <div id="footer-placeholder"></div>'
    
    for file_name in html_files:
        try:
            with open(file_name, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Pattern to match various footer sections
            footer_patterns = [
                r'<!-- Footer Component -->.*?</footer>',
                r'<!-- Footer -->.*?</footer>',
                r'<footer class="footer-modern">.*?</footer>',
                r'<footer class="footer">.*?</footer>',
                r'<footer.*?>.*?</footer>'
            ]
            
            updated = False
            for pattern in footer_patterns:
                if re.search(pattern, content, re.DOTALL):
                    content = re.sub(pattern, footer_placeholder, content, flags=re.DOTALL)
                    updated = True
                    break
            
            if updated:
                with open(file_name, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Updated {file_name}")
            else:
                print(f"No footer found in {file_name}")
                
        except Exception as e:
            print(f"Error processing {file_name}: {e}")

if __name__ == "__main__":
    update_html_files()
    print("Footer component update completed!")
