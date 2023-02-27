const semver = require('semver');

module.exports = (req, res, next) => {
  req.appVersionBasedConfig = {};
  if (req.myx.apps.isApp) {
    req.appVersionBasedConfig = {
      ignoreIosBottomBar:
        req.myx.apps.ios &&
        semver.gte(req.myx.apps.iosAppVersionWithReleaseTags, '3.23.0')
    };
  }
  next();
};
