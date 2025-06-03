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
  /* Component-specific reset using higher specificity instead of !important */
  .hero-banner-wrapper {
    /* Reset any inherited constraints */
    margin: 0;
    padding: 0;
    width: 100vw;
    position: relative;
    
    /* Break out of all parent containers */
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    
    /* Ensure no overflow issues */
    overflow-x: hidden;
  }

  .hero-banner {
    /* Core responsive height setup following responsive-height-constraints pattern */
    height: 60vh;
    min-height: 450px;
    max-height: 700px;
    
    /* Full viewport width - no breakout needed here since wrapper handles it */
    width: 100%;
    margin: 0;
    padding: 0;
    
    /* Background and visual styling */
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), var(--bg-image);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    
    /* Layout properties */
    color: white;
    border-radius: 0;
    
    /* Essential for proper layout with height constraints */
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  /* Desktop - slightly taller following the pattern */
  @media (min-width: 768px) {
    .hero-banner {
      height: 65vh;
      /* min-height and max-height remain consistent across breakpoints */
      min-height: 350px;
      max-height: 500px;
    }
  }

  /* Component-specific inner container with high specificity */
  .hero-banner-wrapper .hero-banner .hero {
    width: 100%;
    max-width: 1200px; /* Match other sections' max-width */
    margin: 0 auto; /* Center the content */
    
    /* Component-specific padding using high specificity */
    padding: 2rem 1rem; /* Mobile padding */
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Ensure proper box sizing */
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .hero-banner-wrapper .hero-banner .hero {
      padding: 2rem 2rem; /* Desktop padding */
    }
  }

  @media (min-width: 1024px) {
    .hero-banner-wrapper .hero-banner .hero {
      padding: 2rem 3rem; /* Large screen padding */
    }
  }

  .hero-banner-wrapper .hero-banner .hero .hero-content {
    width: 100%;
    max-width: 48rem;
    margin: 0 auto;
    
    /* Ensure content doesn't inherit any global padding */
    padding: 0;
  }

  /* Responsive adjustments for very small screens */
  @media (max-width: 480px) {
    .hero-banner {
      /* Slightly smaller on very small screens but maintain min-height */
      height: 55vh;
      min-height: 450px;
      max-height: 700px;
    }
    
    .hero-banner-wrapper .hero-banner .hero {
      padding: 1.5rem 0.75rem; /* Minimal but sufficient padding for small screens */
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
    
    .hero-banner-wrapper .hero-banner .hero {
      padding: 2rem 4rem; /* Extra padding for very large screens */
    }
  }

  /* Handle ultra-wide screens */
  @media (min-width: 1920px) {
    .hero-banner-wrapper .hero-banner .hero {
      max-width: 1400px; /* Larger max-width for ultra-wide screens */
      padding: 2rem 5rem;
    }
  }
</style>

<div class="hero-banner-wrapper">
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
</div> 