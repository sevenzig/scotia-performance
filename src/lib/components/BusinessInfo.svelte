<script lang="ts">
  import { MapPin, Phone, Mail } from '@lucide/svelte';
  import { onMount } from 'svelte';

  // Business info with customizable content using Svelte 5 runes
  type BusinessHours = {
    day: string;
    hours: string;
  };

  const {
    title = "Visit Us",
    address,
    phone,
    email,
    businessHours
  } = $props<{
    title?: string;
    address: string;
    phone: string;
    email: string;
    businessHours: BusinessHours[];
  }>();

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<style>
  .contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    margin-right: 0.5rem;
    color: var(--scotia-blue, #0066cc);
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .contact-item a {
    transition: color 0.2s ease;
  }

  .contact-item a:hover {
    color: var(--scotia-blue-dark, #004c99);
    text-decoration: underline;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--scotia-gray-dark, #333);
    white-space: nowrap;
  }

  .info-section {
    margin-bottom: 2rem;
  }

  /* Fixed width table for business hours */
  .hours-wrapper {
    width: 100%;
  }

  .business-hours {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    table-layout: fixed;
  }

  .business-hours tr td {
    padding: 0.75rem;
    border-radius: 0.25rem;
    white-space: nowrap;
  }

  .business-hours tr:nth-child(odd) td {
    background-color: var(--scotia-gray-light, #f5f5f5);
  }

  .business-hours .day-column {
    width: 130px;
    font-weight: 500;
  }

  .business-hours .hours-column {
    width: 200px;
  }

  .card-container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }
  
  /* Remove responsive adjustments to maintain fixed widths */
  @media (max-width: 1279px) {
    .business-hours .day-column {
      width: 130px;
    }
    
    .business-hours .hours-column {
      width: 200px;
    }
  }

  @media (max-width: 767px) {
    .business-hours .day-column {
      width: 130px;
    }
    
    .business-hours .hours-column {
      width: 200px;
    }
  }
</style>

<section id="contact" class="py-12 mb-10">
  <div class="card-container">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body p-8">
        <h2 class="card-title text-3xl mb-6 text-center md:text-left">{title}</h2>
        
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div>
            <div class="info-section">
              <h3 class="section-title">Location</h3>
              <div class="contact-item">
                <div class="contact-icon">
                  {#if mounted}
                    <MapPin size={24} />
                  {/if}
                </div>
                <span>{address}</span>
              </div>
            </div>

            <div class="info-section">
              <h3 class="section-title">Contact</h3>
              <div class="contact-item">
                <div class="contact-icon">
                  {#if mounted}
                    <Phone size={24} />
                  {/if}
                </div>
                <a href="tel:{phone.replace(/\D/g, '')}" class="hover:underline">{phone}</a>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  {#if mounted}
                    <Mail size={24} />
                  {/if}
                </div>
                <a href="mailto:{email}" class="hover:underline">{email}</a>
              </div>
            </div>
          </div>

          <div>
            <h3 class="section-title">Business Hours</h3>
            <div class="hours-wrapper">
              <table class="business-hours">
                <tbody>
                  {#each businessHours as { day, hours }}
                    <tr>
                      <td class="day-column">{day}</td>
                      <td class="hours-column">{hours}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 