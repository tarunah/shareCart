const getAbtest = require('../../utils/abtestManager').getAbtest;
const cookieKeys = require('../../utils/constants').cookieKeys;
const mcookies = require('@myntra/myx/lib/server/cookies');

module.exports = function(req, res, next) {
  const cartFreeShippingAB = getAbtest('FREE_SHIPPING', req);
  const cartFreeShipping = 'cart.fsexp=' + cartFreeShippingAB;
  req.__cab = cartFreeShipping;
  const cookies = mcookies(req, res);
  cookies.set(cookieKeys.FREE_SHIPPING, cartFreeShipping, {
    expires: 0,
    httpOnly: false
  });
  next();
};
