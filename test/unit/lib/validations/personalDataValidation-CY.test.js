const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/personalDataValidation');

const emptyObject = {};

const blankObject = { personalDataPermission: '' };

const invalidObject = { personalDataPermission: 'bob' };

const validYes = { personalDataPermission: 'yes' };

const validNo = { personalDataPermission: 'no' };

const errorSummaryResponse = [
  { href: '#personalDataPermission-yes', text: 'Dewiswch Gallwch os gallwn ddefnyddio\'r wybodaeth hon pan fyddwch yn gwneud cais am eich Pensiwn y Wladwriaeth.' },
];

describe('personal data - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.personalDataValidation(emptyObject, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });

  describe('personalDataPermission field', () => {
    it('should return error if personalDataPermission is not provided', () => {
      const response = validation.personalDataValidation(blankObject, 'cy');
      assert.equal(response.personalDataPermission.visuallyHiddenText, 'Gwall');
      assert.equal(response.personalDataPermission.text, 'Dewiswch Gallwch os gallwn ddefnyddio\'r wybodaeth hon pan fyddwch yn gwneud cais am eich Pensiwn y Wladwriaeth.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch Gallwch os gallwn ddefnyddio\'r wybodaeth hon pan fyddwch yn gwneud cais am eich Pensiwn y Wladwriaeth.');
    });

    it('should return error if personalDataPermission is supplied with invalid object', () => {
      const response = validation.personalDataValidation(invalidObject, 'cy');
      assert.equal(response.personalDataPermission.visuallyHiddenText, 'Gwall');
      assert.equal(response.personalDataPermission.text, 'Dewiswch Gallwch os gallwn ddefnyddio\'r wybodaeth hon pan fyddwch yn gwneud cais am eich Pensiwn y Wladwriaeth.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch Gallwch os gallwn ddefnyddio\'r wybodaeth hon pan fyddwch yn gwneud cais am eich Pensiwn y Wladwriaeth.');
    });

    it('should return no error if personalDataPermission is supplied with yes', () => {
      const response = validation.personalDataValidation(validYes, 'cy');
      assert.isUndefined(response.personalDataPermission);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if personalDataPermission is supplied with no', () => {
      const response = validation.personalDataValidation(validNo, 'cy');
      assert.isUndefined(response.personalDataPermission);
      assert.isUndefined(response.errorSummary);
    });
  });
});
