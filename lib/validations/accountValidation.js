const i18n = require('i18next');
const validator = require('validator');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

const validAccountNumberLength = 8;
const validSortCodeLength = 2;
const maxRollLength = 18;

function isSortCodeEmpty(field1, field2, field3) {
  if (field1 === '' || field2 === '' || field3 === '') {
    return true;
  }
  return false;
}

function isSortCodeNumeric(field1, field2, field3) {
  if (!validator.isNumeric(`${field1}`, { no_symbols: true })
    || !validator.isNumeric(`${field2}`, { no_symbols: true })
    || !validator.isNumeric(`${field3}`, { no_symbols: true })) {
    return false;
  }
  return true;
}

function isSortCodeValidLength(field1, field2, field3) {
  if (field1.length !== validSortCodeLength || field2.length !== validSortCodeLength || field3.length !== validSortCodeLength) {
    return false;
  }
  return true;
}

module.exports = {
  accountValidator(postRequest, lang) {
    i18n.changeLanguage(lang);
    let errors = this.paymentValidator(postRequest);
    if (Object.keys(errors).length === 0) {
      if (postRequest.paymentMethod === 'bank') {
        errors = this.bankValidation(postRequest);
      }
      if (postRequest.paymentMethod === 'building') {
        errors = this.buildingValidation(postRequest);
      }
    }
    return errors;
  },
  paymentValidator(postRequest) {
    const errors = [];
    const errorSummary = [];

    if (!generalHelper.isBankOrBuilding(postRequest.paymentMethod)) {
      errors.paymentMethod = {
        text: i18n.t('account:fields.paymentMethod.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.paymentMethod !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalError(
          'account',
          'paymentMethod-bank',
          errors.paymentMethod.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: 'bank', FIELD: 'or-building-society' }),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  bankValidation(postRequest) {
    const errors = [];
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

    if (isSortCodeEmpty(postRequest.bankSortCodeField1, postRequest.bankSortCodeField2, postRequest.bankSortCodeField3)) {
      errors.bankSortCode = {
        text: i18n.t('account:fields.sortCode.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!isSortCodeNumeric(postRequest.bankSortCodeField1, postRequest.bankSortCodeField2, postRequest.bankSortCodeField3)) {
      errors.bankSortCode = {
        text: i18n.t('account:fields.sortCode.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!isSortCodeValidLength(postRequest.bankSortCodeField1, postRequest.bankSortCodeField2, postRequest.bankSortCodeField3)) {
      errors.bankSortCode = {
        text: i18n.t('account:fields.sortCode.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.bankSortCode !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'bankSortCodeField1',
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

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  buildingValidation(postRequest) {
    const errors = [];
    const errorSummary = [];

    if (postRequest.buildingAccountHolder === '') {
      errors.buildingAccountHolder = {
        text: i18n.t('account:fields.accountHolder.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkSurnameCharactersAndAmpersand(postRequest.buildingAccountHolder)) {
      errors.buildingAccountHolder = {
        text: i18n.t('account:fields.accountHolder.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (generalHelper.checkIfGreaterThenSeventy(postRequest.buildingAccountHolder)) {
      errors.buildingAccountHolder = {
        text: i18n.t('account:fields.accountHolder.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.buildingAccountHolder !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'buildingAccountHolder',
          'account',
          'accountHolder',
          errors.buildingAccountHolder.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'account-holder' }),
        ),
      );
    }

    if (postRequest.buildingAccountNumber === '') {
      errors.buildingAccountNumber = {
        text: i18n.t('account:fields.accountNumber.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!validator.isNumeric(postRequest.buildingAccountNumber, { no_symbols: true })) {
      errors.buildingAccountNumber = {
        text: i18n.t('account:fields.accountNumber.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (postRequest.buildingAccountNumber.length !== validAccountNumberLength) {
      errors.buildingAccountNumber = {
        text: i18n.t('account:fields.accountNumber.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (isSortCodeEmpty(postRequest.buildingSortCodeField1, postRequest.buildingSortCodeField2, postRequest.buildingSortCodeField3)) {
      errors.buildingSortCode = {
        text: i18n.t('account:fields.sortCode.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!isSortCodeNumeric(
      postRequest.buildingSortCodeField1,
      postRequest.buildingSortCodeField2,
      postRequest.buildingSortCodeField3,
    )) {
      errors.buildingSortCode = {
        text: i18n.t('account:fields.sortCode.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!isSortCodeValidLength(
      postRequest.buildingSortCodeField1,
      postRequest.buildingSortCodeField2,
      postRequest.buildingSortCodeField3,
    )) {
      errors.buildingSortCode = {
        text: i18n.t('account:fields.sortCode.errors.length'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.buildingSortCode !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'buildingSortCodeField1',
          'account',
          'sortCode',
          errors.buildingSortCode.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'sort-code' }),
        ),
      );
    }

    if (errors.buildingAccountNumber !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorGenericFieldLink(
          'buildingAccountNumber',
          'account',
          'accountNumber',
          errors.buildingAccountNumber.text,
          i18n.t('google-analytics:pages.account-details.error', { TYPE: postRequest.paymentMethod, FIELD: 'account-number' }),
        ),
      );
    }

    if (postRequest.buildingRoll !== '') {
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
