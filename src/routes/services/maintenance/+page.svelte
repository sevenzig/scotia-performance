<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import ServiceDetail from '$lib/components/ServiceDetail.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';

  // Maintenance service details
  const maintenanceServices = [
    {
      title: "Regular Oil Changes",
      description: "Our professional oil change service includes premium oil, filter replacement, and a comprehensive multi-point inspection to keep your vehicle running smoothly.",
      icon: '<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8h-3l-5 5.5-5-5.5H3" stroke="currentColor"/>'
    },
    {
      title: "Brake Services",
      description: "From brake pad replacement to complete system inspections, our ASE-certified technicians ensure your vehicle stops safely and efficiently every time.",
      icon: '<circle cx="12" cy="12" r="10" stroke="currentColor"/><path d="M8 12h8M12 16V8" stroke="currentColor"/>'
    },
    {
      title: "Filter Replacement",
      description: "We replace all essential filters including air, fuel, cabin air, and oil filters to maintain optimal performance and air quality in your vehicle.",
      icon: '<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor"/><path d="M3 9h18M9 21V9" stroke="currentColor"/>'
    }
  ];
  
  // Related services
  const relatedServices = [
    {
      title: "Fluid Inspections",
      description: "Regular checks of all vital fluids including transmission, brake, power steering, and coolant to prevent costly repairs.",
      link: "/services/fluid-inspection"
    },
    {
      title: "Tire Services",
      description: "Rotation, balancing, pressure checks, and alignment services to extend tire life and improve fuel efficiency.",
      link: "/services/tire-services"
    },
    {
      title: "Battery Service",
      description: "Battery testing, terminal cleaning, and replacement services to keep your vehicle starting reliably.",
      link: "/services/battery-service"
    }
  ];
</script>

<svelte:head>
  <title>Maintenance Services | Scotia Performance Auto</title>
  <meta name="description" content="Professional auto maintenance services including oil changes, brake service, and filter replacements from Scotia Performance Auto.">
</svelte:head>

<Hero />

<main class="container mx-auto px-4 py-8">
  <header class="text-center mb-12">
    <h1 class="text-3xl font-bold text-scotia-blue mb-4">Professional Maintenance Services</h1>
    <p class="max-w-2xl mx-auto text-gray-600">
      Keep your vehicle in peak condition with our comprehensive maintenance services. 
      Our ASE-certified technicians use only quality parts and fluids to ensure reliability and longevity.
    </p>
  </header>

  <section class="mb-16">
    <h2 class="text-2xl font-semibold mb-8 text-center">Our Maintenance Services</h2>
    
    <div class="space-y-12">
      <ServiceDetail 
        title="Comprehensive Oil Change Service" 
        description="Our oil change service goes beyond just replacing oil. We perform a complete vehicle inspection, checking fluid levels, filters, belts, hoses, and more. We use only high-quality oils and filters matched to your vehicle's specifications."
        children={{
          image: () => `<img src="/images/maintenance/oil-change.jpg" alt="Oil change service" class="rounded-lg shadow-md w-full object-cover" style="aspect-ratio: 16/9;">`,
          actions: () => `<a href="/contact" class="inline-flex items-center text-scotia-blue hover:underline">
            Schedule Service
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>`
        }}
      />
      
      <ServiceDetail 
        title="30/60/90K Mile Services" 
        description="Factory-recommended maintenance at key mileage intervals helps prevent breakdowns and extends vehicle life. Our comprehensive service packages include all inspections, fluid changes, and adjustments recommended by your vehicle's manufacturer."
        isReversed={true}
        children={{
          image: () => `<img src="/images/maintenance/scheduled-maintenance.jpg" alt="Scheduled maintenance service" class="rounded-lg shadow-md w-full object-cover" style="aspect-ratio: 16/9;">`,
          actions: () => `<a href="/services/maintenance/scheduled" class="inline-flex items-center text-scotia-blue hover:underline">
            Learn About Scheduled Maintenance
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>`
        }}
      />
      
      <ServiceDetail 
        title="Brake System Maintenance" 
        description="Your vehicle's braking system is critical for safety. Our brake services include pad replacement, rotor resurfacing or replacement, brake fluid flush, and complete system inspection to ensure optimal stopping power and safety."
        children={{
          image: () => `<img src="/images/maintenance/brake-service.jpg" alt="Brake system maintenance" class="rounded-lg shadow-md w-full object-cover" style="aspect-ratio: 16/9;">`,
          actions: () => `<a href="/contact" class="inline-flex items-center text-scotia-blue hover:underline">
            Schedule Brake Service
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>`
        }}
      />
    </div>
  </section>
  
  <section class="mb-16 bg-gray-50 py-12 px-4 sm:px-6 rounded-lg">
    <h2 class="text-2xl font-semibold mb-8 text-center">Additional Maintenance Services</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each maintenanceServices as service}
        <ServiceCard 
          title={service.title}
          description={service.description}
          icon={service.icon}
          link="/contact"
        />
      {/each}
    </div>
  </section>
  
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-8 text-center">Related Services</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each relatedServices as service}
        <ServiceCard 
          title={service.title}
          description={service.description}
          link={service.link}
        />
      {/each}
    </div>
  </section>
  
  <div class="bg-scotia-blue text-white p-8 rounded-lg text-center">
    <h2 class="text-2xl font-bold mb-4">Ready to Schedule Your Maintenance?</h2>
    <p class="mb-6">Our certified technicians are ready to help keep your vehicle running at its best.</p>
    <div class="flex justify-center space-x-4">
      <a href="/contact" class="bg-white text-scotia-blue px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
        Schedule Service
      </a>
      <a href="tel:+15182801698" class="bg-transparent border-2 border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-scotia-blue transition-colors">
        Call Us
      </a>
    </div>
  </div>
</main>

<style>
  :global(:root) {
    --scotia-blue: #1A5DAD;
  }
</style>
