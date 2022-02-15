const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const claimObject = require('../../../../../lib/objects/claimObject');

const accountObjectValid = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233',
};

const livedAbroadOneCountries = {
  'country-name[0]': 'Country 1', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};

const inviteKey = '1234567';

const formObjectValidBank = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': livedAbroadOneCountries,
  'worked-abroad': { workedAbroad: 'no' },
  'contact-details': { preferredTelephoneNumber: '1234', additionalTelephoneNumber: '', email: '' },
  'marital-select': { maritalStatus: 'single' },
  'account-details': accountObjectValid,
  userDateOfBirthInfo: { dobVerification: 'NV' },
  customerDetails: { dobVerification: 'NV' },
  'dob-details': { dateYear: '2000', dateMonth: '09', dateDay: '09' },
  inviteKey,
};

const accountStatus = { result: 'Fail' };

describe('Claim object ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe(' dob-details ', () => {
    it('should give userAssertedDob when dob-details is set', async () => {
      const claimObjectValue = await claimObject.sessionToObject(formObjectValidBank, accountStatus);
      assert.equal(claimObjectValue.userAssertedDob, '2000-09-09T00:00:00.000Z');
      assert.equal(claimObjectValue.userAssertedDobQ, 'User entered date of birth');
      assert.equal(claimObjectValue.dobVerification, 'NV');
      assert.equal(claimObjectValue.dobVerificationQ, 'Date of birth verification status');
      assert.equal(claimObjectValue.reculatedStatePensionDate, undefined);
    });

    it('should give userAssertedDob when dob-details is set and verficiation status if set', async () => {
      formObjectValidBank.userDateOfBirthInfo.newDobVerification = 'V';
      const claimObjectValue = await claimObject.sessionToObject(formObjectValidBank, accountStatus);
      assert.equal(claimObjectValue.userAssertedDob, '2000-09-09T00:00:00.000Z');
      assert.equal(claimObjectValue.userAssertedDobQ, 'User entered date of birth');
      assert.equal(claimObjectValue.dobVerification, 'V');
      assert.equal(claimObjectValue.dobVerificationQ, 'Updated date of birth verification status');
      assert.equal(claimObjectValue.reculatedStatePensionDate, undefined);
    });

    it('should give userAssertedDob when dob-details is set and reculatedStatePensionDate status if set and use old status', async () => {
      delete formObjectValidBank.userDateOfBirthInfo.newDobVerification;
      formObjectValidBank.userDateOfBirthInfo.newStatePensionDate = '102838383838';
      const claimObjectValue = await claimObject.sessionToObject(formObjectValidBank, accountStatus);
      assert.equal(claimObjectValue.userAssertedDob, '2000-09-09T00:00:00.000Z');
      assert.equal(claimObjectValue.userAssertedDobQ, 'User entered date of birth');
      assert.equal(claimObjectValue.dobVerification, 'NV');
      assert.equal(claimObjectValue.dobVerificationQ, 'Date of birth verification status');
      assert.equal(claimObjectValue.reCalculatedSpaDate, '102838383838');
      assert.equal(claimObjectValue.reCalculatedSpaDateQ, 'Recalculated State Pension age date');
    });
  });
});
