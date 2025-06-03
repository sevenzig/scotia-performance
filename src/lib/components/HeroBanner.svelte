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

<section class="hero-banner" style="--bg-image: url('{backgroundImage}')">
  <div class="container">
    <div class="hero-content">
      <div class="content-wrapper">
        <h1>{title}</h1>
        <div class="divider"></div>
        <h2>{subtitle}</h2>
        <p class="description">{description}</p>
        <a href={buttonHref} class="cta-button">{buttonText}</a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-banner {
    /* Full width breakout - ensure it spans entire viewport */
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    
    /* Background and visual styling - matching Hero component */
    background-color: var(--scotia-blue);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), var(--bg-image);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    
    /* Height constraints following responsive-height-constraints pattern */
    height: 60vh;
    min-height: 450px;
    max-height: 700px;
    
    /* Layout properties */
    color: white;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
  }

  @media (min-width: 768px) {
    .hero-banner {
      height: 65vh;
      min-height: 450px;
      max-height: 700px;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .container {
      padding: 0 2rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding: 0 3rem;
    }
  }

  .hero-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-wrapper {
    width: 100%;
    max-width: 48rem;
    text-align: center;
  }

  .hero-banner h1 {
    font-family: var(--font-primary, 'Montserrat', sans-serif);
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    .hero-banner h1 {
      font-size: 2.5rem;
    }
  }

  .divider {
    background: white;
    height: 2px;
    opacity: 0.3;
    margin: 0 auto 1rem;
    width: 6rem;
  }

  .hero-banner h2 {
    font-family: var(--font-primary, 'Montserrat', sans-serif);
    font-weight: 500;
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    .hero-banner h2 {
      font-size: 1.25rem;
    }
  }

  .description {
    margin: 0 auto 2rem;
    max-width: 600px;
    line-height: 1.6;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    .description {
      font-size: 1.1rem;
    }
  }

  .cta-button {
    display: inline-block;
    background-color: #cd353f;
    padding: 0.75rem 2rem;
    font-weight: 600;
    font-size: 1.125rem;
    color: white;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: background-color 0.3s, transform 0.2s;
    text-align: center;
    box-sizing: border-box;
  }

  .cta-button:hover {
    background-color: #b6313a;
    transform: translateY(-2px);
  }

  /* Responsive adjustments for small screens */
  @media (max-width: 480px) {
    .hero-banner {
      height: 55vh;
      min-height: 450px;
      max-height: 700px;
    }

    .container {
      padding: 0 0.75rem;
    }

    .hero-banner h1 {
      font-size: 1.75rem;
    }

    .hero-banner h2 {
      font-size: 1rem;
    }

    .description {
      font-size: 0.95rem;
    }

    .cta-button {
      width: 100%;
      max-width: 280px;
      font-size: 1rem;
      padding: 0.75rem 1rem;
    }
  }

  /* Handle very large screens */
  @media (min-width: 1440px) {
    .hero-banner {
      height: 65vh;
      min-height: 450px;
      max-height: 700px;
    }

    .container {
      padding: 0 4rem;
    }
  }

  /* Handle ultra-wide screens */
  @media (min-width: 1920px) {
    .container {
      max-width: 1400px;
      padding: 0 5rem;
    }
  }
</style> 