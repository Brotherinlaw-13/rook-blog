// Root Juice Service Worker - Plant Care Offline Support
const CACHE_NAME = 'root-juice-v1.0.0';
const STATIC_FILES = [
  './root-juice-demo.html',
  './manifest.json'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Root Juice: Caching essential files for offline plant care');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Root Juice: Ready for offline plant care!');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Root Juice: Cleaning up old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Root Juice: Cache cleanup complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Root Juice: Serving from cache:', event.request.url);
          return response;
        }

        // For HTML requests, always try network first (for updates)
        // but fall back to cache if offline
        if (event.request.destination === 'document') {
          return fetch(event.request)
            .then(fetchResponse => {
              // If we get a response, update cache
              if (fetchResponse && fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseClone));
              }
              return fetchResponse;
            })
            .catch(() => {
              // Offline - try to serve from cache
              return caches.match('./root-juice-demo.html');
            });
        }

        // For other resources, network first
        return fetch(event.request)
          .catch(() => {
            // Offline fallback - could serve a placeholder or cached version
            console.log('Root Juice: Network unavailable for:', event.request.url);
          });
      })
  );
});

// Background sync for plant watering reminders (when online)
self.addEventListener('sync', event => {
  if (event.tag === 'plant-reminder-sync') {
    event.waitUntil(
      // Sync any pending plant care data when connection is restored
      syncPlantData()
    );
  }
});

async function syncPlantData() {
  try {
    // In a real app, this would sync with a backend
    // For now, just ensure localStorage data is consistent
    const plants = JSON.parse(localStorage.getItem('rootJuicePlants') || '[]');
    console.log(`Root Juice: Synced ${plants.length} plants`);
    
    // Could implement cloud backup/sync here
    return Promise.resolve();
  } catch (error) {
    console.error('Root Juice: Sync failed:', error);
    return Promise.reject(error);
  }
}

// Handle push notifications for watering reminders
self.addEventListener('push', event => {
  const options = {
    body: 'Some of your plants need watering! 🌱',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iOTYiIGN5PSI5NiIgcj0iOTYiIGZpbGw9IiMyZDZhM2YiLz48c3ZnIHg9IjYwIiB5PSI0OCIgd2lkdGg9IjcyIiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPjxzdGVtIHgxPSIxMiIgeTE9IjIwIiB4Mj0iMTIiIHkyPSIxNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHN0ZW0geDE9IjQiIHkxPSIyMCIgeDI9IjEyIiB5Mj0iMTQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIvPjxzdGVtIHgxPSIyMCIgeTE9IjIwIiB4Mj0iMTIiIHkyPSIxNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iOCIgZmlsbD0id2hpdGUiLz48L3N2Zz48L3N2Zz4=',
    badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iIzJkNmEzZiIvPjxzdmcgeD0iMjAiIHk9IjE2IiB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+PHN0ZW0geDE9IjEyIiB5MT0iMjAiIHgyPSIxMiIgeTI9IjE0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48c3RlbSB4MT0iNCIgeTE9IjIwIiB4Mj0iMTIiIHkyPSIxNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHN0ZW0geDE9IjIwIiB5MT0iMjAiIHgyPSIxMiIgeTI9IjE0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPjwvc3ZnPg==',
    tag: 'plant-reminder',
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: {
      url: './root-juice-demo.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification('Root Juice Plant Care', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: 'window'
    }).then(clientList => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes('root-juice-demo') && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Otherwise, open the app
      if (clients.openWindow) {
        return clients.openWindow('./root-juice-demo.html');
      }
    })
  );
});