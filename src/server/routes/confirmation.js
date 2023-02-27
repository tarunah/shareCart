const router = require('express').Router();
const serialize = require('serialize-javascript');
const { confirmationPage } = require('../circuitBreakers/pages');
const writePageData = require('./renderer').writePageData;
const Logger = require('../utils/logger');

const logContext = {
  context: 'confirmation'
};

const defaultErrorResponse = {
  httpStatus: 500,
  message: 'Something went wrong. Please reload.',
  status: 'ERROR'
};

router.get('/', async function(req, res) {
  confirmationPage
    .fire(req, res)
    .then(data =>
      writePageData({ req, res, data: serialize(data, { isJSON: true }) })
    )
    .catch(error => {
      if (error.status === 'UPDATE_TOKENS') {
        Logger.logInfo(`Tokens need to be updated`, logContext, error);
      } else {
        Logger.logError(
          req,
          'Unable to fetch confirmation data',
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
    });
});

module.exports = router;
