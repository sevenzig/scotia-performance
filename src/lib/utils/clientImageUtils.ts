/**
 * Client-side version of image utilities for use in browser environments
 * This is a simplified version without any server-side dependencies
 */

// Type definitions for image attributes and sources
export interface ImageAttributes {
  src: string;
  srcset: string;
  sizes: string;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync' | 'auto';
}

export interface ResponsiveSource {
  srcset: string;
  media: string;
}

export interface ResponsiveImageSources {
  webp: ResponsiveSource[];
  jpeg: ResponsiveSource[];
  fallback: string;
}

/**
 * Get responsive image attributes for a specific image
 * @param imageName - The base image name without extension
 * @returns Object with attributes for responsive images
 */
export function getImageAttributes(imageName: string): ImageAttributes {
  const basePath = `/images/optimized/${imageName}`;
  
  return {
    src: `${basePath}.webp`,
    srcset: [
      `${basePath}-sm.webp 480w`,
      `${basePath}-md.webp 768w`,
      `${basePath}-lg.webp 1024w`,
      `${basePath}-xl.webp 1366w`,
      `${basePath}-xxl.webp 1920w`
    ].join(', '),
    sizes: '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1366px) 1366px, 1920px',
    loading: 'lazy',
    decoding: 'async'
  };
}

/**
 * Get responsive image sources for picture element
 * @param imageName - The base image name without extension
 * @returns Object with WebP, JPEG sources and fallback
 */
export function getResponsiveImageSources(imageName: string): ResponsiveImageSources {
  const basePath = `/images/optimized/${imageName}`;
  
  return {
    webp: [
      { srcset: `${basePath}-sm.webp`, media: '(max-width: 480px)' },
      { srcset: `${basePath}-md.webp`, media: '(max-width: 768px)' },
      { srcset: `${basePath}-lg.webp`, media: '(max-width: 1024px)' },
      { srcset: `${basePath}-xl.webp`, media: '(max-width: 1366px)' },
      { srcset: `${basePath}-xxl.webp`, media: '(min-width: 1367px)' }
    ],
    jpeg: [
      { srcset: `${basePath}-sm.jpg`, media: '(max-width: 480px)' },
      { srcset: `${basePath}-md.jpg`, media: '(max-width: 768px)' },
      { srcset: `${basePath}-lg.jpg`, media: '(max-width: 1024px)' },
      { srcset: `${basePath}-xl.jpg`, media: '(max-width: 1366px)' },
      { srcset: `${basePath}-xxl.jpg`, media: '(min-width: 1367px)' }
    ],
    fallback: `${basePath}.jpg`
  };
} 