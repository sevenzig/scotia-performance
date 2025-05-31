<script lang="ts">
  import ManufacturerCarousel from './ManufacturerCarousel.svelte';
</script>

<section class="homepage-manufacturers" id="manufacturers">
  <div class="container">
    <h2>Manufacturers Serviced</h2>
    <p class="section-subtitle"></p>
    
    <ManufacturerCarousel
  imageWidth={200}
  imageHeight={200}
  autoAdvanceInterval={2500}
  transitionDuration={800}
  ariaLabel="Automotive brand partners we service"
/>
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

  /* Homepage Manufacturers Section */
  .homepage-manufacturers {
    padding: 4rem 0;
    background-color: #f9fafb;
  }

  .homepage-manufacturers h2 {
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

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .homepage-manufacturers {
      padding: 3rem 0;
    }

    .homepage-manufacturers h2 {
      font-size: 2rem;
    }
  }
</style> 