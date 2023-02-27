const router = require('express').Router();
const serialize = require('serialize-javascript');
const writePageData = require('./renderer').writePageData;
const { getPaymentData } = require('../utils/paymentUtils');
const Logger = require('../utils/logger');

const logContext = {
  context: 'payment'
};

const defaultErrorResponse = {
  httpStatus: 500,
  message: 'Unable to fetch payment data',
  status: 'ERROR'
};

router.get('/', async function(req, res) {
  const successCb = data => {
    writePageData({ req, res, data: serialize(data, { isJSON: true }) });
  };

  const errorCb = error => {
    if (error.status === 'UPDATE_TOKENS') {
      Logger.logInfo(`Tokens need to be updated`, logContext, error);
    } else {
      Logger.logError(
        req,
        'Unable to fetch payment data from payment Aggregator',
        logContext,
        error
      );
    }

    // remove error log info before sending error to client
    delete error.errorLog;
    delete error.error;

    writePageData({
      req,
      res,
      data: error.httpStatus
        ? serialize(error, { isJSON: true })
        : serialize(defaultErrorResponse, { isJSON: true })
    });
  };
  await getPaymentData(req, res, successCb, errorCb);
});

router.get('/otp', function(req, res) {
  writePageData({ req, res, data: 'null' });
});

router.get('/bnpl/otp', function(req, res) {
  res.end(`</body></html>`);
});

module.exports = router;
