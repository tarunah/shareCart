const mcookies = require('@myntra/myx/lib/server/cookies');
const getAbtest = require('../../utils/abtestManager').getAbtest;
const cookieKeys = require('../../utils/constants').cookieKeys;

module.exports = function(req, res, next) {
  const cookies = mcookies(req, res);
  const cartFillerCookie = cookies.get(cookieKeys.CART_FILLER);

  // Case when cookie is not set.
  if (!cartFillerCookie) {
    const cartFillerVisibleAB = getAbtest('CART_FILLER');
    cookies.set(cookieKeys.CART_FILLER, cartFillerVisibleAB, {
      expires: new Date(Date.now() + 30 * 60 * 1000),
      httpOnly: true
    });
  } else {
    req._cf = cartFillerCookie;
  }
  next();
};
