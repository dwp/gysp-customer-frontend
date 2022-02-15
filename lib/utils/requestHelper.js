module.exports = {
  requestFilter(fields, request) {
    const object = {};
    let i = 0;
    while (fields[i]) {
      object[fields[i]] = request[fields[i]];
      i++;
    }
    return object;
  },
  dob() {
    return ['dateYear', 'dateMonth', 'dateDay'];
  },
  claimFromDate() {
    return ['dateYear', 'dateMonth', 'dateDay'];
  },
  prison() {
    return ['spentTimeInPrison'];
  },
  livedAbroad() {
    return ['livedAbroad'];
  },
  livedAbroadCountries() {
    return ['dateFromMonth', 'dateFromYear', 'dateToMonth', 'dateToYear'];
  },
  countries() {
    return ['country-name[0]', 'country-name[1]', 'country-name[2]', 'country-name[3]'];
  },
  workedAbroad() {
    return ['workedAbroad'];
  },
  workedAbroadCountries() {
    return ['dateFromMonth', 'dateFromYear', 'dateToMonth', 'dateToYear', 'referenceNumber'];
  },
  maritalSelect() {
    return ['maritalStatus'];
  },
  maritalDate() {
    return ['dateDay', 'dateMonth', 'dateYear'];
  },
  maritalStatusDetail() {
    return ['firstName', 'surname', 'otherName', 'dobDay', 'dobMonth', 'dobYear'];
  },
  contactDetails() {
    return [
      'cbHomeTelephoneNumber',
      'cbMobileTelephoneNumber',
      'cbWorkTelephoneNumber',
      'homeTelephoneNumber',
      'mobileTelephoneNumber',
      'workTelephoneNumber',
      'email',
    ];
  },
  paymentDetails() {
    return [
      'paymentMethod',
      'buildingRoll',
      'bankAccountHolder',
      'bankAccountNumber',
      'bankSortCode',
    ];
  },
  overseasPaymentDetails() {
    return ['accountHolder', 'accountNumber', 'accountCode'];
  },
};
