const assert = require('assert');
const bankDetails = require('../../../../lib/objects/bankObject');

const validJson = {
  bankData: { sortCode: '112233', accountNumber: '12345678' },
  firstName: 'Test One',
  surname: 'Test Two',
  residentialAddress: {
    postCode: 'postCode', subBuildingName: 'subBuildingName', buildingNumber: 'buildingNumber', buildingName: 'buildingName',
  },
};

const bankObject = {
  bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '11 22 33',
};

const customerDetails = {
  firstName: 'Test One',
  surname: 'Test Two',
  residentialAddress: {
    postTown: 'Test3', county: 'Test 1', subBuildingName: 'subBuildingName', buildingNumber: 'buildingNumber', buildingName: 'buildingName', postCode: 'postCode',
  },
};

const userAssertedDOB = { dateYear: 2003, dateMonth: 2, dateDay: 1 };

const customerDetailsWithoutOptionalInputs = { firstName: 'Test One', surname: 'Test Two', residentialAddress: { postCode: 'postCode' } };

const validJsonWithoutOptionalInputs = {
  bankData: { sortCode: '112233', accountNumber: '12345678' }, firstName: 'Test One', surname: 'Test Two', residentialAddress: { postCode: 'postCode' },
};

describe('Bank object ', () => {
  describe(' convertor with bankDetailsToObjectWithCustomerDetails ', () => {
    it('should convert object to valid json and remove country', () => {
      const bank = bankDetails.bankDetailsToObjectWithCustomerDetails(bankObject, customerDetails);
      assert.equal(JSON.stringify(validJson), JSON.stringify(bank));
    });

    it('should use user asserted date of birth when supplied', () => {
      const bank = bankDetails.bankDetailsToObjectWithCustomerDetails(bankObject, customerDetails, userAssertedDOB);
      assert.equal(bank.dob, '2003-2-1T00:00:00.000Z');
    });

    it('should convert object to valid json and when none of the optional inputs are supplied', () => {
      const bank = bankDetails.bankDetailsToObjectWithCustomerDetails(bankObject, customerDetailsWithoutOptionalInputs);
      assert.equal(JSON.stringify(validJsonWithoutOptionalInputs), JSON.stringify(bank));
    });
  });
});
