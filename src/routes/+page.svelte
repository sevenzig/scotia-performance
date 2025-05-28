<script lang="ts">
  import { onMount } from 'svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { getImageAttributes } from '$lib/utils/clientImageUtils';
  import Hero from '$lib/components/Hero.svelte';
  import ServicesOffered from '$lib/components/ServicesOffered.svelte';
  
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
  let reviewsVisible = $state(false);
  let diagnosticVisible = $state(false);
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
  
  // Update visibility with IntersectionObserver
  function setupVisibilityObservers() {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        rootMargin: '200px',
        threshold: 0.1
      };
      
      // Add proper type annotations for the intersection handler
      const handleIntersection = (
        entries: IntersectionObserverEntry[], 
        observer: IntersectionObserver, 
        targetState: 'reviews' | 'diagnostic'
      ) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (targetState === 'reviews') reviewsVisible = true;
            if (targetState === 'diagnostic') diagnosticVisible = true;
            observer.disconnect();
          }
        });
      };
      
      const reviewsObserver = new IntersectionObserver(
        (entries) => handleIntersection(entries, reviewsObserver, 'reviews'),
        observerOptions
      );
      
      const diagnosticObserver = new IntersectionObserver(
        (entries) => handleIntersection(entries, diagnosticObserver, 'diagnostic'),
        observerOptions
      );
      
      // Observe sections
      const reviewsSection = document.getElementById('reviews');
      const diagnosticSection = document.getElementById('help');
      
      if (reviewsSection) reviewsObserver.observe(reviewsSection);
      if (diagnosticSection) diagnosticObserver.observe(diagnosticSection);
    } else {
      // Fallback for browsers without IntersectionObserver support
      reviewsVisible = true;
      diagnosticVisible = true;
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
    
    // Set up observers for lazy loading sections
    setupVisibilityObservers();
    
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

<!-- Services Section - Using the ServicesOffered component -->
<ServicesOffered />

<!-- Diagnostic Help Section - Deferred Content -->
<section class="help-section" id="help">
  <div class="container">
    <h2>Helpful Diagnostic Information</h2>
    {#if diagnosticVisible || !isClient}
      <div class="diagnostic-grid">
        <div class="diagnostic-card">
          <h3>Vehicle Details</h3>
          <ul>
            <li><strong>Essential:</strong> Make, model, and year</li>
            <li><strong>Optional:</strong> Current mileage reading</li>
          </ul>
        </div>
        <div class="diagnostic-card">
          <h3>Issue Description</h3>
          <ul>
            <li>Detailed description of symptoms</li>
            <li>Timeline of when issues began</li>
            <li>Frequency of occurrence</li>
            <li>Warning indicators (lights/sounds)</li>
          </ul>
        </div>
        <div class="diagnostic-card">
          <h3>Operating Conditions</h3>
          <ul>
            <li>Engine temperature state</li>
            <li>Driving environment (city/highway)</li>
            <li>Weather conditions during issues</li>
            <li>Vehicle speed during occurrence</li>
          </ul>
        </div>
        <div class="diagnostic-card">
          <h3>Maintenance Background</h3>
          <ul>
            <li>Recent repair history</li>
            <li>Regular maintenance records</li>
            <li>Previous related issues</li>
          </ul>
        </div>
      </div>
    {:else}
      <div class="placeholder-content" style="height: 300px; display: flex; justify-content: center; align-items: center;" aria-hidden="true">
        <div class="loading-spinner"></div>
      </div>
    {/if}
  </div>
</section>

<!-- Reviews Section - Deferred Content -->
<section class="reviews" id="reviews">
  <div class="container">
    <h2>What Our Customers Say</h2>
    {#if reviewsVisible || !isClient}
      <div class="reviews-grid">
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p>"Professional respectable operation run at peak productivity. Amazingly service. Honest. A garage with morals to not rip you off."</p>
          <div class="reviewer">- Oak Owl</div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p>"Great place, they're fast, reliable, honest, and professional. They never try to sell you on things you don't need and they always do quality work."</p>
          <div class="reviewer">- Joe H.</div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <p>"After having recently moved to the area and needing to find a shop for my cars, I am so happy to have found Scotia Performance."</p>
          <div class="reviewer">- Mark R.</div>
        </div>
      </div>
    {:else}
      <div class="placeholder-content" style="height: 300px; display: flex; justify-content: center; align-items: center;" aria-hidden="true">
        <div class="loading-spinner"></div>
      </div>
    {/if}
  </div>
</section>

<style>
  /* Main Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Tagline */
  .tagline {
    text-align: center;
    padding: 1rem;
    background-color: #f3f4f6;
    font-style: italic;
    font-weight: 500;
  }
  
  /* Diagnostic Help Section */
  .help-section {
    background-color: #f9fafb;
    padding: 3rem 0;
  }
  
  .help-section h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .diagnostic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .diagnostic-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .diagnostic-card h3 {
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  .diagnostic-card ul {
    padding-left: 1.5rem;
  }
  
  .diagnostic-card li {
    margin-bottom: 0.5rem;
  }
  
  /* Reviews Section */
  .reviews {
    padding: 3rem 0;
  }
  
  .reviews h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .review-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .stars {
    color: #f59e0b;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .reviewer {
    margin-top: 1rem;
    font-style: italic;
    text-align: right;
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
    .diagnostic-grid:not(.visible),
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
    .diagnostic-grid,
    .reviews-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
