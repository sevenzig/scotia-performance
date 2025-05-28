<script lang="ts">
  // Services data - could be made props or moved to a store if needed in the future
  const services = [
    {
      title: "AC Service",
      description: "AC system diagnosis, recharge, and repair. Keep your vehicle cool and comfortable."
    },
    {
      title: "Brake Service",
      description: "Complete brake system diagnostics, repair and replacement. Includes pads, rotors, calipers, and brake lines."
    },
    {
      title: "Engine Diagnostics & Repair",
      description: "Computer diagnostics, troubleshooting, and repair for all engine issues. Check engine light specialists."
    },
    {
      title: "Transmission Service",
      description: "Automatic and manual transmission repair, fluid services, and diagnostics for all makes and models."
    },
    {
      title: "Oil Changes",
      description: "Regular maintenance with conventional, synthetic blend, or full synthetic oil. Includes multi-point inspection."
    },
    {
      title: "Suspension Work",
      description: "Shocks, struts, alignment services, and complete suspension system repairs for a smoother ride."
    },
    {
      title: "Tire Service",
      description: "Tire rotation, balancing, repairs, and replacement. All major tire brands available."
    },
    {
      title: "State Inspections",
      description: "NYS certified inspection station. Quick and thorough vehicle safety inspections."
    },
    {
      title: "Electrical Diagnostics",
      description: "Complete electrical system diagnosis and repair. Battery, alternator, starter, and wiring issues resolved."
    }
  ];

  // Apply content visibility to services after the first row
  $effect(() => {
    if (typeof document !== 'undefined') {
      // Apply content visibility after initial items for better performance
      const applyContentVisibility = () => {
        const serviceCards = document.querySelectorAll('.service-card');
        const initialVisibleCount = 4; // First row of cards
        
        serviceCards.forEach((card, index) => {
          if (index >= initialVisibleCount) {
            (card as HTMLElement).style.contentVisibility = 'auto';
            (card as HTMLElement).style.height = '230px';
            (card as HTMLElement).style.minHeight = '230px';
            (card as HTMLElement).style.containIntrinsicSize = 'auto 230px';
          }
        });
      };
      
      // Use requestAnimationFrame for visual updates
      requestAnimationFrame(() => {
        requestAnimationFrame(applyContentVisibility);
      });
    }
  });
</script>

<section class="services" id="services">
  <div class="container">
    <h2>Maintenance & Repair Services</h2>
    <p class="section-subtitle">Professional automotive repair and maintenance services to keep your vehicle running safely and reliably.</p>
    
    <div class="services-grid">
      {#each services as service, index}
        <div class="service-card {index === 0 ? 'featured' : ''}">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          {#if index === 0}
            <span class="featured-badge">High Demand</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Main Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem;
  }
  
  /* Services Section */
  .services {
    padding: 4rem 0;
    background-color: white;
    overflow: visible;
  }
  
  .services h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e3a8a;
  }

  .section-subtitle {
    text-align: center;
    margin-bottom: 4rem;
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 3rem;
    padding-top: 1rem;
  }
  
  .service-card {
    background-color: white;
    padding: 2rem;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(30, 58, 138, 0.15);
    border-color: #1e3a8a;
  }

  .service-card.featured {
    border-color: #1e3a8a;
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(30, 58, 138, 0.1));
  }

  .featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #1e3a8a;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 10;
  }
  
  .service-card h3 {
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.25rem;
  }

  .service-card.featured h3 {
    color: #1e3a8a;
  }

  .service-card p {
    color: #374151;
    line-height: 1.6;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .service-card {
      transition: none;
    }

    .service-card:hover {
      transform: none;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .services {
      padding: 3rem 0;
    }

    .services h2 {
      font-size: 2rem;
    }

    .services-grid {
      grid-template-columns: 1fr;
      padding-top: 1rem;
    }
  }
</style> 