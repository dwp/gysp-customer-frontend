const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

i18n.init({
  sendMissingTo: 'fallback',
});

module.exports = {
  personalDataValidation(postRequest, lang) {
    i18n.setLng(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.personalDataPermission === undefined) {
      errors.personalDataPermission = {
        text: i18n.t('personal-data:fields.personalDataPermission.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (!generalHelper.checkIfYesOrNo(postRequest.personalDataPermission)) {
      errors.personalDataPermission = {
        text: i18n.t('personal-data:fields.personalDataPermission.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.personalDataPermission !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericGroup(
          'personal-data',
          'personalDataPermission',
          errors.personalDataPermission.text,
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
