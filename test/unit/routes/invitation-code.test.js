const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../config/i18next');

const controller = require('../../../app/routes/invitation-code/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { 'invitation-code': true } };
const emptyRequest = { session: {}, body: { authType: '' } };
const invalidRequest = { session: {}, body: { authType: 'batman' } };
const populatedInviteRequest = { session: { customerDetails: {} }, body: { hasInvitationCode: 'yes' } };
const populatedNoInviteRequest = { session: { customerDetails: {} }, body: { hasInvitationCode: 'no' } };

describe('invitation code controller ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('getInvitationCodeChoose function (GET /invitation-code)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', () => {
      controller.getInvitationCodeChoose(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/invitation-code');
      assert.isUndefined(genericResponse.data);
    });

    it('should return view name when called with populated response data when session is set', () => {
      controller.getInvitationCodeChoose(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/invitation-code');
      assert.isUndefined(genericResponse.data);
    });
  });

  describe('postInvitationCodeChoose function (POST /invitation-code)', () => {
    it('should return default view name with errors when called with empty object', () => {
      controller.postInvitationCodeChoose(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/invitation-code');
      assert.equal(genericResponse.data.errors.hasInvitationCode.text, 'Select yes if you have your invitation code');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
    });

    it('should return default view name with errors when called with invalid object', () => {
      controller.postInvitationCodeChoose(invalidRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/invitation-code');
      assert.equal(genericResponse.data.errors.hasInvitationCode.text, 'Select yes if you have your invitation code');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
    });

    it('should return redirect personal data screen when called with valid verify object', () => {
      controller.postInvitationCodeChoose(populatedNoInviteRequest, genericResponse);
      assert.equal(genericResponse.address, 'request-invitation-code');
      assert.equal(populatedNoInviteRequest.session['invitation-code'].hasInvitationCode, 'no');
      assert.equal(Object.keys(populatedNoInviteRequest.session['invitation-code']).length, 1);
    });

    it('should return redirect auth screen when called with valid invite object', () => {
      controller.postInvitationCodeChoose(populatedInviteRequest, genericResponse);
      assert.equal(genericResponse.address, 'auth');
      assert.equal(populatedInviteRequest.session['invitation-code'].hasInvitationCode, 'yes');
      assert.equal(Object.keys(populatedInviteRequest.session['invitation-code']).length, 1);
    });
  });
});
