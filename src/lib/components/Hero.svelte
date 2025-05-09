<script lang="ts">
  import { businessHoursService } from '$lib/services/businessHours.js';
  
  // Business hours state using $state rune
  let hoursText = $state(businessHoursService.getCurrentStatus().message);
  
  // Update business hours
  function updateBusinessHours() {
    hoursText = businessHoursService.getCurrentStatus().message;
  }
  
  // Set up interval to update the hours using $effect rune
  $effect(() => {
    updateBusinessHours();
    const interval = setInterval(updateBusinessHours, 60000);
    return () => clearInterval(interval);
  });
</script>

<section class="hero">
  <div class="container">
    <div class="info-card">
      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{hoursText}</span>
      </div>
      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <a href="https://www.google.com/maps/search/?api=1&query=42.8288669,-73.9672425">24 Sacandaga Rd, Scotia, NY 12302</a>
      </div>
    </div>
    <div class="hero-content">
      <h1>Scotia Performance Auto</h1>
      <h2>Professional Auto Service & Repair</h2>
      <a href="tel:+15183746111" class="cta-button">Schedule Service</a>
    </div>
  </div>
</section>

<style>
  /* Use CSS variables instead of Sass variables */
  .hero {
    background-color: var(--scotia-blue);
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 2.5rem 0;
    position: relative;
  }
  
  @media (min-width: 768px) {
    .hero {
      padding: 3rem 0;
    }
  }
  
  .info-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: rgba(26, 93, 173, 0.8);
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .info-card {
      flex-direction: row;
      gap: 1.5rem;
      position: absolute;
      top: 1rem;
      right: 1rem;
      margin-bottom: 0;
    }
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
  
  .info-item svg {
    flex-shrink: 0;
  }
  
  .info-item a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .info-item a:hover {
    color: #e6e6e6;
    text-decoration: underline;
  }
  
  .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero-content h1 {
    font-family: var(--font-primary, 'Montserrat', sans-serif);
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  @media (min-width: 768px) {
    .hero-content h1 {
      font-size: 1.875rem;
    }
  }
  
  .hero-content h2 {
    font-family: var(--font-primary, 'Montserrat', sans-serif);
    font-weight: 500;
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }
  
  @media (min-width: 768px) {
    .hero-content h2 {
      font-size: 1.25rem;
    }
  }
  
  .cta-button {
    display: inline-block;
    background-color: #cd353f;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1.125rem;
    color: white;
    text-decoration: none;
    border-radius: 0.375rem;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .cta-button:hover {
    background-color: #b6313a;
    transform: translateY(-2px);
  }
</style> 