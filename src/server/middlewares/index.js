const when = require('@myntra/myx/lib/when');
const async = require('async');
const mcookies = require('@myntra/myx/lib/server/cookies');
const env = require('myx-config');

const switchMiddleware = require('switch-express').default;
const appVersionBasedConfigHandler = require('./appVersionBasedConfigHandler');

const kvpairsMap = require('../../utils/KVPairManager').KVPairsMap;
const featuresMap = require('../../utils/FeaturesManager').FeaturesMap;
const growthHackConfigMap = require('../../utils/GrowthHackConfigManager')
  .GrowthHackConfigMap;
const bannerConfigMap = require('../../utils/BannerConfigManager')
  .BannerConfigMap;
const switchConfigUrl = require('./../../config')('switchConfig').url;

const getDefaultSwitchConfig = map =>
  Object.values(map).reduce((defaultConfig, config) => {
    config.key && (defaultConfig[config.key] = config.defaultValue);
    return defaultConfig;
  }, {});

const getSwitchConfig = ({ req, res, namespace, map }) => ({
  namespace,
  options: {
    username: 'checkout',
    password: 'checkout@123',
    URL: switchConfigUrl // pass updateFrequency in ms
  },
  list: (Object.values(map).map(val => val.key) || []).filter(key => key),
  tenantId: 'myntra',
  variants: [
    req.myx.apps.isPhonePeWebview
      ? 'phonePeStore'
      : mcookies(req, res).get('_pv') || 'regular'
  ],
  defaultConfig: getDefaultSwitchConfig(map)
});

const initKVPairList = function(req, res, next) {
  if (!req.switch) {
    req.switch = {};
  }

  req.switch = {
    ...req.switch,
    kvpairs: getSwitchConfig({
      req,
      res,
      namespace: 'portal-kvpairs',
      map: kvpairsMap
    })
  };
  next();
};

const initFeatureGatesList = function(req, res, next) {
  if (!req.switch) {
    req.switch = {};
  }

  req.switch = {
    ...req.switch,
    features: getSwitchConfig({
      req,
      res,
      namespace: 'portal-features',
      map: featuresMap
    })
  };
  next();
};

const initGrowthHackConfigList = function(req, res, next) {
  if (!req.switch) {
    req.switch = {};
  }

  req.switch = {
    ...req.switch,
    growthhack: getSwitchConfig({
      req,
      res,
      namespace: 'growth-hack',
      map: growthHackConfigMap
    })
  };
  next();
};

const initBannerConfigList = function(req, res, next) {
  if (!req.switch) {
    req.switch = {};
  }

  req.switch = {
    ...req.switch,
    bannerconfig: getSwitchConfig({
      req,
      res,
      namespace: 'portal-banner',
      map: bannerConfigMap
    })
  };
  next();
};

const initEnv = function(req, res, next) {
  req.myx.env = env.sanitized();
  next();
};

const uiMiddlewares = [
  'cookies/switch',
  initKVPairList,
  initFeatureGatesList,
  initGrowthHackConfigList,
  initBannerConfigList,
  initEnv,
  switchMiddleware,
  appVersionBasedConfigHandler,
  'cookies/pumpKeys',
  'sessionPump',
  'cookies/utmv1',
  'cookies/uuid'
];

const apiMiddlewares = [];

module.exports = function(type, chain) {
  chain =
    chain || type === 'API'
      ? apiMiddlewares
      : (type === 'UI' && uiMiddlewares) || [];
  return chain
    .map(function(w) {
      return typeof w === 'function'
        ? w
        : require('@myntra/myx/lib/server/ware/' + w);
    })
    .concat(function(req, res, next) {
      const w = when(req);
      async.parallel([w.all], function() {
        next();
      });
    });
};
