const moment = require('moment');
const i18n = require('i18next');
const dateFormatter = require('../../../lib/helpers/dateFormatter');

const numberWeeksToDisplayData = 9;

function claimFromDateCheckAndNumberOfWeeks(claimFromDate, statePensionDateToUse) {
  if (claimFromDate !== undefined) {
    const claimFromDateConverted = dateFormatter.startOfDay(claimFromDate.dateYear, claimFromDate.dateMonth, claimFromDate.dateDay);
    return claimFromDateConverted.diff(statePensionDateToUse, 'weeks', true);
  }
  return undefined;
}

function whatHappensNextText(req) {
  i18n.changeLanguage(req.session.lang);

  let verifiedDOB = true;
  let statePensionDateToUse = moment(req.session.customerDetails.statePensionDate, 'x').startOf('day');
  if (req.session.userDateOfBirthInfo.newStatePensionDate) {
    const newStatePensionDateMomentObject = moment(req.session.userDateOfBirthInfo.newStatePensionDate, 'x').startOf('day');
    verifiedDOB = false;
    if (statePensionDateToUse.isSame(newStatePensionDateMomentObject)) {
      verifiedDOB = true;
    }
    statePensionDateToUse = moment(req.session.userDateOfBirthInfo.newStatePensionDate, 'x').startOf('day');
  }

  // Further Info
  if (verifiedDOB === true
  && req.session.isBeforeSpa === false
  && claimFromDateCheckAndNumberOfWeeks(req.session.claimFromDate, statePensionDateToUse) === undefined
  ) {
    return i18n.t('complete:p1.start-date-from.more-than-9-weeks');
  }

  if (verifiedDOB === true
  && req.session.isBeforeSpa === false
  && claimFromDateCheckAndNumberOfWeeks(req.session.claimFromDate, statePensionDateToUse) > numberWeeksToDisplayData) {
    return i18n.t('complete:p1.start-date-from.more-than-9-weeks');
  }

  // Call you
  if (claimFromDateCheckAndNumberOfWeeks(req.session.claimFromDate, statePensionDateToUse) <= numberWeeksToDisplayData) {
    return i18n.t('complete:p1.start-date-from.less-than-9-weeks');
  }

  // Overseas
  if (req.session.isOverseas) {
    return i18n.t('complete:p1.overseas');
  }

  // 14 Days
  if (verifiedDOB === true) {
    return i18n.t('complete:p1.default');
  }

  return false;
}

function completePage(req, res) {
  req.session['claim-data-for-audit'] = 'SUBMITTED';
  let showAddtionalDiscliamer = false;
  const date = dateFormatter.applicationDate(req.session.lang);
  const redirected = req.session.redirectComplete;
  if (req.session.userDateOfBirthInfo.newStatePensionDate && req.session.userDateOfBirthInfo.newDobVerification !== 'V') {
    showAddtionalDiscliamer = true;
  }
  const whatHappensNext = whatHappensNextText(req);
  res.render('pages/complete.html', {
    date, redirected, showAddtionalDiscliamer, whatHappensNext,
  });
}

module.exports.completePage = completePage;
module.exports.whatHappensNextText = whatHappensNextText;
