<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  // Props for component
  const {
    src,
    alt = '',
    width,
    height,
    sources = [],
    className = '',
    loading = 'lazy',
    decoding = 'async',
    fetchPriority = 'auto',
    eager = false,
    thumb = ''
  } = $props();

  // Track if image has loaded
  let isLoaded = $state(false);
  let isVisible = $state(false);
  let containerElement = $state<HTMLElement | null>(null);
  
  // Use onMount for safer DOM manipulation
  onMount(() => {
    if (!browser) {
      isVisible = true;
      return;
    }
    
    if (eager) {
      isVisible = true;
      return;
    }
    
    // Use Intersection Observer for more efficient loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '200px', // Load images a bit before they enter viewport
      threshold: 0.01
    });
    
    // Observe the container element if it exists
    if (containerElement) {
      observer.observe(containerElement);
    }
    
    return () => observer.disconnect();
  });
  
  function handleLoad() {
    isLoaded = true;
  }
</script>

<div class="responsive-image-container {className}" class:loaded={isLoaded} bind:this={containerElement}>
  {#if isVisible || eager || loading === 'eager'}
    {#if sources && sources.length > 0}
      <picture>
        {#each sources as source}
          <source srcset={source.srcset} type={source.type} sizes={source.sizes || undefined} />
        {/each}
        <img
          {src}
          {alt}
          width={width}
          height={height}
          loading={eager ? "eager" : loading}
          decoding={decoding}
          fetchpriority={fetchPriority}
          onload={handleLoad}
          class="responsive-image"
        />
      </picture>
    {:else}
      <img
        {src}
        {alt}
        width={width}
        height={height}
        loading={eager ? "eager" : loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        onload={handleLoad}
        class="responsive-image"
      />
    {/if}
  {/if}
  
  <!-- Blur up placeholder if available -->
  {#if thumb && !isLoaded}
    <img 
      src={thumb} 
      alt="" 
      aria-hidden="true"
      class="placeholder-image" 
      width={width} 
      height={height}
      loading="eager"
      decoding="sync"
    />
  {/if}
  
  <!-- Placeholder/loader shown before image loads -->
  {#if !isLoaded}
    <div class="image-placeholder" class:with-thumb={thumb}>
      <div class="image-loader"></div>
    </div>
  {/if}
</div>

<style>
  .responsive-image-container {
    position: relative;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.05);
    contain: paint; /* Use contain for better render performance */
  }
  
  .responsive-image {
    display: block;
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 0.3s ease;
    will-change: opacity; /* Hint to browser for optimization */
  }
  
  .loaded .responsive-image {
    opacity: 1;
  }
  
  .placeholder-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px);
    transform: scale(1.1); /* Avoid blur edges */
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .loaded .placeholder-image {
    opacity: 0;
    pointer-events: none;
  }
  
  .image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.05);
    transition: opacity 0.3s ease;
  }
  
  .image-placeholder.with-thumb {
    background-color: transparent;
  }
  
  .loaded .image-placeholder {
    opacity: 0;
    pointer-events: none;
  }
  
  .image-loader {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #1b3147;
    animation: spin 1s linear infinite;
  }
  
  /* Use content-visibility for off-screen images to improve rendering */
  @supports (content-visibility: auto) {
    .responsive-image-container:not(.loaded) {
      content-visibility: auto;
      /* Add fallback height before contain-intrinsic-size */
      min-height: 300px;
      /* Use width property first, which is more widely supported */
      width: 100%;
      height: 300px;
      contain-intrinsic-size: 100% 300px;
    }
  }
  
  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .responsive-image,
    .placeholder-image {
      transition: none;
    }
    
    .image-loader {
      animation: none;
      border: 2px solid #1b3147;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style> 