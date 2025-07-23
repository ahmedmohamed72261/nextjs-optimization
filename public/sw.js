const CACHE_NAME = 'wizfreelance-v1'
const STATIC_CACHE_NAME = 'wizfreelance-static-v1'
const DYNAMIC_CACHE_NAME = 'wizfreelance-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/logo.png',
  '/logo2.png',
  // Add other critical assets
]

// Assets to cache on first request
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: [
    /\/_next\/static\/.*/,
    /\/static\/.*/,
    /\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)0$/,
  ],
  
  // Network first for API calls
  NETWORK_FIRST: [
    /\/api\/.*/,
    /\/auth\/.*/,
  ],
  
  // Stale while revalidate for pages
  STALE_WHILE_REVALIDATE: [
    /\/dashboard.*/,
    /\/services.*/,
    /\/about.*/,
    /\/contact.*/,
    /\/help.*/,
  ],
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }
  
  event.respondWith(handleRequest(request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Determine caching strategy
    const strategy = getCachingStrategy(url.pathname)
    
    switch (strategy) {
      case 'CACHE_FIRST':
        return await cacheFirst(request)
      
      case 'NETWORK_FIRST':
        return await networkFirst(request)
      
      case 'STALE_WHILE_REVALIDATE':
        return await staleWhileRevalidate(request)
      
      default:
        return await networkFirst(request)
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return await handleOffline(request)
  }
}

function getCachingStrategy(pathname) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pattern.test(pathname))) {
      return strategy
    }
  }
  return 'NETWORK_FIRST'
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    return await handleOffline(request)
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    return await handleOffline(request)
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request)
  
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE_NAME)
        cache.then(c => c.put(request, networkResponse.clone()))
      }
      return networkResponse
    })
    .catch(() => null)
  
  return cachedResponse || await networkResponsePromise || await handleOffline(request)
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url)
  
  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    const offlineResponse = await caches.match('/offline')
    if (offlineResponse) {
      return offlineResponse
    }
  }
  
  // Return cached version if available
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  // Return a basic offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'You are currently offline. Please check your internet connection.',
      timestamp: new Date().toISOString()
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle background sync for offline form submissions
  console.log('Background sync triggered')
  
  // Get pending requests from IndexedDB
  // Process them when online
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) {
    return
  }
  
  const data = event.data.json()
  
  const options = {
    body: data.body,
    icon: '/logo2.png',
    badge: '/logo2.png',
    data: data.data,
    actions: data.actions || [],
    tag: data.tag || 'default',
    renotify: true,
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  const urlToOpen = event.notification.data?.url || '/'
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }
        
        // If not, open a new window/tab
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
  )
})

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    event.waitUntil(updateCache(event.data.url))
  }
})

async function updateCache(url) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const response = await fetch(url)
    
    if (response.ok) {
      await cache.put(url, response)
      console.log('Cache updated for:', url)
    }
  } catch (error) {
    console.error('Cache update failed:', error)
  }
}