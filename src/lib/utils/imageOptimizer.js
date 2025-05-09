// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Server-side dependencies
let sharp;
let fs;
let path;
let fileURLToPath;
let __dirname;
let staticDir;
let imagesDir;
let optimizedDir;
let cacheFile;
let imageCache = {};

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
function initializeDirectory() {
  if (!fs || !path) return;
  
  try {
    // Create optimized directory if it doesn't exist
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }

    // Load cache if it exists
    try {
      if (fs.existsSync(cacheFile)) {
        imageCache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
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
function saveCache() {
  if (isBrowser) return;
  
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(imageCache, null, 2));
  } catch (error) {
    console.warn('Failed to save image cache:', error);
  }
}

/**
 * Check if an image needs optimization by comparing modified dates
 * @param {string} inputPath - Original image path
 * @param {string} outputPath - Optimized image path
 * @returns {boolean} - True if image needs optimization
 */
function needsOptimization(inputPath, outputPath) {
  if (isBrowser) return false;
  
  if (!fs.existsSync(outputPath)) return true;
  
  // Check cache
  const inputStat = fs.statSync(inputPath);
  const cacheEntry = imageCache[inputPath];
  
  if (!cacheEntry || cacheEntry.mtime !== inputStat.mtimeMs) {
    return true;
  }
  
  return false;
}

/**
 * Optimize an individual image with multiple sizes and formats
 * @param {string} file - Filename
 * @returns {Promise<boolean>} - Success status
 */
async function optimizeImage(file) {
  if (isBrowser) return false;
  
  try {
    const inputPath = path.join(imagesDir, file);
    const fileBase = path.basename(file, path.extname(file));
    const inputStat = fs.statSync(inputPath);
    
    // Check if source image has changed since last optimization
    if (imageCache[inputPath] && imageCache[inputPath].mtime === inputStat.mtimeMs) {
      return true; // Skip unchanged images
    }
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Create responsive images with more size options
    const sizes = [
      { width: 480, suffix: 'sm', quality: 80 },
      { width: 768, suffix: 'md', quality: 80 },
      { width: 1024, suffix: 'lg', quality: 75 },
      { width: 1366, suffix: 'xl', quality: 75 },
      { width: 1920, suffix: 'xxl', quality: 70 }
    ];
    
    // Process jobs in parallel for better performance
    const jobs = [];
    
    // Only resize if image is larger than target size
    for (const size of sizes) {
      if (metadata.width && metadata.width > size.width) {
        const webpOutput = path.join(optimizedDir, `${fileBase}-${size.suffix}.webp`);
        const jpgOutput = path.join(optimizedDir, `${fileBase}-${size.suffix}.jpg`);
        
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
    const originalWebp = path.join(optimizedDir, `${fileBase}.webp`);
    if (needsOptimization(inputPath, originalWebp)) {
      const originalJob = sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(originalWebp);
      
      jobs.push(originalJob);
    }
    
    // Create thumbnail for lazy loading previews
    const thumbPath = path.join(optimizedDir, `${fileBase}-thumb.webp`);
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
      sizes: sizes.map(s => s.suffix),
      formats: ['webp', 'jpg'],
      width: metadata.width,
      height: metadata.height
    };
    
    return true;
  } catch (error) {
    console.error(`Error optimizing image ${file}:`, error);
    return false;
  }
}

/**
 * Optimize all images in the static/images directory
 * Creates webp versions and resizes large images
 */
export async function optimizeAllImages() {
  if (isBrowser) {
    console.warn('optimizeAllImages cannot run in the browser');
    return { success: false, error: 'Cannot run in browser' };
  }
  
  try {
    // Get all image files
    const files = fs.readdirSync(imagesDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.includes('optimized');
    });

    // Process images in batches to avoid memory issues
    const batchSize = 5;
    const results = [];
    
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(optimizeImage));
      results.push(...batchResults);
      
      // Save cache periodically
      if ((i + batchSize) % 20 === 0 || i + batchSize >= files.length) {
        saveCache();
      }
    }
    
    // Final cache save
    saveCache();
    
    console.log(`Image optimization complete! Processed ${results.length} images.`);
    return { success: true };
  } catch (error) {
    console.error('Error optimizing images:', error);
    return { success: false, error };
  }
}

