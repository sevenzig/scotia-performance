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
		// Simplified imagemin for production builds - only optimize essentials
		mode === 'production' && imagemin({
			gifsicle: {
				optimizationLevel: 3 // Reduced from 7
			},
			optipng: {
				optimizationLevel: 3 // Reduced from 7
			},
			mozjpeg: {
				quality: 90, // Increased for faster processing
				progressive: false // Disabled for speed
			},
			// Removed pngquant and svgo for faster builds
			webp: {
				quality: 90
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
				filename: 'stats.html',
				template: 'treemap'
			})
		);
	}
	
	return {
		plugins,
		css: {
			preprocessorOptions: {
				scss: {
					includePaths: [path.resolve('./src'), path.resolve('./src/scss')]
				}
			},
			devSourcemap: mode !== 'production'
		},
		build: {
			target: 'esnext',
			minify: 'terser',
			cssMinify: 'lightningcss',
			reportCompressedSize: false,
			chunkSizeWarningLimit: 800,
			sourcemap: mode !== 'production',
			terserOptions: {
				compress: {
					drop_console: mode === 'production',
					drop_debugger: true,
					ecma: 2020,
					passes: 1, // Reduced from 3 passes - major speed improvement
					pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
					// Removed aggressive optimizations for speed
				},
				mangle: {
					safari10: true
				},
				format: {
					comments: false,
					ecma: 2020
				}
			},
			rollupOptions: {
				output: {
					// Simplified manual chunking - major speed improvement
					manualChunks: {
						'vendor-svelte': ['svelte'],
						'vendor-sveltekit': ['@sveltejs/kit'],
						'vendor-icons': ['@lucide/svelte']
					},
					entryFileNames: `entries/[name]-[hash].js`,
					chunkFileNames: `chunks/[name]-[hash].js`,
					assetFileNames: ({ name }) => {
						if (/\.(css)$/.test(name ?? '')) {
							return 'assets/styles/[name]-[hash][extname]';
						}
						if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/.test(name ?? '')) {
							return 'assets/images/[name]-[hash][extname]';
						}
						return 'assets/[name]-[hash][extname]';
					}
				}
				// Removed aggressive tree-shaking for speed
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
				'X-Frame-Options': 'DENY',
				'X-XSS-Protection': '1; mode=block'
			},
			hmr: {
				protocol: 'ws',
				host: 'localhost',
				port: 5173,
				clientPort: 5173,
				timeout: 120000,
				overlay: true
			},
			watch: {
				usePolling: false,
				ignored: ['**/node_modules/**', '**/.git/**']
			},
			host: 'localhost'
		},
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=31536000',
				'X-Content-Type-Options': 'nosniff',
				'X-Frame-Options': 'DENY',
				'X-XSS-Protection': '1; mode=block'
			}
		},
		optimizeDeps: {
			include: ['@sveltejs/kit', 'svelte', '@lucide/svelte'],
			exclude: ['src/lib/utils/imageOptimizer.js'],
			esbuildOptions: {
				platform: 'browser',
				target: 'esnext',
				supported: {
					'top-level-await': true
				},
				treeShaking: true,
				minify: mode === 'production'
			}
		},
		worker: {
			format: 'es',
			plugins: () => []
		},
		assetsInclude: ['**/*.webp', '**/*.avif'],
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
				$lib: path.resolve('./src/lib'),
				$assets: path.resolve('./static'),
				$components: path.resolve('./src/lib/components'),
				$utils: path.resolve('./src/lib/utils')
			},
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte']
		},
		experimental: {
			renderBuiltUrl: (filename, { hostType }) => {
				if (hostType === 'js') {
					return { js: `"/${filename}"` };
				} else {
					return `/${filename}`;
				}
			}
		}
	};
});
