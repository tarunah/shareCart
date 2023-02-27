const router = require('express').Router();
const serialize = require('serialize-javascript');
const { addressAll } = require('../circuitBreakers/services');
const writePageData = require('./renderer').writePageData;
const Logger = require('../utils/logger');

const logContext = {
  context: 'address'
};

function addressPage(req, res) {
  addressAll
    .fire(req)
    .then(data =>
      writePageData({ req, res, data: serialize(data, { isJSON: true }) })
    )
    .catch(error => {
      if (error.status === 'UPDATE_TOKENS') {
        Logger.logInfo(`Tokens need to be updated`, logContext, error);
      } else {
        Logger.logError(req, `Unable to fetch address data`, logContext, error);
      }

      // remove error log info before sending error to client
      delete error.errorLog;

      writePageData({
        req,
        res,
        data: serialize({
          status:
            error.status === 'UPDATE_TOKENS'
              ? 'UPDATE_TOKENS'
              : 'AUTHNZ_FAIL'
              ? 'AUTHNZ_FAIL'
              : 'ERROR'
        })
      });
    });
}

router.get('/', addressPage);
router.get('/list', addressPage);

module.exports = router;
