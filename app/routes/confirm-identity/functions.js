const redirectHelper = require('../../../lib/helpers/redirectHelper');
const validation = require('../../../lib/validations/confirmIdentityValidation');
const dataStore = require('../../../lib/dataStore');
const deleteSession = require('../../../lib/deleteSession');
const languageHelper = require('../../../lib/helpers/languageHelper');

function getConfirmIdentity(req, res) {
  deleteSession.afterKey(req, 'verify');
  res.render('pages/confirm-identity');
}

function postConfirmIdentity(req, res) {
  const details = req.body;
  const errors = validation.authTypeValidation(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/confirm-identity', { details, errors });
  } else {
    dataStore.save(req, 'confirm-identity', details);
    const redirectUri = redirectHelper.redirectBasedOnAuthType(details.authType);
    res.redirect(redirectUri);
  }
}

function getLanguage(req, res) {
  if (req.params.language) {
    languageHelper.setLocale(req, req.params.language);
  }
  res.redirect('/confirm-identity');
}

module.exports.getConfirmIdentity = getConfirmIdentity;
module.exports.postConfirmIdentity = postConfirmIdentity;
module.exports.getLanguage = getLanguage;
