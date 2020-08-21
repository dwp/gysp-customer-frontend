const { assert } = require('chai');
const moment = require('moment');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/startDateValidation');

const blankObject = {
  dateDay: '',
  dateMonth: '',
  dateYear: '',
};

const dateToday = new Date();
const badDayFormObject = {
  dateDay: 50,
  dateMonth: (dateToday.getMonth() + 1),
  dateYear: dateToday.getUTCFullYear(),
};

const todayDateObject = {
  dateDay: dateToday.getDate(),
  dateMonth: (dateToday.getMonth() + 1),
  dateYear: dateToday.getUTCFullYear(),
};

const dateNextYear = new Date();
dateNextYear.setDate(dateToday.getFullYear() + 1);

const futureDateObject = {
  dateDay: moment(dateNextYear).format('DD'),
  dateMonth: moment(dateNextYear).add(1, 'month').format('MM'),
  dateYear: moment(dateNextYear).format('YYYY'),
};

const oneHundredYearsAgo = {
  dateDay: dateNextYear.getDate(),
  dateMonth: moment(dateNextYear).format('MM'),
  dateYear: moment(dateNextYear).format('YYYY') - 100,
};

const singleDigitYear = {
  dateDay: 1,
  dateMonth: 1,
  dateYear: 1,
};

const doubleDigitYear = {
  dateDay: 1,
  dateMonth: 1,
  dateYear: 11,
};

const trippleDigitYear = {
  dateDay: 1,
  dateMonth: 1,
  dateYear: 111,
};

const beforeSpaDate = moment().add(1, 'month').format('YYYY-MM-DD');
const afterSpaDate = moment().subtract(1, 'month').format('YYYY-MM-DD');

const beforeSpaKey = 'beforeSpa';
const afterSpaKey = 'afterSpa';

describe('start date validation - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('before spa', () => {
    it('should return error if date is empty', () => {
      const validationResponse = validation.claimFromDateValidation(blankObject, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad yr hoffech gael eich Pensiwn y Wladwriaeth.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad yr hoffech gael eich Pensiwn y Wladwriaeth.');
    });

    it('should return error if date is invalid (day greater then 31)', () => {
      const validationResponse = validation.claimFromDateValidation(badDayFormObject, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error if date is today as it is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(todayDateObject, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Ni all y dyddiad fod cyn eich dyddiad Pensiwn y Wladwriaeth.');
      assert.equal(validationResponse.errorSummary[0].text, 'Ni all y dyddiad fod cyn eich dyddiad Pensiwn y Wladwriaeth.');
    });

    it('should return error if date is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(oneHundredYearsAgo, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Ni all y dyddiad fod cyn eich dyddiad Pensiwn y Wladwriaeth.');
      assert.equal(validationResponse.errorSummary[0].text, 'Ni all y dyddiad fod cyn eich dyddiad Pensiwn y Wladwriaeth.');
    });

    it('should return error when date contains single digit year', () => {
      const validationResponse = validation.claimFromDateValidation(singleDigitYear, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error when date contains double digit year', () => {
      const validationResponse = validation.claimFromDateValidation(doubleDigitYear, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error when date contains tripple digit year', () => {
      const validationResponse = validation.claimFromDateValidation(trippleDigitYear, beforeSpaDate, beforeSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return no error if date is after spa date', () => {
      const validationResponse = validation.claimFromDateValidation(futureDateObject, beforeSpaDate, beforeSpaKey, 'cy');
      assert.isUndefined(validationResponse.date);
      assert.isUndefined(validationResponse.errorSummary);
    });
  });

  describe('after spa', () => {
    it('should return error if date is empty', () => {
      const validationResponse = validation.claimFromDateValidation(blankObject, afterSpaDate, afterSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad yr hoffech gael eich Pensiwn y Wladwriaeth.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad yr hoffech gael eich Pensiwn y Wladwriaeth.');
    });

    it('should return error if date is invalid (day greater then 31)', () => {
      const validationResponse = validation.claimFromDateValidation(badDayFormObject, afterSpaDate, afterSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return no error if date is today as it is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(todayDateObject, afterSpaDate, afterSpaKey, 'cy');
      assert.isUndefined(validationResponse.date);
      assert.isUndefined(validationResponse.errorSummary);
    });

    it('should return error if date is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(oneHundredYearsAgo, afterSpaDate, afterSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Ni all y dyddiad fod cyn eich dyddiad Pensiwn y Wladwriaeth.');
      assert.equal(validationResponse.errorSummary[0].text, 'Ni all y dyddiad fod cyn eich dyddiad Pensiwn y Wladwriaeth.');
    });

    it('should return error when date contains single digit year', () => {
      const validationResponse = validation.claimFromDateValidation(singleDigitYear, afterSpaDate, afterSpaKey, 'cy');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error when date contains double digit year', () => {
      const validationResponse = validation.claimFromDateValidation(doubleDigitYear, afterSpaDate, afterSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return error when date contains tripple digit year', () => {
      const validationResponse = validation.claimFromDateValidation(trippleDigitYear, afterSpaDate, afterSpaKey, 'cy');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse.date.text, 'Rhowch ddyddiad go iawn.');
      assert.equal(validationResponse.errorSummary[0].text, 'Rhowch ddyddiad go iawn.');
    });

    it('should return no error if date is after spa date', () => {
      const validationResponse = validation.claimFromDateValidation(futureDateObject, afterSpaDate, afterSpaKey, 'cy');
      assert.isUndefined(validationResponse.date);
      assert.isUndefined(validationResponse.errorSummary);
    });
  });
});
