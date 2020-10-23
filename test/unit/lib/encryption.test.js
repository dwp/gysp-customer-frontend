const { assert } = require('chai');
const encryption = require('../../../lib/encryption');

const secret = 'ThisIsASecret';

describe('encryption', () => {
  describe('encrypt', () => {
    it('should return encrypted string', () => {
      assert.equal(typeof encryption.encrypt('test', secret), 'string');
    });
  });

  describe('decrypt', () => {
    it('should return decrypt string', () => {
      const en = encryption.encrypt('test', secret);
      const de = encryption.decrypt(en, secret);
      assert.equal(typeof de, 'string');
      assert.equal(de, 'test');
    });
  });
});
