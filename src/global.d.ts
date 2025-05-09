/// <reference types="svelte" />
/**
 * Svelte HTML namespace declaration for TypeScript
 * This helps TypeScript understand Svelte's template syntax
 */
declare namespace svelteHTML {
  /**
   * Interface for HTML element attributes
   * Allows for flexible attribute typing with any key-value pairs
   * Essential for Svelte's binding and property passing syntax
   */
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
 
  /**
   * Interface for SVG element attributes
   * Enables TypeScript to recognize SVG-specific attributes in Svelte templates
   * Provides type flexibility for SVG elements
   */
  interface SVGAttributes<T> {
    [key: string]: any;
  }
 
  /**
   * Interface for DOM event handlers
   * Allows for custom event typing in Svelte components
   * Supports Svelte's event directive syntax (on:event)
   */
  interface ElementEvents<T> {
    [key: string]: any;
  }
 
  /**
   * Interface for all HTML/SVG elements
   * Enables TypeScript to understand custom elements in Svelte templates
   * Provides flexibility for both standard and custom elements
   */
  interface IntrinsicElements {
    [key: string]: any;
  }
}

/**
 * Module declarations for various file types
 * These declarations allow TypeScript to properly handle imports of non-TS files
 */

/**
 * Declaration for importing Svelte component files
 * Ensures TypeScript understands .svelte files as valid component imports
 * Returns a ComponentType that can be used in other Svelte components
 */
declare module "*.svelte" {
  import type { ComponentType } from "svelte";
  const component: ComponentType;
  export default component;
}

/**
 * Declaration for importing SCSS files
 * Allows TypeScript to recognize .scss imports without type errors
 * Imports are treated as strings containing CSS content
 */
declare module "*.scss" {
  const content: string;
  export default content;
}

/**
 * Declaration for importing SVG files
 * Enables TypeScript to handle SVG imports as strings
 * Useful for using SVGs as component assets
 */
declare module "*.svg" {
  const content: string;
  export default content;
}

/**
 * Declarations for image file imports
 * Allow TypeScript to recognize various image format imports
 * All image imports are treated as strings (typically file paths)
 */
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

/**
 * Extension of ImportMeta interface for Svelte environment variables
 * Provides TypeScript type safety for Vite/Svelte environment variables
 * Includes standard environment flags (SSR, DEV, PROD) and custom variables
 */
interface ImportMeta {
  env: {
    [key: string]: string | boolean | undefined; // Allows for custom environment variables
    SSR: boolean;  // Server-Side Rendering flag
    DEV: boolean;  // Development mode flag
    PROD: boolean; // Production mode flag
  };
}