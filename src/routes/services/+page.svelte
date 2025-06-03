<script lang="ts">
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import HeroBanner from '$lib/components/HeroBanner.svelte';
  
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

<!-- Hero Banner Section -->
<HeroBanner 
  title="Our Services"
  subtitle="Comprehensive automotive services for performance, repair, and maintenance"
  description="Expert automotive services in Scotia, NY. From routine maintenance to performance upgrades and complex repairs, our experienced team delivers quality workmanship with transparency and integrity."
  buttonText="Schedule Service"
  buttonHref="tel:5182801698"
  backgroundImage="/images/garage.jpg"
/>

<section class="services-section">
  <div class="container">
    <!-- Services Grid -->
    <div class="services-grid">
      {#each services as service, index}
        <div class="service-card {index === 0 ? 'featured' : ''}">
          {#if index === 0}
            <span class="featured-badge">Most Popular</span>
          {/if}
          <ServiceCard 
            title={service.title}
            description={service.description}
            icon={service.icon}
            link={service.url}
          />
        </div>
      {/each}
    </div>

    <!-- Service Introduction -->
    <div class="service-intro">
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
    </div>

    <!-- Call to Action Section -->
    <div class="cta-section">
      <h3>Ready to Schedule Service?</h3>
      <p>Contact Scotia Performance today for professional automotive services you can trust.</p>
      <div class="cta-buttons">
        <a href="tel:5182801698" class="btn-primary">Call (518) 280-1698</a>
        <a href="https://www.google.com/maps/search/?api=1&query=24+Sacandaga+Rd,+Scotia,+NY+12302" class="btn-secondary">Visit Our Shop</a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Main Container */
  .container {
    width: 100%;
    margin: 0;
    padding: 0 1rem;
  }

  /* Services Section */
  .services-section {
    padding: 4rem 0;
    background-color: #f9fafb;
  }

  /* Services Grid */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
    align-items: start;
  }

  .service-card {
    position: relative;
    
    /* CSS Custom Properties for hover effects */
    --accent-color: var(--scotia-blue, #1e3a8a);
    --glow-color: rgba(30, 58, 138, 0.4);
    --shadow-color: rgba(30, 58, 138, 0.25);
  }

  .service-card.featured {
    border-color: var(--accent-color);
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(30, 58, 138, 0.1));
  }

  .featured-badge {
    position: absolute;
    top: -0.75rem;
    left: 1.5rem;
    background-color: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 3;
  }

  /* Service Introduction */
  .service-intro {
    max-width: 800px;
    margin: 0 auto 3rem;
    text-align: center;
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1e3a8a;
    }
    
    p {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 1rem;
      font-size: 1.125rem;
    }
  }

  /* Call to Action Section */
  .cta-section {
    text-align: center;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
  }

  .cta-section h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #1e3a8a;
  }

  .cta-section p {
    color: #6b7280;
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background-color: #1e3a8a;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  }

  .btn-primary:hover {
    background-color: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 58, 138, 0.3);
  }

  .btn-secondary {
    background: transparent;
    color: #1e3a8a;
    padding: 0.75rem 1.5rem;
    border: 2px solid #1e3a8a;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .btn-secondary:hover {
    background-color: #1e3a8a;
    color: white;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .btn-primary:hover {
      transform: none;
    }
  }

  /* Responsive adjustments */
  @media (min-width: 768px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }
  }

  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }
  }

  @media (min-width: 1200px) {
    .services-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .services-section {
      padding: 3rem 0;
    }

    .services-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      max-width: 280px;
    }
  }
</style> 