const languageHelper = require('../../../../lib/helpers/languageHelper');
const deleteSession = require('../../../../lib/deleteSession');

const get = (req, res) => {
  deleteSession.destroyInviteRequestSessionExcludingLanguage(req);
  res.render('pages/request-invitation/index');
};

const getLanguage = (req, res) => {
  if (req.params.language) {
    languageHelper.setLocale(req, req.params.language);
  }
  res.redirect('/request-invitation-code');
};

module.exports = {
  get,
  getLanguage,
};
