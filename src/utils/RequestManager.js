import get from 'lodash/get';
const smartagent = require('@myntra/m-agent');
import browserStatsdMiddleware from 'commonBrowserUtils/browserStatsdMiddleware';
import config from '../config';
const tokenUrl = config('token').clientUrl;

const agent = smartagent({
  services: {
    getToken: `${tokenUrl}token`,
    refreshToken: `${tokenUrl}refresh`
  }
});

const RequestManager = (function() {
  const responseHandler = (err, res, successCallback, errorCallback) => {
    if (smartagent.smartError(err, res)) {
      if (res && !res.body && res.text && res.status === 200) {
        successHandler(successCallback, res);
        return;
      }
      errorHandler(errorCallback, err, res);
    } else {
      successHandler(successCallback, res);
    }
  };

  const errorHandler = (errorCallback, err, response) => {
    const errStatus = get(err, 'status', 500);
    if (errStatus === 401 || errStatus === 403) {
      SHELL.redirectTo(`/login?referer=${window.location.href}`);
      return;
    }
    let message =
      get(response, 'body.message') ||
      'Oops! Something went wrong. Please try again in some time.';

    errorCallback &&
      errorCallback({
        status: errStatus,
        message,
        error: get(response, 'body')
      });
  };

  const successHandler = (successCallback, res) => {
    successCallback && successCallback(res.body || res.text || res);
  };

  return {
    handle: (config, successCallback, errorCallback) => {
      agent[config.method](config.url)
        .forceUpdate(config.forceUpdate)
        .withCredentials()
        .send(config.data)
        .set(config.headers || {})
        .use(browserStatsdMiddleware)
        .end((err, res) => {
          return responseHandler(err, res, successCallback, errorCallback);
        });
    },
    handleRequestWithPromise: config => {
      return new Promise((resolve, reject) => {
        agent[config.method](config.url)
          .forceUpdate(config.forceUpdate)
          .withCredentials()
          .send(config.data)
          .set(config.headers || {})
          .use(browserStatsdMiddleware)
          .end((err, res) => {
            return responseHandler(err, res, resolve, reject);
          });
      });
    }
  };
})();

export default RequestManager;
