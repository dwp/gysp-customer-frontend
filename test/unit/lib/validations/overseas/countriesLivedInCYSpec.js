const { assert } = require('chai');
const moment = require('moment');
const i18n = require('i18next');

const i18nConfig = require('../../../../../config/i18n');
const validation = require('../../../../../lib/validations/overseasValidation');

const emptyObject = {
  dateToMonth: '', dateToYear: '', dateFromMonth: '', dateFromYear: '',
};
const emptyMonths = {
  dateToMonth: '', dateToYear: '2015', dateFromMonth: '', dateFromYear: '2014',
};
const emptyYears = {
  dateToMonth: '12', dateToYear: '', dateFromMonth: '12', dateFromYear: '',
};
const invalidMonths = {
  dateToMonth: '13', dateToYear: '2010', dateFromMonth: '40', dateFromYear: '2010',
};
const invalidYears = {
  dateToMonth: '1', dateToYear: '19', dateFromMonth: '12', dateFromYear: '19',
};
const pastDates = {
  dateToMonth: '12', dateToYear: '2011', dateFromMonth: '12', dateFromYear: '2014',
};
const complete = {
  dateToMonth: '12', dateToYear: '2015', dateFromMonth: '12', dateFromYear: '2014',
};

const currentMonth = moment().format('M');
const currentYear = moment().format('gggg');

const currentMonthPlusOne = moment().add(1, 'M').format('M');
const currentMonthPlusOneYear = moment().add(1, 'M').format('gggg');
const currentYearPlusOne = moment().add(1, 'y').format('gggg');

const currentDates = {
  dateToMonth: currentMonth, dateToYear: currentYear, dateFromMonth: currentMonth, dateFromYear: currentYear,
};
const currentDatesPlusOneMonth = {
  dateToMonth: currentMonthPlusOne, dateToYear: currentMonthPlusOneYear, dateFromMonth: currentMonthPlusOne, dateFromYear: currentMonthPlusOneYear,
};
const currentPlusOneYear = {
  dateToMonth: currentMonth, dateToYear: currentYearPlusOne, dateFromMonth: currentMonth, dateFromYear: currentYearPlusOne,
};

const badToDate = {
  dateToMonth: 'MM', dateToYear: 'YYYY', dateFromMonth: '12', dateFromYear: '2014',
};
const badFromDate = {
  dateToMonth: '01', dateToYear: '2014', dateFromMonth: 'MM', dateFromYear: 'YYYY',
};

const emptyReferenceNumber = {
  dateToMonth: '12', dateToYear: '2015', dateFromMonth: '12', dateFromYear: '2014', referenceNumber: '',
};
const longReferenceNumber = {
  dateToMonth: '12', dateToYear: '2015', dateFromMonth: '12', dateFromYear: '2014', referenceNumber: 'aassddffgghhjjkkllzzxxccvvbbnnmmd',
};
const spaceRefenceNumber = {
  dateToMonth: '12', dateToYear: '2015', dateFromMonth: '12', dateFromYear: '2014', referenceNumber: ' AAA',
};
const invalidChar = {
  dateToMonth: '12', dateToYear: '2015', dateFromMonth: '12', dateFromYear: '2014', referenceNumber: 'Hell†',
};
const validReferenceNumber = {
  dateToMonth: '12', dateToYear: '2015', dateFromMonth: '12', dateFromYear: '2014', referenceNumber: 'AAA',
};

const referenceNumberOn = true;
const referenceNumberOff = false;

