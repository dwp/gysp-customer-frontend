const i18n = require('i18next');
const validator = require('validator');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

const validAccountNumberLength = 8;
const validSortCodeLength = 6;
const maxRollLength = 18;

function isSortCodeEmpty(sortCode) {
  return sortCode === undefined || sortCode === '';
}

function isSortCodeNumeric(sortCode) {
  return validator.isNumeric(`${sortCode}`, { no_symbols: true });
}

function isSortCodeValidLength(sortCode) {
  return sortCode.length === validSortCodeLength;
}

module.exports = {
  accountValidator(postRequest, lang) {
    i18n.changeLanguage(lang);
    return this.bankValidation(postRequest);
  },
  bankValidation(postRequest) {
    const errors = {};
    const errorSummary = [];

    if (postRequest.bankAccountHolder === '') {
      errors.bankAccountHolder = {
        text: i18n.t('account:fields.accountHolder.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkSurnameCharactersAndAmpersand(postRequest.bankAccountHolder)) {
      errors.bankAccountHolder = {
        text: i18n.t('account:fields.accountHolder.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.bankAccountHolder)) {
      errors.bankAccountHolder = {
        text: i18n.t('account:fields.accountHolder.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.bankAccountHolder !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'bankAccountHolder',
          'account',
          'accountHolder',
          errors.bankAccountHolder.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'account-holder' }),
        ),
      );
    }

    if (postRequest.bankAccountNumber === '') {
      errors.bankAccountNumber = {
        text: i18n.t('account:fields.accountNumber.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!validator.isNumeric(postRequest.bankAccountNumber, { no_symbols: true })) {
      errors.bankAccountNumber = {
        text: i18n.t('account:fields.accountNumber.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (postRequest.bankAccountNumber.length !== validAccountNumberLength) {
      errors.bankAccountNumber = {
        text: i18n.t('account:fields.accountNumber.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (isSortCodeEmpty(postRequest.bankSortCode)) {
      errors.bankSortCode = {
        text: i18n.t('account:fields.sortCode.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!isSortCodeNumeric(postRequest.bankSortCode)) {
      errors.bankSortCode = {
        text: i18n.t('account:fields.sortCode.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!isSortCodeValidLength(postRequest.bankSortCode)) {
      errors.bankSortCode = {
        text: i18n.t('account:fields.sortCode.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.bankSortCode !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'bankSortCode',
          'account',
          'sortCode',
          errors.bankSortCode.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'sort-code' }),
        ),
      );
    }

    if (errors.bankAccountNumber !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'bankAccountNumber',
          'account',
          'accountNumber',
          errors.bankAccountNumber.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'account-number' }),
        ),
      );
    }

    if (postRequest.buildingRoll && postRequest.buildingRoll !== '') {
      if (!generalHelper.checkIfValidRollNumber(postRequest.buildingRoll)) {
        errors.buildingRoll = {
          text: i18n.t('account:fields.buildingRoll.errors.format'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      } else if (postRequest.buildingRoll.length > maxRollLength) {
        errors.buildingRoll = {
          text: i18n.t('account:fields.buildingRoll.errors.length'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      }
    }

    if (errors.buildingRoll !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'buildingRoll',
          'account',
          'buildingRoll',
          errors.buildingRoll.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'roll-number' }),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
