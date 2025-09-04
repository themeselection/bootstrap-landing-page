// Custom JavaScript for AI Vision Pro Landing Page

document.addEventListener('DOMContentLoaded', function () {
    // Initialize page loader
    initPageLoader();

    // Initialize navbar scroll effect
    initNavbarScrollEffect();

    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize navbar active link tracking
    initNavbarActiveTracking();
});

// Page Loader
function initPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);

    window.addEventListener('load', function () {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 800);
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 1)';
        }
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Navbar Active Link Tracking
function initNavbarActiveTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function () {
        const scrollPos = window.scrollY + 100; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to the current section's nav link
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Floating Cards Animation Enhancement
function enhanceFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        // Add random slight movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Mouse parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const floatingCards = document.querySelectorAll('.floating-card');

    heroSection.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingCards.forEach((card, index) => {
            const intensity = (index + 1) * 10;
            const x = (mouseX - 0.5) * intensity;
            const y = (mouseY - 0.5) * intensity;

            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize enhanced animations when page loads
window.addEventListener('load', function () {
    enhanceFloatingCards();
    initParallaxEffect();
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4f46e5, #06b6d4);
        z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-content h1');
    if (!titleElement) return;

    const originalText = titleElement.innerHTML;
    titleElement.innerHTML = '';

    let index = 0;

    function typeCharacter() {
        if (index < originalText.length) {
            titleElement.innerHTML = originalText.substring(0, index + 1);
            index++;
            setTimeout(typeCharacter, 50);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeCharacter, 1000);
}

// Add button click effects
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function () {
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(element => {
            if (document.hidden) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    });
}

// Initialize performance optimizations
optimizeAnimations();

// Pricing Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    initPricingToggle();
});

function initPricingToggle() {
    const monthlyToggle = document.getElementById('monthly');
    const annualToggle = document.getElementById('annual');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const annualNotes = document.querySelectorAll('.annual-note');

    if (!monthlyToggle || !annualToggle) return;

    function switchPricing(isAnnual) {
        monthlyPrices.forEach(price => {
            price.classList.toggle('d-none', isAnnual);
        });

        annualPrices.forEach(price => {
            price.classList.toggle('d-none', !isAnnual);
        });

        annualNotes.forEach(note => {
            note.classList.toggle('d-none', !isAnnual);
        });

        // Add animation effect
        const priceContainers = document.querySelectorAll('.price-container');
        priceContainers.forEach(container => {
            container.style.transform = 'scale(0.95)';
            container.style.opacity = '0.7';

            setTimeout(() => {
                container.style.transform = 'scale(1)';
                container.style.opacity = '1';
            }, 150);
        });
    }

    monthlyToggle.addEventListener('change', function () {
        if (this.checked) {
            switchPricing(false);
        }
    });

    annualToggle.addEventListener('change', function () {
        if (this.checked) {
            switchPricing(true);
        }
    });
}

// Enhanced pricing card interactions
function initPricingCardEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add glow effect to featured plan
            if (this.classList.contains('featured')) {
                this.style.boxShadow = '0 25px 50px -12px rgba(79, 70, 229, 0.25)';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (this.classList.contains('featured')) {
                this.style.boxShadow = '';
            }
        });
    });
}

// Initialize pricing effects
document.addEventListener('DOMContentLoaded', function () {
    initPricingCardEffects();
});

// Smooth scroll for pricing section links
function initPricingSmoothScroll() {
    const pricingLinks = document.querySelectorAll('a[href^="#"]:not(.navbar-nav a)');

    pricingLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 100;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize pricing smooth scroll
document.addEventListener('DOMContentLoaded', function () {
    initPricingSmoothScroll();
});

// Add price change animation on scroll
function initPriceScrollAnimation() {
    const priceElements = document.querySelectorAll('.amount');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;

                // Only animate numbers, not "Custom"
                if (!isNaN(finalValue)) {
                    animateNumber(element, 0, parseInt(finalValue), 1000);
                }

                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    priceElements.forEach(element => {
        observer.observe(element);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOutCubic);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// Initialize price animations
document.addEventListener('DOMContentLoaded', function () {
    // Delay to ensure section is visible
    setTimeout(() => {
        initPriceScrollAnimation();
    }, 1000);

    // Initialize contact form
    initContactForm();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successAlert = document.querySelector('.contact-success');

    if (!contactForm) return;

    // Form validation on input
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateField(this);
        });

        input.addEventListener('blur', function () {
            validateField(this);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            submitForm();
        }
    });

    // Validate individual field
    function validateField(field) {
        const fieldContainer = field.closest('.col-12, .col-md-6');
        const feedback = fieldContainer.querySelector('.invalid-feedback');
        let isValid = true;
        let message = '';

        // Remove previous validation classes
        field.classList.remove('is-valid', 'is-invalid');

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = getRequiredMessage(field);
        }

        // Email validation
        else if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                message = 'Please provide a valid email address.';
            }
        }

        // Phone validation (optional)
        else if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                message = 'Please provide a valid phone number.';
            }
        }

        // Apply validation feedback
        if (isValid && field.value.trim()) {
            field.classList.add('is-valid');
        } else if (!isValid) {
            field.classList.add('is-invalid');
            if (feedback) feedback.textContent = message;
        }

        return isValid;
    }

    // Get required field message
    function getRequiredMessage(field) {
        const formFloating = field.closest('.form-floating');
        const label = formFloating ? formFloating.querySelector('label') : null;
        const labelText = label ? label.textContent.replace('*', '').trim() : 'This field';
        return `${labelText} is required.`;
    }

    // Validate entire form
    function validateForm() {
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // Focus first invalid field
        if (!isFormValid) {
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                // Smooth scroll to the field
                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        return isFormValid;
    }

    // Submit form
    function submitForm() {
        // Show loading state
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide loading state
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            submitBtn.disabled = false;

            // Show success message
            successAlert.classList.remove('d-none');
            contactForm.reset();

            // Remove validation classes
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });

            // Scroll to success message
            successAlert.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successAlert.classList.add('d-none');
            }, 5000);

        }, 2000); // Simulate 2-second processing time
    }
}

