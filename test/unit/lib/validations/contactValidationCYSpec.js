const assert = require('assert');
const i18n = require('i18next');

const i18nConfig = require('../../../../config/i18n');
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
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  describe('detailsValidation', () => {
    it('should return error global if all fields are is empty', () => {
      const validationResponse = validation.detailsValidation(emptyObject, 'cy');
      assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
      assert.equal(validationResponse.overAll.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.overAll.text, 'Dewiswch o leiaf un rhif ffôn y gallwn gysylltu â chi arno.');
    });

    it('should return no error if home is selected and telephone number is populated', () => {
      const validationResponse = validation.detailsValidation(populatedValidationFormHome, 'cy');
      assert.equal(validationResponse.overAll, undefined);
    });

    it('should return no error if mobile is selected and mobile number is populated', () => {
      const validationResponse = validation.detailsValidation(populatedValidationFormMobile, 'cy');
      assert.equal(validationResponse.overAll, undefined);
    });

    it('should return no error if work is selected and mobile number is populated', () => {
      const validationResponse = validation.detailsValidation(populatedValidationFormWork, 'cy');
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
        const validationResponse = validation.detailsValidation(telephoneMessage, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.homeTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.homeTelephoneNumber.text, 'Rhowch rif ffôn cartref.');
      });

      it('should return error if field contains text ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        telephoneMessage.homeTelephoneNumber = 'This is text';
        const validationResponse = validation.detailsValidation(telephoneMessage, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.homeTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.homeTelephoneNumber.text, 'Mae\'n rhaid i rif ffôn cartref gynnwys rhifau a gofodau yn unig.');
      });

      it('should return error if field is to long ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        telephoneMessage.homeTelephoneNumber = longTelephoneNumber;
        const validationResponse = validation.detailsValidation(telephoneMessage, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.homeTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.homeTelephoneNumber.text, 'Mae\'n rhaid i rif ffôn cartref fod yn 70 nod neu lai.');
      });

      it('should return no error if field valid number ', () => {
        telephoneMessage.cbHomeTelephoneNumber = true;
        telephoneMessage.homeTelephoneNumber = '3434343';
        const validationResponse = validation.detailsValidation(telephoneMessage, 'cy');
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
        const validationResponse = validation.detailsValidation(mobileMessage, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.mobileTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.mobileTelephoneNumber.text, 'Rhowch rif ffôn symudol.');
      });

      it('should return error if field contains text ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        mobileMessage.mobileTelephoneNumber = 'This is text';
        const validationResponse = validation.detailsValidation(mobileMessage, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.mobileTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.mobileTelephoneNumber.text, 'Mae\'n rhaid i rif ffôn symudol gynnwys rhifau a gofodau yn unig.');
      });

      it('should return error if field is to long ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        mobileMessage.mobileTelephoneNumber = longTelephoneNumber;
        const validationResponse = validation.detailsValidation(mobileMessage, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.mobileTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.mobileTelephoneNumber.text, 'Mae\'n rhaid i rif ffôn symudol fod yn 70 nod neu lai.');
      });

      it('should return no error if field valid number ', () => {
        mobileMessage.cbMobileTelephoneNumber = true;
        mobileMessage.mobileTelephoneNumber = '3434343';
        const validationResponse = validation.detailsValidation(mobileMessage, 'cy');
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
        const validationResponse = validation.detailsValidation(workTelephone, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.workTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.workTelephoneNumber.text, 'Rhowch rif ffôn gwaith.');
      });

      it('should return error if field contains text ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        workTelephone.workTelephoneNumber = 'This is text';
        const validationResponse = validation.detailsValidation(workTelephone, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.workTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.workTelephoneNumber.text, 'Mae\'n rhaid i rif ffôn gwaith gynnwys rhifau a gofodau yn unig.');
      });

      it('should return error if field is to long ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        workTelephone.workTelephoneNumber = longTelephoneNumber;
        const validationResponse = validation.detailsValidation(workTelephone, 'cy');
        assert.equal(Object.keys(validationResponse.errorSummary).length, 1);
        assert.equal(validationResponse.workTelephoneNumber.visuallyHiddenText, 'Gwall');
        assert.equal(validationResponse.workTelephoneNumber.text, 'Mae\'n rhaid i rif ffôn gwaith fod yn 70 nod neu lai.');
      });

      it('should return no error if field valid number ', () => {
        workTelephone.cbWorkTelephoneNumber = true;
        workTelephone.workTelephoneNumber = '3434343';
        const validationResponse = validation.detailsValidation(workTelephone, 'cy');
        assert.equal(validationResponse.workTelephoneNumber, undefined);
      });
    });

    it('should return error if email address is invalid', () => {
      const validationResponse = validation.detailsValidation(populatedFailedValidationForm, 'cy');
      assert.equal(validationResponse.email.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.email.text, 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com.');
    });

    it('should return error if email address contains a utf-8 special charcater (’)', () => {
      const request = Object.assign({}, populatedFailedValidationForm, { email: '’test@test.com' });
      const validationResponse = validation.detailsValidation(request, 'cy');
      assert.equal(validationResponse.email.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.email.text, 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com.');
    });

    it('should return error if email address contains a utf-8 special charcater (‘)', () => {
      const request = Object.assign({}, populatedFailedValidationForm, { email: '‘test@test.com' });
      const validationResponse = validation.detailsValidation(request, 'cy');
      assert.equal(validationResponse.email.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.email.text, 'Rhowch gyfeiriad e-bost yn y fformat cywir, fel name@example.com.');
    });

    it('should return error if email is to long (above 100 characters)', () => {
      const validationResponse = validation.detailsValidation(populatedLongRequest, 'cy');
      assert.equal(validationResponse.email.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.email.text, 'Mae\'n rhaid i gyfeiriad e-bost fod yn 100 nod neu lai.');
    });
  });
});
