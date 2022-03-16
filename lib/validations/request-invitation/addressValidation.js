const i18n = require('i18next');

const errorHelper = require('../../utils/errorHelper');

const generalHelper = require('../utils/general');

const error = (field, type) => ({
  text: i18n.t(`request-invitation-address:fields.${field}.errors.${type}`),
  visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
});

const validator = (postRequest, lang) => {
  const errors = {};
  const errorSummary = [];
  i18n.changeLanguage(lang);

  if (postRequest === undefined || postRequest.nameNumber === undefined || postRequest.nameNumber === '') {
    errors.nameNumber = {
      ...error('nameNumber', 'required'),
    };
  } else if (!generalHelper.checkIfValidBuildingNameNumber(postRequest.nameNumber)) {
    errors.nameNumber = {
      ...error('nameNumber', 'format'),
    };
  } else if (generalHelper.checkIfGreaterThenThirtyFive(postRequest.nameNumber)) {
    errors.nameNumber = {
      ...error('nameNumber', 'length'),
    };
  }

  if (errors.nameNumber !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('nameNumber', 'nameNumber', errors.nameNumber.text));
  }

  if (postRequest === undefined || postRequest.postcode === undefined || postRequest.postcode === '') {
    errors.postcode = {
      ...error('postcode', 'required'),
    };
  } else if (!generalHelper.isValidUkPostcode(postRequest.postcode)) {
    errors.postcode = {
      ...error('postcode', 'format'),
    };
  }

  if (errors.postcode !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('postcode', 'postcode', errors.postcode.text));
  }

  if (Object.keys(errors).length !== 0) {
    errors.errorSummary = errorSummary;
  }

  return errors;
};

module.exports = {
  validator,
};
