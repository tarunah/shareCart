const authToken = require('@myntra/myx/lib/server/ware/authTokenv1');
const tokenUrl = require('./../../config')('token').url;

if (authToken.updateConfig && typeof authToken.updateConfig === 'function') {
  authToken.updateConfig({
    services: {
      getToken: `${tokenUrl}token`,
      refreshToken: `${tokenUrl}refresh`
    }
  });
}

module.exports = authToken;
