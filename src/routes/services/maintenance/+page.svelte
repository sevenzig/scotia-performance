<script lang="ts">
  import HeroBanner from '$lib/components/HeroBanner.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import CallToAction from '$lib/components/CallToAction.svelte';
  import Button from '$lib/components/Button.svelte';
  import { companyInfo } from '$lib/data/companyInfo';
  import { maintenanceServices, featuredMaintenanceServices } from '$lib/data/maintenanceServices';
  
  // State management with Svelte 5 runes
  let openAccordionItems = $state(new Set<string>());
  
  // Derived values for better performance
  const serviceIds = $derived(maintenanceServices.map(service => service.id));
  const isValidService = $derived((hash: string) => serviceIds.includes(hash));

  // Accordion interaction handlers
  function toggleAccordion(serviceId: string) {
    if (openAccordionItems.has(serviceId)) {
      openAccordionItems.delete(serviceId);
    } else {
      openAccordionItems.add(serviceId);
    }
    // Trigger reactivity
    openAccordionItems = new Set(openAccordionItems);
  }

  function handleKeyPress(event: KeyboardEvent, serviceId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion(serviceId);
    }
  }

  // Contact via phone for quote requests
  function requestQuote() {
    window.location.href = companyInfo.phone.link;
  }

  // Handle accordion expansion from URL hash
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove # symbol
    if (hash && isValidService(hash)) {
      // Expand the accordion item that matches the hash
      openAccordionItems.add(hash);
      openAccordionItems = new Set(openAccordionItems);
      
      // Wait for Svelte's reactivity to update the DOM
      setTimeout(() => {
        // Check if accordion is actually expanded in the DOM
        const element = document.getElementById(hash);
        const accordionContent = element?.querySelector('.accordion-content');
        
        if (element && accordionContent?.classList.contains('expanded')) {
          // Accordion is expanded, wait for animation to complete then scroll
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }, 350); // Wait for 300ms transition + buffer
        } else if (element) {
          // Accordion not expanded yet, try again
          setTimeout(() => handleHashChange(), 50);
        }
      }, 10); // Small delay for Svelte reactivity
    }
  }

  // Use $effect for proper lifecycle management and cleanup
  $effect(() => {
    if (typeof window === 'undefined') return;
    
    // Handle initial page load with hash
    const handleInitial = () => handleHashChange();
    setTimeout(handleInitial, 100);
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup on component destroy
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  });
</script>

<svelte:head>
  <title>Maintenance Services | Scotia Performance Auto</title>
  <meta name="description" content="Professional auto maintenance services including oil changes, brake service, scheduled maintenance, and state inspections from Scotia Performance Auto.">
  <meta name="keywords" content="auto maintenance, oil change, brake service, state inspection, scheduled maintenance, Scotia NY, automotive repair" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Maintenance Services | Scotia Performance Auto" />
  <meta property="og:description" content="Professional automotive maintenance services including oil changes, brake service, and scheduled maintenance in Scotia, NY." />
  <meta property="og:image" content="/images/garage.jpg" />
  <meta property="og:url" content="https://scotiaperformance.com/services/maintenance" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="Maintenance Services | Scotia Performance Auto" />
  <meta property="twitter:description" content="Professional automotive maintenance services including oil changes, brake service, and scheduled maintenance in Scotia, NY." />
  <meta property="twitter:image" content="/images/garage.jpg" />
  
  <!-- Structured Data for SEO -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": "Scotia Performance - Maintenance Services",
      "description": "Professional automotive maintenance services including oil changes, brake service, scheduled maintenance, and state inspections",
      "url": "https://scotiaperformance.com/services/maintenance",
      "telephone": "(518) 280-1698",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "24 Sacandaga Road",
        "addressLocality": "Scotia",
        "addressRegion": "NY",
        "postalCode": "12302",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "42.8264",
        "longitude": "-73.9593"
      },
      "serviceType": ["Oil Change", "Brake Service", "State Inspection", "Scheduled Maintenance", "Automotive Repair"],
      "areaServed": {
        "@type": "Place",
        "name": "Scotia, NY and surrounding areas"
      }
    }
  </script>
</svelte:head>

<!-- Hero Banner Section -->
<HeroBanner
  title="Professional Maintenance Services"
  subtitle="Keep Your Vehicle Running Smoothly"
  description="Expert automotive maintenance services to ensure your vehicle's reliability, safety, and longevity. From routine oil changes to comprehensive inspections, our ASE-certified technicians deliver quality service you can trust."
  buttonText="Schedule Service"
  buttonHref="tel:5182801698"
  backgroundImage="/images/garage.jpg"
