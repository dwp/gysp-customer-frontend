const redirectHelper = require('../../../lib/helpers/redirectHelper');
const validation = require('../../../lib/validations/personalDataValidation');
const dataStore = require('../../../lib/dataStore');

function getPersonalData(req, res) {
  const details = dataStore.get(req, 'personal-data');
  res.render('pages/personal-data', { details });
}

function postPersonalData(req, res) {
  const details = req.body;
  const errors = validation.personalDataValidationValidation(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/personal-data', { details: req.body, errors });
  } else {
    dataStore.save(req, 'personal-data', details);
    const redirectUri = redirectHelper.redirectBasedOnPersonalDataPermission(req.body.personalDataPermission);
    res.redirect(redirectUri);
  }
}

module.exports.getPersonalData = getPersonalData;
module.exports.postPersonalData = postPersonalData;
