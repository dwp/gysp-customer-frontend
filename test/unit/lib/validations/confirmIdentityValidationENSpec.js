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
  { href: '#authType-invite', text: 'Select whether or not you have an invitation letter.', attributes: {} },
];

describe('confirm identity validator - EN', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.authTypeValidation(emptyObject);
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });
  describe('receivingBenefits field', () => {
    it('should return error if authType is not provided', () => {
      const response = validation.authTypeValidation(blankObject);
      assert.equal(response.authType.visuallyHiddenText, 'Error');
      assert.equal(response.authType.text, 'Select whether or not you have an invitation letter.');
      assert.equal(response.errorSummary[0].text, 'Select whether or not you have an invitation letter.');
    });

    it('should return error if authType is supplied with invalid object', () => {
      const response = validation.authTypeValidation(invalidObject);
      assert.equal(response.authType.visuallyHiddenText, 'Error');
      assert.equal(response.authType.text, 'Select whether or not you have an invitation letter.');
      assert.equal(response.errorSummary[0].text, 'Select whether or not you have an invitation letter.');
    });

    it('should return no error if authType is supplied with invite', () => {
      const response = validation.authTypeValidation(validInvite);
      assert.isUndefined(response.authType);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if authType is supplied with verify', () => {
      const response = validation.authTypeValidation(validVerify);
      assert.isUndefined(response.authType);
      assert.isUndefined(response.errorSummary);
    });
  });
});
