var CACHE_NAME = 'snapdrop-cache-v2';
var urlsToCache = [
  'index.html',
  './',
  'styles.css',
  'scripts/network.js',
  'scripts/ui.js',
  'scripts/clipboard.js',
  'scripts/theme.js',
  'sounds/blop.mp3',
  'images/favicon-96x96.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Otworzono pamięć podręczną');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


self.addEventListener('activate', function(event) {
  console.log('Aktualizowanie Service Worker...')
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return true
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
