<script module>
	// Module context to preload essential assets
	const preloadedImages = new Set();
	
	// Preload critical images
	if (typeof window !== 'undefined') {
		// Preload hero image with high priority
		const preloadHero = new Image();
		preloadHero.src = '/images/hero-bg.jpg';
		preloadHero.fetchPriority = 'high';
		preloadedImages.add('/images/hero-bg.jpg');
	}
</script>

<script lang="ts">
	import '../app.scss';
	import { onMount, tick } from 'svelte';
	
	// Props for Svelte 5 snippet pattern
	const { children } = $props<{
		children?: () => any;
	}>();
	
	// Simplified business hours service to avoid module import errors
	class BusinessHoursService {
		getHoursMessage() {
			const now = new Date();
			const hour = now.getHours();
			const day = now.getDay();
			
			// Simple business hours logic - open 8AM-6PM Monday-Friday
			if (day === 0 || day === 6) {
				return "Closed - Opens Monday at 8AM";
			} else if (hour < 8) {
				return "Opening today at 8AM";
			} else if (hour < 18) {
				return `Open today until 6PM`;
			} else {
				return "Closed - Opens tomorrow at 8AM";
			}
		}
	}
	
	// Create instance
	const businessHoursService = new BusinessHoursService();
	
	// Menu state - use $state for Svelte 5 compatibility but with 'let' for writability
	let isMobileMenuOpen = $state(false);
	let isServicesMenuOpen = $state(false);
	let isScrolled = $state(false);
	let hoursText = $state("Open today");
	let isLoaded = $state(false);
	let criticalContentLoaded = $state(false);
	let initialRenderComplete = $state(false);
	
	// Toggle mobile menu
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen) {
			document.body.classList.add('menu-open');
		} else {
			document.body.classList.remove('menu-open');
		}
	}
	
	// Toggle services megamenu
	function toggleServicesMenu() {
		isServicesMenuOpen = !isServicesMenuOpen;
	}
	
	// Memoized hours text - cache for 60 seconds
	let hoursLastUpdated = $state(0);
	function updateHoursText() {
		const now = Date.now();
		if (now - hoursLastUpdated > 60000) { // Only update every minute
			if (typeof window !== 'undefined') {
				hoursText = businessHoursService.getHoursMessage();
				hoursLastUpdated = now;
			}
		}
	}
	
	// Close menu when clicking outside - with debounce
	let clickOutsideTimeout = $state<number | null>(null);
	function handleClickOutside(event: MouseEvent) {
		// Use debounce to avoid excessive processing
		if (clickOutsideTimeout) {
			clearTimeout(clickOutsideTimeout);
		}
		
		clickOutsideTimeout = setTimeout(() => {
			const target = event.target as HTMLElement;
			
			// Close services menu if it's open and click is outside
			if (isServicesMenuOpen) {
				const megaMenu = document.getElementById('services-mega-menu');
				const toggleButton = document.querySelector('.services-toggle');
				
				if (megaMenu && toggleButton) {
					if (!megaMenu.contains(target) && !toggleButton.contains(target)) {
						isServicesMenuOpen = false;
					}
				}
			}
		}, 50) as unknown as number;
	}
	
	// Handle scroll events with throttling to improve performance
	let lastScrollY = $state(0);
	let scrollTicking = $state(false);
	function handleScroll() {
		lastScrollY = window.scrollY;
		
		if (!scrollTicking) {
			requestAnimationFrame(() => {
				isScrolled = lastScrollY > 50;
				scrollTicking = false;
			});
			
			scrollTicking = true;
		}
	}
	
	// Load non-critical resources lazily
	function lazyLoadResources() {
		// Use requestIdleCallback for non-critical resource loading
		const loadNonCritical = () => {
			// Load additional font weights
			const fontLink = document.createElement('link');
			fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;800&display=swap';
			fontLink.rel = 'stylesheet';
			document.head.appendChild(fontLink);
		};
		
		if (typeof window.requestIdleCallback === 'function') {
			window.requestIdleCallback(loadNonCritical, { timeout: 2000 });
		} else {
			setTimeout(loadNonCritical, 1000);
		}
	}
	
	// Effect to handle critical content loading
	$effect(() => {
		if (isLoaded && !criticalContentLoaded) {
			// Mark critical content as loaded
			criticalContentLoaded = true;
			
			// After first paint is complete, mark initial render done
			if (typeof window !== 'undefined') {
				window.requestAnimationFrame(() => {
					window.requestAnimationFrame(() => {
						initialRenderComplete = true;
					});
				});
			}
		}
	});
	
	// Lifecycle - use requestAnimationFrame for non-blocking updates
	onMount(() => {
		// Mark as client-side
		isLoaded = true;
		
		// Use requestAnimationFrame to defer non-critical initialization
		requestAnimationFrame(() => {
			// Set up document click listener with passive option for better performance
			document.addEventListener('click', handleClickOutside, { passive: true });
			
			// Set up scroll listener with passive option for better performance
			window.addEventListener('scroll', handleScroll, { passive: true });
			
			// Initial update of hours
			updateHoursText();
			
			// Set up interval to update hours - only check every minute
			const interval = setInterval(updateHoursText, 60000);
			
			// Apply initial scroll position check
			handleScroll();
			
			// After a slight delay, load non-critical resources
			setTimeout(() => {
				lazyLoadResources();
			}, 1000);
			
			// Cleanup function
			return () => {
				document.removeEventListener('click', handleClickOutside);
				window.removeEventListener('scroll', handleScroll);
				clearInterval(interval);
			};
		});
	});
