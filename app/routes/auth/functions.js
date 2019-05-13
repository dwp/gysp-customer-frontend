const crypto = require('crypto');
const request = require('request-promise');
const httpStatus = require('http-status-codes');

const config = require('../../../config/yaml');

const validation = require('../../../lib/validations/authValidation');
const auth = require('../../../lib/objects/authObject');
const sessionHelper = require('../../../lib/helpers/sessionHelper');
const requestHelper = require('../../../lib/helpers/requestHelper');
const locationHelper = require('../../../lib/helpers/locationHelper');
const languageHelper = require('../../../lib/helpers/languageHelper');
const dateHelper = require('../../../lib/helpers/dateHelper');
const deleteSession = require('../../../lib/deleteSession.js');

let redirectSuccessFullURL = 'your-state-pension-date';

try {
  if (config.application.feature.dateConfirmation === true) {
    redirectSuccessFullURL = 'date-of-birth';
  }
} catch (err) {
  //
}

function getSessionLanguage(lang) {
  let language = 'Language-english';
  if (lang === 'cy-GB') {
    language = 'Language-welsh';
  }
  return language;
}

function getSessionCount(req) {
  const attempts = sessionHelper.sessionCount(req.session.invalidMatch);
  req.session.invalidMatch = attempts;
  return attempts;
}

function deleteSessionCounts(req) {
  delete req.session.invalidMatch;
}

function redirectToAuthErrorOrDisplayPage(error, req, res) {
  const traceID = requestHelper.getTraceID(error);
  const uriPath = requestHelper.getUriPath(error);
  if (error.statusCode === httpStatus.NOT_FOUND || error.statusCode === httpStatus.OK) {
    const attempts = getSessionCount(req);
    if (sessionHelper.checkAuthAttemptLimits(attempts)) {
      requestHelper.loggingHelper({ message: 'three attempts' }, uriPath, traceID, res.locals.logger, req.body.inviteKey);
      deleteSessionCounts(req);
      res.redirect('auth-error-invitation-code');
    } else {
      requestHelper.loggingHelper(error, uriPath, traceID, res.locals.logger, req.body.inviteKey);
      req.session.matchError = true;
      req.session.requestDetails = req.body;
      res.redirect('auth');
    }
  } else {
    requestHelper.loggingHelper(error, uriPath, traceID, res.locals.logger, req.body.inviteKey);
    res.status(httpStatus.OK);
    res.render('pages/error', { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}

function redirectToNextStep(req, res, customerDetails, matchDetails) {
  req.session.userPassedAuth = true;
  req.session.inviteKey = matchDetails.inviteKey;
  const inviteKeyHash = crypto.createHmac('sha256', config.secret)
    .update(matchDetails.inviteKey)
    .digest('hex');
  req.session.inviteKeyHash = inviteKeyHash;
  req.session.customerDetails = customerDetails;
  req.session.userDateOfBirthInfo = {};
  if (customerDetails.residentialAddress) {
    req.session.isNorthernIreland = locationHelper.isNorthernIreland(customerDetails.residentialAddress.postCode);
  }
  req.session.isBeforeSpa = true;
  if (dateHelper.isDateBeforeToday(customerDetails.statePensionDate)) {
    req.session.isBeforeSpa = false;
  }
  req.session.isInviteCodeLogin = true;
  res.redirect(redirectSuccessFullURL);
}

function resetErrorState(req) {
  const pageValues = {};
  pageValues.verifyFeature = config.application.feature.verify;
  if (req.session.isOverseas) {
    pageValues.verifyFeature = false;
  }
  pageValues.language = getSessionLanguage(req.session.lang);
  pageValues.pageSuffix = req.session.isOverseas ? '-overseas' : '';
  if (req.session.requestDetails !== undefined) {
    pageValues.details = req.session.requestDetails;
    delete req.session.requestDetails;
    if (req.session.formErrors !== undefined) {
      pageValues.errors = validation.authValidation(pageValues.details, req.session.lang, req.session.isOverseas);
      pageValues.formError = true;
      pageValues.clear = true;
      delete req.session.formErrors;
    } else if (req.session.matchError !== undefined) {
      pageValues.matchError = req.session.matchError;
      pageValues.clear = true;
      delete req.session.matchError;
    }
  }
  return pageValues;
}

function languageGet(req, res) {
  if (req.params.language) {
    languageHelper.setLocale(req, req.params.language);
  }
  res.redirect('/auth');
}

function authPageGet(req, res) {
  if (req.session.userPassedAuth === undefined) {
    const pageValues = resetErrorState(req);
    res.render('pages/auth-page', pageValues);
  } else {
    deleteSession.destroySessionExcludingLangauge(req);
    res.redirect('auth');
  }
}

function authPageProcess(req, res) {
  const errors = validation.authValidation(req.body);
  if (Object.keys(errors).length === 0) {
    if (req.body.address === 'no') {
      res.redirect('auth-error-address');
    } else {
      const postObjectBody = auth.authFormToObject(req.body);
      const keyServiceCall = requestHelper.generateGetCall(`${res.locals.customerApiGateway}/key/${postObjectBody.inviteKey}`, {});
      request(keyServiceCall)
        .then(() => {
          const claimServiceCall = requestHelper.generateGetCall(
            `${res.locals.customerApiGateway}/claim/claimexists/${postObjectBody.inviteKey}`,
            {},
          );
          claimServiceCall.simple = false;
          claimServiceCall.resolveWithFullResponse = true;
          return request(claimServiceCall);
        })
        .then((claimDetails) => {
          if (claimDetails.statusCode !== 404) {
            throw claimDetails;
          }
          const customerServiceCall = requestHelper.generateGetCall(
            `${res.locals.customerApiGateway}/customer/${postObjectBody.inviteKey}`,
            {},
          );
          return request(customerServiceCall);
        })
        .then((customerDetails) => {
          redirectToNextStep(req, res, customerDetails, postObjectBody);
        })
        .catch((err) => {
          redirectToAuthErrorOrDisplayPage(err, req, res);
        });
    }
  } else {
    req.session.formErrors = true;
    req.session.requestDetails = req.body;
    res.redirect('auth');
  }
}

function authErrorInvitationCode(req, res) {
  const page = { backHref: 'auth' };
  res.render('pages/auth-error-invitation-code', { page });
}

function authErrorAddress(req, res) {
  const page = { backHref: 'auth' };
  res.render('pages/auth-error-address', { page });
}

module.exports.languageGet = languageGet;
module.exports.authPageGet = authPageGet;
module.exports.authPageProcess = authPageProcess;
module.exports.authErrorInvitationCode = authErrorInvitationCode;
module.exports.authErrorAddress = authErrorAddress;
module.exports.redirectToAuthErrorOrDisplayPage = redirectToAuthErrorOrDisplayPage;
module.exports.redirectToNextStep = redirectToNextStep;
module.exports.getSessionLanguage = getSessionLanguage;
