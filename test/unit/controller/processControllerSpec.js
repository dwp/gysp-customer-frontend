const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { assert } = chai;

const nock = require('nock');

nock.disableNetConnect();

const controller = require('../../../app/routes/process/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
let testPromise;
const emptyRequest = { session: {}, body: {} };
const overseasRequest = { session: { isOverseas: true }, body: {} };

const accountResults = { result: 'Disabled' };

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

const customerDetailsClone = Object.assign({}, customerDetails);

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

const englishLangauge = 'en-GB';

describe('process controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
    testPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  });

  describe(' procecssDataToBackend function ', () => {
    it('should return redirect to have you ever when valid session not set', (done) => {
      controller.procecssDataToBackend(emptyRequest, genericResponse);
      assert.equal(genericResponse.address, 'have-you-ever-lived-outside-of-the-uk');
      done();
    });

    it('should return redirect to where have you when valid overseas session set', (done) => {
      controller.procecssDataToBackend(overseasRequest, genericResponse);
      assert.equal(genericResponse.address, 'where-have-you-lived-outside-the-uk');
      done();
    });
  });
  describe(' verifyAccountDetails function ', () => {
    it('should return Not checked when account type is building and roll number is supplied', () => assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObjectBuildingWithRoll, customerDetails), { result: 'Not checked - Building Society' }));
    it('should return status when account type is building with no roll number', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, { result: 'Fail', messages: ['Test1'] });
      return assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObjectBuilding, customerDetails), { result: 'Fail', messages: ['Test1'] });
    });
    it('should return status when account type is building with blank roll number', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, { result: 'Fail', messages: ['Test1'] });
      return assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObjectBuildingWithBlankRoll, customerDetails), { result: 'Fail', messages: ['Test1'] });
    });
    it('should return Unavailable when status code is bad', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(500, {});
      return assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Unavailable' });
    });
    it('should return Unavailable when status code is timeout', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(504, {});
      return assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Unavailable' });
    });
    it('should return Fail when status code is Bad Request', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(400, {});
      return assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Fail' });
    });
    it('should return status when account type is banking', () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, { result: 'Fail', messages: ['Test1'] });
      return assert.becomes(controller.verifyAccountDetails(populatedRequest, genericResponse, accountObject, customerDetails), { result: 'Fail', messages: ['Test1'] });
    });
    it('should return Not checked - Resident abroad when session is overseas', () => assert.becomes(controller.verifyAccountDetails(overseasPopulatedRequest, genericResponse, accountObjectBuilding, customerDetails), { result: 'Not checked - Resident abroad' }));
  });
  describe(' processClaim function ', () => {
    it('should resolve when 200 is called', () => {
      nock('http://test-url').post('/api/claim').reply(200, {});
      return assert.isFulfilled(controller.processClaim(genericResponse, customerDetails, formObjectLivedAbroad, accountResults, englishLangauge));
    });
    it('should reject when 500 is called', () => {
      nock('http://test-url').post('/api/claim').reply(500, {});
      return assert.isRejected(controller.processClaim(genericResponse, customerDetails, formObjectLivedAbroad, accountResults, englishLangauge));
    });

    it('should not mutate the customer session data when called', () => {
      nock('http://test-url').post('/api/claim').reply(200, {});
      return testPromise.then(() => {
        assert.equal(JSON.stringify(customerDetailsClone), JSON.stringify(customerDetails));
      });
    });

    it('should not mutate the customer session data when called a second time', () => {
      nock('http://test-url').post('/api/claim').reply(200, {});
      return testPromise.then(() => {
        assert.equal(JSON.stringify(customerDetailsClone), JSON.stringify(customerDetails));
      });
    });
  });
});
