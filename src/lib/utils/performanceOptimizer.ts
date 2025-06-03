// Performance Optimization Utilities for Scotia Performance
// Provides utilities for lazy loading, content visibility, and performance monitoring

import { browser } from '$app/environment';

/**
 * Interface for performance metrics
 */
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  load?: number; // Load event
}

/**
 * Performance observer for monitoring key metrics
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];
  private callbacks: Array<(metrics: PerformanceMetrics) => void> = [];

  constructor() {
    if (browser && 'PerformanceObserver' in window) {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    try {
      // Paint metrics (FCP)
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.notifyCallbacks();
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
      this.observers.push(paintObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.startTime;
        this.notifyCallbacks();
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
          this.notifyCallbacks();
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cls = clsValue;
        this.notifyCallbacks();
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(clsObserver);

    } catch (error) {
      console.warn('PerformanceObserver not fully supported:', error);
    }
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  public onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.callbacks = [];
  }
}

/**
 * Intersection Observer wrapper for lazy loading
 */
export class LazyLoader {
  private observer: IntersectionObserver | null = null;
  private elements: Map<Element, () => void> = new Map();

  constructor(options: IntersectionObserverInit = {}) {
    if (browser && 'IntersectionObserver' in window) {
      const defaultOptions: IntersectionObserverInit = {
        rootMargin: '50px 0px',
        threshold: 0.1,
        ...options
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const callback = this.elements.get(entry.target);
            if (callback) {
              callback();
              this.unobserve(entry.target);
            }
          }
        });
      }, defaultOptions);
    }
  }

  public observe(element: Element, callback: () => void) {
    if (this.observer) {
      this.elements.set(element, callback);
      this.observer.observe(element);
    } else {
      // Fallback: execute immediately if IntersectionObserver not supported
      callback();
    }
  }

  public unobserve(element: Element) {
    if (this.observer) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.elements.clear();
    }
  }
}

/**
 * Utility for content visibility optimization
 */
export function applyContentVisibility(element: Element, options: {
  containIntrinsicSize?: string;
  className?: string;
} = {}) {
  if (!browser || !element) return;

  const { containIntrinsicSize = '0 500px', className = 'content-visibility-auto' } = options;

  // Apply content-visibility styles
  const style = (element as HTMLElement).style;
  style.contentVisibility = 'auto';
  style.containIntrinsicSize = containIntrinsicSize;
  
  // Add class for CSS targeting
  element.classList.add(className);
}

/**
 * Adaptive loading based on connection speed
 */
export function getConnectionInfo() {
  if (!browser) return { effectiveType: '4g', saveData: false };

  const connection = (navigator as any).connection;
  return {
    effectiveType: connection?.effectiveType || '4g',
    saveData: connection?.saveData || false,
    downlink: connection?.downlink || 10,
    rtt: connection?.rtt || 50
  };
}

/**
 * Check if user is on a slow connection
 */
export function isSlowConnection(): boolean {
  const { effectiveType, saveData } = getConnectionInfo();
  return effectiveType === '2g' || effectiveType === 'slow-2g' || saveData;
}

/**
 * Adaptive resource loading utility
 */
export function loadResourceAdaptively(
  fastConnectionResource: string,
  slowConnectionResource?: string,
  options: {
    as?: string;
    crossorigin?: string;
    media?: string;
  } = {}
): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    if (!browser) {
      reject(new Error('Not in browser environment'));
      return;
    }

    const isSlow = isSlowConnection();
    const resourceUrl = isSlow && slowConnectionResource ? slowConnectionResource : fastConnectionResource;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resourceUrl;
    
    if (options.as) link.as = options.as;
    if (options.crossorigin) link.crossOrigin = options.crossorigin;
    if (options.media) link.media = options.media;

    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Failed to load resource: ${resourceUrl}`));

    document.head.appendChild(link);
  });
}

/**
 * Preload critical images with priority hints
 */
export function preloadCriticalImage(
  src: string,
  priority: 'high' | 'low' = 'high'
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!browser) {
      reject(new Error('Not in browser environment'));
      return;
    }

    const img = new Image();
    (img as any).fetchPriority = priority;
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    
    img.src = src;
  });
}

/**
 * Defer non-critical scripts
 */
export function loadScriptDeferred(src: string, async: boolean = true): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    if (!browser) {
      reject(new Error('Not in browser environment'));
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = true;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

    document.head.appendChild(script);
  });
}

/**
 * Optimize font loading with display swap
 */
export function loadFontOptimized(
  fontFamily: string,
  fontUrl: string,
  options: {
    weight?: string;
    style?: string;
    display?: string;
  } = {}
) {
  if (!browser) return;

  const { weight = 'normal', style = 'normal', display = 'swap' } = options;

  // Create font face
  const fontFace = new FontFace(fontFamily, `url(${fontUrl})`, {
    weight,
    style,
    display: display as FontDisplay
  });

  // Add to document fonts
  document.fonts.add(fontFace);

  // Load the font
  fontFace.load().then(() => {
    document.documentElement.classList.add(`font-${fontFamily.toLowerCase()}-loaded`);
  }).catch(error => {
    console.warn(`Failed to load font ${fontFamily}:`, error);
  });
}

/**
 * Performance-aware component initialization
 */
export function initializeComponentOptimized(
  element: Element,
  initCallback: () => void,
  options: {
    delay?: number;
    useIntersectionObserver?: boolean;
    rootMargin?: string;
    threshold?: number;
  } = {}
) {
  if (!browser || !element) {
    initCallback();
    return;
  }

  const {
    delay = 0,
    useIntersectionObserver = true,
    rootMargin = '50px 0px',
    threshold = 0.1
  } = options;

  if (!useIntersectionObserver) {
    if (delay > 0) {
      setTimeout(initCallback, delay);
    } else {
      initCallback();
    }
    return;
  }

  const lazyLoader = new LazyLoader({ rootMargin, threshold });
  lazyLoader.observe(element, () => {
    if (delay > 0) {
      setTimeout(initCallback, delay);
    } else {
      initCallback();
    }
  });
}

// Export singleton instances
export const performanceMonitor = new PerformanceMonitor();
export const globalLazyLoader = new LazyLoader(); 