<script lang="ts">
  import type { BusinessHoursService } from '$lib/services/BusinessHoursService';
  import BusinessHoursServiceImpl from '$lib/services/BusinessHoursService';
  import { onMount } from 'svelte';
  
  // State
  let isServicesMenuOpen = false;
  
  // Business hours state
  let hoursText = '';
  
  let megaMenu;
  let toggleButton;
  
  // Toggle services mega menu
  function toggleServicesMenu() {
    isServicesMenuOpen = !isServicesMenuOpen;
    console.log('Desktop mega menu toggled:', isServicesMenuOpen);
  }
  
  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (megaMenu && toggleButton) {
      if (!megaMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        isServicesMenuOpen = false;
        console.log('Desktop mega menu closed by outside click');
      }
    }
  }
  
  // Update business hours
  function updateBusinessHours() {
    hoursText = BusinessHoursServiceImpl.getHoursMessage();
  }
  
  onMount(() => {
    console.log('Desktop nav mounted');
    
    // Initial update of hours
    updateBusinessHours();
    
    // Set up interval to update hours
    const interval = setInterval(updateBusinessHours, 60000);
    
    // Set up click listener
    document.addEventListener('click', handleClickOutside);
    
    // Clean up on component destruction
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearInterval(interval);
    };
  });
</script>

<nav class="desktop-nav" aria-label="Main Navigation">
  <div class="services-menu-container">
    <button 
      class="nav-link services-toggle" 
      aria-expanded={isServicesMenuOpen} 
      aria-controls="services-mega-menu"
      aria-label={isServicesMenuOpen ? 'Close Services Menu' : 'Open Services Menu'}
      on:click={toggleServicesMenu}
      bind:this={toggleButton}
    >
      Automotive Services
    </button>

    <div 
      id="services-mega-menu" 
      class="mega-menu {isServicesMenuOpen ? 'open' : ''}" 
      role="menu"
      bind:this={megaMenu}
    >
      <!-- Menu Content -->
      <div class="mega-menu-content">
        <!-- Performance & Tuning -->
        <div class="menu-section">
          <h3><a href="/services/performance">Performance & Tuning</a></h3>
          <ul>
            <li><a href="/services/performance/ecu-tuning">ECU Tuning</a></li>
            <li><a href="/services/performance/dyno-tuning">Dyno Tuning</a></li>
            <li><a href="/services/performance/exhaust-systems">Exhaust Systems</a></li>
            <li><a href="/services/performance/forced-induction">Forced Induction</a></li>
            <li><a href="/services/performance/engine-building">Engine Building</a></li>
          </ul>
        </div>

        <!-- Auto Repair -->
        <div class="menu-section">
          <h3><a href="/services/repair">Auto Repair</a></h3>
          <ul>
            <li><a href="/services/repair/brake-repair">Brake Repair</a></li>
            <li><a href="/services/repair/engine-repair">Engine Repair</a></li>
            <li><a href="/services/repair/transmission-repair">Transmission Repair</a></li>
            <li><a href="/services/repair/ac-service">AC Service</a></li>
            <li><a href="/services/repair/electrical-repair">Electrical Repair</a></li>
          </ul>
        </div>

        <!-- Maintenance -->
        <div class="menu-section">
          <h3><a href="/services/maintenance">Maintenance</a></h3>
          <ul>
            <li><a href="/services/maintenance/oil-change">Oil Change Services</a></li>
            <li><a href="/services/maintenance/brake-maintenance">Brake Maintenance</a></li>
            <li><a href="/services/maintenance/scheduled-maintenance">Scheduled Maintenance</a></li>
            <li><a href="/services/maintenance/state-inspection">State Inspection</a></li>
            <li><a href="/services/maintenance/wheel-alignment">Wheel Alignment</a></li>
          </ul>
        </div>

        <!-- Tires & Wheels -->
        <div class="menu-section">
          <h3><a href="/services/tires-wheels">Tires & Wheels</a></h3>
          <ul>
            <li><a href="/services/tires-wheels/tire-sales">Tire Sales</a></li>
            <li><a href="/services/tires-wheels/wheel-alignment">Wheel Alignment</a></li>
            <li><a href="/services/tires-wheels/tire-rotation">Tire Rotation</a></li>
            <li><a href="/services/tires-wheels/wheel-balancing">Wheel Balancing</a></li>
            <li><a href="/services/tires-wheels/tpms-service">TPMS Service</a></li>
          </ul>
        </div>
      </div>

      <!-- Menu Footer -->
      <div class="mega-menu-footer">
        <div class="info-card">
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="text">{hoursText}</span>
          </div>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <a href="https://www.google.com/maps/search/?api=1&query=42.8288669,-73.9672425" class="text address-link">24 Sacandaga Rd, Scotia</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Rest of nav items -->
  <a href="/about" class="nav-link">About</a>
  <a href="/gallery" class="nav-link">Gallery</a>
  <a href="tel:5183746111" class="header-cta">Call Us</a>
