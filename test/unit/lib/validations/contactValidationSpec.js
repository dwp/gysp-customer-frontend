const assert = require('assert');
const validation = require('../../../../lib/validations/contactValidation');

const longTelephoneNumber = '12345678901234567890123456789012345678901234567890123456789012345678901';
const longEmail = 'qwertyuiopqwertyuiopqwertyuiopqwertyuiop@qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop.com';

const emptyObject = {
  cbHomeTelephoneNumber: '', cbMobileTelephoneNumber: '', cbWorkTelephoneNumber: '', homeTelephoneNumber: '', mobileTelephoneNumber: '', workTelephoneNumber: '', email: '',
};
const populatedValidationFormHome = {
  cbHomeTelephoneNumber: true, cbMobileTelephoneNumber: '', cbWorkTelephoneNumber: '', homeTelephoneNumber: '01929 939393', mobileTelephoneNumber: '', workTelephoneNumber: '', email: '',
};
const populatedValidationFormMobile = {
  cbHomeTelephoneNumber: '', cbMobileTelephoneNumber: true, cbWorkTelephoneNumber: '', homeTelephoneNumber: '', mobileTelephoneNumber: '01929 939393', workTelephoneNumber: '', email: '',
};
const populatedValidationFormWork = {
  cbHomeTelephoneNumber: '', cbMobileTelephoneNumber: '', cbWorkTelephoneNumber: true, homeTelephoneNumber: '', mobileTelephoneNumber: '', workTelephoneNumber: '01929 939393', email: '',
};

const populatedFailedValidationForm = { preferredTelephoneNumber: '01929x939393', additionalTelephoneNumber: '01929x939393', email: 'test' };

const populatedLongRequest = { preferredTelephoneNumber: longTelephoneNumber, additionalTelephoneNumber: longTelephoneNumber, email: longEmail };

let telephoneMessage;
let mobileMessage;
let workTelephone;

describe('Contact validation', () => {
  describe('detailsValidation', () => {
    it('should return error global if all fields are is empty', () => {
      const validationResponse = validation.detailsValidation(emptyObject);
      assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
      assert.equal(validationResponse.overAll.text, 'contact:fields.checkbox.errors.required');
    });

    it('should return no error if home is selected and telephone number is populated', () => {
      const validationResponse = validation.detailsValidation(populatedValidationFormHome);
      assert.equal(validationResponse.overAll, undefined);
    });

    it('should return no error if mobile is selected and mobile number is populated', () => {
      const validationResponse = validation.detailsValidation(populatedValidationFormMobile);
      assert.equal(validationResponse.overAll, undefined);
    });

    it('should return no error if work is selected and mobile number is populated', () => {
      const validationResponse = validation.detailsValidation(populatedValidationFormWork);
      assert.equal(validationResponse.overAll, undefined);
    });

    describe(' home phone selected', () => {
      beforeEach((done) => {
        telephoneMessage = {
          cbHomeTelephoneNumber: '', cbMobileTelephoneNumber: '', cbWorkTelephoneNumber: '', homeTelephoneNumber: '', mobileTelephoneNumber: '', workTelephoneNumber: '', email: '',
        };
        done();
      });
      it('should return error if field is empty ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        const validationResponse = validation.detailsValidation(telephoneMessage);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.homeTelephoneNumber.text, 'contact:fields.homeTelephoneNumber.errors.required');
      });

      it('should return error if field contains text ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        telephoneMessage.homeTelephoneNumber = 'This is text';
        const validationResponse = validation.detailsValidation(telephoneMessage);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.homeTelephoneNumber.text, 'contact:fields.homeTelephoneNumber.errors.format');
      });

      it('should return error if field is to long ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        telephoneMessage.homeTelephoneNumber = longTelephoneNumber;
        const validationResponse = validation.detailsValidation(telephoneMessage);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.homeTelephoneNumber.text, 'contact:fields.homeTelephoneNumber.errors.length');
      });

      it('should return no error if field valid number ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        telephoneMessage.homeTelephoneNumber = '3434343';
        const validationResponse = validation.detailsValidation(telephoneMessage);
        assert.equal(validationResponse.homeTelephoneNumber, undefined);
      });
    });

    describe(' mobile phone selected', () => {
      beforeEach((done) => {
        mobileMessage = {
          cbHomeTelephoneNumber: '', cbMobileTelephoneNumber: '', cbWorkTelephoneNumber: '', homeTelephoneNumber: '', mobileTelephoneNumber: '', workTelephoneNumber: '', email: '',
        };
        done();
      });
      it('should return error if field is empty ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        const validationResponse = validation.detailsValidation(mobileMessage);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.mobileTelephoneNumber.text, 'contact:fields.mobileTelephoneNumber.errors.required');
      });

      it('should return error if field contains text ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        mobileMessage.mobileTelephoneNumber = 'This is text';
        const validationResponse = validation.detailsValidation(mobileMessage);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.mobileTelephoneNumber.text, 'contact:fields.mobileTelephoneNumber.errors.format');
      });

      it('should return error if field is to long ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        mobileMessage.mobileTelephoneNumber = longTelephoneNumber;
        const validationResponse = validation.detailsValidation(mobileMessage);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.mobileTelephoneNumber.text, 'contact:fields.mobileTelephoneNumber.errors.length');
      });

      it('should return no error if field valid number ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        mobileMessage.mobileTelephoneNumber = '3434343';
        const validationResponse = validation.detailsValidation(mobileMessage);
        assert.equal(validationResponse.mobileTelephoneNumber, undefined);
      });
    });

    describe(' work phone selected', () => {
      beforeEach((done) => {
        workTelephone = {
          cbHomeTelephoneNumber: '', cbMobileTelephoneNumber: '', cbWorkTelephoneNumber: '', homeTelephoneNumber: '', mobileTelephoneNumber: '', workTelephoneNumber: '', email: '',
        };
        done();
      });
      it('should return error if field is empty ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        const validationResponse = validation.detailsValidation(workTelephone);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.workTelephoneNumber.text, 'contact:fields.workTelephoneNumber.errors.required');
      });

      it('should return error if field contains text ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        workTelephone.workTelephoneNumber = 'This is text';
        const validationResponse = validation.detailsValidation(workTelephone);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.workTelephoneNumber.text, 'contact:fields.workTelephoneNumber.errors.format');
      });

      it('should return error if field is to long ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        workTelephone.workTelephoneNumber = longTelephoneNumber;
        const validationResponse = validation.detailsValidation(workTelephone);
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.workTelephoneNumber.text, 'contact:fields.workTelephoneNumber.errors.length');
      });

      it('should return no error if field valid number ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        workTelephone.workTelephoneNumber = '3434343';
        const validationResponse = validation.detailsValidation(workTelephone);
        assert.equal(validationResponse.workTelephoneNumber, undefined);
      });
    });

    it('should return error if email address is not invalid', () => {
      const validationResponse = validation.detailsValidation(populatedFailedValidationForm);
      assert.equal(validationResponse.email.text, 'contact:fields.email.errors.format');
    });

    it('should return error if email is to long (above 100 characters)', () => {
      const validationResponse = validation.detailsValidation(populatedLongRequest);
      assert.equal(validationResponse.email.text, 'contact:fields.email.errors.length');
    });
  });
});
