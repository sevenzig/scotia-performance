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
				quality: 85,
				progressive: true
			},
			pngquant: {
				quality: [0.85, 0.95],
				speed: 4
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
						active: false
					},
					{
						name: 'cleanupIDs',
						active: true
					},
					{
						name: 'removeUnusedNS',
						active: true
					}
				]
			},
			webp: {
				quality: 85
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
					passes: 3,
					pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
					reduce_vars: true,
					reduce_funcs: true,
					hoist_funs: true,
					hoist_vars: true
				},
				mangle: {
					safari10: true,
					properties: {
						regex: /^_/
					}
				},
				format: {
					comments: false,
					ecma: 2020
				}
			},
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('node_modules/svelte/')) {
							return 'vendor-svelte';
						}
						if (id.includes('node_modules/@sveltejs/')) {
							return 'vendor-sveltekit';
						}
						if (id.includes('node_modules/tailwindcss') || 
							id.includes('node_modules/postcss') ||
							id.includes('node_modules/autoprefixer')) {
							return 'vendor-css';
						}
						
						if (id.includes('node_modules/@lucide/')) {
							return 'vendor-icons';
						}
						if (id.includes('node_modules/daisyui')) {
							return 'vendor-ui';
						}
						
						if (id.includes('/lib/utils/') || id.includes('/lib/services/')) {
							return 'app-utils';
						}
						if (id.includes('/lib/data/')) {
							return 'app-data';
						}
						if (id.includes('/lib/components/')) {
							return 'app-components';
						}
						
						if (id.includes('/routes/services/')) {
							return 'routes-services';
						}
						if (id.includes('/routes/')) {
							return 'routes-misc';
						}
						
						if (id.includes('app.scss') || id.includes('app.css')) {
							return 'styles-core';
						}
						
						if (id.includes('node_modules')) {
							return 'vendor-misc';
						}
					},
					entryFileNames: (chunkInfo) => {
						return `entries/[name]-[hash].js`;
					},
					chunkFileNames: (chunkInfo) => {
						const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
						return `chunks/[name]-[hash].js`;
					},
					assetFileNames: ({ name }) => {
						if (/\.(css)$/.test(name ?? '')) {
							return 'assets/styles/[name]-[hash][extname]';
						}
						if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/.test(name ?? '')) {
							return 'assets/images/[name]-[hash][extname]';
						}
						if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
							return 'assets/fonts/[name]-[hash][extname]';
						}
						if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(name ?? '')) {
							return 'assets/media/[name]-[hash][extname]';
						}
						return 'assets/misc/[name]-[hash][extname]';
					}
				},
				treeshake: {
					moduleSideEffects: false,
					propertyReadSideEffects: false,
					unknownGlobalSideEffects: false
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
