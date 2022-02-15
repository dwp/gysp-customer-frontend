const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const claimObject = require('../../../../../lib/objects/claimObject');

const accountObject = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233',
};

const abroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const abroadTwoCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': '', 'country-name[3]': '',
};
const abroadThreeCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': 'Country 3', 'country-name[3]': '',
};
const abroadFourCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': 'Country 3', 'country-name[3]': 'Country 4',
};

const workedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const workedAbroadTwoCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': '', 'country-name[3]': '',
};
const workedAbroadThreeCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': 'Country 3', 'country-name[3]': '',
};
const workedAbroadFourCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': 'Country 3', 'country-name[3]': 'Country 4',
};

const workedAbroadFirstCountryOnly = [{
  name: 'Country 1',
  url: 'country-1',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011', referenceNumber: 'AA',
  },
}];
const workedAbroadSecondCountryOnly = [{
  name: 'Country 2',
  url: 'country-2',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011', referenceNumber: 'AA',
  },
}];
const workedAbroadThirdCountryOnly = [{
  name: 'Country 3',
  url: 'country-3',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011', referenceNumber: 'AA',
  },
}];
const workedAbroadFourCountryOnly = [{
  name: 'Country 4',
  url: 'country-4',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011', referenceNumber: 'AA',
  },
}];

const workedAbroadOneCountriesExtended = [{
  name: 'Country 1',
  url: 'country-1',
  data: {
    dateFromMonth: '01', dateFromYear: '2010', dateToMonth: '02', dateToYear: '2011', referenceNumber: 'AA',
  },
}];
const workedAbroadTwoCountriesExtended = [workedAbroadOneCountriesExtended[0], {
  name: 'Country 2',
  url: 'country-2',
  data: {
    dateFromMonth: '02', dateFromYear: '2010', dateToMonth: '03', dateToYear: '2011', referenceNumber: 'AA',
  },
}];
const workedAbroadThreeCountriesExtended = [workedAbroadOneCountriesExtended[0], workedAbroadTwoCountriesExtended[1], {
  name: 'Country 3',
  url: 'country-3',
  data: {
    dateFromMonth: '03', dateFromYear: '2010', dateToMonth: '04', dateToYear: '2011', referenceNumber: 'AA',
  },
}];
const workedAbroadFourCountriesExtended = [workedAbroadOneCountriesExtended[0], workedAbroadTwoCountriesExtended[1], workedAbroadThreeCountriesExtended[2], {
  name: 'Country 4',
  url: 'country-4',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011', referenceNumber: 'AA',
  },
}];

const customerDetailsObject = { dobVerification: 'V' };

const inviteKey = '1234567';

