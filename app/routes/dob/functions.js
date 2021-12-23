const got = require('got');
const { StatusCodes } = require('http-status-codes');

const dateFormatter = require('../../../lib/helpers/dateFormatter');
const requestHelper = require('../../../lib/helpers/requestHelper');
const validation = require('../../../lib/validations/dobValidation');
const statePensionDate = require('../../../lib/objects/statePensionDateObject');
const dateHelper = require('../../../lib/helpers/dateHelper');

const dataStore = require('../../../lib/dataStore');
const filterRequest = require('../../../lib/utils/requestHelper');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

const redirectSuccessFullURL = 'your-state-pension-date';
const revisedStatePensionURL = 'revised-your-state-pension-date';
const redirectTooEarly = 'you-are-too-early-to-get-your-state-pension';
const redirectBefore = 'call-us-to-get-your-state-pension';
const redirectCheckAndChange = 'check-your-details';

const dobStatusVerified = 'V';

const claimStatus = {
  NSP_CLAIM: 'Non state pension customer',
  MATURE_CLAIM: 'Mature claim',
  PRE_MATURE_CLAIM: 'Pre-Mature claim',
};

function checkAndResetSession(userDateOfBirthInfo) {
  const session = userDateOfBirthInfo;
  if (userDateOfBirthInfo.newDobVerification) {
    delete session.newDobVerification;
  }
  if (userDateOfBirthInfo.newStatePensionDate) {
    delete session.newStatePensionDate;
  }
  return session;
}

function getNewStatePensionDate(req, res) {
  return new Promise((resolve, reject) => {
    const statePensionObject = statePensionDate.toObject(req.session.customerDetails.gender, req.body);
    const statePensionAgeCall = requestHelper.generatePostCall(
      `${res.locals.customerServiceApiGateway}/customer/recalculateSpaDate`,
      statePensionObject,
    );
    got(statePensionAgeCall).then(({ body }) => {
      let url = revisedStatePensionURL;
      if (body.message === claimStatus.NSP_CLAIM) {
        url = redirectBefore;
      } else if (body.message === claimStatus.PRE_MATURE_CLAIM) {
        url = redirectTooEarly;
      }
      resolve({ redirectURL: url, statePensionDate: body.spaDate });
    }).catch((err) => {
      const traceID = requestHelper.getTraceID(err);
      requestHelper.infoLoggingHelper(err, '/api/customer/recalculateSpaDate', traceID, res.locals.logger, req.session.inviteKey);
      reject(err);
    });
  });
}

function dobConfirm(req, res) {
  if (req.session.customerDetails.dobVerification === dobStatusVerified) {
    res.redirect(redirectSuccessFullURL);
  } else {
    checkChangeHelper.checkAndSetEditMode(req, 'dob-details');
    const details = dataStore.get(req, 'dob-details');
    res.render('pages/dob-confirm', { details });
  }
}

async function dobConfirmRedirect(req, res) {
  const errors = validation.dobValidator(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/dob-confirm', { errors, details: req.body });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'dob-details');
    const filteredRequest = filterRequest.requestFilter(filterRequest.dob(), req.body);
    const checkSessionHasntChanged = checkChangeHelper.checkSessionHasntChanged(req, 'dob-details', filteredRequest);
    if (editMode && checkSessionHasntChanged) {
      res.redirect(redirectCheckAndChange);
    } else {
      req.session.userDateOfBirthInfo = checkAndResetSession(req.session.userDateOfBirthInfo);
      dataStore.checkAndSave(req, 'dob-details', filteredRequest);
      const compare = validation.dobCompare(req.body, req.session.customerDetails.dob);
      if (compare) {
        req.session.isBeforeSpa = true;
        if (dateHelper.isDateBeforeToday(req.session.customerDetails.statePensionDate)) {
          req.session.isBeforeSpa = false;
        }
        req.session.userDateOfBirthInfo = {
          newDobVerification: dobStatusVerified,
          newStatePensionDate: req.session.customerDetails.statePensionDate,
        };
        res.redirect(revisedStatePensionURL);
      } else {
        try {
          const nspDateResponse = await getNewStatePensionDate(req, res);
          if (nspDateResponse.statePensionDate !== null) {
            req.session.userDateOfBirthInfo = { newStatePensionDate: nspDateResponse.statePensionDate };
            req.session.isBeforeSpa = true;
            if (dateHelper.isDateBeforeToday(nspDateResponse.statePensionDate)) {
              req.session.isBeforeSpa = false;
            }
          }
          res.redirect(nspDateResponse.redirectURL);
        } catch (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR);
          res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
        }
      }
    }
  }
}

function beforePensionAgeGet(req, res) {
  res.render('pages/state-pension-age-before');
}

function tooEarlyForPensionGet(req, res) {
  let newStatePensionDate = false;
  if (req.session.userDateOfBirthInfo.newStatePensionDate) {
    newStatePensionDate = dateFormatter.statePensionDate(req.session.userDateOfBirthInfo.newStatePensionDate);
  }
  res.render('pages/state-pension-age-too-early', { statePensionDate: newStatePensionDate });
}

function dobProofGet(req, res) {
  res.render('pages/dob-proof');
}

module.exports.tooEarlyForPensionGet = tooEarlyForPensionGet;
module.exports.beforePensionAgeGet = beforePensionAgeGet;
module.exports.dobConfirmRedirect = dobConfirmRedirect;
module.exports.dobConfirm = dobConfirm;
module.exports.dobProofGet = dobProofGet;
module.exports.getNewStatePensionDate = getNewStatePensionDate;
