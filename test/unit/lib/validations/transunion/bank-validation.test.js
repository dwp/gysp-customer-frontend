const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { assert } = require('chai');
const nock = require('nock');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');
const i18nextConfig = require('../../../../../config/i18next.js');
const responseHelper = require('../../../../lib/responseHelper.js');
const {
  verifyAccountDetails, buildTransunionValidationError, SORT_CODE_INVALID_MSG, ACC_NUMBER_INVALID_MSG,
} = require('../../../../../lib/validations/transunion/bank-validation.js');

const { fields: translatedErr } = require('../../../../../locales/en/account.json');
const { 'error-message': { visuallyHiddenText: errMsg } } = require('../../../../../locales/en/app.json');

nock.disableNetConnect();

let genericResponse = {};

const accountObject = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33', validated: 'Invalid',
};
const accountObjectBuilding = {
  paymentMethod: 'building', buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', validated: 'Invalid',
};
const accountObjectBuildingWithBlankRoll = {
  paymentMethod: 'building', buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: '', validated: 'Invalid',
};
const accountObjectBuildingWithRoll = {
  paymentMethod: 'building', buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: '123', validated: 'Invalid',
};
const accountOverseasObject = {
  accountHolder: 'Mr Joe Bloggs', accountNumber: '12345678', accountCode: '1111AAADDD', validated: 'Invalid',
};
const customerDetails = {
  residentialAddress: {
    buildingNumber: '1',
    postcode: '2',
    country: 'test',
    thoroughfareName: '3',
  },
  correspondenceAddress: {
    buildingNumber: '1',
    postcode: '2',
    country: 'test',
    thoroughfareName: '3',
  },
  dob: '2017-06-30T10:32:14.295Z',
  firstName: 'A',
  surname: 'B',
  title: 'C',
};

const customerDetailsOverseas = {
  overseasAddress: {
    line1: 'Address Line 1',
    line2: 'Address Line 2',
    line3: 'Address Line 3',
    line4: 'Address Line 4',
    line5: 'Address Line 5',
    line6: 'Address Line 6',
    line7: 'Address Line 7',
    country: 'Country',
  },
  dob: '2017-06-30T10:32:14.295Z',
  firstName: 'A',
  surname: 'B',
  title: 'C',
};

const formObjectLivedAbroad = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { preferredTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  inviteKey: 'AABBCCDD',
  userDateOfBirthInfo: customerDetails,
  customerDetails,
};

