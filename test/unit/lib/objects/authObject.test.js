const assert = require('assert');
const authObject = require('../../../../lib/objects/authObject');

const validJson = { inviteKey: '1234567' };

const formObject = { inviteKey: '1234567' };

const keysToCheck = ['abc1234', 'AbC1234', 'ABc1234', 'ABC1234', ' ABc1234 ', 'ab c 1234', ' a   b c 1   2    3   4  '];

const keyWithSlash = 'ABC1234/';

describe('Auth object ', () => {
  describe(' convertor ', () => {
    it('should convert object to valid json', () => {
      const auth = authObject.authFormToObject(formObject);
      assert.equal(JSON.stringify(validJson), JSON.stringify(auth));
    });

    it('should convert inviteKey to URI encoded key', () => {
      const auth = authObject.authFormToObject({ inviteKey: keyWithSlash });
      assert.equal(auth.inviteKey, 'ABC1234%2F');
    });

    keysToCheck.forEach((key) => {
      it('should convert inviteKey to uppercase and remove spaces', () => {
        const auth = authObject.authFormToObject({ inviteKey: key });
        assert.equal(auth.inviteKey, 'ABC1234');
      });
    });
  });
});
