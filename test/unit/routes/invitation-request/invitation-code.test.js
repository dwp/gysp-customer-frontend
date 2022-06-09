const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/index/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {} };

describe('request invitation controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/index');
      assert.equal(emptyRequest.session.isNorthernIreland, 'neither');
      assert.equal(genericResponse.data.isNorthernIreland, 'neither');
    });
  });

  describe('post function (POST /request-invitation)', () => {
    it('should save session and redirect when ', () => {
      controller.post(emptyRequest, genericResponse);
      assert.isTrue(emptyRequest.session.userInInviteRequest);
      assert.equal(genericResponse.address, 'request-invitation-code/your-name');
    });
  });
});
