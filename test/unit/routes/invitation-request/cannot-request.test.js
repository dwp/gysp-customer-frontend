const { assert } = require('chai');

const controller = require('../../../../app/routes/request-invitation/cannot-request/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: { } };
const statePensionRequest = { session: { newStatePensionDate: { statePensionDate: 1649656800000 } } };

describe('request invitation cannot request controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/cannot-request-code)', () => {
    it('should return view name when called with empty request', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/cannot-request');
      assert.isNull(genericResponse.data.date);
    });

    it('should return view name when called with newStatePensionDate request', () => {
      controller.get(statePensionRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/cannot-request');
      assert.equal(genericResponse.data.date, '11 April 2022');
    });
  });
});
