<script lang="ts">
  // Performance services data - based on search query analysis
  const services = [
    {
      title: "Performance Tuning",
      description: "Professional ECU tuning and calibration for maximum power and efficiency. Custom mapping for your specific vehicle and performance goals."
    },
    {
      title: "Dyno Tuning",
      description: "Precision dynamometer testing and tuning for optimal performance. All-wheel drive and hub dyno capabilities with detailed power analysis."
    },
    {
      title: "Engine Performance",
      description: "Complete engine modification and performance enhancement services. Turbo/supercharger installation and custom engine builds."
    },
    {
      title: "Speed Shop Services",
      description: "Complete aftermarket modifications and performance parts installation. Racing preparation and custom fabrication work."
    },
    {
      title: "Specialty Vehicle Tuning",
      description: "Brand-specific tuning expertise for Corvette, VW/Audi, Mercedes, Subaru, and other performance vehicles."
    },
    {
      title: "Automotive Repair",
      description: "Expert automotive repair and maintenance services. Diagnostic services and preventive maintenance for performance vehicles."
    }
  ];
</script>

<section class="performance-services" id="performance-services">
  <div class="container">
    <h2>Performance Services</h2>
    <p class="section-subtitle">Unleash your vehicle's true potential with Scotia Performance's comprehensive automotive tuning and performance services.</p>
    
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-value">15+</span>
        <span class="stat-label">Years Experience</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">2,500+</span>
        <span class="stat-label">Vehicles Tuned</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">75+</span>
        <span class="stat-label">HP Gained Avg</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">4.9★</span>
        <span class="stat-label">Customer Rating</span>
      </div>
    </div>

    <div class="services-grid">
      {#each services as service, index}
        <div class="performance-service-card {index === 0 ? 'featured' : ''}">
          {#if index === 0}
            <span class="featured-badge">Most Popular</span>
          {/if}
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      {/each}
    </div>

    <div class="cta-section">
      <h3>Ready to Boost Your Performance?</h3>
      <p>Contact Scotia Performance today for a consultation and discover what your vehicle can truly achieve.</p>
      <div class="cta-buttons">
        <button class="btn-primary">Schedule Consultation</button>
        <button class="btn-secondary">View Our Work</button>
      </div>
    </div>
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

  /* Performance Services Section */
  .performance-services {
    padding: 4rem 0;
    background-color: #f9fafb;
  }

  .performance-services h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e3a8a;
  }

  .section-subtitle {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Stats Bar */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }

  .stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #6b7280;
  }

  /* Services Grid */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .performance-service-card {
    background-color: white;
    padding: 2rem;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .performance-service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(30, 58, 138, 0.15);
    border-color: #1e3a8a;
  }

  .performance-service-card.featured {
    border-color: #1e3a8a;
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(30, 58, 138, 0.1));
  }

  .featured-badge {
    position: absolute;
    top: -0.75rem;
    left: 1.5rem;
    background-color: #1e3a8a;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .performance-service-card h3 {
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.25rem;
  }

  .performance-service-card.featured h3 {
    color: #1e3a8a;
  }

  .performance-service-card p {
    color: #374151;
    line-height: 1.6;
  }

  /* Call to Action Section */
  .cta-section {
    text-align: center;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .btn-secondary:hover {
    background-color: #1e3a8a;
    color: white;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .performance-service-card,
    .stat-item {
      transition: none;
    }

    .performance-service-card:hover,
    .stat-item:hover {
      transform: none;
    }

    .btn-primary:hover {
      transform: none;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .performance-services {
      padding: 3rem 0;
    }

    .performance-services h2 {
      font-size: 2rem;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .stats-bar {
      grid-template-columns: repeat(2, 1fr);
    }

    .stat-value {
      font-size: 1.5rem;
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

  @media (max-width: 480px) {
    .stats-bar {
      grid-template-columns: 1fr;
    }
  }
</style> 