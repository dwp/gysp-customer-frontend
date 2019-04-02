const { assert } = require('chai');

const personalDataController = require('../../../app/routes/personal-data/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { 'personal-data': true } };
const emptyRequest = { session: {}, body: { personalDataPermission: '' } };
const invalidRequest = { session: {}, body: { personalDataPermission: 'batman' } };
const populatedYesRequest = { session: {}, body: { personalDataPermission: 'yes' } };
const populatedNoRequest = { session: {}, body: { personalDataPermission: 'no' } };

describe('Personal Data controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' getPersonalData function (GET /personal-data)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', (done) => {
      personalDataController.getPersonalData(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/personal-data');
      assert.isUndefined(genericResponse.data.details);
      done();
    });
    it('should return view name when called with populated response data when session is set', (done) => {
      personalDataController.getPersonalData(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/personal-data');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' postConfirmIdentity function (POST /personal-data)', () => {
    it('should return default view name with errors when called with empty object', (done) => {
      personalDataController.postPersonalData(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/personal-data');
      assert.equal(genericResponse.data.errors.personalDataPermission.text, 'personal-data:fields.personalDataPermission.errors.required');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return default view name with errors when called with invalid object', (done) => {
      personalDataController.postPersonalData(invalidRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/personal-data');
      assert.equal(genericResponse.data.errors.personalDataPermission.text, 'personal-data:fields.personalDataPermission.errors.required');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return redirect personal data screen when called with valid verify object', (done) => {
      personalDataController.postPersonalData(populatedYesRequest, genericResponse);
      assert.equal(genericResponse.address, 'verify/start');
      assert.equal(populatedYesRequest.session['personal-data'].personalDataPermission, 'yes');
      assert.equal(Object.keys(populatedYesRequest.session['personal-data']).length, 1);
      done();
    });

    it('should return redirect auth screen when called with valid invite object', (done) => {
      personalDataController.postPersonalData(populatedNoRequest, genericResponse);
      assert.equal(genericResponse.address, 'verify/cancel');
      assert.equal(populatedNoRequest.session['personal-data'].personalDataPermission, 'no');
      assert.equal(Object.keys(populatedNoRequest.session['personal-data']).length, 1);
      done();
    });
  });
});
