const i18n = require('i18next');
const { generateGlobalErrorGenericField } = require('../utils/errorHelper');
const { checkIfYesOrNo } = require('./utils/general');

const validator = (postRequest, lang) => {
  const errors = {};

  if (!checkIfYesOrNo(postRequest.hasInvitationCode)) {
    i18n.changeLanguage(lang);

    errors.hasInvitationCode = {
      text: i18n.t('invitation-code:fields.hasInvitationCode.errors.required'),
      visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
    };

    errors.errorSummary = [
      generateGlobalErrorGenericField('invitation-code', 'hasInvitationCode-yes', errors.hasInvitationCode.text),
    ];
  }

  return errors;
};

module.exports = {
  validator,
};
