/* eslint-disable consistent-return */
const CACHE_NAME = 'submission1';
const urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/address.html',
  '/pages/profile.html',
  '/pages/sertificate.html',
  '/pages/study.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/script.js',
  '/img/about.svg',
  '/img/bfwd.svg',
  '/img/contact.svg',
  '/img/map.svg',
  '/img/medal.svg',
  '/img/profile.png',
  '/img/qrcode.svg',
  '/img/school.svg',
  '/img/user.svg',
  'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,400&display=swap',
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          // eslint-disable-next-line no-console
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        // eslint-disable-next-line no-console
        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url,
        );
        return fetch(event.request);
      }),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      // eslint-disable-next-line array-callback-return
      cacheNames.map((cacheName) => {
        // eslint-disable-next-line eqeqeq
        if (cacheName != CACHE_NAME) {
          console.log(`ServiceWorker: cache ${cacheName} dihapus`);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
});
