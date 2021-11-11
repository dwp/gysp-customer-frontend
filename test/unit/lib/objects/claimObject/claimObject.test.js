const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const claimObject = require('../../../../../lib/objects/claimObject');

const dateForm = { dateDay: '01', dateMonth: '01', dateYear: '1990' };
const dateSingleMonth = { dateDay: '01', dateMonth: '1', dateYear: '1990' };
const validDateJson = '1990-01-01T00:00:00.000Z';

const claimFromDate = { dateDay: '01', dateMonth: '03', dateYear: '2018' };

const claimFromDateSameAsSPA = { dateDay: '01', dateMonth: '02', dateYear: '2018' };

const accountObject = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33', validated: 'Invalid',
};
const accountObjectBuilding = {
  paymentMethod: 'building', buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: '12',
};
const accountObjectBuildingNoRoll = {
  paymentMethod: 'building', buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33',
};
const accountOverseasObject = {
  accountHolder: 'Mr Joe Bloggs', accountNumber: '12345678', accountCode: '12345678', validated: 'Invalid',
};

const customerDetailsObject = { dobVerification: 'V', statePensionDate: 1517443200000 };

const livedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};

const inviteKey = '1234567';

const validJsonLivedAbroad = {
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const martitalDetailsForm = {
  firstName: 'first', otherName: '', surname: 'last', dobDay: '01', dobMonth: '01', dobYear: '1990',
};
const martitalDetailsFormOther = {
  firstName: 'first', otherName: 'Other', surname: 'last', dobDay: '01', dobMonth: '01', dobYear: '1990',
};

const formObjectNoLivedWorkAbroadSingleBuildingNoRollNumber = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObjectBuildingNoRoll,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonNoLivedWorkAbroadSingleBuildingNoRollNumber = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  accountDetail: {
    buildingSocietyDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code',
    },
    buildingSocietyDetailQ: 'Building society account',
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

const formObjectLivedAbroad = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonNotLivedAbroadMarried = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Married',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    marriageDate: '1990-01-01T00:00:00.000Z', marriageDateQ: 'What date did you get married?', aboutYourPartnerQ: 'About your spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const formObjectNotLivedAbroadMarried = {
  'lived-abroad': { livedAbroad: 'no' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'married' },
  'marital-date-married': dateForm,
  'marital-partner-married': martitalDetailsForm,
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const formObjectCivil = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'civil' },
  'marital-date-civil': dateForm,
  'marital-partner-civil': martitalDetailsForm,
  'account-details': accountObjectBuilding,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonCivil = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Civil Partnership',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    civilPartnershipDate: '1990-01-01T00:00:00.000Z', civilPartnershipDateQ: 'What date was your civil partnership registered?', aboutYourPartnerQ: 'About your civil partner', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    buildingSocietyDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', referenceNumber: '12', referenceNumberQ: 'Building society roll or reference number', sortCode: '112233', sortCodeQ: 'Sort code',
    },
    buildingSocietyDetailQ: 'Building society account',
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

