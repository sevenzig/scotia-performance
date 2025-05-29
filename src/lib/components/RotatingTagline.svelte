<script lang="ts">
  import { onMount } from 'svelte';
  
  // Taglines data - following the same pattern as other components
  const taglines = [
    "Your premier automotive service center in Scotia, NY",
    "Quality workmanship from ASE certified technicians", 
    "Specializing in both performance and everyday repairs",
    "Serving Scotia and the Greater Capital Region since 2005",
    "Trusted by local auto enthusiasts and everyday drivers alike"
  ];
  
  // Component state using Svelte 5 runes
  let currentTaglineIndex = $state(0);
  let mounted = $state(false);
  let isVisible = $state(true);
  
  // Derived current tagline - ensure it's always valid
  let currentTagline = $derived(taglines[currentTaglineIndex] || taglines[0]);
  
  // Rotation logic with fade transition to prevent text node conflicts
  function rotateTagline() {
    if (!document.hidden && mounted) {
      // Fade out
      isVisible = false;
      
      setTimeout(() => {
        // Change tagline while invisible
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * taglines.length);
        } while (newIndex === currentTaglineIndex && taglines.length > 1);
        
        currentTaglineIndex = newIndex;
        
        // Fade back in
        setTimeout(() => {
          isVisible = true;
        }, 50);
      }, 150);
    }
  }
  
  // Initialize after component mounts
  onMount(() => {
    // Set random initial tagline
    currentTaglineIndex = Math.floor(Math.random() * taglines.length);
    mounted = true;
    
    // Set up rotation interval
    const interval = setInterval(rotateTagline, 5000);
    
    return () => clearInterval(interval);
  });
</script>

<div class="tagline" class:visible={isVisible}>
  {currentTagline}
</div>

<style>
  .tagline {
    text-align: center;
    padding: 1rem;
    background-color: #f3f4f6;
    font-style: italic;
    font-weight: 500;
    color: #374151;
    transition: opacity 0.3s ease;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    opacity: 0;
    
    &.visible {
      opacity: 1;
    }
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .tagline {
      transition: none;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .tagline {
      padding: 0.75rem;
      font-size: 0.875rem;
    }
  }
</style> 