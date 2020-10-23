const { assert } = require('chai');
const overseas = require('../../../../lib/middleware/overseasAuth');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {} };
const overseasFalseRequest = { session: { isOverseas: false } };
const overseasTrueRequest = { session: { isOverseas: true } };

describe('overseasAuth middleware', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  it('should do nothing as there is an empty request', () => {
    overseas(emptyRequest, genericResponse, () => {
      assert.equal(genericResponse.address, '');
    });
  });

  it('should do nothing as overseas false', () => {
    overseas(overseasFalseRequest, genericResponse, () => {
      assert.equal(genericResponse.address, '');
    });
  });

  it('should redirect to auth paga as overseas is true', () => {
    overseas(overseasTrueRequest, genericResponse, () => {
      assert.equal(genericResponse.address, '/auth');
    });
  });
});
