const assert = require('assert');

const claimObject = require('../../../../../lib/objects/claimObject');

const expectedInviteKeyQ = 'auth:fields.inviteKey.label';
const expectedConfirmedAdddressQ = 'auth:fields.address.legend';
const expectedWorkedPeriodAbroadsQ = 'countries:worked.header';
const expectedLivedAbroadQ = 'lived-abroad:header';
const expectedWorkedAbroadQ = 'worked-abroad:header';
const expectedMaritalStatusQ = 'marital-select:header';
const expectedContactDetailQ = 'contact:header';
const expectedHomeTelephoneNumberQ = 'contact:fields.homeTelephoneNumber.label';
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

const abroadOneCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }];
const abroadTwoCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }, { countryQ: 'countries:fields.country.label', country: 'Country 2' }];
const abroadTheeCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }, { countryQ: 'countries:fields.country.label', country: 'Country 2' }, { countryQ: 'countries:fields.country.label', country: 'Country 3' }];
const abroadFourCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }, { countryQ: 'countries:fields.country.label', country: 'Country 2' }, { countryQ: 'countries:fields.country.label', country: 'Country 3' }, { countryQ: 'countries:fields.country.label', country: 'Country 4' }];

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

const customerDetailsObject = { dobVerification: 'V' };

const inviteKey = '1234567';

const validJsonWorkedAbroadOne = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: abroadOneCountriesJson,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const validJsonWorkedAbroadTwo = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: abroadTwoCountriesJson,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const validJsonWorkedAbroadThree = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: abroadTheeCountriesJson,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const validJsonWorkedAbroadFour = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: abroadFourCountriesJson,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const workedAbroadOneCountriesJsonExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
  countryStatusQ: 'worked-abroad-country:header.title',
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
  referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
  referenceNumber: 'AA',
}];

const workedAbroadTwoCountriesJsonExtended = [workedAbroadOneCountriesJsonExtended[0],
  {
    countryQ: 'countries:fields.country.label',
    country: 'Country 2',
    countryStatusQ: 'worked-abroad-country:header.title',
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
    referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
    referenceNumber: 'AA',
  }];

const workedAbroadThreeCountriesJsonExtended = [workedAbroadTwoCountriesJsonExtended[0],
  workedAbroadTwoCountriesJsonExtended[1],
  {
    countryQ: 'countries:fields.country.label',
    country: 'Country 3',
    countryStatusQ: 'worked-abroad-country:header.title',
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
    referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
    referenceNumber: 'AA',
  }];

const workedAbroadFourCountriesJsonExtended = [workedAbroadThreeCountriesJsonExtended[0],
  workedAbroadThreeCountriesJsonExtended[1],
  workedAbroadThreeCountriesJsonExtended[2],
  {
    countryQ: 'countries:fields.country.label',
    country: 'Country 4',
    countryStatusQ: 'worked-abroad-country:header.title',
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
    referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
    referenceNumber: 'AA',
  }];

const workedAbroadFourCountriesJsonFirstExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
  countryStatusQ: 'worked-abroad-country:header.title',
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
  referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
  referenceNumber: 'AA',
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

const workedAbroadFourCountriesJsonSecondExtended = [{
  countryQ: 'countries:fields.country.label',
  country: 'Country 1',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 2',
  countryStatusQ: 'worked-abroad-country:header.title',
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
  referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
  referenceNumber: 'AA',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 3',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 4',
}];

const workedAbroadFourCountriesJsonThirdExtended = [{
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
  countryStatusQ: 'worked-abroad-country:header.title',
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
  referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
  referenceNumber: 'AA',
},
{
  countryQ: 'countries:fields.country.label',
  country: 'Country 4',
}];

const workedAbroadFourCountriesJsonLastExtended = [{
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
  countryStatusQ: 'worked-abroad-country:header.title',
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
  referenceNumberQ: 'worked-abroad-country:fields.referenceNumber.label',
  referenceNumber: 'AA',
}];

const validJsonWorkedAbroadOneExtended = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadOneCountriesJsonExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const validJsonWorkedAbroadTwoExtended = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadTwoCountriesJsonExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const validJsonWorkedAbroadThreeExtended = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadThreeCountriesJsonExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const validJsonWorkedAbroadFourExtended = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadFourCountriesJsonExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadFourCountriesJsonLastExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadFourCountriesJsonThirdExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadFourCountriesJsonSecondExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: true,
  workedAbroadQ: expectedWorkedAbroadQ,
  workedPeriodsAbroad: workedAbroadFourCountriesJsonFirstExtended,
  workedPeriodsAbroadQ: expectedWorkedPeriodAbroadsQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
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

const accountStatus = { result: 'Fail' };

describe('Claim object ', () => {
  describe(' convertor ', () => {
    describe(' worked abroad countries  ', () => {
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 1', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadOne, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadOne));
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 2', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadTwo, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadTwo));
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 3', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadThree, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadThree));
      });
      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes and countries set as 4', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadFour, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadFour));
      });
    });
    describe(' worked abroad countries with extended details', () => {
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadOneExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadOneExtended));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 2', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadTwoExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadTwoExtended));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 3', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadThreeExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadThreeExtended));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 4', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadFourExtended, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWorkedAbroadFourExtended));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the forth position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadFourExtendedButOnlyOneCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnly4thCountryDetail));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the third position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadThirdExtendedButOnlyOneCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnlyThirdCountryDetail));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the second position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadSecondExtendedButOnlyOneCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnlySecondCountryDetail));
      });
      it('should convert object to valid json with workedAbroad value set as true and extended countries details when lived abroad is yes and countries set as 1 but in the first position', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWorkedAbroadFourExtendedButOnlyOneFirstCountry, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonWithOnlyFirstCountryDetail));
      });
    });
  });
});
