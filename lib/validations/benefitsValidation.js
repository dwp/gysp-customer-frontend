const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

i18n.init({
  sendMissingTo: 'fallback',
});

module.exports = {
  benefitsValidation(postRequest, lang) {
    i18n.setLng(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.receivingBenefits === undefined) {
      errors.receivingBenefits = {
        text: i18n.t('benefits:fields.receivingBenefits.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (!generalHelper.checkIfYesOrNo(postRequest.receivingBenefits)) {
      errors.receivingBenefits = {
        text: i18n.t('benefits:fields.receivingBenefits.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.receivingBenefits !== undefined) {
      errorSummary.push(errorHelper.generateGlobalErrorGenericGroup('benefits', 'receivingBenefits-yes', errors.receivingBenefits.text));
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
