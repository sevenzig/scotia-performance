<script lang="ts">
  import { onMount } from 'svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { getImageAttributes } from '$lib/utils/clientImageUtils';
  import Hero from '$lib/components/Hero.svelte';
  import ServicesOffered from '$lib/components/ServicesOffered.svelte';
  import DiagnosticHelp from '$lib/components/DiagnosticHelp.svelte';
  import PerformanceServices from '$lib/components/PerformanceServices.svelte';
  import Reviews from '$lib/components/Reviews.svelte';
  
  // Rotating taglines for the homepage
  const taglines = [
    "Your premier automotive service center in Scotia, NY",
    "Quality workmanship from ASE certified technicians",
    "Specializing in both performance and everyday repairs",
    "Serving Scotia and the Greater Capital Region since 2005",
    "Trusted by local auto enthusiasts and everyday drivers alike"
  ];
  
  // Get a random tagline
  let randomTagline = $state(taglines[Math.floor(Math.random() * taglines.length)]);
  let isClient = $state(false);
  
  // Elements visibility for lazy loading
  let initialRenderComplete = $state(false);
  
  // Get hero background image attributes for optimized loading
  const heroImageAttrs = { 
    sources: [], 
    src: '/images/hero-bg.jpg', 
    sizes: '',
    thumb: '/images/optimized/hero-bg-thumb.webp'
  };
  
  // Update tagline periodically (client-side only) with requestAnimationFrame for better performance
  let taglineRotationScheduled = $state(false);
  
  function rotateTagline() {
    if (!document.hidden && isClient) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * taglines.length);
      } while (taglines[newIndex] === randomTagline);
      
      randomTagline = taglines[newIndex];
    }
    
    if (isClient) {
      // Use setTimeout with requestAnimationFrame for smoother visual updates
      setTimeout(() => {
        taglineRotationScheduled = false;
        scheduleTaglineRotation();
      }, 5000);
    }
  }
  
  function scheduleTaglineRotation() {
    if (!taglineRotationScheduled && isClient) {
      taglineRotationScheduled = true;
      requestAnimationFrame(rotateTagline);
    }
  }
  
  // Initialize after component mounts
  onMount(() => {
    isClient = true;
    
    // Mark the initial render as complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initialRenderComplete = true;
      });
    });
    
    // Start tagline rotation
    scheduleTaglineRotation();
    
    return () => {
      // Cleanup
      taglineRotationScheduled = false;
    };
  });
</script>

<svelte:head>
  <title>Scotia Performance | Auto Repair Scotia, NY</title>
  <meta name="description" content="Scotia Performance - Professional auto repair services in Scotia, NY. ASE certified mechanics specializing in brake service, engine repair, transmission service, and more.">
  <link rel="preload" fetchpriority="high" href="/images/garage.jpg" as="image" type="image/jpeg">
  
  <!-- Critical CSS for non-hero components that appear above the fold -->
  <style>
    .tagline {
      text-align: center;
      padding: 1rem;
      background-color: #f3f4f6;
      font-style: italic;
      font-weight: 500;
    }
  </style>
</svelte:head>

<!-- Hero Section - Using the Hero component -->
<Hero />

<div class="tagline">{randomTagline}</div>

<!-- Performance Services Section - Using the PerformanceServices component -->
<PerformanceServices />

<!-- Services Section - Using the ServicesOffered component -->
<ServicesOffered />

<!-- Diagnostic Help Section - Using the DiagnosticHelp component -->
<DiagnosticHelp />

<!-- Reviews Section - Using the Reviews component -->
<Reviews />

<style>
  /* Main Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Loading Spinner */
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #1e3a8a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  /* Apply content-visibility to improve rendering performance */
  @supports (content-visibility: auto) {
    .reviews-grid:not(.visible) {
      content-visibility: auto;
      contain-intrinsic-size: auto 400px;
    }
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .loading-spinner {
      animation: none;
      border-left-color: #1e3a8a;
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .reviews-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
