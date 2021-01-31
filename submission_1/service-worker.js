const CACHE_NAME = "submission1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/address.html",
  "/pages/profile.html",
  "/pages/sertificate.html",
  "/pages/study.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/img/about.svg",
  "/img/bfwd.svg",
  "/img/contact.svg",
  "/img/map.svg",
  "/img/medal.svg",
  "/img/profile.png",
  "/img/qrcode.svg",
  "/img/school.svg",
  "/img/user.svg",
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,400&display=swap"
];
 
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });