<script lang="ts">
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import AboutCard from '$lib/components/AboutCard.svelte';
  
  const services = [
    {
      id: 'performance',
      title: 'Performance & Tuning',
      description: 'Enhance your vehicle\'s power, efficiency, and driving dynamics with our professional performance tuning and upgrades.',
      icon: 'performance',
      url: '/services/performance'
    },
    {
      id: 'repair',
      title: 'Auto Repair',
      description: 'Professional auto repair services for all makes and models, ensuring your vehicle runs at its best.',
      icon: 'repair',
      url: '/services/repair'
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      description: 'Regular maintenance services to keep your vehicle reliable, efficient, and performing at its best.',
      icon: 'maintenance',
      url: '/services/maintenance'
    },
    {
      id: 'tires-wheels',
      title: 'Tires & Wheels',
      description: 'Complete tire and wheel services including sales, installation, balancing, and alignment.',
      icon: 'tires',
      url: '/services/tires-wheels'
    }
  ];
</script>

<svelte:head>
  <title>Automotive Services | Scotia Performance</title>
  <meta name="description" content="Scotia Performance offers comprehensive automotive services including performance tuning, auto repair, maintenance, and tire services in Scotia, NY." />
</svelte:head>

<div class="services-page">
  <div class="page-header">
    <h1>Our Services</h1>
    <p class="lead">Comprehensive automotive services for performance, repair, and maintenance</p>
  </div>

  <div class="service-categories">
    {#each services as service}
      <ServiceCard 
        title={service.title}
        description={service.description}
        icon={service.icon}
        link={service.url}
      />
    {/each}
  </div>
  
  <div class="service-intro mt-12">
    <h2>Expert Automotive Services in Scotia, NY</h2>
    <p>
      At Scotia Performance, we provide comprehensive automotive services ranging from routine maintenance 
      to performance upgrades and complex repairs. Our experienced team is equipped with the latest diagnostic 
      tools and knowledge to handle vehicles of all makes and models.
    </p>
    <p>
      Whether you need an oil change, engine tuning, brake repair, or a complete performance overhaul, 
      our dedicated technicians deliver quality workmanship and outstanding customer service.
    </p>
    
    <div class="contact-info mt-8">
      <p class="text-lg font-semibold">Ready to schedule service?</p>
      <p>Call us at <a href="tel:5182801698" class="text-scotia-red hover:underline">(518) 280-1698</a> or visit our shop at 24 Sacandaga Rd, Scotia, NY 12302</p>
    </div>
  </div>
  
  <div class="status-examples mt-12">
    <h2 class="text-center mb-8">Status Examples</h2>
    <div class="status-grid">
      <div>
        <h3 class="text-lg font-semibold mb-2">Current Status</h3>
        <AboutCard />
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Closed Example</h3>
        <AboutCard showClosedExample={true} />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../../scss/core/_mixins' as mix;
  @use '../../scss/core/_variables' as vars;
  
  .services-page {
    padding: vars.$spacing-6 0;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: vars.$spacing-8;
    
    h1 {
      font-size: vars.$font-size-3xl;
      color: vars.$scotia-red;
      margin-bottom: vars.$spacing-3;
      font-weight: vars.$font-weight-bold;
    }
    
    .lead {
      font-size: vars.$font-size-lg;
      color: vars.$scotia-gray;
      max-width: 700px;
      margin: 0 auto;
    }
  }
  
  .service-categories {
    display: grid;
    grid-template-columns: 1fr;
    gap: vars.$spacing-6;
    margin-bottom: vars.$spacing-8;
    
    @include mix.sm {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include mix.lg {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .service-intro {
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: vars.$font-size-2xl;
      margin-bottom: vars.$spacing-4;
      color: vars.$scotia-dark;
    }
    
    p {
      margin-bottom: vars.$spacing-4;
      line-height: 1.6;
    }
  }
  
  .contact-info {
    background-color: vars.$scotia-light;
    padding: vars.$spacing-6;
    border-radius: vars.$border-radius;
    text-align: center;
  }
  
  .status-examples {
    max-width: 1200px;
    margin: 0 auto;
    
    h2 {
      font-size: vars.$font-size-2xl;
      color: vars.$scotia-dark;
    }
  }
  
  .status-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: vars.$spacing-8;
    
    @include mix.md {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style> 