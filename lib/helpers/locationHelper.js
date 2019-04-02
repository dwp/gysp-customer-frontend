const removeSpaces = new RegExp(/ +/g);

module.exports = {
  isNorthernIreland(postcode) {
    if (postcode === undefined) {
      return false;
    }
    let formatPostcode = postcode.replace(removeSpaces, '');
    formatPostcode = formatPostcode.toUpperCase();
    const matches = formatPostcode.match(/^[a-z]{1,2}/i);
    if (matches !== null && matches[0] === 'BT') {
      return true;
    }

    return false;
  },
  isOverseas(locationData) {
    const locationDataParsed = this.edgescapeParser(locationData);
    if (locationDataParsed.country_code) {
      const countryCode = locationDataParsed.country_code.toUpperCase();
      if (countryCode !== 'GB') {
        return true;
      }
    }
    return false;
  },
  edgescapeParser(edgescape) {
    return edgescape.split(',')
      .map(pair => pair.split('='))
      .reduce((object, value) => {
        const formattedObject = object;
        const key = value[0].trim();
        formattedObject[key] = value[1].trim();
        return formattedObject;
      }, {});
  },
};
