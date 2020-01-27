const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const nock = require('nock');

nock.disableNetConnect();

const authController = require('../../../app/routes/auth/functions');
const responseHelper = require('../../lib/responseHelper');

const emptyRequest = { session: {} };
let genericResponse = {};

const emptyPost = { inviteKey: '', address: '' };

const validKey = { inviteKey: 'key', address: 'yes' };

const validKeyAddressCatch = { session: {}, body: { inviteKey: 'key', address: 'no' } };

const populatedPreSession = { session: { requestDetails: validKey, matchError: true, errors: true } };

const populatedPreSessionForm = { session: { requestDetails: emptyPost, formErrors: true, errors: true } };

let validPostObjectBadKey = { session: {}, body: { inviteKey: '12345678' } };

const validPostObject = { session: {}, body: { inviteKey: 'FOO2277336', address: 'yes' } };

const serverResponseWithDate = { statePensionDate: 1631145600000 };

const error404 = { statusCode: 404 };

const error500 = { statusCode: 500, message: '500 error', response: { request: { uri: { path: '/api/customer' } } } };

const errorEConnect = { message: 'eConnect error', response: { request: { uri: { path: '/api/customer' } } } };

const customerDetails = { name: 'Test Name', residentialAddress: { postCode: 'TES TES' } };

const emptyRequestSession = { session: { userPassedAuth: true } };

let validPostObjectBadKeyAttempt2 = '';

const keyAPI = '/api/key';
const customerAPI = '/api/customer';
const claimAPI = '/api/claim/claimexists';
let testPromise;

function returnRequest() {
  return { session: { invalidMatch: 2 }, body: { inviteKey: '' } };
}

