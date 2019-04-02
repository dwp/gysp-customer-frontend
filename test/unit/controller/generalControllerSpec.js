const { assert } = require('chai');

const accountController = require('../../../app/routes/general/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = {
  session: {},
  body: {
    paymentMethod: '', bankAccountHolder: '', bankAccountNumber: '', bankSortCodeField1: '', bankSortCodeField2: '', bankSortCodeField3: '',
  },
};

describe('General controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' redirectToStart function (GET /)', () => {
    it('should redirect when called with any response data', (done) => {
      accountController.redirectToStart(emptyRequest, genericResponse);
      assert.equal(genericResponse.address, '/confirm-identity');
      done();
    });
  });
});
