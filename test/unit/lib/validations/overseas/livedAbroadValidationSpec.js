const assert = require('assert');
const validation = require('../../../../../lib/validations/overseasValidation');

const emptyObject = {};
const populatedValidationFormYes = { livedAbroad: 'yes' };
const populatedValidationFormNo = { livedAbroad: 'no' };
const populatedValidationFormOther = { livedAbroad: 'other' };

const populatedValidationFormYesWorked = { workedAbroad: 'yes' };
const populatedValidationFormNoWorked = { workedAbroad: 'no' };
const populatedValidationFormOtherWorked = { workedAbroad: 'other' };

describe('Overseas validation', () => {
  describe('livedAbroad', () => {
    it('should return error if answer is empty', () => {
      const validationResponse = validation.livedAbroad(emptyObject);
      assert.equal(validationResponse.livedAbroad.text, 'lived-abroad:fields.livedAbroad.errors.required');
    });

    it('should return error if answer is set as something that is not yes or no', () => {
      const validationResponse = validation.livedAbroad(populatedValidationFormOther);
      assert.equal(validationResponse.livedAbroad.text, 'lived-abroad:fields.livedAbroad.errors.required');
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
      assert.equal(validationResponse.workedAbroad.text, 'worked-abroad:fields.workedAbroad.errors.required');
    });

    it('should return error if answer is set as something that is not yes or no', () => {
      const validationResponse = validation.workedAbroad(populatedValidationFormOtherWorked);
      assert.equal(validationResponse.workedAbroad.text, 'worked-abroad:fields.workedAbroad.errors.required');
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