/>

<main class="maintenance-page">
  <!-- Stats Section -->
  <section class="stats-section" aria-labelledby="stats-heading">
    <div class="container">
      <h2 id="stats-heading" class="visually-hidden">Maintenance Statistics</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">15+</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">5,000+</span>
          <span class="stat-label">Vehicles Serviced</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">ASE</span>
          <span class="stat-label">Certified Technicians</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">4.9★</span>
          <span class="stat-label">Customer Rating</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Services Cards -->
  <section class="featured-services" aria-labelledby="featured-heading">
    <div class="container">
      <h2 id="featured-heading">Our Most Popular Maintenance Services</h2>
      <p class="section-subtitle">Essential maintenance services to keep your vehicle safe, reliable, and performing at its best</p>
      
      <div class="services-grid">
        {#each featuredMaintenanceServices as service}
          <ServiceCard 
            title={service.title}
            description={service.description}
            icon={service.icon}
            link={service.link}
          />
        {/each}
      </div>
    </div>
  </section>

  <!-- Comprehensive Services Accordion -->
  <section class="services-accordion" aria-labelledby="accordion-heading">
    <div class="container">
      <h2 id="accordion-heading">Complete Maintenance Services Catalog</h2>
      <p class="section-subtitle">Explore our full range of automotive maintenance and repair services</p>
      
      <div class="accordion-container">
        {#each maintenanceServices as service}
          <div 
            class="accordion-item" 
            id={service.id}
            role="region"
            aria-labelledby="accordion-header-{service.id}"
          >
            <button
              class="accordion-header"
              id="accordion-header-{service.id}"
              aria-expanded={openAccordionItems.has(service.id)}
              aria-controls="accordion-content-{service.id}"
              onclick={() => toggleAccordion(service.id)}
              onkeypress={(event: KeyboardEvent) => handleKeyPress(event, service.id)}
            >
              <div class="accordion-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  {@html service.icon}
                </svg>
              </div>
              <div class="accordion-text">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {#if service.interval}
                  <span class="service-interval">Recommended: {service.interval}</span>
                {/if}
              </div>
              <div class="accordion-toggle" aria-hidden="true">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  class="chevron {openAccordionItems.has(service.id) ? 'expanded' : ''}"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
            </button>
            
            <div 
              class="accordion-content {openAccordionItems.has(service.id) ? 'expanded' : ''}"
              id="accordion-content-{service.id}"
              aria-hidden={!openAccordionItems.has(service.id)}
            >
              <div class="accordion-inner">
                <h4>Services Include:</h4>
                <ul class="services-list">
                  {#each service.services as serviceItem}
                    <li>{serviceItem}</li>
                  {/each}
                </ul>
                {#if service.estimatedTime}
                  <div class="service-details">
                    <p><strong>Estimated Time:</strong> {service.estimatedTime}</p>
                  </div>
                {/if}
                <div class="accordion-actions">
                  <Button variant="primary" onClick={() => requestQuote()}>
                    Schedule Service
                  </Button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <div class="cta-wrapper">
    <CallToAction 
      title="Ready to Schedule Your Maintenance?"
      description="Keep your vehicle running at its best with professional maintenance from Scotia Performance. Our certified technicians are ready to help you maintain your vehicle's reliability and safety."
      phone="(518) 280-1698"
      buttonText="Schedule Service"
      secondaryAction={() => "View Service Specials"}
      fullWidth={true}
      noBorderRadius={true}
      customMargin="0"
      customPadding="3rem 1rem"
    />
  </div>
</main>

<style lang="scss">
  @use 'sass:color';
  @use '../../../scss/core/variables' as *;
  @use '../../../scss/core/mixins' as *;

  .maintenance-page {
    .container {
      width: 100%;
      margin: 0;
      padding: 0 1rem;
    }
  }

  // Stats Section
  .stats-section {
    padding: $spacing-8 0 $spacing-2 0;
    background: linear-gradient(135deg, $scotia-light 0%, $white 100%);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-6;
    margin-bottom: $spacing-8;
  }

  .stat-card {
    @include card;
    @include flex-center;
    flex-direction: column;
    padding: $spacing-5;
    text-align: center;
    @include transition(transform, box-shadow);
    background: $white;

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-lg;
    }

    .stat-value {
      @include heading-1;
      color: $scotia-blue;
      margin-bottom: $spacing-2;
      font-size: $font-size-3xl;
    }

    .stat-label {
      @include body-text;
      color: $scotia-gray;
      font-weight: $font-weight-medium;
    }
  }

  // Featured Services Section
  .featured-services {
    padding: $spacing-8 0 $spacing-2 0;
    background-color: $white;

    h2 {
      @include heading-1;
      text-align: center;
      color: $scotia-blue;
      margin-bottom: $spacing-4;
    }

    .section-subtitle {
      @include body-text;
      text-align: center;
      color: $scotia-gray;
      max-width: 600px;
      margin: 0 auto $spacing-12;
      font-size: $font-size-lg;
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-4;
    align-items: start;
    margin-bottom: $spacing-8;
  }

  // Override ServiceCard styling to match performance page
  :global(.services-grid .service-card) {
    background-color: $white;
    padding: $spacing-4 !important;
    border-radius: 0.75rem;
    border: 1px solid rgba($scotia-gray, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: auto !important;
    min-height: 220px !important;
    max-height: 260px !important;
    
    /* CSS Custom Properties for hover effects */
    --accent-color: #{$scotia-blue};
    --glow-color: rgba(26, 93, 173, 0.4);
    --shadow-color: rgba(26, 93, 173, 0.25);
    --shimmer-color: rgba(255, 255, 255, 0.6);

    // Shimmer effect
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        110deg,
        transparent 20%,
        var(--shimmer-color) 40%,
        var(--shimmer-color) 60%,
        transparent 80%
      );
      transform: translateX(-100%);
      transition: transform 0.6s ease;
      z-index: 1;
      pointer-events: none;
      border-radius: 0.75rem;
      opacity: 0;
    }

    &:hover {
      transform: translateY(-8px);
      border-color: var(--accent-color);
      box-shadow: 
        0 20px 40px var(--shadow-color),
        0 10px 20px rgba(0, 0, 0, 0.1),
        0 0 0 1px var(--accent-color),
        0 0 20px var(--glow-color);

      &::before {
        transform: translateX(100%);
        opacity: 1;
      }
    }

    &:not(:hover)::before {
      transform: translateX(-100%);
      opacity: 0;
      transition: transform 0s, opacity 0.2s ease;
    }

    // Ensure content stays above shimmer effect
    > * {
      position: relative;
      z-index: 2;
    }
  }

  :global(.services-grid .service-card__icon) {
    margin-bottom: $spacing-2 !important;
    color: $scotia-blue;
    flex-shrink: 0 !important;
    
    svg {
      width: 32px !important;
      height: 32px !important;
    }
  }

  :global(.services-grid .service-card__title) {
    font-family: $font-primary;
    font-weight: $font-weight-semibold;
    font-size: $font-size-base !important;
    color: $scotia-blue;
    margin-bottom: $spacing-2 !important;
    line-height: 1.2 !important;
    flex-shrink: 0 !important;
  }

  :global(.services-grid .service-card__description) {
    color: $scotia-gray;
    font-size: $font-size-xs !important;
    margin-bottom: $spacing-2 !important;
    line-height: 1.4 !important;
    flex-grow: 1;
    overflow-y: auto !important;
  }

  :global(.services-grid .service-card__link) {
    display: inline-flex; // Show the link
    align-items: center;
    color: $scotia-blue;
    text-decoration: none;
    font-weight: $font-weight-medium;
    font-size: $font-size-xs;
    margin-top: auto;
    flex-shrink: 0;
    @include transition(color);

    &:hover {
      color: color.adjust($scotia-blue, $lightness: -10%);
      text-decoration: underline;
    }

    &::after {
      content: '';
      width: 4px;
      height: 4px;
      border-top: 1px solid currentColor;
      border-right: 1px solid currentColor;
      transform: rotate(45deg);
      margin-left: 0.25rem;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: translateX(2px) rotate(45deg);
    }
  }

  // Accordion Section
  .services-accordion {
    padding: $spacing-16 0;
    background-color: $scotia-light;

    h2 {
      @include heading-1;
      text-align: center;
      color: $scotia-blue;
      margin-bottom: $spacing-4;
    }

    .section-subtitle {
      @include body-text;
      text-align: center;
      color: $scotia-gray;
      max-width: 700px;
      margin: 0 auto $spacing-12;
      font-size: $font-size-lg;
    }
  }

  .accordion-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  .accordion-item {
    @include card;
    background-color: $white;
    overflow: hidden;
    @include transition(box-shadow);
    // Add scroll margin to account for fixed header
    scroll-margin-top: 120px;

    &:hover {
      box-shadow: $shadow-lg;
    }
  }

  .accordion-header {
    @include button-reset;
    width: 100%;
    padding: $spacing-5;
    display: flex;
    align-items: flex-start;
    gap: $spacing-4;
    text-align: left;
    cursor: pointer;
    @include transition(background-color);

    &:hover {
      background-color: rgba($scotia-blue, 0.02);
    }

    &:focus-visible {
      outline: 2px solid $scotia-blue;
      outline-offset: -2px;
    }

    &[aria-expanded="true"] {
      border-bottom: 1px solid rgba($scotia-gray, 0.1);
    }
  }

  .accordion-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    color: $scotia-blue;
    margin-top: $spacing-1;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .accordion-text {
    flex: 1;
    min-width: 0;

    h3 {
      @include heading-3;
      
      & {
        color: $scotia-blue;
        margin-bottom: $spacing-2;
        font-size: $font-size-lg;
      }

      @include md {
        font-size: $font-size-xl;
      }
    }

    p {
      @include body-text;
      color: $scotia-gray;
      line-height: 1.6;
      margin: 0 0 $spacing-2;
    }

    .service-interval {
      @include body-text;
      font-size: $font-size-sm;
      color: $scotia-blue;
      font-weight: $font-weight-medium;
      background-color: rgba($scotia-blue, 0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      display: inline-block;
    }
  }

  .accordion-toggle {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    color: $scotia-gray;
    margin-top: $spacing-1;

    .chevron {
      width: 100%;
      height: 100%;
      @include transition(transform);

      &.expanded {
        transform: rotate(180deg);
      }
    }
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    @include transition(max-height);

    &.expanded {
      max-height: 1000px;
    }
  }

  .accordion-inner {
    padding: 0 $spacing-5 $spacing-5;
    border-top: 1px solid rgba($scotia-gray, 0.1);
    padding-top: $spacing-5;

    h4 {
      @include heading-3;
      color: $scotia-blue;
      margin-bottom: $spacing-4;
      font-size: $font-size-base;
    }
  }

  .services-list {
    list-style: none;
    margin: 0 0 $spacing-6;
    padding: 0;

    li {
      @include body-text;
      color: $scotia-gray;
      padding: $spacing-2 0;
      padding-left: $spacing-6;
      position: relative;
      line-height: 1.5;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: $scotia-blue;
        font-weight: $font-weight-bold;
      }
    }
  }

  .service-details {
    margin-bottom: $spacing-4;
    padding: $spacing-3;
    background-color: rgba($scotia-blue, 0.05);
    border-radius: 0.5rem;

    p {
      @include body-text;
      margin: 0;
      color: $scotia-gray;
      font-size: $font-size-sm;
    }
  }

  .accordion-actions {
    display: flex;
    justify-content: flex-start;
    margin-top: $spacing-6;
  }

  // Responsive adjustments
  @include sm {
    .accordion-header {
      padding: $spacing-6;
      gap: $spacing-5;
    }

    .accordion-inner {
      padding: 0 $spacing-6 $spacing-6;
      padding-top: $spacing-6;
    }

    .services-grid {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }

  @include md {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-3;
    }
  }

  @include lg {
    .services-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: $spacing-3;
    }

    :global(.services-grid .service-card) {
      min-height: 200px !important;
      max-height: 240px !important;
      padding: $spacing-3 !important;
    }

    :global(.services-grid .service-card__icon svg) {
      width: 28px !important;
      height: 28px !important;
    }

    :global(.services-grid .service-card__title) {
      font-size: $font-size-sm !important;
    }
  }

  // Accessibility improvements
  @media (prefers-reduced-motion: reduce) {
    .accordion-content {
      transition: none;
    }

    .stat-card {
      transition: none;
    }

    .chevron {
      transition: none;
    }

    // Disable animations on service cards for reduced motion
    :global(.services-grid .service-card) {
      transition: none;

      &:hover {
        transform: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      // Disable shimmer effect for reduced motion
      &::before {
        display: none;
      }
    }
  }

  // Focus management for keyboard navigation
  .accordion-header:focus {
    position: relative;
    z-index: 2;
  }

  // Screen reader only content
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  // Full-width CallToAction styling
  .cta-wrapper {
    // Break out of parent container constraints
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    
    // Responsive padding adjustment
    :global(.cta-section) {
      @include md {
        padding: $spacing-12 $spacing-8;
      }
    }

    // Improve button styling
    :global(.cta-button) {
      white-space: nowrap;
      font-size: 0.875rem;
      padding: 0.75rem 1.5rem;
      width: auto;
      min-width: max-content;

      @include md {
        padding: 0.875rem 2rem;
        font-size: 1rem;
      }
    }

    // Ensure content stays properly centered
    :global(.cta-content) {
      margin: 0;
      padding: 0 1rem;
    }
  }
</style>
