<script lang="ts">
  // Import the components
  import AboutCard from '$lib/components/AboutCard.svelte';
  import BusinessInfo from '$lib/components/BusinessInfo.svelte';
  import BusinessHoursCard from '$lib/components/BusinessHoursCard.svelte';
  import Button from '$lib/components/Button.svelte';
  import CallToAction from '$lib/components/CallToAction.svelte';
  import ContactCard from '$lib/components/ContactCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import HeroBanner from '$lib/components/HeroBanner.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import LazyLoad from '$lib/components/LazyLoad.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import ServiceDetail from '$lib/components/ServiceDetail.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServiceHighlights from '$lib/components/ServiceHighlights.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  
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
</script>

<div class="component-showcase">
  <div class="container">
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Status: Open</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <AboutCard currentStatus={garageStatus} />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<AboutCard currentStatus={{ 
  isOpen: true, 
  message: "We're currently open until 5:00 PM today" 
}} />`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Status: Closed</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <AboutCard currentStatus={garageClosedStatus} />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<AboutCard currentStatus={{ 
  isOpen: false, 
  message: "We're currently closed. Opening tomorrow at 8:00 AM" 
}} />`}</code></pre>
          </details>
        </div>
      </div>
    
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
    
    <section class="component-section">
      <h2 class="component-section__title">Call to Action</h2>
      <p class="component-section__description">
        Eye-catching section to prompt user interactions.
      </p>
      
      <div class="component-examples">
        <div class="component-example">
          <h3 class="component-example__title">Default CTA</h3>
          <div class="component-example__container component-example__container--large">
            <CallToAction />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<CallToAction />`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">Custom CTA</h3>
          <div class="component-example__container component-example__container--large">
            <CallToAction 
              title="Need Emergency Repairs?"
              description="Our team is ready to help with your urgent automotive needs."
              phone="(518) 374-6111"
              buttonText="Call Now"
              secondaryAction={() => "View all services"}
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
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Contact Card</h2>
      <p class="component-section__description">
        A card displaying business contact information.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <ContactCard />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ContactCard />`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">With Custom Info</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <ContactCard 
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
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Hero</h2>
      <p class="component-section__description">
        A hero banner with business hours and location information.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fullwidth">
            <Hero />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Hero />`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Hero Banner</h2>
      <p class="component-section__description">
        A customizable hero banner with title, subtitle, and call-to-action.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fullwidth">
            <HeroBanner 
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
            <HeroBanner 
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
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Hero Section</h2>
      <p class="component-section__description">
        A simple hero section with business name and description.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fullwidth">
            <HeroSection />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<HeroSection />`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">ResponsiveImage</h2>
      <p class="component-section__description">
        An optimized image component with lazy loading, placeholder, and responsive capabilities.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container">
            <ResponsiveImage 
              src="/images/garage.jpg" 
              alt="Garage image" 
              width={600} 
              height={400}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ResponsiveImage 
  src="/images/garage.jpg" 
  alt="Garage image" 
  width={600} 
  height={400}
/>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">With Thumbnail</h3>
          <div class="component-example__container">
            <ResponsiveImage 
              src="/images/hero-bg.jpg" 
              alt="Hero image" 
              width={600} 
              height={400}
              thumb="/images/hero-bg.jpg"
              eager={true}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ResponsiveImage 
  src="/images/hero-bg.jpg" 
  alt="Hero image" 
  width={600} 
  height={400}
  thumb="/images/hero-bg.jpg"
  eager={true}
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">ServiceCard</h2>
      <p class="component-section__description">
        A card component for displaying service information.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <ServiceCard 
              title="Brake Service"
              description="Complete brake system diagnostics, repair and replacement. Includes pads, rotors, calipers, and brake lines."
              link="/services/brakes"
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ServiceCard 
  title="Brake Service"
  description="Complete brake system diagnostics, repair and replacement. Includes pads, rotors, calipers, and brake lines."
  link="/services/brakes"
/>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">With Icon</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <ServiceCard 
              title="Oil Change"
              description="Regular maintenance with conventional, synthetic blend, or full synthetic oil. Includes multi-point inspection."
              link="/services/oil-change"
              icon={exampleIcon}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ServiceCard 
  title="Oil Change"
  description="Regular maintenance with conventional, synthetic blend, or full synthetic oil. Includes multi-point inspection."
  link="/services/oil-change"
  icon="<path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h16M4 16h16'/>"
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">LazyLoad</h2>
      <p class="component-section__description">
        A component for lazy-loading content when it enters the viewport.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container">
            <LazyLoad height="200px" placeholder="Content will load when visible">
              <div style="background: #e0e7ff; padding: 2rem; text-align: center;">
                This content was lazy loaded!
              </div>
            </LazyLoad>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<LazyLoad height="200px" placeholder="Content will load when visible">
  <div style="background: #e0e7ff; padding: 2rem; text-align: center;">
    This content was lazy loaded!
  </div>
