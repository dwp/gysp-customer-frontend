const config = require('../../../config/application');
const languageHelper = require('../../../lib/helpers/languageHelper');

function getSessionKeepAlive(req, res) {
  res.status(200).end();
}

function getSessionTimeout(req, res) {
  if (req.params && req.params.language) {
    req.session.isOverseasStub = (req.query && req.query['overseas-stub'] === 'true') || false;
    languageHelper.setLocale(req, req.params.language);
    res.redirect('/session-timeout');
  } else {
    res.render('pages/session-timeout', {
      sessionTimeout: Math.floor(config.application.session.timeout / 60),
    });
  }
}

module.exports = {
  getSessionKeepAlive,
  getSessionTimeout,
};
