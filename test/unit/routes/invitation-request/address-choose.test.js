const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/address-choose/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};

const addressLookup = [{ uprn: '1', singleLine: '1 Address, Town, POST CODE', alternativeSingleLine: null }];
const validBody = { uprn: '1' };
const validManualBody = { uprn: 'manual' };
const emptyRequest = { session: { addressLookup } };
const validRequest = { session: {}, body: { ...validBody } };
const validManualRequest = { session: {}, body: { ...validManualBody } };
const populatedRequest = { session: { addressLookup, 'request-invitation-address-choose': { ...validBody } } };

describe('request invitation address controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/confirm-full-address)', () => {
    it('should return view without data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-choose');
      assert.isUndefined(genericResponse.data.details);
    });

    it('should return view with data when session is populated', () => {
      controller.get(populatedRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-choose');
      assert.isArray(genericResponse.data.addressList);
    });
  });

  describe('post function (POST /request-invitation/home-address)', () => {
    it('should return view with error when post request is empty', () => {
      controller.post(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-choose');
      assert.lengthOf(Object.keys(genericResponse.data.errors), 2);
      assert.isUndefined(genericResponse.data.details);
    });

    it('should save form data and redirect to check details screen when address is selected', () => {
      controller.post(validRequest, genericResponse);
      assert.deepEqual(validRequest.session['request-invitation-address-choose'], validBody);
      assert.equal(genericResponse.address, 'check-details');
    });

    it('should save form data and redirect to manual address screen when manual is selected', () => {
      controller.post(validManualRequest, genericResponse);
      assert.deepEqual(validManualRequest.session['request-invitation-address-choose'], validManualBody);
      assert.equal(genericResponse.address, 'what-is-your-address');
    });
  });
});
