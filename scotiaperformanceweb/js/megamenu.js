// Header and Mega Menu Functionality
function initializeMegaMenu() {
    console.log('Initializing mega menu');
    // Get DOM elements
    const header = document.getElementById('siteHeader');
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMenuOpen = false;

    if (!header) {
        console.error('Header element not found!');
        return;
    }

    console.log('Found header element:', header);

    // Handle scroll behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        // Update menu state
        mobileMenu.classList.toggle('active', isMenuOpen);
        toggle.classList.toggle('active', isMenuOpen);
        toggle.setAttribute('aria-expanded', isMenuOpen);

        // Lock/unlock body scroll
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Add click event listener to toggle button
    if (toggle) {
        toggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (isMenuOpen &&
            !mobileMenu.contains(event.target) &&
            !toggle.contains(event.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Mega Menu Functionality
    const servicesToggle = document.querySelector('.services-toggle');
    const megaMenu = document.getElementById('services-mega-menu');
    const servicesContainer = document.querySelector('.services-menu-container');
    let isClickOpen = false;

    if (servicesToggle && megaMenu && servicesContainer) {
        console.log('Found mega menu elements');
        function showMenu() {
            megaMenu.hidden = false;
            requestAnimationFrame(() => {
                megaMenu.dataset.visible = 'true';
            });
            servicesToggle.setAttribute('aria-expanded', 'true');
        }

        function hideMenu() {
            megaMenu.dataset.visible = 'false';
            megaMenu.addEventListener('transitionend', () => {
                if (!isClickOpen && !servicesContainer.matches(':hover')) {
                    megaMenu.hidden = true;
                }
            }, { once: true });
            servicesToggle.setAttribute('aria-expanded', 'false');
        }

        // Hover functionality
        servicesContainer.addEventListener('mouseenter', () => {
            if (!isClickOpen) showMenu();
        });

        servicesContainer.addEventListener('mouseleave', () => {
            if (!isClickOpen) hideMenu();
        });

        // Click functionality
        servicesToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isClickOpen = !isClickOpen;
            if (isClickOpen) {
                showMenu();
            } else {
                hideMenu();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && megaMenu.dataset.visible === 'true') {
                isClickOpen = false;
                hideMenu();
                servicesToggle.focus();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (isClickOpen &&
                !servicesContainer.contains(e.target) &&
                megaMenu.dataset.visible === 'true') {
                isClickOpen = false;
                hideMenu();
            }
        });
    } else {
        console.error('Mega menu elements not found:', { 
            servicesToggle: !!servicesToggle, 
            megaMenu: !!megaMenu, 
            servicesContainer: !!servicesContainer 
        });
    }
}

// Initialize mega menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to be loaded before initializing
    document.addEventListener('componentsLoaded', initializeMegaMenu);
    
    // Fallback in case the event doesn't fire
    setTimeout(() => {
        const header = document.getElementById('siteHeader');
        if (header && typeof initializeMegaMenu === 'function' && !document.megaMenuInitialized) {
            console.log('Initializing mega menu after timeout');
            document.megaMenuInitialized = true;
            initializeMegaMenu();
        }
    }, 1000);
}); 