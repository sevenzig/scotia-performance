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
  let carouselContainer: HTMLDivElement;

  // Derived state using $derived runes
  const totalImages = $derived(images.length);
  const isCarouselReady = $derived(totalImages > 0 && !isLoading);
  const translateX = $derived(-currentIndex * (imageWidth + 16)); // 16px for gap
  const carouselStyles = $derived({
    transform: `translateX(${translateX}px)`,
    transition: `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
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

      images = validImages;
    } catch (error) {
      console.error('Error loading images:', error);
      images = [];
    } finally {
      isLoading = false;
    }
  }

  // Navigation functions
  function goToNext() {
    if (!isCarouselReady) return;
    currentIndex = (currentIndex + 1) % totalImages;
  }

  function goToPrevious() {
    if (!isCarouselReady) return;
    currentIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
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
  function handleMouseEnter() {
    if (pauseOnHover) {
      isHovered = true;
    }
  }

  function handleMouseLeave() {
    if (pauseOnHover) {
      isHovered = false;
    }
  }

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

<div 
  class="manufacturer-carousel"
  role="region"
  aria-label={ariaLabel}
  aria-live="polite"
  tabindex="0"
  bind:this={carouselContainer}
  onkeydown={handleKeydown}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
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
      <!-- Carousel track -->
      <div 
        class="carousel-track"
        style="transform: {carouselStyles.transform}; transition: {carouselStyles.transition};"
        aria-label="Manufacturer logos"
      >
        {#each images as imagePath, index (imagePath)}
          <div 
            class="image-container"
            class:active={index === currentIndex}
            role="img"
            aria-label={getManufacturerName(imagePath)}
            onclick={() => handleImageClick(index)}
            tabindex="0"
            onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && handleImageClick(index)}
          >
            <img
              src={imagePath}
              alt="{getManufacturerName(imagePath)} logo"
              loading="lazy"
              draggable="false"
            />
          </div>
        {/each}
      </div>

      <!-- Navigation dots -->
      <div class="carousel-dots" role="tablist" aria-label="Carousel navigation">
        {#each images as _, index}
          <button
            class="carousel-dot"
            class:active={index === currentIndex}
            role="tab"
            aria-label="Go to slide {index + 1}"
            aria-selected={index === currentIndex}
            onclick={() => goToImage(index)}
          ></button>
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
          style="width: {((currentIndex + 1) / totalImages) * 100}%"
        ></div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  /* CSS Custom Properties */
  .manufacturer-carousel {
    --primary-color: var(--scotia-blue, #1e3a8a);
    --accent-color: rgba(30, 58, 138, 0.1);
    --glow-color: rgba(30, 58, 138, 0.4);
    --shadow-color: rgba(30, 58, 138, 0.25);
    --shimmer-color: rgba(255, 255, 255, 0.6);
    --border-radius: 0.75rem;
    --gap-size: 1rem;
  }

  /* Main Container */
  .manufacturer-carousel {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
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
  }

  /* Carousel Track */
  .carousel-track {
    display: flex;
    gap: var(--gap-size);
    width: fit-content;
    will-change: transform;
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
    transition: all var(--transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    outline: none;

    /* Shimmer effect base */
    overflow: hidden;
  }

  /* Shimmer effect pseudo-element */
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
      var(--shimmer-color) 40%,
      var(--shimmer-color) 60%,
      transparent 80%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    z-index: 1;
    pointer-events: none;
    border-radius: var(--border-radius);
    opacity: 0;
  }

  .image-container:hover,
  .image-container:focus-visible {
    transform: translateY(-8px) scale(1.02);
    border-color: var(--primary-color);
    box-shadow: 
      0 20px 40px var(--shadow-color),
      0 10px 20px rgba(0, 0, 0, 0.1),
      0 0 0 1px var(--primary-color),
      0 0 20px var(--glow-color);
  }

  .image-container:hover::before,
  .image-container:focus-visible::before {
    transform: translateX(100%);
    opacity: 1;
  }

  .image-container:not(:hover):not(:focus-visible)::before {
    transform: translateX(-100%);
    opacity: 0;
    transition: transform 0s, opacity 0.2s ease;
  }

  .image-container.active {
    border-color: var(--primary-color);
    box-shadow: 
      0 8px 25px var(--shadow-color),
      0 4px 10px rgba(0, 0, 0, 0.1),
      0 0 0 2px var(--primary-color);
  }

  /* Image Styling */
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    transition: all var(--transition-duration) ease;
    position: relative;
    z-index: 2;
    border-radius: calc(var(--border-radius) - 0.5rem);
  }

  /* Navigation Dots */
  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding: 1rem;
  }

  .carousel-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    border: none;
    background-color: #d1d5db;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
    position: relative;
  }

  .carousel-dot:hover,
  .carousel-dot:focus-visible {
    background-color: #9ca3af;
    transform: scale(1.2);
  }

  .carousel-dot.active {
    background-color: var(--primary-color);
    transform: scale(1.3);
  }

  .carousel-dot:focus-visible {
    box-shadow: 0 0 0 3px var(--glow-color);
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
    transition: all 0.3s ease;
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
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), #3b82f6);
    transition: width var(--transition-duration) ease;
    border-radius: inherit;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .manufacturer-carousel {
      --image-width: 200px;
      --image-height: 200px;
      --gap-size: 0.75rem;
      padding: 1.5rem 0.75rem;
    }

    .carousel-dots {
      gap: 0.375rem;
      margin-top: 1rem;
    }

    .carousel-dot {
      width: 0.625rem;
      height: 0.625rem;
    }

    .play-pause-btn {
      width: 2rem;
      height: 2rem;
      top: 0.75rem;
      right: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .manufacturer-carousel {
      --image-width: 150px;
      --image-height: 150px;
      --gap-size: 0.5rem;
      padding: 1rem 0.5rem;
    }

    .image-container {
      padding: 0.75rem;
    }
  }

  /* Accessibility: Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .carousel-track,
    .image-container,
    .carousel-dot,
    .play-pause-btn,
    .progress-fill {
      transition: none;
    }

    .image-container:hover,
    .image-container:focus-visible {
      transform: none;
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

    .carousel-dot {
      border: 2px solid currentColor;
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