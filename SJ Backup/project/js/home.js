// JavaScript for Home Page

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider Functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const controls = document.querySelectorAll('.control');
    let currentTestimonial = 0;
    let interval;
    
    // Set first testimonial as active
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
    }
    
    // Function to change testimonial
    const changeTestimonial = (index) => {
        // Remove active class from all testimonials and controls
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        controls.forEach(control => {
            control.classList.remove('active');
        });
        
        // Add active class to current testimonial and control
        testimonials[index].classList.add('active');
        controls[index].classList.add('active');
        
        // Update current index
        currentTestimonial = index;
    };
    
    // Add click event to controls
    controls.forEach((control, index) => {
        control.addEventListener('click', () => {
            changeTestimonial(index);
            resetInterval();
        });
    });
    
    // Function to move to next testimonial
    const nextTestimonial = () => {
        let next = currentTestimonial + 1;
        if (next >= testimonials.length) {
            next = 0;
        }
        changeTestimonial(next);
    };
    
    // Set interval for automatic slider
    const startInterval = () => {
        interval = setInterval(nextTestimonial, 5000);
    };
    
    // Reset interval when user interacts with slider
    const resetInterval = () => {
        clearInterval(interval);
        startInterval();
    };
    
    // Start automatic slider if testimonials exist
    if (testimonials.length > 0) {
        startInterval();
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
});