const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/cookieValidation');

const emptyObject = {};

const blankObject = { cookieConsent: '' };

const invalidObject = { cookieConsent: 'bob' };

const validYes = { cookieConsent: 'yes' };

const validNo = { cookieConsent: 'no' };

const errorSummaryResponse = [
  { href: '#cookieConsent', text: 'Dewiswch gallwch os gallwn ddefnyddio cwcis i\'n helpu i wella\'r gwasanaeth.', attributes: {} },
];

describe('cookie validation - EN', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  it('should return errors if empty object is not provided', () => {
    const response = validation.cookieValidation(emptyObject, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });

  describe('consent field', () => {
    it('should return error if address is not provided', () => {
      const response = validation.cookieValidation(blankObject, 'cy');
      assert.equal(response.cookieConsent.visuallyHiddenText, 'Gwall');
      assert.equal(response.cookieConsent.text, 'Dewiswch gallwch os gallwn ddefnyddio cwcis i\'n helpu i wella\'r gwasanaeth.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch gallwch os gallwn ddefnyddio cwcis i\'n helpu i wella\'r gwasanaeth.');
    });

    it('should return error if address is supplied with invalid object', () => {
      const response = validation.cookieValidation(invalidObject, 'cy');
      assert.equal(response.cookieConsent.visuallyHiddenText, 'Gwall');
      assert.equal(response.cookieConsent.text, 'Dewiswch gallwch os gallwn ddefnyddio cwcis i\'n helpu i wella\'r gwasanaeth.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch gallwch os gallwn ddefnyddio cwcis i\'n helpu i wella\'r gwasanaeth.');
    });

    it('should return no error if address is supplied with yes', () => {
      const response = validation.cookieValidation(validYes, 'cy');
      assert.isUndefined(response.cookieConsent);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if address is supplied with no', () => {
      const response = validation.cookieValidation(validNo, 'cy');
      assert.isUndefined(response.cookieConsent);
      assert.isUndefined(response.errorSummary);
    });
  });
});
