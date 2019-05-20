const { assert } = require('chai');

const benefitsController = require('../../../app/routes/benefits/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { benefits: true } };
const populatedSessionEditModeGet = { session: { benefits: true }, query: { edit: 'true' } };
const emptyRequest = { session: {}, body: { receivingBenefits: '' } };
const invalidRequest = { session: {}, body: { receivingBenefits: 'batman' } };
const populatedYesRequest = { session: {}, body: { receivingBenefits: 'yes' } };
const populatedYesEditModeRequest = { session: { editSection: 'benefits' }, body: { receivingBenefits: 'yes' } };
const populatedNoRequest = { session: {}, body: { receivingBenefits: 'no' } };
const populatedNoEditModeRequest = { session: { editSection: 'benefits' }, body: { receivingBenefits: 'no' } };

describe('benefits controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('getBenefits function (GET /are-you-receiving-any-benefits)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', (done) => {
      benefitsController.getBenefits(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/benefits');
      assert.isUndefined(populatedSessionEditModeGet.session.editSection);
      assert.isUndefined(genericResponse.data.details);
      done();
    });
    it('should return view name when called with populated response data when session is set', (done) => {
      benefitsController.getBenefits(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/benefits');
      assert.isUndefined(populatedSessionEditModeGet.session.editSection);
      assert.isTrue(genericResponse.data.details);
      done();
    });
    it('should return view name when called with populated response data when session is set and in edit mode', (done) => {
      benefitsController.getBenefits(populatedSessionEditModeGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/benefits');
      assert.equal(populatedSessionEditModeGet.session.editSection, 'benefits');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' postBenefits function (POST /are-you-receiving-any-benefits)', () => {
    it('should return default view name with errors when called with empty object', (done) => {
      benefitsController.postBenefits(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/benefits');
      assert.equal(genericResponse.data.errors.receivingBenefits.text, 'benefits:fields.receivingBenefits.errors.required');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return default view name with errors when called with invalid object', (done) => {
      benefitsController.postBenefits(invalidRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/benefits');
      assert.equal(genericResponse.data.errors.receivingBenefits.text, 'benefits:fields.receivingBenefits.errors.required');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return redirect to contact details screen when called with valid yes object', (done) => {
      benefitsController.postBenefits(populatedYesRequest, genericResponse);
      assert.equal(genericResponse.address, '/contact-details');
      assert.equal(populatedYesRequest.session.benefits.receivingBenefits, 'yes');
      assert.equal(Object.keys(populatedYesRequest.session.benefits).length, 1);
      done();
    });

    it('should return redirect to check your details screen when called with valid yes object in edit mode', (done) => {
      benefitsController.postBenefits(populatedYesEditModeRequest, genericResponse);
      assert.equal(genericResponse.address, '/check-your-details');
      assert.equal(populatedYesEditModeRequest.session.benefits.receivingBenefits, 'yes');
      assert.equal(Object.keys(populatedYesEditModeRequest.session.benefits).length, 1);
      done();
    });

    it('should return redirect to contact details screen when called with valid no object', (done) => {
      benefitsController.postBenefits(populatedNoRequest, genericResponse);
      assert.equal(genericResponse.address, '/contact-details');
      assert.equal(populatedNoRequest.session.benefits.receivingBenefits, 'no');
      assert.equal(Object.keys(populatedNoRequest.session.benefits).length, 1);
      done();
    });

    it('should return redirect to check your details screen when called with valid no object in edit mode', (done) => {
      benefitsController.postBenefits(populatedNoEditModeRequest, genericResponse);
      assert.equal(genericResponse.address, '/check-your-details');
      assert.equal(populatedNoEditModeRequest.session.benefits.receivingBenefits, 'no');
      assert.equal(Object.keys(populatedNoEditModeRequest.session.benefits).length, 1);
      done();
    });
  });
});
