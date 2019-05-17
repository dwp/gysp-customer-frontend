const assert = require('assert');
const i18n = require('i18next');

const i18nConfig = require('../../../../../config/i18n');
const validation = require('../../../../../lib/validations/overseasValidation');

const emptyObject = {};
const populatedValidationFormYes = { livedAbroad: 'yes' };
const populatedValidationFormNo = { livedAbroad: 'no' };
const populatedValidationFormOther = { livedAbroad: 'other' };

const populatedValidationFormYesWorked = { workedAbroad: 'yes' };
const populatedValidationFormNoWorked = { workedAbroad: 'no' };
const populatedValidationFormOtherWorked = { workedAbroad: 'other' };

describe('lived/worked abroad validation - CY', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  describe('livedAbroad', () => {
    it('should return error if answer is empty', () => {
      const validationResponse = validation.livedAbroad(emptyObject, 'cy');
      assert.equal(validationResponse.livedAbroad.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.livedAbroad.text, 'Dewiswch ydw os ydych  wedi byw y tu allan i\'r DU erioed.');
    });

    it('should return error if answer is set as something that is not yes or no', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormOther, 'cy');
      assert.equal(validationResponse.livedAbroad.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.livedAbroad.text, 'Dewiswch ydw os ydych  wedi byw y tu allan i\'r DU erioed.');
    });

    it('should return no error if yes answer is supplied', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormYes, 'cy');
      assert.equal(validationResponse.livedAbroad, undefined);
    });

    it('should return no error if no answer is supplied', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormNo, 'cy');
      assert.equal(validationResponse.livedAbroad, undefined);
    });
  });
  describe('workedAbroad', () => {
    it('should return error if answer is empty', () => {
      const validationResponse = validation.workedAbroad(emptyObject, 'cy');
      assert.equal(validationResponse.workedAbroad.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.workedAbroad.text, 'Dewiswch Ydw os ydych erioed wedi gweithio y tu allan i\'r DU.');
    });

    it('should return error if answer is set as something that is not yes or no', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormOtherWorked, 'cy');
      assert.equal(validationResponse.workedAbroad.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.workedAbroad.text, 'Dewiswch Ydw os ydych erioed wedi gweithio y tu allan i\'r DU.');
    });

    it('should return no error if yes answer is supplied', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormYesWorked, 'cy');
      assert.equal(validationResponse.workedAbroad, undefined);
    });

    it('should return no error if no answer is supplied', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormNoWorked, 'cy');
      assert.equal(validationResponse.workedAbroad, undefined);
    });
  });
});
