const config = require('../../../config/application');
const dataStore = require('../../../lib/dataStore');
const { extractPath } = require('../../../lib/urlExtract');
const validation = require('../../../lib/validations/cookieValidation');

const oneYearInMilliseconds = 1000 * 60 * 60 * 24 * 365;

function getCookiePage(req, res) {
  const cookieConsent = req.cookies[res.locals.consentCookieName];
  dataStore.save(req, 'cookieBackUrl', extractPath(req, req.headers.referer, config.mountUrl));
  res.render('pages/cookies', {
    details: { cookieConsent },
  });
}

function postCookiePage(req, res) {
  const errors = validation.cookieValidation(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/cookies', { errors, details: req.body });
  } else {
    const { cookieConsent } = req.body;

    res.cookie(res.locals.consentCookieName, cookieConsent, {
      path: '/',
      maxAge: oneYearInMilliseconds,
      httpOnly: true,
      sameSite: 'Strict',
      secure: config.application.tls.enabled,
    });

    // Show cookie accepted / rejected banner
    dataStore.save(req, 'cookieChoiceMade', true);

    // If rejected, remove any GA cookies
    if (cookieConsent === 'no' && req.headers.cookie) {
      const gaCookieName = req.headers.cookie.match(/_gat[^=;]*/);
      const options = { path: '/' };

      if (config.gaDomain) {
        options.domain = config.gaDomain;
      }

      if (gaCookieName) {
        res.clearCookie(gaCookieName[0], options);
      }

      res.clearCookie('_ga', options);
      res.clearCookie('_gid', options);
    }

    // Back to url
    const backTo = dataStore.get(req, 'cookieBackUrl') || 'cookie-policy';

    res.redirect(backTo);
  }
}

module.exports = {
  getCookiePage,
  postCookiePage,
};
