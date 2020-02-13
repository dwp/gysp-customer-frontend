const { assert } = require('chai');

const nock = require('nock');

nock.disableNetConnect();

const verifyDetailController = require('../../../app/routes/verify-detail/functions');
const responseHelper = require('../../lib/responseHelper');


let genericResponse = {};
const validUserRequest = {
  session: {
    'verify-details': {
      test: 'test-data',
    },
    lang: 'en',
  },
  user: {
    firstName: 'John',
    surname: 'Smith',
    dob: '1950-01-01',
    residentialAddress: {
      buildingNumber: '1',
      thoroughfareName: 'Thoroughfare Name',
      postTown: 'Town',
      postCode: 'NE1 1AA',
    },
  },
};

const formattedUser = {
  name: 'John Smith',
  dob: '1 January 1950',
  addressLines: [
    '1',
    'Thoroughfare Name',
    'Town',
    'NE1 1AA',
  ],
};

const invalidPostRequest = Object.assign({}, JSON.parse(JSON.stringify(validUserRequest)), { body: { address: 'test' } });
const emptyPostRequest = Object.assign({}, JSON.parse(JSON.stringify(validUserRequest)), { body: { } });
const validYesPostRequest = Object.assign({}, JSON.parse(JSON.stringify(validUserRequest)), { body: { address: 'yes' } });
const validNoPostRequest = Object.assign({}, JSON.parse(JSON.stringify(validUserRequest)), { body: { address: 'no' } });

const invalidAddressError = {
  error: {
    text: 'verify-your-details:fields.address.errors.required',
    visuallyHiddenText: 'app:error-message.visuallyHiddenText',
  },
  errorSummary: [{
    href: '#address-yes',
    text: 'verify-your-details:fields.address.errors.required',
    attributes: {
      'data-journey': undefined,
    },
  }],
};

describe('Verify detail controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
    genericResponse.locals.traceID = '';
    genericResponse.locals.logMessage = '';
    genericResponse.locals.logger = {
      error(traceID, errorTxt) {
        genericResponse.locals.traceID = traceID;
        genericResponse.locals.logMessage = errorTxt;
      },
    };
  });

  describe('getVerifyDetails function (GET /verify/your-details)', () => {
    it('should return view name formatted view data', (done) => {
      verifyDetailController.getVerifyDetails(validUserRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-details');
      done();
    });
  });

  describe('postVerifyDetails function (POST /verify/your-details)', () => {
    it('should return view when with empty post request', (done) => {
      verifyDetailController.postVerifyDetails(emptyPostRequest, genericResponse);
      assert.deepEqual(genericResponse.data.user, formattedUser);
      assert.deepEqual(genericResponse.data.details, {});
      assert.deepEqual(genericResponse.data.errors.address, invalidAddressError.error);
      assert.deepEqual(genericResponse.data.errors.errorSummary, invalidAddressError.errorSummary);
      assert.equal(genericResponse.viewName, 'pages/verify-details');
      done();
    });

    it('should return view when with invalid request', (done) => {
      verifyDetailController.postVerifyDetails(invalidPostRequest, genericResponse);
      assert.deepEqual(genericResponse.data.user, formattedUser);
      assert.deepEqual(genericResponse.data.details, invalidPostRequest.body);
      assert.deepEqual(genericResponse.data.errors.address, invalidAddressError.error);
      assert.deepEqual(genericResponse.data.errors.errorSummary, invalidAddressError.errorSummary);
      assert.equal(genericResponse.viewName, 'pages/verify-details');
      done();
    });

    it('should return redirect to your-state-pension-date when with valid request and address is yes', (done) => {
      verifyDetailController.postVerifyDetails(validYesPostRequest, genericResponse);
      assert.deepEqual(validYesPostRequest.session['verify-details'], { address: 'yes' });
      assert.equal(genericResponse.address, '/your-state-pension-date');
      done();
    });

    it('should return redirect to /verify/auth-error-address when with valid request and address is no', (done) => {
      verifyDetailController.postVerifyDetails(validNoPostRequest, genericResponse);
      assert.deepEqual(validNoPostRequest.session['verify-details'], { address: 'no' });
      assert.equal(genericResponse.address, '/verify/auth-error-address');
      done();
    });
  });
});
