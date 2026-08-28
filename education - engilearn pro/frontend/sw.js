const CACHE_NAME = "engilearn-v102";
const ASSETS = [
  "index.html",
  "performance-test-report.html",
  "manifest.json",
  "assets/css/main.css",
  "assets/css/auth.css",
  "assets/css/tools.css",
  "assets/css/lms.css",
  "assets/css/theme-engine.css",
  "assets/css/responsive.css",
  "assets/js/api.js",
  "assets/js/main.js",
  "assets/js/theme-engine.js",
  "assets/js/nav.js",
  "assets/js/videos-page.js",
  "assets/js/auth.js",
  "assets/js/lms-student.js",
  "assets/js/lms-admin.js",
  "assets/js/tools.js",
  "assets/js/animations.js"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  if (event.request.mode === "navigate" || url.pathname.endsWith(".html")) return;

  const isStaticAsset = /\.(?:css|js|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|pdf)$/i.test(url.pathname);
  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          const refresh = fetch(event.request).then((response) => {
            if (response && response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
          }).catch(() => cached);
          return cached || refresh;
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

