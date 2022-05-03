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
  isDateSameOrAfterToday(date) {
    const dateToday = moment().startOf('day');
    const compareDate = moment(date).startOf('day');
    return moment(dateToday).isSameOrAfter(compareDate);
  },
  isDateBefore(date, beforeDate) {
    const d = moment(date, 'YYYY-MM-DD').startOf('day');
    const bd = moment(beforeDate, 'YYYY-MM-DD').startOf('day');
    return moment(d).isBefore(bd);
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
  dateSubtract(date, amount, unit) {
    return moment(date, 'x').subtract(amount, unit);
  },
};