const validJsonWorkedAbroadOne = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWorkedAbroadTwo = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWorkedAbroadThree = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWorkedAbroadFour = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }, { countryQ: 'Country name', country: 'Country 4' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectWorkedAbroadOne = {
  'lived-abroad': { livedAbroad: 'no' },
  'lived-abroad-countries': abroadOneCountries,
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': abroadOneCountries,
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadTwo = {
  'lived-abroad': { livedAbroad: 'no' },
  'lived-abroad-countries': abroadTwoCountries,
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': abroadTwoCountries,
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadThree = {
  'lived-abroad': { livedAbroad: 'no' },
  'lived-abroad-countries': abroadThreeCountries,
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': abroadThreeCountries,
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadFour = {
  'lived-abroad': { livedAbroad: 'no' },
  'lived-abroad-countries': abroadFourCountries,
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': abroadFourCountries,
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadOneExtended = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadOneCountries,
  'worked-abroad-countries-details': workedAbroadOneCountriesExtended,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadTwoExtended = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadTwoCountries,
  'worked-abroad-countries-details': workedAbroadTwoCountriesExtended,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadThreeExtended = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadThreeCountries,
  'worked-abroad-countries-details': workedAbroadThreeCountriesExtended,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadFourExtended = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadFourCountries,
  'worked-abroad-countries-details': workedAbroadFourCountriesExtended,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadFourExtendedButOnlyOneCountry = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadFourCountries,
  'worked-abroad-countries-details': workedAbroadFourCountryOnly,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadThirdExtendedButOnlyOneCountry = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadFourCountries,
  'worked-abroad-countries-details': workedAbroadThirdCountryOnly,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectWorkedAbroadSecondExtendedButOnlyOneCountry = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadFourCountries,
  'worked-abroad-countries-details': workedAbroadSecondCountryOnly,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};
const formObjectWorkedAbroadFourExtendedButOnlyOneFirstCountry = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad-countries': workedAbroadFourCountries,
  'worked-abroad-countries-details': workedAbroadFirstCountryOnly,
  'worked-abroad': { workedAbroad: 'yes' },
  'contact-details': { homeTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonWorkedAbroadOneExtended = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you work in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWorkedAbroadTwoExtended = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you work in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you work in Country 2?', fromDateQ: 'From', fromDate: { month: '02', year: '2010' }, toDateQ: 'To', toDate: { month: '03', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWorkedAbroadThreeExtended = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you work in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you work in Country 2?', fromDateQ: 'From', fromDate: { month: '02', year: '2010' }, toDateQ: 'To', toDate: { month: '03', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, {
    countryQ: 'Country name', country: 'Country 3', countryStatusQ: 'When did you work in Country 3?', fromDateQ: 'From', fromDate: { month: '03', year: '2010' }, toDateQ: 'To', toDate: { month: '04', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWorkedAbroadFourExtended = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you work in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you work in Country 2?', fromDateQ: 'From', fromDate: { month: '02', year: '2010' }, toDateQ: 'To', toDate: { month: '03', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, {
    countryQ: 'Country name', country: 'Country 3', countryStatusQ: 'When did you work in Country 3?', fromDateQ: 'From', fromDate: { month: '03', year: '2010' }, toDateQ: 'To', toDate: { month: '04', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, {
    countryQ: 'Country name', country: 'Country 4', countryStatusQ: 'When did you work in Country 4?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWithOnly4thCountryDetail = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }, {
    countryQ: 'Country name', country: 'Country 4', countryStatusQ: 'When did you work in Country 4?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWithOnlyThirdCountryDetail = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, {
    countryQ: 'Country name', country: 'Country 3', countryStatusQ: 'When did you work in Country 3?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, { countryQ: 'Country name', country: 'Country 4' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWithOnlySecondCountryDetail = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you work in Country 2?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, { countryQ: 'Country name', country: 'Country 3' }, { countryQ: 'Country name', country: 'Country 4' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWithOnlyFirstCountryDetail = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you work in Country 1?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' }, referenceNumberQ: 'What was the equivalent of your National Insurance number here?', referenceNumber: 'AA',
  }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }, { countryQ: 'Country name', country: 'Country 4' }],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail',
      resultQ: 'Bank Authentication result',
      accountHolder: 'Mr Joe Bloggs',
      accountHolderQ: 'Account holder name',
      accountNumber: '12345678',
      accountNumberQ: 'Account number',
      sortCode: '112233',
      sortCodeQ: 'Sort code',
      validated: undefined,
    },
    bankDetailQ: 'Bank account',
    paymentMethodQ: 'How would you like to be paid?',
  },
  accountDetailQ: 'How would you like to be paid?',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living at the address we sent your invitation letter to?',
  declaration: true,
  declarationQ: 'Declaration',
  dobVerification: 'V',
  dobVerificationQ: 'Date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const accountStatus = { result: 'Fail' };

describe('Claim object ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe(' convertor ', () => {
    describe(' worked abroad countries  ', () => {
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 1', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadOne, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadOne);
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 2', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadTwo, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadTwo);
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 3', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadThree, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadThree);
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 4', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadFour, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadFour);
      });
    });
    describe(' worked abroad countries with extended details', () => {
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadOneExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadOneExtended);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 2', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadTwoExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadTwoExtended);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 3', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadThreeExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadThreeExtended);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 4', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadFourExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWorkedAbroadFourExtended);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the forth position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadFourExtendedButOnlyOneCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnly4thCountryDetail);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the third position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadThirdExtendedButOnlyOneCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnlyThirdCountryDetail);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the second position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadSecondExtendedButOnlyOneCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnlySecondCountryDetail);
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the first position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWorkedAbroadFourExtendedButOnlyOneFirstCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnlyFirstCountryDetail);
      });
    });
  });
});
