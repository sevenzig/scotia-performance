<script lang="ts">
  const { title, subtitle, backgroundImage = '/images/service-default-bg.jpg' } = $props<{
    title: string;
    subtitle?: string;
    backgroundImage?: string;
  }>();
</script>

<div class="service-hero" style="background-image: url({backgroundImage})">
  <div class="overlay"></div>
  <div class="container mx-auto px-4 py-16 relative z-10">
    <div class="hero-content">
      <h1>{title}</h1>
      {#if subtitle}
        <p class="subtitle">{subtitle}</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .service-hero {
    position: relative;
    background-size: cover;
    background-position: center;
    color: white;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(26, 32, 44, 0.85), rgba(26, 32, 44, 0.65));
    z-index: 1;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero-content h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .subtitle {
    font-size: 1.125rem;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  @media (min-width: 768px) {
    .hero-content h1 {
      font-size: 3rem;
    }
    
    .subtitle {
      font-size: 1.25rem;
    }
  }
</style> 