</nav>

<style lang="scss">
  @use '../../scss/core/_mixins' as *;
  @use '../styles/variables.scss' as *;
  
  .desktop-nav {
    display: none;
    align-items: center;
    
    @include md {
      display: flex;
    }
    
    .nav-link {
      display: inline-block;
      padding: $spacing-2 $spacing-3;
      color: $scotia-gray;
      text-decoration: none;
      font-weight: $font-weight-medium;
      transition: color $transition-normal;
      position: relative;
      
      &:hover {
        color: $scotia-blue;
      }
      
      &.services-toggle {
        background: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        padding: $spacing-2 $spacing-3;
        cursor: pointer;
        font-weight: $font-weight-medium;
        
        &::after {
          content: "▼";
          font-size: 0.6em;
          display: inline-block;
          margin-left: $spacing-1;
          transition: transform $transition-normal;
        }
        
        &[aria-expanded="true"]::after {
          transform: rotate(180deg);
        }
      }
    }
    
    .header-cta {
      background-color: $scotia-red;
      color: $white;
      padding: $spacing-2 $spacing-4;
      border-radius: $border-radius-md;
      text-decoration: none;
      font-weight: $font-weight-semibold;
      margin-left: $spacing-3;
      transition: background-color $transition-normal;
      
      &:hover {
        background-color: color.adjust($scotia-red, $lightness: -10%);
      }
    }
  }
  
  .services-menu-container {
    position: relative;
  }
  
  .mega-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: $white;
    box-shadow: 0 4px 12px rgba($black, 0.15);
    border-radius: $border-radius-md;
    width: 800px;
    max-width: calc(100vw - 40px);
    z-index: 150;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all $transition-normal;
    
    &.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    &-content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: $spacing-4;
      padding: $spacing-6;
    }
    
    &-footer {
      padding: $spacing-4 $spacing-6;
      background-color: lighten($scotia-blue, 65%);
      border-bottom-left-radius: $border-radius-md;
      border-bottom-right-radius: $border-radius-md;
    }
  }
  
  .menu-section {
    h3 {
      font-family: $font-primary;
      font-weight: $font-weight-semibold;
      font-size: $font-size-base;
      margin-bottom: $spacing-2;
      
      a {
        color: $scotia-blue;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      
      li {
        margin-bottom: $spacing-1;
        
        a {
          color: $scotia-gray;
          text-decoration: none;
          font-size: $font-size-sm;
          
          &:hover {
            color: $scotia-blue;
            text-decoration: underline;
          }
          
          &.see-all {
            font-style: italic;
            font-size: $font-size-sm;
            color: lighten($scotia-gray, 15%);
          }
        }
      }
    }
  }
  
  .info-card {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
    
    @include md {
      flex-direction: row;
      gap: $spacing-8;
    }
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    font-size: $font-size-sm;
    color: $scotia-gray;
    
    svg {
      flex-shrink: 0;
    }
    
    a {
      color: $scotia-gray;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style> 