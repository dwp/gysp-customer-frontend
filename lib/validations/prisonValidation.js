const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general');

module.exports = {
  prisonValidation(postRequest, date, lang) {
    i18n.changeLanguage(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.spentTimeInPrison === undefined) {
      errors.spentTimeInPrison = {
        text: i18n.t('prison:fields.spentTimeInPrison.errors.required', { DATE: date }),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (!generalHelper.checkIfYesOrNo(postRequest.spentTimeInPrison)) {
      errors.spentTimeInPrison = {
        text: i18n.t('prison:fields.spentTimeInPrison.errors.required', { DATE: date }),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.spentTimeInPrison !== undefined) {
      errorSummary.push(errorHelper.generateGlobalErrorGenericField('prison', 'spentTimeInPrison-yes', errors.spentTimeInPrison.text));
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
