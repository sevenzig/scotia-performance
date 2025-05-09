import adapter from '@sveltejs/adapter-auto';
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
				includePaths: ['src']
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
		adapter: adapter(),
		alias: {
			$lib: path.resolve('./src/lib')
		},
		output: {
			preloadStrategy: 'modulepreload'
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
			assets: 'static'
		},
		inlineStyleThreshold: 5000,  // Inline styles smaller than 5kb for critical CSS
		version: {
			name: Date.now().toString(),
			pollInterval: 0
		}
	},
	
	// Add explicit extensions to handle Svelte files properly
	extensions: ['.svelte'],
	
	// Ensure compilerOptions are properly set for Svelte 5 runes
	compilerOptions: {
		accessors: true,
		immutable: true,
		enableSourcemap: false,
		runes: true,
		namespace: 'html' // Add namespace to prevent HTML errors
	}
};

export default config;