const formObjectDivorced = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'divorced' },
  'marital-date-divorced': dateForm,
  'marital-partner-divorced': martitalDetailsFormOther,
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonDivorced = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Divorced',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    divorcedDate: '1990-01-01T00:00:00.000Z', divorcedDateQ: 'What date did you get divorced?', aboutYourPartnerQ: 'About your ex-spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', allOtherNames: 'Other', allOtherNamesQ: 'All other names they have been known by', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const formObjectDissolved = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'dissolved' },
  'marital-date-dissolved': dateForm,
  'marital-partner-dissolved': martitalDetailsForm,
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonDissolved = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Dissolved',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    dissolvedDate: '1990-01-01T00:00:00.000Z', dissolvedDateQ: 'What date was your civil partnership dissolved?', aboutYourPartnerQ: 'About your ex-partner', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const formObjectWidowed = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonWidowed = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const formObjectWelshIndicator = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonEnglish = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  claimFromDate: '2018-03-01T00:00:00.000Z',
  claimFromDateQ: 'What date do you want to get your State Pension from?',
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const validJsonWelsh = {
  livedAbroad: false,
  livedAbroadQ: "Ydych chi erioed wedi byw y tu allan i'r Deyrnas Unedig?",
  workedAbroad: false,
  workedAbroadQ: "Ydych chi wedi gweithio y tu allan i'r Deyrnas Unedig?",
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Rhif ffôn cartref', workTelephoneNumber: '123', workTelephoneNumberQ: 'Rhif ffôn gwaith', email: 'test@test.com', emailQ: 'Cyfeiriad e-bost',
  },
  contactDetailQ: 'Sut hoffech i ni gysylltu â chi?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'Beth yw eich statws priodasol presennol?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'Pa ddyddiad gawsoch chi eich gwneud yn weddw?', aboutYourPartnerQ: 'Am eich diweddar briod', firstName: 'first', firstNameQ: 'Eu henw cyntaf', surname: 'last', surnameQ: 'Eu cyfenw', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Eu dyddiad geni (dewisol)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Canlyniad Dilysu Banc', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Enw deilydd y cyfrif', accountNumber: '12345678', accountNumberQ: 'Rhif y cyfrif', sortCode: '112233', sortCodeQ: 'Cod didoli', validated: 'Invalid',
    },
    bankDetailQ: 'Cyfrif banc',
    paymentMethodQ: 'Sut hoffech gael eich talu?',
  },
  accountDetailQ: 'Sut hoffech gael eich talu?',
  inviteKey: '1234567',
  inviteKeyQ: 'Beth yw eich cod gwahoddiad?',
  confirmedAddress: true,
  confirmedAddressQ: "Ydych chi'n byw yn y cyfeiriad rydym wedi anfon eich llythyr gwahoddiad iddo?",
  declaration: true,
  declarationQ: 'Datganiad',
  dobVerification: 'V',
  dobVerificationQ: 'Statws dilysu dyddiad geni',
  claimFromDate: '2018-03-01T00:00:00.000Z',
  claimFromDateQ: 'O ba ddyddiad ydych chi eisiau cael eich Pensiwn y Wladwriaeth?',
  welshIndicator: true,
  altFormatRequiredQ: 'Hoffech chi i ni anfon llythyrau atoch mewn fformat arall?',
  altFormatRequired: false,
};

const formObjectClaimFromDateAfterSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonClaimFromDateAfterSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  claimFromDate: '2018-03-01T00:00:00.000Z',
  claimFromDateQ: 'What date do you want to get your State Pension from?',
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectClaimFromDateSameAsDateFromAfterSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate: claimFromDateSameAsSPA,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonClaimFromDateSameAsDateFromAfterSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const formObjectClaimFromDateNewSPAAfterSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate,
  userDateOfBirthInfo: { newStatePensionDate: 1517529600000, newDobVerification: 'NV' },
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonClaimFromDateNewSPAAfterSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  dobVerification: 'NV',
  dobVerificationQ: 'Updated date of birth verification status',
  claimFromDate: '2018-03-01T00:00:00.000Z',
  claimFromDateQ: 'What date do you want to get your State Pension from?',
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectClaimFromDateSameAsNewSPAAfterSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate: claimFromDateSameAsSPA,
  userDateOfBirthInfo: { newStatePensionDate: 1517443200000, newDobVerification: 'NV' },
  customerDetails: customerDetailsObject,
  inviteKey,
};

const validJsonClaimFromDateSameAsNewSPAAfterSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  dobVerification: 'NV',
  dobVerificationQ: 'Updated date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectClaimFromDateBeforeSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
  isBeforeSpa: true,
};

const validJsonClaimFromDateBeforeSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  claimFromDate: '2018-03-01T00:00:00.000Z',
  claimFromDateQ: 'What date do you want to get your State Pension?',
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectClaimFromDateSameAsDateFromBeforeSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate: claimFromDateSameAsSPA,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
  isBeforeSpa: true,
};

const validJsonClaimFromDateSameAsDateFromBeforeSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const formObjectClaimFromDateNewSPABeforeSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate,
  userDateOfBirthInfo: { newStatePensionDate: 1517529600000, newDobVerification: 'NV' },
  customerDetails: customerDetailsObject,
  inviteKey,
  isBeforeSpa: true,
};

const validJsonClaimFromDateNewSPABeforeSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  dobVerification: 'NV',
  dobVerificationQ: 'Updated date of birth verification status',
  claimFromDate: '2018-03-01T00:00:00.000Z',
  claimFromDateQ: 'What date do you want to get your State Pension?',
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectClaimFromDateSameAsNewSPABeforeSpa = {
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate: claimFromDateSameAsSPA,
  userDateOfBirthInfo: { newStatePensionDate: 1517443200000, newDobVerification: 'NV' },
  customerDetails: customerDetailsObject,
  inviteKey,
  isBeforeSpa: true,
};

const validJsonClaimFromDateSameAsNewSPABeforeSpa = {
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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
  dobVerification: 'NV',
  dobVerificationQ: 'Updated date of birth verification status',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
  altFormatRequiredQ: 'Would you like us to send letters to you in another format?',
  altFormatRequired: false,
};

const formObjectOverseas = {
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details-overseas': accountOverseasObject,
  userDateOfBirthInfo: {},
  customerDetails: customerDetailsObject,
  inviteKey,
  isBeforeSpa: true,
  isOverseas: true,
};

const validJsonOverseas = {
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  overseasAccountDetail: {
    accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', accountCode: '12345678', accountCodeQ: 'Bank or branch code', result: 'Fail', resultQ: 'Bank Authentication result',
  },
  overseasAccountDetailQ: 'Your account details',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living or receiving post at the address we sent your invitation letter to?',
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

const formObjectLivedAbroadOverseas = {
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details-overseas': accountOverseasObject,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
  isOverseas: true,
};

const validJsonLivedAbroadOverseas = {
  livedPeriodsAbroad: [{ countryQ: 'Country name', country: 'Country 1' }],
  livedPeriodsAbroadQ: 'Where have you lived outside the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: { homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number' },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Single',
  maritalStatusQ: 'What is your current marital status?',
  overseasAccountDetail: {
    accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', accountCode: '12345678', accountCodeQ: 'Bank or branch code', result: 'Fail', resultQ: 'Bank Authentication result',
  },
  overseasAccountDetailQ: 'Your account details',
  inviteKey: '1234567',
  inviteKeyQ: 'What is your invitation code?',
  confirmedAddress: true,
  confirmedAddressQ: 'Are you living or receiving post at the address we sent your invitation letter to?',
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

const formObjectPrison = {
  prison: { spentTimeInPrison: 'yes' },
  'lived-abroad': { livedAbroad: 'no' },
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { homeTelephoneNumber: '1234', workTelephoneNumber: '123', email: 'test@test.com' },
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': dateForm,
  'marital-partner-widowed': martitalDetailsForm,
  'account-details': accountObject,
  claimFromDate: claimFromDateSameAsSPA,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
  inviteKey,
  isBeforeSpa: false,
};

const validJsonPrison = {
  prison: true,
  prisonQ: 'Have you spent any time in prison since 1 February 2018?',
  livedAbroad: false,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  workedAbroad: false,
  workedAbroadQ: 'Have you worked outside of the UK?',
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Home phone number', workTelephoneNumber: '123', workTelephoneNumberQ: 'Work phone number', email: 'test@test.com', emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'What date were you widowed?', aboutYourPartnerQ: 'About your late spouse', firstName: 'first', firstNameQ: 'Their first name', surname: 'last', surnameQ: 'Their surname', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Their date of birth (optional)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code', validated: 'Invalid',
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

const validJsonPrisonWelsh = {
  prison: true,
  prisonQ: 'Ydych chi wedi treulio unrhyw amser yn y carchar ers 1 Chwefror 2018?',
  livedAbroad: false,
  livedAbroadQ: "Ydych chi erioed wedi byw y tu allan i'r Deyrnas Unedig?",
  workedAbroad: false,
  workedAbroadQ: "Ydych chi wedi gweithio y tu allan i'r Deyrnas Unedig?",
  contactDetail: {
    homeTelephoneNumber: '1234', homeTelephoneNumberQ: 'Rhif ffôn cartref', workTelephoneNumber: '123', workTelephoneNumberQ: 'Rhif ffôn gwaith', email: 'test@test.com', emailQ: 'Cyfeiriad e-bost',
  },
  contactDetailQ: 'Sut hoffech i ni gysylltu â chi?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'Beth yw eich statws priodasol presennol?',
  partnerDetail: {
    widowedDate: '1990-01-01T00:00:00.000Z', widowedDateQ: 'Pa ddyddiad gawsoch chi eich gwneud yn weddw?', aboutYourPartnerQ: 'Am eich diweddar briod', firstName: 'first', firstNameQ: 'Eu henw cyntaf', surname: 'last', surnameQ: 'Eu cyfenw', dob: '1990-01-01T00:00:00.000Z', dobQ: 'Eu dyddiad geni (dewisol)',
  },
  accountDetail: {
    bankDetail: {
      result: 'Fail', resultQ: 'Canlyniad Dilysu Banc', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Enw deilydd y cyfrif', accountNumber: '12345678', accountNumberQ: 'Rhif y cyfrif', sortCode: '112233', sortCodeQ: 'Cod didoli', validated: 'Invalid',
    },
    bankDetailQ: 'Cyfrif banc',
    paymentMethodQ: 'Sut hoffech gael eich talu?',
  },
  accountDetailQ: 'Sut hoffech gael eich talu?',
  inviteKey: '1234567',
  inviteKeyQ: 'Beth yw eich cod gwahoddiad?',
  confirmedAddress: true,
  confirmedAddressQ: "Ydych chi'n byw yn y cyfeiriad rydym wedi anfon eich llythyr gwahoddiad iddo?",
  declaration: true,
  declarationQ: 'Datganiad',
  dobVerification: 'V',
  dobVerificationQ: 'Statws dilysu dyddiad geni',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: true,
  altFormatRequiredQ: 'Hoffech chi i ni anfon llythyrau atoch mewn fformat arall?',
  altFormatRequired: false,
};

const accountStatus = { result: 'Fail' };
const accountStatusOverseas = { result: 'Fail' };

const englishLangauge = 'en-GB';
const welshLangauge = 'cy-GB';

describe('Claim object ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe(' convertor ', () => {
    it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes', async () => {
      const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroad, accountStatus);
      assert.deepEqual(claimObjectValue, validJsonLivedAbroad);
    });

    it('should convert object to valid json with livedAbroad value set as false when lived abroad is no', async () => {
      const claimObjectValue = await claimObject.sessionToObject(formObjectNotLivedAbroadMarried, accountStatus);
      assert.deepEqual(claimObjectValue, validJsonNotLivedAbroadMarried);
    });

    it('should convert object to valid json without roll number when roll number is empty', async () => {
      const claimObjectValue = await claimObject.sessionToObject(formObjectNoLivedWorkAbroadSingleBuildingNoRollNumber, accountStatus);
      assert.deepEqual(claimObjectValue, validJsonNoLivedWorkAbroadSingleBuildingNoRollNumber);
    });

    describe(' parter status ', () => {
      it('should convert with civil status', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectCivil, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonCivil);
      });
      it('should convert with widowed status (no date)', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWidowed, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonWidowed);
      });
      it('should convert with divorced status', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectDivorced, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonDivorced);
      });
      it('should convert with dissolved status ', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectDissolved, accountStatus);
        assert.deepEqual(claimObjectValue, validJsonDissolved);
      });
    });

    describe(' welsh indicator ', () => {
      it('should convert welsh indicator into true when langauge is cy-GB', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWelshIndicator, accountStatus, welshLangauge);
        assert.deepEqual(claimObjectValue, validJsonWelsh);
      });

      it('should convert welsh indicator into false when langauge is en-GB', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWelshIndicator, accountStatus, englishLangauge);
        assert.deepEqual(claimObjectValue, validJsonEnglish);
      });

      it('should convert welsh indicator into false when langauge is undefined', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectWelshIndicator, accountStatus, undefined);
        assert.deepEqual(claimObjectValue, validJsonEnglish);
      });
    });

    describe(' claim from date ', () => {
      describe(' after SPA ', () => {
        it('should add claim from date to object when not the same as SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateAfterSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateAfterSpa);
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateSameAsDateFromAfterSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateSameAsDateFromAfterSpa);
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object when not the same as new SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateNewSPAAfterSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateNewSPAAfterSpa);
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as new SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateSameAsNewSPAAfterSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateSameAsNewSPAAfterSpa);
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });
      });

      describe(' before SPA ', () => {
        it('should add claim from date to object when not the same as SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateBeforeSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateBeforeSpa);
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateSameAsDateFromBeforeSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateSameAsDateFromBeforeSpa);
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object when not the same as new SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateNewSPABeforeSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateNewSPABeforeSpa);
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as new SPA', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectClaimFromDateSameAsNewSPABeforeSpa, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonClaimFromDateSameAsNewSPABeforeSpa);
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });
      });
    });

    describe(' overseas', () => {
      it('should return overseas object with overseas questions when customer is overseas', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectOverseas, accountStatusOverseas, englishLangauge);
        assert.deepEqual(claimObjectValue, validJsonOverseas);
      });

      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectLivedAbroadOverseas, accountStatusOverseas);
        assert.deepEqual(claimObjectValue, validJsonLivedAbroadOverseas);
      });
    });

    describe('prison', () => {
      describe('english', () => {
        it('should return object with prison question when prison is yes', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectPrison, accountStatus, englishLangauge);
          assert.deepEqual(claimObjectValue, validJsonPrison);
        });

        it('should object to valid json with prison question when prison is no', async () => {
          const details = { ...JSON.parse(JSON.stringify(formObjectPrison)), prison: { spentTimeInPrison: 'no' } };
          const json = { ...JSON.parse(JSON.stringify(validJsonPrison)), prison: false };
          const claimObjectValue = await claimObject.sessionToObject(details, accountStatus);
          assert.deepEqual(claimObjectValue, json);
        });
      });
      describe('welsh', () => {
        it('should return object with prison question when prison is yes', async () => {
          const claimObjectValue = await claimObject.sessionToObject(formObjectPrison, accountStatus, welshLangauge);
          assert.deepEqual(claimObjectValue, validJsonPrisonWelsh);
        });

        it('should object to valid json with prison question when prison is no', async () => {
          const details = { ...JSON.parse(JSON.stringify(formObjectPrison)), prison: { spentTimeInPrison: 'no' } };
          const json = { ...JSON.parse(JSON.stringify(validJsonPrisonWelsh)), prison: false };
          const claimObjectValue = await claimObject.sessionToObject(details, accountStatus, welshLangauge);
          assert.deepEqual(claimObjectValue, json);
        });
      });
    });

    describe('alt-formats', () => {
      describe('english', () => {
        it('should return valid JSON object with alt-formats question/answer', async () => {
          const details = {
            ...JSON.parse(JSON.stringify(formObjectNotLivedAbroadMarried)),
            'alt-formats': 'no',
          };
          const claimObjectValue = await claimObject.sessionToObject(details, accountStatus, englishLangauge);
          assert.equal(claimObjectValue.altFormatRequired, false);
          assert.equal(claimObjectValue.altFormatRequiredQ, 'Would you like us to send letters to you in another format?');
        });

        it('should return valid JSON object with alt-formats/alt-formats-choose question/answers', async () => {
          const details = {
            ...JSON.parse(JSON.stringify(formObjectNotLivedAbroadMarried)),
            'alt-formats': 'yes',
            'alt-formats-choose': 'braille',
          };
          const claimObjectValue = await claimObject.sessionToObject(details, accountStatus, englishLangauge);
          assert.equal(claimObjectValue.altFormatRequired, true);
          assert.equal(claimObjectValue.altFormatRequiredQ, 'Would you like us to send letters to you in another format?');
          assert.equal(claimObjectValue.altFormatToUse, 'Braille');
          assert.equal(claimObjectValue.altFormatToUseQ, 'How else would you like us to send letters to you?');
        });
      });

      describe('welsh', () => {
        it('should return valid JSON object with alt-formats question/answer in welsh', async () => {
          const details = {
            ...JSON.parse(JSON.stringify(formObjectNotLivedAbroadMarried)),
            'alt-formats': 'no',
          };
          const claimObjectValue = await claimObject.sessionToObject(details, accountStatus, welshLangauge);
          assert.equal(claimObjectValue.altFormatRequired, false);
          assert.equal(claimObjectValue.altFormatRequiredQ, 'Hoffech chi i ni anfon llythyrau atoch mewn fformat arall?');
        });

        it('should return valid JSON object with alt-formats/alt-formats-choose questions in Welsh but answers in English', async () => {
          const details = {
            ...JSON.parse(JSON.stringify(formObjectNotLivedAbroadMarried)),
            'alt-formats': 'yes',
            'alt-formats-choose': 'audioCassette',
          };
          const claimObjectValue = await claimObject.sessionToObject(details, accountStatus, welshLangauge);
          assert.equal(claimObjectValue.altFormatRequired, true);
          assert.equal(claimObjectValue.altFormatRequiredQ, 'Hoffech chi i ni anfon llythyrau atoch mewn fformat arall?');
          assert.equal(claimObjectValue.altFormatToUse, 'Audio cassette');
          assert.equal(claimObjectValue.altFormatToUseQ, 'Sut arall yr hoffech i ni anfon llythyrau atoch chi?');
        });
      });
    });
  });

  describe(' maritalStatusTransformer ', () => {
    it('should return Single when single is passed ', async () => {
      const status = await claimObject.maritalStatusTransformer('single');
      assert.equal(status, 'Single');
    });

    it('should return Civil Partnership when civil is passed ', async () => {
      const status = await claimObject.maritalStatusTransformer('civil');
      assert.equal(status, 'Civil Partnership');
    });

    it('should return Widowed when windowed is passed ', async () => {
      const status = await claimObject.maritalStatusTransformer('widowed');
      assert.equal(status, 'Widowed');
    });

    it('should return Married when married is passed ', async () => {
      const status = await claimObject.maritalStatusTransformer('married');
      assert.equal(status, 'Married');
    });

    it('should return Dissolved when dissolved is passed ', async () => {
      const status = await claimObject.maritalStatusTransformer('dissolved');
      assert.equal(status, 'Dissolved');
    });

    it('should return undefined when nothing is passed ', async () => {
      const status = await claimObject.maritalStatusTransformer('');
      assert.equal(status, undefined);
    });
  });

  describe(' maritalStatusDate ', () => {
    it('should return undefined when single is supplied', async () => {
      const date = await claimObject.maritalStatusDate('single', {});
      assert.equal(date, undefined);
    });

    it('should return matching civilPartnershipDate when civil is supplied with date', async () => {
      const date = await claimObject.maritalStatusDate('civil', dateForm);
      assert.equal(date.civilPartnershipDate, validDateJson);
    });

    it('should return matching dissolvedDate when dissolved is supplied with date', async () => {
      const date = await claimObject.maritalStatusDate('dissolved', dateForm);
      assert.equal(date.dissolvedDate, validDateJson);
    });

    it('should return matching marriageDate when marriage is supplied with date', async () => {
      const date = await claimObject.maritalStatusDate('married', dateForm);
      assert.equal(date.marriageDate, validDateJson);
    });

    it('should return matching widowedDate when widowed is supplied with date', async () => {
      const date = await claimObject.maritalStatusDate('widowed', dateForm);
      assert.equal(date.widowedDate, validDateJson);
    });

    it('should return matching divorcedDate when divorced is supplied with date', async () => {
      const date = await claimObject.maritalStatusDate('divorced', dateForm);
      assert.equal(date.divorcedDate, validDateJson);
    });
    it('should return matching divorcedDate when divorced is supplied with date with single digit month', async () => {
      const date = await claimObject.maritalStatusDate('divorced', dateSingleMonth);
      assert.equal(date.divorcedDate, validDateJson);
    });
  });
});
