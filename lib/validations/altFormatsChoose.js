const i18n = require('i18next');

const ALLOWED_ALT_FORMATS = [
  'audioCassette',
  'audioCd',
  'audioMp3',
  'braille',
  'largePrint',
];

const oneOfTheValidOptionsSelected = (selection) => ALLOWED_ALT_FORMATS.includes(selection);

const validate = (selection, lang) => {
  const fieldLevelErrors = {};
  const errorSummary = [];
  if (!oneOfTheValidOptionsSelected(selection)) {
    i18n.changeLanguage(lang);
    const err = {
      text: i18n.t('alt-formats-choose:fields.error'),
      href: '#audioCassette',
    };
    errorSummary.push(err);
    fieldLevelErrors.altFormatsChoice = err;
  }
  return {
    errorSummary,
    fieldLevelErrors,
  };
};

module.exports = {
  validate,
  ALLOWED_ALT_FORMATS,
};
