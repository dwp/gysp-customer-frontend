const i18n = require('i18next');
const moment = require('moment');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  dobValidator(postRequest, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (postRequest.dateDay === '' || postRequest.dateMonth === '' || postRequest.dateYear === '') {
      errors.date = {
        text: i18n.t('dob-confirmation:fields.dob.errors.empty'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.isDateValid(postRequest.dateDay, postRequest.dateMonth, postRequest.dateYear)) {
      errors.date = {
        text: i18n.t('dob-confirmation:fields.dob.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.isDateAfterToday(postRequest.dateDay, postRequest.dateMonth, postRequest.dateYear)) {
      errors.date = {
        text: i18n.t('dob-confirmation:fields.dob.errors.future'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.date !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'date-day',
          i18n.t('dob-confirmation:header'),
          errors.date.text,
          i18n.t('google-analytics:pages.dob-confirmation.error'),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  dobCompare(postRequest, dateOfBirth) {
    const formattedDateOfBirth = moment(dateOfBirth).format('D MMMM YYYY');
    const formattedUserInput = moment(`${postRequest.dateYear}-${postRequest.dateMonth}-${postRequest.dateDay}`, 'YYYY-MM-DD')
      .format('D MMMM YYYY');
    if (formattedDateOfBirth === formattedUserInput) {
      return true;
    }
    return false;
  },
};
