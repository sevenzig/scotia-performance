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
	import { onMount } from 'svelte';
	import Header from '$lib/layouts/Header.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
	
	// Props for Svelte 5 snippet pattern
	const { children } = $props<{
		children: import('svelte').Snippet;
	}>();
	
	let isLoaded = $state(false);
	let initialRenderComplete = $state(false);
	
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
		// Mark as client-side
		isLoaded = true;
		
		// Use a single requestAnimationFrame to mark initial render complete
		// This prevents rapid state changes that cause DOM conflicts
		requestAnimationFrame(() => {
			initialRenderComplete = true;
			
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
		{#if children}
			{@render children()}
		{/if}
	</main>
	
	<Footer {initialRenderComplete} />
</div>

<style>
	/* Keep any component-specific styling here */
	/* Critical styles for initial render, non-critical styles should be in app.scss */
	
	/* Basic layout styling */
	.site-content {
		min-height: 70vh;
		padding-top: 80px; /* Match the header height */
	}
</style>
