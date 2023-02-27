const { getUidxFromAt } = require('../utils/helpers');
const crypto = require('crypto');

module.exports = (req, res, next) => {
  const puidx = getUidxFromAt(req.myx.tokens.at);
  req.myx.profile = req.myx.session = {
    uidx: puidx,
    userHashId: puidx
      ? crypto
          .createHash('md5')
          .update(puidx)
          .digest('hex')
      : null,
    isLoggedIn: !!puidx,
    login: puidx
  };
  next();
};
