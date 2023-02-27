import get from 'lodash/get';
import { getAbtest } from 'commonUtils/abtestManager';
import { getUidx, getUserHashId } from 'commonBrowserUtils/Helper';
import { getMynacoConfirmationScreenLoadData } from 'commonBrowserUtils/ConfirmationHelper';

/*
 * Helper functions for the file.
 */
export const getProducts = data => {
  return get(data, 'bountyOrder.items', []).reduce(
    (acc, item) =>
      acc.concat({
        sku: `${item.styleId}_${item.skuId}`,
        price: get(item, 'payments.amount', 0) / 100,
        quantity: item.quantity
      }),
    []
  );
};

const getSizeAndFitVendorFromUri = () => {
  const uri = new URL(window.location.href);
  return uri.searchParams.get('3p-vendor');
};

export const getSizeAndFitVendor = () => {
  const sizeAndFitVendor =
    getAbtest('SIZE_FIT', null, { mxabd: true }) ||
    getSizeAndFitVendorFromUri() ||
    'MFA';

  return sizeAndFitVendor.toLowerCase();
};

/*
 * Tracker functions for different vendors.
 * These add script tags to the DOM and load the respective libraries.
 */
const trackTrueFitConversion = () => {
  // This method is taken directly from v1 source code.
  (function() {
    let a = {};
    function g(l) {
      a[l] = function(r, e, o) {
        let w = window,
          d = document,
          p = [],
          t,
          s,
          x;
        w.tfcapi = t =
          w.tfcapi ||
          function() {
            t.q = t.q || [];
            t.q.push(arguments);
          };
        o && o.autoCalculate === false && p.push('autoCalculate=false');
        x = d.getElementsByTagName('script')[0];
        s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src =
          'https://' +
          r +
          '-cdn' +
          (e === 'dev' || e === 'staging' ? '.' + e : '') +
          '.truefitcorp.com/fitrec/' +
          r +
          '/js/' +
          l +
          '.js?' +
          p.join('&');
        x.parentNode.insertBefore(s, x);
      };
    }
    g('fitrec');
    g('tracker');
    return a;
  })().fitrec('myn', 'prod');
};

const trackPixiboConversion = data => {
  window.pxb_track = {
    clientId: '1jyjcjext4hgh',
    type: 'conversion',
    products: getProducts(data),
    transaction: `${get(data, 'bountyOrder.storeOrderId')}`,
    amount: `${get(data, 'bountyOrder.payments.amount', 0) / 100}`,
    currency: 'INR'
  };

  // This method is taken directly from v1 source code.
  (function() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src =
      ('https:' == document.location.protocol ? 'https://' : 'http://') +
      'cdn.pixibo.com/tracking/pixibo.track.v1.js?clientId=' +
      pxb_track.clientId;
    let x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  })();
};

const trackFitAnalyticsConversion = () => {
  // Taken directly from v1 source code.
  const s1 = document.createElement('script');
  s1.setAttribute(
    'src',
    'https://integrations.fitanalytics.com/shop/myntra/orderconfirmation.js'
  );
  document.head.appendChild(s1);
};

// Exported function
export default data => {
  window.analyticsLayer = getMynacoConfirmationScreenLoadData(data);
  window.Myntra = window.Myntra || {
    Data: {
      socialAction: 'purchase',
      pageName: 'confirmation',
      cookieprefix: get(window, '_checkout_.__myx_env__.cookie.prefix'),
      userHashId: getUserHashId()
    }
  };
  window.sizeAndFit = {
    vendor: getSizeAndFitVendor(),
    userId: getUidx(),
    orderId: get(data, 'bountyOrder.storeOrderId')
  };

  const sizeAndFitTrackerMap = {
    truefit: trackTrueFitConversion,
    pixibo: trackPixiboConversion,
    fitanalytics: trackFitAnalyticsConversion,
    mfa: () => {
      console.info('Conversion using MFA');
    }
  };

  const vendorTracker = sizeAndFitTrackerMap[window.sizeAndFit.vendor];
  if (typeof vendorTracker === 'function' && window.dataLayer) {
    vendorTracker(data);
  }
};
