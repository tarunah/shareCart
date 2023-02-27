const mcookies = require('@myntra/myx/lib/server/cookies');
const cookieKeys = require('../../utils/constants').cookieKeys;

const LOGIN_COOKIE = 'ilgim';

const clearLoginCookies = cookies => {
  cookies.set(cookieKeys.IS_LOGGED_IN, 'false', {
    secure: false,
    httpOnly: false
  });
  cookies.set(cookieKeys.RT, '', {
    secure: true,
    encode: String,
    expires: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  });
};

module.exports = (req, res, next) => {
  const cookies = mcookies(req, res);
  const rt = (req.myx.tokens || {}).rt;
  const updatedTokens = req.updatedTokens;
  const rtPresent = rt && rt !== '0';
  const rtNotExpired = updatedTokens ? !updatedTokens.rtExpired : true;

  // Takes care of login cookie
  if (rtPresent && rtNotExpired) {
    if (cookies.get(cookieKeys.IS_LOGGED_IN) !== 'true') {
      cookies.set(cookieKeys.IS_LOGGED_IN, 'true', {
        secure: false,
        httpOnly: false
      });
    }
  } else {
    clearLoginCookies(cookies);
  }

  next();
};
