<script lang="ts">
  import { businessHoursService } from '$lib/services/businessHours.js';
  
  // State initialization
  let isMobileMenuOpen = $state(false);
  let isServicesMenuOpen = $state(false);
  let hoursText = $state(businessHoursService.getCurrentStatus().message);
  let isScrolled = $state(false);
  
  // Derived values
  const menuAriaLabel = $derived(
    isMobileMenuOpen ? 'Close Menu' : 'Open Menu'
  );
  
  const servicesAriaLabel = $derived(
    isServicesMenuOpen ? 'Close Services Menu' : 'Open Services Menu'
  );
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
  
  // Toggle services mega menu
  function toggleServicesMenu() {
    isServicesMenuOpen = !isServicesMenuOpen;
  }
  
  // Close menus when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    if (typeof document !== 'undefined') {
      const megaMenu = document.getElementById('services-mega-menu');
      const toggleButton = document.querySelector('.services-toggle');
      
      if (megaMenu && toggleButton) {
        if (!megaMenu.contains(target) && !toggleButton.contains(target)) {
          isServicesMenuOpen = false;
        }
      }
    }
  }
  
  // Handle scroll event to add/remove scrolled class
  function handleScroll() {
    if (typeof window !== 'undefined') {
      isScrolled = window.scrollY > 10;
    }
  }
  
  // Update business hours
  function updateBusinessHours() {
    hoursText = businessHoursService.getCurrentStatus().message;
  }
  
  // Set up document click listener and business hours interval
  $effect(() => {
    // Only run in browser environment
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    
    // Set up click listener
    document.addEventListener('click', handleClickOutside);
    
    // Set up scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial update of hours and scroll state
    updateBusinessHours();
    handleScroll();
    
    // Set up interval to update hours
    const interval = setInterval(updateBusinessHours, 60000);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  });
</script>

<svelte:head>
  <style>
    /* Global styles for body when menu is open */
    body.menu-open {
      overflow: hidden;
    }
  </style>
</svelte:head>

<svelte:body class:menu-open={isMobileMenuOpen} />

<header 
  class="site-header" 
  class:menu-open={isMobileMenuOpen}
  class:scrolled={isScrolled}
>
  <a href="/" class="logo" aria-label="Scotia Performance Home">Scotia Performance</a>

  <!-- Desktop Navigation -->
  <nav class="desktop-nav">
    <div class="services-menu-container">
      <!-- Toggle Button -->
      <button 
        class="nav-link services-toggle" 
        aria-expanded={isServicesMenuOpen} 
        aria-controls="services-mega-menu"
        aria-label={servicesAriaLabel}
        on:click|stopPropagation={toggleServicesMenu}
      >
        Automotive Services
      </button>

      <!-- Mega Menu Container -->
      <div 
        id="services-mega-menu" 
        class="mega-menu" 
        class:active={isServicesMenuOpen}
        hidden={!isServicesMenuOpen}
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
              <a href="https://www.google.com/maps/search/?api=1&query=24+Sacandaga+Rd,+Scotia,+NY+12302" class="text address-link">24 Sacandaga Rd, Scotia</a>
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

  <!-- Mobile Navigation Toggle -->
  <button 
    class="nav-toggle" 
    aria-label={menuAriaLabel}
    aria-expanded={isMobileMenuOpen}
    on:click={toggleMobileMenu}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- Mobile bottom CTA -->
<div class="cta-bottom">
  <a href="tel:5183746111" class="cta-button" aria-label="Schedule Service">
    Schedule Service: (518) 374-6111
  </a>
</div>

