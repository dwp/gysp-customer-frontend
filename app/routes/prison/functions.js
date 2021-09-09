const filterRequest = require('../../../lib/utils/requestHelper');
const validation = require('../../../lib/validations/prisonValidation');
const dataStore = require('../../../lib/dataStore');
const dateFormatter = require('../../../lib/helpers/dateFormatter');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

function prisonNextPage(req, editMode) {
  if (editMode) {
    return '/check-your-details';
  }
  if (req.session.isOverseas) {
    return '/where-have-you-lived-outside-the-uk';
  }
  return '/have-you-ever-lived-outside-of-the-uk';
}

function getPrison(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'prison');
  const { customerDetails: { statePensionDate } } = req.session;
  const date = dateFormatter.statePensionDate(statePensionDate, req.session.lang);
  const formData = dataStore.get(req, 'prison');
  res.render('pages/prison', { details: formData, date });
}

function postPrison(req, res) {
  const details = req.body;
  const { customerDetails: { statePensionDate } } = req.session;
  const date = dateFormatter.statePensionDate(statePensionDate, req.session.lang);
  const errors = validation.prisonValidation(details, date, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/prison', { date, details, errors });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'prison');
    const filteredRequest = filterRequest.requestFilter(filterRequest.prison(), req.body);
    dataStore.checkAndSave(req, 'prison', filteredRequest, editMode);
    const redirectUri = prisonNextPage(req, editMode);
    res.redirect(redirectUri);
  }
}

module.exports.getPrison = getPrison;
module.exports.postPrison = postPrison;
