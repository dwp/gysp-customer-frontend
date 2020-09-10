const i18n = require('i18next');
const validator = require('validator');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

function validateTelephoneNumber(fieldName, value) {
  if (value === '') {
    return i18n.t(`contact:fields.${fieldName}.errors.required`);
  }
  if (generalHelper.checkIfValidTelephoneNumberWithSpaces(value)) {
    return i18n.t(`contact:fields.${fieldName}.errors.format`);
  }
  if (generalHelper.checkIfGreaterThenSeventy(value)) {
    return i18n.t(`contact:fields.${fieldName}.errors.length`);
  }
  return undefined;
}

module.exports = {
  detailsValidation(postRequest, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.changeLanguage(lang);

    if (postRequest.cbHomeTelephoneNumber || postRequest.cbMobileTelephoneNumber || postRequest.cbWorkTelephoneNumber) {
      if (postRequest.cbHomeTelephoneNumber) {
        const homePhoneError = validateTelephoneNumber('homeTelephoneNumber', postRequest.homeTelephoneNumber);
        if (homePhoneError) {
          errors.homeTelephoneNumber = {
            text: homePhoneError,
            visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
          };
        }
        if (errors.homeTelephoneNumber !== undefined) {
          errorSummary.push(
            errorHelper.generateGlobalErrorGenericField(
              'contact',
              'homeTelephoneNumber',
              errors.homeTelephoneNumber.text,
              i18n.t('google-analytics:pages.contact-details.error', { FIELD: 'home-telephone-number' }),
            ),
          );
        }
      }
      if (postRequest.cbMobileTelephoneNumber) {
        const mobilePhoneError = validateTelephoneNumber('mobileTelephoneNumber', postRequest.mobileTelephoneNumber);
        if (mobilePhoneError) {
          errors.mobileTelephoneNumber = {
            text: mobilePhoneError,
            visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
          };
        }
        if (errors.mobileTelephoneNumber !== undefined) {
          errorSummary.push(
            errorHelper.generateGlobalErrorGenericField(
              'contact',
              'mobileTelephoneNumber',
              errors.mobileTelephoneNumber.text,
              i18n.t('google-analytics:pages.contact-details.error', { FIELD: 'mobile-telephone-number' }),
            ),
          );
        }
      }
      if (postRequest.cbWorkTelephoneNumber) {
        const workPhoneError = validateTelephoneNumber('workTelephoneNumber', postRequest.workTelephoneNumber);
        if (workPhoneError) {
          errors.workTelephoneNumber = {
            text: workPhoneError,
            visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
          };
        }
        if (errors.workTelephoneNumber !== undefined) {
          errorSummary.push(
            errorHelper.generateGlobalErrorGenericField(
              'contact',
              'workTelephoneNumber',
              errors.workTelephoneNumber.text,
              i18n.t('google-analytics:pages.contact-details.error', { FIELD: 'work-telephone-number' }),
            ),
          );
        }
      }
    } else {
      errors.overAll = {
        text: i18n.t('contact:fields.checkbox.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericGroup(
          'contact',
          'cbHomeTelephoneNumber',
          errors.overAll.text,
          i18n.t('google-analytics:pages.contact-details.error', { FIELD: 'global' }),
        ),
      );
    }

    if (postRequest.email !== '') {
      if (!validator.isEmail(postRequest.email, { allow_utf8_local_part: false })) {
        errors.email = {
          text: i18n.t('contact:fields.email.errors.format'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      } else if (generalHelper.checkIfGreaterThenOneHundred(postRequest.email)) {
        errors.email = {
          text: i18n.t('contact:fields.email.errors.length'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      }
    }

    if (errors.email !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericField(
          'contact',
          'email',
          errors.email.text,
          i18n.t('google-analytics:pages.contact-details.error', { FIELD: 'email' }),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
