const getXMyntraABTestHeader = require('../utils/abtestManager')
  .getXMyntraABTestHeader;

const getConfig = req => {
  const abHeader = getXMyntraABTestHeader(req);
  const config = {
    headers: {}
  };
  if (abHeader) {
    config.headers['x-myntra-abtest'] = abHeader;
  }
  return config;
};

module.exports = {
  getConfig
};
