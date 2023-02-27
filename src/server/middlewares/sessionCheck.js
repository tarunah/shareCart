const config = require('../../config');
const mcookies = require('@myntra/myx/lib/server/cookies');
const getUidxFromAt = require('../utils/helpers').getUidxFromAt;

module.exports = (req, res, next) => {
  var loggedInUser = getUidxFromAt(req.myx.tokens.at);

  if (!loggedInUser) {
    // Server Side redirection for user not logged in.
    let referer = req.originalUrl;
    referer = referer.charAt(0) === '/' ? referer.substr(1) : referer;
    const completeUrl = `${config('ROOT').root}${referer}`;
    const loginRedirectionUrl = `/login?referer=${encodeURIComponent(
      completeUrl
    )}`;
    res.redirect(302, loginRedirectionUrl);
  } else {
    next();
  }
};
