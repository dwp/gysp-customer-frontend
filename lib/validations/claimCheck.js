module.exports = {
  data(session) {
    if (session['lived-abroad'] === undefined && session.isOverseas === false) {
      return false;
    }

    if ((session['lived-abroad'] && session['lived-abroad'].livedAbroad === true) || session.isOverseas === true) {
      if (session['lived-abroad-countries'] === undefined) {
        return false;
      }
    }

    if (session['worked-abroad'] === undefined) {
      return false;
    }

    if (session['worked-abroad'].workedAbroad === true) {
      if (session['worked-abroad-countries'] === undefined) {
        return false;
      }
    }

    if (session['marital-select'] === undefined) {
      return false;
    }

    if (session['marital-select'].maritalStatus !== 'single') {
      if (session[`marital-date-${session['marital-select'].maritalStatus}`] === undefined) {
        return false;
      }
      if (session[`marital-partner-${session['marital-select'].maritalStatus}`] === undefined) {
        return false;
      }
    }

    if (session['contact-details'] === undefined) {
      return false;
    }

    if (session['account-details'] === undefined && session.isOverseas === false) {
      return false;
    }

    if (session['account-details-overseas'] === undefined && session.isOverseas === true) {
      return false;
    }

    return true;
  },
};
