<script lang="ts">
  import { onMount } from 'svelte';
  import type { BusinessHoursService } from '$lib/services/BusinessHoursService';
  import BusinessHoursServiceImpl from '$lib/services/BusinessHoursService';
  
  // Props to receive menu state from parent
  export let isOpen = false;
  export let onToggle;
  
  // Business hours state
  let hoursText = '';
  
  // Services sub-menu state
  let isServicesOpen = false;
  
  // Toggles services submenu in mobile view
  function toggleServices() {
    isServicesOpen = !isServicesOpen;
    console.log('Mobile services submenu toggled:', isServicesOpen);
  }
  
  // Update business hours
  function updateBusinessHours() {
    hoursText = BusinessHoursServiceImpl.getHoursMessage();
  }
  
  onMount(() => {
    console.log('Mobile nav mounted');
    
    // Initial update of hours
    updateBusinessHours();
    
    // Set up interval to update hours
    const interval = setInterval(updateBusinessHours, 60000);
    
    // Clean up on component destruction
    return () => {
      clearInterval(interval);
    };
  });
  
  // For debugging
  $: console.log('Mobile menu isOpen state:', isOpen);
  $: console.log('Mobile services submenu state:', isServicesOpen);
</script>

<!-- Mobile Menu Toggle Button -->
<button 
  class="nav-toggle {isOpen ? 'active' : ''}" 
  aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
  on:click={onToggle}
>
  <span></span>
  <span></span>
  <span></span>
</button>

<!-- Mobile Menu Container -->
<div 
  class="mobile-menu {isOpen ? 'open' : ''}" 
  role="dialog"
  aria-modal="true"
  aria-label="Mobile Menu"
>
  <div class="mobile-menu-content">
    <div class="mobile-services-dropdown">
      <button 
        class="mobile-nav-section-toggle"
        on:click={toggleServices}
        aria-expanded={isServicesOpen}
      >
        Automotive Services
        <span class="dropdown-arrow {isServicesOpen ? 'open' : ''}">▼</span>
      </button>
      
      <div 
        class="mobile-services-submenu {isServicesOpen ? 'open' : ''}"
      >
        <div class="menu-sections-grid">
          <div class="menu-section">
            <h3><a href="/services/performance">Performance & Tuning</a></h3>
            <ul>
              <li><a href="/services/engine-tuning">ECU Tuning</a></li>
              <li><a href="/services/dyno-tuning">Dyno Tuning</a></li>
              <li><a href="/services/exhaust">Exhaust Systems</a></li>
              <li><a href="/services/performance" class="see-all">See All Performance Services</a></li>
            </ul>
          </div>

          <div class="menu-section">
            <h3><a href="/services/repair">Auto Repair</a></h3>
            <ul>
              <li><a href="/services/brake-repair">Brake Repair</a></li>
              <li><a href="/services/engine-repair">Engine Repair</a></li>
              <li><a href="/services/transmission-repair">Transmission Repair</a></li>
              <li><a href="/services/repair" class="see-all">See All Repair Services</a></li>
            </ul>
          </div>

          <div class="menu-section">
            <h3><a href="/services/maintenance">Maintenance</a></h3>
            <ul>
              <li><a href="/services/oil-change">Oil Change Services</a></li>
              <li><a href="/services/brake-service">Brake Maintenance</a></li>
              <li><a href="/services/maintenance" class="see-all">See All Maintenance Services</a></li>
            </ul>
          </div>

          <div class="menu-section">
            <h3><a href="/services/tires-wheels">Tires & Wheels</a></h3>
            <ul>
              <li><a href="/services/tire-sales">Tire Sales</a></li>
              <li><a href="/services/wheel-alignment">Wheel Alignment</a></li>
              <li><a href="/services/tires-wheels" class="see-all">See All Tire Services</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="main-links">
      <a href="/about" class="mobile-nav-link">About Us</a>
      <a href="/gallery" class="mobile-nav-link">Gallery</a>
    </div>

    <div class="mobile-info">
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
      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <a href="tel:+15183746111">(518) 374-6111</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../../scss/core/_mixins' as *;
  @use '../styles/variables.scss' as *;
  
  .nav-toggle {
    display: block;
    width: 30px;
    height: 24px;
    position: relative;
    background: none;
    border: none;
    padding: 0;
    z-index: 100;
    cursor: pointer;
    
    @include md {
      display: none;
    }
    
    span {
      display: block;
      width: 100%;
      height: 3px;
      background-color: $scotia-gray;
      position: absolute;
      left: 0;
      transition: all $transition-normal;
      
      &:nth-child(1) {
        top: 0;
      }
      
      &:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
      }
      
      &:nth-child(3) {
        bottom: 0;
      }
    }
    
    &.active {
      span {
        &:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        
        &:nth-child(2) {
          opacity: 0;
        }
        
        &:nth-child(3) {
          bottom: 50%;
          transform: translateY(50%) rotate(-45deg);
        }
      }
    }
  }
  
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $white;
    z-index: 90;
    padding-top: 70px;
    overflow-y: auto;
    opacity: 0;
    visibility: hidden;
    transition: all $transition-normal;
    
    &.open {
      opacity: 1;
      visibility: visible;
    }
    
    &-content {
      padding: $spacing-6 $spacing-4;
    }
  }
  
  .mobile-services-dropdown {
    margin-bottom: $spacing-6;
    
    .mobile-nav-section-toggle {
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      font-size: $font-size-lg;
      font-family: $font-primary;
      font-weight: $font-weight-semibold;
      color: $scotia-blue;
      padding: $spacing-2 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid lighten($scotia-gray, 60%);
      
      .dropdown-arrow {
        font-size: 0.7em;
        transition: transform $transition-normal;
        
        &.open {
          transform: rotate(180deg);
        }
      }
    }
  }
  
  .mobile-services-submenu {
    display: none;
    margin-top: $spacing-4;
    
    &.open {
      display: block;
    }
  }
  
  .menu-sections-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-6;
    margin-bottom: $spacing-6;
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
  
  .main-links {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
    margin-bottom: $spacing-8;
    
    .mobile-nav-link {
      color: $scotia-gray;
      font-weight: $font-weight-semibold;
      font-size: $font-size-lg;
      text-decoration: none;
      
      &:hover {
        color: $scotia-blue;
      }
    }
  }
  
  .mobile-info {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
    padding-top: $spacing-6;
    border-top: 1px solid lighten($scotia-gray, 50%);
    
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
  }
</style> 