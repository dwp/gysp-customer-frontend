const { assert } = require('chai');
const i18n = require('i18next');

const i18nConfig = require('../../../../config/i18n');

const validation = require('../../../../lib/validations/authValidation');

const emptyKey = { inviteKey: '', address: '' };

const validKey = { inviteKey: 'BLOGG1F4A5', address: 'yes' };

const validKeyNo = { inviteKey: 'BLOGG1F4A5', address: 'no' };

const validKeyOther = { inviteKey: 'BLOGG1F4A5', address: 'other' };

describe('Form auth validator', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  describe('inviteKey fields ', () => {
    it('should return error if inviteKey is not provided', () => {
      const authValidationResponse = validation.authValidation(emptyKey, 'cy');
      assert.equal(authValidationResponse.inviteKey.text, 'Rhowch eich cod gwahoddiad.');
    });

    it('should return no error if inviteKey is supplied', () => {
      const authValidationResponse = validation.authValidation(validKey, 'cy');
      assert.isUndefined(authValidationResponse.inviteKey);
    });
  });

  describe('address fields ', () => {
    it('should return error if inviteKey is not provided', () => {
      const authValidationResponse = validation.authValidation(emptyKey, 'cy');
      assert.equal(authValidationResponse.address.text, 'Dewiswch Ydw os ydych chi\'n byw yn y cyfeiriad a anfonwyd atoch.');
    });
    it('should return error if inviteKey is provided as something that is not yes/no', () => {
      const authValidationResponse = validation.authValidation(validKeyOther, 'cy');
      assert.equal(authValidationResponse.address.text, 'Dewiswch Ydw os ydych chi\'n byw yn y cyfeiriad a anfonwyd atoch.');
    });
    it('should return no error if inviteKey yes', () => {
      const authValidationResponse = validation.authValidation(validKey, 'cy');
      assert.isUndefined(authValidationResponse.address);
    });
    it('should return no error if inviteKey no', () => {
      const authValidationResponse = validation.authValidation(validKeyNo, 'cy');
      assert.isUndefined(authValidationResponse.address);
    });
  });
});
