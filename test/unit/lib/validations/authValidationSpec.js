const { assert } = require('chai');

const validation = require('../../../../lib/validations/authValidation');

const emptyKey = { inviteKey: '', address: '' };

const validKey = { inviteKey: 'BLOGG1F4A5', address: 'yes' };

const validKeyNo = { inviteKey: 'BLOGG1F4A5', address: 'no' };

const validKeyOther = { inviteKey: 'BLOGG1F4A5', address: 'other' };

describe('Form auth validator', () => {
  describe('inviteKey fields ', () => {
    it('should return error if inviteKey is not provided', () => {
      const authValidationResponse = validation.authValidation(emptyKey);
      assert.equal(authValidationResponse.inviteKey.text, 'auth:fields.inviteKey.errors.required');
    });

    it('should return no error if inviteKey is supplied', () => {
      const authValidationResponse = validation.authValidation(validKey);
      assert.isUndefined(authValidationResponse.inviteKey);
    });
  });

  describe('address fields ', () => {
    it('should return error if inviteKey is not provided', () => {
      const authValidationResponse = validation.authValidation(emptyKey);
      assert.equal(authValidationResponse.address.text, 'auth:fields.address.errors.required');
    });
    it('should return error if inviteKey is provided as something that is not yes/no', () => {
      const authValidationResponse = validation.authValidation(validKeyOther);
      assert.equal(authValidationResponse.address.text, 'auth:fields.address.errors.required');
    });
    it('should return no error if inviteKey yes', () => {
      const authValidationResponse = validation.authValidation(validKey);
      assert.isUndefined(authValidationResponse.address);
    });
    it('should return no error if inviteKey no', () => {
      const authValidationResponse = validation.authValidation(validKeyNo);
      assert.isUndefined(authValidationResponse.address);
    });
  });
});
