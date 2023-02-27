const SW_VERSION = '1.0.0';

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import * as navigationPreload from 'workbox-navigation-preload';

let refreshing;
const domainCheck = (url, sameDomainCheck) =>
  url.origin === 'https://constant.myntassets.com' ||
  url.origin === 'https://assets.myntassets.com' ||
  (sameDomainCheck && url.origin === self.location.origin);

const pageCheck = url => {
  const pages = {
    '/checkout/cart': true,
    '/checkout/address': true,
    '/checkout/payment': true,
    '/checkout/confirm': true
  };
  return !!pages[url];
};

self.addEventListener('install', event => {
  if (event.isUpdate) {
    if (confirm(`New app update is available!. Click OK to refresh`)) {
      window.location.reload();
    }
  }
});

self.addEventListener('controllerchange', function(event) {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

self.addEventListener('fetch', event => {
  try {
    if (event.request.mode === 'navigate') {
      const newUrl = new URL(event.request.url);
      if (pageCheck(newUrl.pathname)) {
        (async function() {
          const response = await fetch('/checkoutproxy/check', {
            method: 'GET',
            headers: {
              Accept: 'application/json'
            }
          });
          const hash = await response.json();
          if (hash && hash.code) {
            if (!self.__HASH_CHECK__) {
              self.__HASH_CHECK__ = hash.code;
            } else if (self.__HASH_CHECK__ !== hash.code) {
              self.__HASH_CHECK__ = hash.code;
              const client = await clients.get(
                event.clientId || event.resultingClientId
              );
              client.postMessage({ reload: true });
            }
          }
        })();
      }
    }
  } catch (e) {
    console.log(e);
  }
});

self.__WB_DISABLE_DEV_LOGS = true;
self.__WB_MANIFEST;
self.skipWaiting();
clientsClaim();
navigationPreload.enable();

try {
  // ============================PAGES CACHING====================================
  const ignoreQueryStringPlugin = {
    cacheKeyWillBeUsed: async () => {
      return 'page-cache';
    },
    cacheWillUpdate: async ({ response }) => {
      const responseText = await response.text();
      const bodyStream = responseText.replace(/__myx_data__/g, '__no_data__');

      return new Response(bodyStream, response);
    }
  };

  registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ url }) => pageCheck(url.pathname),
    // Use a Stale while revalidate caching strategy
    new CacheFirst({
      // Put all cached files in a cache named 'pages'
      cacheName: 'MYNT-CACHE-PAGES',
      // networkTimeoutSeconds: 2,
      matchOptions: {
        ignoreSearch: true
      },
      plugins: [
        ignoreQueryStringPlugin,
        new CacheableResponsePlugin({
          statuses: [200] // Ensure that only requests that result in a 200 status are cached
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
          maxEntries: 1
        })
      ]
    })
  );

  // ============================SCRIPT CACHING===================================
  registerRoute(
    ({ request, url }) =>
      (request.destination === 'script' ||
        request.destination === 'javascript') &&
      domainCheck(url, true),
    new CacheFirst({
      cacheName: 'MYNT-CACHE-JAVASCRIPT',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
          maxEntries: 50,
          purgeOnQuotaError: true
        })
      ]
    })
  );

  // ============================STYLESHEET CACHING===============================
  registerRoute(
    ({ request, url }) =>
      request.destination === 'style' && domainCheck(url, true),
    new CacheFirst({
      cacheName: 'MYNT-CACHE-STYLESHEETS',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
          maxEntries: 25,
          purgeOnQuotaError: true
        })
      ]
    })
  );

  // ============================IMAGES CACHING===================================
  registerRoute(
    ({ request, url }) =>
      request.destination === 'image' && domainCheck(url, true),
    new CacheFirst({
      cacheName: 'MYNT-CACHE-IMAGES',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30, // cache for one month
          maxEntries: 50,
          purgeOnQuotaError: true
        })
      ]
    })
  );

  // =============================OTHER RESOURCE==================================
  registerRoute(
    ({ url }) => domainCheck(url, false),
    new CacheFirst({
      cacheName: 'MYNT-CACHE-STATIC-RESOURCE',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30, // cache for one month
          maxEntries: 50,
          purgeOnQuotaError: true
        })
      ]
    })
  );
} catch (e) {
  console.log(e);
}
