const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const claimObject = require('../../../../../lib/objects/claimObject');

const accountObjectValid = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
};
const accountObjectVerifiedInvalid = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
};
const customerDetailsObject = { dobVerification: 'V' };

const livedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};

const inviteKey = '1234567';

const validBankJson = {
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
      result: 'Fail', resultQ: 'Bank Authentication result', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code',
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
      result: 'Fail', resultQ: 'Bank Authentication result', messages: ['Error 1', 'Error 2'], messagesQ: 'Warnings', accountHolder: 'Mr Joe Bloggs', accountHolderQ: 'Account holder name', accountNumber: '12345678', accountNumberQ: 'Account number', sortCode: '112233', sortCodeQ: 'Sort code',
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
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe(' convertor ', () => {
    describe(' bank verification ', () => {
      it('should give validated/verfication object as Valid', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectValidBank, accountStatus);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(validBankJson));
      });
      it('should give validated as valid verfication as invalid with errors', async () => {
        const claimObjectValue = await claimObject.sessionToObject(formObjectInvalidBank, accountStatusWithErrors);
        assert.equal(JSON.stringify(claimObjectValue), JSON.stringify(invalidBankJson));
      });
    });
  });
});
