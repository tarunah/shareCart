const url = require('url');
const get = require('lodash/get');
const serialize = require('serialize-javascript');
const crypto = require('crypto');

const mcookies = require('@myntra/myx/lib/server/cookies');
const resourceResolver = require('../utils/resourceResolver');
const resourceConfig = require('../../utils/resourceConfig');
const isFeatureEnabled = require('../../utils/FeaturesManager')
  .isFeatureEnabled;

// Add mapping here to override pageTitle for sub routes.
const urlTitleMapping = {
  '/checkout/cart': 'SHOPPING BAG',
  '/checkout/address': 'ADDRESS',
  '/checkout/confirm': 'CONFIRMATION',
  '/checkout/payment': 'PAYMENT',
  '/checkout/payment/otp': 'OTP'
};

const getEnvDetails = req => {
  const envDetails = (({ cookie, hosts }) => ({ cookie, hosts }))(
    req.myx.env || {}
  );
  return envDetails;
};

const getStaticConfig = req => {
  const {
    isApp,
    android: isAndroid,
    ios: isIOS,
    isPhonePeWebview
  } = req.myx.apps;
  req.myx.deviceData = req.myx.deviceData || {};
  req.myx.deviceData.isApp = isApp;
  req.myx.deviceData.isAndroid = isAndroid;
  req.myx.deviceData.isIOS = isIOS;
  req.myx.deviceData.isPhonePeWebview = isPhonePeWebview;
  req.myx._mxabd_ = req.myx._mxabd_ || {};

  return `<script>window._checkout_=window._checkout_ || {};
    window._checkout_.__myx_kvpairs__=${serialize(req.myx.kvpairs)};
    window._checkout_.__myx_ab__=${serialize(req.myx._mxab_)};
    window._checkout_.__myx_abd__=${serialize(req.myx._mxabd_)};
    window._checkout_.__myx_growthhack__=${serialize(req.myx.growthhack)};
    window._checkout_.__myx_bannerconfig__=${serialize(req.myx.bannerconfig)};
    window._checkout_.__myx_env__= window.__myx_env__ = ${serialize(
      getEnvDetails(req)
    )};
    window._checkout_.__myx_profile__=${serialize(req.myx.profile)};
    window.__myx_session__=${serialize(req.myx.profile)};
    window._checkout_.__myx_appVersionBasedConfig__=${serialize(
      req.appVersionBasedConfig
    )};
    window._checkout_.__myx_traffic__=${serialize(req.myx.traffic)};
    window.__myx_traffic__=${serialize(req.myx.traffic)};
    window._checkout_.__myx_deviceData__=${serialize(req.myx.deviceData)};
    window._checkout_.__myx_features__=${serialize(
      req.myx.features
    )};</script>`;
};

const shellRenderer = (pageTitle, req, res, next) => {
  const resConfig = resourceResolver.getResourceConfig(req);
  const shell = require(`../../../dist/${resConfig.shell}`);
  const pathName = url.parse(req.originalUrl).pathname;
  mcookies(req, res).flush();

  let dataToSend = shell({
    data: {
      deviceId: req.myx.deviceId,
      uidx: get(req, 'myx.session.uidx') || 'UIDX_NA',
      appsflyerId: req.myx.appsflyerId,
      pageTitle: urlTitleMapping[pathName] || pageTitle,
      cssBundles: resConfig.cssBundles,
      legacyPolyfill: resConfig.legacyPolyfill || '',
      jsBundles: resConfig.jsBundles,
      type: resConfig.type,
      fonts: resourceConfig.fonts,
      sprites: resourceConfig.sprites,
      firebaseEnable: req.myx.kvpairs['firebaseEnable'] || '',
      swEnabled: isFeatureEnabled('CHECKOUT_SERVICE_WORKER', null, req),
      newrelicEnabled: isFeatureEnabled('NEW_RELIC_BROWSER_ENABLE', null, req),
      namogoIntegrationEnabled: isFeatureEnabled(
        'NAMOGOO_INTEGRATION',
        false,
        req
      )
    }
  });

  dataToSend += getStaticConfig(req);

  res.write(dataToSend);
  next();
};

const writePageData = ({ req, res, data }) => {
  res.write(`<script>window._checkout_.__myx_data__=${data};</script>`);
  res.end(`</body></html>`);
};

const configHash = function(req) {
  const configData = getStaticConfig(req);
  return new Promise(resolve => {
    resolve(
      crypto
        .createHash('sha256')
        .update(configData)
        .digest('hex')
    );
  });
};

module.exports = {
  shellRenderer,
  writePageData,
  configHash
};
