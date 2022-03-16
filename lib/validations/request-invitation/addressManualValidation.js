const i18n = require('i18next');

const errorHelper = require('../../utils/errorHelper');

const generalHelper = require('../utils/general');

const error = (field, type) => ({
  text: i18n.t(`request-invitation-address-manual:fields.${field}.errors.${type}`),
  visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
});

const required = (form, field) => form === undefined || form[field] === undefined || form[field] === '';

const addressLine1 = (postRequest) => {
  const field = 'addressLine1';
  const errors = {};

  if (required(postRequest, field)) {
    errors[field] = {
      ...error(field, 'required'),
    };
  } else if (!generalHelper.checkIfValidBuildingNameNumber(postRequest[field])) {
    errors[field] = {
      ...error(field, 'format'),
    };
  } else if (generalHelper.checkIfGreaterThenThirtyFive(postRequest[field])) {
    errors[field] = {
      ...error(field, 'length'),
    };
  }

  return errors;
};

const addressLine2 = (postRequest) => {
  const field = 'addressLine2';
  const errors = {};

  if (required(postRequest, field)) {
    errors[field] = {
      ...error(field, 'required'),
    };
  } else if (!generalHelper.checkIfValidStreet(postRequest[field])) {
    errors[field] = {
      ...error(field, 'format'),
    };
  } else if (generalHelper.checkIfGreaterThenThirtyFive(postRequest[field])) {
    errors[field] = {
      ...error(field, 'length'),
    };
  }

  return errors;
};

const addressTown = (postRequest) => {
  const field = 'addressTown';
  const errors = {};

  if (required(postRequest, field)) {
    errors[field] = {
      ...error(field, 'required'),
    };
  } else if (!generalHelper.checkIfValidTown(postRequest[field])) {
    errors[field] = {
      ...error(field, 'format'),
    };
  } else if (generalHelper.checkIfGreaterThenThirtyFive(postRequest[field])) {
    errors[field] = {
      ...error(field, 'length'),
    };
  }

  return errors;
};

const addressPostcode = (postRequest) => {
  const field = 'addressPostcode';
  const errors = {};

  if (required(postRequest, field)) {
    errors[field] = {
      ...error(field, 'required'),
    };
  } else if (!generalHelper.isValidUkPostcode(postRequest[field])) {
    errors[field] = {
      ...error(field, 'format'),
    };
  }

  return errors;
};

const validator = (postRequest, lang) => {
  i18n.changeLanguage(lang);

  const errorSummary = [];
  const errors = {
    ...addressLine1(postRequest),
    ...addressLine2(postRequest),
    ...addressTown(postRequest),
    ...addressPostcode(postRequest),
  };

  if (errors.addressLine1 !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('addressLine1', 'addressLine1', errors.addressLine1.text));
  }
  if (errors.addressLine2 !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('addressLine2', 'addressLine2', errors.addressLine2.text));
  }
  if (errors.addressTown !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('addressTown', 'addressTown', errors.addressTown.text));
  }
  if (errors.addressPostcode !== undefined) {
    errorSummary.push(errorHelper.generateGlobalErrorGenericField('addressPostcode', 'addressPostcode', errors.addressPostcode.text));
  }

  if (Object.keys(errors).length !== 0) {
    errors.errorSummary = errorSummary;
  }

  return errors;
};

module.exports = {
  validator,
};
