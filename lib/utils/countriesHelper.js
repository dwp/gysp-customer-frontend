const _ = require('lodash');
const getSlug = require('speakingurl');

module.exports = {
  returnOnlyInsuranceAndResidanceCountries(countryList) {
    return _.filter(countryList, (o) => o.residence || o.insurance);
  },
  returnOnlyInsuranceCountries(countryList) {
    return _.filter(countryList, (o) => o.insurance);
  },
  returnIndexOfCountry(country, selectedCountryList) {
    return _.findIndex(selectedCountryList, (o) => o.url === country);
  },
  returnIndexOfCountryByName(country, selectedCountryList) {
    return _.findIndex(selectedCountryList, (o) => o.name === country);
  },
  returnFilteredListOfCountries(filteredRequest, countryList, beforeSpa) {
    let countriesFiltered = countryList;
    if (beforeSpa) {
      countriesFiltered = this.returnOnlyInsuranceAndResidanceCountries(countryList);
    }
    const countryDetails = [];
    let i = 0;
    Object.keys(filteredRequest).forEach((key) => {
      if (filteredRequest[key] !== '' && _.findIndex(countriesFiltered, { name: filteredRequest[key] }) !== -1) {
        countryDetails[i] = { name: filteredRequest[key], url: getSlug(filteredRequest[key]) };
        i++;
      }
    });

    return countryDetails;
  },
  returnFilteredListInsuranceCountries(filteredRequest, countryList, beforeSpa) {
    let countriesFiltered = countryList;
    if (beforeSpa) {
      countriesFiltered = this.returnOnlyInsuranceCountries(countryList);
    }
    const countryDetails = [];
    let i = 0;
    Object.keys(filteredRequest).forEach((key) => {
      if (filteredRequest[key] !== '' && _.findIndex(countriesFiltered, { name: filteredRequest[key] }) !== -1) {
        countryDetails[i] = { name: filteredRequest[key], url: getSlug(filteredRequest[key]) };
        i++;
      }
    });

    return countryDetails;
  },
};
