const dateFormatter = require('../helpers/dateFormatter');

function formatAddress(address) {
  const formattedAddress = [];

  if (address.subBuildingName) {
    formattedAddress.push(address.subBuildingName);
  }
  if (address.buildingName) {
    formattedAddress.push(address.buildingName);
  }
  if (address.buildingNumber) {
    formattedAddress.push(address.buildingNumber);
  }
  if (address.dependentThoroughfareName) {
    formattedAddress.push(address.dependentThoroughfareName);
  }
  if (address.thoroughfareName) {
    formattedAddress.push(address.thoroughfareName);
  }
  if (address.dependentLocality) {
    formattedAddress.push(address.dependentLocality);
  }
  if (address.postTown) {
    formattedAddress.push(address.postTown);
  }
  if (address.postCode) {
    formattedAddress.push(address.postCode);
  }
  return formattedAddress;
}

module.exports = {
  verifyUserObject(details) {
    const json = {};
    json.name = `${details.firstName} ${details.surname}`;
    json.dob = dateFormatter.humanReadableDate(details.dob);
    json.addressLines = formatAddress(details.residentialAddress);
    return json;
  },
};
