// Import types from Node.js
import type { Sharp } from 'sharp';
import type { Stats } from 'fs';

// Type definitions
interface ImageSize {
  width: number;
  suffix: string;
  quality: number;
}

interface CacheEntry {
  mtime: number;
  optimized: string[];
}

interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
}

interface ResponsiveSource {
  srcset: string;
  type?: string;
  sizes?: string;
  media?: string;
}

interface ResponsiveImageSources {
  webp: ResponsiveSource[];
  jpeg: ResponsiveSource[];
  fallback: string;
}

interface ImageAttributes {
  src: string;
  srcset: string;
  sizes: string;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync' | 'auto';
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Server-side dependencies - properly typed
let sharp: typeof import('sharp') | null = null;
let fs: typeof import('fs') | null = null;
let path: typeof import('path') | null = null;
let fileURLToPath: typeof import('url').fileURLToPath | null = null;
let __dirname: string = '';
let staticDir: string = '';
let imagesDir: string = '';
let optimizedDir: string = '';
let cacheFile: string = '';
let imageCache: Record<string, CacheEntry> = {};

// Safely import server-side modules
if (!isBrowser) {
  try {
    // Dynamic imports for server-side modules
    import('sharp').then(module => {
      sharp = module.default;
    }).catch(err => {
      console.error('Failed to import sharp:', err);
    });
    
    import('fs').then(module => {
      fs = module.default;
    }).catch(err => {
      console.error('Failed to import fs:', err);
    });
    
    import('path').then(module => {
      path = module.default;
    }).catch(err => {
      console.error('Failed to import path:', err);
    });
    
    import('url').then(module => {
      fileURLToPath = module.fileURLToPath;
      
      // Initialize paths once URL module is loaded
      if (path && fileURLToPath) {
        __dirname = path.dirname(fileURLToPath(import.meta.url));
        staticDir = path.join(__dirname, '../../../static');
        imagesDir = path.join(staticDir, 'images');
        optimizedDir = path.join(staticDir, 'images/optimized');
        cacheFile = path.join(optimizedDir, 'cache.json');
        
        // Initialize directory and cache
        initializeDirectory();
      }
    }).catch(err => {
      console.error('Failed to import url:', err);
    });
  } catch (error) {
    console.error('Error importing server modules:', error);
  }
}

// Initialize directory and cache
function initializeDirectory(): void {
  if (!fs || !path) return;
  
  try {
    // Create optimized directory if it doesn't exist
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }

    // Load cache if it exists
    try {
      if (fs.existsSync(cacheFile)) {
        imageCache = JSON.parse(fs.readFileSync(cacheFile, 'utf8')) as Record<string, CacheEntry>;
      }
    } catch (error) {
      console.warn('Failed to load image cache:', error);
      imageCache = {};
    }
  } catch (error) {
    console.error('Failed to initialize directory:', error);
  }
}

/**
 * Save cache file
 */
function saveCache(): void {
  if (isBrowser || !fs) return;
  
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(imageCache, null, 2));
  } catch (error) {
    console.warn('Failed to save image cache:', error);
  }
}

/**
 * Check if an image needs optimization by comparing modified dates
 * @param inputPath - Original image path
 * @param outputPath - Optimized image path
 * @returns True if image needs optimization
 */
function needsOptimization(inputPath: string, outputPath: string): boolean {
  if (isBrowser || !fs) return false;
  
  if (!fs.existsSync(outputPath)) return true;
  
  // Check cache
  const inputStat: Stats = fs.statSync(inputPath);
  const cacheEntry: CacheEntry | undefined = imageCache[inputPath];
  
  if (!cacheEntry || cacheEntry.mtime !== inputStat.mtimeMs) {
    return true;
  }
  
  return false;
}

/**
 * Optimize an individual image with multiple sizes and formats
 * @param file - Filename
 * @returns Success status
 */
