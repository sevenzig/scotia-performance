<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';
  import { browser } from '$app/environment';
  
  // Import directly only what's needed for initial render
  import AboutCard from '$lib/components/AboutCard.svelte';
  import BusinessInfo from '$lib/components/BusinessInfo.svelte';
  import BusinessHoursCard from '$lib/components/BusinessHoursCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  // Define component names type for type safety
  type ComponentName = 'CallToAction' | 'ContactCard' | 'Hero' | 'HeroBanner' | 
                      'HeroSection' | 'LazyLoad' | 'ManufacturerCarousel' | 'ResponsiveImage' | 
                      'ServiceCard' | 'ServiceDetail' | 'ServiceHero' | 
                      'ServiceHighlights' | 'Testimonial' | 'Testimonials';
  
  let componentsLoaded = $state<Record<ComponentName, boolean>>({
    CallToAction: false,
    ContactCard: false,
    Hero: false,
    HeroBanner: false,
    HeroSection: false,
    LazyLoad: false,
    ManufacturerCarousel: false,
    ResponsiveImage: false,
    ServiceCard: false,
    ServiceDetail: false,
    ServiceHero: false,
    ServiceHighlights: false,
    Testimonial: false,
    Testimonials: false
  });
  
  let components = $state<Record<ComponentName, ComponentType | null>>({
    CallToAction: null,
    ContactCard: null,
    Hero: null,
    HeroBanner: null,
    HeroSection: null,
    LazyLoad: null,
    ManufacturerCarousel: null,
    ResponsiveImage: null,
    ServiceCard: null,
    ServiceDetail: null,
    ServiceHero: null,
    ServiceHighlights: null,
    Testimonial: null,
    Testimonials: null
  });
  
  // Function to load a specific component
  async function loadComponent(name: ComponentName): Promise<void> {
    if (browser && !componentsLoaded[name] && !components[name]) {
      try {
        console.log(`Attempting to load component: ${name}`);
        const module = await import(`$lib/components/${name}.svelte`);
        if (module && module.default) {
          // Set component first, then mark as loaded
          components[name] = module.default;
          // Add a small delay to ensure the component is fully ready
          await new Promise(resolve => setTimeout(resolve, 10));
          componentsLoaded[name] = true;
          console.log(`Successfully loaded component: ${name}`);
        } else {
          console.error(`Component ${name} module loaded but default export missing`);
          componentsLoaded[name] = false;
        }
      } catch (error) {
        console.error(`Failed to load component ${name}:`, error);
        componentsLoaded[name] = false;
        components[name] = null; // Ensure it's reset on error
      }
    }
  }
  
  // Helper function to safely check if component is ready to render
  function isComponentReady(name: ComponentName): boolean {
    return browser && 
           componentsLoaded[name] === true && 
           components[name] !== null && 
           components[name] !== undefined;
  }
  
  // Sample business hours data for demonstration
  const sampleBusinessHours = [
    { day: "Monday", hours: "8:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 5:00 PM" },
    { day: "Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" }
  ];
  
  // Example data for component demos
  let garageStatus = { 
    isOpen: true, 
    message: "We're currently open until 5:00 PM today" 
  };
  
  let garageClosedStatus = {
    isOpen: false,
    message: "We're currently closed. Opening tomorrow at 8:00 AM"
  };
  
  // Example data for BusinessInfo
  let businessInfoData = {
    address: "24 Sacandaga Rd, Scotia, NY 12302",
    phone: "(518) 280-1698",
    email: "info@scotiaperf.com",
    businessHours: sampleBusinessHours
  };
  
  // Business hours for the standalone hours card
  let businessHours = sampleBusinessHours;
  
  // Button click handler for demo purposes
  function handleButtonClick() {
    if (browser) {
      alert('Button clicked!');
    }
  }

  // Secondary action for Call to Action component - using a string return
  const secondaryActionFn = () => "View all services";
  
  // Example SVG icon for ServiceCard
  const exampleIcon = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>`;
  
  // ServiceHighlights example data
  let serviceHighlightsData = [
    {
      title: "Performance Tuning",
      description: "Unlock your vehicle's full potential with our professional tuning services.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`
    },
    {
      title: "Brake Service",
      description: "Complete brake system diagnostics, repair and replacement for maximum safety.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zm8 5h0a4 4 0 014 4v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6a4 4 0 014-4h0" /></svg>`
    },
    {
      title: "Engine Repair",
      description: "Expert diagnostics and repair for all engine issues by ASE certified technicians.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>`
    }
  ];
  
  let isInitialized = false;
  
  // Setup intersection observer for lazy loading
  onMount(async () => {
    if (!browser) return;
    
    // Wait for the page to be fully rendered before starting component loading
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Use requestAnimationFrame to avoid DOM conflicts during initial render
    requestAnimationFrame(async () => {
      isInitialized = true;
      console.log('Setting up components loading');
      
      try {
        const componentNames = Object.keys(componentsLoaded) as ComponentName[];
        
        // Load components one at a time with delays to prevent overwhelming the system
        for (const componentName of componentNames) {
          await new Promise(resolve => setTimeout(resolve, 100)); // Increased delay for stability
          await loadComponent(componentName);
        }
        
        console.log('Finished all component loading attempts.');
      } catch (error) {
        console.error('Error during component loading:', error);
      }
    });
    
    /* Comment out intersection observer for now
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elem = entry.target as HTMLElement;
          const componentName = elem.dataset.component as ComponentName | undefined;
          // console.log(`Component in viewport: ${componentName}`);
          if (componentName && componentsLoaded[componentName] === false) {
            loadComponent(componentName);
          }
        }
      });
    }, {
      rootMargin: '100px 0px',
      threshold: 0.1
    });
    
    const sections = document.querySelectorAll('[data-component]');
    // console.log(`Found ${sections.length} component sections to observe`);
    sections.forEach(el => {
      observer.observe(el);
      // console.log(`Observing: ${(el as HTMLElement).dataset.component}`);
    });
    
    return () => {
      if (observer) { // Ensure observer exists before trying to disconnect
        observer.disconnect();
      }
    };
    */
  });
