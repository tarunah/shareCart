const kvpairsMap = require('../../utils/KVPairManager').KVPairsMap;
const { CIRCUIT_BREAKER_SWITCH_KEY } = require('../circuitBreakers/constants');
const switchConfigUrl = require('./../../config')('switchConfig').url;

const cbConfig = Object.values(kvpairsMap).find(
  config => config.key === CIRCUIT_BREAKER_SWITCH_KEY
);
const defaultConfig = { [cbConfig.key]: cbConfig.defaultValue };

function setupCircuitBreakerSwitchUpdate(nodeCircuitBreaker) {
  nodeCircuitBreaker.setUpSwitchCron({
    switchKey: CIRCUIT_BREAKER_SWITCH_KEY,
    defaultConfig,
    options: {
      username: 'checkout',
      password: 'checkout@123',
      url: switchConfigUrl
    }
  });
}

module.exports = setupCircuitBreakerSwitchUpdate;
