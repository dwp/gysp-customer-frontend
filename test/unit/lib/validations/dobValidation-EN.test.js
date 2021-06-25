const { assert } = require('chai');
const moment = require('moment');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/dobValidation.js');

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

const todayDateObjectEmpy = {
  dateDay: '',
  dateMonth: '',
  dateYear: '',
};

const dateNextYear = new Date();
dateNextYear.setDate(dateToday.getFullYear() + 1);

const futureDateObject = {
  dateDay: moment(dateNextYear).format('DD'),
  dateMonth: moment(dateNextYear).format('MM'),
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

const dateOfBirthFormCorrect = {
  dateDay: '09',
  dateMonth: '09',
  dateYear: '1954',
};

const dateOfBirthFormIncorrect = {
  dateDay: '09',
  dateMonth: '09',
  dateYear: '1955',
};

const sessionDateOfBirth = -483235200000;

describe('DOB validation - EN', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return error if date is empty', () => {
    const validationResponse = validation.dobValidator(todayDateObjectEmpy);
    assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
    assert.equal(validationResponse.date.text, 'Enter your date of birth.');
  });

  it('should return error if date is invalid (day greater then 31)', () => {
    const validationResponse = validation.dobValidator(badDayFormObject);
    assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
    assert.equal(validationResponse.date.text, 'Enter a real date of birth.');
  });

  it('should return error if date is in future', () => {
    const validationResponse = validation.dobValidator(futureDateObject);
    assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
    assert.equal(validationResponse.date.text, 'Enter a date of birth that is in the past.');
  });

  it('should return no error if date is today', () => {
    const validationResponse = validation.dobValidator(todayDateObject);
    assert.equal(validationResponse.date, undefined);
  });

  it('should return no when when date in the past is used', () => {
    const validationResponse = validation.dobValidator(oneHundredYearsAgo);
    assert.equal(validationResponse.date, undefined);
  });

  it('should return error when date contains single digit year', () => {
    const validationResponse = validation.dobValidator(singleDigitYear);
    assert.equal(validationResponse.date.text, 'Enter a real date of birth.');
  });

  it('should return error when date contains double digit year', () => {
    const validationResponse = validation.dobValidator(doubleDigitYear);
    assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
    assert.equal(validationResponse.date.text, 'Enter a real date of birth.');
  });

  it('should return error when date contains tripple digit year', () => {
    const validationResponse = validation.dobValidator(trippleDigitYear);
    assert.equal(validationResponse.date.visuallyHiddenText, 'Error');
    assert.equal(validationResponse.date.text, 'Enter a real date of birth.');
  });

  describe('dobCompare', () => {
    it('should return true when two DOB\'s match', () => {
      const validationResponse = validation.dobCompare(dateOfBirthFormCorrect, sessionDateOfBirth);
      assert.equal(validationResponse, true);
    });

    it('should return false when two DOB\'s match', () => {
      const validationResponse = validation.dobCompare(dateOfBirthFormIncorrect, sessionDateOfBirth);
      assert.equal(validationResponse, false);
    });
  });
});