</script>

<div class="component-showcase">
  <div class="container">
    <!-- Always loaded components -->
    <section class="component-section">
      <h2 class="component-section__title">About Card</h2>
      <p class="component-section__description">
        A card displaying business status, description, and contact information.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Status: Open</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <AboutCard />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<AboutCard />`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Status: Closed</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <AboutCard showClosedExample={true} />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<AboutCard showClosedExample={true} />`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Business Info</h2>
      <p class="component-section__description">
        The Business Info component displays contact information, location, and business hours.
      </p>
      
      <div class="component-examples">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--medium">
            <BusinessInfo 
              address={businessInfoData.address}
              phone={businessInfoData.phone}
              email={businessInfoData.email}
              businessHours={businessInfoData.businessHours}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<BusinessInfo 
  address="24 Sacandaga Rd, Scotia, NY 12302"
  phone="(518) 280-1698"
  email="info@scotiaperf.com"
  businessHours={sampleBusinessHours}
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Business Hours Card</h2>
      <p class="component-section__description">
        A compact card that displays business hours.
      </p>
      
      <div class="component-examples">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <BusinessHoursCard businessHours={businessHours} />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<BusinessHoursCard 
  businessHours={sampleBusinessHours}
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Button</h2>
      <p class="component-section__description">
        Versatile button component with various styles and states.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Primary Button</h3>
          <div class="component-example__container">
            <Button variant="primary" onClick={handleButtonClick}>Primary Button</Button>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Button variant="primary" onClick={handleButtonClick}>
  Primary Button
</Button>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Secondary Button</h3>
          <div class="component-example__container">
            <Button variant="secondary">Secondary Button</Button>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Button variant="secondary">
  Secondary Button
</Button>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Outline Button</h3>
          <div class="component-example__container">
            <Button variant="outline">Outline Button</Button>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Button variant="outline">
  Outline Button
</Button>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Disabled Button</h3>
          <div class="component-example__container">
            <Button disabled={true}>Disabled Button</Button>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Button disabled={true}>
  Disabled Button
</Button>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Loading Button</h3>
          <div class="component-example__container">
            <Button loading={true}>Loading Button</Button>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Button loading={true}>
  Loading Button
