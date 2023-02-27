const NodeCircuitBreaker = require('node-circuitbreaker');

if (
  NodeCircuitBreaker.setMAgentConfig &&
  typeof NodeCircuitBreaker.setMAgentConfig === 'function'
) {
  const tokenUrl = require('./../../config')('token').url;
  NodeCircuitBreaker.setMAgentConfig({
    services: {
      getToken: `${tokenUrl}token`,
      refreshToken: `${tokenUrl}refresh`
    },
    audience: ['myntra_internal'],
    spiffeID: 'spiffe://myntra.com/checkoutui'
  });
}

if (
  NodeCircuitBreaker.initAuthInAgent &&
  typeof NodeCircuitBreaker.initAuthInAgent === 'function'
) {
  NodeCircuitBreaker.initAuthInAgent();
}

const nodeCircuitBreaker = new NodeCircuitBreaker();

module.exports = nodeCircuitBreaker;
