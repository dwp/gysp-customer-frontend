const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/address-manual/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};

const validBody = {
  addressLine1: '1',
  addressLine2: 'Street',
  addressTown: 'Town',
  addressPostcode: 'NE1 1ET',
};
const crownDependencyBody = { ...validBody, addressPostcode: 'JE2 3GX' };
const emptyRequest = { session: {} };
const validRequest = { session: {}, body: { ...validBody } };
const validFilterRequest = { session: {}, body: { ...validBody, foo: 'bar' } };
const crownDependencyRequest = { session: {}, body: { ...crownDependencyBody } };
const populatedRequest = { session: { 'request-invitation-manual': { ...validBody } } };

describe('request invitation address manual controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/what-is-your-address)', () => {
    it('should return view without data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-manual');
      assert.isUndefined(genericResponse.data.details);
    });

    it('should return view with data when session is populated', () => {
      controller.get(populatedRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-manual');
      assert.deepEqual(genericResponse.data.details, populatedRequest.session['request-invitation-address-manual']);
    });
  });

  describe('post function (POST /request-invitation/what-is-your-address)', () => {
    it('should return view with error when post request is empty', () => {
      controller.post(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-manual');
      assert.lengthOf(Object.keys(genericResponse.data.errors), 5);
      assert.isUndefined(genericResponse.data.details);
    });

    it('should save data and redirect when post request is valid', () => {
      controller.post(validRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-address-manual'], validBody);
      assert.equal(genericResponse.address, 'check-details');
    });

    it('should filter save valid data and redirect when post request has invalid field data', () => {
      controller.post(validFilterRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-address-manual'], validBody);
      assert.equal(genericResponse.address, 'check-details');
    });

    it('should save form data and redirect to retire-abroad page when postcode is a crown dependency', () => {
      controller.post(crownDependencyRequest, genericResponse);
      assert.deepEqual(crownDependencyRequest.session['request-invitation-address-manual'], crownDependencyBody);
      assert.equal(genericResponse.address, 'https://www.gov.uk/state-pension-if-you-retire-abroad');
    });
  });
});
