const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/invitationCodeChooseValidation');

const emptyObject = {};

const blankObject = { hasInvitationCode: '' };

const invalidObject = { hasInvitationCode: 'bob' };

const validInvite = { hasInvitationCode: 'yes' };

const validVerify = { hasInvitationCode: 'no' };

const errorSummaryResponse = [
  { href: '#hasInvitationCode-yes', text: 'Dewiswch oes os oes gennych eich cod gwahoddiad', attributes: {} },
];

describe('confirm identity validator - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.validator(emptyObject, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });

  describe('receivingBenefits field', () => {
    it('should return error if hasInvitationCode is not provided', () => {
      const response = validation.validator(blankObject, 'cy');
      assert.equal(response.hasInvitationCode.visuallyHiddenText, 'Gwall');
      assert.equal(response.hasInvitationCode.text, 'Dewiswch oes os oes gennych eich cod gwahoddiad');
      assert.equal(response.errorSummary[0].text, 'Dewiswch oes os oes gennych eich cod gwahoddiad');
    });

    it('should return error if hasInvitationCode is supplied with invalid object', () => {
      const response = validation.validator(invalidObject, 'cy');
      assert.equal(response.hasInvitationCode.visuallyHiddenText, 'Gwall');
      assert.equal(response.hasInvitationCode.text, 'Dewiswch oes os oes gennych eich cod gwahoddiad');
      assert.equal(response.errorSummary[0].text, 'Dewiswch oes os oes gennych eich cod gwahoddiad');
    });

    it('should return no error if hasInvitationCode is supplied with invite', () => {
      const response = validation.validator(validInvite, 'cy');
      assert.isUndefined(response.hasInvitationCode);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if hasInvitationCode is supplied with verify', () => {
      const response = validation.validator(validVerify, 'cy');
      assert.isUndefined(response.hasInvitationCode);
      assert.isUndefined(response.errorSummary);
    });
  });
});
