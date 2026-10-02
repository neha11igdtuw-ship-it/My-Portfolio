// ============================================
// JavaScript for Portfolio Website
// Beginner-friendly with comments
// ============================================

// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 500);
});

// Wait for the page to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Scroll Progress Indicator
    // ============================================
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
    });

    // ============================================
    // Animated Stats Counter
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(function() {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Observe stats section for animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ============================================
    // Animated Progress Bars
    // ============================================
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(function() {
                        bar.style.width = width + '%';
                    }, 200);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSections = document.querySelectorAll('.skill-progress');
    skillsSections.forEach(section => {
        progressObserver.observe(section);
    });
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // When hamburger icon is clicked, toggle the menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon (make it an X when menu is open)
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked (for mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    // This makes the page scroll smoothly when clicking navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior
            
            const targetId = this.getAttribute('href');
            
            // If clicking on contact link or "Get In Touch" button, open modal
            if (targetId === '#contact' || this.textContent.includes('Get In Touch')) {
                openContactModal();
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate position accounting for fixed navbar
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // Smooth scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        // If user has scrolled down more than 300px, show the button
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // When scroll to top button is clicked, scroll to top smoothly
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    // Highlight the current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position is within this section
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Run on scroll and on page load
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Run once on page load

    // ============================================
    // Animate Elements on Scroll (Fade In)
    // ============================================
    // This creates a nice fade-in effect when elements come into view
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If element is visible, add 'fade-in' class
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and timeline items for animation
    const animateElements = document.querySelectorAll('.achievement-card, .timeline-item, .skills-category, .contact-item');
    
    animateElements.forEach(element => {
        // Set initial state (hidden)
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing
        observer.observe(element);
    });

    // ============================================
    // Add Active State to Navigation Links
    // ============================================
    // Add some CSS for active navigation links
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: #f39c12;
            border-bottom: 2px solid #f39c12;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Contact Form Modal
    // ============================================
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Function to open the contact modal (make it global so onclick can access it)
    window.openContactModal = function() {
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Also create a local reference for internal use
    function openContactModal() {
        window.openContactModal();
    }

    // Function to close the contact modal
    function closeContactModal() {
        contactModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        // Reset form
        contactForm.reset();
        formMessage.classList.remove('show', 'success', 'error');
    }

    // Close modal when clicking the X button
    closeModalBtn.addEventListener('click', closeContactModal);

    // Close modal when clicking outside the modal content
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (you can replace this with actual form handling)
        // For now, we'll just show a success message
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Optional: You can add code here to send the form data to a server
        // Example: sendFormDataToServer(formData);

        // Reset form after 3 seconds
        setTimeout(function() {
            contactForm.reset();
            formMessage.classList.remove('show', 'success', 'error');
        }, 3000);
    });

    // Function to show form messages (success or error)
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message show ' + type;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ============================================
    // Console Welcome Message (for debugging)
    // ============================================
    console.log('Portfolio website loaded successfully! 🎉');
    console.log('Feel free to explore the code and customize it to your needs.');
});

