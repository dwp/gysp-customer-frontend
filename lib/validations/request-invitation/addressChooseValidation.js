const i18n = require('i18next');

const errorHelper = require('../../utils/errorHelper');

const validator = (postRequest, lang) => {
  const errors = {};
  const errorSummary = [];
  i18n.changeLanguage(lang);

  if (postRequest === undefined || postRequest.uprn === undefined || postRequest.uprn === '') {
    errors.uprn = {
      text: i18n.t('request-invitation-address-choose:fields.uprn.errors.required'),
      visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
    };

    errorSummary.push(errorHelper.generateGlobalErrorGenericField('uprn', 'uprn', errors.uprn.text));
  }

  if (Object.keys(errors).length !== 0) {
    errors.errorSummary = errorSummary;
  }

  return errors;
};

module.exports = {
  validator,
};
