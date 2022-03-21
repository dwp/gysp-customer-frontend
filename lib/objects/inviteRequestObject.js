const moment = require('moment');
const { isNumeric } = require('../validations/utils/general.js');
const { findAddressByUprn } = require('../helpers/addressServiceHelper');

function formatDate(year, month, day) {
  const date = `${year}-${month}-${day}`;
  return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD').concat('T00:00:00.000Z');
}

const manualAddress = (details) => {
  const {
    addressLine1,
    addressLine2,
    addressTown,
    addressPostcode,
  } = details;

  const building = () => {
    const obj = {
      buildingName: null,
      buildingNumber: null,
    };
    if (isNumeric(addressLine1)) {
      return { ...obj, buildingNumber: addressLine1 };
    }
    return { ...obj, buildingName: addressLine1 };
  };

  const singleLine = () => {
    const line1 = addressLine1.replace(/,/g, '%');

    // combine address lines 1 and 2  if address line 1 isNumeric
    let lineOneAndTwo = [line1, addressLine2];
    if (isNumeric(addressLine1)) {
      lineOneAndTwo = [`${line1} ${addressLine2}`];
    }

    const lines = [
      ...lineOneAndTwo,
      addressTown,
      addressPostcode,
    ];

    return {
      singleLine: lines.join(', '),
    };
  };

  return {
    ...building(),
    ...singleLine(),
    thoroughfareName: addressLine2,
    postTown: addressTown,
    postCode: addressPostcode,
    unmatchedAddress: true,
    uprn: null,
  };
};

const selectAddress = (details, addressLookup) => {
  const addressData = findAddressByUprn(details.uprn, addressLookup);
  const { street, sourceData } = addressData;

  // deconstruct thoroughfare and dependentThoroughfare from street
  // depending on length of array, use source data as default
  let { thoroughfare, dependentThoroughfare } = sourceData;
  if (street.length === 1) {
    [thoroughfare] = street;
  } else if (street.length === 2) {
    [dependentThoroughfare, thoroughfare] = street;
  }

  // post town can sometime be null use sourceData if is
  const postTown = addressData.postTown === null ? sourceData.townName : addressData.postTown;

  return {
    buildingName: addressData.buildingName || null,
    subBuildingName: addressData.subBuilding || null,
    buildingNumber: addressData.buildingNumber || null,
    dependentLocality: addressData.sourceData.dependentLocality || null,
    thoroughfareName: thoroughfare || null,
    dependentThoroughfareName: dependentThoroughfare || null,
    postTown: postTown || null,
    postCode: addressData.postcode || null,
    singleLine: addressData.singleLine || null,
    uprn: addressData.uprn || null,
    unmatchedAddress: false,
  };
};

const name = (details) => {
  if (details && details['request-invitation-name']) {
    const { firstName, lastName } = details['request-invitation-name'];
    return {
      forename: firstName,
      surname: lastName,
    };
  }
  return {};
};

const dob = (details) => {
  if (details && details['request-invitation-dob']) {
    const { dateYear, dateMonth, dateDay } = details['request-invitation-dob'];
    return {
      dob: formatDate(dateYear, dateMonth, dateDay),
    };
  }
  return {};
};

const address = (details) => {
  let residentialAddress = {};
  if (details && details['request-invitation-address-manual']) {
    residentialAddress = manualAddress(details['request-invitation-address-manual']);
  } else if (details && details['request-invitation-address-choose']) {
    residentialAddress = selectAddress(
      details['request-invitation-address-choose'],
      details.addressLookup,
    );
  }
  return {
    residentialAddress,
  };
};

module.exports = {
  sessionToObject(details) {
    return {
      ...name(details),
      ...dob(details),
      ...address(details),
    };
  },
};
