const StatsD = require('node-statsd');
const getStatsdMiddleware = require('../../utils/statsd');
const config = require('../../config')('statsD');

client = new StatsD({ host: config.root, port: config.port });

module.exports = getStatsdMiddleware(client);
