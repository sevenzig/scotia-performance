/**
 * CSS Loading Optimization Utilities
 * Provides functions for optimizing CSS loading performance
 */

// Type definitions
export interface CSSLoaderOptions {
  media?: string;
  preload?: boolean;
}

export interface FontLoadOptions {
  fontWeight?: string;
  fontStyle?: string;
}

/**
 * Loads a CSS file asynchronously without blocking rendering
 * @param href - URL of the CSS file to load
 * @param media - Media query for the CSS (default: 'all')
 * @param preload - Whether to use preload strategy (default: true)
 * @returns The created link element or null if not in browser context
 */
export function loadCSS(href: string, media: string = 'all', preload: boolean = true): HTMLLinkElement | null {
  // Return early if we're not in a browser context
  if (typeof document === 'undefined') return null;
  
  const link = document.createElement('link');
  link.rel = preload ? 'preload' : 'stylesheet';
  link.href = href;
  if (preload) {
    link.as = 'style';
  }
  link.media = media;
  
  // For preload strategy, switch to stylesheet once loaded
  if (preload) {
    link.onload = function() {
      if (this instanceof HTMLLinkElement) {
        this.onload = null;
        this.rel = 'stylesheet';
      }
    };
  }
  
  // Add to head
  document.head.appendChild(link);
  return link;
}

/**
 * Loads a font efficiently with display swap to avoid FOIT
 * @param fontUrl - URL of the font file
 * @param fontFamily - Font family name
 * @param fontWeight - Font weight (default: 'normal')
 * @param fontStyle - Font style (default: 'normal')
 * @returns void
 */
export function loadFont(
  fontUrl: string, 
  fontFamily: string, 
  fontWeight: string = 'normal', 
  fontStyle: string = 'normal'
): void {
  if (typeof document === 'undefined') return;
  
  // Create a style element for the @font-face declaration
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${fontFamily}';
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      font-display: swap;
      src: url('${fontUrl}') format('woff2');
    }
  `;
  document.head.appendChild(style);
  
  // Preload the font file
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.href = fontUrl;
  preloadLink.as = 'font';
  preloadLink.type = 'font/woff2';
  preloadLink.crossOrigin = 'anonymous';
  document.head.appendChild(preloadLink);
}

/**
 * Loads a CSS file only when element with specified selector is visible in viewport
 * @param href - URL of the CSS file to load
 * @param selector - CSS selector to watch
 * @param rootMargin - Margin around the root (in pixels, default: 200)
 * @returns void
 */
export function loadCSSWhenVisible(href: string, selector: string, rootMargin: number = 200): void {
  if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
    // Fallback for SSR or no IntersectionObserver support
    loadCSS(href, 'all', false);
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadCSS(href, 'all', false);
        observer.disconnect();
      }
    });
  }, {
    rootMargin: `${rootMargin}px`
  });
  
  // Start observing when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const element = document.querySelector(selector);
      if (element) observer.observe(element);
    });
  } else {
    const element = document.querySelector(selector);
    if (element) observer.observe(element);
  }
}

/**
 * Extracts and inlines critical CSS
 * @param css - The CSS string to extract critical styles from
 * @returns The critical CSS
 */
export function extractCriticalCSS(css: string): string {
  // This is a simplified version - actual implementation would be more complex
  // and would properly analyze which styles are critical for above-the-fold content
  
  // Regular expressions to match critical selectors
  const criticalSelectors = [
    /body/,
    /\.site-header/,
    /\.hero/,
    /\.container/,
    /\.logo/,
    /h1/,
    /h2/,
    /\.cta-button/,
    /\.nav-link/
  ];
  
  // Split CSS into rules
  const cssRules = css.split('}');
  const criticalRules: string[] = [];
  
  // Filter for critical rules
  for (const rule of cssRules) {
    if (rule.trim() === '') continue;
    
    const isCritical = criticalSelectors.some(selector => 
      selector.test(rule.split('{')[0])
    );
    
    if (isCritical) {
      criticalRules.push(rule + '}');
    }
  }
  
  return criticalRules.join('\n');
}

/**
 * Loads all stylesheets optimally after page load
 * Helpful for improving page loading performance
 */
export function optimizeStylesheetLoading(): void {
  if (typeof document === 'undefined') return;
  
  // Use requestIdleCallback if available, otherwise setTimeout
  const scheduler = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
  
  scheduler(() => {
    // Find all stylesheets with data-defer attribute
    const deferredStylesheets = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    
    // Convert NodeList to Array and handle each stylesheet
    Array.from(deferredStylesheets).forEach(stylesheet => {
      const href = stylesheet.getAttribute('href');
      if (!href) return;
      
      // Remove the original element with null safety
      const parentNode = stylesheet.parentNode;
      if (parentNode) {
        parentNode.removeChild(stylesheet);
      }
      
      // Load asynchronously
      loadCSS(href, stylesheet.getAttribute('media') || 'all', true);
    });
  });
}

// Auto-initialize when in browser context
if (typeof window !== 'undefined') {
  // When document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeStylesheetLoading);
  } else {
    optimizeStylesheetLoading();
  }
}

export default {
  loadCSS,
  loadFont,
  loadCSSWhenVisible,
  extractCriticalCSS,
  optimizeStylesheetLoading
}; 