
// Contact form handler to send emails to outsourcesu@gmail.com
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Only prevent default if we haven't configured FormSubmit yet
            if (!this.hasAttribute('data-formsubmit-configured')) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    company: formData.get('company'),
                    website: formData.get('website'),
                    industry: formData.get('industry'),
                    budget: formData.get('budget'),
                    message: formData.get('message')
                };
                
                // Validate required fields
                if (!data.name || !data.email || !data.message) {
                    alert('Please fill in all required fields (Name, Email, and Message).');
                    return;
                }
                
                // Configure and submit to FormSubmit
                sendEmailNotification(data);
                
                // Mark as configured
                this.setAttribute('data-formsubmit-configured', 'true');
                
                // Show success message (FormSubmit will redirect, but show message for UX)
                showSuccessMessage();
            }
            // If already configured, let the form submit naturally to FormSubmit
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

// Function to send email notification
function sendEmailNotification(data) {
    // Create a proper form element that will be submitted to FormSubmit
    const existingForm = document.getElementById('contact-form');
    
    // Update the existing form to point to FormSubmit
    existingForm.setAttribute('action', 'https://formsubmit.co/outsourcesu@gmail.com');
    existingForm.setAttribute('method', 'POST');
    
    // Add FormSubmit configuration fields
    const formSubmitFields = [
        { name: '_subject', value: `New SEO Audit Request from ${data.name}` },
        { name: '_captcha', value: 'false' },
        { name: '_template', value: 'table' },
        { name: '_next', value: window.location.href + '?success=true' },
        { name: '_autoresponse', value: 'Thank you for your SEO audit request! We will review your information and get back to you within 24 hours.' }
    ];
    
    // Remove any existing hidden FormSubmit fields
    existingForm.querySelectorAll('input[name^="_"]').forEach(input => input.remove());
    
    // Add new FormSubmit configuration fields
    formSubmitFields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        existingForm.appendChild(input);
    });
    
    // Add source and timestamp
    const sourceInput = document.createElement('input');
    sourceInput.type = 'hidden';
    sourceInput.name = 'source_page';
    sourceInput.value = window.location.href;
    existingForm.appendChild(sourceInput);
    
    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = 'submission_time';
    timestampInput.value = new Date().toLocaleString('en-GB');
    existingForm.appendChild(timestampInput);
    
    // Now submit the form naturally
    existingForm.submit();
}

// Function to handle newsletter subscription
function sendNewsletterSubscription(email) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/outsourcesu@gmail.com';
    form.style.display = 'none';
    
    const fields = [
        { name: '_subject', value: 'New Newsletter Subscription' },
        { name: '_captcha', value: 'false' },
        { name: '_next', value: window.location.href + '?newsletter=true' },
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
