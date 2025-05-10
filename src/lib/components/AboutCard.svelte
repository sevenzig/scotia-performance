<script lang="ts">
  import { businessHoursService } from '$lib/services/BusinessHoursService';
  
  // Get status directly from service instead of props
  const status = businessHoursService.getCurrentStatus();
</script>

<style>
  /* Follow single responsibility principle - style the component without global overrides */
  .about-card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .about-card__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--scotia-gray, #333);
    margin: 0;
    /* Clean approach without !important */
    border-bottom: none;
    text-decoration: none;
  }
  
  /* Use BEM modifiers for state variations */
  .about-card__status--open {
    background-color: rgba(16, 185, 129, 0.1);
  }
  
  .about-card__status--closed {
    background-color: rgba(239, 68, 68, 0.1);
  }

  .about-card__status {
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
  }
  
  .about-card__status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.25rem;
  }
  
  .about-card__status-indicator--open {
    background-color: #10B981;
  }
  
  .about-card__status-indicator--closed {
    background-color: #EF4444;
  }
  
  /* Keep specificity low */
  .about-card__text {
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .about-card__body {
    padding: 1rem;
  }

  .about-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .about-card__ratings {
    display: flex;
    align-items: center;
  }

  .about-card__stars {
    color: #FFB800;
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }

  .about-card__reviews {
    font-size: 0.875rem;
  }
</style>

<div class="about-card">
  <div class="about-card__body">
    <div class="about-card__header">
      <h2 class="about-card__title">About Scotia Performance</h2>
      <div class="about-card__ratings">
        <div class="about-card__stars">★★★★★</div>
        <span class="about-card__reviews">(26 reviews)</span>
      </div>
    </div>
    
    <div class="about-card__status about-card__status--{status.isOpen ? 'open' : 'closed'}">
      <span class="about-card__status-indicator about-card__status-indicator--{status.isOpen ? 'open' : 'closed'}"></span>
      <span class="font-medium">{status.message}</span>
    </div>
    
    <p class="about-card__text">Welcome to Scotia Performance! We're your hometown automotive tuning, performance, and repair specialists located at 24 Sacandaga Rd in Scotia, NY. Since establishing our shop in the Capital Region, we've been passionate about helping Schenectady County drivers get the most out of their vehicles, whether you drive a daily commuter or a weekend track car.</p>

    <p class="about-card__text">At our Scotia garage, we pride ourselves on combining old-school automotive expertise with cutting-edge performance technology. Our team specializes in everything from routine maintenance for local families to custom ECU tuning, forced induction installations, and comprehensive engine builds for enthusiasts throughout the Capital District. We're not just mechanics – we're gearheads who love what we do.</p>
    
    <p class="about-card__text">What sets us apart from other shops in the 12302 area is our commitment to transparency and education. We'll take the time to walk you through exactly what your vehicle needs, show you the components we're working with, and explain why certain performance modifications might benefit your specific driving goals. Your trust means everything to us, which is why we treat every vehicle like it's our own.</p>
    
    <p class="about-card__text">As Scotia residents ourselves, we're deeply connected to our Mohawk River community. We support local events across Schenectady County. Our roots in the Capital Region run deep, and we're proud to be your neighbors as well as your trusted automotive performance partner.</p>
  </div>
</div>
