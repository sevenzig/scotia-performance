<script lang="ts">
  import BusinessHoursService from '$lib/services/BusinessHoursService';
  import { Clock, MapPin } from '@lucide/svelte';
  import { onMount } from 'svelte';
  
  // State initialization
  let isMobileMenuOpen = $state(false);
  let isServicesMenuOpen = $state(false);
  let hoursText = $state('Hours available by phone');
  let isScrolled = $state(false);
  let mounted = $state(false);
  
  // Initialize business hours service
  const businessHoursService = new BusinessHoursService();
  
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
    // DOM body class management is now handled by $effect
  }

  // Close mega menu when link is clicked
  function closeMegaMenu() {
    isServicesMenuOpen = false;
  }

  // Close mobile menu when link is clicked
  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
  
  // Close menus when clicking outside
  function handleClickOutside(event: Event) {
    if (!mounted) return;
    
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
    if (mounted && typeof window !== 'undefined') {
      isScrolled = window.scrollY > 10;
    }
  }
  
  // Update business hours
  function updateBusinessHours() {
    if (mounted) {
      try {
        hoursText = businessHoursService.getHoursMessage();
      } catch (error) {
        console.warn('Error updating business hours:', error);
        hoursText = 'Hours available by phone';
      }
    }
  }
  
  // Initialize after component mounts
  onMount(() => {
    mounted = true;
    
    // Defer DOM operations to prevent hydration conflicts
    requestAnimationFrame(() => {
      // Set up click listener for outside clicks
      document.addEventListener('click', handleClickOutside as EventListener);
      
      // Set up scroll listener
      window.addEventListener('scroll', handleScroll);
      
      // Initial update of hours and scroll state
      updateBusinessHours();
      handleScroll();
    });
    
    // Set up interval to update hours
    const interval = setInterval(updateBusinessHours, 60000);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside as EventListener);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  });

  // Use $effect for reactive DOM body class management
  $effect(() => {
    if (mounted && typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
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
            <h3><a href="/services/performance" onclick={closeMegaMenu}>Performance & Tuning</a></h3>
            <ul>
              <li><a href="/services/performance#engine-performance" onclick={closeMegaMenu}>Engine Performance</a></li>
              <li><a href="/services/performance#drivetrain-transmission" onclick={closeMegaMenu}>Drivetrain & Transmission</a></li>
              <li><a href="/services/performance#suspension-handling" onclick={closeMegaMenu}>Suspension & Handling</a></li>
              <li><a href="/services/performance#braking-systems" onclick={closeMegaMenu}>Braking Systems</a></li>
              <li><a href="/services/performance#engine-building" onclick={closeMegaMenu}>Engine Building</a></li>
            </ul>
          </div>

          <!-- Auto Repair -->
          <div class="menu-section">
            <h3><a href="/services/repair" onclick={closeMegaMenu}>Auto Repair</a></h3>
            <ul>
              <li><a href="/services/repair#brake-repair-service" onclick={closeMegaMenu}>Brake Repair</a></li>
              <li><a href="/services/repair#engine-repair-diagnostics" onclick={closeMegaMenu}>Engine Repair</a></li>
              <li><a href="/services/repair#transmission-repair" onclick={closeMegaMenu}>Transmission Repair</a></li>
              <li><a href="/services/repair#ac-climate-control" onclick={closeMegaMenu}>AC Service</a></li>
              <li><a href="/services/repair#electrical-system" onclick={closeMegaMenu}>Electrical Repair</a></li>
            </ul>
          </div>

          <!-- Maintenance -->
          <div class="menu-section">
            <h3><a href="/services/maintenance" onclick={closeMegaMenu}>Maintenance</a></h3>
            <ul>
              <li><a href="/services/maintenance#oil-change" onclick={closeMegaMenu}>Oil Change Services</a></li>
              <li><a href="/services/maintenance#brake-maintenance" onclick={closeMegaMenu}>Brake Maintenance</a></li>
              <li><a href="/services/maintenance#scheduled-maintenance" onclick={closeMegaMenu}>Scheduled Maintenance</a></li>
              <li><a href="/services/maintenance#state-inspection" onclick={closeMegaMenu}>State Inspection</a></li>
              <li><a href="/services/maintenance#wheel-alignment" onclick={closeMegaMenu}>Wheel Alignment</a></li>
            </ul>
          </div>

          <!-- Tires & Wheels -->
          <div class="menu-section">
            <h3><a href="/services/tires-wheels" onclick={closeMegaMenu}>Tires & Wheels</a></h3>
            <ul>
              <li><a href="/services/tires-wheels#tire-sales" onclick={closeMegaMenu}>Tire Sales</a></li>
              <li><a href="/services/tires-wheels#wheel-alignment" onclick={closeMegaMenu}>Wheel Alignment</a></li>
              <li><a href="/services/tires-wheels#tire-rotation" onclick={closeMegaMenu}>Tire Rotation</a></li>
              <li><a href="/services/tires-wheels#wheel-balancing" onclick={closeMegaMenu}>Wheel Balancing</a></li>
              <li><a href="/services/tires-wheels#tpms-service" onclick={closeMegaMenu}>TPMS Service</a></li>
            </ul>
          </div>
        </div>

        <!-- Menu Footer -->
        <div class="mega-menu-footer">
          <div class="info-card">
            <div class="info-item">
              <span class="icon-wrapper">
                <Clock size={20} />
              </span>
              <span class="text">{hoursText}</span>
            </div>
            <div class="info-item">
              <span class="icon-wrapper">
                <MapPin size={20} />
              </span>
              <a href="https://www.google.com/maps/search/?api=1&query=24+Sacandaga+Rd,+Scotia,+NY+12302" class="text address-link">24 Sacandaga Rd, Scotia</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rest of nav items -->
    <a href="/about" class="nav-link" onclick={closeMegaMenu}>About</a>
    <a href="/gallery" class="nav-link" onclick={closeMegaMenu}>Gallery</a>
    <a href="tel:5182801698" class="header-cta" onclick={closeMegaMenu}>Call Us: (518) 280-1698</a>
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
        <h3><a href="/services/performance" onclick={closeMobileMenu}>Performance & Tuning</a></h3>
        <ul>
          <li><a href="/services/performance#engine-performance" onclick={closeMobileMenu}>Engine Performance</a></li>
          <li><a href="/services/performance#drivetrain-transmission" onclick={closeMobileMenu}>Drivetrain & Transmission</a></li>
          <li><a href="/services/performance#suspension-handling" onclick={closeMobileMenu}>Suspension & Handling</a></li>
          <li><a href="/services/performance" class="see-all" onclick={closeMobileMenu}>See All Performance Services</a></li>
        </ul>
      </div>

      <div class="menu-section">
        <h3><a href="/services/repair" onclick={closeMobileMenu}>Auto Repair</a></h3>
        <ul>
          <li><a href="/services/repair#brake-repair-service" onclick={closeMobileMenu}>Brake Repair</a></li>
          <li><a href="/services/repair#engine-repair-diagnostics" onclick={closeMobileMenu}>Engine Repair</a></li>
          <li><a href="/services/repair#transmission-repair" onclick={closeMobileMenu}>Transmission Repair</a></li>
          <li><a href="/services/repair" class="see-all" onclick={closeMobileMenu}>See All Repair Services</a></li>
        </ul>
      </div>

      <div class="menu-section">
        <h3><a href="/services/maintenance" onclick={closeMobileMenu}>Maintenance</a></h3>
        <ul>
          <li><a href="/services/maintenance#oil-change" onclick={closeMobileMenu}>Oil Change Services</a></li>
          <li><a href="/services/maintenance#brake-maintenance" onclick={closeMobileMenu}>Brake Maintenance</a></li>
          <li><a href="/services/maintenance#scheduled-maintenance" onclick={closeMobileMenu}>Scheduled Maintenance</a></li>
          <li><a href="/services/maintenance" class="see-all" onclick={closeMobileMenu}>See All Maintenance Services</a></li>
        </ul>
      </div>

      <div class="menu-section">
        <h3><a href="/services" onclick={closeMobileMenu}>Quick Links</a></h3>
        <ul>
          <li><a href="/services/tires-wheels" onclick={closeMobileMenu}>Tires & Wheels</a></li>
          <li><a href="/about" onclick={closeMobileMenu}>About</a></li>
          <li><a href="/gallery" onclick={closeMobileMenu}>Gallery</a></li>
          <li><a href="/services" class="see-all" onclick={closeMobileMenu}>View All Services</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <div class="info-item">
        <span class="icon-wrapper">
          <Clock size={18} />
        </span>
        <span class="hours-text">{hoursText}</span>
      </div>
      <div class="info-item">
        <span class="icon-wrapper">
          <MapPin size={18} />
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
    position: fixed !important;
    top: 0 !important;
    left: 0;
    right: 0;
    background-color: vars.$white;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    z-index: 1000 !important; /* High z-index to ensure it's always on top */
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
    z-index: 999; /* Just below header */
    
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
    z-index: 998; /* Below header and mega menu */
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
    position: fixed !important;
    bottom: 0 !important;
    left: 0;
    width: 100%;
    background-color: vars.$scotia-red;
    padding: vars.$spacing-3 vars.$spacing-4;
    text-align: center;
    z-index: 50; /* Lower than header but above other content */
    box-shadow: 0 -4px 12px rgba(vars.$black, 0.1);
    
        /* Only show on mobile */
    @include mix.md {
      display: none !important;
    }    
    .cta-button {
      display: inline-block;
      background-color: vars.$white;
      color: vars.$scotia-red;
      font-weight: vars.$font-weight-bold;
      font-size: vars.$font-size-base;
      text-decoration: none;
      font-family: vars.$font-primary;
      padding: vars.$spacing-3 vars.$spacing-4;
      border-radius: vars.$border-radius-md;
      max-width: 90%;
      text-align: center;
      border: 2px solid vars.$white;
      box-shadow: 0 4px 12px rgba(vars.$black, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover,
      &:focus {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(vars.$black, 0.2);
        background-color: vars.$white;
        color: vars.$scotia-red;
        text-decoration: none;
      }
      
      &:active {
        transform: translateY(0px);
        box-shadow: 0 2px 8px rgba(vars.$black, 0.1);
      }
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