async function optimizeImage(file: string): Promise<boolean> {
  if (isBrowser || !sharp || !fs || !path) return false;
  
  try {
    const inputPath: string = path.join(imagesDir, file);
    const fileBase: string = path.basename(file, path.extname(file));
    const inputStat: Stats = fs.statSync(inputPath);
    
    // Check if source image has changed since last optimization
    const cacheEntry = imageCache[inputPath];
    if (cacheEntry && cacheEntry.mtime === inputStat.mtimeMs) {
      return true; // Skip unchanged images
    }
    
    // Get image metadata
    const metadata: ImageMetadata = await sharp(inputPath).metadata();
    
    // Create responsive images with more size options
    const sizes: ImageSize[] = [
      { width: 480, suffix: 'sm', quality: 80 },
      { width: 768, suffix: 'md', quality: 80 },
      { width: 1024, suffix: 'lg', quality: 75 },
      { width: 1366, suffix: 'xl', quality: 75 },
      { width: 1920, suffix: 'xxl', quality: 70 }
    ];
    
    // Process jobs in parallel for better performance
    const jobs: Promise<any>[] = [];
    
    // Only resize if image is larger than target size
    for (const size of sizes) {
      if (metadata.width && metadata.width > size.width) {
        const webpOutput: string = path.join(optimizedDir, `${fileBase}-${size.suffix}.webp`);
        const jpgOutput: string = path.join(optimizedDir, `${fileBase}-${size.suffix}.jpg`);
        
        // Skip if already processed and hasn't changed
        if (!needsOptimization(inputPath, webpOutput)) continue;
        
        // Create WebP version - better compression
        const webpJob = sharp(inputPath)
          .resize(size.width)
          .webp({ quality: size.quality, effort: 6 }) // Higher effort = better compression
          .toFile(webpOutput);
        
        // Create fallback JPEG version - better browser support
        const jpgJob = sharp(inputPath)
          .resize(size.width)
          .jpeg({ quality: size.quality, progressive: true, mozjpeg: true })
          .toFile(jpgOutput);
        
        jobs.push(webpJob, jpgJob);
      }
    }
    
    // Create original size WebP version for modern browsers if needed
    const originalWebp: string = path.join(optimizedDir, `${fileBase}.webp`);
    if (needsOptimization(inputPath, originalWebp)) {
      const originalJob = sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(originalWebp);
      
      jobs.push(originalJob);
    }
    
    // Create thumbnail for lazy loading previews
    const thumbPath: string = path.join(optimizedDir, `${fileBase}-thumb.webp`);
    if (needsOptimization(inputPath, thumbPath)) {
      const thumbJob = sharp(inputPath)
        .resize(20) // Tiny placeholder
        .blur(3)    // Blur for better visual transition while loading
        .webp({ quality: 60 })
        .toFile(thumbPath);
      
      jobs.push(thumbJob);
    }
    
    // Wait for all jobs to complete
    await Promise.all(jobs);
    
    // Update cache
    imageCache[inputPath] = { 
      mtime: inputStat.mtimeMs,
      optimized: [`${fileBase}.webp`, `${fileBase}-thumb.webp`]
    };
    
    return true;
  } catch (error) {
    console.error(`Failed to optimize ${file}:`, error);
    return false;
  }
}

/**
 * Optimize all images in the images directory
 * @returns Promise with array of success statuses
 */
export async function optimizeAllImages(): Promise<boolean[]> {
  if (isBrowser || !fs || !path) {
    console.warn('Image optimization is only available on the server side');
    return [];
  }

  try {
    console.log('🖼️  Starting image optimization...');
    
    // Get all image files
    const files: string[] = fs.readdirSync(imagesDir).filter((file: string) => {
      const ext: string = path!.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.includes('optimized');
    });

    console.log(`Found ${files.length} images to optimize`);

    // Process images in parallel (but limit concurrency to avoid overwhelming the system)
    const batchSize = 3;
    const results: boolean[] = [];
    
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(optimizeImage));
      results.push(...batchResults);
      
      console.log(`Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)}`);
    }

    // Save cache after optimization
    saveCache();
    
    console.log('✅ Image optimization complete');
    return results;
  } catch (error) {
    console.error('Failed to optimize images:', error);
    return [];
  }
}

