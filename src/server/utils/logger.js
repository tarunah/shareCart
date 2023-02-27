const { getUidxFromAt, getNidxFromAt } = require('./helpers');
const get = require('lodash/get');
module.exports = {
  logError: (req, message = '', options = {}, trace = '') => {
    if (typeof req === 'string') {
      trace = options;
      options = message;
      message = req;
    }
    if (message) {
      const at = get(req, 'myx.tokens.at', null);
      const errObj = {
        page: options.context || '',
        date: `${new Date()}`,
        message,
        trace: `${JSON.stringify(trace)}`
      };
      if (at) {
        errObj.userInfo = {
          uidx: getUidxFromAt(at),
          nidx: getNidxFromAt(at)
        };
      }
      console.error(`${JSON.stringify(errObj)},`);
    }
  },
  logInfo: (message = '', options = {}, trace = '') => {
    if (message) {
      const infoObj = {
        page: options.context || '',
        date: `${new Date()}`,
        message,
        trace: `${JSON.stringify(trace)}`
      };
      console.log(`${JSON.stringify(infoObj)},`);
    }
  },
  logWarning: (message = '', options = {}) => {
    if (message) {
      const warningObj = {
        page: options.context || '',
        date: `${new Date()}`,
        message
      };
      console.warning(`${JSON.stringify(warningObj)},`);
    }
  }
};
