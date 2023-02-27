import RequestManager from 'commonUtils/RequestManager';
import { getConfig } from 'commonUtils/requestConfig';
import { cookieKeys } from 'commonUtils/constants';
const config = require('../../config');

const clientId = 'myntra-02d7dec5-8a00-4c74-9cf7-9d62dbea5e61';
import { getCookie } from 'commonBrowserUtils/Helper';

const defaultErrorCallback = () =>
  SHELL.redirectTo(`/login?force=true&referer=${window.location.href}`);

const handleRequest = (
  method,
  path,
  data,
  headers,
  successCallback,
  errorCallback
) => {
  const { clientUrl } = config('token');
  RequestManager.handle(
    {
      method,
      url: `${clientUrl}${path}`,
      data,
      headers: { ...getConfig().headers, ...headers }
    },
    successCallback,
    errorCallback || defaultErrorCallback
  );
};

const TokenManager = (function() {
  return {
    refreshToken: (successCallback, errorCallback) => {
      const headers = {
        clientid: clientId,
        at: getCookie(cookieKeys.AT),
        rt: getCookie(cookieKeys.RT)
      };
      handleRequest(
        'get',
        'refresh',
        null,
        headers,
        successCallback,
        errorCallback
      );
    }
  };
})();

export default TokenManager;