/**
 * Get responsive image sources for client-side use
 * @param imageName - Base image name without extension
 * @returns Object with responsive image sources
 */
export function getResponsiveImageSources(imageName: string): ResponsiveImageSources {
  const baseDir = '/images/optimized/';
  
  if (!isBrowser) {
    // Server-side version with file existence checks
    const hasOptimized = (fs && path && 
      (fs.existsSync(path.join(optimizedDir, `${imageName}.webp`)) || 
       fs.existsSync(path.join(optimizedDir, `${imageName}-lg.webp`))));
    
    if (!hasOptimized) {
      // Return fallback if no optimized images exist
      return {
        webp: [],
        jpeg: [],
        fallback: `/images/${imageName}.jpg`
      };
    }
  }

  // Build responsive sources
  const webpSrcset = [
    `${baseDir}${imageName}-sm.webp 480w`,
    `${baseDir}${imageName}-md.webp 768w`, 
    `${baseDir}${imageName}-lg.webp 1024w`,
    `${baseDir}${imageName}-xl.webp 1366w`,
    `${baseDir}${imageName}-xxl.webp 1920w`
  ];

  const jpegSrcset = [
    `${baseDir}${imageName}-sm.jpg 480w`,
    `${baseDir}${imageName}-md.jpg 768w`,
    `${baseDir}${imageName}-lg.jpg 1024w`, 
    `${baseDir}${imageName}-xl.jpg 1366w`,
    `${baseDir}${imageName}-xxl.jpg 1920w`
  ];

  // Filter srcsets to only include files that exist (server-side)
  const webpFiltered = !isBrowser && fs && path ? 
    webpSrcset.filter((src: string) => {
      const filePath = src.split(' ')[0].replace(baseDir, '');
      return fs!.existsSync(path!.join(optimizedDir, filePath));
    }).join(', ') : webpSrcset.join(', ');

  const jpegFiltered = !isBrowser && fs && path ? 
    jpegSrcset.filter((src: string) => {
      const filePath = src.split(' ')[0].replace(baseDir, '').replace('/images/', '');
      return fs!.existsSync(filePath.startsWith('/') 
        ? path!.join(staticDir, filePath.slice(1)) 
        : path!.join(optimizedDir, filePath));
    }).join(', ') : jpegSrcset.join(', ');

  return {
    webp: [
      {
        srcset: webpFiltered,
        type: 'image/webp',
        sizes: '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1366px) 1366px, 1920px'
      }
    ],
    jpeg: [
      {
        srcset: jpegFiltered,
        type: 'image/jpeg', 
        sizes: '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1366px) 1366px, 1920px'
      }
    ],
    fallback: `${baseDir}${imageName}.jpg`
  };
}

/**
 * Get thumbnail path for blur-up placeholder
 * @param imageName - Base image name without extension
 * @returns Thumbnail path or empty string if not available
 */
export function getThumbnailPath(imageName: string): string {
  const baseDir = '/images/optimized/';
  const thumbPath = `${baseDir}${imageName}-thumb.webp`;
  const hasThumb = !isBrowser && fs && path ? 
    fs.existsSync(path.join(staticDir, 'images/optimized', `${imageName}-thumb.webp`)) : true;

  return hasThumb ? thumbPath : '';
}

/**
 * Get image attributes for simple image tag
 * @param imageName - Base image name without extension
 * @returns Image attributes object
 */
export function getImageAttributes(imageName: string): ImageAttributes {
  const sources = getResponsiveImageSources(imageName);
  
  return {
    src: sources.fallback,
    srcset: sources.webp[0]?.srcset || '',
    sizes: '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1366px) 1366px, 1920px',
    loading: 'lazy',
    decoding: 'async'
  };
} 