const { assert } = require('chai');

const bank = require('../../../../lib/helpers/bankVerificationStatus.js');

describe('Bank Validation helper ', () => {
  describe('status  ', () => {
    it('featureNotUsed should return Disabled', () => {
      const status = bank.featureNotUsed();
      assert.equal(status, 'Disabled');
    });

    it('errorReturned should return Unknown', () => {
      const status = bank.errorReturned();
      assert.equal(status, 'Unavailable');
    });

    it('featureNotChecked should return Unknown', () => {
      const status = bank.featureNotChecked();
      assert.equal(status, 'Not checked - Building Society');
    });
  });
});
