const userObject = require('../../../lib/objects/userObject');
const dataStore = require('../../../lib/dataStore');
const validation = require('../../../lib/validations/verifyYourDetailsValidation');
const dateHelper = require('../../../lib/helpers/dateHelper');

const redirectWhenDoYouWantPensionFromFullURL = '/when-do-you-want-your-state-pension';

const redirectSuccessFullURL = '/your-state-pension-date';

function getVerifyDetails(req, res) {
  const details = dataStore.get(req, 'verify-details');
  const user = userObject.verifyUserObject(req.user);
  res.render('pages/verify-details', { user, details });
}

function postVerifyDetails(req, res) {
  const details = req.body;
  const user = userObject.verifyUserObject(req.user);
  const errors = validation.detailsValidation(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/verify-details', { user, details, errors });
  } else {
    dataStore.save(req, 'verify-details', details);
    if (details.address === 'no') {
      res.redirect('/verify/auth-error-address');
    } else if (req.session.customerDetails && dateHelper.isDateBeforeToday(req.session.customerDetails.statePensionDate)
        && req.session.customerDetails.dobVerification === 'V') {
      req.session.isBeforeSpa = false;
      res.redirect(redirectWhenDoYouWantPensionFromFullURL);
    } else {
      res.redirect(redirectSuccessFullURL);
    }
  }
}

function getVerifyAuthError(req, res) {
  const page = { backHref: '/verify/your-details' };
  res.render('pages/auth-error-address', { page });
}

module.exports.getVerifyDetails = getVerifyDetails;
module.exports.postVerifyDetails = postVerifyDetails;
module.exports.getVerifyAuthError = getVerifyAuthError;
