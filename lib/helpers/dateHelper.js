const moment = require('moment');

module.exports = {
  isDateBeforeToday(date) {
    const dateToday = moment().startOf('day');
    const compareDate = moment(date, 'x').startOf('day');
    if (moment(compareDate).isBefore(dateToday)) {
      return true;
    }
    return false;
  },
  numberOfDaysBetweenDates(fromDate, toDate) {
    const dateFrom = moment(fromDate, 'x').startOf('day');
    const dateTo = moment(toDate, 'x').startOf('day');
    const difference = dateTo.diff(dateFrom, 'days');
    return Math.abs(difference); // Force non minus number
  },
  numberOfMonthsInFuture(date) {
    if (this.isDateBeforeToday(date)) {
      return 0;
    }
    const now = moment().startOf('day');
    const startDate = moment(date, 'x').startOf('day');
    return startDate.diff(now, 'months', true);
  },
};
