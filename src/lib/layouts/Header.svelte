<script lang="ts">
  import { businessHoursService } from '$lib/services/businessHours.js';
  import { Clock, MapPin } from '@lucide/svelte';
  
  // State initialization
  let isMobileMenuOpen = $state(false);
  let isServicesMenuOpen = $state(false);
  let hoursText = $state('');
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
  }
  
  // Toggle mobile menu
  function handleMobileMenuToggle() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    // Handle body scrolling - only in browser
    if (isClientSide && typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }
  
  // Close menus when clicking outside
  function handleClickOutside(event: Event) {
    if (!isClientSide) return;
    
    const target = event.target as HTMLElement;
    
    if (typeof document !== 'undefined') {
      const megaMenu = document.getElementById('services-mega-menu');
      const toggleButton = document.querySelector('.services-toggle');
      
      if (megaMenu && toggleButton) {
        if (!megaMenu.contains(target) && !toggleButton.contains(target)) {
          if (isServicesMenuOpen) {
            isServicesMenuOpen = false;
          }
        }
      }
    }
  }
  
  // Handle scroll event to add/remove scrolled class
  function handleScroll() {
    if (isClientSide && typeof window !== 'undefined') {
      isScrolled = window.scrollY > 10;
    }
  }
  
  // Update business hours
  function updateBusinessHours() {
    if (isClientSide) {
      hoursText = businessHoursService.getCurrentStatus().message;
    }
  }
  
  // Set up document click listener and business hours interval
  $effect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Set client-side flag
    isClientSide = true;
    
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
  
    // Remove debug effects to prevent hydration mismatches
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
  @use 'sass:color';
  @use '../../scss/core/variables' as vars;
  @use '../../scss/core/mixins' as mix;
  
  /* Header Core Styles */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: vars.$white;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    z-index: vars.$z-index-header;
    padding: 0 vars.$spacing-4;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 10px rgba(vars.$black, 0.1);
    
    &.scrolled {
      box-shadow: 0 4px 15px rgba(vars.$black, 0.15);
    }
    
    @include mix.md {
      padding: 0 vars.$spacing-6;
    }
  }

  /* Logo Styles */
  .logo {
    color: vars.$scotia-blue;
    text-decoration: none;
    font-size: vars.$font-size-xl;
    font-weight: vars.$font-weight-bold;
    font-family: vars.$font-primary;
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
    padding: vars.$spacing-2;
    background: none;
    border: none;
    cursor: pointer;
    
    @include mix.md {
      display: none;
    }
    
    span {
      display: block;
      width: 24px;
      height: 2px;
      background: vars.$scotia-dark;
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
    gap: vars.$spacing-5;
    
    @include mix.md {
      display: flex;
    }
  }

  .nav-link, 
  .services-toggle {
    font-family: vars.$font-primary;
    font-size: vars.$font-size-sm;
    font-weight: vars.$font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: vars.$scotia-blue;
    text-decoration: none;
    padding: vars.$spacing-2;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease;
    
    &:hover {
      color: color.scale(vars.$scotia-blue, $lightness: -15%);
    }
  }

  /* Services Mega Menu */
  .services-menu-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .services-toggle {
    color: vars.$scotia-blue;
    padding: vars.$spacing-2;
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
      color: vars.$scotia-red;
      background-color: rgba(vars.$scotia-blue, 0.05);
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
    background: vars.$white;
    box-shadow: 0 4px 6px -1px rgba(vars.$black, 0.1);
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
    padding: vars.$spacing-6 vars.$spacing-8 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: vars.$spacing-6;
  }

  /* Menu Section Styles */
  .menu-section {
    margin-bottom: 0;
    
    h3 {
      font-size: vars.$font-size-lg;
      margin-bottom: vars.$spacing-2;
    }
    
    ul {
      li {
        margin-bottom: 0;
        
        a {
          padding: vars.$spacing-1 0;
          min-height: 36px;
        }
      }
    }
  }

  /* CTA Buttons */
  .header-cta {
    background: vars.$scotia-red;
    color: vars.$white;
    padding: vars.$spacing-2 vars.$spacing-4;
    border-radius: vars.$border-radius-md;
    text-decoration: none;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: vars.$font-primary;
    font-weight: vars.$font-weight-semibold;
    letter-spacing: 0.01em;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: color.scale(vars.$scotia-red, $lightness: -10%);
    }
  }

  /* Menu Footer */
  .mega-menu-footer {
    border-top: 1px solid rgba(vars.$black, 0.1);
    margin-top: vars.$spacing-4;
    padding: vars.$spacing-4 vars.$spacing-8;
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
    gap: vars.$spacing-8;
  }

  .mega-menu .info-item {
    display: flex;
    align-items: center;
    gap: vars.$spacing-2;
    color: vars.$scotia-gray;
    
    :global(svg) {
      flex-shrink: 0;
      color: vars.$scotia-blue;
      stroke-width: 2;
    }
    
    .text,
    .address-link {
      color: vars.$scotia-gray;
      text-decoration: none;
      font-size: vars.$font-size-sm;
      
      &:hover {
        color: vars.$scotia-blue;
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
    background-color: vars.$white;
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
    padding: vars.$spacing-4;
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
    gap: vars.$spacing-4;
    padding-bottom: vars.$spacing-4;
  }

  .menu-section {
    margin-bottom: 0;
    
    h3 {
      font-family: vars.$font-primary;
      font-size: vars.$font-size-lg;
      font-weight: vars.$font-weight-bold;
      color: vars.$scotia-dark;
      margin-bottom: vars.$spacing-2;
      padding-bottom: vars.$spacing-1;
      border-bottom: 1px solid #e5e5e5;
      
      a {
        font-family: vars.$font-primary;
        font-size: vars.$font-size-lg;
        font-weight: vars.$font-weight-bold;
        color: vars.$scotia-dark;
        text-decoration: none;
        display: block;
        
        &:hover {
          color: vars.$scotia-red;
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
          padding: vars.$spacing-1 0;
          min-height: 36px;
          font-size: vars.$font-size-sm;
          line-height: 1.3;
          color: vars.$scotia-gray;
          text-decoration: none;
          border-radius: vars.$border-radius-md;
          transition: all 0.2s ease;
          font-family: vars.$font-secondary;
          font-weight: vars.$font-weight-normal;
          
          &:hover {
            color: vars.$scotia-red;
            padding-left: 10px;
          }
        }
      }
    }
  }

  .see-all {
    font-weight: vars.$font-weight-medium;
    color: vars.$scotia-blue !important;
    position: relative;
    
    &::after {
      content: "→";
      margin-left: vars.$spacing-2;
    }
    
    &:hover::after {
      margin-left: vars.$spacing-3;
    }
  }

  .bottom-nav {
    border-top: 1px solid rgba(vars.$black, 0.1);
    padding-top: vars.$spacing-3;
    display: flex;
    flex-direction: column;
    gap: vars.$spacing-2;
    margin-bottom: 60px; /* Space for the bottom CTA */
    
    .info-item {
      display: flex;
      align-items: center;
      gap: vars.$spacing-2;
      line-height: 1.4;
      
      :global(svg) {
        color: vars.$scotia-blue;
        flex-shrink: 0;
      }
      
      .hours-text,
      a {
        color: vars.$scotia-gray;
        text-decoration: none;
        font-size: vars.$font-size-sm;
        
        &:hover,
        &:focus {
          color: vars.$scotia-blue;
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
    background-color: vars.$scotia-red;
    padding: vars.$spacing-2 vars.$spacing-3;
    text-align: center;
    z-index: 100; /* Higher z-index than mobile menu */
    box-shadow: 0 -2px 10px rgba(vars.$black, 0.2);
    
    @include mix.md {
      display: none;
    }
    
    .cta-button {
      color: vars.$white;
      font-weight: vars.$font-weight-semibold;
      text-decoration: none;
      font-family: vars.$font-primary;
      width: auto;
      max-width: 100%;
      padding: 0 vars.$spacing-2;
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
    outline: 2px solid vars.$scotia-blue;
    outline-offset: 2px;
  }
</style> 