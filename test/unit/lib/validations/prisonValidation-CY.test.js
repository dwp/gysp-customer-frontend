const { assert } = require('chai');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/prisonValidation');

const statePensionDate = '1 Ionawr 2020';

const emptyObject = {};

const blankObject = { spentTimeInPrison: '' };

const invalidObject = { spentTimeInPrison: 'bob' };

const validYes = { spentTimeInPrison: 'yes' };

const validNo = { spentTimeInPrison: 'no' };

const errorSummaryResponse = [
  { href: '#spentTimeInPrison-yes', text: `Dewiswch ydw os ydych wedi treulio unrhyw amser yn y carchar ers ${statePensionDate}` },
];

describe('prison validator - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.prisonValidation(emptyObject, statePensionDate, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });
  describe('spentTimeInPrison field', () => {
    it('should return error if spentTimeInPrison is not provided', () => {
      const response = validation.prisonValidation(blankObject, statePensionDate, 'cy');
      assert.equal(response.spentTimeInPrison.visuallyHiddenText, 'Gwall');
      assert.equal(response.spentTimeInPrison.text, `Dewiswch ydw os ydych wedi treulio unrhyw amser yn y carchar ers ${statePensionDate}`);
      assert.equal(response.errorSummary[0].text, `Dewiswch ydw os ydych wedi treulio unrhyw amser yn y carchar ers ${statePensionDate}`);
    });

    it('should return error if spentTimeInPrison is supplied with invalid object', () => {
      const response = validation.prisonValidation(invalidObject, statePensionDate, 'cy');
      assert.equal(response.spentTimeInPrison.visuallyHiddenText, 'Gwall');
      assert.equal(response.spentTimeInPrison.text, `Dewiswch ydw os ydych wedi treulio unrhyw amser yn y carchar ers ${statePensionDate}`);
      assert.equal(response.errorSummary[0].text, `Dewiswch ydw os ydych wedi treulio unrhyw amser yn y carchar ers ${statePensionDate}`);
    });

    it('should return no error if spentTimeInPrison is supplied with yes', () => {
      const response = validation.prisonValidation(validYes, statePensionDate, 'cy');
      assert.isUndefined(response.spentTimeInPrison);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if spentTimeInPrison is supplied with no', () => {
      const response = validation.prisonValidation(validNo, statePensionDate, 'cy');
      assert.isUndefined(response.spentTimeInPrison);
      assert.isUndefined(response.errorSummary);
    });
  });
});
