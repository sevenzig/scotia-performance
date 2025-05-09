# Scotia Performance Styling System

This document explains how to effectively use our SCSS and CSS variable system in Svelte 5 components, providing a consistent design approach across the application.

## Directory Structure

```code
src/
├── scss/
│   ├── core/
│   │   ├── _variables.scss        # Core SCSS variables (colors, spacing, fonts)
│   │   ├── _mixins.scss           # Reusable SCSS mixins (responsive, typography)
│   │   └── _reset.scss            # Normalized CSS reset
│   ├── components/
│   │   ├── _ui-elements.scss      # Typography, buttons, forms, UI components
│   │   ├── _structure.scss        # Layout, grid systems, containers
│   │   └── _about-card.scss       # Component-specific styles
│   ├── pages/
│   │   ├── _about.scss            # About page styles
│   │   └── _components.scss       # Component showcase styles
│   ├── main.scss                  # Main SCSS entry point (imports all partials)
│   └── USAGE.md                   # This documentation
├── app.scss                       # Imports main.scss + app-specific overrides
└── app.css                        # Compiled CSS + fallbacks (auto-generated)
```

## Key Improvements

Our styling system has been enhanced with several improvements:

1. **Component-Specific Files** - Individual component styles like `_about-card.scss` are now separated for better maintainability
2. **Page-Specific Organization** - Dedicated files for different pages (`_about.scss`, `_components.scss`)
3. **CSS Custom Properties** - SCSS variables are exported as CSS custom properties for runtime flexibility
4. **Responsive Design Framework** - Consistent breakpoint system via mixins
5. **Performance Optimized** - Minimizes CSS output and leverages browser capabilities

## Using the System with Svelte 5

### Importing in Your Svelte App

The styling system is automatically available throughout the app:

- SCSS is compiled during the build process via `app.scss`
- Variables are accessible as CSS custom properties in all Svelte components
- No additional imports needed in individual components

### Using Variables in SCSS Files

When writing SCSS files, directly use the SCSS variables:

```scss
.my-component {
  color: $scotia-blue;
  padding: $spacing-4;
  font-family: $font-primary;
  transition: all $transition-normal;
  
  &:hover {
    background-color: darken($scotia-blue, 10%);
  }
}
```

### Using Variables in Svelte 5 Components

In Svelte 5 components, use the CSS custom properties:

#### Inline Styles

```svelte
<div style="color: var(--scotia-blue); padding: var(--spacing-4);">
  This uses our design system colors and spacing
</div>
```

#### Style Blocks

```svelte
<div class="my-component">
  Component content
</div>

<style>
  .my-component {
    color: var(--scotia-blue);
    font-family: var(--font-primary);
    padding: var(--spacing-4);
  }
  
  .my-component:hover {
    background-color: rgba(var(--scotia-blue-rgb), 0.1);
  }
</style>
```

## Svelte 5 Runes Integration

Svelte 5 introduces runes for reactive state management that work seamlessly with our styling system:

### Reactive Classes

```svelte
<script>
  const isActive = $state(false);
  
  function toggleActive() {
    isActive = !isActive;
  }
</script>

<button 
  onclick={toggleActive}
  class={isActive ? 'active' : ''}
>
  Toggle me
</button>

<style>
  button {
    background-color: var(--white);
    border: 1px solid var(--scotia-blue);
    transition: background-color var(--transition-normal);
  }
  
  .active {
    background-color: var(--scotia-blue);
    color: var(--white);
  }
</style>
```

### Dynamic Styling with Derived State

```svelte
<script>
  // Props with TypeScript typing
  const { variant = 'primary' } = $props<{
    variant?: 'primary' | 'secondary' | 'outline';
  }>();
  
  // State
  const isHovered = $state(false);
  
  // Derived state for dynamic styling
  const backgroundColor = $derived(
    isHovered 
      ? variant === 'primary' 
        ? 'var(--scotia-blue-dark)'
        : 'var(--scotia-red-dark)'
      : variant === 'primary'
        ? 'var(--scotia-blue)'
        : 'var(--scotia-red)'
  );
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<button
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  style={`background-color: ${backgroundColor};`}
  class="custom-button"
>
  <slot></slot>
</button>

<style>
  .custom-button {
    color: var(--white);
    padding: var(--spacing-3) var(--spacing-5);
    border-radius: var(--border-radius-md);
    border: none;
    transition: background-color var(--transition-normal);
  }
</style>
```

