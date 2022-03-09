const i18n = require('i18next');

const errorHelper = require('../../utils/errorHelper');

const generalHelper = require('../utils/general');

const error = (field, type) => ({
  text: i18n.t(`request-invitation-name:fields.${field}.errors.${type}`),
  visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
});

const validator = (postRequest, lang) => {
  const errors = {};
  const errorSummary = [];
  i18n.changeLanguage(lang);

  if (postRequest === undefined || postRequest.firstName === undefined || postRequest.firstName === '') {
    errors.firstName = {
      ...error('firstName', 'required'),
    };
  } else if (!generalHelper.checkFirstNameCharacters(postRequest.firstName)) {
    errors.firstName = {
      ...error('firstName', 'format'),
    };
  } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.firstName)) {
    errors.firstName = {
      ...error('firstName', 'length'),
    };
  }

  if (errors.firstName !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('firstName', 'firstName', errors.firstName.text));
  }

  if (postRequest === undefined || postRequest.lastName === undefined || postRequest.lastName === '') {
    errors.lastName = {
      ...error('lastName', 'required'),
    };
  } else if (!generalHelper.checkLastNameCharacters(postRequest.lastName)) {
    errors.lastName = {
      ...error('lastName', 'format'),
    };
  } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.lastName)) {
    errors.lastName = {
      ...error('lastName', 'length'),
    };
  }

  if (errors.lastName !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('lastName', 'lastName', errors.lastName.text));
  }

  if (Object.keys(errors).length !== 0) {
    errors.errorSummary = errorSummary;
  }

  return errors;
};

module.exports = {
  validator,
};
