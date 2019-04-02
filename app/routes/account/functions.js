const dataStore = require('../../../lib/dataStore');
const filterRequest = require('../../../lib/utils/requestHelper');
const validation = require('../../../lib/validations/accountValidation');
const validationOverseas = require('../../../lib/validations/accountOverseasValidation');

function checked(data, value) {
  if (data === value) {
    return true;
  }
  return false;
}

function accountPageOverseasGet(req, res) {
  const formData = dataStore.get(req, 'account-details-overseas');
  res.render('pages/account-details-overseas', { details: formData });
}

function accountPageGet(req, res) {
  if (req.session.isOverseas) {
    accountPageOverseasGet(req, res);
  } else {
    const formData = dataStore.get(req, 'account-details');
    res.render('pages/account-details', { details: formData, checked });
  }
}

function saveDetailsAndRedirect(req, res, details, storeKey) {
  let nextPage = 'check-your-details';
  dataStore.save(req, storeKey, details);
  if (req.session.userDateOfBirthInfo.newStatePensionDate && req.session.userDateOfBirthInfo.newDobVerification !== 'V') {
    nextPage = 'you-need-to-send-proof-of-your-date-of-birth';
  }
  res.redirect(nextPage);
}

function accountPageOverseasPost(req, res) {
  const errors = validationOverseas.accountValidator(req.body, req.session.lang);
  if (Object.keys(errors).length === 0) {
    const details = filterRequest.requestFilter(filterRequest.overseasPaymentDetails(), req.body);
    saveDetailsAndRedirect(req, res, details, 'account-details-overseas');
  } else {
    res.render('pages/account-details-overseas', { details: req.body, errors });
  }
}

function accountPagePost(req, res) {
  if (req.session.isOverseas) {
    accountPageOverseasPost(req, res);
  } else {
    const errors = validation.accountValidator(req.body, req.session.lang);
    if (Object.keys(errors).length === 0) {
      const filteredRequest = filterRequest.requestFilter(filterRequest.paymentDetails(), req.body);
      const details = dataStore.filterAccountDetails(filteredRequest);
      saveDetailsAndRedirect(req, res, details, 'account-details');
    } else {
      res.render('pages/account-details', { details: req.body, errors, checked });
    }
  }
}

module.exports.accountPageGet = accountPageGet;
module.exports.accountPagePost = accountPagePost;
