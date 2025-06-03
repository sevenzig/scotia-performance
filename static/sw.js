// Scotia Performance Service Worker
// Version 1.0.0

const CACHE_NAME = 'scotia-performance-v1';
const STATIC_CACHE = 'scotia-static-v1';
const DYNAMIC_CACHE = 'scotia-dynamic-v1';

// Resources to cache immediately
const CORE_CACHE_RESOURCES = [
  '/',
  '/services',
  '/about',
  '/location',
  '/images/hero-bg.jpg',
  '/images/garage.jpg',
  '/_app/immutable/assets/styles.css'
];

// Resources to cache on first visit
const EXTENDED_CACHE_RESOURCES = [
  '/services/repair',
  '/services/maintenance',
  '/services/performance',
  '/services/tires-wheels'
];

// Image resources that should be cached
const IMAGE_CACHE_PATTERNS = [
  /\/images\/.*\.(jpg|jpeg|png|webp|svg)$/,
  /\/favicon\.(ico|png|svg)$/,
  /\/apple-touch-icon\.png$/
];

// API cache patterns (if any)
const API_CACHE_PATTERNS = [
  /\/api\//
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache core resources
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching core resources');
        return cache.addAll(CORE_CACHE_RESOURCES);
      }),
      
      // Prefetch extended resources
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log('[SW] Prefetching extended resources');
        return Promise.allSettled(
          EXTENDED_CACHE_RESOURCES.map(url => 
            fetch(url).then(response => {
              if (response.ok) {
                cache.put(url, response);
              }
            }).catch(() => {
              // Ignore prefetch failures
            })
          )
        );
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (except fonts and images)
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.') && 
      !isImageRequest(request)) {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

// Main fetch handler with different strategies
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Network first for HTML pages
    if (isPageRequest(request)) {
      return await networkFirstStrategy(request);
    }
    
    // Strategy 2: Cache first for static assets
    if (isStaticAsset(request)) {
      return await cacheFirstStrategy(request);
    }
    
    // Strategy 3: Stale while revalidate for images
    if (isImageRequest(request)) {
      return await staleWhileRevalidateStrategy(request);
    }
    
    // Strategy 4: Network first for API calls
    if (isApiRequest(request)) {
      return await networkFirstWithTimeout(request, 3000);
    }
    
    // Default: Network with cache fallback
    return await networkWithCacheFallback(request);
    
  } catch (error) {
    console.log('[SW] Fetch error:', error);
    return await handleOffline(request);
  }
}

// Strategy implementations
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || await handleOffline(request);
  }
}

async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return await handleOffline(request);
  }
}

async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const networkPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);
  
  return cachedResponse || await networkPromise || await handleOffline(request);
}

async function networkFirstWithTimeout(request, timeout) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const networkResponse = await fetch(request, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || await handleOffline(request);
  }
}

async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || await handleOffline(request);
  }
}

// Helper functions
function isPageRequest(request) {
  return request.mode === 'navigate' || 
         request.destination === 'document' ||
         request.headers.get('accept')?.includes('text/html');
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/_app/') ||
         url.pathname.includes('/assets/') ||
         url.pathname.match(/\.(css|js|woff|woff2)$/);
}

function isImageRequest(request) {
  return request.destination === 'image' ||
         IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

function isApiRequest(request) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

async function handleOffline(request) {
  if (isPageRequest(request)) {
    // Try to serve a cached page
    const cachedResponse = await caches.match('/');
    return cachedResponse || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
  
  if (isImageRequest(request)) {
    // Return a simple offline image or placeholder
    return new Response('', {
      status: 503,
      statusText: 'Image Unavailable'
    });
  }
  
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Background sync for performance metrics (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'performance-metrics') {
      event.waitUntil(syncPerformanceMetrics());
    }
  });
}

async function syncPerformanceMetrics() {
  // Sync performance data when connection is restored
  console.log('[SW] Syncing performance metrics');
} 