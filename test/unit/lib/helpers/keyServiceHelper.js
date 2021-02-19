const { assert } = require('chai');
const { HTTPError } = require('got/dist/source');

const nock = require('nock');

nock.disableNetConnect();

const responseHelper = require('../../../lib/responseHelper');
const keyServiceHelper = require('../../../../lib/helpers/keyServiceHelper');

const genericResponse = responseHelper.genericResponse();

const keyAPI = '/api/key';
const inviteKey = 'INVITEKEY';

describe('key service helper ', () => {
  describe('getInviteKeyRequest  ', () => {
    it('should return true when key is found', async () => {
      nock('http://test-url').get(`${keyAPI}/${inviteKey}`).reply(200, { inviteKey, status: null });
      const response = await keyServiceHelper.getInviteKeyRequest(genericResponse, inviteKey);
      assert.isTrue(response);
    });

    it('should return error when key is not found', async () => {
      nock('http://test-url').get(`${keyAPI}/${inviteKey}`).reply(404, {});
      try {
        await keyServiceHelper.getInviteKeyRequest(genericResponse, inviteKey);
      } catch (err) {
        assert.instanceOf(err, HTTPError);
        assert.equal(err.message, 'Response code 404 (Not Found)');
      }
    });

    it('should return error when key is found but used', async () => {
      nock('http://test-url').get(`${keyAPI}/${inviteKey}`).reply(200, { inviteKey, status: 'USED' });
      try {
        await keyServiceHelper.getInviteKeyRequest(genericResponse, inviteKey);
      } catch (err) {
        assert.equal(err.message, 'Invite key used');
      }
    });
  });
});
