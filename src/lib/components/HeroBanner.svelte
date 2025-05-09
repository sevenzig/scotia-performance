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
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), var(--bg-image);
    background-size: cover;
    background-position: center;
    color: white;
    width: 100%;
    padding: 0;
    margin-bottom: 2rem;
    border-radius: 0;
  }
</style>

<section class="hero-banner w-full" style="--bg-image: url('{backgroundImage}')">
  <div class="hero py-12 md:py-16 lg:py-20">
    <div class="hero-content text-center">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div class="divider bg-white h-0.5 opacity-30"></div>
        <p class="text-lg md:text-xl">{subtitle}</p>
        <p class="py-6 opacity-90">{description}</p>
        <a href={buttonHref} class="btn btn-primary">{buttonText}</a>
      </div>
    </div>
  </div>
</section> 