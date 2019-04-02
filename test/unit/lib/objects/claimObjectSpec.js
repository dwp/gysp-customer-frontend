const assert = require('assert');

const claimObject = require('../../../../lib/objects/claimObject');

const dateForm = { dateDay: '01', dateMonth: '01', dateYear: '1990' };
const validDateJson = '1990-01-01T00:00:00.000Z';

const claimFromDate = { dateDay: '01', dateMonth: '03', dateYear: '2018' };
const validClaimFromDateJson = '2018-03-01T00:00:00.000Z';

const claimFromDateSameAsSPA = { dateDay: '01', dateMonth: '02', dateYear: '2018' };

const expectedInviteKeyQ = 'auth:fields.inviteKey.label';
const expectedConfirmedAdddressQ = 'auth:fields.address.legend';
const expectedLivedAbroadQ = 'lived-abroad:header';
const expectedPeriodAbroadsQ = 'countries:lived.header';
const expectedWorkedAbroadQ = 'worked-abroad:header';
const expectedMaritalStatusQ = 'marital-select:header';
const expectedContactDetailQ = 'contact:header';
const expectedHomeTelephoneNumberQ = 'contact:fields.homeTelephoneNumber.label';
const expectedWorkTelephoneNumberQ = 'contact:fields.workTelephoneNumber.label';
const expectedEmailQ = 'contact:fields.email.label';
const expectedAccountDetailQ = 'account:header';
const expectedPaymentMethodQ = 'account:fields.paymentMethod.fieldset';
const expectedBankDetailQ = 'account:fields.paymentMethod.options.bank';
const expectedBankAccountHolderQ = 'account:fields.accountHolder.label';
const expectedBankAccountNumberQ = 'account:fields.accountNumber.label';
const expectedBankSortCodeQ = 'account:fields.sortCode.label';
const expectedBuildingSocietyDetailQ = 'account:fields.paymentMethod.options.building';
const expectedBuildingSocietyAccountHolderQ = expectedBankAccountHolderQ;
const expectedBuildingSocietyAccounNumberQ = expectedBankAccountNumberQ;
const expectedBuildingSocietySortCodeQ = expectedBankSortCodeQ;
const expectedBuildingReferenceNumberQ = 'account:fields.buildingRoll.label';
const expectedPartnerDateCivilQ = 'marital-date:header.civil';
const expectedPartnerDateDissolvedQ = 'marital-date:header.dissolved';
const expectedPartnerDateDivorcedQ = 'marital-date:header.divorced';
const expectedPartnerDateMarriedQ = 'marital-date:header.married';
const expectedPartnerDateWidowedQ = 'marital-date:header.widowed';
const expectedPartnerDetailCivilQ = 'marital-details:header.civil';
const expectedPartnerDetailDissolvedQ = 'marital-details:header.dissolved';
const expectedPartnerDetailDivorcedQ = 'marital-details:header.divorced';
const expectedPartnerDetailMarriedQ = 'marital-details:header.married';
const expectedPartnerDetailWidowedQ = 'marital-details:header.widowed';
const expectedPartnerFirstNameQ = 'marital-details:fields.firstName.label';
const expectedPartnerSurnameQ = 'marital-details:fields.surname.label';
const expectedPartnerOtherNameQ = 'marital-details:fields.otherName.label';
const expectedPartnerDobQ = 'marital-details:fields.dob.legend';
const expectedClaimFromDateAfterSpa = 'pension-start-date:afterSpa.fields.claimFromDate.legend';
const expectedClaimFromDateBeforeSpa = 'pension-start-date:beforeSpa.fields.claimFromDate.legend';
const expectedDeclarationQ = 'declaration:header';
const resultQ = 'account:fields.result';
const resultOverseaQ = 'account-overseas:fields.result';

const expectedConfirmedAdddressOverseasQ = 'auth:fields.address-overseas.legend';
const expectedPeriodAbroadsOverseasQ = 'countries:lived.header-overseas';
const expectedAccountHolderOverseasQ = 'account-overseas:fields.accountHolder.label';
const expectedAccountNumberOverseasQ = 'account-overseas:fields.accountNumber.label';
const expectedAccountCodeOverseasQ = 'account-overseas:fields.accountCode.label';
const expectedAccountDetailOverseasQ = 'account-overseas:header';

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
    validated: 'Invalid',
  },
  bankDetailQ: expectedBankDetailQ,
  paymentMethodQ: expectedPaymentMethodQ,
};

