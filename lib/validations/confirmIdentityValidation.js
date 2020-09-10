const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  authTypeValidation(postRequest, lang) {
    i18n.changeLanguage(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.authType === undefined) {
      errors.authType = {
        text: i18n.t('confirm-identity:fields.authType.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (!generalHelper.isValidAuthType(postRequest.authType)) {
      errors.authType = {
        text: i18n.t('confirm-identity:fields.authType.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.authType !== undefined) {
      errorSummary.push(errorHelper.generateGlobalErrorGenericField('confirm-identity', 'authType-invite', errors.authType.text));
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
