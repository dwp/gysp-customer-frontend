const { assert } = require('chai');
const countryHelper = require('../../../../lib/utils/countriesHelper');
const countryListFull = require('../../../resource/countries.json');

const countrySet1 = {
  'country-name[0]': 'France', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const countrySet2 = {
  'country-name[0]': 'France', 'country-name[1]': 'Germany', 'country-name[2]': '', 'country-name[3]': '',
};
const countrySet3 = {
  'country-name[0]': 'France', 'country-name[1]': 'Germany', 'country-name[2]': 'Portugal', 'country-name[3]': '',
};
const countrySet4 = {
  'country-name[0]': 'France', 'country-name[1]': 'Germany', 'country-name[2]': 'Portugal', 'country-name[3]': 'Belgium',
};
const countrySet5 = {
  'country-name[0]': 'Madagascar', 'country-name[1]': 'Afghanistan', 'country-name[2]': 'Alderney', 'country-name[3]': 'Japan',
};

const countryUrl = [{ name: 'France', url: 'france' }, { name: 'Germany', url: 'germany' }];

const countrySet6 = {
  'country-name[0]': 'Austria', 'country-name[1]': 'Afghanistan', 'country-name[2]': 'Alderney', 'country-name[3]': 'Japan',
};

describe('Countries Helper ', () => {
  it('should return only countries with insurance or residance set as true', () => {
    const countryListFilter = countryHelper.returnOnlyInsuranceAndResidanceCountries(countryListFull);
    assert.lengthOf(countryListFilter, 48);
  });
  it('should return only countries with insurance set as true', () => {
    const countryListFilter = countryHelper.returnOnlyInsuranceCountries(countryListFull);
    assert.lengthOf(countryListFilter, 45);
  });
  it('should return index of country in array', () => {
    const index = countryHelper.returnIndexOfCountry('germany', countryUrl);
    assert.equal(index, 1);
  });
  it('should filter out empty countries when passed', () => {
    const countryListWithOneCountry = countryHelper.returnFilteredListOfCountries(countrySet1, countryListFull);
    assert.lengthOf(countryListWithOneCountry, 1);
    const countryListWithTwoCountry = countryHelper.returnFilteredListOfCountries(countrySet2, countryListFull);
    assert.lengthOf(countryListWithTwoCountry, 2);
    const countryListWithThreeCountry = countryHelper.returnFilteredListOfCountries(countrySet3, countryListFull);
    assert.lengthOf(countryListWithThreeCountry, 3);
    const countryListWithFourCountry = countryHelper.returnFilteredListOfCountries(countrySet4, countryListFull);
    assert.lengthOf(countryListWithFourCountry, 4);
  });
  it('should filter out none redidancey/insurance based countries when passed', () => {
    const emptyCountryList = countryHelper.returnFilteredListOfCountries(countrySet5, countryListFull);
    assert.lengthOf(emptyCountryList, 0);
  });
  it('should filter out none insurance based countries when passed', () => {
    const countryList = countryHelper.returnFilteredListInsuranceCountries(countrySet6, countryListFull);
    assert.lengthOf(countryList, 1);
  });
});
