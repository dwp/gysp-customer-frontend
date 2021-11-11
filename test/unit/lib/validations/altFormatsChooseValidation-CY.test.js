const { assert } = require('chai');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');
const { validate, ALLOWED_ALT_FORMATS } = require('../../../../lib/validations/altFormatsChoose.js');

const lang = 'cy';

describe('Alt format question validator', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('when user has not selected any of the available alt formats choices', () => {
    it('should return an error', () => {
      const selection = undefined;
      const expectedErrorObj = {
        text: 'Dewiswch sut yr hoffech i ni anfon llythyrau atoch',
        href: '#audioCassette',
      };
      const { errorSummary, fieldLevelErrors } = validate(selection, lang);
      assert.equal(errorSummary.length, 1);
      assert.deepEqual(errorSummary[0], expectedErrorObj);
      assert.deepEqual(fieldLevelErrors.altFormatsChoice, expectedErrorObj);
    });
  });

  ALLOWED_ALT_FORMATS.forEach((allowedFormat) => {
    describe(`when user has selected ${allowedFormat}`, () => {
      it('should return empty errorSummary', () => {
        const { errorSummary, fieldLevelErrors } = validate(allowedFormat, lang);
        assert.equal(errorSummary.length, 0);
        assert.deepEqual(fieldLevelErrors.altFormatsChoice, undefined);
      });
    });
  });
});
