const { assert } = require('chai');
const moment = require('moment');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/maritalValidation.js');
const dataObjectGenerator = require('../../../lib/dataObjectGenerator.js');

const stringLength71 = 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopa';

const emptyObject = {};
const populatedValidationForm = { maritalStatus: 'single' };

const validMaritalStatus = ['single', 'married', 'civil', 'widowed', 'divorced', 'dissolved'];

const unexpectedOutcome = { maritalStatus: 'ki' };
const badDayFormObject = dataObjectGenerator.maritalDateObject({ dateDay: '50' });
const dateToday = new Date();
const todayDateObject = dataObjectGenerator.maritalDateObject({
  dateDay: dateToday.getDate(),
  dateMonth: (dateToday.getMonth() + 1),
  dateYear: dateToday.getUTCFullYear(),
});

const todayDateObjectEmpy = dataObjectGenerator.maritalDateObject({
  dateDay: '',
  dateMonth: '',
  dateYear: '',
});

const dateNextYear = new Date();
dateNextYear.setDate(dateToday.getFullYear() + 1);

const futureDateObject = dataObjectGenerator.maritalDateObject({
  dateDay: moment(dateNextYear).format('DD'),
  dateMonth: moment(dateNextYear).format('MM'),
  dateYear: moment(dateNextYear).format('YYYY'),
});

const oneHundredYearsAgo = dataObjectGenerator.maritalDateObject({
  dateDay: dateNextYear.getDate(),
  dateMonth: moment(dateNextYear).format('MM'),
  dateYear: moment(dateNextYear).format('YYYY') - 100,
});

const singleDigitYear = dataObjectGenerator.maritalDateObject({
  dateDay: 1,
  dateMonth: 1,
  dateYear: 1,
});

const doubleDigitYear = dataObjectGenerator.maritalDateObject({
  dateDay: 1,
  dateMonth: 1,
  dateYear: 11,
});

const trippleDigitYear = dataObjectGenerator.maritalDateObject({
  dateDay: 1,
  dateMonth: 1,
  dateYear: 111,
});

const validPartnerDetails = dataObjectGenerator.partnerDetail({});

const emptyPartnerDetails = dataObjectGenerator.partnerDetail({
  firstName: '', surname: '', otherName: '', dobDay: '', dobMonth: '', dobYear: '',
});

const futurePartnerDetails = dataObjectGenerator.partnerDetail({
  firstName: '', surname: '', otherName: '', dobDay: '01', dobMonth: '01', dobYear: dateNextYear.getUTCFullYear(),
});

const badFormatPartner = dataObjectGenerator.partnerDetail({
  firstName: '34399i', surname: '3423423', otherName: 'erer32', dobDay: '40', dobMonth: '20', dobYear: dateToday.getUTCFullYear(),
});

const badFormatNonAlphaFirstNamePartner = dataObjectGenerator.partnerDetail({
  firstName: ' Joe', surname: 'Bloggs', otherName: 'erer32', dobDay: '40', dobMonth: '20', dobYear: dateToday.getUTCFullYear(),
});

const badFormatNonAlphaSurnamePartner = dataObjectGenerator.partnerDetail({
  firstName: 'Joe', surname: ' Bloggs', otherName: 'erer32', dobDay: '40', dobMonth: '20', dobYear: dateToday.getUTCFullYear(),
});

const badFormatNonAlphaOtherNamePartner = dataObjectGenerator.partnerDetail({
  firstName: 'Joe', surname: 'Bloggs', otherName: ' erer32', dobDay: '40', dobMonth: '20', dobYear: dateToday.getUTCFullYear(),
});

const longTextPartner = dataObjectGenerator.partnerDetail({
  firstName: stringLength71, surname: stringLength71, otherName: stringLength71, dobDay: '40', dobMonth: '20', dobYear: dateToday.getUTCFullYear(),
});

