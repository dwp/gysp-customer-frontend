const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const { validator } = require('../../../../../lib/validations/request-invitation/addressValidation');

const longString = 'qwertyuiopasdfghjklzxcvbnmqwertyuiop';

const languages = ['en', 'cy'];

describe('Validation: request invitation address', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  it('should return no errors when all fields are complete', () => {
    const errors = validator({ nameNumber: '1', postcode: 'NE1 1ET' });
    assert.lengthOf(Object.keys(errors), 0);
  });

  describe('nameNumber', () => {
    it('should return no errors when nameNumber is valid', () => {
      const errors = validator({ nameNumber: '1' });
      assert.isUndefined(errors.nameNumber);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.nameNumber.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.nameNumber.text, message('request-invitation-address:fields.nameNumber.errors.required'));
        });

        it('should return error when nameNumber is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.nameNumber.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.nameNumber.text, message('request-invitation-address:fields.nameNumber.errors.required'));
        });

        it('should return error when nameNumber is empty', () => {
          const errors = validator({ nameNumber: '' }, lang);
          assert.equal(errors.nameNumber.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.nameNumber.text, message('request-invitation-address:fields.nameNumber.errors.required'));
        });

        it('should return error when nameNumber is invalid', () => {
          const errors = validator({ nameNumber: '@@' }, lang);
          assert.equal(errors.nameNumber.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.nameNumber.text, message('request-invitation-address:fields.nameNumber.errors.format'));
        });

        it('should return error when nameNumber is greater than 35 characters', () => {
          const errors = validator({ nameNumber: longString }, lang);
          assert.equal(errors.nameNumber.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.nameNumber.text, message('request-invitation-address:fields.nameNumber.errors.length'));
        });
      });
    });
  });

  describe('postcode', () => {
    it('should return no errors when postcode is valid', () => {
      const errors = validator({ postcode: 'NE1 1ET' });
      assert.isUndefined(errors.postcode);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.postcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.postcode.text, message('request-invitation-address:fields.postcode.errors.required'));
        });

        it('should return error when postcode is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.postcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.postcode.text, message('request-invitation-address:fields.postcode.errors.required'));
        });

        it('should return error when postcode is empty', () => {
          const errors = validator({ postcode: '' }, lang);
          assert.equal(errors.postcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.postcode.text, message('request-invitation-address:fields.postcode.errors.required'));
        });

        it('should return error when postcode is invalid', () => {
          const errors = validator({ postcode: '111111' }, lang);
          assert.equal(errors.postcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.postcode.text, message('request-invitation-address:fields.postcode.errors.format'));
        });
      });
    });
  });
});