</LazyLoad>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">With Transition</h3>
          <div class="component-example__container">
            <LazyLoad 
              height="200px" 
              transition={true} 
              background="#f3f4f6"
              delay={300}
              placeholder="Loading content..."
            >
              <div style="background: #fef3c7; padding: 2rem; text-align: center;">
                This content loads with a fade-in transition!
              </div>
            </LazyLoad>
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<LazyLoad 
  height="200px" 
  transition={true} 
  background="#f3f4f6"
  delay={300}
  placeholder="Loading content..."
>
  <div style="background: #fef3c7; padding: 2rem; text-align: center;">
    This content loads with a fade-in transition!
  </div>
</LazyLoad>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Testimonial</h2>
      <p class="component-section__description">
        A component for displaying a single customer testimonial.
      </p>
      
      <div class="component-examples component-examples--grid">
        <div class="component-example">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <Testimonial 
              quote="Professional respectable operation run at peak productivity. Amazingly service. Honest. A garage with morals to not rip you off."
              author="Oak Owl"
              rating={5}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Testimonial 
  quote="Professional respectable operation run at peak productivity. Amazingly service. Honest. A garage with morals to not rip you off."
  author="Oak Owl"
  rating={5}
/>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example">
          <h3 class="component-example__title">With Read More Link</h3>
          <div class="component-example__container component-example__container--fixed-width">
            <Testimonial 
              quote="Great place, they're fast, reliable, honest, and professional. They never try to sell you on things you don't need and they always do quality work."
              author="Joe H."
              rating={4}
              readMoreLink="https://www.google.com/maps/place/Scotia+Performance/"
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Testimonial 
  quote="Great place, they're fast, reliable, honest, and professional. They never try to sell you on things you don't need and they always do quality work."
  author="Joe H."
  rating={4}
  readMoreLink="https://www.google.com/maps/place/Scotia+Performance/"
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">Testimonials</h2>
      <p class="component-section__description">
        A carousel component for displaying multiple customer testimonials.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--large">
            <Testimonials />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<Testimonials />`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">ServiceHighlights</h2>
      <p class="component-section__description">
        A component for highlighting key services with icons and descriptions.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--large">
            <ServiceHighlights 
              services={serviceHighlightsData}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ServiceHighlights 
  services={[
    {
      title: "Performance Tuning",
      description: "Unlock your vehicle's full potential with our professional tuning services.",
      icon: "<svg>...</svg>"
    },
    {
      title: "Brake Service",
      description: "Complete brake system diagnostics, repair and replacement for maximum safety.",
      icon: "<svg>...</svg>"
    },
    {
      title: "Engine Repair",
      description: "Expert diagnostics and repair for all engine issues by ASE certified technicians.",
      icon: "<svg>...</svg>"
    }
  ]}
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">ServiceDetail</h2>
      <p class="component-section__description">
        A component for displaying detailed information about a service.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default Layout</h3>
          <div class="component-example__container component-example__container--large">
            <ServiceDetail 
              title="Engine Tuning" 
              description="Our engine tuning service optimizes your vehicle's performance by adjusting the engine control unit (ECU) parameters. This results in improved power, torque, and fuel efficiency tailored to your specific driving needs."
              icon="🔧"
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ServiceDetail 
  title="Engine Tuning" 
  description="Our engine tuning service optimizes your vehicle's performance by adjusting the engine control unit (ECU) parameters. This results in improved power, torque, and fuel efficiency tailored to your specific driving needs."
  icon="🔧"
/>`}</code></pre>
          </details>
        </div>
        
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Reversed Layout</h3>
          <div class="component-example__container component-example__container--large">
            <ServiceDetail 
              title="Suspension Upgrades" 
              description="Improve your vehicle's handling and comfort with our suspension upgrade services. We offer everything from simple spring and shock replacements to complete performance suspension systems."
              icon="🛞"
              isReversed={true}
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ServiceDetail 
  title="Suspension Upgrades" 
  description="Improve your vehicle's handling and comfort with our suspension upgrade services. We offer everything from simple spring and shock replacements to complete performance suspension systems."
  icon="🛞"
  isReversed={true}
/>`}</code></pre>
          </details>
        </div>
      </div>
    </section>
    
    <section class="component-section">
      <h2 class="component-section__title">ServiceHero</h2>
      <p class="component-section__description">
        A hero banner specifically for service pages.
      </p>
      
      <div class="component-examples">
        <div class="component-example component-example--fullwidth">
          <h3 class="component-example__title">Default</h3>
          <div class="component-example__container component-example__container--fullwidth">
            <ServiceHero 
              title="Performance Tuning" 
              subtitle="Unlock your vehicle's true potential with our expert tuning services."
              backgroundImage="/images/hero-bg.jpg"
            />
          </div>
          <details class="component-example__code">
            <summary>View Code</summary>
            <pre><code>{`<ServiceHero 
  title="Performance Tuning" 
  subtitle="Unlock your vehicle's true potential with our expert tuning services."
  backgroundImage="/images/hero-bg.jpg"
/>`}</code></pre>
          </details>
        </div>
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
</style> 