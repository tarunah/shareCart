module.exports = function(req, res, next) {
  if (process.env.DISABLE_MORPHEUS) {
    const cookies = require('@myntra/myx/lib/server/cookies')(req, res);
    const cookieKeys = require('../../utils/constants').cookieKeys;

    req.myx._mxab_ = {};
    req.myx._mxabd_ = {};

    const mxabCookie = cookies.get(cookieKeys.MXAB);

    // Case when cookie is not set.
    if (!mxabCookie) {
      cookies.set(
        cookieKeys.MXAB,
        {},
        {
          expires: new Date(Date.now() + 30 * 60 * 1000)
        }
      );
      cookies.set(
        cookieKeys.MXABD,
        {},
        {
          expires: new Date(Date.now() + 30 * 60 * 1000)
        }
      );
    }
    return next();
  } else {
    const abtest = require('@myntra/myx/lib/server/ware/cookies/abtests');
    abtest(req, res, next);
  }
};

module.exports.deviceBasedAbTests = function(req, res, next) {
  if (process.env.DISABLE_MORPHEUS) {
    const cookies = require('@myntra/myx/lib/server/cookies')(req, res);
    const cookieKeys = require('../../utils/constants').cookieKeys;

    req.myx._mxabd_ = {};

    const mxabdCookie = cookies.get(cookieKeys.MXABD);

    // Case when cookie is not set.
    if (!mxabdCookie) {
      cookies.set(
        cookieKeys.MXABD,
        {},
        {
          expires: new Date(Date.now() + 30 * 60 * 1000)
        }
      );
    }
    return next();
  } else {
    const abtest = require('@myntra/myx/lib/server/ware/cookies/deviceBasedAbTests');
    abtest(req, res, next);
  }
};
