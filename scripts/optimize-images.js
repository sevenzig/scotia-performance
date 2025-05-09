#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes all images in the static/images directory for web
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

// Get the directory name using ES module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const rootDir = resolve(__dirname, '..');
const staticDir = resolve(rootDir, 'static');
const imagesDir = resolve(staticDir, 'images');
const optimizedDir = resolve(staticDir, 'images/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Import the server-side image optimizer module
// We need to directly import sharp as it's a server-side dependency
import sharp from 'sharp';

/**
 * Optimize an individual image with multiple sizes and formats
 * @param {string} file - Filename
 * @returns {Promise<boolean>} - Success status
 */
async function optimizeImage(file) {
  try {
    const inputPath = resolve(imagesDir, file);
    const fileBase = file.split('.').shift(); // Get filename without extension
    
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
        const webpOutput = resolve(optimizedDir, `${fileBase}-${size.suffix}.webp`);
        const jpgOutput = resolve(optimizedDir, `${fileBase}-${size.suffix}.jpg`);
        
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
    const originalWebp = resolve(optimizedDir, `${fileBase}.webp`);
    const originalJob = sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(originalWebp);
    
    jobs.push(originalJob);
    
    // Create thumbnail for lazy loading previews
    const thumbPath = resolve(optimizedDir, `${fileBase}-thumb.webp`);
    const thumbJob = sharp(inputPath)
      .resize(20) // Tiny placeholder
      .blur(3)    // Blur for better visual transition while loading
      .webp({ quality: 60 })
      .toFile(thumbPath);
    
    jobs.push(thumbJob);
    
    // Wait for all jobs to complete
    await Promise.all(jobs);
    
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
async function optimizeAllImages() {
  try {
    console.log(chalk.blue('Starting image optimization process...'));
    
    // Get all image files
    const files = fs.readdirSync(imagesDir).filter(file => {
      const ext = file.split('.').pop().toLowerCase();
      return ['jpg', 'jpeg', 'png', 'webp'].includes(ext) && !file.includes('optimized');
    });
    
    console.log(chalk.blue(`Found ${files.length} images to process`));
    
    // Create spinner for progress feedback
    const spinner = createSpinner('Optimizing images...').start();
    
    // Process images in batches to avoid memory issues
    const batchSize = 5;
    const results = [];
    
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(optimizeImage));
      results.push(...batchResults);
    }
    
    const successCount = results.filter(Boolean).length;
    
    if (successCount === files.length) {
      spinner.success({ text: `Optimized ${successCount} images successfully!` });
    } else {
      spinner.warn({ text: `Optimized ${successCount}/${files.length} images. Some optimizations failed.` });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error optimizing images:', error);
    return { success: false, error };
  }
}

// Execute the optimization process
try {
  await optimizeAllImages();
} catch (error) {
  console.error(chalk.red('✖ Image optimization failed:'), error);
  process.exit(1);
}

// Helper function to format file sizes
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
} 