const formObjectOverseas = {
  'lived-abroad-countries': {
    'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { preferredTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details-overseas': accountOverseasObject,
  inviteKey: 'AABBCCDD',
  userDateOfBirthInfo: customerDetailsOverseas,
  customerDetailsOverseas,
  isOverseas: true,
};

const populatedRequest = { session: formObjectLivedAbroad };
const overseasPopulatedRequest = { session: formObjectOverseas };

describe('Transunion bank validation', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' verifyAccountDetails function ', () => {
    it('should return Not checked when account type is building and roll number is supplied', () => assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObjectBuildingWithRoll, customerDetails), { result: 'Not checked - Building Society' }));
    it('should return status when account type is building with no roll number', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, { result: 'Fail', messages: ['Test1'] });
      return assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObjectBuilding, customerDetails), { result: 'Fail', messages: ['Test1'] });
    });

    it('should return status when account type is building with blank roll number', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, { result: 'Fail', messages: ['Test1'] });
      return assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObjectBuildingWithBlankRoll, customerDetails), { result: 'Fail', messages: ['Test1'] });
    });

    it('should return Unavailable when status code is bad', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(500, {});
      return assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Unavailable' });
    });

    it('should return Unavailable when status code is timeout', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(504, {});
      return assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Unavailable' });
    });

    it('should return Fail when status code is Bad Request', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(400, {});
      return assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Fail' });
    });

    it('should return status when account type is banking', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, { result: 'Fail', messages: ['Test1'] });
      return assert.becomes(verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Fail', messages: ['Test1'] });
    });

    it('should return Not checked - Resident abroad when session is overseas', () => assert.becomes(verifyAccountDetails(overseasPopulatedRequest, genericResponse, accountObjectBuilding, customerDetails), { result: 'Not checked - Resident abroad' }));
  });

  describe('buildTransunionValidationError function', () => {
    before(async () => {
      await i18next
        .use(i18nextFsBackend)
        .init(i18nextConfig);
    });

    it('should return both sort code and acc number as invalid if error messages include both', () => {
      const messages = [SORT_CODE_INVALID_MSG, ACC_NUMBER_INVALID_MSG, 'SOME_OTHER_ERROR_1', 'SOME_OTHER_ERROR_2'];
      const tranunionErr = buildTransunionValidationError(messages);
      assert.isTrue(tranunionErr.bothSortCodeAndAccNumberInvalid());
    });

    it('should return sort code only as invalid if error messages include just sort code', () => {
      const messages = ['SOME_OTHER_ERROR_1', SORT_CODE_INVALID_MSG, 'SOME_OTHER_ERROR_2'];
      const transunionErr = buildTransunionValidationError(messages);
      assert.isTrue(transunionErr.isSortCodeInvalid);
      assert.isTrue(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
    });

    it('should return acc number only as invalid if error messages include just acc number', () => {
      const messages = ['SOME_OTHER_ERROR_1', ACC_NUMBER_INVALID_MSG, 'SOME_OTHER_ERROR_2'];
      const transunionErr = buildTransunionValidationError(messages);
      assert.isTrue(transunionErr.isAccNumberInvalid);
      assert.isTrue(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
    });

    it('should return false for all queries about invalid messages if both sort code and acc number msgs are NOT in list', () => {
      const messages = ['SOME_OTHER_ERROR_1', 'SOME_OTHER_ERROR_2'];
      const transunionErr = buildTransunionValidationError(messages);
      assert.isFalse(transunionErr.isAccNumberInvalid);
      assert.isFalse(transunionErr.isSortCodeInvalid);
      assert.isFalse(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
    });

    it('should return false for all queries about invalid messages if both sort code and acc number msgs are NOT in list and list is empty', () => {
      const messages = [];
      const transunionErr = buildTransunionValidationError(messages);
      assert.isFalse(transunionErr.isAccNumberInvalid);
      assert.isFalse(transunionErr.isSortCodeInvalid);
      assert.isFalse(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
    });

    it('should return false for all queries about invalid messages if messages is undefined', () => {
      const messages = undefined;
      const transunionErr = buildTransunionValidationError(messages);
      assert.isFalse(transunionErr.isAccNumberInvalid);
      assert.isFalse(transunionErr.isSortCodeInvalid);
      assert.isFalse(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
    });

    it('should return error messages for acc number when acc number is invalid', () => {
      const messages = ['SOME_OTHER_ERROR_1', ACC_NUMBER_INVALID_MSG, 'SOME_OTHER_ERROR_2'];
      const transunionErr = buildTransunionValidationError(messages);
      assert.isTrue(transunionErr.isAccNumberInvalid);
      assert.isTrue(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
      assert.deepEqual(transunionErr.errors, {
        bankAccountNumber: {
          text: translatedErr.accountNumber.errors.transunionInvalid,
          visuallyHiddenText: errMsg,
        },
        errorSummary: [{
          attributes: {
            'data-journey': 'account-details:error:bank-account-number',
          },
          href: '#bankAccountNumber',
          text: translatedErr.accountNumber.errors.transunionInvalid,
        }],
      });
    });

    it('should return error messages for sort code when sort code is invalid', () => {
      const messages = ['SOME_OTHER_ERROR_1', SORT_CODE_INVALID_MSG, 'SOME_OTHER_ERROR_2'];
      const transunionErr = buildTransunionValidationError(messages);
      assert.isTrue(transunionErr.isSortCodeInvalid);
      assert.isTrue(transunionErr.eitherSortCodeOrAccNumberInvalid());
      assert.isFalse(transunionErr.bothSortCodeAndAccNumberInvalid());
      assert.deepEqual(transunionErr.errors, {
        bankSortCode: {
          text: translatedErr.sortCode.errors.transunionInvalid,
          visuallyHiddenText: errMsg,
        },
        errorSummary: [{
          attributes: {
            'data-journey': 'account-details:error:bank-sort-code',
          },
          href: '#bankSortCode',
          text: translatedErr.sortCode.errors.transunionInvalid,
        }],
      });
    });
  });
});
