const crypto = require('crypto');
const got = require('got');
const { StatusCodes } = require('http-status-codes');

const config = require('../../../config/application');

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
  if (error.response && (error.response.statusCode === StatusCodes.NOT_FOUND || error.response.statusCode === StatusCodes.OK)) {
    const attempts = getSessionCount(req);
    if (sessionHelper.checkAuthAttemptLimits(attempts)) {
      requestHelper.infoLoggingHelper({ message: 'three attempts' }, uriPath, traceID, res.locals.logger, req.body.inviteKey);
      deleteSessionCounts(req);
      res.redirect('auth-error-invitation-code');
    } else {
      requestHelper.infoLoggingHelper(error, uriPath, traceID, res.locals.logger, req.body.inviteKey);
      req.session.matchError = true;
      req.session.requestDetails = req.body;
      res.redirect('auth');
    }
  } else {
    requestHelper.errorLoggingHelper(error, uriPath, traceID, res.locals.logger, req.body.inviteKey);
    res.status(StatusCodes.OK);
    res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
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

function keyServiceRequest(req, res, postObjectBody) {
  return new Promise((resolve, reject) => {
    const { keyServiceApiGateway } = res.locals;
    const keyServiceCall = requestHelper.generateGetCall(`${keyServiceApiGateway}/key/${postObjectBody.inviteKey}`);
    got(keyServiceCall).then(() => {
      resolve(true);
    }).catch((err) => {
      reject(err);
    });
  });
}

function customerServiceRequest(req, res, postObjectBody) {
  return new Promise((resolve, reject) => {
    const { customerServiceApiGateway } = res.locals;
    const customerServiceCall = requestHelper.generateGetCall(`${customerServiceApiGateway}/customer/${postObjectBody.inviteKey}`);
    got(customerServiceCall).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function authPageProcess(req, res) {
  const errors = validation.authValidation(req.body);
  if (Object.keys(errors).length === 0) {
    if (req.body.address === 'no') {
      res.redirect('auth-error-address');
    } else {
      const postObjectBody = auth.authFormToObject(req.body);
      try {
        const customerDetails = await Promise.all([
          keyServiceRequest(req, res, postObjectBody),
          customerServiceRequest(req, res, postObjectBody),
        ]);
        redirectToNextStep(req, res, customerDetails[1].body, postObjectBody);
      } catch (err) {
        redirectToAuthErrorOrDisplayPage(err, req, res);
      }
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

function getNoInviteCodeDropout(req, res) {
  const page = { backHref: 'auth' };
  res.render('pages/auth-no-invite-code', { page });
}

module.exports.languageGet = languageGet;
module.exports.authPageGet = authPageGet;
module.exports.authPageProcess = authPageProcess;
module.exports.authErrorInvitationCode = authErrorInvitationCode;
module.exports.authErrorAddress = authErrorAddress;
module.exports.redirectToAuthErrorOrDisplayPage = redirectToAuthErrorOrDisplayPage;
module.exports.redirectToNextStep = redirectToNextStep;
module.exports.getSessionLanguage = getSessionLanguage;
module.exports.getNoInviteCodeDropout = getNoInviteCodeDropout;
