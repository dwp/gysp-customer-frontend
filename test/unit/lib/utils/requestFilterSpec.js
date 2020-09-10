const { assert } = require('chai');
const requestHelper = require('../../../../lib/utils/requestHelper');

const request = {
  fields1: true, fields2: true, field3: true, fields4: true,
};

describe('Request Helper ', () => {
  describe(' requestFilter ', () => {
    it('should return fields1 and fields2 when requested', () => {
      const object = requestHelper.requestFilter(['fields1', 'fields2'], request);
      assert.ok(object.fields1);
    });
  });

  describe(' forms fields', () => {
    it('calling livedAbroadFields() should return only 1 field with valid value', () => {
      const livedAbroadFields = requestHelper.livedAbroad();
      assert.ok(livedAbroadFields.length, 1);
      assert.include(livedAbroadFields, 'livedAbroad');
    });

    it('calling livedAbroadCountries() should return only 4 field with valid value', () => {
      const livedAbroadFieldsDetails = requestHelper.livedAbroadCountries();
      assert.ok(livedAbroadFieldsDetails.length, 4);
      assert.include(livedAbroadFieldsDetails, 'dateFromMonth');
      assert.include(livedAbroadFieldsDetails, 'dateFromYear');
      assert.include(livedAbroadFieldsDetails, 'dateToYear');
      assert.include(livedAbroadFieldsDetails, 'dateToMonth');
    });

    it('calling countries() should return only 4 field with valid value', () => {
      const countriesSelect = requestHelper.countries();
      assert.include(countriesSelect, 'country-name[0]');
      assert.include(countriesSelect, 'country-name[1]');
      assert.include(countriesSelect, 'country-name[2]');
      assert.include(countriesSelect, 'country-name[3]');
    });

    it('calling workedAbroadFields() should return only 1 field with valid value', () => {
      const workedAbroadFields = requestHelper.workedAbroad();
      assert.ok(workedAbroadFields.length, 1);
      assert.include(workedAbroadFields, 'workedAbroad');
    });

    it('calling workedAbroadCountries() should return only 5 field with valid value', () => {
      const workedAbroadCountries = requestHelper.workedAbroadCountries();
      assert.ok(workedAbroadCountries.length, 5);
      assert.include(workedAbroadCountries, 'dateFromMonth');
      assert.include(workedAbroadCountries, 'dateFromYear');
      assert.include(workedAbroadCountries, 'dateToYear');
      assert.include(workedAbroadCountries, 'dateToMonth');
      assert.include(workedAbroadCountries, 'referenceNumber');
    });

    it('calling maritalSelect() should return only 1 field with valid value', () => {
      const maritalSelect = requestHelper.maritalSelect();
      assert.ok(maritalSelect.length, 1);
      assert.include(maritalSelect, 'maritalStatus');
    });

    it('calling maritalDate() should return only 3 field with valid value', () => {
      const maritalDate = requestHelper.maritalDate();
      assert.ok(maritalDate.length, 3);
      assert.include(maritalDate, 'dateDay');
      assert.include(maritalDate, 'dateMonth');
      assert.include(maritalDate, 'dateYear');
    });

    it('calling contactDetails() should return only 7 field with valid value', () => {
      const contactDetails = requestHelper.contactDetails();
      assert.ok(contactDetails.length, 7);
      assert.include(contactDetails, 'cbHomeTelephoneNumber');
      assert.include(contactDetails, 'cbMobileTelephoneNumber');
      assert.include(contactDetails, 'cbWorkTelephoneNumber');
      assert.include(contactDetails, 'email');
    });

    it('calling paymentDetails() should return only 6 field with valid value', () => {
      const paymentDetails = requestHelper.paymentDetails();
      assert.ok(paymentDetails.length, 13);
      assert.include(paymentDetails, 'paymentMethod');

      assert.include(paymentDetails, 'buildingAccountHolder');
      assert.include(paymentDetails, 'buildingAccountNumber');
      assert.include(paymentDetails, 'buildingSortCodeField1');
      assert.include(paymentDetails, 'buildingSortCodeField2');
      assert.include(paymentDetails, 'buildingSortCodeField3');
      assert.include(paymentDetails, 'buildingRoll');

      assert.include(paymentDetails, 'bankAccountHolder');
      assert.include(paymentDetails, 'bankAccountNumber');
      assert.include(paymentDetails, 'bankSortCodeField1');
      assert.include(paymentDetails, 'bankSortCodeField2');
      assert.include(paymentDetails, 'bankSortCodeField3');
    });
  });
});
