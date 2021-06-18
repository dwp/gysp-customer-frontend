const got = require('got');
const { StatusCodes } = require('http-status-codes');
const generalHelper = require('../../../lib/validations/utils/general.js');

const dataStore = require('../../../lib/dataStore');
const requestHelper = require('../../../lib/helpers/requestHelper');
const claim = require('../../../lib/objects/claimObject');
const claimCheck = require('../../../lib/validations/claimCheck');
const deleteSession = require('../../../lib/deleteSession');

const bankVerification = require('../../../lib/helpers/bankVerificationStatus');
const bank = require('../../../lib/objects/bankObject');

const config = require('../../../config/application');

const statusCode500 = 500;
const statusCodeErrorWrap = 200;
const statusCodeConflict = 409;

function isCheckableAccount(paymentMethod, buildingRoll) {
  if (paymentMethod === 'building' && generalHelper.isThisUndefinedOrEmtpy(buildingRoll)) {
    return true;
  }
  if (paymentMethod === 'bank') {
    return true;
  }
  return false;
}

function verifyAccountDetails(req, res, bankDetails, customerDetails) {
  return new Promise((resolve) => {
    if (req.session.isOverseas === true) {
      resolve({ result: bankVerification.featureOverseas() });
    } else if (!isCheckableAccount(bankDetails.paymentMethod, bankDetails.buildingRoll)) {
      resolve({ result: bankVerification.featureNotChecked() });
    } else if (config.application.feature.bankFeature === true) {
      const verifyObject = bank.bankDetailsToObjectWithCustomerDetails(bankDetails, customerDetails, req.session['dob-details']);
      const bankVerifyCall = requestHelper.generatePostCall(
        `${res.locals.bankValidateServiceApiGateway}/bankvalidate`, verifyObject, 'frontend',
      );
      got(bankVerifyCall).then(({ body }) => {
        resolve(body);
      }).catch((err) => {
        const traceID = requestHelper.getTraceID(err);
        requestHelper.errorLoggingHelper(err, '/api/bankvalidate', traceID, res.locals.logger, req.session.inviteKey);
        if (err.response.statusCode === StatusCodes.BAD_REQUEST) {
          resolve({ result: bankVerification.badRequest() });
        } else {
          resolve({ result: bankVerification.errorReturned() });
        }
      });
    } else {
      resolve({ result: bankVerification.featureDisabled() });
    }
  });
}

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

function procecssDataToBackend(req, res) {
  const claimData = dataStore.getAll(req);
  if (claimCheck.data(claimData)) {
    const claimDataKey = claimData.isOverseas ? 'account-details-overseas' : 'account-details';
    verifyAccountDetails(req, res, claimData[claimDataKey], req.session.customerDetails)
      .then((accountStatus) => {
        processClaim(res, req, claimData, accountStatus)
          .then(() => {
            redirectToEnd(req, res);
          }).catch((err) => {
            const traceID = requestHelper.getTraceID(err);
            requestHelper.errorLoggingHelper(err, '/api/claim', traceID, res.locals.logger, req.session.inviteKey);
            if (err.statusCode === statusCodeConflict) {
              redirectToEnd(req, res);
            } else {
              res.status(statusCodeErrorWrap);
              res.render('pages/error', { status: statusCode500 });
            }
          });
      });
  } else {
    let redirect;
    if (req.session.isOverseas) {
      redirect = 'where-have-you-lived-outside-the-uk';
    } else {
      redirect = 'have-you-ever-lived-outside-of-the-uk';
    }
    res.redirect(redirect);
  }
}

module.exports = {
  procecssDataToBackend,
  verifyAccountDetails,
  processClaim,
};
