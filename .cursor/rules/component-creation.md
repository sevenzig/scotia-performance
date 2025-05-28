# Component Creation from Code Snippets and File Extraction

This rule provides intelligent component creation from various input sources including pasted code snippets, file extractions, and mixed HTML/CSS blocks, following established Svelte 5 best practices.

## Trigger Phrases

Respond to these phrases by following the component creation workflow:

- "Create component from this code"
- "Componentize these snippets" 
- "Make a [ComponentName] component with this HTML/CSS"
- "Turn this into a reusable component"
- "Extract this into a component"
- "Build a [ComponentName] component"
- "Create [ComponentName].svelte from this"

## Core Principles

### 1. Follow Established Patterns

**Consistency First:**
- Match the complexity level of existing components (ServicesOffered, DiagnosticHelp, Reviews)
- Use the same data structure patterns (arrays of objects)
- Follow the same styling approach (plain CSS, not SCSS)
- Maintain consistent naming conventions

**Avoid Over-Engineering:**
- Don't add unnecessary props, state, or lifecycle methods
- Keep components simple and focused on single responsibility
- Avoid complex lazy loading or intersection observers unless truly needed
- Don't use BEM methodology unless the component is genuinely complex

### 2. Svelte 5 Best Practices

**Use Modern Runes:**
```svelte
<script lang="ts">
  // Use $state() for reactive state
  let isVisible = $state(false);
  
  // Use $derived() for computed values
  let displayText = $derived(items.length > 0 ? 'Items available' : 'No items');
  
  // Use $props() for component props
  const { title, items = [] } = $props<{
    title: string;
    items?: Item[];
  }>();
</script>
```

**Avoid Legacy Patterns:**
- Don't use `$:` reactive statements (use `$derived()`)
- Don't use `on:` event directives (use native event attributes)
- Don't use slots (use snippets and render tags)

## Input Detection and Processing

### 3. Detect Input Method

**File Reference Detection:**
- Look for file paths in user message (e.g., "from src/routes/+page.svelte")
- Look for line references (e.g., "lines 50-100")
- If detected: extract code from specified file/lines

**Code Snippet Detection:**
- Look for code blocks with ```html, ```css, ```svelte tags
- Look for untagged code blocks that contain HTML/CSS patterns
- Look for inline code with HTML tags or CSS properties

### 4. Parse Code Intelligently

**HTML Block Identification:**
```regex
- HTML tags: /<[^>]+>/
- Class attributes: /class="[^"]*"/
- ID attributes: /id="[^"]*"/
- Svelte directives: /{#if|{#each|{@html/
```

**CSS Block Identification:**
```regex
- CSS selectors: /\.[a-zA-Z-_]+\s*{|\#[a-zA-Z-_]+\s*{/
- CSS properties: /[a-zA-Z-]+\s*:\s*[^;]+;/
- Media queries: /@media\s*\([^)]+\)/
```

**Dynamic Content Detection:**
```regex
- Svelte variables: /{[^}]+}/
- Props candidates: /\b(title|name|id|src|href|alt|text|content|data|value)\b/
- Repeated patterns that suggest iteration
```

## Component Creation Process

### 5. Smart Component Structure Generation

**Component Naming:**
- If component name provided in trigger phrase: use it
- If not provided: analyze content and suggest name
- Convert to PascalCase (e.g., "product card" → "ProductCard")
- Ensure .svelte extension

**File Structure Template (Simple Pattern):**
```svelte
<script lang="ts">
  // Data array (if component displays multiple items)
  const items = [
    { title: "Item 1", description: "Description 1" },
    { title: "Item 2", description: "Description 2" }
  ];
  
  // Props only if truly needed for reusability
  const { 
    className = '',
    ...rest 
  } = $props<{
    className?: string;
    [key: string]: any;
  }>();
</script>

