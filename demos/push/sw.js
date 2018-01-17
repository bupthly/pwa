var cacheVersion = 'cache-v1';

var cacheList = ['index.html'];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheVersion)
        .then(cache => cache.addAll(cacheList))
        .then(() => self.skipWaiting())
    )
})
self.addEventListener('activate', function(e) {
    console.log('activate');
})

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response != null) {
                return response
            }
            return fetch(e.request.url)
        })
    )
})
