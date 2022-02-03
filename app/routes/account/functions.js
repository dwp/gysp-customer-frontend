const dataStore = require('../../../lib/dataStore');
const filterRequest = require('../../../lib/utils/requestHelper');
const validation = require('../../../lib/validations/accountValidation');
const validationOverseas = require('../../../lib/validations/accountOverseasValidation');
const { application } = require('../../../config/application');
const transUnionValidation = require('../../../lib/validations/transunion/bank-validation');

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
  return res.redirect(nextPage);
}

function accountPageOverseasPost(req, res) {
  const errors = validationOverseas.accountValidator(req.body, req.session.lang);
  if (Object.keys(errors).length === 0) {
    const details = filterRequest.requestFilter(filterRequest.overseasPaymentDetails(), req.body);
    return saveDetailsAndRedirect(req, res, details, 'account-details-overseas');
  }
  return res.render('pages/account-details-overseas', { details: req.body, errors });
}

const accountPagePost = async (req, res) => {
  if (req.session.isOverseas) {
    return accountPageOverseasPost(req, res);
  }

  const errors = validation.accountValidator(req.body, req.session.lang);
  if (Object.keys(errors).length === 0) {
    const filteredRequest = filterRequest.requestFilter(filterRequest.paymentDetails(), req.body);
    const details = dataStore.filterAccountDetails(filteredRequest);
    if (application.feature.bankValidationUsingKBV) {
      const accountStatus = await transUnionValidation.verifyAccountDetails(
        req, res, details, req.session.customerDetails,
      );
      const { result } = accountStatus;

      if (result.toLowerCase() === 'additionalchecks') {
        dataStore.save(req, 'account-details', details);
        return res.redirect('extra-checks');
      }
      req.session.accountStatus = accountStatus;
    }
    return saveDetailsAndRedirect(req, res, details, 'account-details');
  }
  return res.render('pages/account-details', { details: req.body, errors, checked });
};

module.exports.accountPageGet = accountPageGet;
module.exports.accountPagePost = accountPagePost;
