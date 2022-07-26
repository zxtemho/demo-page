const cacheName = 'static-v1';
const resources = ['/images'];

self.addEventListener('install', (event) => {
    const preCache = async () => {
        const cache = await caches.open(cacheName);
        return cache.addAll(resources);
    };
    event.waitUntil(preCache);
});

self.addEventListener('fetch', (event) => {
    const cacheFirst = async (request) => {
        const cache = await caches.open(cacheName);
        const response = await cache.match(request);
        if (response) {
            return response;
        }
        return fetch(request);
    };
    const response = cacheFirst(event.request);
    event.respondWith(response);
});
