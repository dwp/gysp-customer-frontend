const validDateUrls = {
  contact: 'contact-details',
  checkChange: 'check-your-details',
  married: 'what-date-did-you-get-married',
  civilPartnership: 'what-date-was-your-civil-partnership-registered',
  divorced: 'what-date-did-you-get-divorced',
  dissolved: 'what-date-was-your-civil-partnership-dissloved',
  widowed: 'what-date-were-you-widowed',
  none: 'what-is-your-current-marital-status',
};

const validPartnerUrls = {
  married: 'about-your-spouse',
  civilPartnership: 'about-your-civil-partner',
  divorced: 'about-your-ex-spouse',
  dissolved: 'about-your-ex-partner',
  widowed: 'about-your-late-spouse',
  none: 'what-is-your-current-marital-status',
};

module.exports = {
  redirectBasedOnStatus(maritalStatus) {
    switch (maritalStatus) {
    case 'civil':
      return validDateUrls.civilPartnership;
    case 'married':
      return validDateUrls.married;
    case 'divorced':
      return validDateUrls.divorced;
    case 'dissolved':
      return validDateUrls.dissolved;
    case 'single':
      return validDateUrls.contact;
    case 'widowed':
      return validDateUrls.widowed;
    default:
      return validDateUrls.none;
    }
  },
  redirectBasedOnStatusAndEditMode(maritalStatus, isOverseas, editMode) {
    if (maritalStatus === 'single' && editMode === true) {
      return validDateUrls.checkChange;
    }
    if (maritalStatus === 'single' && isOverseas === false) {
      return validDateUrls.contact;
    }
    return this.redirectBasedOnStatus(maritalStatus, isOverseas);
  },
  redirectBasedOnStatusPartner(maritalStatus) {
    switch (maritalStatus) {
    case 'civil':
      return validPartnerUrls.civilPartnership;
    case 'married':
      return validPartnerUrls.married;
    case 'divorced':
      return validPartnerUrls.divorced;
    case 'dissolved':
      return validPartnerUrls.dissolved;
    case 'widowed':
      return validPartnerUrls.widowed;
    default:
      return validPartnerUrls.none;
    }
  },
  redirectBasedOnLivingAbroad(livedAbroad, editMode) {
    if (livedAbroad === 'yes') {
      return 'what-countries-have-you-lived-in';
    }
    if (livedAbroad === 'no') {
      if (editMode) {
        return 'check-your-details';
      }
      return 'have-you-worked-outside-of-the-uk';
    }
    return 'have-you-ever-lived-outside-of-the-uk';
  },
  redirectBasedOnWorkedAbroad(workedAbroad, editMode) {
    if (workedAbroad === 'yes') {
      return 'what-countries-have-you-worked-in';
    }
    if (workedAbroad === 'no') {
      if (editMode) {
        return 'check-your-details';
      }
      return 'what-is-your-current-marital-status';
    }
    return 'have-you-worked-outside-of-the-uk';
  },
  redirectBasedOnAuthType(authType) {
    if (authType === 'verify') {
      return 'verify';
    }
    return 'auth';
  },
  redirectBasedOnPersonalDataPermission(personalDataPermission) {
    if (personalDataPermission === 'no') {
      return 'verify/cancel';
    }
    return 'verify/start';
  },
  redirectBasedOnEditSection(section) {
    switch (section) {
    case 'marital-select':
      return '/what-is-your-current-marital-status';
    case 'lived-abroad':
      return '/have-you-ever-lived-outside-of-the-uk';
    case 'worked-abroad':
      return '/have-you-worked-outside-of-the-uk';
    default:
      return '/';
    }
  },
};
