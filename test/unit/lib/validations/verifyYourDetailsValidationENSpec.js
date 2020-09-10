const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/verifyYourDetailsValidation');

const emptyObject = {};

const blankObject = { address: '' };

const invalidObject = { address: 'bob' };

const validYes = { address: 'yes' };

const validNo = { address: 'no' };

const errorSummaryResponse = [
  { href: '#address-yes', text: 'Select Yes if this is your current address.', attributes: {} },
];

describe('verify your details - EN', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.detailsValidation(emptyObject);
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });

  describe('address field', () => {
    it('should return error if address is not provided', () => {
      const response = validation.detailsValidation(blankObject);
      assert.equal(response.address.visuallyHiddenText, 'Error');
      assert.equal(response.address.text, 'Select Yes if this is your current address.');
      assert.equal(response.errorSummary[0].text, 'Select Yes if this is your current address.');
    });

    it('should return error if address is supplied with invalid object', () => {
      const response = validation.detailsValidation(invalidObject);
      assert.equal(response.address.visuallyHiddenText, 'Error');
      assert.equal(response.address.text, 'Select Yes if this is your current address.');
      assert.equal(response.errorSummary[0].text, 'Select Yes if this is your current address.');
    });

    it('should return no error if address is supplied with yes', () => {
      const response = validation.detailsValidation(validYes);
      assert.isUndefined(response.address);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if address is supplied with no', () => {
      const response = validation.detailsValidation(validNo);
      assert.isUndefined(response.address);
      assert.isUndefined(response.errorSummary);
    });
  });
});
