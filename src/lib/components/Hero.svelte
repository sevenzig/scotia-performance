<script lang="ts">
  import { businessHoursService } from '$lib/services/businessHours.js';
  import { Clock, MapPin } from '@lucide/svelte';
  
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

<svelte:options namespace="html" />

<section class="hero">
  <div class="container">
    <div class="info-card">
      <table class="info-table">
        <tbody>
          <tr>
            <td class="icon-cell"><Clock size={20} /></td>
            <td class="text-cell">{hoursText}</td>
            <td class="spacer-cell"></td>
            <td class="icon-cell"><MapPin size={20} /></td>
            <td class="text-cell"><a href="https://www.google.com/maps/search/?api=1&query=42.8288669,-73.9672425" class="address-link" style="color: white !important;">24 Sacandaga Rd, Scotia, NY 12302</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="hero-content">
      <h1>Scotia Performance Auto</h1>
      <h2>Professional Auto Service & Repair</h2>
      <p class="hero-description">Specializing in performance tuning, maintenance, and repairs for all makes and models. Our skilled technicians deliver exceptional service with transparency and integrity.</p>
      <a href="tel:+15182801698" class="cta-button">Schedule Service: (518) 280-1698</a>
    </div>
  </div>
</section>

<style>
  /* Use CSS variables instead of Sass variables */
  .hero {
    background-color: var(--scotia-blue);
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/garage.jpg');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 1rem 0;
    position: relative;
    height: 50vh;
    min-height: 50vh;
    max-height: 50vh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  
  /* Alternative selector to increase specificity */
  section.hero {
    height: 50vh;
    min-height: 50vh;
    max-height: 50vh;
  }
  
  @media (min-width: 768px) {
    .hero {
      padding: 1rem 0;
      height: 50vh;
      min-height: 50vh;
      max-height: 50vh;
    }
    
    section.hero {
      height: 50vh;
      min-height: 50vh;
      max-height: 50vh;
    }
  }
  
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .info-card {
    background-color: rgba(26, 93, 173, 0.1);
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    margin: 0 auto 1rem;
    max-width: fit-content;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (min-width: 768px) {
    .info-card {
      margin: 0 auto 1.5rem;
      padding: 0.75rem 1.25rem;
    }
  }
  
  .info-table {
    border-collapse: collapse;
    width: 100%;
  }
  
  .icon-cell {
    vertical-align: middle;
    padding: 0;
    width: 20px;
  }
  
  .text-cell {
    vertical-align: middle;
    padding: 0 0 0 0.75rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
  }
  
  .spacer-cell {
    width: 2rem;
  }
  
  .address-link,
  .address-link:visited,
  .address-link:link,
  a.address-link,
  a.address-link:visited,
  a.address-link:link,
  :where(.address-link),
  :where(.address-link:visited),
  :where(.address-link:link) {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    display: inline-block;
    -webkit-text-fill-color: white; /* For Safari */
  }
  
  .address-link:hover,
  a.address-link:hover,
  :where(.address-link:hover) {
    color: white;
    text-decoration: underline;
  }
  
  /* More specific selector to override browser defaults */
  .info-table .text-cell a[href*="google.com"] {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .info-table .text-cell a[href*="google.com"]:hover {
    color: white;
    text-decoration: underline;
  }
  
  .info-table :global(svg) {
    stroke: rgba(255, 255, 255, 0.9);
    display: block;
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
    margin-bottom: 0.25rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  @media (min-width: 768px) {
    .hero-content h1 {
      font-size: 2rem;
    }
  }
  
  .hero-content h2 {
    font-family: var(--font-primary, 'Montserrat', sans-serif);
    font-weight: 500;
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  @media (min-width: 768px) {
    .hero-content h2 {
      font-size: 1.35rem;
    }
  }
  
  .hero-description {
    margin: 0 auto 1rem;
    max-width: 600px;
    line-height: 1.5;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  @media (min-width: 768px) {
    .hero-description {
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
    min-width: 420px;
    width: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: visible;
    text-align: center;
    box-sizing: border-box;
  }
  
  /* Hide hero CTA on mobile, since we have the bottom CTA */
  @media (max-width: 768px) {
    .cta-button {
      display: none;
    }
  }
  
  .cta-button:hover {
    background-color: #b6313a;
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    .cta-button {
      min-width: 280px; 
      width: 100%;
      max-width: 100%;
      font-size: 1rem;
      padding: 0.75rem 1rem;
    }
  }
  
  /* Mobile responsive for info table */
  @media (max-width: 600px) {
    .info-table {
      width: 100%;
    }
    
    .info-table tr {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    
    .info-table td.spacer-cell {
      display: none;
    }
  }
</style> 