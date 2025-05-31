<script lang="ts">
  import { onMount } from 'svelte';

  // Component props using Svelte 5 runes with proper TypeScript types
  const { 
    folderPath = '/images/car_manufacturer_logos',
    transitionDuration = 500,
    autoAdvanceInterval = 3500,
    imageWidth = 250,
    imageHeight = 250,
    pauseOnHover = true,
    ariaLabel = 'Car manufacturer logos carousel'
  } = $props<{
    folderPath?: string;
    transitionDuration?: number;
    autoAdvanceInterval?: number;
    imageWidth?: number;
    imageHeight?: number;
    pauseOnHover?: boolean;
    ariaLabel?: string;
  }>();

  // State management using $state runes
  let images = $state<string[]>([]);
  let currentIndex = $state(0);
  let isLoading = $state(true);
  let isHovered = $state(false);
  let isPaused = $state(false);
  let carouselContainer: HTMLElement;
  let isResetting = $state(false);

  // Derived state using $derived runes
  const totalImages = $derived(images.length);
  const originalImageCount = $derived(Math.floor(totalImages / 3)); // Since we'll triple the images
  const isCarouselReady = $derived(totalImages > 0 && !isLoading);
  const translateX = $derived(-currentIndex * (imageWidth + 16)); // 16px for gap
  const carouselStyles = $derived({
    transform: `translateX(${translateX}px)`,
    transition: isResetting ? 'none' : `transform ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
  });

  // Auto-advance timer
  let autoAdvanceTimer: NodeJS.Timeout | null = null;

  // Image loading function
  async function loadImages() {
    try {
      isLoading = true;
      
      // Predefined list of manufacturer logos based on the folder contents
      const logoFiles = [
        'Acura-logo-1990-640x406.jpg',
        'audi-logo-2016-640.png',
        'cadillac-logo-2021-full-640.png',
        'Chevrolet-logo-2013-2560x1440.png',
        'chrysler-logo-2009-640.png',
        'dodge-logo-2010-640.png',
        'ford-logo-2017-download.png',
        'GMC-logo-2200x600.png',
        'honda-logo-2000-full-640.png',
        'hyundai-logo-2011-640.png',
        'Infiniti-logo-1989-2560x1440.png',
        'jeep-logo-1993-640.png',
        'Kia-logo-640x321.jpg',
        'Lincoln-logo-2019-1920x1080.png',
        'mazda-logo-2018-vertical-640.png',
        'Mercedes-Benz-logo-2011-640x369.jpg',
        'Mitsubishi-logo-640x550.jpg',
        'nissan-logo-2020-black.png',
        'porsche-logo-2014-full-640.png',
        'subaru-logo-2019-640.png',
        'toyota-logo-2020-europe-640.png',
        'Volkswagen-logo-2019-640x500.jpg'
      ];

      // Validate images exist and are loadable
      const validImages: string[] = [];
      
      for (const filename of logoFiles) {
        const imagePath = `${folderPath}/${filename}`;
        try {
          // Create a promise to test if image loads
          await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = imagePath;
          });
          validImages.push(imagePath);
        } catch {
          console.warn(`Failed to load image: ${imagePath}`);
        }
      }

      // Create infinite scroll by tripling the images
      const infiniteImages = [...validImages, ...validImages, ...validImages];
      images = infiniteImages;
      
      // Start at the middle set to allow scrolling in both directions
      currentIndex = validImages.length;
    } catch (error) {
      console.error('Error loading images:', error);
      images = [];
    } finally {
      isLoading = false;
    }
  }

  // Navigation functions with infinite scroll logic
  function goToNext() {
    if (!isCarouselReady) return;
    currentIndex++;
    
    // Reset to middle set when reaching the end
    if (currentIndex >= totalImages - originalImageCount) {
      setTimeout(() => {
        isResetting = true;
        currentIndex = originalImageCount;
        setTimeout(() => {
          isResetting = false;
        }, 50);
      }, transitionDuration);
    }
  }

  function goToPrevious() {
    if (!isCarouselReady) return;
    currentIndex--;
    
    // Reset to middle set when reaching the beginning
    if (currentIndex < originalImageCount) {
      setTimeout(() => {
        isResetting = true;
        currentIndex = totalImages - originalImageCount * 2;
        setTimeout(() => {
          isResetting = false;
        }, 50);
      }, transitionDuration);
    }
  }

  function goToImage(index: number) {
    if (!isCarouselReady || index < 0 || index >= totalImages) return;
    currentIndex = index;
  }

  // Auto-advance functionality
  function startAutoAdvance() {
    if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
    
    autoAdvanceTimer = setInterval(() => {
      if (!isPaused && !isHovered && isCarouselReady) {
        goToNext();
      }
    }, autoAdvanceInterval);
  }

  function stopAutoAdvance() {
    if (autoAdvanceTimer) {
      clearInterval(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  // Event handlers
  function handleKeydown(event: KeyboardEvent) {
    if (!isCarouselReady) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNext();
        break;
      case ' ':
        event.preventDefault();
        isPaused = !isPaused;
        break;
    }
  }

  function handleImageClick(index: number) {
    goToImage(index);
  }

  // Lifecycle effects
  onMount(() => {
    loadImages();
    return () => stopAutoAdvance();
  });

  // Effect for auto-advance
  $effect(() => {
    if (isCarouselReady) {
      startAutoAdvance();
    }
    
    return () => stopAutoAdvance();
  });

  // Extract manufacturer name from filename for alt text
  function getManufacturerName(imagePath: string): string {
    const filename = imagePath.split('/').pop() || '';
    const nameWithoutExtension = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    // Clean up the name (remove years, dimensions, etc.)
    const cleanName = nameWithoutExtension
      .replace(/-logo.*$/i, '')
      .replace(/-\d+.*$/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    return cleanName || 'Car manufacturer';
  }
</script>

<section 
  class="manufacturer-carousel"
  role="application"
  aria-label={ariaLabel}
  aria-live="polite"
  bind:this={carouselContainer}
  style="--image-width: {imageWidth}px; --image-height: {imageHeight}px; --transition-duration: {transitionDuration}ms;"
>
  {#if isLoading}
    <div class="loading-container" aria-label="Loading manufacturer logos">
      <div class="loading-spinner"></div>
      <span class="loading-text">Loading manufacturer logos...</span>
    </div>
  {:else if !isCarouselReady}
    <div class="error-container" role="alert">
      <span class="error-text">No manufacturer logos available</span>
    </div>
  {:else}
    <div class="carousel-wrapper">
      <!-- Previous arrow -->
      <button
        class="carousel-arrow carousel-arrow--prev"
        onclick={goToPrevious}
        aria-label="Previous manufacturer logos"
        title="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <!-- Next arrow -->
      <button
        class="carousel-arrow carousel-arrow--next"
        onclick={goToNext}
        aria-label="Next manufacturer logos"
        title="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <!-- Carousel track -->
      <div 
        class="carousel-track"
        style="transform: {carouselStyles.transform}; transition: {carouselStyles.transition};"
        aria-label="Manufacturer logos"
        role="group"
        onmouseenter={() => isHovered = true}
        onmouseleave={() => isHovered = false}
      >
        {#each images as imagePath, index (imagePath + index)}
          <button 
            class="image-container"
            type="button"
            tabindex={index === currentIndex ? "0" : "-1"}
            aria-label="Select {getManufacturerName(imagePath)} logo"
            onclick={() => handleImageClick(index)}
            onkeydown={handleKeydown}
          >
            <img
              src={imagePath}
              alt="{getManufacturerName(imagePath)} logo"
              loading="lazy"
              draggable="false"
            />
          </button>
        {/each}
      </div>

      <!-- Play/Pause control -->
      <button
        class="play-pause-btn"
        onclick={() => isPaused = !isPaused}
        aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
        title={isPaused ? 'Resume carousel' : 'Pause carousel'}
      >
        {#if isPaused}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        {:else}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        {/if}
      </button>

      <!-- Progress indicator -->
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          style="width: {((currentIndex % originalImageCount + 1) / originalImageCount) * 100}%"
        ></div>
      </div>
    </div>
  {/if}
</section>

<style lang="scss">
  /* CSS Custom Properties */
  .manufacturer-carousel {
    --primary-color: var(--scotia-blue, #1e3a8a);
    --accent-color: rgba(30, 58, 138, 0.1);
    --glow-color: rgba(30, 58, 138, 0.4);
    --shadow-color: rgba(30, 58, 138, 0.25);
    --shimmer-color: rgba(255, 255, 255, 0.8);
    --shimmer-secondary: rgba(255, 255, 255, 0.4);
    --border-radius: 0.75rem;
    --gap-size: 1rem;
  }

  /* Main Container */
  .manufacturer-carousel {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2.5rem 3.5rem 2.5rem;
    position: relative;
    outline: none;
    background-color: #f9fafb;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 1rem;
  }

  .loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid var(--accent-color);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    color: #6b7280;
    font-size: 0.875rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Error State */
  .error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: #dc2626;
    font-size: 0.875rem;
  }

  /* Carousel Wrapper */
  .carousel-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: 0 1rem;
  }

  /* Carousel Arrow Navigation */
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.9);
    color: var(--primary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 4;
    opacity: 0.8;
  }

  .carousel-arrow:hover,
  .carousel-arrow:focus-visible {
    background-color: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    opacity: 1;
  }

  .carousel-arrow:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .carousel-arrow--prev {
    left: 1rem;
  }

  .carousel-arrow--next {
    right: 1rem;
  }

  /* Carousel Track */
  .carousel-track {
    display: flex;
    gap: var(--gap-size);
    width: fit-content;
    will-change: transform;
    padding: 1rem 0 2rem 0;
  }

  /* Image Container */
  .image-container {
    width: var(--image-width);
    height: var(--image-height);
    position: relative;
    cursor: pointer;
    border-radius: var(--border-radius);
    background-color: white;
    padding: 1rem;
    border: 2px solid #e5e7eb;
    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    outline: none;

    /* Shimmer effect base */
    overflow: hidden;
    
    /* Button-specific styles */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Enhanced Shimmer effect pseudo-element */
  .image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      110deg,
      transparent 20%,
      rgba(255, 255, 255, 0.9) 40%,
      rgba(255, 255, 255, 0.9) 60%,
      transparent 80%
    ) !important;
    transform: translateX(-100%) !important;
    transition: transform 0.6s ease !important;
    z-index: 10 !important;
    pointer-events: none !important;
    border-radius: var(--border-radius);
    opacity: 0 !important;
  }

  .image-container:hover,
  .image-container:focus-visible {
    transform: scale(1.05);
    box-shadow: 
      0 8px 20px var(--shadow-color),
      0 4px 10px rgba(0, 0, 0, 0.08),
      0 0 15px rgba(255, 255, 255, 0.2);
  }

  .image-container:hover::before {
    transform: translateX(100%) !important;
    opacity: 1 !important;
  }

  .image-container:not(:hover)::before {
    transform: translateX(-100%) !important;
    opacity: 0 !important;
    transition: transform 0s, opacity 0.2s ease !important;
  }

  /* Image Styling */
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    z-index: 1;
    border-radius: calc(var(--border-radius) - 0.5rem);
  }

  /* Ensure all content stays BELOW shimmer effect */
  .image-container > * {
    position: relative;
    z-index: 1;
  }

  /* Play/Pause Button */
  .play-pause-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.9);
    color: var(--primary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 3;
  }

  .play-pause-btn:hover,
  .play-pause-btn:focus-visible {
    background-color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .play-pause-btn:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Progress Bar */
  .progress-bar {
    position: absolute;
    bottom: 0.5rem;
    left: 1rem;
    right: 1rem;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 1rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), #3b82f6);
    transition: width 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: inherit;
    opacity: 0.7;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .manufacturer-carousel {
      --image-width: 200px;
      --image-height: 200px;
      --gap-size: 0.75rem;
      padding: 2.5rem 1.5rem 3rem 1.5rem;
    }

    .carousel-wrapper {
      padding: 0 0.75rem;
    }

    .carousel-track {
      padding: 0.75rem 0 1.5rem 0;
    }

    .carousel-arrow {
      width: 2.5rem;
      height: 2.5rem;
    }

    .carousel-arrow--prev {
      left: 0.5rem;
    }

    .carousel-arrow--next {
      right: 0.5rem;
    }

    .play-pause-btn {
      width: 2rem;
      height: 2rem;
      top: 0.75rem;
      right: 0.75rem;
    }

    .progress-bar {
      bottom: 0.5rem;
      left: 0.75rem;
      right: 0.75rem;
      margin: 0 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .manufacturer-carousel {
      --image-width: 150px;
      --image-height: 150px;
      --gap-size: 0.5rem;
      padding: 2rem 1rem 2.5rem 1rem;
    }

    .carousel-wrapper {
      padding: 0 0.5rem;
    }

    .carousel-track {
      padding: 0.5rem 0 1.25rem 0;
    }

    .image-container {
      padding: 0.75rem;
    }

    .carousel-arrow {
      width: 2rem;
      height: 2rem;
    }

    .carousel-arrow--prev {
      left: 0.25rem;
    }

    .carousel-arrow--next {
      right: 0.25rem;
    }

    .progress-bar {
      bottom: 0.25rem;
      left: 0.5rem;
      right: 0.5rem;
      margin: 0 0.5rem;
    }
  }

  /* Accessibility: Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .carousel-track,
    .image-container,
    .carousel-arrow,
    .play-pause-btn,
    .progress-fill {
      transition: none;
    }

    .image-container:hover,
    .image-container:focus-visible {
      transform: none;
    }

    .carousel-arrow:hover,
    .carousel-arrow:focus-visible {
      transform: translateY(-50%);
    }

    .image-container::before {
      display: none;
    }

    .loading-spinner {
      animation: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .image-container {
      border-color: currentColor;
    }

    .play-pause-btn {
      border: 2px solid currentColor;
    }
  }

  /* Focus management for keyboard navigation */
  .manufacturer-carousel:focus-within .image-container {
    transition-duration: 200ms;
  }

  /* Print styles */
  @media print {
    .manufacturer-carousel {
      display: none;
    }
  }
</style> 