describe('country validation', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  it('should return full error set if to and from date is missing', () => {
    const validationResponse = validation.countryDetials(emptyObject, false, '', '', 'cy');
    assert.lengthOf(validationResponse.errorSummary, 2);
    assert.equal(validationResponse.dateFrom.text, 'Rhowch fis a blwyddyn, fel 2 2002.');
    assert.equal(validationResponse.dateTo.text, 'Rhowch fis a blwyddyn, fel 2, 2003.');
  });
  it('should return full error set if to and from are only partly complete', () => {
    const validationResponse = validation.countryDetials(emptyMonths, false, '', '', 'cy');
    assert.lengthOf(validationResponse.errorSummary, 2);
    assert.equal(validationResponse.dateFrom.text, 'Rhowch fis a blwyddyn, fel 2 2002.');
    assert.equal(validationResponse.dateTo.text, 'Rhowch fis a blwyddyn, fel 2, 2003.');

    const validationResponse2 = validation.countryDetials(emptyYears, false, '', '', 'cy');
    assert.lengthOf(validationResponse2.errorSummary, 2);
    assert.equal(validationResponse2.dateFrom.text, 'Rhowch fis a blwyddyn, fel 2 2002.');
    assert.equal(validationResponse2.dateTo.text, 'Rhowch fis a blwyddyn, fel 2, 2003.');
  });

  it('should return full error set if to and from are partially complete with bad data', () => {
    const validationResponse = validation.countryDetials(badToDate, false, '', '', 'cy');
    assert.lengthOf(validationResponse.errorSummary, 1);
    assert.isUndefined(validationResponse.dateFrom);
    assert.equal(validationResponse.dateTo.text, 'Rhowch fis a blwyddyn, fel 2, 2003.');

    const validationResponse2 = validation.countryDetials(badFromDate, false, '', '', 'cy');
    assert.lengthOf(validationResponse2.errorSummary, 1);
    assert.equal(validationResponse2.dateFrom.text, 'Rhowch fis a blwyddyn, fel 2 2002.');
    assert.isUndefined(validationResponse2.dateTo);
  });
  it('should return no error when valid date/month is supplied', () => {
    const validationResponse = validation.countryDetials(complete, false, '', '', 'cy');
    assert.isUndefined(validationResponse.errorSummary);
    assert.isUndefined(validationResponse.dateFrom);
    assert.isUndefined(validationResponse.dateTo);
  });
  describe('future date', () => {
    it('should return no error if dates are current (year + month)', () => {
      const validationResponse = validation.countryDetials(currentDates, false, '', '', 'cy');
      assert.isUndefined(validationResponse.errorSummary);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
    });
    it('should return error if month is next month to current', () => {
      const validationResponse = validation.countryDetials(currentDatesPlusOneMonth, false, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 2);
      assert.equal(validationResponse.dateFrom.text, 'Rhowch ddyddiad \'o\' yn y gorffennol.');
      assert.equal(validationResponse.dateTo.text, 'Rhowch ddyddiad \'i\' sydd yn y gorffennol.');
    });
    it('should return error if year is next year to current', () => {
      const validationResponse = validation.countryDetials(currentPlusOneYear, false, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 2);
      assert.equal(validationResponse.dateFrom.text, 'Rhowch ddyddiad \'o\' yn y gorffennol.');
      assert.equal(validationResponse.dateTo.text, 'Rhowch ddyddiad \'i\' sydd yn y gorffennol.');
    });
  });
  describe('invalid date', () => {
    it('should return full error if dates are out of bounds', () => {
      const validationResponse2 = validation.countryDetials(invalidYears, false, '', '', 'cy');
      assert.lengthOf(validationResponse2.errorSummary, 2);
      assert.equal(validationResponse2.dateFrom.text, 'Rhowch fis a blwyddyn, fel 2 2002.');
      assert.equal(validationResponse2.dateTo.text, 'Rhowch fis a blwyddyn, fel 2, 2003.');

      const validationResponse = validation.countryDetials(invalidMonths, false, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 2);
      assert.equal(validationResponse.dateFrom.text, 'Rhowch fis a blwyddyn, fel 2 2002.');
      assert.equal(validationResponse.dateTo.text, 'Rhowch fis a blwyddyn, fel 2, 2003.');
    });
    it('should return error if dateTo is beforeFrom date', () => {
      const validationResponse = validation.countryDetials(pastDates, false, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 1);
      assert.isUndefined(validationResponse.dateFrom);
      assert.equal(validationResponse.dateTo.text, 'Ni all y dyddiad \'i\' fod cyn y dyddiad \'o\'.');
    });
  });
  describe('reference number', () => {
    it('should not valid reference number when flag set as false', () => {
      const validationResponse = validation.countryDetials(longReferenceNumber, referenceNumberOff, '', '', 'cy');
      assert.isUndefined(validationResponse.errorSummary);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
      assert.isUndefined(validationResponse.referenceNumber);
    });
    it('should return no errors if valid reference number is supplied', () => {
      const validationResponse = validation.countryDetials(validReferenceNumber, referenceNumberOn, '', '', 'cy');
      assert.isUndefined(validationResponse.errorSummary);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
      assert.isUndefined(validationResponse.referenceNumber);
    });
    it('should return no reference number error if reference number is empty', () => {
      const validationResponse = validation.countryDetials(emptyReferenceNumber, referenceNumberOn, '', '', 'cy');
      assert.isUndefined(validationResponse.errorSummary);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
      assert.isUndefined(validationResponse.referenceNumber);
    });
    it('should return reference number error if reference number is to long (max 24)', () => {
      const validationResponse = validation.countryDetials(longReferenceNumber, referenceNumberOn, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 1);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
      assert.equal(validationResponse.referenceNumber.text, 'Mwyafswm hyd yw 24');
    });
    it('should return reference number error if reference number starts with a space', () => {
      const validationResponse = validation.countryDetials(spaceRefenceNumber, referenceNumberOn, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 1);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
      assert.equal(validationResponse.referenceNumber.text, 'Ni allwch ddechrau gyda gofod');
    });
    it('should return reference number error if reference number contains invalid character (none ASCII character code 32-127)', () => {
      const validationResponse = validation.countryDetials(invalidChar, referenceNumberOn, '', '', 'cy');
      assert.lengthOf(validationResponse.errorSummary, 1);
      assert.isUndefined(validationResponse.dateFrom);
      assert.isUndefined(validationResponse.dateTo);
      assert.equal(validationResponse.referenceNumber.text, 'Rhowch rif cyfeirnod dilys');
    });
  });
});
