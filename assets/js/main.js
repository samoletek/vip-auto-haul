/**
 * VIP Auto Haul - Main JavaScript File
 * Version 2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Trigger scroll check on page load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            mainNav.classList.remove('active');
            
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Calculate offset for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    if (testimonialDots.length > 0 && testimonialItems.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Remove active class from all dots and items
                testimonialDots.forEach(d => d.classList.remove('active'));
                testimonialItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked dot and corresponding item
                this.classList.add('active');
                testimonialItems[index].classList.add('active');
            });
        });
        
        // Auto-rotate testimonials
        let currentIndex = 0;
        const autoRotate = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialItems.forEach(item => item.classList.remove('active'));
            
            testimonialDots[currentIndex].classList.add('active');
            testimonialItems[currentIndex].classList.add('active');
        }, 5000);
        
        // Stop auto-rotate when user interacts with dots
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                clearInterval(autoRotate);
            });
        });
    }
    
    // Pricing toggle
    const pricingSwitch = document.getElementById('pricing-switch');
    const standardLabel = document.querySelector('.toggle-label:first-child');
    const premiumLabel = document.querySelector('.toggle-label:last-child');
    const standardPricing = document.querySelector('.pricing-card.standard');
    const premiumPricing = document.querySelector('.pricing-card.premium');
    
    if (pricingSwitch && standardPricing && premiumPricing) {
        pricingSwitch.addEventListener('change', function() {
            if (this.checked) {
                standardPricing.classList.remove('active');
                premiumPricing.classList.add('active');
                standardLabel.classList.remove('active');
                premiumLabel.classList.add('active');
            } else {
                premiumPricing.classList.remove('active');
                standardPricing.classList.add('active');
                premiumLabel.classList.remove('active');
                standardLabel.classList.add('active');
            }
        });
        
        // Labels can also toggle the switch
        standardLabel.addEventListener('click', function() {
            pricingSwitch.checked = false;
            pricingSwitch.dispatchEvent(new Event('change'));
        });
        
        premiumLabel.addEventListener('click', function() {
            pricingSwitch.checked = true;
            pricingSwitch.dispatchEvent(new Event('change'));
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // If the clicked item wasn't active, make it active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Only validate, don't prevent default submission
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault(); // Prevent submission only if validation fails
                alert('Please fill in all required fields correctly.');
            }
        });
        
        // Clear error class on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailPattern.test(emailInput.value)) {
                    e.preventDefault();
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Form will be submitted to Formspree
            } else {
                e.preventDefault();
                alert('Please enter your email address.');
            }
        });
    }
    
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.service-card, .timeline-item, .pricing-card, .contact-method');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const elementTopPosition = elementRect.top + windowTopPosition;
            const elementBottomPosition = elementRect.bottom + windowTopPosition;
            
            // Check if element is in view
            if (elementBottomPosition > windowTopPosition && elementTopPosition < windowBottomPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check elements on initial load
    setTimeout(checkIfInView, 100);
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);
});