const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const validation = require('../../../../../lib/validations/overseasValidation');

const emptyObject = {};
const populatedValidationFormYes = { livedAbroad: 'yes' };
const populatedValidationFormNo = { livedAbroad: 'no' };
const populatedValidationFormOther = { livedAbroad: 'other' };

const populatedValidationFormYesWorked = { workedAbroad: 'yes' };
const populatedValidationFormNoWorked = { workedAbroad: 'no' };
const populatedValidationFormOtherWorked = { workedAbroad: 'other' };

describe('lived/worked abroad validation - EN', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('livedAbroad', () => {
    it('should return error if answer is empty', () => {
      const validationResponse = validation.livedAbroad(emptyObject);
      assert.equal(validationResponse.livedAbroad.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.livedAbroad.text, 'Select Yes if you have ever lived outside of the UK.');
    });

    it('should return error if answer is set as something that is not yes or no', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormOther);
      assert.equal(validationResponse.livedAbroad.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.livedAbroad.text, 'Select Yes if you have ever lived outside of the UK.');
    });

    it('should return no error if yes answer is supplied', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormYes);
      assert.equal(validationResponse.livedAbroad, undefined);
    });

    it('should return no error if no answer is supplied', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormNo);
      assert.equal(validationResponse.livedAbroad, undefined);
    });
  });

  describe('workedAbroad', () => {
    it('should return error if answer is empty', () => {
      const validationResponse = validation.workedAbroad(emptyObject);
      assert.equal(validationResponse.workedAbroad.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.workedAbroad.text, 'Select Yes if you have ever worked outside of the UK.');
    });

    it('should return error if answer is set as something that is not yes or no', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormOtherWorked);
      assert.equal(validationResponse.workedAbroad.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.workedAbroad.text, 'Select Yes if you have ever worked outside of the UK.');
    });

    it('should return no error if yes answer is supplied', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormYesWorked);
      assert.equal(validationResponse.workedAbroad, undefined);
    });

    it('should return no error if no answer is supplied', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormNoWorked);
      assert.equal(validationResponse.workedAbroad, undefined);
    });
  });
});
