/**
 * Performance Monitoring Utility
 * Tracks key web vitals and reports them for analysis
 */

// Type definitions
export interface PerformanceMetrics {
  fcp?: number;     // First Contentful Paint in ms
  lcp?: number;     // Largest Contentful Paint in ms
  fid?: number;     // First Input Delay in ms
  cls?: number;     // Cumulative Layout Shift score
  ttfb?: number;    // Time to First Byte in ms
  load?: number;    // Load event time in ms
}

export interface MonitoringOptions {
  reportToConsole?: boolean;
  onComplete?: (metrics: PerformanceMetrics) => void;
}

export interface MetricRating {
  value: number;
  rating: 'good' | 'needs improvement' | 'poor';
  score: number;
}

export interface PerformanceRating {
  score: number;
  rating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  details: Record<string, MetricRating>;
}

interface MetricThresholds {
  good: number;
  poor: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface NavigationEntry extends PerformanceEntry {
  responseStart: number;
}

type MetricCallback = (value: number) => void;
type AllMetricsCallback = (metrics: PerformanceMetrics) => void;
type MetricCallbacks = Record<keyof PerformanceMetrics | 'all', (MetricCallback | AllMetricsCallback)[]>;

// Track if monitoring is active
let isMonitoring = false;

// Storage for metric values
const metrics: PerformanceMetrics = {};

// Callbacks for metrics
const callbacks: MetricCallbacks = {
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
 * @param options - Configuration options
 * @returns void
 */
export function startMonitoring({ reportToConsole = false, onComplete }: MonitoringOptions = {}): void {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return; // Not in browser or PerformanceObserver not supported
  }
  
  if (isMonitoring) return; // Already monitoring
  isMonitoring = true;
  
  // Report to console if enabled
  if (reportToConsole) {
    onMetric('all', (metrics: PerformanceMetrics) => {
      console.log('Performance Metrics:', metrics);
    });
  }
  
  // Call onComplete when all core metrics are collected
  if (onComplete && typeof onComplete === 'function') {
    const allMetrics: (keyof PerformanceMetrics)[] = ['fcp', 'lcp', 'fid', 'cls'];
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    onMetric('all', (metrics: PerformanceMetrics) => {
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
      const entries = entryList.getEntries() as FirstInputEntry[];
      entries.forEach((entry) => {
        if ((metrics.fid === undefined) || entry.startTime < (metrics.fid || Infinity)) {
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
    let clsEntries: LayoutShiftEntry[] = [];
    let sessionValue = 0;
    let sessionEntries: LayoutShiftEntry[] = [];
    let clsObserver: PerformanceObserver;
    
    const entryHandler = (entries: LayoutShiftEntry[]) => {
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
      entryHandler(list.getEntries() as LayoutShiftEntry[]);
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Disconnect on page unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        if (clsObserver) {
          entryHandler(clsObserver.takeRecords() as LayoutShiftEntry[]);
          clsObserver.disconnect();
        }
      }
    });
  } catch (error) {
    console.warn('CLS monitoring not supported', error);
  }
  
  // Time to First Byte
  try {
    const navigationEntries = performance.getEntriesByType('navigation') as NavigationEntry[];
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
 * @param name - Metric name
 * @param value - Metric value
 * @private
 */
function updateMetric(name: keyof PerformanceMetrics, value: number): void {
  metrics[name] = value;
  
  // Trigger specific metric callbacks
  const metricCallbacks = callbacks[name] as MetricCallback[];
  if (metricCallbacks) {
    metricCallbacks.forEach(callback => callback(value));
  }
  
  // Trigger all metrics callbacks
  const allCallbacks = callbacks.all as AllMetricsCallback[];
  if (allCallbacks) {
    allCallbacks.forEach(callback => callback({...metrics}));
  }
}

/**
 * Register a callback for a specific metric or all metrics
 * @param metricName - Metric name or 'all' for all metrics
 * @param callback - Callback function
 * @returns Function to remove the callback
 */
export function onMetric(metricName: keyof PerformanceMetrics | 'all', callback: MetricCallback | AllMetricsCallback): () => void {
  const metricCallbacks = callbacks[metricName];
  if (!metricCallbacks) {
    console.warn(`Unknown metric: ${metricName}`);
    return () => {};
  }
  
  metricCallbacks.push(callback as MetricCallback & AllMetricsCallback);
  
  // If the metric already has a value, call the callback immediately
  if (metricName === 'all' && Object.keys(metrics).length > 0) {
    (callback as AllMetricsCallback)({...metrics});
  } else if (metricName !== 'all' && metrics[metricName] !== undefined) {
    (callback as MetricCallback)(metrics[metricName]!);
  }
  
  // Return a function to remove the callback
  return () => {
    const index = metricCallbacks.indexOf(callback as MetricCallback & AllMetricsCallback);
    if (index !== -1) {
      metricCallbacks.splice(index, 1);
    }
  };
}

/**
 * Get the current value of a specific metric
 * @param metricName - Metric name
 * @returns Metric value or undefined if not available
 */
export function getMetric(metricName: keyof PerformanceMetrics): number | undefined {
  return metrics[metricName];
}

/**
 * Get all collected metrics
 * @returns All metrics
 */
export function getAllMetrics(): PerformanceMetrics {
  return {...metrics};
}

/**
 * Rates the performance based on the collected metrics
 * @returns Performance score and details
 */
export function ratePerformance(): PerformanceRating {
  if (Object.keys(metrics).length === 0) {
    return { score: 0, rating: 'Poor', details: {} };
  }
  
  const thresholds: Record<keyof PerformanceMetrics, MetricThresholds> = {
    fcp: { good: 1800, poor: 3000 },
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 800, poor: 1800 },
    load: { good: 3000, poor: 6000 }
  };
  
  const ratings: Record<string, MetricRating> = {};
  let totalScore = 0;
  let metricCount = 0;
  
  // Rate each metric
  for (const [name, value] of Object.entries(metrics) as [keyof PerformanceMetrics, number][]) {
    const threshold = thresholds[name];
    if (!threshold || value === undefined) continue;
    
    let score: number;
    let rating: 'good' | 'needs improvement' | 'poor';
    
    if (value <= threshold.good) {
      score = 1;
      rating = 'good';
    } else if (value <= threshold.poor) {
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
  let overallRating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
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
    startMonitoring({ reportToConsole: (globalThis as any).process?.env?.NODE_ENV === 'development' });
  } else {
    window.addEventListener('load', () => {
      startMonitoring({ reportToConsole: (globalThis as any).process?.env?.NODE_ENV === 'development' });
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