const get = require('lodash/get');
const set = require('lodash/set');
const router = require('express').Router();
const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();

const middlewares = require('../middlewares');
const authToken = require('../middlewares/authToken');
const abtestCookieMiddlewares = require('../middlewares/abtestCookie');

const config = require('./../../config');
const Logger = require('../utils/logger');
const cookieKeys = require('../../utils/constants').cookieKeys;
const dgram = require('dgram');
const sanitize = require('../../utils/Sanitize');

const tokenUrl = config('token').url;
const agent = require('@myntra/m-agent')({
  services: {
    getToken: `${tokenUrl}token`,
    refreshToken: `${tokenUrl}refresh`
  }
});

const { root: STATSD_HOST, port: STATSD_PORT } = config('statsD');

const { cartPage, confirmationPage } = require('../circuitBreakers/pages');

const logContext = {
  context: 'proxy'
};

router.use('/data', [authToken, bodyParserJson], function(req, res) {
  const message = get(req, 'body.data', '');
  const separatedStats = message.split('--');
  separatedStats.length > 0 &&
    separatedStats.forEach(statsMessage => {
      if (statsMessage !== '') {
        const socket = dgram.createSocket('udp4');
        const buffer = Buffer.from(statsMessage);
        socket.send(buffer, 0, buffer.length, STATSD_PORT, STATSD_HOST, err => {
          socket.close();
        });
      }
    });
  return res.status(200).send({});
});

const defaultErrorResponse = {
  httpStatus: 500,
  message: 'Something went wrong. Please reload.',
  status: 'ERROR'
};

router.get(
  '/confirmationData',
  [
    authToken,
    require('@myntra/myx/lib/server/ware/servejs'),
    require('@myntra/myx/lib/server/ware/apps'),
    require('@myntra/myx/lib/server/ware/device'),
    require('../middlewares/userDetails'),
    abtestCookieMiddlewares,
    ...middlewares('UI')
  ],
  async function(req, res) {
    confirmationPage
      .fire(req, res)
      .then(data => res.status(data.httpStatus).send(data))
      .catch(error => {
        if (error.status === 'UPDATE_TOKENS') {
          Logger.logInfo(`Tokens need to be updated`, logContext, error);
        } else {
          Logger.logError(
            req,
            `Unable to fetch confirmation data`,
            logContext,
            error
          );
        }

        // remove error log info before sending error to client
        delete error.errorLog;
        delete error.error;

        res
          .status(error.httpStatus || 500)
          .send(error.httpStatus ? error : defaultErrorResponse);
      });
  }
);

router.get(
  '/cartData',
  [
    authToken,
    require('@myntra/myx/lib/server/ware/servejs'),
    require('@myntra/myx/lib/server/ware/apps'),
    require('@myntra/myx/lib/server/ware/device'),
    require('../middlewares/userDetails'),
    abtestCookieMiddlewares,
    ...middlewares('UI')
  ],
  async function(req, res) {
    cartPage
      .fire(req, res)
      .then(data => res.status(data.httpStatus).send(data))
      .catch(error => {
        if (error.status === 'UPDATE_TOKENS') {
          Logger.logInfo(`Tokens need to be updated`, logContext, error);
        } else {
          Logger.logError(req, `Unable to fetch cart data`, logContext, error);
        }

        // remove error log info before sending error to client
        delete error.errorLog;
        delete error.error;

        res
          .status(
            error.status === 'AUTHNZ_FAIL' ? 500 : error.httpStatus || 500
          )
          .send(error.httpStatus ? error : defaultErrorResponse);
      });
  }
);


router.get(
  '/getCart',
  [
    authToken,
    require('@myntra/myx/lib/server/ware/servejs'),
    require('@myntra/myx/lib/server/ware/apps'),
    require('@myntra/myx/lib/server/ware/device'),
    require('../middlewares/userDetails'),
    abtestCookieMiddlewares,
    ...middlewares('UI')
  ],
  async function(req, res) {
    
    
    const config = {
      headers:{
        'x-mynt-ctx': req.headers['x-mynt-ctx'], //'storeid=2297;nidx=7ab9d632-760e-11ed-b7d4-06dee4b4ebd9;uidx=062484f1.319f.453f.b9b3.a85f0385f858gDJZmfaG8c',
        'pagesource': 'cart',
        'x-myntra-abtest': 'cart.coupon.nudges=enabled',
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      }
    };
    agent
    .get('http://gateway.stage.myntra.com/v1/cart/default')
    .set(config.headers)
    .then(r => {
      res.status(200).send(r)
    })
    .catch(e => {
      res.status(500)
    });
  }
);


router.post(
  '/mergeCart',
  [
    authToken,
    require('@myntra/myx/lib/server/ware/servejs'),
    require('@myntra/myx/lib/server/ware/apps'),
    require('@myntra/myx/lib/server/ware/device'),
    require('../middlewares/userDetails'),
    abtestCookieMiddlewares,
    ...middlewares('UI')
  ],
  async function(req, res) {
    
    
    const config = {
      headers:{
        'x-mynt-ctx': req.headers['x-mynt-ctx'], //'storeid=2297;nidx=7ab9d632-760e-11ed-b7d4-06dee4b4ebd9;uidx=062484f1.319f.453f.b9b3.a85f0385f858gDJZmfaG8c',
        'pagesource': 'cart',
        'x-myntra-abtest': 'cart.coupon.nudges=enabled',
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      }
    };

    const at = get(req, 'myx.tokens.at', null);
    console.log("@@@@@@AT--->>", at)
    var data = req.body
    data.at = at
    agent
    .post('/mergeCart')
    .set(config.headers)
    .send(data)
    .then(r => {
      res.status(200).send(r)
    })
    .catch(e => {
      res.status(500)
    });
  }
);


router.post(
  '/mergeAndMovetoWishlist',
  [
    authToken,
    require('@myntra/myx/lib/server/ware/servejs'),
    require('@myntra/myx/lib/server/ware/apps'),
    require('@myntra/myx/lib/server/ware/device'),
    require('../middlewares/userDetails'),
    abtestCookieMiddlewares,
    ...middlewares('UI')
  ],
  async function(req, res) {
    
    
    const config = {
      headers:{
        'x-mynt-ctx': req.headers['x-mynt-ctx'], //'storeid=2297;nidx=7ab9d632-760e-11ed-b7d4-06dee4b4ebd9;uidx=062484f1.319f.453f.b9b3.a85f0385f858gDJZmfaG8c',
        'pagesource': 'cart',
        'x-myntra-abtest': 'cart.coupon.nudges=enabled',
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      }
    };

    const at = get(req, 'myx.tokens.at', null);
    console.log("@@@body-->", req.body)
    console.log("@@@@@@AT--->>", at)
    console.log("@@@body-->", req.headers.payload)
    
    var data = req.body
    data.at = at
    agent
    .post('/mergeAndMovetoWishlist')
    .set(config.headers)
    .send(data)
    .then(r => {
      res.status(200).send(r)
    })
    .catch(e => {
      res.status(500)
    });
  }
);

module.exports = router;
