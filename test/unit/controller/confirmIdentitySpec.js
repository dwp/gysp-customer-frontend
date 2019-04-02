const { assert } = require('chai');

const confirmIdentityController = require('../../../app/routes/confirm-identity/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { 'confirm-identity': true } };
const emptyRequest = { session: {}, body: { authType: '' } };
const invalidRequest = { session: {}, body: { authType: 'batman' } };
const populatedVerifyRequest = { session: { customerDetails: {} }, body: { authType: 'verify' } };
const populatedInviteRequest = { session: { customerDetails: {} }, body: { authType: 'invite' } };

describe('Confirm Identity controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' getConfirmIdentity function (GET /confirm-identity)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', (done) => {
      confirmIdentityController.getConfirmIdentity(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/confirm-identity');
      assert.isUndefined(genericResponse.data);
      done();
    });
    it('should return view name when called with populated response data when session is set', (done) => {
      confirmIdentityController.getConfirmIdentity(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/confirm-identity');
      assert.isUndefined(genericResponse.data);
      done();
    });
  });

  describe(' postConfirmIdentity function (POST /confirm-identity)', () => {
    it('should return default view name with errors when called with empty object', (done) => {
      confirmIdentityController.postConfirmIdentity(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/confirm-identity');
      assert.equal(genericResponse.data.errors.authType.text, 'confirm-identity:fields.authType.errors.required');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return default view name with errors when called with invalid object', (done) => {
      confirmIdentityController.postConfirmIdentity(invalidRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/confirm-identity');
      assert.equal(genericResponse.data.errors.authType.text, 'confirm-identity:fields.authType.errors.required');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return redirect personal data screen when called with valid verify object', (done) => {
      confirmIdentityController.postConfirmIdentity(populatedVerifyRequest, genericResponse);
      assert.equal(genericResponse.address, 'verify');
      assert.equal(populatedVerifyRequest.session['confirm-identity'].authType, 'verify');
      assert.equal(Object.keys(populatedVerifyRequest.session['confirm-identity']).length, 1);
      done();
    });

    it('should return redirect auth screen when called with valid invite object', (done) => {
      confirmIdentityController.postConfirmIdentity(populatedInviteRequest, genericResponse);
      assert.equal(genericResponse.address, 'auth');
      assert.equal(populatedInviteRequest.session['confirm-identity'].authType, 'invite');
      assert.equal(Object.keys(populatedInviteRequest.session['confirm-identity']).length, 1);
      done();
    });
  });
});