const accountDetailsOverseasJson = {
  accountHolder: 'Mr Joe Bloggs',
  accountHolderQ: expectedAccountHolderOverseasQ,
  accountNumber: '12345678',
  accountNumberQ: expectedAccountNumberOverseasQ,
  accountCode: '12345678',
  accountCodeQ: expectedAccountCodeOverseasQ,
  result: 'Fail',
  resultQ: resultOverseaQ,
};

const livedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const livedAbroadOneCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }];
const accountDetailsBuildingJson = {
  buildingSocietyDetail: {
    result: 'Fail',
    resultQ,
    accountHolder: 'Mr Joe Bloggs',
    accountHolderQ: expectedBuildingSocietyAccountHolderQ,
    accountNumber: '12345678',
    accountNumberQ: expectedBuildingSocietyAccounNumberQ,
    referenceNumber: '12',
    referenceNumberQ: expectedBuildingReferenceNumberQ,
    sortCode: '112233',
    sortCodeQ: expectedBuildingSocietySortCodeQ,
  },
  buildingSocietyDetailQ: expectedBuildingSocietyDetailQ,
  paymentMethodQ: expectedPaymentMethodQ,
};

const accountDetailsBuildingNoRollJson = {
  buildingSocietyDetail: {
    result: 'Fail',
    resultQ,
    accountHolder: 'Mr Joe Bloggs',
    accountHolderQ: expectedBuildingSocietyAccountHolderQ,
    accountNumber: '12345678',
    accountNumberQ: expectedBuildingSocietyAccounNumberQ,
    sortCode: '112233',
    sortCodeQ: expectedBuildingSocietySortCodeQ,
  },
  buildingSocietyDetailQ: expectedBuildingSocietyDetailQ,
  paymentMethodQ: expectedPaymentMethodQ,
};

const inviteKey = '1234567';

const validJsonLivedAbroad = {
  livedAbroad: true,
  livedAbroadQ: expectedLivedAbroadQ,
  livedPeriodsAbroad: livedAbroadOneCountriesJson,
  livedPeriodsAbroadQ: expectedPeriodAbroadsQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  accountDetail: accountDetailsBuildingNoRollJson,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Married',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    marriageDate: validDateJson,
    marriageDateQ: expectedPartnerDateMarriedQ,
    aboutYourPartnerQ: expectedPartnerDetailMarriedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Civil Partnership',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    civilPartnershipDate: validDateJson,
    civilPartnershipDateQ: expectedPartnerDateCivilQ,
    aboutYourPartnerQ: expectedPartnerDetailCivilQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
  accountDetail: accountDetailsBuildingJson,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Divorced',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    divorcedDate: validDateJson,
    divorcedDateQ: expectedPartnerDateDivorcedQ,
    aboutYourPartnerQ: expectedPartnerDetailDivorcedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    allOtherNames: 'Other',
    allOtherNamesQ: expectedPartnerOtherNameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Dissolved',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    dissolvedDate: validDateJson,
    dissolvedDateQ: expectedPartnerDateDissolvedQ,
    aboutYourPartnerQ: expectedPartnerDetailDissolvedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  claimFromDate: validClaimFromDateJson,
  claimFromDateQ: expectedClaimFromDateAfterSpa,
  welshIndicator: false,
};

