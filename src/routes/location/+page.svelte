<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { companyInfo } from '$lib/data/companyInfo';
    import { locationService, nearbyAreas, type UserLocation, type DirectionInfo } from '$lib/services/location';
    import { MapPin, Phone, Clock, Navigation, Car, Timer, Route } from '@lucide/svelte';
    import Button from '$lib/components/Button.svelte';
    import CallToAction from '$lib/components/CallToAction.svelte';
    
    // State variables
    let userLocation: UserLocation | null = $state(null);
    let directionInfo: DirectionInfo | null = $state(null);
    let locationError: string | null = $state(null);
    let isLoadingLocation = $state(false);
    let showLocationPrompt = $state(true);
    let userCity: string | null = $state(null);
  
    // SEO data for this page
    const pageSEO = {
      title: `Directions to ${companyInfo.name} | Scotia, NY Auto Repair`,
      description: `Get directions to ${companyInfo.name} at ${companyInfo.address.full}. Located in Scotia, NY serving Schenectady, Amsterdam, Rotterdam and surrounding areas.`,
      keywords: 'directions Scotia Performance, auto repair Scotia NY location, how to get to Scotia Performance, automotive service directions',
      canonicalUrl: `${companyInfo.website.baseUrl}/location`,
      ogImage: '/images/location-og.jpg',
      lastModified: '2025-05-28'
    };
  
    // Get user's location and calculate directions
    async function getUserLocationAndDirections() {
      if (!browser) return;
      
      isLoadingLocation = true;
      locationError = null;
  
      try {
        const location = await locationService.getUserLocation();
        
        if (location) {
          userLocation = location;
          showLocationPrompt = false;
          
          // Get directions
          const directions = await locationService.getDirectionsFromUserLocation(location);
          if (directions) {
            directionInfo = directions;
          }
  
          // Get user's city
          const city = await locationService.getUserCity(location);
          if (city) {
            userCity = city;
          }
        } else {
          locationError = "Unable to get your location. Please enable location services or check directions manually below.";
        }
      } catch (error) {
        locationError = "Error getting location. Please try again or use the manual directions below.";
        console.error('Location error:', error);
      } finally {
        isLoadingLocation = false;
      }
    }
  
    // Detect if user is on iOS for Apple Maps link
    function isIOS(): boolean {
      if (!browser) return false;
      return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
  
    onMount(() => {
      // Auto-request location if user hasn't denied it before
      const hasAskedBefore = localStorage.getItem('location-asked');
      if (!hasAskedBefore) {
        // Small delay to let page load
        setTimeout(() => {
          localStorage.setItem('location-asked', 'true');
        }, 1000);
      }
    });
  </script>
  
  <svelte:head>
    <title>{pageSEO.title}</title>
    <meta name="description" content={pageSEO.description} />
    <meta name="keywords" content={pageSEO.keywords} />
    <link rel="canonical" href={pageSEO.canonicalUrl} />
    
    <meta property="og:title" content={pageSEO.title} />
    <meta property="og:description" content={pageSEO.description} />
    <meta property="og:url" content={pageSEO.canonicalUrl} />
    
    <!-- Local Business Schema -->
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AutomotiveBusiness",
        "name": companyInfo.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": companyInfo.address.street,
          "addressLocality": companyInfo.address.city,
          "addressRegion": companyInfo.address.state,
          "postalCode": companyInfo.address.zip,
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": companyInfo.address.coordinates.latitude,
          "longitude": companyInfo.address.coordinates.longitude
        },
        "url": companyInfo.website.baseUrl,
        "telephone": companyInfo.phone.formatted
      })}
    </script>
  </svelte:head>
  
  <div class="location-page">
    <!-- Hero Section -->
    <section class="location-hero">
      <div class="container">
        <h2>Visit {companyInfo.name}</h2>
        <p class="section-subtitle">Professional auto repair and performance services in Scotia, NY. Get directions and contact information.</p>
        
        <!-- Location Permission Prompt -->
        {#if showLocationPrompt && !userLocation && !locationError}
          <div class="location-prompt">
            <div class="prompt-card">
              <div class="icon-container">
                <Navigation size={32} color="#1e3a8a" />
              </div>
              <h3>Get Personalized Directions</h3>
              <p>Allow location access to see driving time and directions from your current location.</p>
              <div class="prompt-actions">
                <button 
                  class="btn btn-primary btn-lg" 
                  onclick={getUserLocationAndDirections}
                  disabled={isLoadingLocation}
                >
                  {#if isLoadingLocation}
                    <span class="loading-spinner"></span>
                    Getting Location...
                  {:else}
                    <MapPin size={18} />
                    Get My Directions
                  {/if}
                </button>
                <button 
                  class="btn btn-outline btn-lg" 
                  onclick={() => showLocationPrompt = false}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        {/if}
  
        <!-- User Location Results -->
        {#if userLocation && directionInfo}
          <div class="user-directions">
            <div class="direction-card featured">
              <div class="featured-badge">Your Location</div>
              <div class="icon-container">
                <Navigation size={32} color="#1e3a8a" />
              </div>
              <h3>
                {directionInfo.duration} from your location
                {#if userCity}
                  <span class="user-city">({userCity})</span>
                {/if}
              </h3>
              <p class="distance">
                <Route size={16} />
                {directionInfo.distance} • {directionInfo.route}
              </p>
              
              <div class="direction-actions">
                <a 
                  href={locationService.generateDirectionsUrl(userLocation.latitude, userLocation.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-md"
                >
                  <MapPin size={18} />
                  Open in Google Maps
                </a>
                
                {#if isIOS()}
                  <a 
                    href={locationService.generateAppleMapsUrl(userLocation.latitude, userLocation.longitude)}
                    class="btn btn-outline btn-md"
                  >
                    <MapPin size={18} />
                    Open in Apple Maps
                  </a>
                {/if}
              </div>
            </div>
          </div>
        {/if}
  
        <!-- Location Error -->
        {#if locationError}
          <div class="location-error">
            <p>⚠️ {locationError}</p>
            <button class="btn btn-primary" onclick={getUserLocationAndDirections}>
              Try Again
            </button>
          </div>
        {/if}
      </div>
    </section>
  
    <!-- Contact Info Section -->
    <section class="contact-info">
      <div class="container">
        <h2>Contact Information</h2>
        <div class="contact-grid">
          <div class="contact-card">
            <div class="icon-container">
              <MapPin size={32} color="#1e3a8a" />
            </div>
            <h3>Address</h3>
            <address>
              {companyInfo.address.street}<br>
              {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
            </address>
            <a 
              href="https://maps.google.com/?q={encodeURIComponent(companyInfo.address.full)}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline btn-sm"
            >
              <MapPin size={16} />
              View on Google Maps
            </a>
          </div>
  
          <div class="contact-card">
            <div class="icon-container">
              <Phone size={32} color="#1e3a8a" />
            </div>
            <h3>Phone</h3>
            <a href={companyInfo.phone.link} class="phone-link">
              {companyInfo.phone.formatted}
            </a>
            <p class="phone-note">Call for appointments or emergency service</p>
          </div>
  
          <div class="contact-card">
            <div class="icon-container">
              <Clock size={32} color="#1e3a8a" />
            </div>
            <h3>Hours</h3>
            <div class="hours">
              <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
              <p><strong>Saturday:</strong> By Appointment</p>
              <p><strong>Sunday:</strong> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Directions from Nearby Areas -->
    <section class="nearby-directions">
      <div class="container">
        <h2>Directions from Nearby Areas</h2>
        <p class="section-subtitle">Easy access from surrounding communities in the Capital Region</p>
        <div class="directions-grid">
          {#each nearbyAreas as area, index}
            <div class="direction-card {index === 0 ? 'featured' : ''}">
              {#if index === 0}
                <div class="featured-badge">Closest</div>
              {/if}
              <div class="icon-container">
                <Car size={24} color="#1e3a8a" />
              </div>
              <h3>{area.name}</h3>
              <div class="direction-details">
                <div class="time-distance">
                  <span class="time">
                    <Timer size={16} />
                    {area.estimatedTime}
                  </span>
                  <span class="distance">
                    <Route size={16} />
                    {area.distance}
                  </span>
                </div>
                <p class="directions">{area.directions}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2>Find Us on the Map</h2>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2958.123456789!2d-73.9532!3d42.8264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z{encodeURIComponent(companyInfo.address.full)}!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Scotia Performance Auto Location Map"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <CallToAction 
      title="Need Directions or Have Questions?"
      description="Contact Scotia Performance today for directions, appointments, or any questions about our automotive services."
      buttonText="Call Now"
    />
  </div>
  
  <style>
    /* Main Container */
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Location Page */
    .location-page {
      background-color: #f9fafb;
    }

    /* Hero Section */
    .location-hero {
      padding: 4rem 0;
      text-align: center;
    }

    .location-hero h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
      color: #1e3a8a;
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto 3rem auto;
      line-height: 1.6;
    }

    /* Icon Container */
    .icon-container {
      width: 48px;
      height: 48px;
      margin: 0 auto 1rem auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(30, 58, 138, 0.1);
      border-radius: 50%;
    }

    /* Location Prompt */
    .location-prompt {
      margin-top: 2rem;
    }

    .prompt-card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 0 auto;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .prompt-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .prompt-card h3 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      color: #1e3a8a;
      font-weight: 600;
    }

    .prompt-card p {
      color: #6b7280;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .prompt-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Button Styles - matching the Button component */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      border: none;
      outline: none;
      text-decoration: none;
      font-family: inherit;
    }
    
    .btn-primary {
      background-color: #1e3a8a;
      color: white;
      border: 2px solid #1e3a8a;
    }
    
    .btn-primary:hover {
      background-color: #1e40af;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(30, 58, 138, 0.3);
    }
    
    .btn-outline {
      background: transparent;
      color: #1e3a8a;
      border: 2px solid #1e3a8a;
    }
    
    .btn-outline:hover {
      background-color: #1e3a8a;
      color: white;
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    
    .btn-md {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    
    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-left-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* User Directions */
    .user-directions {
      margin-top: 2rem;
    }

    /* Direction Cards */
    .direction-card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      position: relative;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      margin-bottom: 1rem;
    }

    .direction-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(30, 58, 138, 0.15);
      border-color: #1e3a8a;
    }

    .direction-card.featured {
      border-color: #1e3a8a;
      background: linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(30, 58, 138, 0.1));
    }

    .featured-badge {
      position: absolute;
      top: -0.75rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #1e3a8a;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .direction-card h3 {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
      color: #1e3a8a;
      font-weight: 600;
    }

    .user-city {
      font-size: 1rem;
      opacity: 0.8;
      font-weight: normal;
    }

    .distance {
      color: #6b7280;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .direction-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Location Error */
    .location-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #dc2626;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
    }

    /* Contact Info Section */
    .contact-info {
      padding: 4rem 0;
    }

    .contact-info h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
      color: #1e3a8a;
      font-weight: 700;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .contact-card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .contact-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .contact-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #1e3a8a;
      font-weight: 600;
    }

    .phone-link {
      font-size: 1.5rem;
      color: #1e3a8a;
      text-decoration: none;
      font-weight: 600;
    }

    .phone-link:hover {
      text-decoration: underline;
    }

    .phone-note {
      color: #6b7280;
      margin-top: 0.5rem;
    }

    address {
      font-style: normal;
      color: #374151;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .hours p {
      margin-bottom: 0.5rem;
      color: #374151;
    }

    /* Nearby Directions Section */
    .nearby-directions {
      padding: 4rem 0;
      background: white;
    }

    .nearby-directions h2 {
      text-align: center;
      margin-bottom: 1rem;
      font-size: 2.5rem;
      color: #1e3a8a;
      font-weight: 700;
    }

    .directions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }

    .direction-details {
      text-align: left;
    }

    .time-distance {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-weight: 600;
      color: #1e3a8a;
    }

    .time, .distance {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .directions {
      line-height: 1.6;
      color: #6b7280;
    }

    /* Map Section */
    .map-section {
      padding: 4rem 0;
    }

    .map-section h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2.5rem;
      color: #1e3a8a;
      font-weight: 700;
    }

    .map-container {
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    /* Respect reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
      .direction-card,
      .contact-card,
      .prompt-card {
        transition: none;
      }

      .direction-card:hover,
      .contact-card:hover,
      .prompt-card:hover {
        transform: none;
      }

      .btn-primary:hover {
        transform: none;
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .location-hero h2 {
        font-size: 2rem;
      }

      .prompt-actions {
        flex-direction: column;
      }

      .direction-actions {
        flex-direction: column;
      }

      .time-distance {
        flex-direction: column;
        gap: 0.5rem;
      }

      .directions-grid {
        grid-template-columns: 1fr;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        justify-content: center;
      }
    }
  </style>