<!--
Virtual List Component
Efficiently renders only visible items from large datasets
Supports variable height items and smooth scrolling
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Type definitions
  interface Props {
    items: any[];
    height: string;
    itemHeight?: number | ((index: number, item: any) => number);
    overscan?: number;
    className?: string;
    children: import('svelte').Snippet<[any, number]>;
  }

  const {
    items = [],
    height,
    itemHeight = 50,
    overscan = 5,
    className = '',
    children
  }: Props = $props();

  // State management
  let containerRef = $state<HTMLElement | null>(null);
  let scrollTop = $state(0);
  let containerHeight = $state(0);
  let totalHeight = $state(0);
  let startIndex = $state(0);
  let endIndex = $state(0);
  let visibleItems = $state<{ item: any; index: number; top: number; height: number }[]>([]);
  let itemHeights = $state<Map<number, number>>(new Map());

  // Calculate item height
  function getItemHeight(index: number): number {
    if (typeof itemHeight === 'function') {
      return itemHeight(index, items[index]);
    }
    return itemHeight;
  }

  // Calculate total height of all items
  function calculateTotalHeight(): number {
    if (typeof itemHeight === 'function') {
      let height = 0;
      for (let i = 0; i < items.length; i++) {
        height += getItemHeight(i);
      }
      return height;
    }
    return items.length * itemHeight;
  }

  // Calculate which items should be visible
  function calculateVisibleItems() {
    if (!containerRef || items.length === 0) {
      visibleItems = [];
      return;
    }

    const viewportHeight = containerHeight;
    const scrollTop_ = scrollTop;

    // Calculate start and end indices
    let startIdx = 0;
    let endIdx = items.length - 1;
    let currentTop = 0;

    if (typeof itemHeight === 'function') {
      // Variable height calculation
      for (let i = 0; i < items.length; i++) {
        const height = getItemHeight(i);
        if (currentTop + height > scrollTop_) {
          startIdx = Math.max(0, i - overscan);
          break;
        }
        currentTop += height;
      }

      currentTop = 0;
      for (let i = 0; i < items.length; i++) {
        const height = getItemHeight(i);
        if (currentTop > scrollTop_ + viewportHeight) {
          endIdx = Math.min(items.length - 1, i + overscan);
          break;
        }
        currentTop += height;
      }
    } else {
      // Fixed height calculation (more efficient)
      startIdx = Math.max(0, Math.floor(scrollTop_ / itemHeight) - overscan);
      endIdx = Math.min(
        items.length - 1,
        Math.ceil((scrollTop_ + viewportHeight) / itemHeight) + overscan
      );
    }

    startIndex = startIdx;
    endIndex = endIdx;

    // Generate visible items with positions
    const newVisibleItems: typeof visibleItems = [];
    let itemTop = 0;

    if (typeof itemHeight === 'function') {
      // Calculate top position for variable heights
      for (let i = 0; i < startIdx; i++) {
        itemTop += getItemHeight(i);
      }
    } else {
      itemTop = startIdx * itemHeight;
    }

    for (let i = startIdx; i <= endIdx; i++) {
      const height = getItemHeight(i);
      newVisibleItems.push({
        item: items[i],
        index: i,
        top: itemTop,
        height
      });
      itemTop += height;
    }

    visibleItems = newVisibleItems;
  }

  // Handle scroll events with throttling
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  function handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    scrollTop = target.scrollTop;

    // Throttle calculations for better performance
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      calculateVisibleItems();
    }, 16); // ~60fps
  }

  // Update calculations when items change
  $effect(() => {
    totalHeight = calculateTotalHeight();
    calculateVisibleItems();
  });

  // Initialize on mount
  onMount(() => {
    if (!browser || !containerRef) return;

    // Get container height
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerHeight = entry.contentRect.height;
        calculateVisibleItems();
      }
    });

    resizeObserver.observe(containerRef);

    return () => {
      resizeObserver.disconnect();
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  });

  // Handle dynamic height updates
  function updateItemHeight(index: number, height: number) {
    if (itemHeights.get(index) !== height) {
      itemHeights.set(index, height);
      totalHeight = calculateTotalHeight();
      calculateVisibleItems();
    }
  }
</script>

<div 
  bind:this={containerRef}
  class="virtual-list {className}"
  style:height
  on:scroll={handleScroll}
>
  <!-- Spacer for total height -->
  <div class="virtual-list-spacer" style:height="{totalHeight}px">
    <!-- Visible items -->
    {#each visibleItems as { item, index, top, height } (index)}
      <div 
        class="virtual-list-item"
        style:transform="translateY({top}px)"
        style:height="{height}px"
        data-index={index}
      >
        {@render children(item, index)}
      </div>
    {/each}
  </div>
</div>

<style>
  .virtual-list {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  .virtual-list-spacer {
    position: relative;
    pointer-events: none;
  }

  .virtual-list-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: auto;
    contain: layout style paint;
  }

  /* Optimize scrolling performance */
  .virtual-list {
    will-change: scroll-position;
  }

  .virtual-list-item {
    will-change: transform;
  }

  /* Custom scrollbar styling */
  .virtual-list::-webkit-scrollbar {
    width: 8px;
  }

  .virtual-list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .virtual-list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .virtual-list::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Support for high contrast mode */
  @media (prefers-contrast: high) {
    .virtual-list::-webkit-scrollbar-thumb {
      background: currentColor;
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .virtual-list {
      scroll-behavior: auto;
    }
  }
</style> 