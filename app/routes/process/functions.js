const got = require('got');

const dataStore = require('../../../lib/dataStore');
const requestHelper = require('../../../lib/helpers/requestHelper');
const claim = require('../../../lib/objects/claimObject');
const claimCheck = require('../../../lib/validations/claimCheck');
const deleteSession = require('../../../lib/deleteSession');

const { verifyAccountDetails } = require('../../../lib/validations/transunion/bank-validation');
const { application } = require('../../../config/application');

const statusCode500 = 500;
const statusCodeErrorWrap = 200;
const statusCodeConflict = 409;

async function processClaim(res, req, claimData, accountStatus) {
  const claimBody = await claim.sessionToObject(claimData, accountStatus, req.session.lang);
  return new Promise((resolve, reject) => {
    claimBody.customerRequest = claim.createCustomerObject(req.session.customerDetails);
    const calimServiceCall = requestHelper.generatePostCall(`${res.locals.claimServiceApiGateway}/claim`, claimBody);
    got(calimServiceCall).then(() => {
      req.session['claim-data-for-audit'] = claimBody;
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
}

function setCompletedAndClearSession(req) {
  deleteSession.deleteCustomerFormData(req);
  req.session.userHasCompleted = true;
}

function redirectToEnd(req, res) {
  setCompletedAndClearSession(req);
  res.redirect('complete');
}

const getAccountStatus = async (req, res, claimData, claimDataKey) => {
  if (application.feature.bankValidationUsingKBV) {
    const accountVerificationResultInSession = claimData.accountStatus;
    return accountVerificationResultInSession;
  }
  return verifyAccountDetails(req, res, claimData[claimDataKey], claimData.customerDetails);
};

const procecssDataToBackend = async (req, res) => {
  const claimData = dataStore.getAll(req);
  if (claimCheck.data(claimData)) {
    const claimDataKey = claimData.isOverseas ? 'account-details-overseas' : 'account-details';
    const accountStatus = await getAccountStatus(req, res, claimData, claimDataKey);

    try {
      await processClaim(res, req, claimData, accountStatus);
      redirectToEnd(req, res);
    } catch (err) {
      const traceID = requestHelper.getTraceID(err);
      requestHelper.errorLoggingHelper(err, '/api/claim', traceID, res.locals.logger, req.session.inviteKey);
      if (err.response && err.response.statusCode === statusCodeConflict) {
        redirectToEnd(req, res);
      } else {
        res.status(statusCodeErrorWrap);
        res.render('pages/error', { status: statusCode500 });
      }
    }
  } else {
    let redirect;
    if (req.session.isOverseas) {
      redirect = 'where-have-you-lived-outside-the-uk';
    } else {
      redirect = 'have-you-ever-lived-outside-of-the-uk';
    }
    res.redirect(redirect);
  }
};

module.exports = {
  procecssDataToBackend,
  processClaim,
};
