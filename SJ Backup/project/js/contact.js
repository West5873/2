// JavaScript for Contact Page

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => {
                message.style.display = 'none';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                document.getElementById('nameError').textContent = 'Please enter your name';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[0-9\s\+\-\(\)]{10,20}$/;
            if (phone === '' || !phoneRegex.test(phone)) {
                document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
                document.getElementById('phoneError').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('messageError').textContent = 'Please enter your message';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            // Validate consent
            if (!consent) {
                document.getElementById('consentError').textContent = 'You must consent to data collection';
                document.getElementById('consentError').style.display = 'block';
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                const formData = new FormData(contactForm);

                fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Hide form and show success message
                        contactForm.style.display = 'none';
                        formSuccess.style.display = 'block';
                
                // In a real application, you would send the form data to a server here
                // For this demo, we're just showing the success message
                
                // Scroll to success message
                        formSuccess.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                
                    // Reset form
                        contactForm.reset();
                    } else {
                        response.json().then(data => {
                            alert(data.errors ? data.errors.map(e => e.message).join(", ") : "Oops! There was a problem submitting your form.");
                        });
                    }
                })
            .catch(() => {
                alert("Oops! There was a problem submitting your form.");
                });
            }
    
    // Form fields real-time validation
    const validateField = (field, regex, errorElement, errorMessage) => {
        const value = field.value.trim();
        
        if (regex && value !== '') {
            if (!regex.test(value)) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                return false;
            } else {
                errorElement.style.display = 'none';
                return true;
            }
        } else if (value === '' && field.required) {
            errorElement.textContent = 'This field is required';
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    };
    
    // Add blur event listeners to form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    
    if (nameField) {
        nameField.addEventListener('blur', function() {
            validateField(
                this, 
                null, 
                document.getElementById('nameError'), 
                'Please enter your name'
            );
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateField(
                this, 
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                document.getElementById('emailError'), 
                'Please enter a valid email address'
            );
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            validateField(
                this, 
                /^[0-9\s\+\-\(\)]{10,20}$/, 
                document.getElementById('phoneError'), 
                'Please enter a valid phone number'
            );
        });
    }
    
    if (messageField) {
        messageField.addEventListener('blur', function() {
            validateField(
                this, 
                null, 
                document.getElementById('messageError'), 
                'Please enter your message'
            );
        });
    }
});