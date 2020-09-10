module.exports = {
  generateGlobalError(type, fieldName, errorText, dataJourney) {
    return {
      href: `#${fieldName}`,
      text: errorText,
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
