const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/confirmIdentityValidation');

const emptyObject = {};

const blankObject = { authType: '' };

const invalidObject = { authType: 'bob' };

const validInvite = { authType: 'invite' };

const validVerify = { authType: 'verify' };

const errorSummaryResponse = [
  { href: '#authType-invite', text: 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.', attributes: {} },
];

describe('confirm identity validator - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.authTypeValidation(emptyObject, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });

  describe('receivingBenefits field', () => {
    it('should return error if authType is not provided', () => {
      const response = validation.authTypeValidation(blankObject, 'cy');
      assert.equal(response.authType.visuallyHiddenText, 'Gwall');
      assert.equal(response.authType.text, 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch a oes gennych lythyr gwahoddiad ai peidio.');
    });

    it('should return error if authType is supplied with invalid object', () => {
      const response = validation.authTypeValidation(invalidObject, 'cy');
      assert.equal(response.authType.visuallyHiddenText, 'Gwall');
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
