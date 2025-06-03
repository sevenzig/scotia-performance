<!-- 
Advanced Lazy Loading Component
Efficiently loads content only when it enters the viewport using Intersection Observer
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Type definitions
  interface Props {
    height?: string;
    rootMargin?: string;
    threshold?: number;
    once?: boolean;
    placeholder?: string;
    onVisible?: () => void;
    onHidden?: () => void;
    disabled?: boolean;
    children: import('svelte').Snippet;
  }

  const {
    height = 'auto',
    rootMargin = '200px',
    threshold = 0.01,
    once = true,
    placeholder = '',
    onVisible,
    onHidden,
    disabled = false,
    children
  }: Props = $props();

  // State management
  let isVisible = $state(false);
  let hasBeenVisible = $state(false);
  let elementRef = $state<HTMLElement | null>(null);

  // Track if component should render content
  const shouldRender = $derived(
    disabled || (!browser ? false : (once ? hasBeenVisible : isVisible))
  );

  // Initialize intersection observer
  onMount(() => {
    if (!browser || disabled || !elementRef) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without support
      isVisible = true;
      hasBeenVisible = true;
      onVisible?.();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;

          if (isVisible && !hasBeenVisible) {
            hasBeenVisible = true;
            onVisible?.();
          } else if (!isVisible && wasVisible && !once) {
            onHidden?.();
          }

          // If once mode and element is visible, disconnect observer
          if (once && isVisible) {
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(elementRef);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  });

  // Handle SSR - render placeholder or content based on disabled state
  const showPlaceholder = $derived(!shouldRender && placeholder);
</script>

<div 
  bind:this={elementRef}
  class="lazy-load-container"
  style:height
  class:visible={shouldRender}
  class:has-placeholder={showPlaceholder}
>
  {#if shouldRender}
    {@render children()}
  {:else if showPlaceholder}
    <div class="lazy-placeholder">
      {placeholder}
    </div>
  {:else}
    <div class="lazy-placeholder">
      <div class="loading-indicator">
        <div class="loading-spinner"></div>
        <span class="loading-text">Loading...</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .lazy-load-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .lazy-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
  }

  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: #6b7280;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #1e3a8a;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    font-size: 0.875rem;
    font-weight: 500;
  }

  /* Animation for content appearance */
  .lazy-load-container.visible {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .lazy-load-container.visible {
      animation: none;
    }
    
    .loading-spinner {
      animation: none;
      border: 2px solid #1e3a8a;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .lazy-placeholder {
      border: 2px solid currentColor;
    }
    
    .loading-spinner {
      border-color: currentColor;
      border-top-color: transparent;
    }
  }
</style> 