// Mobile Static Portfolio JavaScript
// Handles device detection, navigation, and desktop prompt

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupDesktopPrompt();
    setupFormHandling();
    checkDeviceAndShowPrompt();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) {
                navLinks[index].classList.add('active');
            }
        }
    });
}

// Desktop prompt functionality
function setupDesktopPrompt() {
    const promptOverlay = document.getElementById('desktop-prompt');
    
    // Close prompt when clicking outside
    promptOverlay.addEventListener('click', function(e) {
        if (e.target === promptOverlay) {
            closePrompt();
        }
    });
    
    // Close prompt with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !promptOverlay.classList.contains('hidden')) {
            closePrompt();
        }
    });
}

function checkForDesktopResize() {
    // Check if user has resized to desktop size
    if (!isMobileDevice() && window.innerWidth > 1024) {
        // User has switched to desktop mode, show notification
        showDesktopAvailableNotification();
    }
}

function closePrompt() {
    const promptOverlay = document.getElementById('desktop-prompt');
    promptOverlay.classList.add('hidden');
    
    // Store user preference to not show prompt again in this session
    sessionStorage.setItem('desktopPromptClosed', 'true');
}

function checkDeviceAndShowPrompt() {
    const promptOverlay = document.getElementById('desktop-prompt');
    const promptClosed = sessionStorage.getItem('desktopPromptClosed');
    
    // Show prompt if user hasn't closed it and it's a mobile device
    if (!promptClosed && isMobileDevice()) {
        // Show prompt after a short delay
        setTimeout(() => {
            promptOverlay.classList.remove('hidden');
        }, 1000);
    } else {
        promptOverlay.classList.add('hidden');
    }
}

function showDesktopAvailableNotification() {
    const desktopNotificationShown = sessionStorage.getItem('desktopNotificationShown');
    
    if (!desktopNotificationShown) {
        const desktopUrl = window.location.origin + window.location.pathname.replace('mobile-static.html', 'exp.html');
        
        showNotification(
            `🖥️ Desktop mode detected! For the full interactive experience with animations and carousel navigation, visit the desktop version.`,
            'info',
            8000,
            () => {
                window.open(desktopUrl, '_blank');
            }
        );
        
        sessionStorage.setItem('desktopNotificationShown', 'true');
    }
}

// Device detection
function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
        'mobile', 'android', 'iphone', 'ipad', 'ipod', 
        'blackberry', 'windows phone', 'opera mini'
    ];
    
    // Check user agent
    const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
    
    // Check screen size
    const isSmallScreen = window.innerWidth <= 768;
    
    // Check touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return isMobileUA || (isSmallScreen && isTouchDevice);
}

// Form handling
function setupFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    form.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '500',
        zIndex: '1001',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #6366f1, #a855f7)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for browsers that don't support CSS scroll-behavior
function smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 80; // Account for fixed nav
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScrollHandler = debounce(updateActiveNavLink, 100);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedScrollHandler);

// Global functions for HTML onclick handlers
window.openDesktop = openDesktop;
window.closePrompt = closePrompt;

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        updateActiveNavLink();
    }, 500);
});

// Add intersection observer for better performance (if supported)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
                
                if (correspondingNavLink) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}
