const i18n = require('i18next');
const { checkIfYesOrNo } = require('./utils/general');

const validate = (selection, lang) => {
  const fieldLevelErrors = {};
  const errorSummary = [];
  if (!checkIfYesOrNo(selection)) {
    i18n.changeLanguage(lang);
    const err = {
      text: i18n.t('alt-formats:fields.error'),
      href: '#altFormat-Yes',
    };
    errorSummary.push(err);
    fieldLevelErrors.altFormat = err;
  }

  return {
    errorSummary,
    fieldLevelErrors,
  };
};

module.exports = {
  validate,
};
