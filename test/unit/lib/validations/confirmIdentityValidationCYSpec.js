const { assert } = require('chai');
const i18n = require('i18next');

const i18nConfig = require('../../../../config/i18n');

const validation = require('../../../../lib/validations/confirmIdentityValidation');

const emptyObject = {};

const blankObject = { authType: '' };

const invalidObject = { authType: 'bob' };

const validInvite = { authType: 'invite' };

const validVerify = { authType: 'verify' };

const errorSummaryResponse = [
  { href: '#authType', text: 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.', attributes: {} },
];

describe('confirm identity validator - CY', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.authTypeValidation(emptyObject, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });
  describe('receivingBenefits field', () => {
    it('should return error if authType is not provided', () => {
      const response = validation.authTypeValidation(blankObject, 'cy');
      assert.equal(response.authType.text, 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.');
    });

    it('should return error if authType is supplied with invalid object', () => {
      const response = validation.authTypeValidation(invalidObject, 'cy');
      assert.equal(response.authType.text, 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.');
    });

    it('should return no error if authType is supplied with invite', () => {
      const response = validation.authTypeValidation(validInvite, 'cy');
      assert.isUndefined(response.authType);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if authType is supplied with verify', () => {
      const response = validation.authTypeValidation(validVerify, 'cy');
      assert.isUndefined(response.authType);
      assert.isUndefined(response.errorSummary);
    });
  });
});
