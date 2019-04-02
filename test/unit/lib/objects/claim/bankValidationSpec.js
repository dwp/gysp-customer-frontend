const assert = require('assert');

const claimObject = require('../../../../../lib/objects/claimObject');

const expectedInviteKeyQ = 'auth:fields.inviteKey.label';
const expectedConfirmedAdddressQ = 'auth:fields.address.legend';
const expectedLivedAbroadQ = 'lived-abroad:header';
const expectedPeriodAbroadsQ = 'countries:lived.header';
const expectedWorkedAbroadQ = 'worked-abroad:header';
const expectedMaritalStatusQ = 'marital-select:header';
const expectedContactDetailQ = 'contact:header';
const expectedMobileTelephoneNumberQ = 'contact:fields.mobileTelephoneNumber.label';
const expectedAccountDetailQ = 'account:header';
const expectedPaymentMethodQ = 'account:fields.paymentMethod.fieldset';
const expectedBankDetailQ = 'account:fields.paymentMethod.options.bank';
const expectedBankAccountHolderQ = 'account:fields.accountHolder.label';
const expectedBankAccountNumberQ = 'account:fields.accountNumber.label';
const expectedBankSortCodeQ = 'account:fields.sortCode.label';
const expectedDeclarationQ = 'declaration:header';
const resultQ = 'account:fields.result';
const messagesQ = 'account:fields.messages';

const accountObjectValid = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
};
const accountObjectVerifiedInvalid = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
};
const customerDetailsObject = { dobVerification: 'V' };

const accountDetailsBankJsonValid = {
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

const accountDetailsBankJsonVerifiedInvalid = {
  bankDetail: {
    result: 'Fail',
    resultQ,
    messages: ['Error 1', 'Error 2'],
    messagesQ,
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

const livedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const livedAbroadOneCountriesJson = [{ countryQ: 'countries:fields.country.label', country: 'Country 1' }];

const inviteKey = '1234567';

const validBankJson = {
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
  accountDetail: accountDetailsBankJsonValid,
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

const formObjectValidBank = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObjectValid,
  inviteKey,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
};

const invalidBankJson = {
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
  accountDetail: accountDetailsBankJsonVerifiedInvalid,
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

const formObjectInvalidBank = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { mobileTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObjectVerifiedInvalid,
  inviteKey,
  userDateOfBirthInfo: customerDetailsObject,
  customerDetails: customerDetailsObject,
};

const accountStatus = { result: 'Fail' };
const accountStatusWithErrors = { result: 'Fail', messages: ['Error 1', 'Error 2'] };

describe('Claim object ', () => {
  describe(' convertor ', () => {
    describe(' bank verification ', () => {
      it('should give validated/verfication object as Valid', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectValidBank, accountStatus);
        assert.equal(JSON.stringify(validBankJson), JSON.stringify(claimObjectValue));
      });
      it('should give validated as valid verfication as invalid with errors', () => {
        const claimObjectValue = claimObject.sessionToObject(formObjectInvalidBank, accountStatusWithErrors);
        assert.equal(JSON.stringify(invalidBankJson), JSON.stringify(claimObjectValue));
      });
    });
  });
});
