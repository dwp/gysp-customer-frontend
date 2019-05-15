const i18n = require('i18next');

i18n.init({ sendMissingTo: 'fallback' });

module.exports = {
  generateGlobalError(type, fieldName, errorText, dataJourney) {
    return {
      href: `#${fieldName}`,
      text: `${i18n.t(`${type}:fields.${fieldName}.label-display`)} - ${errorText}`,
      attributes: { 'data-journey': dataJourney },
    };
  },
  generateGlobalErrorNoFieldLabel(type, fieldName, errorText) {
    return { link: fieldName, text: errorText };
  },
  generateGlobalErrorSuppliedLabel(fieldName, errorLabel, errorText, dataJourney) {
    return { href: `#${fieldName}`, text: errorText, attributes: { 'data-journey': dataJourney } };
  },
  generateGlobalErrorGenericField(type, fieldName, errorText, dataJourney) {
    return {
      href: `#${fieldName}`,
      text: errorText,
      attributes: { 'data-journey': dataJourney },
    };
  },
  generateGlobalErrorGenericGroup(type, fieldName, errorText, dataJourney) {
    return {
      href: `#${fieldName}`,
      text: errorText,
      attributes: { 'data-journey': dataJourney },
    };
  },
  generateGlobalErrorGenericFieldLink(link, type, fieldName, errorText, dataJourney) {
    return {
      href: `#${link}`,
      text: errorText,
      attributes: { 'data-journey': dataJourney },
    };
  },
};