const validJsonWelsh = {
  livedAbroad: false,
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  claimFromDate: validClaimFromDateJson,
  claimFromDateQ: expectedClaimFromDateAfterSpa,
  welshIndicator: true,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  claimFromDate: validClaimFromDateJson,
  claimFromDateQ: expectedClaimFromDateAfterSpa,
  welshIndicator: false,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'NV',
  dobVerificationQ: 'app:pdf.userVerficationStatus',
  claimFromDate: validClaimFromDateJson,
  claimFromDateQ: expectedClaimFromDateAfterSpa,
  welshIndicator: false,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'NV',
  dobVerificationQ: 'app:pdf.userVerficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  claimFromDate: validClaimFromDateJson,
  claimFromDateQ: expectedClaimFromDateBeforeSpa,
  welshIndicator: false,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'NV',
  dobVerificationQ: 'app:pdf.userVerficationStatus',
  claimFromDate: validClaimFromDateJson,
  claimFromDateQ: expectedClaimFromDateBeforeSpa,
  welshIndicator: false,
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
  livedAbroadQ: expectedLivedAbroadQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
  accountDetail: accountDetailsBankJson,
  accountDetailQ: expectedAccountDetailQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'NV',
  dobVerificationQ: 'app:pdf.userVerficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
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
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
    workTelephoneNumber: '123',
    workTelephoneNumberQ: expectedWorkTelephoneNumberQ,
    email: 'test@test.com',
    emailQ: expectedEmailQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Widowed',
  maritalStatusQ: expectedMaritalStatusQ,
  partnerDetail: {
    widowedDate: validDateJson,
    widowedDateQ: expectedPartnerDateWidowedQ,
    aboutYourPartnerQ: expectedPartnerDetailWidowedQ,
    firstName: 'first',
    firstNameQ: expectedPartnerFirstNameQ,
    surname: 'last',
    surnameQ: expectedPartnerSurnameQ,
    dob: validDateJson,
    dobQ: expectedPartnerDobQ,
  },
  overseasAccountDetail: accountDetailsOverseasJson,
  overseasAccountDetailQ: expectedAccountDetailOverseasQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressOverseasQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
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
  livedPeriodsAbroad: livedAbroadOneCountriesJson,
  livedPeriodsAbroadQ: expectedPeriodAbroadsOverseasQ,
  workedAbroad: false,
  workedAbroadQ: expectedWorkedAbroadQ,
  contactDetail: {
    homeTelephoneNumber: '1234',
    homeTelephoneNumberQ: expectedHomeTelephoneNumberQ,
  },
  contactDetailQ: expectedContactDetailQ,
  maritalStatus: 'Single',
  maritalStatusQ: expectedMaritalStatusQ,
  overseasAccountDetail: accountDetailsOverseasJson,
  overseasAccountDetailQ: expectedAccountDetailOverseasQ,
  inviteKey,
  inviteKeyQ: expectedInviteKeyQ,
  confirmedAddress: true,
  confirmedAddressQ: expectedConfirmedAdddressOverseasQ,
  declaration: true,
  declarationQ: expectedDeclarationQ,
  dobVerification: 'V',
  dobVerificationQ: 'app:pdf.verficationStatus',
  claimFromDate: null,
  claimFromDateQ: null,
  welshIndicator: false,
};

const accountStatus = { result: 'Fail' };
const accountStatusOverseas = { result: 'Fail' };

const englishLangauge = 'en-GB';
const welshLangauge = 'cy-GB';