describe('Auth controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
    genericResponse.locals = {
      traceID: '',
      logMessage: '',
      logger: {
        error(traceID, errorTxt) {
          genericResponse.locals.traceID = traceID;
          genericResponse.locals.logMessage = errorTxt;
        },
        info() {},
      },
    };
  });
  it('should return view name when called', () => {
    authController.redirectToNextStep(validPostObjectBadKey, genericResponse, customerDetails, validKey, serverResponseWithDate);
    assert.equal(validPostObjectBadKey.session.inviteKey, 'key');
    assert.equal(validPostObjectBadKey.session.customerDetails, customerDetails);
    assert.equal(validPostObjectBadKey.session.inviteKeyHash, 'c45866dd6d90f034f2710c62e7685e11735518a36e26017f0fd1c8b0403efc19');
    assert.equal(genericResponse.address, 'date-of-birth');
  });

  describe(' authError function (GET /auth-error-address)', () => {
    it('should return view name when called', () => {
      authController.authErrorAddress(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/auth-error-address');
    });
  });

  describe(' authError function (GET /auth-error-invitation-code)', () => {
    it('should return view name when called', () => {
      authController.authErrorInvitationCode(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/auth-error-invitation-code');
    });
  });

  describe(' authPageGet function (GET /auth) ', () => {
    it('should return auth page view when called with empty viewData due to no session', () => {
      authController.authPageGet(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/auth-page');
      assert.equal(genericResponse.data.details, undefined);
      assert.equal(genericResponse.data.matchError, undefined);
      assert.equal(genericResponse.data.errors, undefined);
    });

    it('should destory session and redirect to auth', () => {
      authController.authPageGet(emptyRequestSession, genericResponse);
      assert.equal(genericResponse.address, 'auth');
      assert.equal(emptyRequestSession.session.userPassedAuth, undefined);
    });

    it('should return auth page view with view data populated by session with matchError', () => {
      authController.authPageGet(populatedPreSession, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/auth-page');
      assert.equal(genericResponse.data.details.inviteKey, 'key');
      assert.equal(genericResponse.data.details.address, 'yes');
      assert.equal(genericResponse.data.matchError, true);
      assert.equal(genericResponse.data.clear, true);
    });

    it('should return auth page view with view data populated by session with formError', () => {
      authController.authPageGet(populatedPreSessionForm, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/auth-page');
      assert.equal(genericResponse.data.details, emptyPost);
      assert.equal(genericResponse.data.errors.inviteKey.text, 'auth:fields.inviteKey.errors.required');
      assert.equal(genericResponse.data.clear, true);
    });
  });

  describe(' authPageProcess fuction (POST /auth) ', () => {
    it('should return auth page view with view data populated by session with formError', () => {
      authController.authPageProcess(validKeyAddressCatch, genericResponse);
      assert.equal(genericResponse.address, 'auth-error-address');
    });

    describe(' redirectToNextStep ', () => {
      beforeEach(() => {
        validPostObjectBadKeyAttempt2 = returnRequest();
        validPostObjectBadKey = { session: {}, body: { inviteKey: '' } };
        testPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 200);
        });
      });

      it('should redirect to next step when both successful call\'s are received', () => {
        genericResponse = responseHelper.genericResponse();
        nock('http://test-url').get(`${keyAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        nock('http://test-url').get(`${customerAPI}/${validPostObject.body.inviteKey}`).reply(200, { residentialAddress: { postCode: 'test' } });
        nock('http://test-url').get(`${claimAPI}/${validPostObject.body.inviteKey}`).reply(404, {});
        authController.authPageProcess(validPostObject, genericResponse);
        return testPromise.then(() => {
          assert.equal(genericResponse.viewName, '');
          assert.equal(genericResponse.address, 'date-of-birth');
          assert.equal(validPostObject.session.isNorthernIreland, false);
        });
      });

      it('should redirect to next step when both successful call\'s are received and session should be set as North Ireland', () => {
        genericResponse = responseHelper.genericResponse();
        nock('http://test-url').get(`${keyAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        nock('http://test-url').get(`${customerAPI}/${validPostObject.body.inviteKey}`).reply(200, { residentialAddress: { postCode: 'BT1 123' } });
        nock('http://test-url').get(`${claimAPI}/${validPostObject.body.inviteKey}`).reply(404, {});
        authController.authPageProcess(validPostObject, genericResponse);
        return testPromise.then(() => {
          assert.equal(genericResponse.viewName, '');
          assert.equal(genericResponse.address, 'date-of-birth');
          assert.equal(validPostObject.session.isNorthernIreland, true);
        });
      });

      it('should redirect to error page when key is not found', () => {
        genericResponse = responseHelper.genericResponse();
        nock('http://test-url').get(`${keyAPI}/${validPostObject.body.inviteKey}`).reply(404, {});
        authController.authPageProcess(validPostObject, genericResponse);
        return testPromise.then(() => {
          assert.equal(genericResponse.viewName, '');
          assert.equal(genericResponse.address, 'auth');
          assert.equal(validPostObject.session.matchError, true);
        });
      });

      it('should redirect to error page when customer is not found', () => {
        genericResponse = responseHelper.genericResponse();
        nock('http://test-url').get(`${keyAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        nock('http://test-url').get(`${claimAPI}/${validPostObject.body.inviteKey}`).reply(404, {});
        nock('http://test-url').get(`${customerAPI}/${validPostObject.body.inviteKey}`).reply(404, {});
        authController.authPageProcess(validPostObject, genericResponse);
        return testPromise.then(() => {
          assert.equal(genericResponse.viewName, '');
          assert.equal(genericResponse.address, 'auth');
          assert.equal(validPostObject.session.matchError, true);
        });
      });

      it('should return auth page view when invite key has already been used', () => {
        genericResponse = responseHelper.genericResponse();
        nock('http://test-url').get(`${keyAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        nock('http://test-url').get(`${claimAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        authController.authPageProcess(validPostObjectBadKey, genericResponse);
        return testPromise.then(() => {
          assert.equal(genericResponse.viewName, '');
          assert.equal(genericResponse.address, 'auth');
          assert.equal(validPostObject.session.matchError, true);
        });
      });

      it('should redirect to auth error page when invite key has already been used but session is at the third attempt', () => {
        genericResponse = responseHelper.genericResponse();
        nock('http://test-url').get(`${keyAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        nock('http://test-url').get(`${claimAPI}/${validPostObject.body.inviteKey}`).reply(200, {});
        authController.authPageProcess(validPostObjectBadKeyAttempt2, genericResponse);
        return testPromise.then(() => {
          assert.equal(genericResponse.viewName, '');
          assert.equal(genericResponse.address, 'auth');
          assert.equal(validPostObject.session.matchError, true);
        });
      });

      it('should return auth page redirect when called with empty object and session set', () => {
        authController.authPageProcess(validPostObjectBadKey, genericResponse);
        assert.equal(genericResponse.viewName, '');
        assert.equal(genericResponse.address, 'auth');
        assert.equal(validPostObjectBadKey.session.formErrors, true);
      });

      it('should return auth page view when called with valid object that doesn\'t match', () => {
        authController.redirectToAuthErrorOrDisplayPage(error404, validPostObjectBadKey, genericResponse);
        assert.equal(genericResponse.viewName, '');
        assert.equal(genericResponse.address, 'auth');
        assert.equal(validPostObjectBadKey.session.matchError, true);
      });

      it('should return redirect to error page when called with valid object that doesn\'t match but session is at the third attempt', () => {
        authController.redirectToAuthErrorOrDisplayPage(error404, validPostObjectBadKeyAttempt2, genericResponse);
        assert.equal(genericResponse.viewName, '');
        assert.equal(genericResponse.address, 'auth-error-invitation-code');
      });

      it('should return error page when called with valid object that doesn\'t match but session is not the third attempt', () => {
        authController.redirectToAuthErrorOrDisplayPage(error404, validPostObjectBadKey, genericResponse);
        assert.equal(genericResponse.viewName, '');
        assert.equal(genericResponse.address, 'auth');
        assert.equal(validPostObjectBadKey.session.matchError, true);
      });

      it('should throw error when none 404 status supplied', () => {
        authController.redirectToAuthErrorOrDisplayPage(error500, validPostObjectBadKey, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/error');
        assert.equal(genericResponse.locals.logMessage, '500 - 500 error - Requested on /api/customer');
      });

      it('should throw error when none statue is supplied', () => {
        errorEConnect.response.request.uri.path = '/api/customer';
        authController.redirectToAuthErrorOrDisplayPage(errorEConnect, validPostObjectBadKey, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/error');
        assert.equal(genericResponse.locals.logMessage, 'Other - eConnect error - Requested on /api/customer');
      });
    });
  });

  describe(' getNoInviteCodeDropout function (GET /you-need-to-call-us) ', () => {
    it('should return auth no invite code page when called', () => {
      authController.getNoInviteCodeDropout(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/auth-no-invite-code');
    });
  });
});
