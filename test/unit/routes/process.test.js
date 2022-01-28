const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../config/i18next');

chai.use(chaiAsPromised);

const { assert } = chai;

nock.disableNetConnect();

const controller = require('../../../app/routes/process/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const overseasRequest = { session: { isOverseas: true }, body: {} };

const accountResults = { result: 'Disabled' };

const accountObject = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33', validated: 'Invalid',
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

const customerDetailsClone = { ...customerDetails };

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

const populatedRequest = { session: formObjectLivedAbroad };

const clonedPopulatedRequest = () => JSON.parse(JSON.stringify(populatedRequest));

const englishLangauge = 'en-GB';

describe('process controller ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' procecssDataToBackend function ', () => {
    it('should return redirect to have you ever when valid session not set', async () => {
      await controller.procecssDataToBackend(emptyRequest, genericResponse);
      assert.equal(genericResponse.address, 'have-you-ever-lived-outside-of-the-uk');
    });

    it('should return redirect to where have you when valid overseas session set', async () => {
      await controller.procecssDataToBackend(overseasRequest, genericResponse);
      assert.equal(genericResponse.address, 'where-have-you-lived-outside-the-uk');
    });

    it('should return redirect to have you ever when valid session is set', async () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, {});
      nock('http://test-url').post('/api/claim').reply(200, {});
      await controller.procecssDataToBackend(clonedPopulatedRequest(), genericResponse);
      assert.equal(genericResponse.address, 'complete');
    });

    it('should return redirect to have you ever when valid session is set but claim request throws any error other than 409', async () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, {});
      nock('http://test-url').post('/api/claim').reply(500, {});
      await controller.procecssDataToBackend(clonedPopulatedRequest(), genericResponse);
      assert.equal(genericResponse.viewName, 'pages/error');
    });

    it('should return redirect to have you ever when valid session is set but claim request throws a 409 conflict error', async () => {
      nock('http://test-url').post('/api/bankvalidate').reply(200, {});
      nock('http://test-url').post('/api/claim').reply(409, {});
      await controller.procecssDataToBackend(clonedPopulatedRequest(), genericResponse);
      assert.equal(genericResponse.address, 'complete');
    });
  });

  describe(' processClaim function ', () => {
    it('should resolve when 200 is called', () => {
      nock('http://test-url').post('/api/claim').reply(200, {});
      const req = {
        session: {
          lang: englishLangauge,
          customerDetails,
        },
      };
      return assert.isFulfilled(controller.processClaim(genericResponse, req, formObjectLivedAbroad, accountResults));
    });

    it('should reject when 500 is called', () => {
      nock('http://test-url').post('/api/claim').reply(500, {});
      const req = {
        session: {
          lang: englishLangauge,
          customerDetails,
        },
      };
      return assert.isRejected(controller.processClaim(genericResponse, req, formObjectLivedAbroad, accountResults));
    });

    it('should not mutate the customer session data when called', () => {
      nock('http://test-url').post('/api/claim').reply(200, {});
      assert.equal(JSON.stringify(customerDetailsClone), JSON.stringify(customerDetails));
    });

    it('should not mutate the customer session data when called a second time', () => {
      nock('http://test-url').post('/api/claim').reply(200, {});
      assert.equal(JSON.stringify(customerDetailsClone), JSON.stringify(customerDetails));
    });
  });
});