describe('Marital validation', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('selectionValidation', () => {
    it('should return error if answer is empty', () => {
      const validationResponse = validation.selectionValidation(emptyObject, 'cy');
      assert.equal(validationResponse.maritalStatus.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.maritalStatus.text, 'Dewiswch eich statws priodasol presennol.');
    });

    it('should return error if answer is something unexpected', () => {
      const validationResponse = validation.selectionValidation(unexpectedOutcome, 'cy');
      assert.equal(validationResponse.maritalStatus.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.maritalStatus.text, 'Dewiswch eich statws priodasol presennol.');
    });

    it('should return no error if anwser is supplied', () => {
      const validationResponse = validation.selectionValidation(populatedValidationForm, 'cy');
      assert.equal(validationResponse.maritalStatus, undefined);
    });

    validMaritalStatus.forEach((testStatus) => {
      it(`should return undefined when ${testStatus} is supplied`, () => {
        assert.isUndefined(validation.selectionValidation({ maritalStatus: testStatus }).maritalStatus);
      });
    });
  });

  describe('dateValidator', () => {
    it('should return error if date is empty', () => {
      const validationResponse = validation.dateValidator(todayDateObjectEmpy, 'married', 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad.');
    });

    it('should return error if date is invalid (day greater then 31)', () => {
      const validationResponse = validation.dateValidator(badDayFormObject, 'married', 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error if date is in future', () => {
      const validationResponse = validation.dateValidator(futureDateObject, 'married', 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Mae\'n rhaid i\'r dyddiad fod yn y gorffennol.');
    });

    it('should return no error if date is today', () => {
      const validationResponse = validation.dateValidator(todayDateObject, 'married', 'cy');
      assert.equal(validationResponse.date, undefined);
    });

    it('should return no when when date in the past is used', () => {
      const validationResponse = validation.dateValidator(oneHundredYearsAgo, 'married', 'cy');
      assert.equal(validationResponse.date, undefined);
    });

    it('should return error when date contains single digit year', () => {
      const validationResponse = validation.dateValidator(singleDigitYear, 'married', 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error when date contains double digit year', () => {
      const validationResponse = validation.dateValidator(doubleDigitYear, 'married', 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error when date contains tripple digit year', () => {
      const validationResponse = validation.dateValidator(trippleDigitYear, 'married', 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
    });
  });

  describe('partnerValidator', () => {
    it('should return no errors when valid populated object is supplied', () => {
      const validationResponse = validation.partnerValidator(validPartnerDetails);
      assert.equal(validationResponse.firstName, undefined);
      assert.equal(validationResponse.surname, undefined);
      assert.equal(validationResponse.otherName, undefined);
      assert.equal(validationResponse.dob, undefined);
    });

    it('should return error if first name is empty', () => {
      const validationResponse = validation.partnerValidator(emptyPartnerDetails, 'married', 'cy');
      assert.equal(validationResponse.firstName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.firstName.text, 'Rhowch eu henw cyntaf.');
    });

    it('should return error if first name is to long (70 characters)', () => {
      const validationResponse = validation.partnerValidator(longTextPartner, 'married', 'cy');
      assert.equal(validationResponse.firstName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.firstName.text, 'Mae\'n  rhaid i\'r enw cyntaf fod yn 70 nod neu lai.');
    });

    it('should return error if first name includes none characters', () => {
      const validationResponse = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse.firstName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.firstName.text, 'Mae\'n rhaid i\'r enw cyntaf ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn a gofodau.');
    });

    it('should return error if first name does not start with alpha ', () => {
      const validationResponse = validation.partnerValidator(badFormatNonAlphaFirstNamePartner, 'married', 'cy');
      assert.equal(validationResponse.firstName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.firstName.text, 'Mae\'n rhaid i\'r enw cyntaf ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn a gofodau.');
    });

    it('should return error if surname is empty', () => {
      const validationResponse = validation.partnerValidator(emptyPartnerDetails, 'married', 'cy');
      assert.equal(validationResponse.surname.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.surname.text, 'Rhowch eu cyfenw.');
    });

    it('should return error if surname is to long (70 characters)', () => {
      const validationResponse = validation.partnerValidator(longTextPartner, 'married', 'cy');
      assert.equal(validationResponse.surname.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.surname.text, 'Mae\'n rhaid i gyfenw fod yn 70 nod neu lai.');
    });

    it('should return error if surname name includes none characters', () => {
      const validationResponse = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse.surname.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.surname.text, 'Mae\'n rhaid i gyfenw ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn a gofodau.');
    });

    it('should return error if surname does not start with alpha ', () => {
      const validationResponse = validation.partnerValidator(badFormatNonAlphaSurnamePartner, 'married', 'cy');
      assert.equal(validationResponse.surname.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.surname.text, 'Mae\'n rhaid i gyfenw ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn a gofodau.');
    });

    it('should return error if other name is to long (70 characters)', () => {
      const validationResponse = validation.partnerValidator(longTextPartner, 'married', 'cy');
      assert.equal(validationResponse.otherName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.otherName.text, 'Mae\'n rhaid i enw arall fod yn 70 nod  neu lai.');
    });

    it('should return error if other name includes none characters', () => {
      const validationResponse = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse.otherName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.otherName.text, 'Mae\'n rhaid i enwau eraill ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn a gofodau.');
    });

    it('should return error if other name does not start with alpha', () => {
      const validationResponse = validation.partnerValidator(badFormatNonAlphaOtherNamePartner, 'married', 'cy');
      assert.equal(validationResponse.otherName.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.otherName.text, 'Mae\'n rhaid i enwau eraill ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn a gofodau.');
    });

    it('should return no error if dob is empty', () => {
      const validationResponse = validation.partnerValidator(emptyPartnerDetails, 'married', 'cy');
      assert.equal(validationResponse.dob, undefined);
    });

    it('should return error if dob is invalid (day greater then 31)', () => {
      const validationResponse = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse.dob.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.dob.text, 'Rhowch ddyddiad geni go iawn.');
    });

    it('should return error if dob is invalid  Year (Y, YY or YYY)', () => {
      badFormatPartner.dobDay = 1;
      badFormatPartner.dobMonth = 1;
      badFormatPartner.dobYear = 1;
      const validationResponse1 = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse1.dob.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse1.dob.text, 'Rhowch ddyddiad geni go iawn.');
      badFormatPartner.dobYear = 12;
      const validationResponse2 = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse2.dob.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse2.dob.text, 'Rhowch ddyddiad geni go iawn.');
      badFormatPartner.dobYear = 123;
      const validationResponse3 = validation.partnerValidator(badFormatPartner, 'married', 'cy');
      assert.equal(validationResponse3.dob.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse3.dob.text, 'Rhowch ddyddiad geni go iawn.');
    });

    it('should return error if dob is future', () => {
      const validationResponse = validation.partnerValidator(futurePartnerDetails, 'married', 'cy');
      assert.equal(validationResponse.dob.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.dob.text, 'Mae\'n rhaid i ddyddiad geni fod yn y gorffennol.');
    });

    it('should return no when when date in the past is used', () => {
      const validationResponse = validation.partnerValidator(validPartnerDetails, 'married', 'cy');
      assert.equal(validationResponse.dob, undefined);
    });
  });
});
