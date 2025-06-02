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

            // Submit form via fetch to prevent page redirect
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
                alert('There was an error sending your message. Please try again or call us directly.');
            })
            .finally(() => {
                // Restore button state
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

// Function to show success message with branded popup
function showSuccessMessage() {
    // Array of motivational quotes
    const motivationalQuotes = [
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "Your limitation—it's only your imagination.",
        "Great things never come from comfort zones.",
        "Dream it. Wish it. Do it.",
        "Success doesn't just find you. You have to go out and get it.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Dream bigger. Do bigger.",
        "Don't stop when you're tired. Stop when you're done.",
        "Wake up with determination. Go to bed with satisfaction."
    ];

    // Get random quote
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    // Create success overlay with animation
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(26, 26, 26, 0.95));
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        padding: 50px 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 600px;
        margin: 20px;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        border: 2px solid #ff6b35;
        position: relative;
        transform: scale(0.7) translateY(50px);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: hidden;
    `;

    // Add animated background pattern
    const pattern = document.createElement('div');
    pattern.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ff6b35" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ff6b35" opacity="0.1"/><circle cx="75" cy="25" r="1" fill="%23ff6b35" opacity="0.1"/><circle cx="25" cy="75" r="1" fill="%23ff6b35" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        pointer-events: none;
        z-index: 1;
    `;

    modal.innerHTML = `
        <div style="position: relative; z-index: 2;">
            <!-- OutsourceSU Logo -->
            <div style="margin-bottom: 30px;">
                <img src="/attached_assets/logo1.png" alt="OutsourceSU" style="height: 60px; width: auto;">
            </div>
            
            <!-- Success Icon with Animation -->
            <div style="position: relative; margin-bottom: 25px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #28a745, #20c997); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3); animation: pulse 2s infinite;">
                    <i class="fas fa-check" style="font-size: 36px; color: white;"></i>
                </div>
            </div>
            
            <!-- Main Message -->
            <h2 style="color: #1a1a1a; margin-bottom: 15px; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                🎉 Thank You!
            </h2>
            
            <div style="background: linear-gradient(135deg, #ff6b35, #e55a2e); color: white; padding: 20px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);">
                <h3 style="margin: 0 0 10px 0; font-size: 20px;">Your SEO Audit Request is Confirmed!</h3>
                <p style="margin: 0; font-size: 16px; opacity: 0.95;">We'll analyze your website and get back to you within 24 hours with actionable insights.</p>
            </div>
            
            <!-- Motivational Quote -->
            <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #ff6b35;">
                <div style="color: #ff6b35; font-size: 18px; margin-bottom: 10px;">
                    <i class="fas fa-quote-left"></i> Inspiration for Your Journey
                </div>
                <p style="color: #495057; font-style: italic; font-size: 16px; line-height: 1.6; margin: 0;">
                    "${randomQuote}"
                </p>
            </div>
            
            <!-- Call to Action -->
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button onclick="this.closest('.success-overlay').remove()" 
                        style="background: linear-gradient(135deg, #ff6b35, #e55a2e); color: white; border: none; padding: 15px 30px; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 16px; box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3); transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 25px rgba(255, 107, 53, 0.4)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(255, 107, 53, 0.3)'">
                    <i class="fas fa-rocket"></i>
                    Continue Your Journey
                </button>
                
                <a href="tel:07411575188" 
                   style="background: transparent; color: #ff6b35; border: 2px solid #ff6b35; padding: 13px 25px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;"
                   onmouseover="this.style.background='#ff6b35'; this.style.color='white'"
                   onmouseout="this.style.background='transparent'; this.style.color='#ff6b35'">
                    <i class="fas fa-phone"></i>
                    Call Now
                </a>
            </div>
            
            <!-- Social Follow -->
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                <p style="color: #6c757d; font-size: 14px; margin-bottom: 15px;">Follow us for SEO tips & updates:</p>
                <div style="display: flex; justify-content: center; gap: 15px;">
                    <a href="https://www.linkedin.com/company/outsource-su" target="_blank" style="color: #0077b5; font-size: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://x.com/OutsourceSu" target="_blank" style="color: #1da1f2; font-size: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61576560915041" target="_blank" style="color: #4267b2; font-size: 20px; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                        <i class="fab fa-facebook"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.appendChild(pattern);
    overlay.className = 'success-overlay';
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1) translateY(0)';
    }, 100);

    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        }
    }, 10000);

    // Close on outside click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        }
    });
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