/**
 * Get responsive image sources for a specific image
 * @param {string} imageName - The base image name without extension
 * @returns {Object} - Object with srcset and sizes attributes
 */
export function getResponsiveImageSources(imageName) {
  const baseDir = '/images/optimized/';
  const originalPath = `/images/${imageName}`;
  
  if (isBrowser) {
    // Browser version with sensible defaults
    const srcsetWebp = [
      `${baseDir}${imageName}-sm.webp 480w`,
      `${baseDir}${imageName}-md.webp 768w`,
      `${baseDir}${imageName}-lg.webp 1024w`,
      `${baseDir}${imageName}-xl.webp 1366w`,
      `${baseDir}${imageName}-xxl.webp 1920w`,
      `${baseDir}${imageName}.webp`
    ].join(', ');
    
    const srcsetJpg = [
      `${baseDir}${imageName}-sm.jpg 480w`,
      `${baseDir}${imageName}-md.jpg 768w`,
      `${baseDir}${imageName}-lg.jpg 1024w`,
      `${baseDir}${imageName}-xl.jpg 1366w`,
      `${baseDir}${imageName}-xxl.jpg 1920w`,
      originalPath
    ].join(', ');
    
    const sizes = '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1366px) 1366px, 1920px';
    
    return {
      webp: { srcset: srcsetWebp, sizes },
      jpg: { srcset: srcsetJpg, sizes },
      placeholder: `${baseDir}${imageName}-thumb.webp`
    };
  }
  
  // Server-side version with file existence checks
  const hasOptimized = fs.existsSync(path.join(optimizedDir, `${imageName}.webp`)) || 
                     fs.existsSync(path.join(optimizedDir, `${imageName}-lg.webp`));
  
  if (!hasOptimized) {
    return {
      webp: { srcset: '', sizes: '' },
      jpg: { srcset: '', sizes: '' },
      src: originalPath,
      placeholder: ''
    };
  }

  // Check for thumbnail
  const thumbPath = `${baseDir}${imageName}-thumb.webp`;
  const hasThumb = fs.existsSync(path.join(staticDir, 'images/optimized', `${imageName}-thumb.webp`));

  // Build srcset with file existence checks
  const srcsetWebp = [
    `${baseDir}${imageName}-sm.webp 480w`,
    `${baseDir}${imageName}-md.webp 768w`,
    `${baseDir}${imageName}-lg.webp 1024w`,
    `${baseDir}${imageName}-xl.webp 1366w`,
    `${baseDir}${imageName}-xxl.webp 1920w`,
    `${baseDir}${imageName}.webp`
  ].filter(src => {
    const filePath = src.split(' ')[0].replace(baseDir, '');
    return fs.existsSync(path.join(optimizedDir, filePath));
  }).join(', ');
  
  const srcsetJpg = [
    `${baseDir}${imageName}-sm.jpg 480w`,
    `${baseDir}${imageName}-md.jpg 768w`,
    `${baseDir}${imageName}-lg.jpg 1024w`,
    `${baseDir}${imageName}-xl.jpg 1366w`,
    `${baseDir}${imageName}-xxl.jpg 1920w`,
    originalPath
  ].filter(src => {
    const filePath = src.split(' ')[0].replace(baseDir, '').replace('/images/', '');
    return fs.existsSync(filePath.startsWith('/') 
      ? path.join(staticDir, filePath.slice(1)) 
      : path.join(optimizedDir, filePath));
  }).join(', ');
  
  // Improved sizes attribute for responsive images
  const sizes = '(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1366px) 1366px, 1920px';
  
  return {
    webp: { srcset: srcsetWebp, sizes },
    jpg: { srcset: srcsetJpg, sizes },
    placeholder: hasThumb ? thumbPath : ''
  };
}

/**
 * Get complete image attributes for use in picture/img elements
 * @param {string} imageName - The base image name without extension
 * @returns {Object} - Object with all attributes for responsive images
 */
export function getImageAttributes(imageName) {
  const sources = getResponsiveImageSources(imageName);
  const originalPath = `/images/${imageName}`;
  
  return {
    ...sources,
    src: originalPath
  };
} 