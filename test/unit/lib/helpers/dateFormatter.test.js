const { assert } = require('chai');
const moment = require('moment');

const dateFormatter = require('../../../../lib/helpers/dateFormatter');

const septemberDate = 1631145600000;
const welshLang = 'cy-GB';

describe('Date Format helper ', () => {
  describe('statePensionAgeDate  ', () => {
    it('should return 9 September 2021 when date is given', () => {
      const date = dateFormatter.statePensionDate(septemberDate);
      assert.include(date, '9');
      assert.include(date, 'September');
      assert.include(date, '2021');
    });

    it('should return date in welsh when date and language is given', () => {
      const date = dateFormatter.statePensionDate(septemberDate, welshLang);
      assert.include(date, '9');
      assert.include(date, 'Medi');
      assert.include(date, '2021');
    });
  });

  describe('applicationDate', () => {
    it('should return formatted string including todays day, month and year in english', () => {
      const todaysDate = moment();
      const day = moment(todaysDate).format('D');
      const month = moment(todaysDate).format('MMMM');
      const year = moment(todaysDate).format('YYYY');
      const checkAuthResponse = dateFormatter.applicationDate();
      assert.include(checkAuthResponse, day);
      assert.include(checkAuthResponse, month);
      assert.include(checkAuthResponse, year);
    });

    it('should return formatted string including todays day, month and year in welsh', () => {
      const todaysDate = moment();
      const day = moment(todaysDate).locale('cy').format('D');
      const month = moment(todaysDate).locale('cy').format('MMMM');
      const year = moment(todaysDate).locale('cy').format('YYYY');
      const checkAuthResponse = dateFormatter.applicationDate(welshLang);
      assert.include(checkAuthResponse, day);
      assert.include(checkAuthResponse, month);
      assert.include(checkAuthResponse, year);
    });
  });

  describe('humanReadableDate  ', () => {
    it('should return 9 September 2021 when date is given', () => {
      const date = dateFormatter.humanReadableDate(septemberDate);
      assert.include(date, '9');
      assert.include(date, 'September');
      assert.include(date, '2021');
    });
  });

  describe('dateSectionsToUnixDate  ', () => {
    it('should return unix timestamp of 1577836800000', () => {
      const date = dateFormatter.dateSectionsToUnixDate('2020', '01', '01');
      assert.equal(date, '1577836800000');
    });
  });

  describe('startOfDay  ', () => {
    it('should return date at start of day as a timestamp', () => {
      const date = dateFormatter.startOfDay('2020', '01', '01');
      assert.equal(date, '1577836800000');
    });
  });
});
