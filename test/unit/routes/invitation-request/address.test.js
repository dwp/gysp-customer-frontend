const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/address/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {} };

describe('request invitation address controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/home-address)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/address');
      assert.isUndefined(genericResponse.data);
    });
  });
});
