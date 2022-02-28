const dataStore = require('../../../lib/dataStore');
const filterRequest = require('../../../lib/utils/requestHelper');
const validation = require('../../../lib/validations/accountValidation');
const validationOverseas = require('../../../lib/validations/accountOverseasValidation');
const { application } = require('../../../config/application');
const { buildTransunionValidationError } = require('../../../lib/validations/transunion/bank-validation.js');
const transUnionValidation = require('../../../lib/validations/transunion/bank-validation.js');
const bankVerificationStatus = require('../../../lib/helpers/bankVerificationStatus');
const { translateQuestion } = require('../../../lib/helpers/kbvHelper');

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
    if (application.feature.bankValidationUsingKBV) {
      req.session.accountStatus = {
        result: bankVerificationStatus.featureOverseas(),
      };
    }
    return saveDetailsAndRedirect(req, res, details, 'account-details-overseas');
  }
  return res.render('pages/account-details-overseas', { details: req.body, errors });
}

const prepareForKBVJourney = async (req, res, details, customerDetails, accountStatus) => {
  try {
    const { questions: allQuestions } = await transUnionValidation.generateKBV(req, res, details, customerDetails);
    const translated = allQuestions.map((question) => translateQuestion(question, req.session.lang));
    dataStore.save(req, 'kbvQuestions', allQuestions);
    dataStore.save(req, 'translatedKbvQuestions', translated);
    return res.redirect('extra-checks');
  } catch (err) {
    const failedAccountStatus = Object.assign(Object.create(null),
      accountStatus,
      { result: bankVerificationStatus.badRequest() });
    dataStore.save(req, 'accountStatus', failedAccountStatus);
    return saveDetailsAndRedirect(req, res, details, 'account-details');
  }
};

const accountPagePost = async (req, res) => {
  if (req.session.isOverseas) {
    return accountPageOverseasPost(req, res);
  }

  const postRequestBody = Object.assign(Object.create(null), req.body);
  postRequestBody.paymentMethod = postRequestBody.buildingRoll ? 'building' : 'bank';
  const errors = validation.accountValidator(postRequestBody, req.session.lang);

  if (Object.keys(errors).length === 0) {
    const filteredRequest = filterRequest.requestFilter(filterRequest.paymentDetails(), postRequestBody);
    const details = dataStore.filterAccountDetails(filteredRequest);

    if (application.feature.bankValidationUsingKBV) {
      const { customerDetails } = req.session;
      const accountStatus = await transUnionValidation.verifyAccountDetails(
        req, res, details, customerDetails,
      );

      dataStore.save(req, 'accountStatus', accountStatus);
      const { result, messages } = accountStatus;

      const transunionError = buildTransunionValidationError(messages);
      if (transunionError.hasAtleastSingleError()) {
        return res.render('pages/account-details', { details: postRequestBody, errors: transunionError.errors, checked });
      }

      if (result.toLowerCase() === 'additionalchecks') {
        dataStore.save(req, 'account-details', details);
        return prepareForKBVJourney(req, res, details, customerDetails, accountStatus);
      }
    }
    return saveDetailsAndRedirect(req, res, details, 'account-details');
  }
  return res.render('pages/account-details', { details: postRequestBody, errors, checked });
};

module.exports.accountPageGet = accountPageGet;
module.exports.accountPagePost = accountPagePost;
