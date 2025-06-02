<script lang="ts">
  // Use $props rune for component properties
  const { 
    title, 
    subtitle, 
    description,
    buttonText = "Contact Us",
    buttonHref = "#contact",
    backgroundImage = '/images/garage.jpg'
  } = $props<{
    title: string;
    subtitle: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
    backgroundImage?: string;
  }>();
</script>

<style>
  .hero-banner {
    /* Core responsive height setup following responsive-height-constraints pattern */
    height: 60vh;
    min-height: 450px;
    max-height: 700px;
    
    /* Background and visual styling */
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), var(--bg-image);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    
    /* Layout properties */
    color: white;
    width: 100%;
    margin-bottom: 2rem;
    border-radius: 0;
    
    /* Essential for proper layout with height constraints */
    display: flex;
    align-items: center;
    overflow: hidden;
    
    /* Remove default padding since we're using flexbox centering */
    padding: 0;
  }

  /* Desktop - slightly taller following the pattern */
  @media (min-width: 768px) {
    .hero-banner {
      height: 65vh;
      /* min-height and max-height remain consistent across breakpoints */
      min-height: 450px;
      max-height: 700px;
    }
  }

  /* Inner hero content styling */
  .hero-banner .hero {
    width: 100%;
    padding: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-banner .hero-content {
    width: 100%;
    max-width: 48rem;
    margin: 0 auto;
  }

  /* Responsive adjustments for very small screens */
  @media (max-width: 480px) {
    .hero-banner {
      /* Slightly smaller on very small screens but maintain min-height */
      height: 55vh;
      min-height: 450px;
      max-height: 700px;
    }
    
    .hero-banner .hero {
      padding: 1.5rem 0;
    }
  }

  /* Handle very large screens */
  @media (min-width: 1440px) {
    .hero-banner {
      /* Cap at max-height for very large screens */
      height: 65vh;
      min-height: 450px;
      max-height: 700px;
    }
  }
</style>

<section class="hero-banner w-full" style="--bg-image: url('{backgroundImage}')">
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div class="divider bg-white h-0.5 opacity-30 mx-auto w-24 mb-4"></div>
        <p class="text-lg md:text-xl mb-4">{subtitle}</p>
        <p class="py-4 opacity-90 mb-6">{description}</p>
        <a href={buttonHref} class="btn btn-primary">{buttonText}</a>
      </div>
    </div>
  </div>
</section> 