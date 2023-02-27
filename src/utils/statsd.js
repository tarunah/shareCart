const get = require('lodash/get');
const { getKVPairValue } = require('../utils/KVPairManager');

const getPath = (url, method, statusCode) => {
  const { urlPathMap } = getKVPairValue('STATSD_CONFIG');
  const { path: urlPath } =
    urlPathMap.find(data => !url.indexOf(data.url)) || {};
  return urlPath
    ? `checkout.${urlPath}.${method}${statusCode ? '.' + statusCode : ''}`
    : '';
};

const getStatsdSuperAgentWrapper = client => {
  return agent => {
    agent.on('request', request => {
      const req = get(request, 'req', request);
      const startAt = new Date();
      req.on('response', res => {
        const endAt = new Date();
        const { statusCode } = res;
        const { method } = req;
        const { url } = agent;
        client.sendTiming({ url, method, statusCode, time: endAt - startAt });
        client.sendCount({ url, method, statusCode });
      });
    });
  };
};

const getStatsdWrapper = client => ({
  sendCount: ({ url, method, statusCode }) => {
    const path = getPath(url, method, statusCode);
    path && client.increment(path);
  },
  sendTiming: ({ url, method, statusCode, time }) => {
    const path = getPath(url, method, statusCode);
    path && client.timing(path, time);
  }
});

const getStatsdMiddleware = client => {
  const statsdWrapper = getStatsdWrapper(client);
  return getStatsdSuperAgentWrapper(statsdWrapper);
};

module.exports = getStatsdMiddleware;
