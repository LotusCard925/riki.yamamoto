const CACHE_NAME = 'la-bamba-tacos-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/images/Hicoさんアイコン.png',
  '/images/hecoさん背景6.png',
  '/images/IMG_2802.jpg',
  '/images/IMG_2804.JPG',
  '/images/IMG_2805.JPG',
  '/images/IMG_2806.JPG',
  '/images/IMG_2807.JPG',
  '/images/IMG_2809.JPG',
  '/images/Instagram copy.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