</Button>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <!-- Lazily loaded components -->
    <section class="component-section" data-component="LazyLoad">
      <h2 class="component-section__title">Lazy Load</h2>
      <p class="component-section__description">
        A utility component for lazy loading content as it enters the viewport.
      </p>
      
      <div class="component-examples">
        {#if componentsLoaded.LazyLoad && components.LazyLoad}
          <div class="component-example">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container">
              <components.LazyLoad height="200px">
                {#snippet children()}
                <div style="padding: 2rem; background-color: #f5f5f5; text-align: center;">
                  This content was lazy loaded!
                </div>
                {/snippet}
              </components.LazyLoad>
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<LazyLoad height="200px">
  {#snippet children()}
  <div style="padding: 2rem; background-color: #f5f5f5; text-align: center;">
    This content was lazy loaded!
  </div>
  {/snippet}
</LazyLoad>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading LazyLoad component..." : "LazyLoad component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="ManufacturerCarousel">
      <h2 class="component-section__title">Manufacturer Carousel</h2>
      <p class="component-section__description">
        An auto-advancing horizontal carousel that displays manufacturer logos with smooth transitions, keyboard navigation, and accessibility features.
      </p>
      
      <div class="component-examples">
        {#if componentsLoaded.ManufacturerCarousel && components.ManufacturerCarousel}
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">Default Configuration</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <components.ManufacturerCarousel />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ManufacturerCarousel />`}</code></pre>
            </details>
          </div>
          
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">Custom Sizing & Speed</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <components.ManufacturerCarousel
                imageWidth={200}
                imageHeight={200}
                autoAdvanceInterval={2500}
                transitionDuration={800}
                ariaLabel="Automotive brand partners we service"
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ManufacturerCarousel
  imageWidth={200}
  imageHeight={200}
  autoAdvanceInterval={2500}
  transitionDuration={800}
  ariaLabel="Automotive brand partners we service"
/>`}</code></pre>
            </details>
          </div>
          
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">Large Format</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <components.ManufacturerCarousel
                imageWidth={300}
                imageHeight={300}
                autoAdvanceInterval={4000}
                pauseOnHover={false}
                ariaLabel="Premium automotive brands showcase"
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ManufacturerCarousel
  imageWidth={300}
  imageHeight={300}
  autoAdvanceInterval={4000}
  pauseOnHover={false}
  ariaLabel="Premium automotive brands showcase"
/>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Manufacturer Carousel..." : "Manufacturer Carousel component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="CallToAction">
      <h2 class="component-section__title">Call to Action</h2>
      <p class="component-section__description">
        Eye-catching section to prompt user interactions.
      </p>
      
      <div class="component-examples">
        {#if isComponentReady('CallToAction')}
          <div class="component-example">
            <h3 class="component-example__title">Default CTA</h3>
            <div class="component-example__container component-example__container--large">
              <components.CallToAction />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<CallToAction />`}</code></pre>
            </details>
          </div>
          
          <div class="component-example">
            <h3 class="component-example__title">Custom CTA</h3>
            <div class="component-example__container component-example__container--large">
              <components.CallToAction
                title="Need Emergency Repairs?"
                description="Our team is ready to help with your urgent automotive needs."
                phone="(518) 280-1698"
                buttonText="Call Now"
                secondaryAction={secondaryActionFn}
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<CallToAction 
  title="Need Emergency Repairs?"
  description="Our team is ready to help with your urgent automotive needs."
  phone="(518) 280-1698"
  buttonText="Call Now"
  secondaryAction={() => "View all services"}
/>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Call to Action..." : "Call to Action component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="ContactCard">
      <h2 class="component-section__title">Contact Card</h2>
      <p class="component-section__description">
        A card displaying business contact information.
      </p>
      
      <div class="component-examples component-examples--grid">
        {#if isComponentReady('ContactCard')}
          <div class="component-example">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--fixed-width">
              <components.ContactCard />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ContactCard />`}</code></pre>
            </details>
          </div>
          
          <div class="component-example">
            <h3 class="component-example__title">With Custom Info</h3>
            <div class="component-example__container component-example__container--fixed-width">
              <components.ContactCard
                address="123 Main Street, Anywhere, NY 12345, USA"
                phone="(555) 123-4567"
                email="custom@example.com"
                website="https://example.com"
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ContactCard 
  address="123 Main Street, Anywhere, NY 12345, USA"
  phone="(555) 123-4567"
  email="custom@example.com"
  website="https://example.com"
/>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Contact Card..." : "Contact Card component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="Hero">
      <h2 class="component-section__title">Hero</h2>
      <p class="component-section__description">
        A hero banner with business hours and location information.
      </p>
      
      <div class="component-examples">
        {#if isComponentReady('Hero')}
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <components.Hero />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<Hero />`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Hero..." : "Hero component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="HeroBanner">
      <h2 class="component-section__title">Hero Banner</h2>
      <p class="component-section__description">
        A customizable hero banner with title, subtitle, and call-to-action.
      </p>
      
      <div class="component-examples">
        {#if componentsLoaded.HeroBanner && components.HeroBanner}
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <components.HeroBanner
                title="Scotia Performance"
                subtitle="Your trusted automotive repair partner"
                description="We provide top-quality automotive repair services with transparent pricing and exceptional customer service."
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<HeroBanner 
  title="Scotia Performance"
  subtitle="Your trusted automotive repair partner"
  description="We provide top-quality automotive repair services with transparent pricing and exceptional customer service."
/>`}</code></pre>
            </details>
          </div>
          
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">With Custom Properties</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <components.HeroBanner
                title="Special Offers"
                subtitle="Save on your next service"
                description="Take advantage of our seasonal specials and save on maintenance and repairs."
                buttonText="View Offers"
                buttonHref="#offers"
                backgroundImage="/images/mechanic.jpg"
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<HeroBanner 
  title="Special Offers"
  subtitle="Save on your next service"
  description="Take advantage of our seasonal specials and save on maintenance and repairs."
  buttonText="View Offers"
  buttonHref="#offers"
  backgroundImage="/images/mechanic.jpg"
/>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Hero Banner..." : "Hero Banner component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="ServiceHighlights">
      <h2 class="component-section__title">Service Highlights</h2>
      <p class="component-section__description">
        Showcase key services with icons and descriptions.
      </p>
      
      <div class="component-examples">
        {#if componentsLoaded.ServiceHighlights && components.ServiceHighlights}
          <div class="component-example">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--large">
              <components.ServiceHighlights services={serviceHighlightsData} />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ServiceHighlights services={serviceHighlightsData} />`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Service Highlights..." : "Service Highlights component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="ServiceCard">
      <h2 class="component-section__title">Service Card</h2>
      <p class="component-section__description">
        A card displaying a service with title, description, and icon.
      </p>
      
      <div class="component-examples component-examples--grid">
        {#if componentsLoaded.ServiceCard && components.ServiceCard}
          <div class="component-example">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--fixed-width">
              <components.ServiceCard
                title="Oil Change"
                description="Regular oil changes are essential for keeping your engine running smoothly and extending its lifespan."
                icon={exampleIcon}
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ServiceCard
  title="Oil Change"
  description="Regular oil changes are essential for keeping your engine running smoothly and extending its lifespan."
  icon={exampleIcon}
/>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Service Card..." : "Service Card component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
    
    <section class="component-section" data-component="Testimonials">
      <h2 class="component-section__title">Testimonials</h2>
      <p class="component-section__description">
        A collection of customer testimonials to showcase feedback and reviews.
      </p>
      
      <div class="component-examples">
        {#if componentsLoaded.Testimonials && components.Testimonials}
          <div class="component-example">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--large">
              <components.Testimonials />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<Testimonials />`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            {browser ? "Loading Testimonials..." : "Testimonials component will load in browser"}
          </div>
        {/if}
      </div>
    </section>
  </div>
</div>

<style>
  /* Main container styles */
  .component-showcase {
    padding: 2rem 0;
    width: 100%;
    background-color: #fafafa;
  }
  
  .container {
    width: 100%;
    max-width: 100%;
    padding: 0 2rem;
  }
  
  /* Section styles */
  .component-section {
    margin-bottom: 5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
    width: 100%;
  }
  
  .component-section:last-child {
    margin-bottom: 2rem;
    border-bottom: none;
  }
  
  .component-section__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--scotia-blue, #1A5DAD);
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .component-section__description {
    margin-bottom: 2rem;
    color: #555;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
  }
  
  /* Component examples layout */
  .component-examples {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .component-examples--grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .component-examples--grid {
      grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    }
  }
  
  /* Component example styles */
  .component-example {
    border: 1px solid #eee;
    border-radius: 0.75rem;
    overflow: hidden;
    background-color: white;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s ease;
  }
  
  .component-example:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  }
  
  .component-example__title {
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
  }
  
  .component-example__container {
    padding: 1.5rem;
    background-color: white;
    width: 100%;
  }

  /* Width variations for different component types */
  .component-example__container--fixed-width {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .component-example__container--medium {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .component-example__container--large {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .component-example__container--fullwidth {
    width: 100%;
    max-width: none;
    padding: 0;
    margin: 0;
  }
  
  /* Code example styles */
  .component-example__code {
    border-top: 1px solid #eee;
  }
  
  .component-example__code summary {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    background-color: #f9f9f9;
    font-weight: 500;
  }
  
  .component-example__code pre {
    margin: 0;
    padding: 1rem;
    background-color: #f5f5f5;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .container {
      padding: 0 1rem;
    }
    .component-section__title {
      font-size: 1.5rem;
    }
  }
  
  /* For full width components */
  .component-example--fullwidth {
    width: 100%;
  }
  
  .component-example--fullwidth .component-example__container--fullwidth {
    padding: 0;
    max-width: none;
    width: 100%;
    margin: 0;
  }
  
  /* Helper classes */
  .component-examples .component-example:only-child {
    max-width: 100%;
  }
  
  /* Small screen adjustments */
  @media (max-width: 500px) {
    .component-example__container--fixed-width,
    .component-example__container--medium {
      max-width: 100%;
    }
  }
  
  .component-section__placeholder {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
    color: #666;
    font-size: 1.1rem;
  }
</style> 