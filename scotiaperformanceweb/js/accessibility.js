// Accessibility initialization
function initializeAccessibility() {
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent.includes('518')) {
            link.setAttribute('aria-label', 'Call our shop');
        }
    });
} 