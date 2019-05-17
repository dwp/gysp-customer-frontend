const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  accountValidator(postRequest, lang) {
    i18n.setLng(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.accountHolder === '') {
      errors.accountHolder = {
        text: i18n.t('account-overseas:fields.accountHolder.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkSurnameCharactersAndAmpersand(postRequest.accountHolder)) {
      errors.accountHolder = {
        text: i18n.t('account-overseas:fields.accountHolder.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.accountHolder)) {
      errors.accountHolder = {
        text: i18n.t('account-overseas:fields.accountHolder.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.accountHolder !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'accountHolder',
          'account-overseas',
          'accountHolder',
          errors.accountHolder.text,
          i18n.t('google-analytics:pages.account-details-overseas.error', { FIELD: 'account-name-overseas' }),
        ),
      );
    }

    if (postRequest.accountNumber === '') {
      errors.accountNumber = {
        text: i18n.t('account-overseas:fields.accountNumber.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkIfValidRollNumber(postRequest.accountNumber)) {
      errors.accountNumber = {
        text: i18n.t('account-overseas:fields.accountNumber.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.accountNumber)) {
      errors.accountNumber = {
        text: i18n.t('account-overseas:fields.accountNumber.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.accountNumber !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'accountNumber',
          'account-overseas',
          'accountNumber',
          errors.accountNumber.text,
          i18n.t('google-analytics:pages.account-details-overseas.error', { FIELD: 'account-number-overseas' }),
        ),
      );
    }

    if (postRequest.accountCode === '') {
      errors.accountCode = {
        text: i18n.t('account-overseas:fields.accountCode.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkIfValidRollNumber(postRequest.accountCode)) {
      errors.accountCode = {
        text: i18n.t('account-overseas:fields.accountCode.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.accountCode)) {
      errors.accountCode = {
        text: i18n.t('account-overseas:fields.accountCode.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.accountCode !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'accountCode',
          'account-overseas',
          'accountCode',
          errors.accountCode.text, i18n.t('google-analytics:pages.account-details-overseas.error', { FIELD: 'bank-or-branch-overseas' }),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
