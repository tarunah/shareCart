const router = require('express').Router();
const resourceResolver = require('../utils/resourceResolver');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const Logger = require('../utils/logger');
const cacheDecorator = require('../../utils/helper').cacheDecorator;

const getAssetsHash = function() {
  let contentBuffer = null,
    hash;
  try {
    contentBuffer = fs.readFileSync(
      path.join(__dirname, '../../../webpack-assets.json')
    );
  } catch (e) {
    Logger.logError(
      'webpack-assets.json file not found',
      { context: 'getAssetsHash' },
      e
    );
  } finally {
    hash = contentBuffer
      ? crypto
          .createHash('sha256')
          .update(contentBuffer)
          .digest('hex')
      : null;
  }
  return hash;
};
const getCachedAssetsHash = cacheDecorator(getAssetsHash);

const getAssetsUrls = function(resConfig) {
  const {
    cssBundles = [],
    jsBundles = [],
    otherJsBundles = [],
    otherCSSBundles = [],
    staticResources = {}
  } = resConfig;
  let assets = [];
  assets = assets
    .concat(cssBundles)
    .concat(jsBundles)
    .concat(otherJsBundles)
    .concat(otherCSSBundles)
    .concat(staticResources.fonts)
    .concat(staticResources.sprites);
  return assets;
};

const setResponseHeaders = function(req, res, hash) {
  res.setHeader('Cache-Control', 'public, max-age=10800, must-revalidate');
  res.setHeader('ETag', hash);
};

router.get('/all', function(req, res) {
  const clientEtag =
    req.headers['if-none-match'] || req.headers['If-None-Match'];
  const hash = getCachedAssetsHash();
  if (clientEtag && clientEtag === hash) {
    res.status(304).send();
    return;
  }
  const resConfig = resourceResolver.getAllAssets(req);
  if (resConfig) {
    setResponseHeaders(req, res, hash);
    res.status(200).send({
      hash: hash,
      urls: getAssetsUrls(resConfig)
    });
  } else {
    res.status(500).send({
      hash: hash,
      urls: []
    });
  }
});

module.exports = router;
