const express = require('express');
const path = require('path');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { shellRenderer, configHash } = require('./renderer');

// Middlewares.
const middlewares = require('../middlewares');
const appLoginCookieHandler = require('../middlewares/appLoginCookieHandler');
const sessionCheck = require('../middlewares/sessionCheck');
const abtestCookieMiddlewares = require('../middlewares/abtestCookie');
const deviceBasedAbTestsMiddlewares = require('../middlewares/abtestCookie')
  .deviceBasedAbTests;
const cartFillerMiddleware = require('../middlewares/cartFiller');
const userDetailsMiddleware = require('../middlewares/userDetails');
const cartFreeShippingAB = require('../middlewares/cartFreeShippingAB');
const authToken = require('../middlewares/authToken');
const cookieKeys = require('../../utils/constants').cookieKeys;
const mcookies = require('@myntra/myx/lib/server/cookies');
const abtestMap = require('../../utils/abtestManager').abtestMap;

// Route Handler.
const cart = require('./cart');
const address = require('./address');
const confirmation = require('./confirmation');
const payment = require('./payment');
const otp = require('./otp');
const assets = require('./assets');
const redirectMiddlewareAocV2 = require('../utils/helpers')
  .redirectMiddlewareAocV2;

/**
 * Middlewares Definitions and Categorisations.
 */

const setRespHeader = (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate'
  );
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');
  next();
};

const initRequiredAbtests = function(req, res, next) {
  if (!req.requiredAbKeys) {
    req.requiredAbKeys = [];
  }

  req.requiredAbKeys = (Object.values(abtestMap) || [])
    .filter(value => !value.config.isAppOnly)
    .map(value => value.key);
  next();
};

const handleOrderConfirmedState = (req, res, next) => {
  const cookies = mcookies(req, res);
  const isOrderConfirmed = cookies.get(cookieKeys.ORDER_CONFIRMED) === '1';
  const cartContext = (req.query && req.query.cartContext) || '';
  const mode = req.query && req.query.mode;

  if (
    isOrderConfirmed &&
    cartContext.toLowerCase() !== 'egiftcard' &&
    mode !== 'retry'
  ) {
    res.redirect('/');
  } else {
    next();
  }
};

const uiMiddlewares = middlewares('UI');
const tokenMiddlewares = [authToken, appLoginCookieHandler];

const deviceMiddlewares = [
  require('@myntra/myx/lib/server/ware/servejs'),
  require('@myntra/myx/lib/server/ware/apps'),
  require('@myntra/myx/lib/server/ware/device'),
  require('@myntra/myx/lib/server/ware/cookies/deviceId')
];

const abtestMiddlewares = [
  initRequiredAbtests,
  abtestCookieMiddlewares,
  cartFillerMiddleware,
  cartFreeShippingAB
];
const cartShellMiddlewares = [
  setRespHeader,
  shellRenderer.bind(this, 'SHOPPING BAG')
];
const addressShellMiddlewares = [
  setRespHeader,
  sessionCheck,
  shellRenderer.bind(this, 'ADDRESS')
];

const confirmationShellMiddlewares = [
  setRespHeader,
  shellRenderer.bind(this, 'CONFIRMATION')
];

const paymentShellMiddllewares = [
  setRespHeader,
  sessionCheck,
  shellRenderer.bind(this, 'PAYMENT')
];

const bnplOtpShellMiddlewares = [
  setRespHeader,
  sessionCheck,
  shellRenderer.bind(this, 'OTP')
];

/**
 * Routes Definitions:
 * 1. Health check
 * 2. Cart SubComponents
 * 3. Cart
 * 4. Proxy
 */
router.get('/checkout/healthcheck', function(req, res) {
  res.send('ok');
});

router.get(
  '/checkoutproxy/check',
  [
    require('@myntra/myx/lib/server/ware/xma'),
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares
  ],
  async function(req, res) {
    const hashCode = await configHash(req);
    res.send({ code: hashCode });
  }
);

router.get(
  [
    '/checkout/cart/coupons',
    '/checkout/cart/giftwrap',
    '/checkout/cart/sellers',
    '/checkout/cart/address/add'
  ],
  function(req, res) {
    res.redirect('/checkout/cart');
  }
);

router.get(['/checkout/address/add', '/checkout/address/edit'], function(
  req,
  res
) {
  res.redirect('/checkout/address');
});

router.get('/checkout/payment/bnpl/tnc', function(req, res) {
  res.redirect('/checkout/payment');
});

router.use(
  '/checkout/cart',
  [
    require('@myntra/myx/lib/server/ware/xma'),
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares,
    ...cartShellMiddlewares
  ],
  cart
);

router.use(
  '/checkout/sharedCart',
  [
    require('@myntra/myx/lib/server/ware/xma'),
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares,
    ...cartShellMiddlewares
  ],
  cart
);

router.use(
  '/checkout/address',
  [
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares,
    redirectMiddlewareAocV2,
    ...addressShellMiddlewares
  ],
  address
);

router.use(
  '/checkout/confirm',
  [
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares,
    deviceBasedAbTestsMiddlewares,
    ...confirmationShellMiddlewares
  ],
  confirmation
);

router.use(
  '/checkout/payment',
  [
    handleOrderConfirmedState,
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares,
    ...paymentShellMiddllewares
  ],
  payment
);

router.use(
  '/checkout/otp',
  [
    handleOrderConfirmedState,
    ...tokenMiddlewares,
    ...deviceMiddlewares,
    userDetailsMiddleware,
    ...abtestMiddlewares,
    ...uiMiddlewares,
    ...bnplOtpShellMiddlewares
  ],
  otp
);

router.use('/checkoutproxy', require('./proxy'));
router.use('/checkout/assets', assets);
router.use(
  '/checkout',
  express.static(path.join(__dirname, '../../../public'))
);
router.use('/checkout/*', function(req, res) {
  res.redirect('/checkout/cart');
});

// Proxy for dev environment
if (process.env.NODE_ENV === 'development') {
  router.use(
    '/devknuth',
    createProxyMiddleware({
      target: 'http://knuth.stage.myntra.com',
      changeOrigin: true,
      pathRewrite: { '^/devknuth': '' },
      logLevel: 'info',
      logProvider: () => global.console
    })
  );

  router.use(
    '/devpps',
    createProxyMiddleware({
      target: 'http://pps.stage.myntra.com/',
      changeOrigin: true,
      pathRewrite: { '^/devpps': '' },
      logLevel: 'info',
      logProvider: () => global.console
    })
  );

  router.use(
    '/devplutus',
    createProxyMiddleware({
      target: 'http://plutus.stage.myntra.com/',
      changeOrigin: true,
      pathRewrite: { '^/devplutus': '' },
      logLevel: 'info',
      logProvider: () => global.console
    })
  );

  router.use(
    '/devpayments',
    createProxyMiddleware({
      target: 'http://payments.stage.myntra.com/',
      changeOrigin: true,
      pathRewrite: { '^/devpayments': '' },
      logLevel: 'info',
      logProvider: () => global.console
    })
  );
}

module.exports = router;
