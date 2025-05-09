// Initialize rotating taglines
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