const CACHE_NAME = "nba-player-stats-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./src/css/styles.css",
  "./src/javascript/script.js",
  "./icons/jogador-de-basquete_192x192.png",
  "./icons/jogador-de-basquete_512x512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Arquivos armazenados no cache inicial");
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  console.log("Service Worker ativo");
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});

