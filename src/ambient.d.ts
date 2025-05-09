/// <reference types="svelte" />

/**
 * Fix for Svelte 5 HTML namespace conflicts
 */
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
  
  interface SVGAttributes<T> {
    [key: string]: any;
  }
  
  interface ElementEvents<T> {
    [key: string]: any;
  }
  
  interface IntrinsicElements {
    [key: string]: any;
  }
} 