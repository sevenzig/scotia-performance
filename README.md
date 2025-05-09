# Scotia Performance

A high-performance SvelteKit application for Scotia Performance Auto, featuring optimized build processes and modern web technologies.

## Technology Stack

- **Framework**: [SvelteKit 2.16+](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/) (using runes)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/) with SASS
- **Runtime**: [Bun](https://bun.sh/)
- **Testing**: [Vitest](https://vitest.dev/)

## Project Overview

This project is a performance-optimized web application for Scotia Performance Auto, featuring:

- Optimized image processing with Sharp and imagemin
- Component-based architecture with Svelte 5 runes for reactivity
- Comprehensive performance measurement and analysis
- Mobile-responsive design with TailwindCSS

## Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd scotia-performance-dev
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

### Development Guidelines

- Use Svelte 5 runes for reactivity (avoid using the older `$:` syntax)
- Follow the project's component patterns (see `/src/lib/components`)
- Run `bun run check` before committing to ensure type safety
- Use conventional commits format for version control

## Building for Production

```bash
# Run production build
bun run build

# Preview the production build
bun run preview

# Analyze bundle size
bun run analyze
```

## Performance Analysis

This project includes built-in performance analysis tools:

```bash
# Run performance analysis
bun run perf

# This is also automatically run after each build
```

## Testing

```bash
# Run all tests
bun test

# Run client-side component tests only
bun run test:unit
```

## Project Structure

```
├── .dev/             # Developer documentation and tools
├── src/
│   ├── lib/          # Library code (components, utilities, services)
│   │   ├── components/  # Reusable UI components
│   │   ├── services/    # Data and business logic services
│   │   └── utils/       # Helper utilities
│   ├── routes/       # SvelteKit routes (pages)
│   └── scss/         # Global SCSS styles
├── static/           # Static assets
└── tests/            # Test files
```

## Deployment

The project uses `@sveltejs/adapter-auto` which will automatically select the appropriate adapter based on your deployment target.

For specific deployment environments, refer to the [SvelteKit adapter documentation](https://kit.svelte.dev/docs/adapters).

## Additional Documentation

- See `.dev/dependencies.md` for information on critical dependencies and their interactions
- See `.dev/rules.txt` for Cursor AI guidance

## License

Copyright © Scotia Performance. All rights reserved.
