const { assert } = require('chai');
const moment = require('moment');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const validation = require('../../../../../lib/validations/request-invitation/dobValidation');

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

const tripleDigitYear = {
  dateDay: 1,
  dateMonth: 1,
  dateYear: 111,
};

describe('Validation: request invitation dob', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  it('should return no error if date is today', () => {
    const validationResponse = validation.dobValidator(todayDateObject);
    assert.isUndefined(validationResponse.date);
  });

  it('should return no when when date in the past', () => {
    const validationResponse = validation.dobValidator(oneHundredYearsAgo);
    assert.isUndefined(validationResponse.date);
  });

  ['en', 'cy'].forEach((lang) => {
    const message = i18next.getFixedT(lang);
    context(lang, () => {
      it('should return error when date is empty', () => {
        const validationResponse = validation.dobValidator({ dateDay: '', dateMonth: '', dateYear: '' }, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.empty.all'));
      });

      it('should return error when date day is empty', () => {
        const validationResponse = validation.dobValidator({ dateDay: '', dateMonth: '01', dateYear: '2000' }, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.empty.day'));
      });

      it('should return error when date month is empty', () => {
        const validationResponse = validation.dobValidator({ dateDay: '01', dateMonth: '', dateYear: '2000' }, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.empty.month'));
      });

      it('should return error when date year is empty', () => {
        const validationResponse = validation.dobValidator({ dateDay: '01', dateMonth: '01', dateYear: '' }, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.empty.year'));
      });

      it('should return error when date is invalid (day greater then 31)', () => {
        const validationResponse = validation.dobValidator(badDayFormObject, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.format'));
      });

      it('should return error when date contains single digit year', () => {
        const validationResponse = validation.dobValidator(singleDigitYear, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.format'));
      });

      it('should return error when date contains double digit year', () => {
        const validationResponse = validation.dobValidator(doubleDigitYear, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.format'));
      });

      it('should return error when date contains triple digit year', () => {
        const validationResponse = validation.dobValidator(tripleDigitYear, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.format'));
      });

      it('should return error if date is in future', () => {
        const validationResponse = validation.dobValidator(futureDateObject, lang);
        assert.equal(validationResponse.date.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
        assert.equal(validationResponse.date.text, message('request-invitation-dob:fields.dob.errors.future'));
      });
    });
  });
});
