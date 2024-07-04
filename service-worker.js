const CACHE_NAME = 'kombinatorik-explorer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/info.html',
  '/style.css',
  '/flowchart.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

const urlsToCache = [
  '/',
  '/index.html',
  '/info.html',
  '/cheatsheet.html',
  '/style.css',
  '/flowchart.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];
