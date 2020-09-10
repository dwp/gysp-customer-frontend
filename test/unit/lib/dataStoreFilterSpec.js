const { assert } = require('chai');
const dataStore = require('../../../lib/dataStore');

let data = {};
let dataContact = {};

describe('Data store filter ', () => {
  describe(' filterAccountDetails  ', () => {
    beforeEach(() => {
      data = {
        paymentMethod: 'bank',
        buildingAccountHolder: true,
        buildingAccountNumber: true,
        buildingSortCodeField1: true,
        buildingSortCodeField2: true,
        buildingSortCodeField3: true,
        buildingRoll: true,
        bankAccountHolder: true,
        bankAccountNumber: true,
        bankSortCodeField1: true,
        bankSortCodeField2: true,
        bankSortCodeField3: true,
      };
    });

    it('should delete building details when bank is supplied', () => {
      const dataSet = dataStore.filterAccountDetails(data);
      assert.isUndefined(dataSet.buildingAccountHolder);
      assert.isUndefined(dataSet.buildingAccountNumber);
      assert.isUndefined(dataSet.buildingSortCodeField1);
      assert.isUndefined(dataSet.buildingSortCodeField2);
      assert.isUndefined(dataSet.buildingSortCodeField3);
      assert.isUndefined(dataSet.buildingRoll);
    });

    it('should delete banking details when bank is supplied', () => {
      data.paymentMethod = 'building';
      const dataSet = dataStore.filterAccountDetails(data);
      assert.isUndefined(dataSet.bankAccountHolder);
      assert.isUndefined(dataSet.bankAccountNumber);
      assert.isUndefined(dataSet.bankSortCodeField1);
      assert.isUndefined(dataSet.bankSortCodeField2);
      assert.isUndefined(dataSet.bankSortCodeField3);
    });
  });

  describe(' filterContactDetails ', () => {
    beforeEach(() => {
      dataContact = {
        cbHomeTelephoneNumber: 'true',
        cbMobileTelephoneNumber: 'true',
        cbWorkTelephoneNumber: 'true',
        homeTelephoneNumber: '1234',
        mobileTelephoneNumber: '12345',
        workTelephoneNumber: '123456',
      };
    });

    it('should delete home telephone number when cbHomeTelephoneNumber is set as anything other then true', () => {
      dataContact.cbHomeTelephoneNumber = 'cats';
      const dataSet = dataStore.filterContactDetails(dataContact);
      assert.isUndefined(dataSet.cbHomeTelephoneNumber);
      assert.isUndefined(dataSet.homeTelephoneNumber);
      assert.equal(dataSet.mobileTelephoneNumber, '12345');
      assert.equal(dataSet.workTelephoneNumber, '123456');
    });

    it('should delete home telephone number when cbHomeTelephoneNumber is not true', () => {
      delete dataContact.cbHomeTelephoneNumber;
      const dataSet = dataStore.filterContactDetails(dataContact);
      assert.isUndefined(dataSet.homeTelephoneNumber);
      assert.equal(dataSet.mobileTelephoneNumber, '12345');
      assert.equal(dataSet.workTelephoneNumber, '123456');
    });

    it('should delete home telephone number when cbMobileTelephoneNumber is set as anything other then true', () => {
      dataContact.cbMobileTelephoneNumber = 'cats';
      const dataSet = dataStore.filterContactDetails(dataContact);
      assert.isUndefined(dataSet.cbMobileTelephoneNumber);
      assert.isUndefined(dataSet.mobileTelephoneNumber);
      assert.equal(dataSet.homeTelephoneNumber, '1234');
      assert.equal(dataSet.workTelephoneNumber, '123456');
    });

    it('should delete mobile telephone number when cbMobileTelephoneNumber is not true', () => {
      delete dataContact.cbMobileTelephoneNumber;
      const dataSet = dataStore.filterContactDetails(dataContact);
      assert.equal(dataSet.homeTelephoneNumber, '1234');
      assert.isUndefined(dataSet.mobileTelephoneNumber);
      assert.equal(dataSet.workTelephoneNumber, '123456');
    });

    it('should delete home telephone number when cbWorkTelephoneNumber is set as anything other then true', () => {
      dataContact.cbWorkTelephoneNumber = 'cats';
      const dataSet = dataStore.filterContactDetails(dataContact);
      assert.isUndefined(dataSet.cbWorkTelephoneNumber);
      assert.isUndefined(dataSet.workTelephoneNumber);
      assert.equal(dataSet.homeTelephoneNumber, '1234');
      assert.equal(dataSet.mobileTelephoneNumber, '12345');
    });

    it('should delete home telephone number when cbWorkTelephoneNumber is not true', () => {
      delete dataContact.cbWorkTelephoneNumber;
      const dataSet = dataStore.filterContactDetails(dataContact);
      assert.equal(dataSet.homeTelephoneNumber, '1234');
      assert.equal(dataSet.mobileTelephoneNumber, '12345');
      assert.isUndefined(dataSet.workTelephoneNumber);
    });
  });
});
