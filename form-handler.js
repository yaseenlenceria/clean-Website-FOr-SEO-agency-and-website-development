// Contact form handler to send emails to outsourcesu@gmail.com via submit-form.com
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Get form data for validation
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Validate required fields
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Submit form via fetch to prevent redirect
            fetch('https://submit-form.com/oAWs77hqm', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Show success popup
                    showSuccessMessage();
                    // Reset form
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }

    // Newsletter form handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                // Handle newsletter subscription
                sendNewsletterSubscription(email);
                alert('Thank you for subscribing to our newsletter!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
});

// Function to handle newsletter subscription via submit-form.com
function sendNewsletterSubscription(email) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://submit-form.com/oAWs77hqm';
    form.style.display = 'none';

    const fields = [
        { name: 'email', value: email },
        { name: 'type', value: 'Newsletter Subscription' },
        { name: 'source', value: window.location.href },
        { name: 'timestamp', value: new Date().toLocaleString() }
    ];

    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}

// Function to show success message
function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;

    modal.innerHTML = `
        <div style="color: #28a745; font-size: 48px; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: #333; margin-bottom: 15px;">Thank You!</h3>
        <p style="color: #666; margin-bottom: 25px;">
            Your SEO audit request has been submitted successfully. 
            We'll review your information and get back to you within 24 hours.
        </p>
        <button onclick="this.closest('.success-overlay').remove()" 
                style="background: #ff6b35; color: white; border: none; padding: 12px 24px; 
                       border-radius: 6px; cursor: pointer; font-weight: 600;">
            Close
        </button>
    `;

    overlay.className = 'success-overlay';
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 5000);
}

// Check for success parameters in URL
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('newsletter') === 'true') {
        alert('Thank you for subscribing to our newsletter!');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// Utility function for date formatting (fixes console errors)
function formatDate(date) {
    if (!date) return 'Unknown';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.formatDate = formatDate;
}