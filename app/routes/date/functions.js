const dateFormatter = require('../../../lib/helpers/dateFormatter');

function statePensionAgeNextPage(req) {
  if (req.session.isOverseas) {
    return '/where-have-you-lived-outside-the-uk';
  }
  if (!req.session.isBeforeSpa) {
    return '/have-you-spent-any-time-in-prison';
  }
  return '/have-you-ever-lived-outside-of-the-uk';
}

function statePensionAgeGet(req, res) {
  const statePensionDateToUse = req.session.customerDetails.statePensionDate;
  const statePensionDate = dateFormatter.statePensionDate(statePensionDateToUse, req.session.lang);
  const nextPage = statePensionAgeNextPage(req);
  res.render('pages/state-pension-date.html', {
    statePensionDate, startPensionDatePage: '/when-do-you-want-your-state-pension', nextPage, displayText: 'system',
  });
}

function statePensionAgeRevisedGet(req, res) {
  const statePensionDate = dateFormatter.statePensionDate(req.session.userDateOfBirthInfo.newStatePensionDate, req.session.lang);
  const nextPage = statePensionAgeNextPage(req);
  res.render('pages/state-pension-date.html', {
    statePensionDate, startPensionDatePage: '/when-do-you-want-your-state-pension', nextPage, displayText: 'user',
  });
}

module.exports.statePensionAgeGet = statePensionAgeGet;
module.exports.statePensionAgeRevisedGet = statePensionAgeRevisedGet;
