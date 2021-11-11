const { assert } = require('chai');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');
const { validate } = require('../../../../lib/validations/altFormats.js');

const lang = 'cy';

describe('Alt format question validator', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('when user has not selected yes or no', () => {
    it('should return an error', () => {
      const selection = undefined;
      const expectedErrorObj = {
        text: 'Dewiswch ie os hoffech i ni anfon llythyrau atoch mewn fformat arall',
        href: '#altFormat-Yes',
      };
      const { errorSummary, fieldLevelErrors } = validate(selection, lang);
      assert.equal(errorSummary.length, 1);
      assert.deepEqual(errorSummary[0], expectedErrorObj);
      assert.deepEqual(fieldLevelErrors.altFormat, expectedErrorObj);
    });
  });

  describe('when user has selected "yes"', () => {
    it('should return empty errorSummary', () => {
      const selection = 'yes';
      const { errorSummary, fieldLevelErrors } = validate(selection, lang);
      assert.equal(errorSummary.length, 0);
      assert.deepEqual(fieldLevelErrors.altFormat, undefined);
    });
  });

  describe('when user has selected "no"', () => {
    it('should return empty errorSummary', () => {
      const selection = 'no';
      const { errorSummary, fieldLevelErrors } = validate(selection, lang);
      assert.equal(errorSummary.length, 0);
      assert.deepEqual(fieldLevelErrors.altFormat, undefined);
    });
  });
});
