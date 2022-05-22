const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general');

i18n.init({
  sendMissingTo: 'fallback',
});

module.exports = {
  cookieValidation(postRequest, lang) {
    i18n.changeLanguage(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.cookieConsent === undefined
      || (postRequest.cookieConsent !== undefined && !generalHelper.checkIfYesOrNo(postRequest.cookieConsent))) {
      errors.cookieConsent = {
        text: i18n.t('cookies:fields.cookieConsent.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.cookieConsent !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericGroup(
          'cookies',
          'cookieConsent',
          errors.cookieConsent.text,
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
