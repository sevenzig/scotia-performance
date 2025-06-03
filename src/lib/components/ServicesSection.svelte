<script lang="ts">
  import ServiceCard from './ServiceCard.svelte';
  
  // Services data
  const services = [
    {
      title: 'Brake Service',
      description: 'Complete brake system diagnostics, repair and replacement. Includes pads, rotors, calipers, and brake lines.',
      link: '/services/brake-repair',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>'
    },
    {
      title: 'Engine Repair',
      description: 'Comprehensive engine diagnostics and repair services. We handle everything from minor repairs to complete rebuilds.',
      link: '/services/engine-repair',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6.45V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4.45"></path><path d="M18 6.45V2a1 1 0 0 0-1-1l-7 5"></path><path d="M9 10 2 4.5V14l7 5.5"></path><path d="m22 4.5-7 5.5"></path><path d="m22 14-7-5.5"></path><path d="M14 22V9"></path></svg>'
    },
    {
      title: 'Transmission Service',
      description: 'Transmission maintenance, fluid service, and repairs for all types of automatic and manual transmissions.',
      link: '/services/transmission-repair',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v12"></path><path d="M18 9v12"></path><path d="M4 9h16"></path><path d="M4 15h16"></path><path d="M8 21h8"></path><path d="M7 3h10"></path><path d="M5 3a2 2 0 0 0-2 2v4h18V5a2 2 0 0 0-2-2h-2"></path></svg>'
    },
    {
      title: 'Performance Tuning',
      description: 'Engine tuning, ECU programming, performance diagnostics, and performance upgrades for maximum power and efficiency.',
      link: '/services/performance/ecu-tuning',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
    },
    {
      title: 'Oil Change',
      description: 'Regular oil changes using high-quality oils and filters. Includes multi-point inspection with every service.',
      link: '/services/maintenance/oil-change',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2v5h-5"></path><path d="M21 6a2 2 0 0 1 0 4H3a2 2 0 0 1 0-4"></path><path d="M14 12.4V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-5.6l-3.6 1.8a1 1 0 0 1-1.4-.9v-2.3a1 1 0 0 1 .5-.9L12 7l8.5 3.1a1 1 0 0 1 .5.9v2.3a1 1 0 0 1-1.4.9L16 12.4"></path></svg>'
    },
    {
      title: 'Tire Services',
      description: 'Tire sales, mounting, balancing, rotation, and repairs. We carry a wide selection of quality tires.',
      link: '/services/tires-wheels/tire-sales',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>'
    }
  ];
</script>

<section class="services-section" id="services">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title">Services We Offer</h2>
      <p class="section__subtitle">Our skilled technicians provide a wide range of automotive services using the latest technology and quality parts.</p>
    </div>
    
    <div class="services-grid">
      {#each services as service}
        <ServiceCard 
          title={service.title} 
          description={service.description} 
          link={service.link} 
          icon={service.icon} 
        />
      {/each}
    </div>
    
    <div class="services-cta">
      <a href="/services" class="btn btn-primary">View All Services</a>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../../scss/core/mixins' as *;
  @use '../../scss/core/variables' as *;
  
  .services-section {
    padding: $spacing-8 0;
    background-color: $light-gray;
    
    @include md {
      padding: $spacing-10 0;
    }
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-4;
    margin-bottom: $spacing-6;
    
    @include sm {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include lg {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .services-cta {
    text-align: center;
    margin-top: $spacing-6;
  }
</style> 