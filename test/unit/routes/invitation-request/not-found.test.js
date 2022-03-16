const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/address-not-found/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {} };

describe('request invitation address not found controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/no-addresses-found)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address-not-found');
      assert.isUndefined(genericResponse.data.nameNumber);
      assert.isUndefined(genericResponse.data.postcode);
    });
  });
});
