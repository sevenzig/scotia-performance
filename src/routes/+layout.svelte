<script module lang="ts">
	// Module context to preload essential assets
	const preloadedImages = new Set<string>();
	
	// Preload critical images
	if (typeof window !== 'undefined') {
		// Preload hero image with high priority
		const preloadHero = new Image();
		preloadHero.src = '/images/hero-bg.jpg';
		(preloadHero as any).fetchPriority = 'high';
		preloadedImages.add('/images/hero-bg.jpg');
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
	
	// Simple scroll behavior control with debug logging
	onNavigate((navigation) => {
		console.log('🚀 onNavigate triggered:', {
			from: navigation.from?.url?.pathname,
			to: navigation.to?.url?.pathname,
			type: navigation.type,
			currentScrollY: typeof window !== 'undefined' ? window.scrollY : 'N/A',
			hash: navigation.to?.url?.hash || 'none'
		});
		
		// Reset scroll to top on navigation
		if (typeof window !== 'undefined') {
			console.log('📍 Before scroll - scrollY:', window.scrollY);
			window.scrollTo(0, 0);
			console.log('📍 After scroll - scrollY:', window.scrollY);
			
			// Check if scroll actually took effect after a brief delay
			setTimeout(() => {
				console.log('📍 ScrollY after 50ms:', window.scrollY);
			}, 50);
			
			setTimeout(() => {
				console.log('📍 ScrollY after 200ms:', window.scrollY);
			}, 200);
		}
	});
	
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
	
	// Lifecycle - use requestAnimationFrame for non-blocking updates
	onMount(() => {
		console.log('🔄 Layout onMount triggered');
		
		// Mark as client-side
		isLoaded = true;
		
		// Disable browser's automatic scroll restoration
		if ('scrollRestoration' in history) {
			console.log('📜 Setting scrollRestoration to manual');
			history.scrollRestoration = 'manual';
		} else {
			console.log('⚠️ scrollRestoration not supported');
		}
		
		console.log('📍 Initial scroll position:', window.scrollY);
		
		// Use a single requestAnimationFrame to mark initial render complete
		// This prevents rapid state changes that cause DOM conflicts
		requestAnimationFrame(() => {
			initialRenderComplete = true;
			console.log('✅ Initial render complete');
			
			// Add scroll event listener for debugging
			let scrollTimeout: ReturnType<typeof setTimeout>;
			
			// Multiple ways to detect scroll
			console.log('🔍 Setting up scroll detection...');
			console.log('📏 Document dimensions:', {
				documentHeight: document.documentElement.scrollHeight,
				windowHeight: window.innerHeight,
				bodyHeight: document.body.scrollHeight,
				canScroll: document.documentElement.scrollHeight > window.innerHeight
			});
			
			// Check CSS that might prevent scrolling
			const bodyStyles = window.getComputedStyle(document.body);
			const htmlStyles = window.getComputedStyle(document.documentElement);
			console.log('🎨 Body CSS that affects scrolling:', {
				bodyOverflow: bodyStyles.overflow,
				bodyOverflowY: bodyStyles.overflowY,
				bodyHeight: bodyStyles.height,
				htmlOverflow: htmlStyles.overflow,
				htmlOverflowY: htmlStyles.overflowY,
				htmlHeight: htmlStyles.height
			});
			
			window.addEventListener('scroll', () => {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => {
					console.log('📍 Window scroll event - position:', window.scrollY);
				}, 100);
			});
			
			document.addEventListener('scroll', () => {
				console.log('📍 Document scroll event - position:', window.scrollY);
			});
			
			// Test scroll capability
			setTimeout(() => {
				console.log('🧪 Testing scroll capability...');
				const beforeTest = window.scrollY;
				window.scrollTo(0, 100);
				setTimeout(() => {
					const afterTest = window.scrollY;
					console.log('🧪 Scroll test result:', { beforeTest, afterTest, scrollWorking: afterTest !== beforeTest });
					// Reset
					window.scrollTo(0, beforeTest);
				}, 50);
			}, 2000);
			
			// After a delay, load non-critical resources
			setTimeout(() => {
				lazyLoadResources();
			}, 1000);
		});
	});
</script>

<div class="app">
	<Header />
	
	<main class="site-content">
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
	}
	
	:global(body) {
		height: auto;
		min-height: 100vh;
		overflow-y: auto;
	}
	
	/* Basic layout styling */
	.site-content {
		min-height: 70vh;
		padding-top: 80px; /* Match the header height */
	}
</style>
