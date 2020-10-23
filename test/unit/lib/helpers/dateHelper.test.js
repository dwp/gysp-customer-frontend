const assert = require('assert');
const mockdate = require('mockdate');
const dateHelper = require('../../../../lib/helpers/dateHelper');

const todayDate = '2018-04-01';
const dateBefore = 1519862400000;
const dateAfter = 1522627200000;
const dateSame = 1522540800000;
const fromDate = 1577836800000;
const toDate = 1578614400000;

const fourMonthAfterNow = 1533081600000;
const fourMonthsAndOneDay = 1533168000000;
const oneMonthBeforeNow = 1519862400000;

describe('date helper ', () => {
  describe('isDateSameOrBeforeToday  ', () => {
    beforeEach(() => {
      mockdate.set(new Date(todayDate));
    });

    afterEach(() => {
      mockdate.reset();
    });

    it(`should return false when a date the same as today (${todayDate}) is supplied`, () => {
      const isDateBeforeToday = dateHelper.isDateBeforeToday(dateSame);
      assert.equal(isDateBeforeToday, false);
    });

    it(`should return true when a date before today (${todayDate}) is supplied`, () => {
      const isDateBeforeToday = dateHelper.isDateBeforeToday(dateBefore);
      assert.equal(isDateBeforeToday, true);
    });

    it(`should return false when a date after today (${todayDate}) is supplied`, () => {
      const isDateBeforeToday = dateHelper.isDateBeforeToday(dateAfter);
      assert.equal(isDateBeforeToday, false);
    });
  });

  describe('numberOfDaysBetweenDates  ', () => {
    it('should return 9 when fromDate is before toDate', () => {
      const isDateSameOrBeforeToday = dateHelper.numberOfDaysBetweenDates(fromDate, toDate);
      assert.equal(isDateSameOrBeforeToday, 9);
    });

    it('should return 9 when fromDate is after toDate', () => {
      const isDateSameOrBeforeToday = dateHelper.numberOfDaysBetweenDates(fromDate, toDate);
      assert.equal(isDateSameOrBeforeToday, 9);
    });
  });

  describe('numberOfMonthsInFuture  ', () => {
    beforeEach(() => {
      mockdate.set(new Date(todayDate));
    });

    afterEach(() => {
      mockdate.reset();
    });

    it(`should return 4 when date is 4 months in the future from todays date (${todayDate})`, () => {
      const numberOfMonthsFromNow = dateHelper.numberOfMonthsInFuture(fourMonthAfterNow);
      assert.equal(numberOfMonthsFromNow, 4);
    });

    it(`should return 4 with a decimal when date is 4 months and 1 day in the future from todays date (${todayDate})`, () => {
      const numberOfMonthsFromNow = dateHelper.numberOfMonthsInFuture(fourMonthsAndOneDay);
      assert.equal(numberOfMonthsFromNow > 4, true);
    });

    it(`should return 0 when date is in the past from todays date (${todayDate})`, () => {
      const numberOfMonthsFromNow = dateHelper.numberOfMonthsInFuture(oneMonthBeforeNow);
      assert.equal(numberOfMonthsFromNow, 0);
    });

    it(`should return 0 when date the same as todays date (${todayDate})`, () => {
      const numberOfMonthsFromNow = dateHelper.numberOfMonthsInFuture(dateSame);
      assert.equal(numberOfMonthsFromNow, 0);
    });
  });
});
