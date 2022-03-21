const redirectHelper = require('../../../lib/helpers/redirectHelper');
const validation = require('../../../lib/validations/invitationCodeChooseValidation');
const dataStore = require('../../../lib/dataStore');
const deleteSession = require('../../../lib/deleteSession');
const languageHelper = require('../../../lib/helpers/languageHelper');

const getInvitationCodeChoose = (req, res) => {
  deleteSession.destroySessionExcludingLanguage(req);
  res.render('pages/invitation-code');
};

const postInvitationCodeChoose = (req, res) => {
  const details = req.body;
  const errors = validation.validator(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/invitation-code', { details, errors });
  } else {
    dataStore.save(req, 'invitation-code', details);
    const redirectUrl = redirectHelper.redirectBasedOnHasInvitationCode(details.hasInvitationCode);
    res.redirect(redirectUrl);
  }
};

const getLanguage = (req, res) => {
  if (req.params.language) {
    languageHelper.setLocale(req, req.params.language);
  }
  res.redirect('/invitation-code');
};

module.exports = {
  getInvitationCodeChoose,
  postInvitationCodeChoose,
  getLanguage,
};
