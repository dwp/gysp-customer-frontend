const { assert } = require('chai');

const checkChangeController = require('../../../app/routes/check-change/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { 'contact-details': { homeTelephoneNumber: '000000000' } } };
const emptyRequest = { session: {} };

const populatedSessionRequest = [{ uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '000000000'] }];

describe('Check change controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' getCheckChange function (GET /check-your-details)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', (done) => {
      checkChangeController.getCheckChange(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/check-change');
      assert.equal(JSON.stringify(genericResponse.data.details), '[]');
      done();
    });

    it('should return view name when called with populated response data when session is set', (done) => {
      checkChangeController.getCheckChange(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/check-change');
      assert.equal(JSON.stringify(genericResponse.data.details), JSON.stringify(populatedSessionRequest));
      done();
    });
  });
});
