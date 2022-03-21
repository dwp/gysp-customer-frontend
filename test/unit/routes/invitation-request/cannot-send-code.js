const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/cannot-send-code/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: { } };

describe('request invitation cannot send code controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/cannot-send-code)', () => {
    it('should return view cannot-send-code when called with empty request', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/cannot-send-code');
      assert.isUndefined(genericResponse.data);
    });
  });
});
