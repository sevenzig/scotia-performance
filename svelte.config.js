import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scss: {
				includePaths: ['src'],
				sassOptions: {
					outputStyle: 'compressed',
					charset: false,
					javascriptEnabled: true,
					legacyJavaScript: false,
					// Silence the legacy API deprecation warnings
					silenceDeprecations: ['legacy-js-api']
				}
			},
			typescript: {
				tsconfigFile: './tsconfig.json',
				compilerOptions: {
					moduleResolution: 'bundler'
				}
			}
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// Explicitly specify Node.js 20 runtime for Vercel compatibility
			runtime: 'nodejs20.x'
		}),
		alias: {
			$lib: path.resolve('./src/lib')
		},
		output: {
			preloadStrategy: 'modulepreload'
		},
		// Service worker configuration
		serviceWorker: {
			register: true,
			files: (filepath) => {
				// Include important static assets in service worker
				return !/\.(?:png|jpe?g|gif|svg|webp|ico|pdf|zip)$/.test(filepath) || 
				       filepath.includes('/images/hero-bg.') ||
				       filepath.includes('/images/garage.') ||
				       filepath.includes('/favicon.');
			}
		},
		prerender: {
			// Prerender static pages for better performance
			entries: [
				'/',
				'/services',
				'/services/repair',
				'/services/maintenance', 
				'/services/performance',
				'/services/tires-wheels',
				'/about',
				'/location'
			],
			handleHttpError: ({ path, referrer, message }) => {
				// Handle errors during prerendering
				console.warn(`Warning: ${path} failed to prerender (${message})`);
			},
			handleMissingId: ({ path, id, message }) => {
				// Handle missing IDs during prerendering
				console.warn(`Warning: ${path}#${id} not found (${message})`);
			}
		},
		csp: {
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline', 'unsafe-eval'],
				'script-src-attr': ['self', 'unsafe-inline'],
				'script-src-elem': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'style-src-elem': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'img-src': ['self', 'data:', 'blob:', 'https:'],
				'connect-src': ['self', 'ws:', 'wss:', 'https:'],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com'],
				'object-src': ['none'],
				'media-src': ['self', 'data:', 'blob:', 'https:'],
				'frame-src': ['self'],
				'worker-src': ['self', 'blob:'],
				'child-src': ['self', 'blob:'],
				'form-action': ['self'],
				'base-uri': ['self'],
				'manifest-src': ['self']
			},
			mode: 'auto'
		},
		files: {
			assets: 'static',
			serviceWorker: 'static/sw.js'
		},
		inlineStyleThreshold: 8192,  // Increased from 5000 to 8KB for better critical CSS inlining
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		},
		// Performance optimizations
		embedded: false
	},
	
	// Add explicit extensions to handle Svelte files properly
	extensions: ['.svelte'],
	
	// Ensure compilerOptions are properly set for Svelte 5 runes with performance optimizations
	compilerOptions: {
		accessors: true,
		runes: true,
		hydratable: true,
		compatibility: {
			componentApi: 4
		},
		css: "injected",
		namespace: 'html',
		preserveComments: false // Remove comments for smaller bundle
	}
};

export default config;
