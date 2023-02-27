const ua = require('@myntra/myx/lib/userAgents');
const get = require('lodash/get');
const assets = require('../../../webpack-assets.json');
const resourceConfig = require('../../utils/resourceConfig');

const resolveBundle = function(assetName, assetType) {
  return get(assets, `${assetName}.${assetType}`);
};

const getResourceConfig = function(req) {
  const userAgent = ua(req.headers['user-agent']);
  const assetName = userAgent.isMobile() ? 'mobile' : 'desktop';
  const isAndroidApp = userAgent.isAndroidApp();
  const isIOSApp = userAgent.isIOSApp();

  const resConfig = {
    cssBundles: [resolveBundle(assetName, 'css')],
    jsBundles: [resolveBundle(assetName, 'js'), resolveBundle('vendor', 'js')],
    shell: `${assetName}_shell`,
    legacyPolyfill: resolveBundle('legacyPolyfill', 'js') || '',
    type: isAndroidApp || isIOSApp ? 'app' : 'web'
  };

  return resConfig;
};

module.exports = {
  getResourceConfig: getResourceConfig,
  getAllAssets: req => {
    const resConfig = getResourceConfig(req);
    resConfig.otherJsBundles = [resolveBundle('analytics', 'js')];
    resConfig.otherCSSBundles = [];
    resConfig.staticResources = {};
    const { fonts = {}, sprites = {} } = resourceConfig;
    resConfig.staticResources.fonts = [
      fonts.assistant.woff,
      fonts.assistantBold.woff
    ];
    resConfig.staticResources.sprites = [sprites.common, sprites.payment];
    return resConfig;
  }
};
