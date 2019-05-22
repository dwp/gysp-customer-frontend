const { assert } = require('chai');
const i18n = require('i18next');

const i18nConfig = require('../../../../config/i18n');

const validation = require('../../../../lib/validations/benefitsValidation');

const emptyObject = {};

const blankObject = { receivingBenefits: '' };

const invalidObject = { receivingBenefits: 'bob' };

const validYes = { receivingBenefits: 'yes' };

const validNo = { receivingBenefits: 'no' };

const errorSummaryResponse = [
  { href: '#receivingBenefits-yes', text: 'Dewiswch ydw os ydych yn cael unrhyw fudd-daliadau.', attributes: {} },
];

describe('benefits validator - CY', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  it('should return errors if empty object is not provided', () => {
    const response = validation.benefitsValidation(emptyObject, 'cy');
    assert.lengthOf(Object.keys(response), 2);
    assert.equal(JSON.stringify(response.errorSummary), JSON.stringify(errorSummaryResponse));
  });
  describe('receivingBenefits field', () => {
    it('should return error if receivingBenefits is not provided', () => {
      const response = validation.benefitsValidation(blankObject, 'cy');
      assert.equal(response.receivingBenefits.visuallyHiddenText, 'Gwall');
      assert.equal(response.receivingBenefits.text, 'Dewiswch ydw os ydych yn cael unrhyw fudd-daliadau.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch ydw os ydych yn cael unrhyw fudd-daliadau.');
    });

    it('should return error if receivingBenefits is supplied with invalid object', () => {
      const response = validation.benefitsValidation(invalidObject, 'cy');
      assert.equal(response.receivingBenefits.visuallyHiddenText, 'Gwall');
      assert.equal(response.receivingBenefits.text, 'Dewiswch ydw os ydych yn cael unrhyw fudd-daliadau.');
      assert.equal(response.errorSummary[0].text, 'Dewiswch ydw os ydych yn cael unrhyw fudd-daliadau.');
    });

    it('should return no error if receivingBenefits is supplied with yes', () => {
      const response = validation.benefitsValidation(validYes, 'cy');
      assert.isUndefined(response.receivingBenefits);
      assert.isUndefined(response.errorSummary);
    });

    it('should return no error if receivingBenefits is supplied with no', () => {
      const response = validation.benefitsValidation(validNo, 'cy');
      assert.isUndefined(response.receivingBenefits);
      assert.isUndefined(response.errorSummary);
    });
  });
});
