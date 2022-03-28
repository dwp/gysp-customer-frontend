const i18n = require('i18next');

function manualAddress(selectedAddress) {
  return [{
    divider: i18n.t('request-invitation-address-choose:fields.uprn.or'),
  }, {
    text: i18n.t('request-invitation-address-choose:fields.uprn.manual'),
    value: 'manual',
    checked: selectedAddress === 'manual',
  }];
}

function excludeAlternateSingleLine(item) {
  if (item.alternateSingleLine && item.singleLine) {
    const [singleLine1] = item.singleLine.split(',');
    const [alternateSingleLine1] = item.alternateSingleLine.split(',');
    // If address line 1 is the same sack it off
    if (singleLine1 === alternateSingleLine1) {
      return true;
    }
    // If whole address is the same sack it off
    if (item.singleLine === item.alternateSingleLine) {
      return true;
    }

    return false;
  }

  return true;
}

function alternateSingleLine(item, selectedAddress) {
  const value = `${item.uprn}-alt`;
  if (excludeAlternateSingleLine(item)) {
    return null;
  }

  const option = {
    value,
    text: item.alternateSingleLine,
  };
  if (selectedAddress !== undefined && value === selectedAddress) {
    option.checked = true;
  }

  return option;
}

module.exports = {
  addressList(addressResults, selectedAddress, includeAlternate) {
    if (!Array.isArray(addressResults)) {
      throw new Error(`Expected addressResults to be array got: ${typeof addressResults}`);
    }
    const addressList = addressResults.map((item) => {
      const address = [{
        value: item.uprn,
        text: item.singleLine,
      }];

      if (selectedAddress !== undefined && item.uprn === selectedAddress) {
        address[0].checked = true;
      }

      if (includeAlternate) {
        const alternateOption = alternateSingleLine(item, selectedAddress);
        if (alternateOption) {
          address.push(alternateOption);
        }
      }

      return address;
    }).flat();

    addressList.push(...manualAddress(selectedAddress));
    return addressList;
  },
};
