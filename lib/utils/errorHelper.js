module.exports = {
  generateGlobalError(type, fieldName, errorText) {
    return {
      href: `#${fieldName}`,
      text: errorText,
    };
  },
  generateGlobalErrorNoFieldLabel(type, fieldName, errorText) {
    return { link: fieldName, text: errorText };
  },
  generateGlobalErrorSuppliedLabel(fieldName, errorLabel, errorText) {
    return { href: `#${fieldName}`, text: errorText };
  },
  generateGlobalErrorGenericField(type, fieldName, errorText) {
    return {
      href: `#${fieldName}`,
      text: errorText,
    };
  },
  generateGlobalErrorGenericGroup(type, fieldName, errorText) {
    return {
      href: `#${fieldName}`,
      text: errorText,
    };
  },
  generateGlobalErrorGenericFieldLink(link, type, fieldName, errorText) {
    return {
      href: `#${link}`,
      text: errorText,
    };
  },
};
