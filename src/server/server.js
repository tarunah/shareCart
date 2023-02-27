global.__non_webpack_require__ = require;
const express = require('express');
const path = require('path');

const nodeCircuitBreaker = require('./circuitBreakers');
const setupCircuitBreakerSwitchUpdate = require('./utils/circuitBreakerSwitch');
const routes = require('./routes');

const app = express();
if (process.env.NEW_RELIC_ENABLE_CHECKOUT_NEW) {
  app.locals.newrelic = require('newrelic');
  app.use(require('./middlewares/setNewrelicTransName'));
}

require('./utils/devSetup')(app);

app.use('/hystrix.stream', nodeCircuitBreaker.getHystrixHandle());
app.use(require('cookie-parser')());
app.use(require('compression')());
app.use(
  '/v2checkout/assets',
  express.static(path.join(__dirname, '../../public'))
);

app.use(routes);

setupCircuitBreakerSwitchUpdate(nodeCircuitBreaker);

const nodePort = process.env.NODE_PORT || 8500;

let server = app.listen(nodePort, () => {
  console.info('Server started at ', nodePort);
});

server.on('error', function(err) {
  console.error(
    'Server start failed: %s port: %s, env: %s, version: %s',
    err,
    nodePort,
    app.get('env'),
    process.version
  );
  process.exit(1);
});

process.on('uncaughtException', function(err) {
  console.error('[ERROR] Caught exception: ', err);
});

process.on('SIGTERM', function() {
  console.error(
    'Process termination request received. Stoping taking new requests.'
  );
  server.close(function(err) {
    console.log('Finished all pending requests. Terminating now.');
    process.exit(0);
  });
});
