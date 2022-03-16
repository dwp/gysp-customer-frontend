const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const { validator } = require('../../../../../lib/validations/request-invitation/addressChooseValidation');

const languages = ['en', 'cy'];

describe('Validation: request invitation address choose', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  it('should return no errors when all fields are complete', () => {
    const errors = validator({ uprn: '123456' });
    assert.lengthOf(Object.keys(errors), 0);
  });

  describe('uprn', () => {
    it('should return no errors when uprn is valid', () => {
      const errors = validator({ uprn: '1' });
      assert.isUndefined(errors.uprn);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.uprn.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.uprn.text, message('request-invitation-address-choose:fields.uprn.errors.required'));
        });

        it('should return error when uprn is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.uprn.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.uprn.text, message('request-invitation-address-choose:fields.uprn.errors.required'));
        });

        it('should return error when uprn is empty', () => {
          const errors = validator({ uprn: '' }, lang);
          assert.equal(errors.uprn.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.uprn.text, message('request-invitation-address-choose:fields.uprn.errors.required'));
        });
      });
    });
  });
});
