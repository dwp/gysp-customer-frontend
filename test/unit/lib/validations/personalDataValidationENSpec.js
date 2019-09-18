const { assert } = require('chai');
const i18n = require('i18next');

const i18nConfig = require('../../../../config/i18n');

const validation = require('../../../../lib/validations/personalDataValidation');

const emptyObject = {};

const blankObject = { personalDataPermission: '' };

const invalidObject = { personalDataPermission: 'bob' };

const validYes = { personalDataPermission: 'yes' };

const validNo = { personalDataPermission: 'no' };

const errorSummaryResponse = [
  { href: '#personalDataPermission-yes', text: 'Select Yes if we can use this information when you claim your State Pension.', attributes: {} },
];

describe('personal data - EN', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.personalDataValidation(emptyObject);
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });
  describe('personalDataPermission field', () => {
    it('should return error if personalDataPermission is not provided', () => {
      const response = validation.personalDataValidation(blankObject);
      assert.equal(response.personalDataPermission.visuallyHiddenText, 'Error');
      assert.equal(response.personalDataPermission.text, 'Select Yes if we can use this information when you claim your State Pension.');
      assert.equal(response.errorSummary[0].text, 'Select Yes if we can use this information when you claim your State Pension.');
    });

    it('should return error if personalDataPermission is supplied with invalid object', () => {
      const response = validation.personalDataValidation(invalidObject);
      assert.equal(response.personalDataPermission.visuallyHiddenText, 'Error');
      assert.equal(response.personalDataPermission.text, 'Select Yes if we can use this information when you claim your State Pension.');
      assert.equal(response.errorSummary[0].text, 'Select Yes if we can use this information when you claim your State Pension.');
    });

    it('should return no error if personalDataPermission is supplied with yes', () => {
      const response = validation.personalDataValidation(validYes);
      assert.isUndefined(response.personalDataPermission);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if personalDataPermission is supplied with no', () => {
      const response = validation.personalDataValidation(validNo);
      assert.isUndefined(response.personalDataPermission);
      assert.isUndefined(response.errorSummary);
    });
  });
});
