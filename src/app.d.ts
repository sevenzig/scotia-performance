/// <reference types="svelte" />

// Svelte 5 Runes global types
declare global {
  // State management
  const $state: <T>(initialValue?: T) => T;
  const $derived: <T>(expression: T) => T;
  const $derived: { by<T>(fn: () => T): T };
  const $effect: (callback: () => (() => void) | void) => void;
  const $effect: { 
    pre: (callback: () => (() => void) | void) => void;
    root: <T>(callback: () => T) => T;
    tracking: () => boolean;
  };
  
  // Component props
  const $props: <T>(defaults?: Partial<T>) => T;
  const $props: { id(): string };
  
  // For bindable props
  const $bindable: <T>(initialValue?: T) => T;
  
  // Inspection
  const $inspect: <T extends any[]>(...values: T) => { with: (callback: (type: 'init' | 'update', ...values: T) => void) => void };
  const $inspect: { trace(label?: string): void };

  // Events
  const $on: (event: string, handler: (event: Event) => void) => void;
}

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
  interface SVGAttributes<T> {
    [key: string]: any;
  }
}

declare module '*.svelte' {
  export default Svelte.ComponentType;
}

interface ImportMetaEnv {
  [key: string]: string | boolean | undefined;
}

export {}; 