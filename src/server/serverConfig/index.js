let ENV = process.env.NODE_ENV;
const config = require('../../config');

const SERVER_SECRETS = {
  pps: {
    key: 's6jhwg2nf'
  }
};

let serverSecrets = SERVER_SECRETS;

function init() {
  try {
    ENV = ENV === 'release' ? 'dockins' : ENV;
    const environment = require(`./${ENV}`).SERVER_SECRETS;
    serverSecrets = environment || serverSecrets;
  } catch (err) {
    // console.log(ENV, ' environment not found. Picking up default Environment');
  }
}
init();

module.exports = function(route) {
  const routeConfig = config(route);
  const secretConfig = serverSecrets[route];
  return secretConfig ? { ...routeConfig, ...secretConfig } : routeConfig;
};
