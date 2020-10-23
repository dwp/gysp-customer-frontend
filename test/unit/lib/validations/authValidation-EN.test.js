const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/authValidation');

const emptyKey = { inviteKey: '', address: '' };

const validKey = { inviteKey: 'BLOGG1F4A5', address: 'yes' };

const validKeyNo = { inviteKey: 'BLOGG1F4A5', address: 'no' };

const validKeyOther = { inviteKey: 'BLOGG1F4A5', address: 'other' };

describe('Form auth validator', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('inviteKey fields ', () => {
    it('should return error if inviteKey is not provided', () => {
      const authValidationResponse = validation.authValidation(emptyKey);
      assert.equal(authValidationResponse.inviteKey.visuallyHiddenText, 'Error');
      assert.equal(authValidationResponse.inviteKey.text, 'Enter your invitation code.');
    });

    it('should return no error if inviteKey is supplied', () => {
      const authValidationResponse = validation.authValidation(validKey);
      assert.isUndefined(authValidationResponse.inviteKey);
    });
  });

  describe('address fields ', () => {
    it('should return error if inviteKey is not provided', () => {
      const authValidationResponse = validation.authValidation(emptyKey);
      assert.equal(authValidationResponse.address.visuallyHiddenText, 'Error');
      assert.equal(authValidationResponse.address.text, 'Select Yes if you are living at the address we sent your invitation letter to.');
    });

    it('should return error if inviteKey is provided as something that is not yes/no', () => {
      const authValidationResponse = validation.authValidation(validKeyOther);
      assert.equal(authValidationResponse.address.visuallyHiddenText, 'Error');
      assert.equal(authValidationResponse.address.text, 'Select Yes if you are living at the address we sent your invitation letter to.');
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
