/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['checkoutui'],
  /**
   * Your New Relic license key.
   */
  license_key: '43886765fd0a8f931b525d61f3b616e25630NRAL',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  },
  allow_all_headers: true,
  application_logging: {
    forwarding: {
      /**
       * Toggles whether the agent gathers log records for sending to New Relic.
       */
      enabled: true
    }
  },
  rules: {
    ignore: ['/checkout/healthcheck']
  },
  distributed_tracing: {
    enabled: true
  },
  apdex_t: 0.3
};
