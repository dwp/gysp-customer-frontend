const languageHelper = require('../../../../lib/helpers/languageHelper');
const deleteSession = require('../../../../lib/deleteSession');
const { save } = require('../../../../lib/dataStore');

const get = (req, res) => {
  deleteSession.destroyInviteRequestSessionExcludingLanguage(req);
  const isNorthernIreland = 'neither';
  save(req, 'isNorthernIreland', isNorthernIreland);
  res.render('pages/request-invitation/index', {
    isNorthernIreland,
  });
};

const post = (req, res) => {
  save(req, 'userInInviteRequest', true);
  res.redirect('request-invitation-code/your-name');
};

const getLanguage = (req, res) => {
  if (req.params.language) {
    languageHelper.setLocale(req, req.params.language);
  }
  res.redirect('/request-invitation-code');
};

module.exports = {
  get,
  post,
  getLanguage,
};
