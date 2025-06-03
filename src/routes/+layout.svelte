<script module lang="ts">
	// Module context to preload essential assets
	const preloadedImages = new Set<string>();
	
	// Preload critical images with priority hints
	if (typeof window !== 'undefined') {
		// Preload hero image with high priority
		const preloadHero = new Image();
		preloadHero.src = '/images/hero-bg.jpg';
		(preloadHero as any).fetchPriority = 'high';
		preloadedImages.add('/images/hero-bg.jpg');
		
		// Preload garage image with medium priority
		const preloadGarage = new Image();
		preloadGarage.src = '/images/garage.jpg';
		preloadGarage.loading = 'lazy';
		preloadedImages.add('/images/garage.jpg');
	}
</script>

<script lang="ts">
	import '../app.scss';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/layouts/Header.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
	
	// Props for Svelte 5 snippet pattern - use interface for better type safety
	interface Props {
		children: import('svelte').Snippet;
	}
	
	let { children }: Props = $props();
	
	let isLoaded = $state(false);
	let initialRenderComplete = $state(false);
	let isNavigating = $state(false);
	
	// Performance monitoring
	let performanceMetrics = $state({
		navigationStart: 0,
		domContentLoaded: 0,
		loadComplete: 0
	});
	
	// Smart scroll behavior control - preserve anchor navigation
	onNavigate((navigation) => {
		isNavigating = true;
		
		// Only reset scroll to top if this is NOT an anchor link navigation
		const isAnchorNavigation = navigation.to?.url?.hash && navigation.to.url.hash.length > 1;
		
		if (typeof window !== 'undefined' && !isAnchorNavigation) {
			// Use requestAnimationFrame for smooth scrolling
			requestAnimationFrame(() => {
				window.scrollTo(0, 0);
				isNavigating = false;
			});
		} else if (isAnchorNavigation) {
			// Let the individual page components handle anchor scrolling
			setTimeout(() => {
				isNavigating = false;
			}, 100);
		}
	});
	
	// Load non-critical resources lazily with adaptive loading
	function lazyLoadResources() {
		// Check connection speed for adaptive loading
		const connection = (navigator as any).connection;
		const isSlowConnection = connection && (
			connection.effectiveType === '2g' || 
			connection.effectiveType === 'slow-2g' ||
			connection.saveData
		);
		
		// Load based on connection quality
		const loadNonCritical = () => {
			// Only load additional fonts on fast connections
			if (!isSlowConnection) {
				const fontLink = document.createElement('link');
				fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap';
				fontLink.rel = 'stylesheet';
				fontLink.media = 'print';
				fontLink.onload = function() {
					(this as HTMLLinkElement).media = 'all';
				};
				document.head.appendChild(fontLink);
			}
		};
		
		// Use different scheduling based on browser support
		if (typeof window.requestIdleCallback === 'function') {
			window.requestIdleCallback(loadNonCritical, { timeout: isSlowConnection ? 5000 : 2000 });
		} else {
			setTimeout(loadNonCritical, isSlowConnection ? 2000 : 1000);
		}
	}
	
	// Performance monitoring
	function trackPerformance() {
		if (typeof window === 'undefined') return;
		
		performanceMetrics.navigationStart = performance.timeOrigin;
		
		// Track DOM Content Loaded
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => {
				performanceMetrics.domContentLoaded = performance.now();
			});
		} else {
			performanceMetrics.domContentLoaded = performance.now();
		}
		
		// Track load complete
		if (document.readyState === 'complete') {
			performanceMetrics.loadComplete = performance.now();
		} else {
			window.addEventListener('load', () => {
				performanceMetrics.loadComplete = performance.now();
			});
		}
	}
	
	// Lifecycle - use requestAnimationFrame for non-blocking updates
	onMount(() => {
		// Mark as client-side
		isLoaded = true;
		
		// Start performance tracking
		trackPerformance();
		
		// Disable browser's automatic scroll restoration
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		
		// Use a single requestAnimationFrame to mark initial render complete
		requestAnimationFrame(() => {
			initialRenderComplete = true;
			
			// Schedule non-critical resource loading
			setTimeout(() => {
				lazyLoadResources();
			}, 1000);
		});
	});
</script>

<div class="app">
	<Header />
	
	<main class="site-content" class:navigating={isNavigating}>
		{@render children()}
	</main>
	
	<Footer {initialRenderComplete} />
</div>

<style>
	/* Keep any component-specific styling here */
	/* Critical styles for initial render, non-critical styles should be in app.scss */
	
	/* Ensure proper scrolling capability */
	:global(html) {
		height: auto;
		overflow-y: auto;
		/* Content visibility support */
		contain: layout style paint;
	}
	
	:global(body) {
		height: auto;
		min-height: 100vh;
		overflow-y: auto;
		/* Optimize rendering */
		contain: layout style;
	}
	
	/* App wrapper optimization */
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		/* Improve rendering performance */
		contain: layout;
	}
	
	/* Basic layout styling with performance optimizations */
	.site-content {
		flex: 1;
		min-height: 70vh;
		padding-top: 80px; /* Match the header height */
		/* Content visibility for better performance */
		contain: layout style;
	}
	
	/* Navigation transition */
	.site-content.navigating {
		opacity: 0.95;
		transition: opacity 0.15s ease-out;
	}
	
	/* Content visibility optimizations for lazy sections */
	:global(.lazy-section) {
		content-visibility: auto;
		contain-intrinsic-size: 0 500px;
		/* Add a subtle loading hint */
		background: linear-gradient(135deg, 
			rgba(248, 250, 252, 0.8) 0%, 
			rgba(241, 245, 249, 0.6) 100%);
	}
	
	/* Optimize below-the-fold content */
	:global(.below-fold) {
		content-visibility: auto;
		contain-intrinsic-size: 0 400px;
	}
	
	/* Optimize heavy components */
	:global(.heavy-component) {
		content-visibility: auto;
		contain-intrinsic-size: 0 300px;
		/* Layer promotion for better compositing */
		will-change: transform;
	}
	
	/* Performance optimization for slow connections */
	:global(.slow-connection) .site-content {
		/* Reduce visual complexity on slow connections */
		animation: none !important;
	}
	
	:global(.slow-connection) :global(.animation-heavy) {
		animation: none !important;
		transition: none !important;
	}
</style>
