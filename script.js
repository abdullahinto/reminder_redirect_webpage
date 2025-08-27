// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page interactions
    initializeAnimations();
    initializeInteractions();
    
    // Add subtle background animations
    createFloatingElements();
    
    // Auto-hide any inappropriate content
    setTimeout(hideInappropriateContent, 100);
});

// Initialize animations on scroll and load
function initializeAnimations() {
    // Staggered animation for reminder items
    const reminderItems = document.querySelectorAll('.reminders li');
    reminderItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.5s ease-out ${0.8 + (index * 0.1)}s both`;
    });
    
    // Pulse animation for important elements
    const importantElements = document.querySelectorAll('.quran-verse, .reflection-box');
    importantElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.02)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Initialize interactive elements
function initializeInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Add hover effects to reminder items
    const reminderItems = document.querySelectorAll('.reminders li');
    reminderItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Create floating background elements
function createFloatingElements() {
    const container = document.querySelector('.background-pattern');
    const numberOfElements = 15;
    
    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random positioning and styling
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(0, 168, 107, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s infinite linear;
            pointer-events: none;
        `;
        
        container.appendChild(element);
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Ripple effect for buttons
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Redirect to good content
function redirectToGoodContent() {
    // Create options for Islamic content
    const islamicSites = [
        'https://quran.com',
        'https://sunnah.com',
        'https://islamqa.info',
        'https://bayyinah.com',
        'https://seekersguidance.org'
    ];
    
    // Show selection modal
    showContentSelection(islamicSites);
}

// Show content selection modal
function showContentSelection(sites) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3 style="color: var(--islamic-green); margin-bottom: 2rem; text-align: center;">Choose Beneficial Content</h3>
            <div style="display: grid; gap: 1rem;">
                ${sites.map(site => {
                    const siteName = site.split('//')[1].split('.')[0];
                    return `
                        <button class="btn-secondary" style="width: 100%; text-align: left; justify-content: flex-start;" 
                                onclick="window.open('${site}', '_blank'); this.closest('.modal').remove();">
                            📖 ${siteName.charAt(0).toUpperCase() + siteName.slice(1)}
                        </button>
                    `;
                }).join('')}
                <button class="btn-primary" style="width: 100%; margin-top: 1rem;" 
                        onclick="this.closest('.modal').remove();">
                    Stay on This Page
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Show Dua modal
function showDua() {
    const modal = document.getElementById('duaModal');
    modal.style.display = 'block';
    
    // Add animation
    const content = modal.querySelector('.modal-content');
    content.style.animation = 'scaleIn 0.3s ease-out';
}

// Close Dua modal
function closeDua() {
    const modal = document.getElementById('duaModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Hide any inappropriate content that might have loaded
function hideInappropriateContent() {
    // This function can be expanded to detect and hide inappropriate elements
    const body = document.body;
    body.style.filter = 'none'; // Ensure no filters are applied
    
    // Remove any potentially harmful scripts or content
    const scripts = document.querySelectorAll('script[src*="adult"], script[src*="porn"], script[src*="xxx"]');
    scripts.forEach(script => script.remove());
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'Q' to go to Quran.com
    if (e.key.toLowerCase() === 'q') {
        window.open('https://quran.com', '_blank');
    }
    
    // Press 'D' to show Dua
    if (e.key.toLowerCase() === 'd') {
        showDua();
    }
    
    // Press 'Escape' to close any open modal
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal');
        openModals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Add motivational quotes rotation
const motivationalQuotes = [
    {
        english: "The believer is not one who eats his fill while his neighbor goes hungry.",
        arabic: "ليس المؤمن الذي يشبع وجاره جائع",
        reference: "Hadith"
    },
    {
        english: "And whoever fears Allah - He will make for him a way out.",
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        reference: "Quran 65:2"
    },
    {
        english: "Verily, with hardship comes ease.",
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        reference: "Quran 94:6"
    }
];

// Rotate quotes every 30 seconds
let currentQuoteIndex = 0;
setInterval(() => {
    // This can be used to add dynamic quote rotation if needed
}, 30000);

// Add subtle interactions for better engagement
function addSubtleInteractions() {
    // Add gentle shake animation on quote hover
    const quoteElement = document.querySelector('.quran-verse');
    if (quoteElement) {
        quoteElement.addEventListener('mouseenter', () => {
            quoteElement.style.animation = 'gentleShake 0.5s ease-in-out';
        });
    }
    
    // Add CSS for gentle shake
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes gentleShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
    `;
    document.head.appendChild(shakeStyle);
}

// Initialize additional interactions
setTimeout(addSubtleInteractions, 1000);

// Performance optimization: Lazy load heavy animations
function optimizePerformance() {
    // Reduce animations on slower devices
    const isSlowDevice = navigator.hardwareConcurrency < 4 || navigator.connection?.effectiveType === 'slow-2g';
    
    if (isSlowDevice) {
        // Disable heavy animations
        const style = document.createElement('style');
        style.textContent = `
            * { animation-duration: 0.1s !important; }
            .floating-element { display: none !important; }
        `;
        document.head.appendChild(style);
    }
}

// Time-based greetings
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return { arabic: "صباح الخير", english: "Good Morning" };
    } else if (hour >= 12 && hour < 17) {
        return { arabic: "مساء الخير", english: "Good Afternoon" };
    } else if (hour >= 17 && hour < 21) {
        return { arabic: "مساء الخير", english: "Good Evening" };
    } else {
        return { arabic: "ليلة مباركة", english: "Blessed Night" };
    }
}

// Add time-based content
function addTimeBasedContent() {
    const greeting = getTimeBasedGreeting();
    const footerMessage = document.querySelector('.footer-message p');
    
    if (footerMessage) {
        footerMessage.innerHTML = `${greeting.arabic} - ${greeting.english}<br>May Allah strengthen you in every moment of choice`;
    }
}

// Islamic prayer times reminder (simplified)
function addPrayerTimeReminder() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Approximate prayer times (user should customize for their location)
    const prayerTimes = {
        fajr: { hour: 5, minute: 30, name: "Fajr", arabic: "الفجر" },
        dhuhr: { hour: 12, minute: 30, name: "Dhuhr", arabic: "الظهر" },
        asr: { hour: 15, minute: 30, name: "Asr", arabic: "العصر" },
        maghrib: { hour: 18, minute: 0, name: "Maghrib", arabic: "المغرب" },
        isha: { hour: 19, minute: 30, name: "Isha", arabic: "العشاء" }
    };
    
    // Check if it's near prayer time (within 30 minutes)
    for (const [key, prayer] of Object.entries(prayerTimes)) {
        const prayerMinutes = prayer.hour * 60 + prayer.minute;
        const currentMinutes = hour * 60 + minute;
        const timeDiff = prayerMinutes - currentMinutes;
        
        if (timeDiff > 0 && timeDiff <= 30) {
            showPrayerReminder(prayer, timeDiff);
            break;
        }
    }
}

// Show prayer reminder
function showPrayerReminder(prayer, minutesLeft) {
    const reminder = document.createElement('div');
    reminder.className = 'prayer-reminder';
    reminder.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--islamic-green), #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 168, 107, 0.3);
        z-index: 1001;
        font-size: 0.9rem;
        max-width: 250px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    reminder.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-size: 1.2rem;">🕌</span>
            <strong>${prayer.arabic}</strong>
        </div>
        <div style="font-size: 0.8rem; opacity: 0.9;">
            ${prayer.name} prayer in ${minutesLeft} minutes
        </div>
        <button onclick="this.parentElement.remove()" 
                style="position: absolute; top: 5px; right: 8px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">×</button>
    `;
    
    // Add slide animation
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideInRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(slideStyle);
    
    document.body.appendChild(reminder);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (reminder.parentElement) {
            reminder.remove();
        }
    }, 10000);
}

// Counter for visits (stored in memory only - no localStorage)
let visitCount = 1;
function trackVisits() {
    // Simple visit tracking without persistent storage
    const visitCounter = document.createElement('div');
    visitCounter.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        color: var(--text-secondary);
        border: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 1000;
    `;
    
    visitCounter.textContent = `Redirected ${visitCount} time${visitCount > 1 ? 's' : ''} today`;
    document.body.appendChild(visitCounter);
    
    visitCount++;
}

// Progressive enhancement for better user experience
function enhanceUserExperience() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add focus management for accessibility
    const firstFocusableElement = document.querySelector('.btn-primary');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
    
    // Add keyboard navigation hints
    const keyboardHints = document.createElement('div');
    keyboardHints.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 0.7rem;
        opacity: 0.7;
        z-index: 1000;
        max-width: 200px;
    `;
    
    keyboardHints.innerHTML = `
        <div><strong>Keyboard Shortcuts:</strong></div>
        <div>Q - Open Quran</div>
        <div>D - Show Dua</div>
        <div>ESC - Close modals</div>
    `;
    
    document.body.appendChild(keyboardHints);
    
    // Hide hints after 5 seconds
    setTimeout(() => {
        keyboardHints.style.opacity = '0';
        setTimeout(() => keyboardHints.remove(), 1000);
    }, 5000);
}

// Initialize all features when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure smooth loading
    setTimeout(() => {
        optimizePerformance();
        addTimeBasedContent();
        addPrayerTimeReminder();
        trackVisits();
        enhanceUserExperience();
    }, 500);
});

