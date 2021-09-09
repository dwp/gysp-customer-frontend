const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../config/i18next');

const prisonController = require('../../../app/routes/prison/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const customerDetails = { customerDetails: { statePensionDate: 1599572030000 } };
const populatedSessionGet = { session: { prison: true, ...customerDetails } };
const populatedSessionEditModeGet = { session: { prison: true, ...customerDetails }, query: { edit: 'true' } };
const emptyRequest = { session: { ...customerDetails }, body: { spentTimeInPrison: '' } };
const invalidRequest = { session: { ...customerDetails }, body: { spentTimeInPrison: 'batman' } };
const populatedYesRequest = { session: { ...customerDetails }, body: { spentTimeInPrison: 'yes' } };
const populatedYesEditModeRequest = { session: { editSection: 'prison', ...customerDetails }, body: { spentTimeInPrison: 'yes' } };
const populatedNoRequest = { session: { ...customerDetails }, body: { spentTimeInPrison: 'no' } };
const populatedNoEditModeRequest = { session: { editSection: 'prison', ...customerDetails }, body: { spentTimeInPrison: 'no' } };

describe('prison controller', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('getPrison function (GET /have-you-spent-any-time-in-prison)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', (done) => {
      prisonController.getPrison(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/prison');
      assert.isUndefined(populatedSessionEditModeGet.session.editSection);
      assert.isUndefined(genericResponse.data.details);
      done();
    });
    it('should return view name when called with populated response data when session is set', (done) => {
      prisonController.getPrison(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/prison');
      assert.isUndefined(populatedSessionEditModeGet.session.editSection);
      assert.isTrue(genericResponse.data.details);
      done();
    });
    it('should return view name when called with populated response data when session is set and in edit mode', (done) => {
      prisonController.getPrison(populatedSessionEditModeGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/prison');
      assert.equal(populatedSessionEditModeGet.session.editSection, 'prison');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe('postPrison function (POST /have-you-spent-any-time-in-prison)', () => {
    it('should return default view name with errors when called with empty object', (done) => {
      prisonController.postPrison(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/prison');
      assert.equal(genericResponse.data.errors.spentTimeInPrison.text, 'Select yes if you have spent any time in prison since 8 September 2020');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return default view name with errors when called with invalid object', (done) => {
      prisonController.postPrison(invalidRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/prison');
      assert.equal(genericResponse.data.errors.spentTimeInPrison.text, 'Select yes if you have spent any time in prison since 8 September 2020');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return redirect to contact details screen when called with valid yes object', (done) => {
      prisonController.postPrison(populatedYesRequest, genericResponse);
      assert.equal(genericResponse.address, '/have-you-ever-lived-outside-of-the-uk');
      assert.equal(populatedYesRequest.session.prison.spentTimeInPrison, 'yes');
      assert.equal(Object.keys(populatedYesRequest.session.prison).length, 1);
      done();
    });

    it('should return redirect to check your details screen when called with valid yes object in edit mode', (done) => {
      prisonController.postPrison(populatedYesEditModeRequest, genericResponse);
      assert.equal(genericResponse.address, '/check-your-details');
      assert.equal(populatedYesEditModeRequest.session.prison.spentTimeInPrison, 'yes');
      assert.equal(Object.keys(populatedYesEditModeRequest.session.prison).length, 1);
      done();
    });

    it('should return redirect to contact details screen when called with valid no object', (done) => {
      prisonController.postPrison(populatedNoRequest, genericResponse);
      assert.equal(genericResponse.address, '/have-you-ever-lived-outside-of-the-uk');
      assert.equal(populatedNoRequest.session.prison.spentTimeInPrison, 'no');
      assert.equal(Object.keys(populatedNoRequest.session.prison).length, 1);
      done();
    });

    it('should return redirect to check your details screen when called with valid no object in edit mode', (done) => {
      prisonController.postPrison(populatedNoEditModeRequest, genericResponse);
      assert.equal(genericResponse.address, '/check-your-details');
      assert.equal(populatedNoEditModeRequest.session.prison.spentTimeInPrison, 'no');
      assert.equal(Object.keys(populatedNoEditModeRequest.session.prison).length, 1);
      done();
    });
  });
});
