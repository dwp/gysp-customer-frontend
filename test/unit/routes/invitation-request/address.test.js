const { assert } = require('chai');
const nock = require('nock');
const { StatusCodes } = require('http-status-codes');

nock.disableNetConnect();

const controller = require('../../../../app/routes/request-invitation/address/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};

const validBody = { nameNumber: '1', postcode: 'NE1 1ET' };
const crownDependencyBody = { nameNumber: '1', postcode: 'JE2 3GX' };
const emptyRequest = { session: {} };
const validRequest = { session: {}, body: { ...validBody } };
const crownDependencyRequest = { session: {}, body: { ...crownDependencyBody } };
const populatedRequest = { session: { 'request-invitation-address': { ...validBody } } };

const addressServiceUrl = '/api/lookup/address';
const addressServiceUrlQuery = {
  searchString: validBody.nameNumber,
  postcode: validBody.postcode,
  excludeBusiness: true,
  showSourceData: true,
};
const crownDependencyUrlQuery = {
  searchString: crownDependencyBody.nameNumber,
  postcode: crownDependencyBody.postcode,
  excludeBusiness: true,
  showSourceData: true,
};

describe('request invitation address controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/home-address)', () => {
    it('should return view without data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address');
      assert.isUndefined(genericResponse.data.details);
    });

    it('should return view with data when session is populated', () => {
      controller.get(populatedRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address');
      assert.deepEqual(genericResponse.data.details, populatedRequest.session['request-invitation-address']);
    });
  });

  describe('post function (POST /request-invitation/home-address)', () => {
    it('should return view with error when post request is empty', async () => {
      await controller.post(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address');
      assert.lengthOf(Object.keys(genericResponse.data.errors), 3);
      assert.isUndefined(genericResponse.data.details);
    });

    it('should save form data and redirect to not found screen when no data empty', async () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(200, { data: [] });
      await controller.post(validRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-address'], validBody);
      assert.equal(genericResponse.address, 'no-addresses-found');
    });

    it('should save form data and redirect to retire-abroad page when address is found but postcode is a crown dependency', async () => {
      nock('http://test-url').get(addressServiceUrl).query(crownDependencyUrlQuery).reply(200, { data: [{ foo: 'bar' }] });
      await controller.post(crownDependencyRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-address'], validBody);
      assert.equal(genericResponse.address, 'https://www.gov.uk/state-pension-if-you-retire-abroad');
    });

    it('should save form data and redirect to confirm-full-address when address date returned', async () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.OK, { data: [{ foo: 'bar' }] });
      await controller.post(validRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-address'], validBody);
      assert.deepEqual(validRequest.session.addressLookup, [{ foo: 'bar' }]);
      assert.equal(genericResponse.address, 'confirm-full-address');
    });

    it('should return error when api returns 404', async () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.NOT_FOUND);
      await controller.post(validRequest, genericResponse);
      assert.equal(genericResponse.statusCode, StatusCodes.OK);
      assert.equal(genericResponse.viewName, 'pages/error');
    });
  });
});