## Best Practices

### Naming Conventions

We follow a consistent naming pattern:

- SCSS variables: `$variable-name` (e.g., `$scotia-blue`)
- CSS properties: `var(--variable-name)` (e.g., `var(--scotia-blue)`)
- RGB variants: `var(--variable-name-rgb)` (e.g., `var(--scotia-blue-rgb)`)
- Component classes: BEM methodology (Block__Element--Modifier)

### When to Use Each Variable Type

1. **Use SCSS variables in**:
   - SCSS files (core, components, pages)
   - For calculations and functions that must run at compile time
   - When generating systematic styles

2. **Use CSS variables in**:
   - Svelte component style blocks
   - Inline styles
   - Dynamic runtime styles
   - Theming and user preference adaptations

### Responsive Design

Our system provides responsive mixins for consistent breakpoints:

```scss
// In SCSS files
.container {
  padding: $spacing-4;
  
  @include sm {
    padding: $spacing-6;
  }
  
  @include md {
    padding: $spacing-8;
  }
  
  @include lg {
    padding: $spacing-10;
  }
}

// In Svelte components
.container {
  padding: var(--spacing-4);
  
  @media (min-width: 640px) {
    padding: var(--spacing-6);
  }
  
  @media (min-width: 768px) {
    padding: var(--spacing-8);
  }
}
```

## Component Architecture

### Component-Specific Files

For larger components, create dedicated SCSS files in the components directory:

1. Create a new file: `src/scss/components/_your-component.scss`
2. Import it in `main.scss`
3. Follow the BEM naming convention:

```scss
.component-name {
  property: $value;
  
  &__element {
    property: $value;
  }
  
  &--modifier {
    property: $value;
  }
}
```

### Global UI Components

Our system includes pre-styled UI components in `_ui-elements.scss`. Before creating custom styles:

1. Check if a global class already exists
2. If it exists, use the class directly
3. If not, create component-specific styles using our variables

## Extending the System

### Adding New Variables

1. Add SCSS variables to `/src/scss/core/_variables.scss`
2. If needed, include RGB variants for opacity control
3. Document the new variables with comments

Example:

```scss
// In _variables.scss
$new-accent: #6b48ff;
$new-accent-rgb: hexToRGB($new-accent);
$new-accent-dark: darken($new-accent, 15%);

// Access in components
.new-element {
  background-color: var(--new-accent);
  box-shadow: 0 2px 10px rgba(var(--new-accent-rgb), 0.3);
}
```

## Troubleshooting

### Debugging CSS Issues

If styles aren't applying as expected:

1. Use browser DevTools to inspect the computed styles
2. Verify variable names and check for typos
3. Check specificity issues (Svelte scoped styles may need higher specificity)
4. Confirm the component is rendering correctly

### Common Fixes

- **Variable not recognized**: Ensure it's defined in `_variables.scss`
- **Styles not applying**: Check for specificity conflicts
- **Mobile styling issues**: Verify media query breakpoints
- **Animation problems**: Check transition properties

## Performance Optimizations

Our system is optimized for performance:

- SCSS is compiled at build time with no runtime overhead.
- CSS variables have excellent browser support with minimal impact.
- For animations, we use GPU-accelerated properties where possible.
- Critical CSS is prioritized for faster rendering.
- Media queries are structured to minimize redundant code.

## Additional Resources

- [Svelte 5 Documentation](https://svelte.dev/docs/runes)
- [SCSS Documentation](https://sass-lang.com/documentation/)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [BEM Methodology](https://getbem.com/)
