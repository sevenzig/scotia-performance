<script lang="ts">
  import type { BusinessHoursService } from '$lib/services/BusinessHoursService';
  import BusinessHoursServiceImpl from '$lib/services/BusinessHoursService';
  import DesktopNav from './DesktopNav.svelte';
  import MobileNav from './MobileNav.svelte';
  
  // Types
  interface MenuState {
    isMobileMenuOpen: boolean;
    isServicesMenuOpen: boolean;
  }
  
  // State
  let isMobileMenuOpen = false;
  
  // Business hours state
  let hoursText = $state(BusinessHoursServiceImpl.getHoursMessage());
  
  // Derived values
  const menuAriaLabel = $derived(
    isMobileMenuOpen ? 'Close Menu' : 'Open Menu'
  );
  
  const servicesAriaLabel = $derived(
    menuState.isServicesMenuOpen ? 'Close Services Menu' : 'Open Services Menu'
  );
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    console.log('Header mobile menu toggled:', isMobileMenuOpen);
  }
  
  // Toggle services mega menu
  function toggleServicesMenu() {
    menuState.isServicesMenuOpen = !menuState.isServicesMenuOpen;
  }
  
  // Close menus when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    if (typeof document !== 'undefined') {
      const megaMenu = document.getElementById('services-mega-menu');
      const toggleButton = document.querySelector('.services-toggle');
      
      if (megaMenu && toggleButton) {
        if (!megaMenu.contains(target) && !toggleButton.contains(target)) {
          menuState.isServicesMenuOpen = false;
        }
      }
    }
  }
  
  // Update business hours
  function updateBusinessHours() {
    hoursText = BusinessHoursServiceImpl.getHoursMessage();
  }
  
  // Set up document click listener and business hours interval
  $effect(() => {
    // Only run in browser environment
    if (typeof document === 'undefined') return;
    
    // Set up click listener
    document.addEventListener('click', handleClickOutside);
    
    // Initial update of hours
    updateBusinessHours();
    
    // Set up interval to update hours
    const interval = setInterval(updateBusinessHours, 60000);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearInterval(interval);
    };
  });
  
  // Log state changes
  $: console.log('Header mobile menu state:', isMobileMenuOpen);
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
>
  <a href="/" class="logo" aria-label="Scotia Performance Home">Scotia Performance</a>

  <!-- Desktop Navigation -->
  <DesktopNav />
  
  <!-- Mobile Navigation -->
  <MobileNav 
    isOpen={isMobileMenuOpen} 
    onToggle={toggleMobileMenu} 
  />
</header>

<div class="cta-bottom">
  <a href="tel:5183746111" class="cta-button" aria-label="Schedule Service">
    Schedule Service: (518) 374-6111
  </a>
</div>

<style lang="scss">
  @use '../../scss/core/_mixins' as *;
  @use '../../lib/styles/variables.scss' as *;
  
  .site-header {
    position: sticky;
    top: 0;
    background-color: $white;
    padding: $spacing-2 $spacing-4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba($black, 0.1);
    z-index: $z-index-header;
    height: 70px;
    
    @include md {
      padding: $spacing-2 $spacing-6;
    }
  }
  
  .logo {
    font-family: $font-primary;
    font-weight: $font-weight-bold;
    font-size: $font-size-xl;
    color: $scotia-blue;
    text-decoration: none;
    
    @include md {
      font-size: $font-size-xl;
    }
  }
  
  .cta-bottom {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $scotia-red;
    padding: $spacing-2;
    text-align: center;
    z-index: 80;
    
    @include md {
      display: none;
    }
    
    .cta-button {
      color: $white;
      font-weight: $font-weight-semibold;
      text-decoration: none;
    }
  }
</style> 