const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/name/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};

const validBody = { firstName: 'Derek', lastName: 'Trotter' };
const emptyRequest = { session: {} };
const validRequest = { session: {}, body: { ...validBody } };
const validFilterRequest = { session: {}, body: { ...validBody, foo: 'bar' } };
const populatedRequest = { session: { 'request-invitation-name': { ...validBody } } };

describe('request invitation name controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/your-name)', () => {
    it('should return view without data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/name');
      assert.isUndefined(genericResponse.data.details);
    });

    it('should return view with data when session is populated', () => {
      controller.get(populatedRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/name');
      assert.deepEqual(genericResponse.data.details, populatedRequest.session['request-invitation-name']);
    });
  });

  describe('post function (POST /request-invitation/your-name)', () => {
    it('should return view with error when post request is empty', () => {
      controller.post(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/name');
      assert.lengthOf(Object.keys(genericResponse.data.errors), 3);
      assert.isUndefined(genericResponse.data.details);
    });

    it('should save data and redirect when post request is valid', () => {
      controller.post(validRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-name'], validBody);
      assert.equal(genericResponse.address, 'date-of-birth');
    });

    it('should save valid data and redirect when post request is valid with extra data', () => {
      controller.post(validFilterRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-name'], validBody);
      assert.equal(genericResponse.address, 'date-of-birth');
    });
  });
});
