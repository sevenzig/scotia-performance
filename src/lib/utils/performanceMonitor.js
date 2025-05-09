/**
 * Performance Monitoring Utility
 * Tracks key web vitals and reports them for analysis
 */

/**
 * Available metrics to monitor
 * @typedef {Object} PerformanceMetrics
 * @property {number} [fcp] - First Contentful Paint in ms
 * @property {number} [lcp] - Largest Contentful Paint in ms
 * @property {number} [fid] - First Input Delay in ms
 * @property {number} [cls] - Cumulative Layout Shift score
 * @property {number} [ttfb] - Time to First Byte in ms
 * @property {number} [load] - Load event time in ms
 */

// Track if monitoring is active
let isMonitoring = false;

// Storage for metric values
const metrics = {};

// Callbacks for metrics
const callbacks = {
  fcp: [],
  lcp: [],
  fid: [],
  cls: [],
  ttfb: [],
  load: [],
  all: []
};

/**
 * Start monitoring performance metrics
 * @param {Object} options - Configuration options
 * @param {boolean} [options.reportToConsole=false] - Whether to log metrics to console
 * @param {Function} [options.onComplete] - Callback when all metrics are collected
 * @returns {void}
 */
export function startMonitoring({ reportToConsole = false, onComplete } = {}) {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return; // Not in browser or PerformanceObserver not supported
  }
  
  if (isMonitoring) return; // Already monitoring
  isMonitoring = true;
  
  // Report to console if enabled
  if (reportToConsole) {
    onMetric('all', (metrics) => {
      console.log('Performance Metrics:', metrics);
    });
  }
  
  // Call onComplete when all core metrics are collected
  if (onComplete && typeof onComplete === 'function') {
    const allMetrics = ['fcp', 'lcp', 'fid', 'cls'];
    let timer = null;
    
    onMetric('all', (metrics) => {
      // Check if we have all core metrics
      const hasAllMetrics = allMetrics.every(metric => metrics[metric] !== undefined);
      
      // Wait a bit to make sure all metrics are stable
      if (hasAllMetrics && !timer) {
        timer = setTimeout(() => {
          onComplete(metrics);
        }, 1000);
      }
    });
  }
  
  // Monitor First Contentful Paint
  try {
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0].startTime;
        updateMetric('fcp', fcp);
        fcpObserver.disconnect();
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (error) {
    console.warn('FCP monitoring not supported', error);
  }
  
  // Monitor Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      updateMetric('lcp', lastEntry.startTime);
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Disconnect on page unload to get the final LCP value
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        lcpObserver.takeRecords().forEach((entry) => {
          updateMetric('lcp', entry.startTime);
        });
        lcpObserver.disconnect();
      }
    });
  } catch (error) {
    console.warn('LCP monitoring not supported', error);
  }
  
  // Monitor First Input Delay
  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (entry.startTime < metrics.fid || metrics.fid === undefined) {
          updateMetric('fid', entry.processingStart - entry.startTime);
        }
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.warn('FID monitoring not supported', error);
  }
  
  // Monitor Cumulative Layout Shift
  try {
    let clsValue = 0;
    let clsEntries = [];
    let sessionValue = 0;
    let sessionEntries = [];
    let clsObserver;
    
    const entryHandler = (entries) => {
      entries.forEach((entry) => {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          
          // If the entry occurred less than 1 second after the previous entry
          // and less than 5 seconds after the first entry in the session,
          // include the entry in the current session
          if (sessionValue &&
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            // Start a new session
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          
          // If the current session value is larger than the current CLS value,
          // update the CLS value and entries
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
            updateMetric('cls', clsValue);
          }
        }
      });
    };
    
    clsObserver = new PerformanceObserver(list => {
      entryHandler(list.getEntries());
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Disconnect on page unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        if (clsObserver) {
          entryHandler(clsObserver.takeRecords());
          clsObserver.disconnect();
        }
      }
    });
  } catch (error) {
    console.warn('CLS monitoring not supported', error);
  }
  
  // Time to First Byte
  try {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      updateMetric('ttfb', navigationEntries[0].responseStart);
    }
  } catch (error) {
    console.warn('TTFB monitoring not supported', error);
  }
  
  // Monitor page load event
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadTime = performance.now();
      updateMetric('load', loadTime);
    }, 0);
  });
}