<section class="component-name" {...rest}>
  <div class="container">
    <h2>Section Title</h2>
    <div class="items-grid">
      {#each items as item}
        <div class="item-card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Main Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Component Section */
  .component-name {
    padding: 3rem 0;
  }
  
  .component-name h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .item-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .item-card h3 {
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .item-card {
      transition: none;
    }
    
    .item-card:hover {
      transform: none;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .items-grid {
      grid-template-columns: 1fr;
    }
    
    .component-name {
      padding: 2rem 0;
    }
    
    .component-name h2 {
      font-size: 1.75rem;
    }
  }
</style>
```

### 6. Content Processing Rules

**HTML Processing:**
- Preserve existing structure and classes
- Replace hardcoded values with data array items where appropriate
- Maintain accessibility attributes
- Convert inline styles to style block when beneficial
- Preserve Tailwind/Bootstrap classes as-is

**CSS Processing:**
- Use plain CSS, not SCSS (unless existing project uses SCSS extensively)
- Move inline styles to `<style>` block
- Use simple class names, avoid deep BEM nesting
- Combine duplicate rules
- Preserve CSS custom properties
- Maintain responsive breakpoints
- Include reduced motion preferences

**Data Structure Creation:**
- Convert repeated HTML blocks into array items
- Identify common properties across repeated elements
- Create simple object structures (avoid complex nesting)
- Use TypeScript interfaces only when props are complex

### 7. Handle Common Scenarios

**Scenario 1: Simple Content Display (Preferred)**
```html
<div class="card">
  <h3>Service 1</h3>
  <p>Description 1</p>
</div>
<div class="card">
  <h3>Service 2</h3>
  <p>Description 2</p>
</div>
```
→ Convert to data array with `{#each}` loop

**Scenario 2: Single Instance Component**
```html
<div class="hero">
  <h1>Welcome</h1>
  <p>Subtitle</p>
</div>
```
→ Keep simple, minimal or no props

**Scenario 3: Interactive Component**
- Use native event attributes (`onclick`, `onchange`)
- Keep state minimal with `$state()`
- Avoid complex lifecycle management

**Scenario 4: Framework Classes**
- Preserve Tailwind classes: `class="bg-blue-500 text-white"`
- Preserve Bootstrap classes: `class="btn btn-primary"`
- Don't extract framework classes to CSS

## Implementation Workflow

### 8. Step-by-Step Process

1. **Analyze Input:**
   - Determine if file extraction or snippet processing
   - Parse HTML and CSS content
   - Identify if content is repetitive (use data array) or singular

2. **Choose Component Pattern:**
   - **Data-driven pattern**: For repeated content (cards, lists, grids)
   - **Simple pattern**: For single-instance content (headers, footers)
   - **Interactive pattern**: For components with user interaction

3. **Generate Component Name:**
   - Use provided name or suggest based on content
   - Validate naming conventions

4. **Build Component File:**
   - Script block with minimal props and data
   - HTML with simple structure
   - Plain CSS with consistent patterns

5. **Generate Integration Code:**
   - Import statement for parent file
   - Component usage example
   - Minimal documentation

### 9. Auto-Integration Features

**Import Generation:**
```typescript
import ComponentName from '$lib/components/ComponentName.svelte';
```

**Usage Example (Simple):**
```svelte
<ComponentName />
```

**Usage Example (With Props):**
```svelte
<ComponentName 
  title="Example Title"
  items={customItems}
/>
```

## Quality Assurance

### 10. Validation Checks

- Ensure valid Svelte 5 syntax (runes, not legacy)
- Check for missing closing tags
- Validate CSS syntax
- Ensure component follows established patterns
- Check for accessibility attributes
- Verify responsive design preservation
- Confirm reduced motion support

### 11. Best Practices Applied

**Component Design:**
- Single responsibility principle
- Minimal props interface
- Data-driven when possible
- Consistent with existing components

**Code Quality:**
- Use semantic HTML elements
- Maintain proper heading hierarchy
- Preserve ARIA attributes
- Keep styles scoped to component
- Use TypeScript sparingly and effectively
- Follow project naming conventions
- Ensure mobile responsiveness

**Performance:**
- Avoid unnecessary reactivity
- Keep DOM updates minimal
- Use CSS for animations when possible
- Respect user preferences (reduced motion)

## Error Handling

### 12. Fallback Strategies

- If CSS parsing fails: preserve as-is in style block
- If component pattern unclear: default to simple data-driven pattern
- If component name conflicts: suggest alternative
- If complex logic detected: simplify or create TODO comments
- If external dependencies found: note in component comments

## Example Outputs

### Input: Repeated HTML Blocks
```html
<div class="service-card">
  <h3>Brake Service</h3>
  <p>Complete brake system repair</p>
</div>
<div class="service-card">
  <h3>Oil Changes</h3>
  <p>Regular maintenance service</p>
</div>
```

### Output: ServicesGrid.svelte
```svelte
<script lang="ts">
  const services = [
    {
      title: "Brake Service",
      description: "Complete brake system repair"
    },
    {
      title: "Oil Changes", 
      description: "Regular maintenance service"
    }
  ];
</script>

<section class="services">
  <div class="container">
    <div class="services-grid">
      {#each services as service}
        <div class="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .services {
    padding: 3rem 0;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .service-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .service-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  
  .service-card h3 {
    color: #1e3a8a;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .service-card {
      transition: none;
    }
    
    .service-card:hover {
      transform: none;
    }
  }
  
  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### Integration:
```svelte
import ServicesGrid from '$lib/components/ServicesGrid.svelte';

<ServicesGrid />
```

## Anti-Patterns to Avoid

### 13. Common Mistakes

- ❌ **Over-engineering**: Adding unnecessary props, state, or lifecycle methods
- ❌ **Complex BEM**: Deep nesting like `.component__element__sub-element--modifier`
- ❌ **SCSS dependencies**: Using SCSS variables/mixins unless project requires it
- ❌ **Legacy Svelte**: Using `$:`, `on:`, or slots instead of runes and snippets
- ❌ **Premature optimization**: Adding intersection observers or lazy loading unnecessarily
- ❌ **Inconsistent patterns**: Not following the established component structure

### 14. Preferred Patterns

- ✅ **Simple data arrays**: `const items = [...]` with `{#each}` loops
- ✅ **Minimal props**: Only add props when truly needed for reusability
- ✅ **Plain CSS**: Consistent with existing components
- ✅ **Svelte 5 runes**: Modern reactivity patterns
- ✅ **Single responsibility**: Each component does one thing well
- ✅ **Consistent styling**: Follow established visual patterns 