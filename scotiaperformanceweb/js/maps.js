// Initialize map links
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