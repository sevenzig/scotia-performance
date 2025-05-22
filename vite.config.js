import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig(({ mode }) => {
	const plugins = [
		sveltekit(), 
		tailwindcss(),
		// Add imagemin for production builds to optimize images
		mode === 'production' && imagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false
			},
			optipng: {
				optimizationLevel: 7
			},
			mozjpeg: {
				quality: 80,
				progressive: true
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
						active: false
					}
				]
			}
		})
	].filter(Boolean);
	
	// Only include visualizer in analyze mode
	if (mode === 'analyze') {
		plugins.push(
			visualizer({
				open: true,
				gzipSize: true,
				brotliSize: true,
				filename: 'stats.html'
			})
		);
	}
	
	return {
		plugins,
		css: {
			preprocessorOptions: {
				scss: {
					includePaths: [path.resolve('./src'), path.resolve('./src/scss')],
					// Use the modern Sass API
					api: 'modern',
					sassOptions: {
						outputStyle: 'expanded',
						charset: false,
						// This explicitly enables the new API
						javascriptEnabled: true,
						// Set to false to avoid legacy API warnings
						legacyJavaScript: false,
						// Silence the legacy API deprecation warnings
						silenceDeprecations: ['legacy-js-api']
					}
				}
			},
			devSourcemap: false
		},
		build: {
			target: 'esnext',
			minify: 'terser',
			cssMinify: true,
			reportCompressedSize: false,
			chunkSizeWarningLimit: 1000,
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
					ecma: 2020,
					passes: 2,
					pure_funcs: ['console.log', 'console.info', 'console.debug']
				},
				format: {
					comments: false
				}
			},
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						// More granular chunking strategy
						if (id.includes('node_modules/svelte')) {
							return 'vendor-svelte';
						}
						if (id.includes('node_modules/@sveltejs')) {
							return 'vendor-sveltekit';
						}
						if (id.includes('node_modules/tailwindcss') || 
							id.includes('node_modules/postcss')) {
							return 'vendor-css';
						}
						// Other vendor libs
						if (id.includes('node_modules')) {
							return 'vendor';
						}
						// Core styles
						if (id.includes('app.scss') || id.includes('app.css')) {
							return 'styles';
						}
						// Utils and services
						if (id.includes('/lib/utils/') || id.includes('/lib/services/')) {
							return 'utils';
						}
					},
					// Optimize chunk loading with better naming strategy
					entryFileNames: 'entries/[name].[hash].js',
					chunkFileNames: 'chunks/[name].[hash].js',
					assetFileNames: ({ name }) => {
						if (/\.(css)$/.test(name ?? '')) {
							return 'assets/styles/[name].[hash][extname]';
						}
						if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name ?? '')) {
							return 'assets/images/[name].[hash][extname]';
						}
						if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
							return 'assets/fonts/[name].[hash][extname]';
						}
						return 'assets/[name].[hash][extname]';
					}
				}
			}
		},
		server: {
			fs: {
				strict: false,
				allow: ['..']
			},
			headers: {
				'Cache-Control': 'public, max-age=31536000',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'DENY'
			},
			hmr: {
				protocol: 'ws',
				host: 'localhost',
				port: 5175,
				clientPort: 5175
			},
			watch: {
				usePolling: true,
				interval: 100
			},
			host: true // Allow access from any network interface
		},
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=31536000',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'DENY'
			}
		},
		optimizeDeps: {
			include: ['@sveltejs/kit', 'svelte'],
			exclude: ['src/lib/utils/imageOptimizer.js'],
			esbuildOptions: {
				platform: 'browser',
				target: 'esnext',
				supported: {
					'top-level-await': true
				}
			}
		},
		test: {
			workspace: [
				{
					extends: './vite.config.js',
					plugins: [svelteTesting()],
					test: {
						name: 'client',
						environment: 'jsdom',
						clearMocks: true,
						include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
						exclude: ['src/lib/server/**'],
						setupFiles: ['./vitest-setup-client.js']
					}
				},
				{
					extends: './vite.config.js',
					test: {
						name: 'server',
						environment: 'node',
						include: ['src/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
					}
				}
			]
		},
		resolve: {
			alias: {
				$lib: path.resolve('./src/lib')
			},
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte']
		}
	};
});
