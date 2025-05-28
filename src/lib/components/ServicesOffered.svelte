<script lang="ts">
  // Services data - could be made props or moved to a store if needed in the future
  const services = [
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
      title: "AC Service",
      description: "AC system diagnosis, recharge, and repair. Keep your vehicle cool and comfortable."
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
    <h2>Services We Offer</h2>
    <div class="services-grid">
      {#each services as service, index}
        <div class="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
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
    padding: 0 1rem;
  }
  
  /* Services Section */
  .services {
    padding: 3rem 0;
  }
  
  .services h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .service-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .service-card h3 {
    color: #1e3a8a;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .service-card {
      transition: none;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 