// Live Chat Function (placeholder)
function openLiveChat() {
    // Placeholder for live chat integration
    alert('Live chat would open here. Integrate with your preferred chat service (Intercom, Zendesk, etc.)');
}

// Additional Contact Form Enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Auto-resize textarea
    const textarea = document.getElementById('contactMessage');
    if (textarea) {
        textarea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }

    // Character counter for message
    const messageInput = document.getElementById('contactMessage');
    if (messageInput) {
        const maxLength = 1000;
        const counter = document.createElement('small');
        counter.className = 'text-muted mt-1 d-block text-end';
        counter.id = 'messageCounter';
        messageInput.parentNode.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - messageInput.value.length;
            counter.textContent = `${messageInput.value.length}/${maxLength} characters`;

            if (remaining < 50) {
                counter.classList.add('text-warning');
                counter.classList.remove('text-muted');
            } else {
                counter.classList.add('text-muted');
                counter.classList.remove('text-warning');
            }
        }

        messageInput.addEventListener('input', updateCounter);
        messageInput.setAttribute('maxlength', maxLength);
        updateCounter();
    }

    // Form field focus effects
    const formControls = document.querySelectorAll('.contact-form .form-control, .contact-form .form-select');
    formControls.forEach(control => {
        control.addEventListener('focus', function () {
            this.closest('.form-floating').classList.add('focused');
        });

        control.addEventListener('blur', function () {
            this.closest('.form-floating').classList.remove('focused');
        });
    });
});

// Contact section animations on scroll
function initContactAnimations() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger form animation
                const formContainer = entry.target.querySelector('.contact-form-container');
                if (formContainer) {
                    formContainer.style.opacity = '0';
                    formContainer.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        formContainer.style.transition = 'all 0.6s ease-out';
                        formContainer.style.opacity = '1';
                        formContainer.style.transform = 'translateY(0)';
                    }, 100);
                }

                // Trigger contact cards animation
                const contactCards = entry.target.querySelectorAll('.contact-card');
                contactCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 200 + (index * 100));
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(contactSection);
}

// Initialize contact animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initContactAnimations, 500);

    // Initialize footer functionality
    initFooterFunctionality();
});

// Footer Functionality
function initFooterFunctionality() {
    // Newsletter subscription
    initNewsletterSubscription();

    // Back to top button
    initBackToTopButton();

    // Footer animations
    initFooterAnimations();

    // Smooth scroll for footer links
    initFooterSmoothScroll();
}

// Newsletter Subscription
function initNewsletterSubscription() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;

        if (!emailInput.value.trim()) {
            showNewsletterMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showNewsletterMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        submitBtn.disabled = true;

        // Simulate subscription process
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;

            // Clear input
            emailInput.value = '';

            // Show success message
            showNewsletterMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
        }, 2000);
    });
}

// Show newsletter message
function showNewsletterMessage(message, type) {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    // Remove existing message
    const existingMessage = newsletterForm.parentNode.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mt-2`;
    messageDiv.style.padding = '0.5rem 0.75rem';
    messageDiv.style.fontSize = '0.85rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.background = type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    messageDiv.style.border = `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`;
    messageDiv.style.color = type === 'success' ? '#10b981' : '#ef4444';
    messageDiv.textContent = message;

    newsletterForm.parentNode.appendChild(messageDiv);

    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Back to Top Button
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Footer Animations
function initFooterAnimations() {
    const footer = document.querySelector('.footer-section');
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger footer animations
                const animatedElements = entry.target.querySelectorAll('.footer-brand, .footer-links, .footer-newsletter');
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(footer);
}

// Footer Smooth Scroll
function initFooterSmoothScroll() {
    const footerLinks = document.querySelectorAll('.footer-nav a[href^="#"]');

    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Social Media Analytics (placeholder)
function trackSocialClick(platform) {
    // Placeholder for analytics tracking
    console.log(`Social media click: ${platform}`);

    // Example: Google Analytics event tracking
    // gtag('event', 'social_click', {
    //     'platform': platform,
    //     'location': 'footer'
    // });
}

// Newsletter Analytics (placeholder)
function trackNewsletterSubscription(email) {
    // Placeholder for analytics tracking
    console.log('Newsletter subscription:', email);

    // Example: Analytics event
    // gtag('event', 'newsletter_subscription', {
    //     'location': 'footer'
    // });
}

// Footer Link Analytics (placeholder)
function trackFooterLink(linkText, href) {
    // Placeholder for analytics tracking
    console.log(`Footer link clicked: ${linkText} -> ${href}`);
}

// Add click tracking to social links
document.addEventListener('DOMContentLoaded', function () {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const platform = this.getAttribute('aria-label') || 'unknown';
            trackSocialClick(platform);
        });
    });

    // Add click tracking to footer links
    const footerLinks = document.querySelectorAll('.footer-nav a, .legal-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const linkText = this.textContent.trim();
            const href = this.getAttribute('href');
            trackFooterLink(linkText, href);
        });
    });
});

// Footer Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Add keyboard navigation support for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add focus management for newsletter form
    const newsletterInput = document.querySelector('.newsletter-form input[type="email"]');
    const newsletterBtn = document.querySelector('.newsletter-form button[type="submit"]');

    if (newsletterInput && newsletterBtn) {
        newsletterInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                newsletterBtn.click();
            }
        });
    }

    // Ensure back-to-top button is keyboard accessible
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
});