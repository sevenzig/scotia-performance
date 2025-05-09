document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing functionality');

    // Load schema directly as a string
    try {
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": "Scotia Performance Auto",
            "url": "https://scotiaperformance.com",
            "logo": "https://scotiaperformance.com/img/logo.png",
            "image": "https://scotiaperformance.com/img/shop-photo.jpg",
            "description": "Professional auto repair services in Scotia, NY. ASE certified mechanics specializing in brake service, engine repair, transmission service, and more.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "24 Sacandaga Rd",
                "addressLocality": "Scotia",
                "addressRegion": "NY",
                "postalCode": "12302",
                "addressCountry": "US"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "42.8288669",
                "longitude": "-73.9672425"
            },
            "telephone": "+15183746111",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "17:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Saturday", "Sunday"],
                    "opens": "00:00",
                    "closes": "00:00"
                }
            ],
            "priceRange": "$$"
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        document.head.appendChild(script);
        console.log('Schema loaded successfully');
    } catch (error) {
        console.error('Error loading schema:', error);
    }

    // Initialize features
    initializeTaglines();
    initializeBusinessHours();
    initializeMapLinks();
    initializeAccessibility();
    initializeHeader();
});

// Taglines initialization
function initializeTaglines() {
    const taglines = [
        "ASE Certified Master Technicians",
        "Professional Diagnostics & Repair",
        "All Makes & Models",
        "Local Family-Owned Since 1995"
    ];

    let currentTagline = 0;
    const taglineElement = document.getElementById('rotating-tagline');
    
    if (taglineElement) {
        console.log('Found tagline element, starting rotation');
        taglineElement.textContent = taglines[currentTagline]; // Set initial tagline
        setInterval(() => {
            currentTagline = (currentTagline + 1) % taglines.length;
            taglineElement.textContent = taglines[currentTagline];
        }, 3000);
    }
}

// Business hours initialization
function initializeBusinessHours() {
    function getBusinessHours() {
        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        console.log('Getting hours for day:', day, 'hour:', hours);
        
        if (day >= 1 && day <= 5) {
            if (hours >= 8 && hours < 17) {
                return "Open today until 5PM";
            } else if (hours < 8) {
                return "Opening today at 8AM";
            } else {
                if (day === 5) {
                    return "Closed - Opens Monday at 8AM";
                }
                return "Closed - Opens tomorrow at 8AM";
            }
        }
        return "Closed - Opens Monday at 8AM";
    }

    // Update Hours Display
    function updateHoursDisplay() {
        const hoursElement = document.getElementById('hours-text');
        if (hoursElement) {
            console.log('Updating hours display');
            hoursElement.textContent = getBusinessHours();
        } else {
            console.error('Hours element not found');
        }
    }

    // Initialize hours and set interval
    updateHoursDisplay();
    setInterval(updateHoursDisplay, 60000);
}

// Maps functionality
function initializeMapLinks() {
    const addressLinks = document.querySelectorAll('.info-item a');
    addressLinks.forEach(link => {
        if (link.textContent.includes('Sacandaga')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const address = '24 Sacandaga Rd Scotia NY 12302';
                const lat = '42.8288669';
                const lng = '-73.9672425';
                
                const userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.includes('android')) {
                    window.location.href = `google.navigation:q=${lat},${lng}`;
                } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
                    window.location.href = `maps://maps.apple.com/?q=${encodeURIComponent(address)}&sll=${lat},${lng}`;
                } else {
                    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
                }
            });
        }
    });
}

// Accessibility initialization
function initializeAccessibility() {
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent.includes('518')) {
            link.setAttribute('aria-label', 'Call our shop');
        }
    });
}

// Header scroll effect
function initializeHeader() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.mobile-header');
        if (header) {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}