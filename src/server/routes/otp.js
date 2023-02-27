const router = require('express').Router();
const writePageData = require('./renderer').writePageData;

router.get('/', function(req, res) {
  writePageData({ req, res, data: 'null' });
});

module.exports = router;
