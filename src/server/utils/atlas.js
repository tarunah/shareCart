const OS = require('os');
const URI = require('jsuri');
const get = require('lodash/get');

const mcookies = require('@myntra/myx/lib/server/cookies');
const config = require('../../config');
const isFeatureEnabled = require('../../utils/FeaturesManager')
  .isFeatureEnabled;
const cookieKeys = require('../../utils/constants').cookieKeys;
const Logger = require('./logger');
const logContext = {
  context: 'atlas'
};

const tokenUrl = config('token').url;
const agent = require('@myntra/m-agent')({
  timeout: 2000,
  services: {
    getToken: `${tokenUrl}token`,
    refreshToken: `${tokenUrl}refresh`
  }
});

const track = (req, data, callback, options = {}) => {
  if (!isFeatureEnabled('ATLAS_DISABLED', null, req)) {
    const refUri = new URI(req.headers.referer);
    const cookies = mcookies(req, {});

    const dataToSend = {
      ...data,
      nodejs: true,
      myx: true,
      timestamp: Date.now(),
      trafficData: req.myx.traffic,
      deviceData: req.myx.deviceData,
      isRobot: get(req, 'myx.deviceData.isRobot'),
      userAgent: req.headers['user-agent'],
      clientIP: req.ip,
      serverName: OS.hostname(),
      'x-myntra-app':
        req.headers['x-myntra-app'] ||
        cookies.get(cookieKeys.X_MYNTRA_APP) ||
        '',
      referer: {
        host: refUri.host(),
        domain: refUri.host().replace('www.', ''),
        path: refUri.path(),
        query: refUri.query().substr(0, 500),
        protocol: refUri.protocol()
      },
      hostURL: req.headers.host + req.originalUrl,
      login: get(req, 'myx.profile.uidx') || ''
    };

    if (options.log) {
      Logger.logInfo(`Atlas data: ${JSON.stringify(dataToSend)}`, logContext);
    }

    const atlasUrl = config('atlas').url;

    agent
      .post(atlasUrl)
      .send(dataToSend)
      .then(r => {
        if (r.error) {
          Logger.logError(`Atlas error: ${r.error}`, logContext);
        }
        callback && callback();
      })
      .catch(e => {
        Logger.logError(`Atlas error: ${e}`, logContext);
        callback && callback();
      });
  }
};

module.exports = {
  track
};
