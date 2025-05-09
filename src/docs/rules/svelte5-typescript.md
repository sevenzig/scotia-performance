# Svelte 5 TypeScript Namespace Configuration

## Problem

When using Svelte 5 with TypeScript, you may encounter `Cannot use namespace 'svelteHTML' as a value` errors in your components. This happens due to incompatibilities between Svelte 5's new template handling and TypeScript's namespace resolution.

## Solution

We implemented a multi-part solution:

### 1. Create ambient type declarations

```typescript
// src/ambient.d.ts
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
```

### 2. Update TypeScript configuration

Ensure both `tsconfig.json` and `jsconfig.json` use:
- `"moduleResolution": "bundler"` (not "NodeNext")
- `"module": "ESNext"`
- `"types": ["svelte"]`
- Include `.d.ts` files in the `"include"` array

### 3. Update Svelte configuration

In `svelte.config.js`:
- Set `namespace: 'html'` in `compilerOptions`
- Use `moduleResolution: 'bundler'` in TypeScript preprocessor options

### 4. Component-specific fixes

For components that still have issues, add:

```svelte
<svelte:options namespace="html" />
```

### 5. Update dependencies

Ensure you're using compatible versions:
- `"svelte": "^5.0.0"`
- `"svelte-check": "^3.7.0"` (or later)
- `"typescript": "^5.4.2"` (or later)

## How to apply

When creating new components or fixing existing ones:

1. Make sure the ambient declaration is in place
2. Add `<svelte:options namespace="html" />` to components with HTML namespace errors
3. Build with the latest svelte-check version

## Best practices

- Use `<svelte:options namespace="html" />` only when necessary
- Avoid `@ts-ignore` comments as they mask potential issues
- Update to the latest Svelte 5 preview when available
- Remove these workarounds when Svelte 5 stable is released with proper TypeScript support 