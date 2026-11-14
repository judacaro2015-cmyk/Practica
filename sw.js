/* Service worker: guarda la web en el dispositivo para que cargue rápido y
   funcione sin conexión. Sirve lo guardado y lo actualiza en segundo plano. */
const CACHE = "proyecto-v7";
const ARCHIVOS = [
  "./", "index.html", "unidad.html", "guia-docente.html", "css/styles.css",
  "img/escudo-colegio.jpg", "img/escudo-universidad.png", "js/datos.js", "js/comun.js", "js/app.js", "js/unidad.js", "js/actividades.js", "js/simulaciones.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Primero la red (para que siempre llegue la versión nueva); si está lenta o
   sin conexión (más de 4 s), usa lo guardado en el dispositivo. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const guardado = await c.match(e.request, { ignoreSearch: true });
    const red = fetch(e.request).then(r => {
      if (r && r.ok && new URL(e.request.url).origin === self.location.origin) c.put(e.request, r.clone());
      return r;
    });
    if (!guardado) return red;
    const limite = new Promise(res => setTimeout(() => res(guardado), 4000));
    return Promise.race([red.catch(() => guardado), limite]);
  }));
});
