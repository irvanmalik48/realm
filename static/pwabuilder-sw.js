importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js",
);

const HTML_CACHE = "html";
const JS_CACHE = "javascript";
const IMAGE_CACHE = "images";
const FONT_CACHE = "fonts";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function bgSyncPlugin(queueName) {
  return new workbox.backgroundSync.BackgroundSyncPlugin(queueName, {
    maxRetentionTime: 24 * 60,
  });
}

function expirationPlugin(maxEntries) {
  return new workbox.expiration.ExpirationPlugin({
    maxEntries: maxEntries,
  });
}

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "document",
  new workbox.strategies.NetworkFirst({
    cacheName: HTML_CACHE,
    plugins: [
      expirationPlugin(10),
      bgSyncPlugin("documentQueue"),
    ],
  }),
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "script",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: JS_CACHE,
    plugins: [
      expirationPlugin(15),
    ],
  }),
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "image",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: IMAGE_CACHE,
    plugins: [
      expirationPlugin(15),
    ],
  }),
);

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === "font",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: FONT_CACHE,
    plugins: [
      expirationPlugin(15),
    ],
  }),
);
