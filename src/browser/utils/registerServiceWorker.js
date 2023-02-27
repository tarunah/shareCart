import { Workbox } from 'workbox-window';
import get from 'lodash/get';

const clearCache = otherCache => {
  // pass true to delete other cache apart from checkout
  const myntRegex = new RegExp('MYNT-CACHE');
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      const isWBKeys = myntRegex.test(cacheName);
      if (isWBKeys && !otherCache) {
        caches.delete(cacheName);
      } else if (!isWBKeys && otherCache) {
        caches.delete(cacheName);
      }
    });
  });
};

export default async function registerServiceWorker() {
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if (process.env.NODE_ENV === 'production' || !!process.env.ENABLE_SW) {
    if ('serviceWorker' in navigator) {
      try {
        if (get(window, '_checkout_.__sw_enabled__') === 'true') {
          const wbSW = new Workbox('/checkout/wb.js');
          wbSW
            .register()
            .then(event => {
              clearCache(true);
              console.log('<=============serviceworker registered===========>');
            })
            .catch(e => {
              console.log(
                '<=============serviceworker failed to register===========>'
              );
              console.log(e);
            });

          wbSW.addEventListener('message', event => {
            if (event.data.reload) {
              (async function() {
                await caches.delete('MYNT-CACHE-PAGES');
                window.location.reload();
              })();
            }
          });
        } else {
          navigator.serviceWorker
            .getRegistrations()
            .then(function(registrations) {
              for (let registration of registrations) {
                registration.unregister().then(flag => {
                  console.log(
                    `<=============serviceworker${
                      flag ? ' ' : ' failed to '
                    }unregistered===========>`
                  );
                });
              }
            })
            .catch(function(err) {
              console.log('Service Worker unregistration failed: ', err);
            });

          clearCache(false);
        }
      } catch (err) {
        console.log('Service Worker registration failed: ', err);
      }
    }
  }
}
