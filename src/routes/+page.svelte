<script lang="ts">
  import { onMount } from 'svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { getImageAttributes } from '$lib/utils/clientImageUtils';
  import Hero from '$lib/components/Hero.svelte';
  import ServicesOffered from '$lib/components/ServicesOffered.svelte';
  import DiagnosticHelp from '$lib/components/DiagnosticHelp.svelte';
  import PerformanceServices from '$lib/components/PerformanceServices.svelte';
  import HomepageManufacturers from '$lib/components/HomepageManufacturers.svelte';
  import Reviews from '$lib/components/Reviews.svelte';
  import RotatingTagline from '$lib/components/RotatingTagline.svelte';
  
  // Elements visibility for lazy loading
  let initialRenderComplete = $state(false);
  
  // Get hero background image attributes for optimized loading
  const heroImageAttrs = { 
    sources: [], 
    src: '/images/hero-bg.jpg', 
    sizes: '',
    thumb: '/images/optimized/hero-bg-thumb.webp'
  };
  
  // Initialize after component mounts
  onMount(() => {
    // Mark the initial render as complete after a single frame
    // This prevents rapid state changes that cause DOM conflicts
    requestAnimationFrame(() => {
      initialRenderComplete = true;
    });
  });
</script>

<svelte:head>
  <title>Scotia Performance | Auto Repair Scotia, NY</title>
  <meta name="description" content="Scotia Performance - Professional auto repair services in Scotia, NY. ASE certified mechanics specializing in brake service, engine repair, transmission service, and more.">
  <link rel="preload" fetchpriority="high" href="/images/garage.jpg" as="image" type="image/jpeg">
</svelte:head>

<!-- Hero Section - Using the Hero component -->
<Hero />

<!-- Rotating Tagline Section -->
<RotatingTagline />

<!-- Performance Services Section - Using the PerformanceServices component -->
<PerformanceServices />

<!-- Services Section - Using the ServicesOffered component -->
<ServicesOffered />

<!-- Manufacturers Section - Using the HomepageManufacturers component -->
<HomepageManufacturers />

<!-- Diagnostic Help Section - Using the DiagnosticHelp component -->
<DiagnosticHelp />

<!-- Reviews Section - Using the Reviews component -->
<Reviews />

<style>
  /* Page-level styles can be added here if needed */
</style>
