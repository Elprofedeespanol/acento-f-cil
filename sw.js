// sw.js - Service Worker para AcentoFácil

self.addEventListener('install', event => {
  console.log('Service Worker: Instalado');
  event.waitUntil(
    caches.open('acento-facil-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/images/icon-192.png',
        '/images/icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // Si no hay red ni caché, muestra algo básico
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activado');
});
