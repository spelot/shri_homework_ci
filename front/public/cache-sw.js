importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const __IS_DEV__ = false;

workbox.setConfig({
  debug: __IS_DEV__,
});

console.log(`${__IS_DEV__ ? "dev" : "prod"} workbox is loaded`);
if (__IS_DEV__) {
  workbox.routing.setCatchHandler(({ url, event, params }) => {
    console.error("url:", url, "event:", event, "params:", params);
  });
}

const { CacheFirst, StaleWhileRevalidate, NetworkFirst } = workbox.strategies;
const { registerRoute } = workbox.routing;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  "/",
  new StaleWhileRevalidate({
    cacheName: "index",
  })
);

registerRoute(
  /\.(?:png|ico|gif|jpg|svg)$/,
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        // Only cache requests for a month
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  /\.(?:js|css)$/,
  new StaleWhileRevalidate({
    cacheName: "static",
  })
);

registerRoute(
  /http:\/\/(yastatic.net|cdn.jsdelivr.net)\/*/,
  new CacheFirst({
    cacheName: "fonts",
  })
);

registerRoute(
  /http:\/\/localhost:9999\/api\/*/,
  new NetworkFirst({
    cacheName: "api",
  })
);
