const assert = require('assert');

const claimObject = require('../../../../../lib/objects/claimObject');

const accountObjectValid = {
  paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
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
  describe(' dob-details ', () => {
    it('should give userAssertedDob when dob-details is set', () => {
      const claimObjectValue = claimObject.sessionToObject(formObjectValidBank, accountStatus);
      assert.equal(claimObjectValue.userAssertedDob, '2000-09-09T00:00:00.000Z');
      assert.equal(claimObjectValue.userAssertedDobQ, 'app:pdf.userDOB');
      assert.equal(claimObjectValue.dobVerification, 'NV');
      assert.equal(claimObjectValue.dobVerificationQ, 'app:pdf.verficationStatus');
      assert.equal(claimObjectValue.reculatedStatePensionDate, undefined);
    });
    it('should give userAssertedDob when dob-details is set and verficiation status if set', () => {
      formObjectValidBank.userDateOfBirthInfo.newDobVerification = 'V';
      const claimObjectValue = claimObject.sessionToObject(formObjectValidBank, accountStatus);
      assert.equal(claimObjectValue.userAssertedDob, '2000-09-09T00:00:00.000Z');
      assert.equal(claimObjectValue.userAssertedDobQ, 'app:pdf.userDOB');
      assert.equal(claimObjectValue.dobVerification, 'V');
      assert.equal(claimObjectValue.dobVerificationQ, 'app:pdf.userVerficationStatus');
      assert.equal(claimObjectValue.reculatedStatePensionDate, undefined);
    });
    it('should give userAssertedDob when dob-details is set and reculatedStatePensionDate status if set and use old status', () => {
      delete formObjectValidBank.userDateOfBirthInfo.newDobVerification;
      formObjectValidBank.userDateOfBirthInfo.newStatePensionDate = '102838383838';
      const claimObjectValue = claimObject.sessionToObject(formObjectValidBank, accountStatus);
      assert.equal(claimObjectValue.userAssertedDob, '2000-09-09T00:00:00.000Z');
      assert.equal(claimObjectValue.userAssertedDobQ, 'app:pdf.userDOB');
      assert.equal(claimObjectValue.dobVerification, 'NV');
      assert.equal(claimObjectValue.dobVerificationQ, 'app:pdf.verficationStatus');
      assert.equal(claimObjectValue.reCalculatedSpaDate, '102838383838');
      assert.equal(claimObjectValue.reCalculatedSpaDateQ, 'app:pdf.statePensionAge');
    });
  });
});
