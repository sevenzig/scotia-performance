# Scotia Performance Dev: Dependencies and Interactions

This document describes the critical library interactions, constraints, and version requirements for the Scotia Performance project. It serves as a reference for understanding how different libraries interact and any specific constraints that must be maintained.

## Core Framework

| Library | Version | Purpose | Constraints |
|---------|---------|---------|------------|
| [Svelte](https://svelte.dev/) | ^5.0.0 | UI framework | Using Svelte 5 with runes enabled |
| [SvelteKit](https://kit.svelte.dev/) | ^2.16.0 | App framework | Using module preloading strategy |
| [@sveltejs/adapter-auto](https://github.com/sveltejs/kit/tree/master/packages/adapter-auto) | ^6.0.0 | Server adapter | Automatic adapter selection based on deployment platform |
| [Vite](https://vitejs.dev/) | ^6.2.6 | Build tool | ESNext target, custom chunking strategy |

## Critical Constraints

1. **Svelte 5 Runes**:
   - The project uses Svelte 5 with runes enabled in `svelte.config.js`
   - All components must use the runes API for reactivity
   - Mixing old reactivity ($: syntax) with runes may cause unexpected behavior

2. **Build Optimization**:
   - Custom chunk splitting strategy defined in `vite.config.js`
   - Images are optimized during build via `vite-plugin-imagemin`
   - Console statements are stripped in production builds

3. **Performance Analysis**:
   - Bundle analysis via `rollup-plugin-visualizer` in analyze mode
   - Custom performance analysis via `scripts/analyze-performance.js`
   - All builds automatically run performance analysis (postbuild hook)

## Styling Dependencies

| Library | Version | Purpose | Constraints |
|---------|---------|---------|-------------|
| [TailwindCSS](https://tailwindcss.com/) | ^4.0.0 | Utility CSS | Using latest v4 with all new features |
| [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) | ^0.5.9 | Form styling | Depends on compatible Tailwind version |
| [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) | ^0.5.15 | Prose styling | Depends on compatible Tailwind version |
| [SASS](https://sass-lang.com/) | ^1.69.0 | CSS preprocessing | Used alongside Tailwind for custom components |

### CSS Integration Notes

- SASS and Tailwind are used together in this project
- SASS include paths are configured in both `svelte.config.js` and `vite.config.js`
- Custom SCSS files are in `src/scss/` directory
- Core styles in `app.scss` are extracted to a separate chunk during build

## Testing Dependencies

| Library | Version | Purpose | Constraints |
|---------|---------|---------|-------------|
| [Vitest](https://vitest.dev/) | ^3.0.0 | Test runner | Test configuration in vite.config.js with workspaces |
| [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro) | ^5.2.4 | Component testing | JSDOM environment for client tests |
| [JSDOM](https://github.com/jsdom/jsdom) | ^26.0.0 | DOM simulation | Used for client-side tests |

### Testing Configuration

- Two test environments configured:
  1. Client tests: JSDOM environment with Svelte Testing Library
  2. Server tests: Node environment
- Test setup file: `vitest-setup-client.js`
- Client tests should use `.svelte.test.js` or `.svelte.spec.js` extension
- Server tests should use `.test.js` or `.spec.js` extension

## Development Tools

| Library | Version | Purpose | Constraints |
|---------|---------|---------|-------------|
| [ESLint](https://eslint.org/) | ^9.18.0 | Code linting | New flat config format |
| [Prettier](https://prettier.io/) | ^3.4.2 | Code formatting | Includes Svelte and Tailwind plugins |
| [svelte-check](https://github.com/sveltejs/language-tools/tree/master/packages/svelte-check) | ^3.6.8 | Type checking | Configured for both JS and TS |
| [Bun](https://bun.sh/) | (not specified) | JavaScript runtime | Used for all scripts and development |

### ESLint Configuration

- Using new flat config format with `eslint.config.js`
- ESLint integration with Prettier via `eslint-config-prettier`
- Svelte plugin enabled for linting Svelte components

## Image Processing

| Library | Version | Purpose | Constraints |
|---------|---------|---------|-------------|
| [Sharp](https://sharp.pixelplumbing.com/) | ^0.33.2 | Image processing | Listed as trusted dependency |
| [vite-plugin-imagemin](https://github.com/vbenjs/vite-plugin-imagemin) | ^0.6.1 | Image optimization | Only runs during production builds |

### Image Optimization Configuration

- Different optimization settings for different image types
- JPEG: Quality 80, progressive enabled
- PNG: Quality 0.8-0.9, optimization level 7
- SVG: Custom SVGO configuration

## Bundle Analysis

| Library | Version | Purpose | Constraints |
|---------|---------|---------|-------------|
| [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) | ^5.12.0 | Bundle visualization | Only enabled in analyze mode |

## Critical Dependency Interactions

1. **Svelte + TailwindCSS**:
   - TailwindCSS is integrated via `@tailwindcss/vite` plugin
   - Classes are purged based on usage in Svelte components
   - When modifying Tailwind config, rebuild may be required for new utilities

2. **SvelteKit + TypeScript**:
   - TypeScript configuration in both `jsconfig.json` and `tsconfig.json`
   - Module resolution set to NodeNext in svelte.config.js
   - Type definitions in `src/app.d.ts` and `src/global.d.ts`

3. **Vite Build Optimization + Performance Analysis**:
   - Custom chunk splitting affects load order and performance
   - Performance analysis script runs after builds
   - Manual chunk configuration in vite.config.js must be maintained when adding new dependencies

4. **SASS + TailwindCSS**:
   - Both work together but care needed with @layer directives
   - SASS variables should be exported if needed in JS
   - TailwindCSS should be imported in the correct order in SCSS files

## Known Limitations and Constraints

1. **Performance Budgets**:
   - Bundle size warning limit: 1000KB per chunk
   - Styles under 5KB are inlined (inlineStyleThreshold in svelte.config.js)

2. **Browser Compatibility**:
   - Target: ESNext (modern browsers only)
   - No explicit polyfills included

3. **CSP (Content Security Policy)**:
   - Strict CSP defined in svelte.config.js
   - External resources limited to specific domains
   - Projects extending this must conform to CSP constraints

4. **Trusted Dependencies**:
   - Sharp, @rollup/rollup-linux-x64-gnu, and lightningcss marked as trusted
   - These may require native compilation during install

## Troubleshooting Common Issues

1. **Build Failures**:
   - Check for dependency conflicts between Svelte, SvelteKit, and Vite versions
   - Ensure type definitions match actual code structure
   - Verify that Sharp is properly installed (trusted dependency)

2. **Performance Regression**:
   - Run `bun run perf` to analyze bundle sizes and performance metrics
   - Check for unwanted chunk splitting in build output
   - Review visualizer output in analyze mode

3. **Style Processing Issues**:
   - Verify SASS include paths in both configs
   - Check TailwindCSS purge configuration
   - Ensure proper order of CSS processing plugins

## Version Management

When upgrading dependencies, maintain the following constraints:

1. **Svelte Ecosystem**:
   - Keep all @sveltejs/* packages in sync
   - Ensure Svelte version is compatible with SvelteKit version

2. **Tailwind Ecosystem**:
   - Keep tailwindcss and its plugins compatible
   - Test extensions like typography and forms after Tailwind upgrades

3. **Build Tools**:
   - Vite and Rollup plugins should be compatible
   - Test build performance after any build tool upgrades

4. **Testing Libraries**:
   - Keep testing-library packages in sync
   - Ensure JSDOM version is compatible with testing setup

## Dependencies Management

For adding new dependencies:

1. Always run compatibility checks with existing dependencies
2. Add all related packages in the same commit
3. Test build and runtime performance after adding dependencies
4. Document any new constraints in this file
5. Consider impact on chunk splitting and load performance 