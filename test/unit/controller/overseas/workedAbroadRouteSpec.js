const { assert } = require('chai');

const overseasController = require('../../../../app/routes/overseas/worked/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const sessionRequest = { session: { 'worked-abroad': true }, body: {} };
const populatedRequestYes = { session: {}, body: { workedAbroad: 'yes' } };
const populatedRequestNo = { session: {}, body: { workedAbroad: 'no' } };
const populatedRequestYesEdit = { session: { editSection: 'worked-abroad' }, body: { workedAbroad: 'yes' } };
const populatedRequestNoEdit = { session: { editSection: 'worked-abroad' }, body: { workedAbroad: 'no' } };
const populatedRequestMoreFields = { session: {}, body: { hats: true, workedAbroad: 'yes' } };

describe('Overseas controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' workedAbroadGet function (GET /have-you-worked-outside-of-the-uk)', () => {
    it('should return view name when called with no view session data', (done) => {
      overseasController.workedAbroadGet(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/worked-abroad');
      assert.isUndefined(genericResponse.data.details);
      done();
    });
    it('should return view name when called with view session data when session is populated', (done) => {
      overseasController.workedAbroadGet(sessionRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/worked-abroad');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' workedAbroadPost function (POST /have-you-worked-outside-of-the-uk)', () => {
    it('should return default view name when called', (done) => {
      overseasController.workedAbroadPost(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/worked-abroad');
      done();
    });

    it('should return redirect to countries list when called with valid yes object', (done) => {
      overseasController.workedAbroadPost(populatedRequestYes, genericResponse);
      assert.equal(genericResponse.address, 'what-countries-have-you-worked-in');
      assert.equal(populatedRequestYes.session['worked-abroad'].workedAbroad, 'yes');
      done();
    });

    it('should return redirect to countries list when called with valid no object', (done) => {
      overseasController.workedAbroadPost(populatedRequestNo, genericResponse);
      assert.equal(genericResponse.address, 'what-is-your-current-marital-status');
      assert.equal(populatedRequestNo.session['worked-abroad'].workedAbroad, 'no');
      done();
    });

    it('should return redirect to countries list when called with valid yes object and in edit mode', (done) => {
      overseasController.workedAbroadPost(populatedRequestYesEdit, genericResponse);
      assert.equal(genericResponse.address, 'what-countries-have-you-worked-in');
      assert.equal(populatedRequestYes.session['worked-abroad'].workedAbroad, 'yes');
      done();
    });

    it('should return redirect to check change page when called with valid no object and in edit mode', (done) => {
      overseasController.workedAbroadPost(populatedRequestNoEdit, genericResponse);
      assert.equal(genericResponse.address, 'check-your-details');
      assert.equal(populatedRequestNo.session['worked-abroad'].workedAbroad, 'no');
      done();
    });

    it('should filter out any post items that are not allowed', (done) => {
      overseasController.workedAbroadPost(populatedRequestMoreFields, genericResponse);
      assert.equal(genericResponse.address, 'what-countries-have-you-worked-in');
      assert.equal(populatedRequestMoreFields.session['worked-abroad'].workedAbroad, 'yes');
      assert.isUndefined(populatedRequestMoreFields.session['worked-abroad'].hats);
      done();
    });
  });
});