</script>

<svelte:head>
	<style>
		/* Global styles for body when menu is open */
		body.menu-open {
			overflow: hidden;
		}
		
		/* Critical render path styles - high priority */
		.site-header {
			position: sticky;
			top: 0;
			z-index: 100;
			background-color: #1e3a8a;
			color: white;
			padding: 1rem;
			transition: padding 0.3s ease;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.logo {
			font-weight: bold;
			font-size: 1.25rem;
			color: white;
			text-decoration: none;
		}
		
		.site-content {
			min-height: 70vh;
		}
		
		@media (max-width: 768px) {
			.desktop-nav {
				display: none;
			}
		}
	</style>
</svelte:head>

<div class="app">
	<header class="site-header" class:scrolled={isScrolled} class:mobile-open={isMobileMenuOpen}>
		<a href="/" class="logo">Scotia Performance</a>
		
		<nav class="desktop-nav">
			<div class="services-menu-container">
				<button 
					class="nav-link services-toggle" 
					aria-expanded={isServicesMenuOpen} 
					aria-controls="services-mega-menu"
					aria-label={isServicesMenuOpen ? 'Close Services Menu' : 'Open Services Menu'}
					onclick={toggleServicesMenu}
				>
					Automotive Services
				</button>

				{#if isServicesMenuOpen}
				<div 
					id="services-mega-menu" 
					class="mega-menu open" 
					role="menu"
				>
					<!-- Menu Content -->
					<div class="mega-menu-content">
						<!-- Performance & Tuning -->
						<div class="menu-section">
							<h3><a href="/services/performance">Performance & Tuning</a></h3>
							<ul>
								<li><a href="/services/performance/ecu-tuning">ECU Tuning</a></li>
								<li><a href="/services/performance/dyno-tuning">Dyno Tuning</a></li>
								<li><a href="/services/performance/exhaust-systems">Exhaust Systems</a></li>
								<li><a href="/services/performance/forced-induction">Forced Induction</a></li>
								<li><a href="/services/performance/engine-building">Engine Building</a></li>
							</ul>
						</div>

						<!-- Auto Repair -->
						<div class="menu-section">
							<h3><a href="/services/repair">Auto Repair</a></h3>
							<ul>
								<li><a href="/services/repair/brake-repair">Brake Repair</a></li>
								<li><a href="/services/repair/engine-repair">Engine Repair</a></li>
								<li><a href="/services/repair/transmission-repair">Transmission Repair</a></li>
								<li><a href="/services/repair/ac-service">AC Service</a></li>
								<li><a href="/services/repair/electrical-repair">Electrical Repair</a></li>
							</ul>
						</div>

						<!-- Maintenance -->
						<div class="menu-section">
							<h3><a href="/services/maintenance">Maintenance</a></h3>
							<ul>
								<li><a href="/services/maintenance/oil-change">Oil Change Services</a></li>
								<li><a href="/services/maintenance/brake-maintenance">Brake Maintenance</a></li>
								<li><a href="/services/maintenance/scheduled-maintenance">Scheduled Maintenance</a></li>
								<li><a href="/services/maintenance/state-inspection">State Inspection</a></li>
								<li><a href="/services/maintenance/wheel-alignment">Wheel Alignment</a></li>
							</ul>
						</div>

						<!-- Tires & Wheels -->
						<div class="menu-section">
							<h3><a href="/services/tires-wheels">Tires & Wheels</a></h3>
							<ul>
								<li><a href="/services/tires-wheels/tire-sales">Tire Sales</a></li>
								<li><a href="/services/tires-wheels/wheel-alignment">Wheel Alignment</a></li>
								<li><a href="/services/tires-wheels/tire-rotation">Tire Rotation</a></li>
								<li><a href="/services/tires-wheels/wheel-balancing">Wheel Balancing</a></li>
								<li><a href="/services/tires-wheels/tpms-service">TPMS Service</a></li>
							</ul>
						</div>
					</div>

					<!-- Menu Footer -->
					<div class="mega-menu-footer">
						<div class="info-card">
							<div class="info-item">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"></circle>
									<polyline points="12 6 12 12 16 14"></polyline>
								</svg>
								<span class="text">{hoursText}</span>
							</div>
							<div class="info-item">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
									fill="none" stroke="currentColor" stroke-width="2">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
								<a href="https://www.google.com/maps/search/?api=1&query=42.8288669,-73.9672425" class="text address-link">24 Sacandaga Rd, Scotia</a>
							</div>
						</div>
					</div>
				</div>
				{/if}
			</div>

			<!-- Rest of nav items -->
			<a href="/about" class="nav-link">About</a>
			<a href="/gallery" class="nav-link">Gallery</a>
			<a href="tel:5183746111" class="header-cta">Call Us</a>
		</nav>
		
		<button
			class="mobile-menu-toggle"
			aria-expanded={isMobileMenuOpen}
			aria-controls="mobile-menu"
			aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
			onclick={toggleMobileMenu}
		>
			<span class="sr-only">Menu</span>
			<div class="hamburger">
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</div>
		</button>
		
		<!-- Mobile menu - only render content when open for better performance -->
		<nav id="mobile-menu" class="mobile-menu" class:active={isMobileMenuOpen}>
			{#if isMobileMenuOpen}
			<div class="mobile-menu-content">
				<div class="menu-sections-grid">
					<!-- Menu sections here -->
					<div class="menu-section">
						<h3><a href="/services/performance">Performance & Tuning</a></h3>
						<ul>
							<li><a href="/services/engine-tuning">ECU Tuning</a></li>
							<li><a href="/services/dyno-tuning">Dyno Tuning</a></li>
							<li><a href="/services/exhaust">Exhaust Systems</a></li>
							<li><a href="/services/performance" class="see-all">See All Performance Services</a></li>
						</ul>
					</div>

					<div class="menu-section">
						<h3><a href="/services/repair">Auto Repair</a></h3>
						<ul>
							<li><a href="/services/brake-repair">Brake Repair</a></li>
							<li><a href="/services/engine-repair">Engine Repair</a></li>
							<li><a href="/services/transmission">Transmission Repair</a></li>
							<li><a href="/services/repair" class="see-all">See All Repair Services</a></li>
						</ul>
					</div>

					<div class="menu-section">
						<h3><a href="/services/maintenance">Maintenance</a></h3>
						<ul>
							<li><a href="/services/oil-change">Oil Change Services</a></li>
							<li><a href="/services/brake-maintenance">Brake Maintenance</a></li>
							<li><a href="/services/scheduled-maintenance">Scheduled Maintenance</a></li>
							<li><a href="/services/maintenance" class="see-all">See All Maintenance Services</a></li>
						</ul>
					</div>

					<div class="menu-section">
						<h3><a href="/services">Quick Links</a></h3>
						<ul>
							<li><a href="/services/tires-wheels">Tires & Wheels</a></li>
							<li><a href="/about">About</a></li>
							<li><a href="/gallery">Gallery</a></li>
							<li><a href="/services" class="see-all">View All Services</a></li>
						</ul>
					</div>
				</div>

				<!-- Bottom Navigation -->
				<div class="bottom-nav">
					<span id="mobile-menu-hours-text">{hoursText}</span>
					<a href="https://www.google.com/maps/search/?api=1&query=42.8288669,-73.9672425" target="_blank" rel="noopener noreferrer">24 Sacandaga Rd, Scotia</a>
				</div>
			</div>
			{/if}
		</nav>
	</header>
	
	<!-- Critical CTA for conversions -->
	<div class="cta-bottom">
		<a href="tel:5183746111" class="cta-button">
			Schedule Service: (518) 374-6111
		</a>
	</div>
	
	<main class="site-content">
		{#if children}
			{@render children()}
		{/if}
	</main>
	
	<footer class="site-footer">
		<div class="container">
			{#if initialRenderComplete}
				<div class="footer-info">
					<p>© {new Date().getFullYear()} Scotia Performance Auto - All Rights Reserved.</p>
					<p>24 Sacandaga Rd, Scotia, NY 12302 | <a href="tel:5183746111">(518) 374-6111</a></p>
				</div>
			{:else}
				<div class="footer-info">
					<p>© Scotia Performance Auto - All Rights Reserved.</p>
				</div>
			{/if}
		</div>
	</footer>
</div>

<style>
	/* Keep any component-specific styling here */
	/* Critical styles for initial render, non-critical styles should be in app.scss */
	
	/* Micro-optimization for initial render */
	.mobile-menu-toggle {
		display: none;
	}
	
	@media (max-width: 768px) {
		.mobile-menu-toggle {
			display: block;
		}
		
		.desktop-nav {
			display: none;
		}
	}
	
	/* Optimize CTA button - critical for conversions */
	.cta-bottom {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 90;
		contain: layout style; /* CSS containment for better performance */
	}
	
	.cta-bottom .cta-button {
		background-color: #7f1d1d;
		color: white;
		padding: 10px 20px;
		border-radius: 50px;
		font-weight: bold;
		text-decoration: none;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: inline-block;
		white-space: nowrap;
	}
	
	/* Better mobile styling */
	@media (max-width: 600px) {
		.cta-bottom {
			left: 0;
			right: 0;
			bottom: 0;
			text-align: center;
			padding: 10px;
			background-color: white;
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		}
		
		.cta-bottom .cta-button {
			display: block;
			border-radius: 8px;
			width: 100%;
		}
	}
	
	/* Add content-visibility to non-critical elements */
	@supports (content-visibility: auto) {
		.site-footer {
			content-visibility: auto;
			/* Add fallback height */
			min-height: 100px;
			height: 100px;
			contain-intrinsic-size: 100% 100px;
		}
	}
</style>
