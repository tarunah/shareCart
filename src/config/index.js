const { isFeatureEnabled } = require('../utils/FeaturesManager');
let ENVIRONMENT = process.env.NODE_ENV;
const isBrowser = typeof window !== 'undefined';
let config;

function injectDockinsRoot(conf) {
  try {
    conf.ROOT = isBrowser
      ? `${window.location.origin}/`
      : 'https://' +
        process.env.CLUSTER_NAME +
        process.env.BROWSEHAPROXY +
        process.env.UI_SUFFIX +
        '/';
  } catch (e) {
    console.error(e);
  }
}

function init() {
  try {
    ENVIRONMENT = ENVIRONMENT === 'release' ? 'dockins' : ENVIRONMENT;

    // For k8sprod or k8ssandbox, read config from env variable path
    if (process.env.CONFIG_PATH) {
      config = require(process.env.CONFIG_PATH);

      if (ENVIRONMENT === 'dockins') {
        injectDockinsRoot(config);
      }
    } else {
      config = require('./config.production.json');

      // Work around fix for dockins
      if (isBrowser) {
        const qaEnvs = ['dockins', 'mjint', 'sfqa', 'scmqa'];
        let isQaEnv = false;
        qaEnvs.forEach(function(qaEnv) {
          if (window.location.href.indexOf(`${qaEnv}.myntra.com`) !== -1) {
            isQaEnv = true;
          }
        });
        ENVIRONMENT = isQaEnv ? 'dockins' : ENVIRONMENT;
      }

      if (isBrowser) {
        if (window.location.href.indexOf('stage.myntra.com') !== -1) {
          ENVIRONMENT = 'stage';
        }
      } else {
        ENVIRONMENT =
          process.env.CLUSTER_NAME === 'stage' ? 'stage' : ENVIRONMENT;
      }

      const environment = require(`./config.${ENVIRONMENT}.json`) || {};
      config = {
        ...config,
        ...environment
      };

      if (ENVIRONMENT === 'dockins') {
        injectDockinsRoot(config);
      }
    }
  } catch (err) {
    // console.log(ENVIRONMENT, ' environment not found. Picking up default Environment');
  }
}

init();

const regEx = isBrowser && new RegExp(window.location.hostname);
function getClientRoot(routeConfig, config) {
  if (isBrowser) {
    if (isFeatureEnabled('SINGLE_SERVER') && routeConfig.ssRoot) {
      return routeConfig.ssRoot;
    }

    if (ENVIRONMENT === 'development') {
      const root = routeConfig.clientRoot || 'devknuth';
      return `${window.location.origin}/${root}/`;
    }

    if (
      isFeatureEnabled('SAME_ORIGIN_GATEWAY') &&
      routeConfig.clientRootV2 &&
      regEx.test(config.ROOT)
    ) {
      return `${config.ROOT}gateway/`;
    }
  }

  return routeConfig.clientRoot || config.API_CLIENT_ROOT;
}

module.exports = function(route) {
  const routeConfig = (route && config[route]) || {};
  const root = routeConfig.root || config.API_ROOT;
  const path = routeConfig.path || '';
  const clientRoot = getClientRoot(routeConfig, config);

  return {
    ...routeConfig,
    root,
    path,
    clientRoot: clientRoot,
    url: root + path,
    clientUrl: clientRoot + path
  };
};
