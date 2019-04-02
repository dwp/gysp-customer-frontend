const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  detailsValidation(postRequest, lang) {
    i18n.setLng(lang);
    const errors = [];
    const errorSummary = [];

    if (!generalHelper.checkIfYesOrNo(postRequest.address)) {
      errors.address = {
        text: i18n.t('verify-your-details:fields.address.errors.required'),
      };
    }

    if (errors.address !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel('address', i18n.t('verify-your-details:fields.address.legend'), errors.address.text),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
