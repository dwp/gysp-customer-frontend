const dateFormatter = require('../../../lib/helpers/dateFormatter');
const validation = require('../../../lib/validations/startDateValidation');

const dataStore = require('../../../lib/dataStore');
const filterRequest = require('../../../lib/utils/requestHelper');
const dateHelper = require('../../../lib/helpers/dateHelper');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

const maximumNumberOfMonthForClaim = 4;

function checkAndResetSession(req) {
  if (req.session.claimFromDate) {
    delete req.session.claimFromDate;
  }
}

function checkBeforeOrAfterSpa(req) {
  if (req.session.isBeforeSpa) {
    return 'beforeSpa';
  }
  return 'afterSpa';
}

function currentStatePensionDate(req) {
  if (req.session.userDateOfBirthInfo && req.session.userDateOfBirthInfo.newStatePensionDate) {
    return req.session.userDateOfBirthInfo.newStatePensionDate;
  }
  return req.session.customerDetails.statePensionDate;
}

function textToDisplay(req) {
  if (req.session.userDateOfBirthInfo && req.session.userDateOfBirthInfo.newStatePensionDate) {
    return 'user';
  }
  return 'system';
}

function statePensionStartDateRedirect(req, editMode) {
  if (editMode) {
    return 'check-your-details';
  }
  if (req.session.isOverseas) {
    return 'where-have-you-lived-outside-the-uk';
  }
  return 'have-you-ever-lived-outside-of-the-uk';
}

function getStatePensionStartDate(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'claim-from-date');
  const statePensionDateToUse = currentStatePensionDate(req);
  const statePensionDate = dateFormatter.statePensionDate(statePensionDateToUse, req.session.lang);
  const details = dataStore.get(req, 'claimFromDate');
  const beforeOrAfterSpa = checkBeforeOrAfterSpa(req);
  const displayText = textToDisplay(req);
  res.render('pages/state-pension-start-date.html', {
    details, statePensionDate, displayText, beforeOrAfterSpa,
  });
}

function postStatePensionStartDate(req, res) {
  const statePensionDateToUse = currentStatePensionDate(req);
  const beforeOrAfterSpa = checkBeforeOrAfterSpa(req);
  const displayText = textToDisplay(req);
  const errors = validation.claimFromDateValidation(req.body, statePensionDateToUse, beforeOrAfterSpa, req.session.lang);
  if (Object.keys(errors).length > 0) {
    const statePensionDate = dateFormatter.statePensionDate(statePensionDateToUse, req.session.lang);
    res.render('pages/state-pension-start-date.html', {
      errors, details: req.body, statePensionDate, displayText, beforeOrAfterSpa,
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'claim-from-date');
    checkAndResetSession(req);
    const isMoreThan4MonthAway = validation.isDateMoreThanXMonthAway(req.body, maximumNumberOfMonthForClaim);
    if (isMoreThan4MonthAway === true) {
      res.redirect('your-claim-date');
    } else {
      const filteredRequest = filterRequest.requestFilter(filterRequest.claimFromDate(), req.body);
      const claimFromDate = dateFormatter.dateSectionsToUnixDate(
        filteredRequest.dateYear,
        filteredRequest.dateMonth,
        filteredRequest.dateDay,
      );
      req.session.numberOfDaysBetweenSpaAndClaimFromDate = dateHelper.numberOfDaysBetweenDates(statePensionDateToUse, claimFromDate);
      dataStore.checkAndSave(req, 'claimFromDate', filteredRequest, editMode);
      const nextPageRedirect = statePensionStartDateRedirect(req, editMode);
      res.redirect(nextPageRedirect);
    }
  }
}

function getStatePensionStartDateError(req, res) {
  const editMode = checkChangeHelper.isEditMode(req, 'claim-from-date');
  let startPensionDatePage = '/your-state-pension-date';
  if (req.session.userDateOfBirthInfo && req.session.userDateOfBirthInfo.newStatePensionDate) {
    startPensionDatePage = '/revised-your-state-pension-date';
  }
  if (editMode) {
    startPensionDatePage = '/when-do-you-want-your-state-pension';
  }
  res.render('pages/state-pension-start-date-error.html', { startPensionDatePage });
}

module.exports.getStatePensionStartDate = getStatePensionStartDate;
module.exports.postStatePensionStartDate = postStatePensionStartDate;
module.exports.getStatePensionStartDateError = getStatePensionStartDateError;