/**
 * Update a metric value and trigger callbacks
 * @param {string} name - Metric name
 * @param {number} value - Metric value
 * @private
 */
function updateMetric(name, value) {
  metrics[name] = value;
  
  // Trigger specific metric callbacks
  if (callbacks[name]) {
    callbacks[name].forEach(callback => callback(value));
  }
  
  // Trigger all metrics callbacks
  if (callbacks.all) {
    callbacks.all.forEach(callback => callback({...metrics}));
  }
}

/**
 * Register a callback for a specific metric or all metrics
 * @param {string} metricName - Metric name or 'all' for all metrics
 * @param {Function} callback - Callback function
 * @returns {Function} - Function to remove the callback
 */
export function onMetric(metricName, callback) {
  if (!callbacks[metricName]) {
    console.warn(`Unknown metric: ${metricName}`);
    return () => {};
  }
  
  callbacks[metricName].push(callback);
  
  // If the metric already has a value, call the callback immediately
  if (metricName === 'all' && Object.keys(metrics).length > 0) {
    callback({...metrics});
  } else if (metrics[metricName] !== undefined) {
    callback(metrics[metricName]);
  }
  
  // Return a function to remove the callback
  return () => {
    const index = callbacks[metricName].indexOf(callback);
    if (index !== -1) {
      callbacks[metricName].splice(index, 1);
    }
  };
}

/**
 * Get the current value of a specific metric
 * @param {string} metricName - Metric name
 * @returns {number|undefined} - Metric value or undefined if not available
 */
export function getMetric(metricName) {
  return metrics[metricName];
}

/**
 * Get all collected metrics
 * @returns {PerformanceMetrics} - All metrics
 */
export function getAllMetrics() {
  return {...metrics};
}

/**
 * Rates the performance based on the collected metrics
 * @returns {{score: number, rating: string, details: Object}} - Performance score and details
 */
export function ratePerformance() {
  if (Object.keys(metrics).length === 0) {
    return { score: 0, rating: 'Unknown', details: {} };
  }
  
  const thresholds = {
    fcp: { good: 1800, poor: 3000 },
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 800, poor: 1800 },
    load: { good: 3000, poor: 6000 }
  };
  
  const ratings = {};
  let totalScore = 0;
  let metricCount = 0;
  
  // Rate each metric
  for (const [name, value] of Object.entries(metrics)) {
    if (!thresholds[name]) continue;
    
    let score;
    let rating;
    
    if (value <= thresholds[name].good) {
      score = 1;
      rating = 'good';
    } else if (value <= thresholds[name].poor) {
      score = 0.5;
      rating = 'needs improvement';
    } else {
      score = 0;
      rating = 'poor';
    }
    
    ratings[name] = { value, rating, score };
    totalScore += score;
    metricCount++;
  }
  
  // Calculate overall score (0-100)
  const overallScore = metricCount ? Math.round((totalScore / metricCount) * 100) : 0;
  
  // Determine overall rating
  let overallRating;
  if (overallScore >= 90) {
    overallRating = 'Excellent';
  } else if (overallScore >= 70) {
    overallRating = 'Good';
  } else if (overallScore >= 50) {
    overallRating = 'Needs Improvement';
  } else {
    overallRating = 'Poor';
  }
  
  return {
    score: overallScore,
    rating: overallRating,
    details: ratings
  };
}

// Auto-initialize when in browser
if (typeof window !== 'undefined') {
  // Initialize after page is loaded
  if (document.readyState === 'complete') {
    startMonitoring({ reportToConsole: process.env.NODE_ENV === 'development' });
  } else {
    window.addEventListener('load', () => {
      startMonitoring({ reportToConsole: process.env.NODE_ENV === 'development' });
    });
  }
}

export default {
  startMonitoring,
  onMetric,
  getMetric,
  getAllMetrics,
  ratePerformance
}; 