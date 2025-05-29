<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import type { Snippet } from 'svelte';

  // Props definition - Svelte 5 style with $props rune
  const { 
    rootMargin = '200px', 
    threshold = 0, 
    height = 'auto',
    width = 'auto',
    once = true,
    placeholder = null,
    background = 'transparent',
    className = '',
    transition = true,
    delay = 0,
    children = () => null,
    placeholderContent = () => null
  } = $props<{
    rootMargin?: string;
    threshold?: number | string;
    height?: string;
    width?: string;
    once?: boolean;
    placeholder?: string | null;
    background?: string;
    className?: string;
    transition?: boolean;
    delay?: number;
    children?: Snippet;
    placeholderContent?: Snippet;
  }>();
  
  // State management
  let isVisible = $state(false);
  let hasLoaded = $state(false);
  let element = $state<HTMLDivElement | null>(null);
  let observer: IntersectionObserver | null = null;
  
  // Create the intersection observer when component mounts - moved to onMount for safety
  onMount(() => {
    if (!browser || typeof IntersectionObserver === 'undefined') {
      // If IntersectionObserver isn't supported or we're in SSR, show content immediately
      isVisible = true;
      hasLoaded = true;
      return;
    }
    
    // Setup options
    const options = {
      rootMargin,
      threshold: typeof threshold === 'string' ? parseFloat(threshold) : threshold
    };
    
    // Create observer
    observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        isVisible = true;
        
        // After a delay, mark as loaded for transitions
        if (delay > 0) {
          setTimeout(() => {
            hasLoaded = true;
          }, delay);
        } else {
          hasLoaded = true;
        }
        
        // Disconnect if we only care about first visibility
        if (once && observer) {
          observer.disconnect();
        }
      } else if (!once) {
        isVisible = false;
      }
    }, options);
    
    // Start observing our element if it exists
    if (element) {
      observer.observe(element);
    }
    
    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });
</script>

<div
  bind:this={element}
  class="lazy-load-container {className}"
  class:visible={isVisible}
  class:loaded={hasLoaded}
  class:with-transition={transition}
  style="min-height: {height}; min-width: {width}; background-color: {background};"
  role="presentation"
>
  {#if isVisible}
    <div class="lazy-content">
      {@render children()}
    </div>
  {:else if placeholder}
    <div class="lazy-placeholder">
      {#if typeof placeholder === 'string'}
        <div class="placeholder-text">{placeholder}</div>
      {:else}
        {@render placeholderContent()}
      {/if}
    </div>
  {/if}
</div>

<style>
  .lazy-load-container {
    position: relative;
    display: block;
    width: 100%;
  }
  
  .lazy-content {
    width: 100%;
  }
  
  .with-transition .lazy-content {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .with-transition.loaded .lazy-content {
    opacity: 1;
    transform: translateY(0);
  }
  
  .lazy-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .placeholder-text {
    color: #9CA3AF;
    font-size: 0.875rem;
  }
  
  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .with-transition .lazy-content {
      transition: opacity 0.1s ease;
      transform: none;
    }
  }
</style> 