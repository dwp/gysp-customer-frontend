const { assert } = require('chai');

const overseasController = require('../../../../app/routes/overseas/lived/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const sessionRequest = { session: { 'lived-abroad': true }, body: {} };
const populatedRequestYes = { session: {}, body: { livedAbroad: 'yes' } };
const populatedRequestNo = { session: {}, body: { livedAbroad: 'no' } };
const populatedRequestYesEdit = { session: { editSection: 'lived-abroad' }, body: { livedAbroad: 'yes' } };
const populatedRequestNoEdit = { session: { editSection: 'lived-abroad' }, body: { livedAbroad: 'no' } };
const populatedRequestMoreFields = { session: {}, body: { hats: true, livedAbroad: 'yes' } };

describe('Overseas controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' livedAbroadGet function (GET /have-you-lived-outside-of-the-uk)', () => {
    it('should return view name when called with no view session data', (done) => {
      overseasController.livedAbroadGet(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/lived-abroad');
      assert.isUndefined(genericResponse.data.details);
      done();
    });
    it('should return view name when called with view session data when session is populated', (done) => {
      overseasController.livedAbroadGet(sessionRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/lived-abroad');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' livedAbroadPost function (POST /have-you-lived-outside-of-the-uk)', () => {
    it('should return default view name when called', (done) => {
      overseasController.livedAbroadPost(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/lived-abroad');
      done();
    });

    it('should return redirect to countries list when called with valid yes object', (done) => {
      overseasController.livedAbroadPost(populatedRequestYes, genericResponse);
      assert.equal(genericResponse.address, 'what-countries-have-you-lived-in');
      assert.equal(populatedRequestYes.session['lived-abroad'].livedAbroad, 'yes');
      done();
    });

    it('should return redirect to countries list when called with valid no object', (done) => {
      overseasController.livedAbroadPost(populatedRequestNo, genericResponse);
      assert.equal(genericResponse.address, 'have-you-worked-outside-of-the-uk');
      assert.equal(populatedRequestNo.session['lived-abroad'].livedAbroad, 'no');
      done();
    });

    it('should return redirect to countries list when called with valid yes object and in edit mode', (done) => {
      overseasController.livedAbroadPost(populatedRequestYesEdit, genericResponse);
      assert.equal(genericResponse.address, 'what-countries-have-you-lived-in');
      assert.equal(populatedRequestYes.session['lived-abroad'].livedAbroad, 'yes');
      done();
    });

    it('should return redirect to check change page when called with valid no object and in edit mode', (done) => {
      overseasController.livedAbroadPost(populatedRequestNoEdit, genericResponse);
      assert.equal(genericResponse.address, 'check-your-details');
      assert.equal(populatedRequestNo.session['lived-abroad'].livedAbroad, 'no');
      done();
    });

    it('should filter out any post items that are not allowed', (done) => {
      overseasController.livedAbroadPost(populatedRequestMoreFields, genericResponse);
      assert.equal(genericResponse.address, 'what-countries-have-you-lived-in');
      assert.equal(populatedRequestMoreFields.session['lived-abroad'].livedAbroad, 'yes');
      assert.isUndefined(populatedRequestMoreFields.session['lived-abroad'].hats);
      done();
    });
  });
});
