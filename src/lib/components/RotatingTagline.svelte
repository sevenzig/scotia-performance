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
  let currentTaglineIndex = $state(Math.floor(Math.random() * taglines.length));
  let isClient = $state(false);
  
  // Derived current tagline
  let currentTagline = $derived(taglines[currentTaglineIndex]);
  
  // Rotation logic
  function rotateTagline() {
    if (!document.hidden && isClient) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * taglines.length);
      } while (newIndex === currentTaglineIndex);
      
      currentTaglineIndex = newIndex;
    }
  }
  
  // Initialize after component mounts
  onMount(() => {
    isClient = true;
    
    // Set up rotation interval
    const interval = setInterval(rotateTagline, 5000);
    
    return () => clearInterval(interval);
  });
</script>

<div class="tagline">
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
    width: 100%;
    min-width: 100%;
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