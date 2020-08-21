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

describe('start date validation - EN', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('before spa', () => {
    it('should return error if date is empty', () => {
      const validationResponse = validation.claimFromDateValidation(blankObject, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a date that you want to get your State Pension.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a date that you want to get your State Pension.');
    });

    it('should return error if date is invalid (day greater then 31)', () => {
      const validationResponse = validation.claimFromDateValidation(badDayFormObject, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return error if date is today as it is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(todayDateObject, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Date cannot be before your State Pension date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Date cannot be before your State Pension date.');
    });

    it('should return error if date is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(oneHundredYearsAgo, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Date cannot be before your State Pension date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Date cannot be before your State Pension date.');
    });

    it('should return error when date contains single digit year', () => {
      const validationResponse = validation.claimFromDateValidation(singleDigitYear, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return error when date contains double digit year', () => {
      const validationResponse = validation.claimFromDateValidation(doubleDigitYear, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return error when date contains tripple digit year', () => {
      const validationResponse = validation.claimFromDateValidation(trippleDigitYear, beforeSpaDate, beforeSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return no error if date is after spa date', () => {
      const validationResponse = validation.claimFromDateValidation(futureDateObject, beforeSpaDate, beforeSpaKey, 'en');
      assert.isUndefined(validationResponse.date);
      assert.isUndefined(validationResponse.errorSummary);
    });
  });

  describe('after spa', () => {
    it('should return error if date is empty', () => {
      const validationResponse = validation.claimFromDateValidation(blankObject, afterSpaDate, afterSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a date that you want to get your State Pension.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a date that you want to get your State Pension.');
    });

    it('should return error if date is invalid (day greater then 31)', () => {
      const validationResponse = validation.claimFromDateValidation(badDayFormObject, afterSpaDate, afterSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return no error if date is today as it is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(todayDateObject, afterSpaDate, afterSpaKey, 'en');
      assert.isUndefined(validationResponse.date);
      assert.isUndefined(validationResponse.errorSummary);
    });

    it('should return error if date is before SPA', () => {
      const validationResponse = validation.claimFromDateValidation(oneHundredYearsAgo, afterSpaDate, afterSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Date cannot be before your State Pension date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Date cannot be before your State Pension date.');
    });

    it('should return error when date contains single digit year', () => {
      const validationResponse = validation.claimFromDateValidation(singleDigitYear, afterSpaDate, afterSpaKey, 'en');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return error when date contains double digit year', () => {
      const validationResponse = validation.claimFromDateValidation(doubleDigitYear, afterSpaDate, afterSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return error when date contains tripple digit year', () => {
      const validationResponse = validation.claimFromDateValidation(trippleDigitYear, afterSpaDate, afterSpaKey, 'en');
      assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
      assert.equal(validationResponse.date.text, 'Enter a real date.');
      assert.equal(validationResponse.errorSummary[0].text, 'Enter a real date.');
    });

    it('should return no error if date is after spa date', () => {
      const validationResponse = validation.claimFromDateValidation(futureDateObject, afterSpaDate, afterSpaKey, 'en');
      assert.isUndefined(validationResponse.date);
      assert.isUndefined(validationResponse.errorSummary);
    });
  });
});
