const i18n = require('i18next');

const { dayMonthYearSlash } = require('../helpers/dateFormatter');
const { addressLookupFormatter, manualAddress } = require('../helpers/addressServiceHelper');

const address = (details) => {
  let residentialAddress = null;
  if (details && details['request-invitation-address-manual']) {
    residentialAddress = manualAddress(details['request-invitation-address-manual']);
  } else if (details && details['request-invitation-address-choose']) {
    residentialAddress = addressLookupFormatter(
      details['request-invitation-address-choose'],
      details.addressLookup,
    );
  }
  return residentialAddress;
};

const formatter = (formData) => {
  const {
    'request-invitation-name': riName = null,
    'request-invitation-dob': riDob = null,
  } = formData || Object.create(null);

  return {
    name: riName ? `${riName.firstName} ${riName.lastName}` : null,
    dob: riDob ? dayMonthYearSlash(riDob.dateYear, riDob.dateMonth, riDob.dateDay) : null,
    address: address(formData),
  };
};

const row = (fieldName, value, htmlValue) => ({
  key: {
    text: i18n.t(`request-invitation-check-details:keys.${fieldName}`),
    classes: 'govuk-!-width-one-third',
  },
  value: {
    text: value,
    html: htmlValue,
  },
});

module.exports = {
  requestFilter(formData, lang) {
    i18n.changeLanguage(lang);

    const details = formatter(formData);

    return [
      row('name', details.name),
      row('dob', details.dob),
      row('address', null, details.address),
    ];
  },
};
