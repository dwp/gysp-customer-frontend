const { assert } = require('chai');

const contactController = require('../../../app/routes/contact/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { 'contact-details': true } };
const emptyRequest = { session: {}, body: { preferredTelephoneNumber: '', additionalTelephoneNumber: '', email: '' } };
const populatedRequest = { session: {}, body: { cbHomeTelephoneNumber: 'true', homeTelephoneNumber: '12345 678', email: '' } };
const populatedRequestEdit = { session: { editSection: 'contact-details' }, body: { cbHomeTelephoneNumber: 'true', homeTelephoneNumber: '12345 678', email: '' } };
const populatedRequestMoreFields = {
  session: {},
  body: {
    spiderman: true, spidername: 'Ben', cbHomeTelephoneNumber: true, homeTelephoneNumber: '12345 678', email: '',
  },
};

describe('Contact controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' contactDetailsGet function (GET /contact-details)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', (done) => {
      contactController.contactDetailsGet(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/contactdetails');
      assert.isUndefined(genericResponse.data.details);
      done();
    });

    it('should return view name when called with populated response data when session is set', (done) => {
      contactController.contactDetailsGet(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/contactdetails');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' contactDetailsPost function (POST /contact-details)', () => {
    it('should return default view name when called with empty object', (done) => {
      contactController.contactDetailsPost(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/contactdetails');
      done();
    });

    it('should return redirect when called with valid object', (done) => {
      contactController.contactDetailsPost(populatedRequest, genericResponse);
      assert.equal(genericResponse.address, 'account-details');
      assert.equal(populatedRequest.session['contact-details'].homeTelephoneNumber, '12345 678');
      done();
    });

    it('should return redirect to check and change when called with valid object and in edit mode', (done) => {
      contactController.contactDetailsPost(populatedRequestEdit, genericResponse);
      assert.equal(genericResponse.address, 'check-your-details');
      assert.equal(populatedRequest.session['contact-details'].homeTelephoneNumber, '12345 678');
      done();
    });

    it('should filter out any post items that are not allowed', (done) => {
      contactController.contactDetailsPost(populatedRequestMoreFields, genericResponse);
      assert.equal(genericResponse.address, 'account-details');
      assert.isUndefined(populatedRequest.session['contact-details'].spiderman);
      assert.isUndefined(populatedRequest.session['contact-details'].spidername);
      done();
    });
  });
});
