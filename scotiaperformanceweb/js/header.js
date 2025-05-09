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