<!-- Mobile Menu -->
<div class="mobile-menu" class:active={isMobileMenuOpen}>
  <div class="mobile-menu-content">
    <div class="menu-sections-grid">
      <div class="menu-section">
        <h3><a href="/services/performance">Performance & Tuning</a></h3>
        <ul>
          <li><a href="/services/performance/ecu-tuning">ECU Tuning</a></li>
          <li><a href="/services/performance/dyno-tuning">Dyno Tuning</a></li>
          <li><a href="/services/performance/exhaust-systems">Exhaust Systems</a></li>
          <li><a href="/services/performance" class="see-all">See All Performance Services</a></li>
        </ul>
      </div>

      <div class="menu-section">
        <h3><a href="/services/repair">Auto Repair</a></h3>
        <ul>
          <li><a href="/services/repair/brake-repair">Brake Repair</a></li>
          <li><a href="/services/repair/engine-repair">Engine Repair</a></li>
          <li><a href="/services/repair/transmission-repair">Transmission Repair</a></li>
          <li><a href="/services/repair" class="see-all">See All Repair Services</a></li>
        </ul>
      </div>

      <div class="menu-section">
        <h3><a href="/services/maintenance">Maintenance</a></h3>
        <ul>
          <li><a href="/services/maintenance/oil-change">Oil Change Services</a></li>
          <li><a href="/services/maintenance/brake-maintenance">Brake Maintenance</a></li>
          <li><a href="/services/maintenance/scheduled-maintenance">Scheduled Maintenance</a></li>
          <li><a href="/services/maintenance" class="see-all">See All Maintenance Services</a></li>
        </ul>
      </div>

      <div class="menu-section">
        <h3><a href="/services">Quick Links</a></h3>
        <ul>
          <li><a href="/services/tires-wheels">Tires & Wheels</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/services" class="see-all">View All Services</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <a href="#">{hoursText}</a>
      <a href="https://www.google.com/maps/search/?api=1&query=24+Sacandaga+Rd,+Scotia,+NY+12302">24 Sacandaga Rd, Scotia</a>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../../scss/core/variables' as *;
  @use '../../scss/core/mixins' as *;
  
  /* Header Core Styles */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $white;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    z-index: $z-index-header;
    padding: 0 $spacing-4;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 10px rgba($black, 0.1);
    
    &.scrolled {
      box-shadow: 0 4px 15px rgba($black, 0.15);
    }
    
    @include md {
      padding: 0 $spacing-6;
    }
  }

  /* Logo Styles */
  .logo {
    color: $scotia-blue;
    text-decoration: none;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    font-family: $font-primary;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  /* Mobile Navigation Toggle */
  .nav-toggle {
    display: block;
    min-width: 44px;
    min-height: 44px;
    padding: $spacing-2;
    background: none;
    border: none;
    cursor: pointer;
    
    @include md {
      display: none;
    }
    
    span {
      display: block;
      width: 24px;
      height: 2px;
      background: $scotia-dark;
      margin: 5px 0;
      transition: transform 0.3s ease;
    }
    
    &[aria-expanded="true"] span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    &[aria-expanded="true"] span:nth-child(2) {
      opacity: 0;
    }
    
    &[aria-expanded="true"] span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  /* Desktop Navigation */
  .desktop-nav {
    display: none;
    align-items: center;
    gap: $spacing-5;
    
    @include md {
      display: flex;
    }
  }

  .nav-link, 
  .services-toggle {
    font-family: $font-primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: $scotia-blue;
    text-decoration: none;
    padding: $spacing-2;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease;
    
    &:hover {
      color: darken($scotia-blue, 15%);
    }
  }

  /* Services Mega Menu */
  .services-menu-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .services-toggle {
    color: $scotia-blue;
    padding: $spacing-2;
    min-height: 44px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: none;
    border: none;
    cursor: pointer;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s ease;
    
    &[aria-expanded="true"] {
      color: $scotia-red;
      background-color: rgba($scotia-blue, 0.05);
    }
    
    &::after {
      content: '↓';
      font-size: 12px;
      opacity: 0.7;
      transition: transform 0.2s;
    }
    
    &[aria-expanded="true"]::after {
      content: '×';
      font-size: 16px;
      opacity: 1;
    }
  }

  .mega-menu {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    background: $white;
    box-shadow: 0 4px 6px -1px rgba($black, 0.1);
    opacity: 0;
    visibility: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 80px);
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 98;
    
    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  .mega-menu-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: $spacing-8 $spacing-8 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-8;
  }

  /* Menu Section Styles */
  .menu-section {
    margin-bottom: 0;
    
    h3 {
      font-family: $font-primary;
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $scotia-dark;
      margin-bottom: $spacing-4;
      padding-bottom: $spacing-2;
      border-bottom: 1px solid #e5e5e5;
      
      a {
        font-family: $font-primary;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        color: $scotia-dark;
        text-decoration: none;
        display: block;
        
        &:hover {
          color: $scotia-red;
          text-decoration: none;
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
          display: block;
          padding: $spacing-2 0;
          min-height: 44px;
          font-size: $font-size-sm;
          line-height: 1.3;
          color: $scotia-gray;
          text-decoration: none;
          border-radius: $border-radius-md;
          transition: all 0.2s ease;
          font-family: $font-secondary;
          font-weight: $font-weight-normal;
          
          &:hover {
            color: $scotia-red;
            padding-left: 20px;
          }
        }
      }
    }
  }

  /* CTA Buttons */
  .header-cta {
    background: $scotia-red;
    color: $white;
    padding: $spacing-2 $spacing-4;
    border-radius: $border-radius-md;
    text-decoration: none;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-primary;
    font-weight: $font-weight-semibold;
    letter-spacing: 0.01em;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: darken($scotia-red, 10%);
    }
  }

  /* Menu Footer */
  .mega-menu-footer {
    border-top: 1px solid rgba($black, 0.1);
    margin-top: $spacing-8;
    padding: $spacing-6 $spacing-8;
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .mega-menu .info-card {
    background: none;
    backdrop-filter: none;
    border: none;
    margin: 0;
    display: flex;
    gap: $spacing-8;
  }

  .mega-menu .info-item {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    color: $scotia-gray;
    
    svg {
      flex-shrink: 0;
      color: $scotia-blue;
    }
    
    .text,
    .address-link {
      color: $scotia-gray;
      text-decoration: none;
      font-size: $font-size-sm;
      
      &:hover {
        color: $scotia-blue;
        text-decoration: underline;
      }
    }
  }

  /* Mobile Menu */
  .mobile-menu {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: $white;
    overflow-y: auto;
    z-index: 99;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    
    &.active {
      transform: translateX(0);
    }
  }

  .mobile-menu-content {
    padding: $spacing-4;
    max-width: 1200px;
    margin: 0 auto;
  }

  .menu-sections-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-6;
    padding-bottom: $spacing-6;
    
    @include sm {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .see-all {
    font-weight: $font-weight-medium;
    color: $scotia-blue !important;
    position: relative;
    
    &::after {
      content: "→";
      margin-left: $spacing-2;
    }
    
    &:hover::after {
      margin-left: $spacing-3;
    }
  }

  .bottom-nav {
    border-top: 1px solid rgba($black, 0.1);
    padding-top: $spacing-4;
    display: flex;
    flex-direction: column;
    gap: $spacing-3;
    
    a {
      color: $scotia-gray;
      text-decoration: none;
      font-size: $font-size-sm;
      display: block;
      
      &:hover,
      &:focus {
        color: $scotia-blue;
        text-decoration: underline;
      }
    }
  }

  /* Bottom CTA for mobile */
  .cta-bottom {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $scotia-red;
    padding: $spacing-3;
    text-align: center;
    z-index: 97;
    
    @include md {
      display: none;
    }
    
    .cta-button {
      color: $white;
      font-weight: $font-weight-semibold;
      text-decoration: none;
      font-family: $font-primary;
    }
  }
  
  /* Accessibility focus styles */
  .nav-link:focus-visible,
  .services-toggle:focus-visible,
  .header-cta:focus-visible,
  .nav-toggle:focus-visible {
    outline: 2px solid $scotia-blue;
    outline-offset: 2px;
  }
</style> 