const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const claimObject = require('../../../../../lib/objects/claimObject');

const accountObject = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
};
const customerDetailsObject = { dobVerification: 'V' };

const livedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const livedAbroadTwoCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': '', 'country-name[3]': '',
};
const livedAbroadThreeCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': 'Country 3', 'country-name[3]': '',
};
const livedAbroadFourCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': 'Country 2', 'country-name[2]': 'Country 3', 'country-name[3]': 'Country 4',
};

const livedAbroadOneCountriesExtended = [{
  name: 'Country 1',
  url: 'country-1',
  data: {
    dateFromMonth: '01', dateFromYear: '2010', dateToMonth: '02', dateToYear: '2011',
  },
}];
const livedAbroadTwoCountriesExtended = [livedAbroadOneCountriesExtended[0], {
  name: 'Country 2',
  url: 'country-2',
  data: {
    dateFromMonth: '02', dateFromYear: '2010', dateToMonth: '03', dateToYear: '2011',
  },
}];
const livedAbroadThreeCountriesExtended = [livedAbroadTwoCountriesExtended[0], livedAbroadTwoCountriesExtended[1], {
  name: 'Country 3',
  url: 'country-3',
  data: {
    dateFromMonth: '03', dateFromYear: '2010', dateToMonth: '04', dateToYear: '2011',
  },
}];
const livedAbroadFourCountriesExtended = [livedAbroadThreeCountriesExtended[0], livedAbroadThreeCountriesExtended[1], livedAbroadThreeCountriesExtended[2], {
  name: 'Country 4',
  url: 'country-4',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011',
  },
}];

const livedAbroadFirstCountryOnly = [{
  name: 'Country 1',
  url: 'country-1',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011',
  },
}];
const livedAbroadSecondCountryOnly = [{
  name: 'Country 2',
  url: 'country-2',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011',
  },
}];
const livedAbroadThirdCountryOnly = [{
  name: 'Country 3',
  url: 'country-3',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011',
  },
}];
const livedAbroadFourCountryOnly = [{
  name: 'Country 4',
  url: 'country-4',
  data: {
    dateFromMonth: '04', dateFromYear: '2010', dateToMonth: '05', dateToYear: '2011',
  },
}];

const inviteKey = '1234567';

const validJsonLivedAbroadOne = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadTwo = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadThree = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadFour = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }, { countryQ: 'Country name', country: 'Country 4' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadOneExtended = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you live in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' },
  }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadTwoExtended = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you live in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' },
  }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you live in Country 2?', fromDateQ: 'From', fromDate: { month: '02', year: '2010' }, toDateQ: 'To', toDate: { month: '03', year: '2011' },
  }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadThreeExtended = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you live in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' },
  }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you live in Country 2?', fromDateQ: 'From', fromDate: { month: '02', year: '2010' }, toDateQ: 'To', toDate: { month: '03', year: '2011' },
  }, {
    countryQ: 'Country name', country: 'Country 3', countryStatusQ: 'When did you live in Country 3?', fromDateQ: 'From', fromDate: { month: '03', year: '2010' }, toDateQ: 'To', toDate: { month: '04', year: '2011' },
  }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const validJsonLivedAbroadFourExtended = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you live in Country 1?', fromDateQ: 'From', fromDate: { month: '01', year: '2010' }, toDateQ: 'To', toDate: { month: '02', year: '2011' },
  }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you live in Country 2?', fromDateQ: 'From', fromDate: { month: '02', year: '2010' }, toDateQ: 'To', toDate: { month: '03', year: '2011' },
  }, {
    countryQ: 'Country name', country: 'Country 3', countryStatusQ: 'When did you live in Country 3?', fromDateQ: 'From', fromDate: { month: '03', year: '2010' }, toDateQ: 'To', toDate: { month: '04', year: '2011' },
  }, {
    countryQ: 'Country name', country: 'Country 4', countryStatusQ: 'When did you live in Country 4?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' },
  }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }, {
    countryQ: 'Country name', country: 'Country 4', countryStatusQ: 'When did you live in Country 4?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' },
  }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, { countryQ: 'Country name', country: 'Country 2' }, {
    countryQ: 'Country name', country: 'Country 3', countryStatusQ: 'When did you live in Country 3?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' },
  }, { countryQ: 'Country name', country: 'Country 4' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }, {
    countryQ: 'Country name', country: 'Country 2', countryStatusQ: 'When did you live in Country 2?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' },
  }, { countryQ: 'Country name', country: 'Country 3' }, { countryQ: 'Country name', country: 'Country 4' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{
    countryQ: 'Country name', country: 'Country 1', countryStatusQ: 'When did you live in Country 1?', fromDateQ: 'From', fromDate: { month: '04', year: '2010' }, toDateQ: 'To', toDate: { month: '05', year: '2011' },
  }, { countryQ: 'Country name', country: 'Country 2' }, { countryQ: 'Country name', country: 'Country 3' }, { countryQ: 'Country name', country: 'Country 4' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { mobileTelephoneNumber: '1234', mobileTelephoneNumberQ: 'Mobile phone number' },
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

const formObjectLivedAbroadOne = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadTwo = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadTwoCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadThree = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadThreeCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadFour = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadFourCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadOneExtended = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'lived-abroad-countries-details': livedAbroadOneCountriesExtended,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadTwoExtended = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadTwoCountries,
  'lived-abroad-countries-details': livedAbroadTwoCountriesExtended,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadThreeExtended = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadThreeCountries,
  'lived-abroad-countries-details': livedAbroadThreeCountriesExtended,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadFourExtended = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadFourCountries,
  'lived-abroad-countries-details': livedAbroadFourCountriesExtended,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadFourExtendedButOnlyOneCountry = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadFourCountries,
  'lived-abroad-countries-details': livedAbroadFourCountryOnly,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadThirdExtendedButOnlyOneCountry = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadFourCountries,
  'lived-abroad-countries-details': livedAbroadThirdCountryOnly,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectLivedAbroadSecondExtendedButOnlyOneCountry = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadFourCountries,
  'lived-abroad-countries-details': livedAbroadSecondCountryOnly,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};
const formObjectLivedAbroadFourExtendedButOnlyOneFirstCountry = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadFourCountries,
  'lived-abroad-countries-details': livedAbroadFirstCountryOnly,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const accountStatus = { result: 'Fail' };

describe('Claim object ', () => {
  describe(' convertor ', () => {
    before(async () => {
      await i18next
        .use(i18nextFsBackend)
        .init(i18nextConfig);
    });
    describe(' lived abroad countries ', () => {
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 1', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadOne, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadOne);
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 2', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadTwo, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadTwo);
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 3', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadThree, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadThree);
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 4', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadFour, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadFour);
      });
    });
    describe(' lived abroad countries with extended details', () => {
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadOneExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadOneExtended);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 2', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadTwoExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadTwoExtended);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 3', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadThreeExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadThreeExtended);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 4', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadFourExtended, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadFourExtended);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the forth position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadFourExtendedButOnlyOneCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnly4thCountryDetail);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the third position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadThirdExtendedButOnlyOneCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnlyThirdCountryDetail);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the second position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadSecondExtendedButOnlyOneCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnlySecondCountryDetail);
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the first position', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadFourExtendedButOnlyOneFirstCountry, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWithOnlyFirstCountryDetail);
      });
    });
  });
});
