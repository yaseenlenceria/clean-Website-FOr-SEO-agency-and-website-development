
// Dynamic Category-Based Styling
document.addEventListener('DOMContentLoaded', function() {
    const categoryStyles = {
        'Construction Services': {
            primaryColor: '#ff6b35',
            accentColor: '#ff8c42',
            iconClass: 'fas fa-hard-hat'
        },
        'Roofing Services': {
            primaryColor: '#ff6b35',
            accentColor: '#d4541e',
            iconClass: 'fas fa-home'
        },
        'Professional Services': {
            primaryColor: '#2c5aa0',
            accentColor: '#1e3a8a',
            iconClass: 'fas fa-briefcase'
        },
        'Legal Services': {
            primaryColor: '#1f2937',
            accentColor: '#374151',
            iconClass: 'fas fa-balance-scale'
        },
        'Dental Services': {
            primaryColor: '#06b6d4',
            accentColor: '#0891b2',
            iconClass: 'fas fa-tooth'
        },
        'Real Estate Services': {
            primaryColor: '#059669',
            accentColor: '#047857',
            iconClass: 'fas fa-building'
        },
        'Local SEO Services': {
            primaryColor: '#7c3aed',
            accentColor: '#6d28d9',
            iconClass: 'fas fa-map-marker-alt'
        }
    };

    function applyCategoryStyles() {
        const pageData = window.dynamicTagging?.getCurrentPageData();
        if (!pageData || !categoryStyles[pageData.category]) return;

        const styles = categoryStyles[pageData.category];
        
        // Create dynamic CSS
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .category-themed .btn-primary-modern {
                background: ${styles.primaryColor} !important;
            }
            .category-themed .btn-primary-modern:hover {
                background: ${styles.accentColor} !important;
            }
            .category-themed .primary-accent {
                color: ${styles.primaryColor} !important;
            }
            .category-themed .category-icon::before {
                content: "";
                font-family: "Font Awesome 6 Free";
                font-weight: 900;
            }
        `;
        
        document.head.appendChild(styleSheet);
        document.body.classList.add('category-themed');

        // Add category icons where appropriate
        const headings = document.querySelectorAll('h1, h2.category-heading');
        headings.forEach(heading => {
            if (!heading.querySelector('.category-icon')) {
                const icon = document.createElement('i');
                icon.className = `${styles.iconClass} category-icon`;
                icon.style.marginRight = '10px';
                heading.prepend(icon);
            }
        });
    }

    // Apply after dynamic tagging is initialized
    setTimeout(applyCategoryStyles, 200);
});
