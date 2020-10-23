const assert = require('assert');
const sessionHelper = require('../../../../lib/helpers/sessionHelper');

describe('Session helper ', () => {
  describe('sessionCount  ', () => {
    it('should return 1 when undefined value is supplied', () => {
      const sessionCount = sessionHelper.sessionCount(undefined);
      assert.equal(sessionCount, 1);
    });

    it('should return 9 when 8 is supplied', () => {
      const sessionCount = sessionHelper.sessionCount(8);
      assert.equal(sessionCount, 9);
    });
  });

  describe('checkAuthAttemptLimits  ', () => {
    it('should return true when 3 (limit) is provided', () => {
      const checkAuthResponse = sessionHelper.checkAuthAttemptLimits(3);
      assert.equal(checkAuthResponse, true);
    });

    it('should return false when 2 (under limit) is supplied', () => {
      const checkAuthResponse = sessionHelper.checkAuthAttemptLimits(2);
      assert.equal(checkAuthResponse, false);
    });
  });
});
