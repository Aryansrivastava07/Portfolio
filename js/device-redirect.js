// Device Detection and Redirection Script
// Add this script to main portfolio pages to redirect mobile users

(function() {
    'use strict';
    
    // Configuration
    const config = {
        mobilePageUrl: 'mobile-static.html',
        desktopPages: ['index.html', 'exp.html'],
        enableRedirection: true,
        showMobileWarning: true,
        sessionStorageKey: 'portfolioDevicePreference'
    };
    
    // Device detection function
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            'mobile', 'android', 'iphone', 'ipad', 'ipod', 
            'blackberry', 'windows phone', 'opera mini',
            'webos', 'palm', 'symbian', 'nokia', 'fennec',
            'maemo', 'silk', 'kindle'
        ];
        
        // Check user agent
        const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
        
        // Check screen size (more reliable for tablets)
        const isSmallScreen = window.innerWidth <= 768 || window.innerHeight <= 768;
        
        // Check touch capability
        const isTouchDevice = 'ontouchstart' in window || 
                             navigator.maxTouchPoints > 0 || 
                             navigator.msMaxTouchPoints > 0;
        
        // Check device pixel ratio (high DPI mobile devices)
        const isHighDPI = window.devicePixelRatio > 1.5;
        
        // Combine checks for better accuracy
        return isMobileUA || (isSmallScreen && isTouchDevice) || 
               (isTouchDevice && isHighDPI && isSmallScreen);
    }
    
    // Check if current page is a desktop page
    function isDesktopPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        return config.desktopPages.includes(currentPage) || 
               currentPage === '' || 
               currentPage === '/';
    }
    
    // Get user preference from session storage
    function getUserPreference() {
        return sessionStorage.getItem(config.sessionStorageKey);
    }
    
    // Set user preference in session storage
    function setUserPreference(preference) {
        sessionStorage.setItem(config.sessionStorageKey, preference);
    }
    
    // Create mobile warning banner
    function createMobileWarning() {
        const banner = document.createElement('div');
        banner.id = 'mobile-warning-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #f59e0b, #d97706);
                color: white;
                padding: 12px 16px;
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                font-weight: 500;
                z-index: 10000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            ">
                <div style="max-width: 600px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                    <span>📱 This site works best on desktop. <a href="${config.mobilePageUrl}" style="color: white; text-decoration: underline;">View mobile version</a></span>
                    <button onclick="closeMobileWarning()" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    ">✕</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Show banner with animation
        setTimeout(() => {
            banner.firstElementChild.style.transform = 'translateY(0)';
        }, 500);
        
        // Add global close function
        window.closeMobileWarning = function() {
            banner.firstElementChild.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
            setUserPreference('desktop-warned');
        };
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (document.getElementById('mobile-warning-banner')) {
                window.closeMobileWarning();
            }
        }, 10000);
    }
    
    // Redirect to mobile version
    function redirectToMobile() {
        const currentUrl = new URL(window.location);
        const mobileUrl = new URL(config.mobilePageUrl, currentUrl.origin + currentUrl.pathname.replace(/[^/]*$/, ''));
        
        // Add query parameter to indicate redirect
        mobileUrl.searchParams.set('from', 'desktop-redirect');
        
        window.location.href = mobileUrl.toString();
    }
    
    // Create desktop preference modal
    function createDesktopPreferenceModal() {
        const modal = document.createElement('div');
        modal.id = 'desktop-preference-modal';
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="
                    background: #1f2937;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.1);
                ">
                    <div style="font-size: 48px; margin-bottom: 16px;">💻</div>
                    <h2 style="color: white; margin: 0 0 16px 0; font-size: 24px; font-weight: 700;">Best Viewed on Larger Screens</h2>
                    <p style="color: #d1d5db; margin: 0 0 24px 0; line-height: 1.5;">
                        This portfolio features interactive animations and carousel navigation that work best on desktop or tablet devices with larger screens.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button onclick="goToMobileVersion()" style="
                            background: linear-gradient(135deg, #6366f1, #a855f7);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: transform 0.2s ease;
                        " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'">
                            View Mobile Version
                        </button>
                        <button onclick="stayOnDesktop()" style="
                            background: transparent;
                            color: #d1d5db;
                            border: 1px solid rgba(255,255,255,0.2);
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.05)'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='#d1d5db'">
                            Continue Here
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add global functions
        window.goToMobileVersion = function() {
            setUserPreference('mobile');
            redirectToMobile();
        };
        
        window.stayOnDesktop = function() {
            setUserPreference('desktop');
            modal.remove();
        };
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('desktop-preference-modal')) {
                window.stayOnDesktop();
            }
        });
    }
    
    // Main initialization function
    function init() {
        // Only run on desktop pages
        if (!isDesktopPage()) {
            return;
        }
        
        // Check if redirection is enabled
        if (!config.enableRedirection) {
            return;
        }
        
        const isMobile = isMobileDevice();
        const userPreference = getUserPreference();
        
        // If user has already made a choice this session, respect it
        if (userPreference === 'desktop') {
            return; // User wants to stay on desktop
        }
        
        if (userPreference === 'mobile' && isMobile) {
            redirectToMobile();
            return;
        }
        
        // For mobile devices, show appropriate UI
        if (isMobile) {
            // Show preference modal for first-time mobile visitors
            if (!userPreference) {
                // Wait for page to load before showing modal
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', createDesktopPreferenceModal);
                } else {
                    setTimeout(createDesktopPreferenceModal, 1000);
                }
            } else if (config.showMobileWarning && userPreference !== 'desktop-warned') {
                // Show warning banner for returning mobile users
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', createMobileWarning);
                } else {
                    setTimeout(createMobileWarning, 2000);
                }
            }
        }
    }
    
    // Run initialization
    init();
    
    // Handle page visibility change (for PWA)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && isMobileDevice() && isDesktopPage()) {
            const userPreference = getUserPreference();
            if (userPreference === 'mobile') {
                redirectToMobile();
            }
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (isMobileDevice() && isDesktopPage()) {
                const userPreference = getUserPreference();
                if (userPreference === 'mobile') {
                    redirectToMobile();
                }
            }
        }, 500);
    });
    
})();
