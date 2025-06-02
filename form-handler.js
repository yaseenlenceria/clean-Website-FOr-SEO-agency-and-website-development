
// Contact form handler to send emails to outsourcesu@gmail.com
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
            
            // Create email content
            const subject = `New SEO Audit Request from ${data.name}`;
            const body = `
New contact form submission from OutsourceSU website:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Website: ${data.website || 'Not provided'}
Industry: ${data.industry || 'Not provided'}
Budget: ${data.budget || 'Not provided'}

Message:
${data.message}

---
Submitted from: ${window.location.href}
Timestamp: ${new Date().toLocaleString()}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:outsourcesu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your submission! Your email client will open with the form details. Please send the email to complete your request.');
            
            // Reset form
            this.reset();
        });
    }
});
