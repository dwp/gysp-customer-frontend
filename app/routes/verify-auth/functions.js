const crypto = require('crypto');
const passport = require('passport');
const passportVerify = require('passport-verify');
const got = require('got');
const { StatusCodes } = require('http-status-codes');

const config = require('../../../config/application');

const requestHelper = require('../../../lib/helpers/requestHelper');
const locationHelper = require('../../../lib/helpers/locationHelper');
const dateHelper = require('../../../lib/helpers/dateHelper');
const dateFormatter = require('../../../lib/helpers/dateFormatter');
const languageHelper = require('../../../lib/helpers/languageHelper');
const sessionHelper = require('../../../lib/helpers/sessionHelper');
const dataStore = require('../../../lib/dataStore');
const { getInviteKeyRequest } = require('../../../lib/helpers/keyServiceHelper');

const redirectTooEarly = '/verify/you-are-too-early-to-get-your-state-pension';
const redirectSessionUndefined = '/verify/you-can-now-sign-in-with-govuk-verify';
const maxMonthPreClaim = 4;


function getCustomerByHashPidServiceRequest(req, res, user) {
  return new Promise((resolve, reject) => {
    const { customerServiceApiGateway } = res.locals;
    const customerServiceCall = requestHelper.generateGetCall(`${customerServiceApiGateway}/customer/hashpid/${user.pid}`);
    got(customerServiceCall).then((response) => {
      resolve(response.body);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function processAuth(req, res, user) {
  try {
    const customerDetails = await getCustomerByHashPidServiceRequest(req, res, user);
    await getInviteKeyRequest(res, customerDetails.inviteKey);
    return customerDetails;
  } catch (err) {
    return err;
  }
}


function setSessionData(req, res, customerDetails, cb) {
  req.session.userPassedAuth = true;
  req.session.inviteKey = customerDetails.inviteKey;
  const inviteKeyHash = crypto.createHmac('sha256', config.secret)
    .update(customerDetails.inviteKey)
    .digest('hex');
  req.session.inviteKeyHash = inviteKeyHash;
  req.session.customerDetails = customerDetails;
  req.session.userDateOfBirthInfo = {};
  req.session.isNorthernIreland = locationHelper.isNorthernIreland(customerDetails.residentialAddress.postCode);
  req.session.isBeforeSpa = true;
  if (dateHelper.isDateBeforeToday(customerDetails.statePensionDate)) {
    req.session.isBeforeSpa = false;
  }
  cb();
}

function authErrorPage(error, req, res) {
  const traceID = requestHelper.getTraceID(error);
  const uriPath = requestHelper.getUriPath(error);
  requestHelper.errorLoggingHelper(error, uriPath, traceID, res.locals.logger, req.body.inviteKey);
  res.status(StatusCodes.OK);
  res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
}

function getVerifyAbout(req, res) {
  res.render('pages/verify-about');
}

/* istanbul ignore next */
function postVerifyResponse(req, res, next) {
  const authMiddleware = passport.authenticate('verify', passportVerify.createResponseHandler({
    onMatch: async (user) => {
      try {
        const customerDetails = await processAuth(req, res, user);
        setSessionData(req, res, customerDetails, () => {
          if (dateHelper.numberOfMonthsInFuture(customerDetails.statePensionDate) > maxMonthPreClaim) {
            return res.redirect(redirectTooEarly);
          }
          return req.logIn(customerDetails, () => res.redirect('/verify/your-details'));
        });
      } catch (err) {
        authErrorPage(err, req, res);
      }
    },
    onAuthnFailed: () => res.redirect('/verify/no-match'),
    onNoMatch: () => res.redirect('/verify/no-match'),
    onCancel: () => res.redirect('/verify/no-match'),
    onError: (error) => {
      if (req.session.requestId === undefined) {
        res.redirect(redirectSessionUndefined);
      } else {
        authErrorPage(error, req, res);
      }
    },
  }));
  authMiddleware(req, res, next);
}

function getNoMatch(req, res) {
  res.render('pages/verify-no-match');
}

function getCancel(req, res) {
  res.render('pages/verify-cancel');
}

function getTooEarlyForPension(req, res) {
  // Need check session to prevent direct access to the page as we do not have an referer
  // when coming from verify so session will be set if user has come from verify
  if (req.session.customerDetails && req.session.customerDetails.statePensionDate) {
    const statePensionDate = dateFormatter.statePensionDate(req.session.customerDetails.statePensionDate, req.session.lang);
    res.render('pages/verify-state-pension-age-too-early', { statePensionDate });
  } else {
    const traceId = requestHelper.getTraceID(res);
    res.locals.logger.info({ traceId }, `Security redirect - statePensionDate not set in session - ${req.method} ${req.path}`);
    sessionHelper.destroySessionAndRedirect(req, res);
  }
}

function getSignInWithVerify(req, res) {
  res.render('pages/verify-sign-in');
}

function postSignInWithVerify(req, res) {
  const details = { personalDataPermission: 'yes' };
  dataStore.save(req, 'personal-data', details);
  res.redirect('/verify/start');
}

function getSwitchLanguage(req, res) {
  if (req.params.language) {
    languageHelper.setLocale(req, req.params.language);
  }
  res.redirect('/verify/you-can-now-sign-in-with-govuk-verify');
}

module.exports.getVerifyAbout = getVerifyAbout;
module.exports.postVerifyResponse = postVerifyResponse;
module.exports.getNoMatch = getNoMatch;
module.exports.getCancel = getCancel;
module.exports.processAuth = processAuth;
module.exports.setSessionData = setSessionData;
module.exports.authErrorPage = authErrorPage;
module.exports.getTooEarlyForPension = getTooEarlyForPension;
module.exports.getSignInWithVerify = getSignInWithVerify;
module.exports.postSignInWithVerify = postSignInWithVerify;
module.exports.getSwitchLanguage = getSwitchLanguage;
