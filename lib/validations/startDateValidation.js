const i18n = require('i18next');
const moment = require('moment');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  claimFromDateValidation(postRequest, statePensionDate, beforeOrAfterSpa, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    let gaValue;
    if (postRequest.dateDay === '' || postRequest.dateMonth === '' || postRequest.dateYear === '') {
      gaValue = 'enter-a-date';
      errors.date = {
        text: i18n.t(`pension-start-date:${beforeOrAfterSpa}.fields.claimFromDate.errors.empty`),
      };
    } else if (!generalHelper.isDateValid(postRequest.dateDay, postRequest.dateMonth, postRequest.dateYear)) {
      gaValue = 'enter-a-valid-date';
      errors.date = {
        text: i18n.t(`pension-start-date:${beforeOrAfterSpa}.fields.claimFromDate.errors.format`),
      };
    } else if (this.isBeforeStatePensionDate(postRequest, statePensionDate)) {
      gaValue = 'date-cannot-be-before-your-state-pension-date';
      errors.date = {
        text: i18n.t(`pension-start-date:${beforeOrAfterSpa}.fields.claimFromDate.errors.before`),
      };
    }

    if (errors.date !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'date',
          i18n.t(`pension-start-date:${beforeOrAfterSpa}.fields.claimFromDate.legend`),
          errors.date.text,
          i18n.t('google-analytics:pages.pension-start-date.error', { VALUE: gaValue }),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  isBeforeStatePensionDate(postRequest, statePensionDate) {
    const date = moment(`${postRequest.dateYear}-${postRequest.dateMonth}-${postRequest.dateDay}`, 'YYYY-MM-DD');
    return date.isBefore(statePensionDate, 'day');
  },
  isDateMoreThanXMonthAway(postRequest, months) {
    const todayDate = moment();
    const formattedDate = moment(`${postRequest.dateYear}-${postRequest.dateMonth}-${postRequest.dateDay}`, 'YYYY-MM-DD');
    if (formattedDate.diff(todayDate, 'months', true) > months) {
      return true;
    }
    return false;
  },
};
