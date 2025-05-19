<script lang="ts">
  import { onMount } from 'svelte';
  import type { ComponentType } from 'svelte';
  
  // Import directly only what's needed for initial render
  import AboutCard from '$lib/components/AboutCard.svelte';
  import BusinessInfo from '$lib/components/BusinessInfo.svelte';
  import BusinessHoursCard from '$lib/components/BusinessHoursCard.svelte';
  import Button from '$lib/components/Button.svelte';
  
  // Define component names type for type safety
  type ComponentName = 'CallToAction' | 'ContactCard' | 'Hero' | 'HeroBanner' | 
                      'HeroSection' | 'LazyLoad' | 'ResponsiveImage' | 
                      'ServiceCard' | 'ServiceDetail' | 'ServiceHero' | 
                      'ServiceHighlights' | 'Testimonial' | 'Testimonials';
  
  // Lazy load other components
  let componentsLoaded = $state<Record<ComponentName, boolean>>({
    CallToAction: false,
    ContactCard: false,
    Hero: false,
    HeroBanner: false,
    HeroSection: false,
    LazyLoad: false,
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
    if (!componentsLoaded[name]) {
      try {
        const module = await import(`$lib/components/${name}.svelte`);
        components[name] = module.default;
        componentsLoaded[name] = true;
      } catch (error) {
        console.error(`Failed to load component ${name}:`, error);
      }
    }
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
  const garageStatus = $state({ 
    isOpen: true, 
    message: "We're currently open until 5:00 PM today" 
  });
  
  const garageClosedStatus = $state({
    isOpen: false,
    message: "We're currently closed. Opening tomorrow at 8:00 AM"
  });
  
  // Example data for BusinessInfo
  const businessInfoData = $state({
    address: "24 Sacandaga Rd, Scotia, NY 12302",
    phone: "(518) 374-6111",
    email: "info@scotiaperf.com",
    businessHours: sampleBusinessHours
  });
  
  // Business hours for the standalone hours card
  const businessHours = $state(sampleBusinessHours);
  
  // Button click handler for demo purposes
  function handleButtonClick() {
    alert('Button clicked!');
  }

  // Secondary action for Call to Action component - using a string return
  const secondaryActionFn = () => "View all services";
  
  // Example SVG icon for ServiceCard
  const exampleIcon = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>`;
  
  // ServiceHighlights example data
  const serviceHighlightsData = $state([
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
  ]);
  
  // Setup intersection observer for lazy loading
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elem = entry.target as HTMLElement;
          const componentName = elem.dataset.component as ComponentName | undefined;
          if (componentName && componentsLoaded[componentName] === false) {
            loadComponent(componentName);
          }
        }
      });
    }, {
      rootMargin: '100px 0px',
      threshold: 0.1
    });
    
    // Observe sections with data-component attribute
    document.querySelectorAll('[data-component]').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
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
  phone="(518) 374-6111"
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
    <section class="component-section" data-component="CallToAction">
      <h2 class="component-section__title">Call to Action</h2>
      <p class="component-section__description">
        Eye-catching section to prompt user interactions.
      </p>
      
      <div class="component-examples">
        {#if componentsLoaded.CallToAction && components.CallToAction}
          <div class="component-example">
            <h3 class="component-example__title">Default CTA</h3>
            <div class="component-example__container component-example__container--large">
              <svelte:component this={components.CallToAction} />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<CallToAction />`}</code></pre>
            </details>
          </div>
          
          <div class="component-example">
            <h3 class="component-example__title">Custom CTA</h3>
            <div class="component-example__container component-example__container--large">
              <svelte:component this={components.CallToAction}
                title="Need Emergency Repairs?"
                description="Our team is ready to help with your urgent automotive needs."
                phone="(518) 374-6111"
                buttonText="Call Now"
                secondaryAction={secondaryActionFn}
              />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<CallToAction 
  title="Need Emergency Repairs?"
  description="Our team is ready to help with your urgent automotive needs."
  phone="(518) 374-6111"
  buttonText="Call Now"
  secondaryAction={() => "View all services"}
/>`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            Loading Call to Action...
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
        {#if componentsLoaded.ContactCard && components.ContactCard}
          <div class="component-example">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--fixed-width">
              <svelte:component this={components.ContactCard} />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<ContactCard />`}</code></pre>
            </details>
          </div>
          
          <div class="component-example">
            <h3 class="component-example__title">With Custom Info</h3>
            <div class="component-example__container component-example__container--fixed-width">
              <svelte:component this={components.ContactCard}
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
            Loading Contact Card...
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
        {#if componentsLoaded.Hero && components.Hero}
          <div class="component-example component-example--fullwidth">
            <h3 class="component-example__title">Default</h3>
            <div class="component-example__container component-example__container--fullwidth">
              <svelte:component this={components.Hero} />
            </div>
            <details class="component-example__code">
              <summary>View Code</summary>
              <pre><code>{`<Hero />`}</code></pre>
            </details>
          </div>
        {:else}
          <div class="component-section__placeholder">
            Loading Hero...
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
              <svelte:component this={components.HeroBanner}
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
              <svelte:component this={components.HeroBanner}
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
            Loading Hero Banner...
          </div>
        {/if}
      </div>
    </section>
    
    <!-- Continue with the rest of the components following the same pattern -->
    <!-- Include all other components with the same pattern: data-component attribute and conditional rendering -->
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