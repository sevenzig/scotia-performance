// place files you want to import through the `$lib` alias in this folder.

// Re-export commonly used utilities and components
export { 
  getImageAttributes as getClientImageAttributes,
  getResponsiveImageSources as getClientResponsiveImageSources
} from './utils/clientImageUtils';
export * from './utils/cssLoader';
export * from './utils/imageOptimizer';
export * from './utils/performanceMonitor';
export * from './utils/bundleAnalyzer';

// Re-export optimized components
export { default as LazyLoad } from './components/LazyLoad.svelte';
export { default as VirtualList } from './components/VirtualList.svelte';
export { default as ResponsiveImage } from './components/ResponsiveImage.svelte';

// Type definitions for common use
export type { ImageAttributes, ResponsiveImageSources } from './utils/clientImageUtils';
export type { PerformanceMetrics, MonitoringOptions } from './utils/performanceMonitor';
export type { BundleStats, ChunkInfo, ModuleInfo } from './utils/bundleAnalyzer'; 