const newrelic = require('newrelic');
const get = require('lodash/get');
const transactionNames = {
  '/checkout/cart': 'Cart Page',
  '/checkout/cart/coupons': 'Coupons to Cart',
  '/checkout/cart/giftwrap': 'Giftwrap to Cart',
  '/checkout/cart/sellers': 'Sellers to Cart',
  '/checkout/cart/address/add': 'Address Add Form to Cart',
  '/checkout/address': 'Address Page',
  '/checkout/address/list': 'Address List to Address',
  '/checkout/address/add': 'Address Add Form to Address',
  '/checkout/address/edit': 'Address Edit Form to Address',
  '/checkout/payment': 'Payment Page',
  '/checkout/payment/bnpl/tnc': 'BNPL TNC Page',
  '/checkout/confirm': 'Confirmation Page',
  '/checkout/otp': 'OTP Page',
  '/checkout/payment/otp': 'Payment OTP Page',
  '/checkout/payment/bnpl/otp': 'BNPL OTP Page',
  '/checkoutproxy/cartData': 'Cart Data',
  '/checkoutproxy/confirmationData': 'Confirmation Data',
  '/checkoutproxy/data': 'Client StatsD',
  '/checkoutproxy/check': 'Switch Hash Check',
  '/checkout/assets/all': 'Assets Call',
  '/checkout/healthcheck': 'Health Check',
  '/hystrix.stream': 'Hystrix Stream'
};

module.exports = function(req, res, next) {
  try {
    const transName =
      transactionNames[get(req, '_parsedUrl.pathname', '')] ||
      get(req, '_parsedUrl.pathname', '');
    if (transName) {
      newrelic.setTransactionName(transName);
    }
  } catch (e) {}
  next();
};