// Add inspirational message rotation
const inspirationalMessages = [
    "Your struggle against temptation is jihad of the soul",
    "Every moment of resistance builds your character",
    "Allah tests those He loves to make them stronger",
    "Paradise is surrounded by difficulties, but worth every sacrifice",
    "Your angels are recording your choices - make them proud"
];

function rotateInspirationalMessage() {
    const messageElement = document.querySelector('.main-message');
    if (messageElement && inspirationalMessages.length > 0) {
        const randomIndex = Math.floor(Math.random() * inspirationalMessages.length);
        const newMessage = inspirationalMessages[randomIndex];
        
        // Fade out, change text, fade in
        messageElement.style.transition = 'opacity 0.5s ease';
        messageElement.style.opacity = '0.7';
        
        setTimeout(() => {
            messageElement.innerHTML = newMessage + '<br><em style="font-size: 0.9em; color: var(--text-secondary);">— A reminder for your soul</em>';
            messageElement.style.opacity = '1';
        }, 500);
    }
}

// Rotate inspirational message every 2 minutes
setInterval(rotateInspirationalMessage, 120000);

// Add subtle sound notification (optional - user can enable)
function playSubtleNotification() {
    // Create a very brief, soft notification sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        // Silently fail if audio context is not available
        console.log('Audio notification not available');
    }
}

// Final initialization and error handling
window.addEventListener('error', function(e) {
    console.log('Error caught and handled:', e.error);
    // Ensure page still functions even if there are errors
});

// Ensure all functions are available globally
window.redirectToGoodContent = redirectToGoodContent;
window.showDua = showDua;
window.closeDua = closeDua;