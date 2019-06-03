const i18n = require('i18next');
const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

module.exports = {
  authValidation(postRequest, lang, isOverseas) {
    i18n.setLng(lang);
    const errors = [];
    const errorSummary = [];

    if (postRequest.inviteKey === '') {
      errors.inviteKey = {
        text: i18n.t('auth:fields.inviteKey.errors.required'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    } else if (!generalHelper.checkInviteKeyCharacters(postRequest.inviteKey)) {
      errors.inviteKey = {
        text: i18n.t('auth:fields.inviteKey.errors.format'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      };
    }

    if (errors.inviteKey !== undefined) {
      errorSummary.push(errorHelper.generateGlobalErrorGenericField('auth', 'inviteKey', errors.inviteKey.text));
    }

    if (!generalHelper.checkIfYesOrNo(postRequest.address)) {
      if (isOverseas) {
        errors.address = {
          text: i18n.t('auth:fields.address-overseas.errors.required'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      } else {
        errors.address = {
          text: i18n.t('auth:fields.address.errors.required'),
          visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
        };
      }
    }

    if (errors.address !== undefined) {
      if (isOverseas) {
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel('address-yes', i18n.t('auth:fields.address-overseas.legend'), errors.address.text),
        );
      } else {
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel('address-yes', i18n.t('auth:fields.address.legend'), errors.address.text),
        );
      }
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
};
