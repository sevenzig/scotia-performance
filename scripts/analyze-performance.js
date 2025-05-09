#!/usr/bin/env node

/**
 * Performance Analysis Tool
 * This script analyzes the performance of the Scotia Performance website
 * and provides recommendations for improvement.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

// Set up directory paths
const projectRoot = path.resolve('.');
const staticDir = path.join(projectRoot, 'static');
const buildDir = path.join(projectRoot, 'build');
const srcDir = path.join(projectRoot, 'src');

// Check if build directory exists
const hasBuild = fs.existsSync(buildDir);

// Logging utilities
const log = {
  info: (message) => console.log(chalk.blue(`ℹ ${message}`)),
  success: (message) => console.log(chalk.green(`✓ ${message}`)),
  warning: (message) => console.log(chalk.yellow(`⚠ ${message}`)),
  error: (message) => console.log(chalk.red(`✗ ${message}`)),
  heading: (message) => console.log('\n' + chalk.bold.underline(message))
};

// File size utilities
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getFileSizes(dir, extensions = ['.js', '.css', '.jpg', '.png', '.webp', '.svg', '.woff2']) {
  const results = {};
  
  function traverseDirectory(currentDir, results) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverseDirectory(fullPath, results);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (extensions.includes(ext)) {
          const size = stat.size;
          
          // Group by extension
          results[ext] = results[ext] || { total: 0, files: [] };
          results[ext].total += size;
          results[ext].files.push({
            path: fullPath.replace(projectRoot, ''),
            size,
            formattedSize: formatSize(size)
          });
        }
      }
    }
  }
  
  traverseDirectory(dir, results);
  
  // Sort files by size within each extension group
  for (const ext in results) {
    results[ext].files.sort((a, b) => b.size - a.size);
    results[ext].formattedTotal = formatSize(results[ext].total);
  }
  
  return results;
}

// Check for unoptimized images
function findUnoptimizedImages() {
  const imageDir = path.join(staticDir, 'images');
  const optimizedDir = path.join(imageDir, 'optimized');
  
  if (!fs.existsSync(imageDir)) {
    log.warning('No images directory found at ' + imageDir);
    return [];
  }
  
  const hasOptimizedDir = fs.existsSync(optimizedDir);
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const unoptimizedImages = [];
  
  function checkImage(file, fullPath) {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) return;
    
    const stat = fs.statSync(fullPath);
    if (stat.size > 200 * 1024) { // Images over 200KB
      // Check if there's an optimized version
      const fileName = path.basename(file, ext);
      const hasOptimized = hasOptimizedDir && (
        fs.existsSync(path.join(optimizedDir, `${fileName}.webp`)) ||
        fs.existsSync(path.join(optimizedDir, `${fileName}-lg.webp`))
      );
      
      if (!hasOptimized) {
        unoptimizedImages.push({
          path: fullPath.replace(projectRoot, ''),
          size: stat.size,
          formattedSize: formatSize(stat.size)
        });
      }
    }
  }
  
  function traverseImageDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file === 'optimized') continue; // Skip optimized directory
      
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverseImageDirectory(fullPath);
      } else {
        checkImage(file, fullPath);
      }
    }
  }
  
  traverseImageDirectory(imageDir);
  return unoptimizedImages;
}

// Check critical resources loading
function analyzeCriticalResources() {
  const layoutFile = path.join(srcDir, 'routes', '+layout.svelte');
  const appHtmlFile = path.join(srcDir, 'app.html');
  
  const issues = [];
  
  // Check app.html for preloading
  if (fs.existsSync(appHtmlFile)) {
    const content = fs.readFileSync(appHtmlFile, 'utf8');
    
    if (!content.includes('rel="preload"')) {
      issues.push('No resource preloading found in app.html');
    }
    
    if (!content.includes('rel="preconnect"')) {
      issues.push('No domain preconnection found in app.html');
    }
    
    if (!content.includes('fetchpriority="high"')) {
      issues.push('No fetchpriority attributes found for critical resources');
    }
    
    if (!content.includes('<style>') || !content.includes('</style>')) {
      issues.push('No inline critical CSS found in app.html');
    }
  }
  
  // Check layout for critical path optimization
  if (fs.existsSync(layoutFile)) {
    const content = fs.readFileSync(layoutFile, 'utf8');
    
    if (!content.includes('content-visibility') && !content.includes('contain-intrinsic-size')) {
      issues.push('No content-visibility optimization found in layout');
    }
    
    if (!content.includes('requestAnimationFrame') && !content.includes('requestIdleCallback')) {
      issues.push('No resource loading prioritization found in layout');
    }
  }
  
  return issues;
}

// Analyze CSS loading and optimization
function analyzeCSSOptimization() {
  const layoutFile = path.join(srcDir, 'routes', '+layout.svelte');
  const appHtmlFile = path.join(srcDir, 'app.html');
  const appScssFile = path.join(srcDir, 'app.scss');
  
  const issues = [];
  
  // Check for CSS splitting and optimization
  if (fs.existsSync(appScssFile)) {
    const content = fs.readFileSync(appScssFile, 'utf8');
    const size = fs.statSync(appScssFile).size;
    
    if (size > 50 * 1024) { // Over 50KB
      issues.push(`Main CSS file is large (${formatSize(size)}). Consider splitting into critical and non-critical CSS.`);
    }
    
    // Check for unused CSS
    if (fs.existsSync(buildDir)) {
      try {
        // Look for CSS files in build
        const cssFileSizes = getFileSizes(buildDir, ['.css']).css;
        
        if (cssFileSizes && cssFileSizes.files.length > 0) {
          for (const file of cssFileSizes.files) {
            if (file.size > 50 * 1024) {
              issues.push(`CSS file ${file.path} is large (${file.formattedSize}). Consider code splitting or removing unused CSS.`);
            }
          }
        }
      } catch (error) {
        log.error(`Error analyzing CSS in build: ${error.message}`);
      }
    }
  }
  
  return issues;
}

// Analyze JavaScript optimization
function analyzeJSOptimization() {
  const viteConfigFile = path.join(projectRoot, 'vite.config.js');
  
  const issues = [];
  
  // Check Vite config for chunking and code splitting
  if (fs.existsSync(viteConfigFile)) {
    const content = fs.readFileSync(viteConfigFile, 'utf8');
    
    if (!content.includes('manualChunks')) {
      issues.push('No manual chunk splitting configured in vite.config.js');
    }
    
    if (!content.includes('terserOptions')) {
      issues.push('No Terser optimization configured in vite.config.js');
    }
  }
  
  // Check JS bundle sizes if build exists
  if (fs.existsSync(buildDir)) {
    try {
      const jsFileSizes = getFileSizes(buildDir, ['.js']).js;
      
      if (jsFileSizes && jsFileSizes.files.length > 0) {
        // Check for large bundles
        for (const file of jsFileSizes.files) {
          if (file.size > 100 * 1024) {
            issues.push(`JS bundle ${file.path} is large (${file.formattedSize}). Consider code splitting.`);
          }
        }
      }
    } catch (error) {
      log.error(`Error analyzing JS in build: ${error.message}`);
    }
  }
  
  return issues;
}

// Main function
async function analyzePerformance() {
  log.heading('Scotia Performance - Performance Analysis');
  log.info('Analyzing website performance...');
  
  // 1. Check for build files
  if (!hasBuild) {
    log.warning('No build directory found. Some analyses will be limited.');
    log.info('Consider running `bun run build` first for a more complete analysis.');
  }
  
  // 2. Analyze image optimization
  log.heading('Image Optimization');
  const unoptimizedImages = findUnoptimizedImages();
  
  if (unoptimizedImages.length > 0) {
    log.warning(`Found ${unoptimizedImages.length} unoptimized images`);
    unoptimizedImages.slice(0, 5).forEach(img => {
      log.warning(`${img.path} (${img.formattedSize})`);
    });
    
    if (unoptimizedImages.length > 5) {
      log.warning(`...and ${unoptimizedImages.length - 5} more`);
    }
    
    log.info('Run `bun run optimize:images` to optimize these images');
  } else {
    log.success('All images appear to be optimized');
  }
  
  // 3. Analyze critical resources
  log.heading('Critical Resource Loading');
  const criticalResourceIssues = analyzeCriticalResources();
  
  if (criticalResourceIssues.length > 0) {
    log.warning('Found issues with critical resource loading:');
    criticalResourceIssues.forEach(issue => {
      log.warning(`- ${issue}`);
    });
  } else {
    log.success('Critical resource loading looks well optimized');
  }
  
  // 4. Analyze CSS optimization
  log.heading('CSS Optimization');
  const cssIssues = analyzeCSSOptimization();
  
  if (cssIssues.length > 0) {
    log.warning('Found issues with CSS optimization:');
    cssIssues.forEach(issue => {
      log.warning(`- ${issue}`);
    });
  } else {
    log.success('CSS appears to be well optimized');
  }
  
  // 5. Analyze JavaScript optimization
  log.heading('JavaScript Optimization');
  const jsIssues = analyzeJSOptimization();
  
  if (jsIssues.length > 0) {
    log.warning('Found issues with JavaScript optimization:');
    jsIssues.forEach(issue => {
      log.warning(`- ${issue}`);
    });
  } else {
    log.success('JavaScript appears to be well optimized');
  }
  
  // 6. Bundle sizes if build exists
  if (hasBuild) {
    log.heading('Bundle Size Analysis');
    
    const jsFileSizes = getFileSizes(buildDir, ['.js']).js;
    const cssFileSizes = getFileSizes(buildDir, ['.css']).css;
    
    if (jsFileSizes) {
      log.info(`Total JavaScript: ${jsFileSizes.formattedTotal}`);
      log.info('Top 3 largest JavaScript files:');
      jsFileSizes.files.slice(0, 3).forEach(file => {
        const sizeColor = file.size > 100 * 1024 ? chalk.yellow : chalk.green;
        console.log(`  ${sizeColor(file.formattedSize)} - ${file.path}`);
      });
    }
    
    if (cssFileSizes) {
      log.info(`\nTotal CSS: ${cssFileSizes.formattedTotal}`);
      log.info('Top 3 largest CSS files:');
      cssFileSizes.files.slice(0, 3).forEach(file => {
        const sizeColor = file.size > 50 * 1024 ? chalk.yellow : chalk.green;
        console.log(`  ${sizeColor(file.formattedSize)} - ${file.path}`);
      });
    }
  }
  
  // 7. Summary and recommendations
  log.heading('Performance Recommendations');
  
  const allIssues = [
    ...criticalResourceIssues,
    ...cssIssues,
    ...jsIssues,
    ...(unoptimizedImages.length > 0 ? ['Optimize large images to improve load time'] : [])
  ];
  
  if (allIssues.length > 0) {
    log.info('Based on the analysis, here are the top recommendations:');
    
    allIssues.slice(0, 5).forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`);
    });
  } else {
    log.success('Great job! Your site appears to be well optimized for performance.');
    log.info('For additional improvements, consider:');
    console.log('  1. Setting up a CDN for static assets');
    console.log('  2. Implementing HTTP/2 for improved resource loading');
    console.log('  3. Adding service worker for offline capabilities');
  }
  
  log.heading('Next Steps');
  log.info('Run `bun run analyze` to view a detailed bundle analysis');
  log.info('Run `bun run build` to generate an optimized production build');
  log.info('Run `bun run optimize:images` to optimize all images');
}

// Run the analysis
analyzePerformance().catch(error => {
  log.error(`Error during performance analysis: ${error.message}`);
  process.exit(1);
}); 