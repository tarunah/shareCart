/*
* Circuit Breaker index file.
* For adding new CB:
* 1. Add CB name in CIRCUIT_BREAKER_NAMES in constants file.
* 2. Make an entry in circuitBreakerServicesConfig or circuitBreakerPagesConfig with breakerConfig and
    getRequestConfig/getClientConfig/getPageData (whichever is applicable) in the respective files.
*/

/* Creating node-circuitbreaker library instance */
const nodeCircuitBreaker = require('./nodeCircuitBreaker');

/* Creating all circuit breakers for services and pages */
require('./services');
require('./pages');

/* Exports node-circuitbreaker library instance
 * This instance will have all the breakers instances and utilities for hystrix and switch cron
 */
module.exports = nodeCircuitBreaker;