describe('Claim object ', () => {
  describe(' convertor ', () => {
    it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes', () => {
      const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroad, accountStatus);
      assert.equal(JSON.stringify(validJsonLivedAbroad), JSON.stringify(claimObjectValue));
    });

    it('should convert object to valid json with livedAbroad value set as false when lived abroad is no', () => {
      const claimObjectValue = claimObject.sessionToObject(formObjectNotLivedAbroadMarried, accountStatus);
      assert.equal(JSON.stringify(validJsonNotLivedAbroadMarried), JSON.stringify(claimObjectValue));
    });

    it('should convert object to valid json without roll number when roll number is empty', () => {
      const claimObjectValue = claimObject.sessionToObject(formObjectNoLivedWorkAbroadSingleBuildingNoRollNumber, accountStatus);
      assert.equal(JSON.stringify(validJsonNoLivedWorkAbroadSingleBuildingNoRollNumber), JSON.stringify(claimObjectValue));
    });

    describe(' parter status ', () => {
      it('should convert with civil status', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectCivil, accountStatus);
        assert.equal(JSON.stringify(validJsonCivil), JSON.stringify(claimObjectValue));
      });
      it('should convert with widowed status (no date)', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWidowed, accountStatus);
        assert.equal(JSON.stringify(validJsonWidowed), JSON.stringify(claimObjectValue));
      });
      it('should convert with divorced status', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectDivorced, accountStatus);
        assert.equal(JSON.stringify(validJsonDivorced), JSON.stringify(claimObjectValue));
      });
      it('should convert with dissloved status ', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectDissolved, accountStatus);
        assert.equal(JSON.stringify(validJsonDissolved), JSON.stringify(claimObjectValue));
      });
    });

    describe(' welsh indicator ', () => {
      it('should convert welsh indicator into true when langauge is cy-GB', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWelshIndicator, accountStatus, welshLangauge);
        assert.equal(JSON.stringify(validJsonWelsh), JSON.stringify(claimObjectValue));
      });

      it('should convert welsh indicator into false when langauge is en-GB', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWelshIndicator, accountStatus, englishLangauge);
        assert.equal(JSON.stringify(validJsonEnglish), JSON.stringify(claimObjectValue));
      });

      it('should convert welsh indicator into false when langauge is undefined', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectWelshIndicator, accountStatus, undefined);
        assert.equal(JSON.stringify(validJsonEnglish), JSON.stringify(claimObjectValue));
      });
    });

    describe(' claim from date ', () => {
      describe(' after SPA ', () => {
        it('should add claim from date to object when not the same as SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateAfterSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateAfterSpa), JSON.stringify(claimObjectValue));
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateSameAsDateFromAfterSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateSameAsDateFromAfterSpa), JSON.stringify(claimObjectValue));
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object when not the same as new SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateNewSPAAfterSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateNewSPAAfterSpa), JSON.stringify(claimObjectValue));
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as new SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateSameAsNewSPAAfterSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateSameAsNewSPAAfterSpa), JSON.stringify(claimObjectValue));
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });
      });

      describe(' before SPA ', () => {
        it('should add claim from date to object when not the same as SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateBeforeSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateBeforeSpa), JSON.stringify(claimObjectValue));
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateSameAsDateFromBeforeSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateSameAsDateFromBeforeSpa), JSON.stringify(claimObjectValue));
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object when not the same as new SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateNewSPABeforeSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateNewSPABeforeSpa), JSON.stringify(claimObjectValue));
          assert.notEqual(claimObjectValue.claimFromDate, null);
          assert.notEqual(claimObjectValue.claimFromDateQ, null);
        });

        it('should add claim from date to object as null when the same as new SPA', () => {
          const claimObjectValue = claimObject.sessionToObject(formObjectClaimFromDateSameAsNewSPABeforeSpa, accountStatus, englishLangauge);
          assert.equal(JSON.stringify(validJsonClaimFromDateSameAsNewSPABeforeSpa), JSON.stringify(claimObjectValue));
          assert.equal(claimObjectValue.claimFromDate, null);
          assert.equal(claimObjectValue.claimFromDateQ, null);
        });
      });
    });

    describe(' overseas', () => {
      it('should return overseas object with overseas questions when customer is overseas', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectOverseas, accountStatusOverseas, englishLangauge);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonOverseas));
      });

      it('should convert object to valid json with livedAbroad value set as true when lived abroad is yes', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectLivedAbroadOverseas, accountStatusOverseas);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validJsonLivedAbroadOverseas));
      });
    });
  });

  describe(' maritalStatusTransformer ', () => {
    it('should return Single when single is passed ', () => {
      const status = claimObject.maritalStatusTransformer('single');
      assert.equal(status, 'Single');
    });
    it('should return Civil Partnership when civil is passed ', () => {
      const status = claimObject.maritalStatusTransformer('civil');
      assert.equal(status, 'Civil Partnership');
    });
    it('should return Widowed when windowed is passed ', () => {
      const status = claimObject.maritalStatusTransformer('widowed');
      assert.equal(status, 'Widowed');
    });
    it('should return Married when married is passed ', () => {
      const status = claimObject.maritalStatusTransformer('married');
      assert.equal(status, 'Married');
    });
    it('should return Dissolved when dissolved is passed ', () => {
      const status = claimObject.maritalStatusTransformer('dissolved');
      assert.equal(status, 'Dissolved');
    });
    it('should return undefined when nothing is passed ', () => {
      const status = claimObject.maritalStatusTransformer('');
      assert.equal(status, undefined);
    });
  });

  describe(' maritalStatusDate ', () => {
    it('should return undefined when single is supplied', () => {
      const date = claimObject.maritalStatusDate('single', {});
      assert.equal(date, undefined);
    });

    it('should return matching civilPartnershipDate when civil is supplied with date', () => {
      const date = claimObject.maritalStatusDate('civil', dateForm);
      assert.equal(date.civilPartnershipDate, validDateJson);
    });

    it('should return matching dissolvedDate when dissolved is supplied with date', () => {
      const date = claimObject.maritalStatusDate('dissolved', dateForm);
      assert.equal(date.dissolvedDate, validDateJson);
    });

    it('should return matching marriageDate when marriage is supplied with date', () => {
      const date = claimObject.maritalStatusDate('married', dateForm);
      assert.equal(date.marriageDate, validDateJson);
    });

    it('should return matching widowedDate when widowed is supplied with date', () => {
      const date = claimObject.maritalStatusDate('widowed', dateForm);
      assert.equal(date.widowedDate, validDateJson);
    });
    it('should return matching divorcedDate when divorced is supplied with date', () => {
      const date = claimObject.maritalStatusDate('divorced', dateForm);
      assert.equal(date.divorcedDate, validDateJson);
    });
  });
});
