const { assert } = require('chai');
const verify = require('../../../lib/verify');

const pidInDatabaseResponseBody = { pid: 'billy', levelOfAssurance: 'LEVEL_1', attributes: null };
const validVerifyUserObject = { pid: 'billy', levelOfAssurance: 'LEVEL_1', attributes: null };

const validRequestObject = { session: { requestId: '123' } };

let requestObject = {};

describe('verify', () => {
  describe('verifyUser', () => {
    it('should return and object when PID is in the database', () => {
      assert.equal(JSON.stringify(verify.verifyUser(pidInDatabaseResponseBody)), JSON.stringify(validVerifyUserObject));
    });
  });

  describe('saveRequestId', () => {
    it('should return and object when PID is in the database', () => {
      requestObject = { session: {} };
      verify.saveRequestId(validRequestObject.session.requestId, requestObject);
      assert.equal(JSON.stringify(requestObject), JSON.stringify(validRequestObject));
    });
  });

  describe('loadRequestId', () => {
    it('should return request id when available in request', () => {
      assert.equal(verify.loadRequestId(validRequestObject), validRequestObject.session.requestId);
    });
  });
});
