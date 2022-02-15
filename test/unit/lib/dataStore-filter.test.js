const { assert } = require('chai');
const dataStore = require('../../../lib/dataStore');

let data = {};
let dataContact = {};

describe('Data store filter ', () => {
  describe(' filterAccountDetails  ', () => {
    beforeEach(() => {
      data = {
        paymentMethod: 'bank',
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
      assert.isUndefined(dataSet.buildingRoll);
    });

    it('should have building soc rollnumber when building is supplied', () => {
      data.paymentMethod = 'building';
      const dataSet = dataStore.filterAccountDetails(data);
      assert.isDefined(dataSet.bankAccountHolder);
      assert.isDefined(dataSet.bankAccountNumber);
      assert.isDefined(dataSet.bankSortCodeField1);
      assert.isDefined(dataSet.bankSortCodeField2);
      assert.isDefined(dataSet.bankSortCodeField3);
      assert.isDefined(dataSet.buildingRoll);
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
