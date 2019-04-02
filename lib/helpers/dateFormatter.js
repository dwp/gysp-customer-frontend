const moment = require('moment');

module.exports = {
  statePensionDate(date, lang) {
    if (lang === undefined || lang === 'en-GB') {
      return moment(date).locale('en').format('D MMMM YYYY');
    }
    return moment(date).locale('cy').format('D MMMM YYYY');
  },
  applicationDate(lang) {
    if (lang === undefined || lang === 'en-GB') {
      return moment().format('D MMMM YYYY');
    }
    return moment().locale('cy').format('D MMMM YYYY');
  },
  humanReadableDate(date) {
    return moment(date).format('D MMMM YYYY');
  },
  dateSectionsToUnixDate(year, month, day) {
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('x');
  },
  monthYearDate(year, month, lang) {
    if (lang === undefined || lang === 'en-GB') {
      return moment(`${year}-${month}`, 'YYYY-MM').format('MMM YYYY');
    }
    return moment(`${year}-${month}`, 'YYYY-MM').locale('cy').format('MMM YYYY');
  },
  dayMonthYearSlash(year, month, day) {
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('DD/MM/YYYY');
  },
  startOfDay(year, month, day) {
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').startOf('day');
  },
};
