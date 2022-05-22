const i18n = require('i18next');
const errorHelper = require('../../utils/errorHelper');
const generalHelper = require('../utils/general');

const emptyError = (type) => ({
  text: i18n.t(`request-invitation-dob:fields.dob.errors.empty.${type}`),
  visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
});

module.exports = {
  dobValidator(postRequest, lang) {
    const errors = {};
    const errorSummary = [];
    let errorAnchorID = 'date-day';
    i18n.changeLanguage(lang);

    const { dateDay, dateMonth, dateYear } = postRequest || Object.create(null);

    if (dateDay === '' && dateMonth !== '' && dateYear !== '') {
      errors.date = emptyError('day');
      errors.dateDay = true;
    } else if (dateMonth === '' && dateDay !== '' && dateYear !== '') {
      errors.date = emptyError('month');
      errors.dateMonth = true;
      errorAnchorID = 'date-month';
    } else if (dateYear === '' && dateDay !== '' && dateMonth !== '') {
      errors.date = emptyError('year');
      errors.dateYear = true;
      errorAnchorID = 'date-year';
    } else if (dateDay === '' || dateMonth === '' || dateYear === '') {
      errors.date = emptyError('all');
      errors.dateDay = true;
      errors.dateMonth = true;
      errors.dateYear = true;
    } else if (!generalHelper.isDateValid(dateDay, dateMonth, dateYear)) {
      errors.date = {
        text: i18n.t('request-invitation-dob:fields.dob.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
      errors.dateDay = true;
      errors.dateMonth = true;
      errors.dateYear = true;
    } else if (generalHelper.isDateAfterToday(dateDay, dateMonth, dateYear)) {
      errors.date = {
        text: i18n.t('request-invitation-dob:fields.dob.errors.future'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
      errors.dateDay = true;
      errors.dateMonth = true;
      errors.dateYear = true;
    }

    if (errors.date !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          errorAnchorID,
          i18n.t('request-invitation-dob:header'),
          errors.date.text,
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
