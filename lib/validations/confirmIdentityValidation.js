const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

i18n.init({
  sendMissingTo: 'fallback',
});

module.exports = {
  authTypeValidation(postRequest, lang) {
    i18n.setLng(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.authType === undefined) {
      errors.authType = {
        text: i18n.t('confirm-identity:fields.authType.errors.required'),
      };
    }

    if (!generalHelper.isValidAuthType(postRequest.authType)) {
      errors.authType = {
        text: i18n.t('confirm-identity:fields.authType.errors.required'),
      };
    }

    if (errors.authType !== undefined) {
      errorSummary.push(errorHelper.generateGlobalErrorGenericField('confirm-identity', 'authType', errors.authType.text));
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
