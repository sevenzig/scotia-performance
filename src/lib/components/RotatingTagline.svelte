<script lang="ts">
  import { onMount } from 'svelte';
  
  // Taglines
  const taglines = [
    "ASE Certified Master Technicians",
    "Professional Diagnostics & Repair",
    "All Makes & Models",
    "Local Family-Owned Since 1995"
  ];
  
  // Current tagline state
  let currentTagline = $state(0);
  
  // Start rotation
  onMount(() => {
    const interval = setInterval(() => {
      currentTagline = (currentTagline + 1) % taglines.length;
    }, 3000);
    
    return () => clearInterval(interval);
  });
</script>

<div class="tagline">
  {taglines[currentTagline]}
</div>

<style lang="scss">
  @use '../../scss/core/mixins' as *;
  @use '../../scss/core/variables' as *;
  
  .tagline {
    background-color: $scotia-blue;
    color: $white;
    padding: $spacing-3 0;
    text-align: center;
    font-family: $font-primary;
    font-weight: $font-weight-medium;
    font-size: $font-size-lg;
  }
</style> 