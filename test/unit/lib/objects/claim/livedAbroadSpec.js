const assert = require('assert');

const claimObject = require('../../../../../lib/objects/claimObject');

const expectedInviteKeyQ = 'auth:fields.inviteKey.label';
const expectedConfirmedAdddressQ = 'auth:fields.address.legend';
const expectedPeriodAbroadsQ = 'countries:lived.header';
const expectedLivedAbroadQ = 'lived-abroad:header';
const expectedWorkedAbroadQ = 'worked-abroad:header';
const expectedMaritalStatusQ = 'marital-select:header';
const expectedContactDetailQ = 'contact:header';
const expectedMobileTelephoneNumberQ = 'contact:fields.mobileTelephoneNumber.label';
const expectedAccountDetailQ = 'account:header';
const expectedPaymentMethodQ = 'account:fields.paymentMethod.fieldset';
const expectedBankAccountHolderQ = 'account:fields.accountHolder.label';
const expectedBankAccountNumberQ = 'account:fields.accountNumber.label';
const expectedBankSortCodeQ = 'account:fields.sortCode.label';
const expectedBankDetailQ = 'account:fields.paymentMethod.options.bank';
const expectedDeclarationQ = 'declaration:header';
const resultQ = 'account:fields.result';

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

const livedAbroadOneCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }];
const livedAbroadTwoCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }, { countryQ: 'countries:fields.country.label', country: 'Country 2' }];
const livedAbroadTheeCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }, { countryQ: 'countries:fields.country.label', country: 'Country 2' }, { countryQ: 'countries:fields.country.label', country: 'Country 3' }];
const livedAbroadFourCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }, { countryQ: 'countries:fields.country.label', country: 'Country 2' }, { countryQ: 'countries:fields.country.label', country: 'Country 3' }, { countryQ: 'countries:fields.country.label', country: 'Country 4' }];

const livedAbroadOneCountriesJsonExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
  countryStatusQ: 'lived-abroad-country:header.title',
  fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
  fromDate: {
    month: '01',
    year: '2010',
  },
  toDateQ: 'lived-abroad-country:fields.dateTo.legend',
  toDate: {
    month: '02',
    year: '2011',
  },
}];

const livedAbroadTwoCountriesJsonExtended = [livedAbroadOneCountriesJsonExtended[0],
  {
    countryQ: 'countries:fields.country.label',
    country: 'Country 2',
    countryStatusQ: 'lived-abroad-country:header.title',
    fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
    fromDate: {
      month: '02',
      year: '2010',
    },
    toDateQ: 'lived-abroad-country:fields.dateTo.legend',
    toDate: {
      month: '03',
      year: '2011',
    },
  }];

const livedAbroadThreeCountriesJsonExtended = [livedAbroadTwoCountriesJsonExtended[0],
  livedAbroadTwoCountriesJsonExtended[1],
  {
    countryQ: 'countries:fields.country.label',
    country: 'Country 3',
    countryStatusQ: 'lived-abroad-country:header.title',
    fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
    fromDate: {
      month: '03',
      year: '2010',
    },
    toDateQ: 'lived-abroad-country:fields.dateTo.legend',
    toDate: {
      month: '04',
      year: '2011',
    },
  }];

const livedAbroadFourCountriesJsonExtended = [livedAbroadThreeCountriesJsonExtended[0],
  livedAbroadThreeCountriesJsonExtended[1],
  livedAbroadThreeCountriesJsonExtended[2],
  {
    countryQ: 'countries:fields.country.label',
    country: 'Country 4',
    countryStatusQ: 'lived-abroad-country:header.title',
    fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
    fromDate: {
      month: '04',
      year: '2010',
    },
    toDateQ: 'lived-abroad-country:fields.dateTo.legend',
    toDate: {
      month: '05',
      year: '2011',
    },
  }];

const livedAbroadFourCountriesJsonFirstExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
  countryStatusQ: 'lived-abroad-country:header.title',
  fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
  fromDate: {
    month: '04',
    year: '2010',
  },
  toDateQ: 'lived-abroad-country:fields.dateTo.legend',
  toDate: {
    month: '05',
    year: '2011',
  },
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 2',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 3',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 4',
}];

const livedAbroadFourCountriesJsonSecondExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 2',
  countryStatusQ: 'lived-abroad-country:header.title',
  fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
  fromDate: {
    month: '04',
    year: '2010',
  },
  toDateQ: 'lived-abroad-country:fields.dateTo.legend',
  toDate: {
    month: '05',
    year: '2011',
  },
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 3',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 4',
}];

const livedAbroadFourCountriesJsonThirdExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 2',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 3',
  countryStatusQ: 'lived-abroad-country:header.title',
  fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
  fromDate: {
    month: '04',
    year: '2010',
  },
  toDateQ: 'lived-abroad-country:fields.dateTo.legend',
  toDate: {
    month: '05',
    year: '2011',
  },
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 4',
}];

const livedAbroadFourCountriesJsonLastExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 2',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 3',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 4',
  countryStatusQ: 'lived-abroad-country:header.title',
  fromDateQ: 'lived-abroad-country:fields.dateFrom.legend',
  fromDate: {
    month: '04',
    year: '2010',
  },
  toDateQ: 'lived-abroad-country:fields.dateTo.legend',
  toDate: {
    month: '05',
    year: '2011',
  },
}];

const accountDetailsBankJson = {
  bankDetail: {
    result: 'Fail',
    resultQ,
    accountHolder: 'Mr Joe Bloggs',
    accountHolderQ: expectedBankAccountHolderQ,
    accountNumber: '12345678',
    accountNumberQ: expectedBankAccountNumberQ,
    sortCode: '112233',
    sortCodeQ: expectedBankSortCodeQ,
  },
  bankDetailQ: expectedBankDetailQ,
  paymentMethodQ: expectedPaymentMethodQ,
};

const inviteKey = '1234567';

const validJsonLivedAbroadOne = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadOneCountriesJson,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadTwo = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadTwoCountriesJson,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadThree = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadTheeCountriesJson,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadFour = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadFourCountriesJson,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadOneExtended = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadOneCountriesJsonExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadTwoExtended = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadTwoCountriesJsonExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadThreeExtended = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadThreeCountriesJsonExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonLivedAbroadFourExtended = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadFourCountriesJsonExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonWithOnly4thCountryDetail = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadFourCountriesJsonLastExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonWithOnlyThirdCountryDetail = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadFourCountriesJsonThirdExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonWithOnlySecondCountryDetail = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadFourCountriesJsonSecondExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const validJsonWithOnlyFirstCountryDetail = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadFourCountriesJsonFirstExtended,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    mobileTelephoneNumber: '1234',
    mobileTelephoneNumberQ: expectedMobileTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
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
    describe(' lived abroad countries ', () => {
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 1', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadOne, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadOne));
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 2', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadTwo, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadTwo));
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 3', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadThree, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadThree));
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 4', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadFour, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadFour));
      });
    });
    describe(' lived abroad countries with extended details', () => {
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadOneExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadOneExtended));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 2', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadTwoExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadTwoExtended));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 3', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadThreeExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadThreeExtended));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 4', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadFourExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadFourExtended));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the forth position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadFourExtendedButOnlyOneCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnly4thCountryDetail));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the third position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadThirdExtendedButOnlyOneCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnlyThirdCountryDetail));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the second position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadSecondExtendedButOnlyOneCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnlySecondCountryDetail));
      });
      it('should convert object to valid json with livedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the first position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadFourExtendedButOnlyOneFirstCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnlyFirstCountryDetail));
      });
    });
  });
});
