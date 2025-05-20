<script lang="ts">
  import { businessHoursService } from '$lib/services/businessHours.js';
  import { Clock, MapPin } from '@lucide/svelte';
  
  // State initialization
  let isMobileMenuOpen = $state(false);
  let isServicesMenuOpen = $state(false);
  let hoursText = $state(businessHoursService.getCurrentStatus().message);
  let isScrolled = $state(false);
  let isClientSide = $state(false);
  
  // Derived values
  const menuAriaLabel = $derived(
    isMobileMenuOpen ? 'Close Menu' : 'Open Menu'
  );
  
  const servicesAriaLabel = $derived(
    isServicesMenuOpen ? 'Close Services Menu' : 'Open Services Menu'
  );
  
  // Toggle services mega menu
  function handleServicesToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    isServicesMenuOpen = !isServicesMenuOpen;
    console.log("Services menu toggled. New state:", isServicesMenuOpen);
  }
  
  // Toggle mobile menu
  function handleMobileMenuToggle() {
    isMobileMenuOpen = !isMobileMenuOpen;
    console.log("Mobile menu toggled. New state:", isMobileMenuOpen);
    // Handle body scrolling
    if (typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }
  
  // Close menus when clicking outside
  function handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    
    if (typeof document !== 'undefined') {
      const megaMenu = document.getElementById('services-mega-menu');
      const toggleButton = document.querySelector('.services-toggle');
      
      if (megaMenu && toggleButton) {
        if (!megaMenu.contains(target) && !toggleButton.contains(target)) {
          if (isServicesMenuOpen) {
            isServicesMenuOpen = false;
            console.log("Clicked outside services menu. Closed. State:", isServicesMenuOpen);
          }
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
    
    // Set client-side flag
    isClientSide = true;
    
    console.log("Effect: Initial services menu state:", isServicesMenuOpen);
    console.log("Effect: Initial mobile menu state:", isMobileMenuOpen);
    
    // Set up click listener for outside clicks
    document.addEventListener('click', handleClickOutside as EventListener);
    
    // Set up scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial update of hours and scroll state
    updateBusinessHours();
    handleScroll();
    
    // Set up interval to update hours
    const interval = setInterval(updateBusinessHours, 60000);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside as EventListener);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  });
  
  // Effect to monitor services menu state changes for debugging
  $effect(() => {
    console.log("Effect: Services menu state changed:", isServicesMenuOpen);
  });
  
  // Effect to monitor mobile menu state changes for debugging
  $effect(() => {
    console.log("Effect: Mobile menu state changed:", isMobileMenuOpen);
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
        type="button"
        class="nav-link services-toggle" 
        aria-expanded={isServicesMenuOpen} 
        aria-controls="services-mega-menu"
        aria-label={servicesAriaLabel}
        onclick={handleServicesToggle}
      >
        Automotive Services
      </button>

      <!-- Mega Menu Container -->
      <div 
        id="services-mega-menu" 
        class="mega-menu" 
        class:active={isServicesMenuOpen}
      >
        <!-- Menu Content -->
        <div class="mega-menu-content">
          <!-- Performance & Tuning -->
          <div class="menu-section">
            <h3><a href="/services/performance">Performance & Tuning</a></h3>
            <ul>
              <li><a href="/services/performance/engine-performance">Engine Performance</a></li>
              <li><a href="/services/performance/drivetrain-transmission">Drivetrain & Transmission</a></li>
              <li><a href="/services/performance/suspension-handling">Suspension & Handling</a></li>
              <li><a href="/services/performance/braking-systems">Braking Systems</a></li>
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
              <span class="icon-wrapper">
                {#if isClientSide}
                  <Clock size={20} />
                {/if}
              </span>
              <span class="text">{hoursText}</span>
            </div>
            <div class="info-item">
              <span class="icon-wrapper">
                {#if isClientSide}
                  <MapPin size={20} />
                {/if}
              </span>
              <a href="https://www.google.com/maps/search/?api=1&query=24+Sacandaga+Rd,+Scotia,+NY+12302" class="text address-link">24 Sacandaga Rd, Scotia</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rest of nav items -->
    <a href="/about" class="nav-link">About</a>
    <a href="/gallery" class="nav-link">Gallery</a>
    <a href="tel:5182801698" class="header-cta">Call Us: (518) 280-1698</a>
  </nav>

  <!-- Mobile Navigation Toggle -->
  <button 
    type="button"
    class="nav-toggle" 
    aria-expanded={isMobileMenuOpen}
    aria-controls="mobile-menu"
    aria-label={menuAriaLabel}
    onclick={handleMobileMenuToggle}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- Mobile bottom CTA -->
<div class="cta-bottom">
  <a href="tel:5182801698" class="cta-button" aria-label="Schedule Service">
    Schedule Service: (518) 280-1698
  </a>
</div>

<!-- Mobile Menu -->
<div class="mobile-menu" class:active={isMobileMenuOpen}>
  <div class="mobile-menu-content">
    <div class="menu-sections-grid">
      <div class="menu-section">
        <h3><a href="/services/performance">Performance & Tuning</a></h3>
        <ul>
          <li><a href="/services/performance/engine-performance">Engine Performance</a></li>
          <li><a href="/services/performance/drivetrain-transmission">Drivetrain & Transmission</a></li>
          <li><a href="/services/performance/suspension-handling">Suspension & Handling</a></li>
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
      <div class="info-item">
        <span class="icon-wrapper">
          {#if isClientSide}
            <Clock size={18} />
          {/if}
        </span>
        <span class="hours-text">{hoursText}</span>
      </div>
      <div class="info-item">
        <span class="icon-wrapper">
          {#if isClientSide}
            <MapPin size={18} />
          {/if}
        </span>
        <a href="https://www.google.com/maps/search/?api=1&query=24+Sacandaga+Rd,+Scotia,+NY+12302">24 Sacandaga Rd, Scotia</a>
      </div>
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
    max-height: 80vh; /* Use vh instead of fit-content */
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 98;
    
    &.active {
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
    }
  }

  .mega-menu-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: $spacing-6 $spacing-8 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-6;
  }

  /* Menu Section Styles */
  .menu-section {
    margin-bottom: 0;
    
    h3 {
      font-size: $font-size-lg;
      margin-bottom: $spacing-2;
    }
    
    ul {
      li {
        margin-bottom: 0;
        
        a {
          padding: $spacing-1 0;
          min-height: 36px;
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
    margin-top: $spacing-4;
    padding: $spacing-4 $spacing-8;
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
    
    :global(svg) {
      flex-shrink: 0;
      color: $scotia-blue;
      stroke-width: 2;
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
    height: calc(100vh - 140px); /* Reduced height to make space for bottom CTA */
    background-color: $white;
    overflow-y: auto;
    z-index: 99;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    
    &.active {
      transform: translateX(0);
    }
  }

  .mobile-menu-content {
    padding: $spacing-4;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }

  .menu-sections-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-4;
    padding-bottom: $spacing-4;
  }

  .menu-section {
    margin-bottom: 0;
    
    h3 {
      font-family: $font-primary;
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $scotia-dark;
      margin-bottom: $spacing-2;
      padding-bottom: $spacing-1;
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
        margin-bottom: 0;
        
        a {
          display: block;
          padding: $spacing-1 0;
          min-height: 36px;
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
            padding-left: 10px;
          }
        }
      }
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
    padding-top: $spacing-3;
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
    margin-bottom: 60px; /* Space for the bottom CTA */
    
    .info-item {
      display: flex;
      align-items: center;
      gap: $spacing-2;
      line-height: 1.4;
      
      :global(svg) {
        color: $scotia-blue;
        flex-shrink: 0;
      }
      
      .hours-text,
      a {
        color: $scotia-gray;
        text-decoration: none;
        font-size: $font-size-sm;
        
        &:hover,
        &:focus {
          color: $scotia-blue;
          text-decoration: underline;
        }
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
    padding: $spacing-2 $spacing-3;
    text-align: center;
    z-index: 100; /* Higher z-index than mobile menu */
    box-shadow: 0 -2px 10px rgba($black, 0.2);
    
    @include md {
      display: none;
    }
    
    .cta-button {
      color: $white;
      font-weight: $font-weight-semibold;
      text-decoration: none;
      font-family: $font-primary;
      width: auto;
      max-width: 100%;
      padding: 0 $spacing-2;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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