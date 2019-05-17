const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  selectionValidation(postRequest, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (!generalHelper.checkIfValidMaritalStatus(postRequest.maritalStatus)) {
      errors.maritalStatus = {
        text: i18n.t('marital-select:fields.maritalStatus.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericField(
          'marital-select',
          'maritalStatus',
          errors.maritalStatus.text,
          i18n.t('google-analytics:pages.marital-select.error'),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  dateValidator(postRequest, type, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (postRequest.dateDay === '' || postRequest.dateMonth === '' || postRequest.dateYear === '') {
      errors.date = {
        text: i18n.t('marital-date:fields.date.errors.empty'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.isDateValid(postRequest.dateDay, postRequest.dateMonth, postRequest.dateYear)) {
      errors.date = {
        text: i18n.t('marital-date:fields.date.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.isDateAfterToday(postRequest.dateDay, postRequest.dateMonth, postRequest.dateYear)) {
      errors.date = {
        text: i18n.t('marital-date:fields.date.errors.future'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.date !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'date',
          i18n.t(`marital-date:header.${type}`),
          errors.date.text,
          i18n.t(`google-analytics:pages.marital-date.${type}`),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  partnerValidator(postRequest, type, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (generalHelper.isThisUndefinedOrEmtpy(postRequest.firstName)) {
      errors.firstName = {
        text: i18n.t('marital-details:fields.firstName.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkSurnameCharacters(postRequest.firstName)) {
      errors.firstName = {
        text: i18n.t('marital-details:fields.firstName.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.firstName)) {
      errors.firstName = {
        text: i18n.t('marital-details:fields.firstName.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.firstName !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalError(
          'marital-details',
          'firstName',
          errors.firstName.text,
          i18n.t(`google-analytics:pages.marital-partner.${type}.error`, { FIELD: 'firstname' }),
        ),
      );
    }

    if (generalHelper.isThisUndefinedOrEmtpy(postRequest.surname)) {
      errors.surname = {
        text: i18n.t('marital-details:fields.surname.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkSurnameCharacters(postRequest.surname)) {
      errors.surname = {
        text: i18n.t('marital-details:fields.surname.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.surname)) {
      errors.surname = {
        text: i18n.t('marital-details:fields.surname.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.surname !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericField(
          'marital-details',
          'surname',
          errors.surname.text,
          i18n.t(`google-analytics:pages.marital-partner.${type}.error`, { FIELD: 'lastname' }),
        ),
      );
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(postRequest.otherName) && !generalHelper.checkSurnameCharacters(postRequest.otherName)) {
      errors.otherName = {
        text: i18n.t('marital-details:fields.otherName.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.isThisUndefinedOrEmtpy(postRequest.otherName)
      && generalHelper.checkIfGreaterThenSeventy(postRequest.otherName)) {
      errors.otherName = {
        text: i18n.t('marital-details:fields.otherName.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.otherName !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericField(
          'marital-details',
          'otherName',
          errors.otherName.text,
          i18n.t(`google-analytics:pages.marital-partner.${type}.error`, { FIELD: 'other-name' }),
        ),
      );
    }

    if (postRequest.dobDay !== '' || postRequest.dobMonth !== '' || postRequest.dobYear !== '') {
      if (!generalHelper.isDateValid(postRequest.dobDay, postRequest.dobMonth, postRequest.dobYear)) {
        errors.dob = {
          text: i18n.t('marital-details:fields.dob.errors.format'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      } else if (generalHelper.isDateAfterToday(postRequest.dobDay, postRequest.dobMonth, postRequest.dobYear)) {
        errors.dob = {
          text: i18n.t('marital-details:fields.dob.errors.future'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      }
    }

    if (errors.dob !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericGroup(
          'marital-details',
          'dob',
          errors.dob.text,
          i18n.t(`google-analytics:pages.marital-partner.${type}.error`, { FIELD: 'date-of-birth' }),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
