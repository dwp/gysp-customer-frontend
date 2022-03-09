const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const { validator } = require('../../../../../lib/validations/request-invitation/nameValidation');

const longString = 'qwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiowe';

const languages = ['en', 'cy'];

describe('Validation: request invitation name', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  it('should return no errors when all fields are complete', () => {
    const errors = validator({ firstName: 'Derek', lastName: 'Trotter' });
    assert.lengthOf(Object.keys(errors), 0);
  });

  describe('firstName', () => {
    it('should return no errors when firstName is valid', () => {
      const errors = validator({ firstName: 'Derek' });
      assert.isUndefined(errors.firstName);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.firstName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.firstName.text, message('request-invitation-name:fields.firstName.errors.required'));
        });

        it('should return error when firstName is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.firstName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.firstName.text, message('request-invitation-name:fields.firstName.errors.required'));
        });

        it('should return error when firstName is empty', () => {
          const errors = validator({ firstName: '' }, lang);
          assert.equal(errors.firstName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.firstName.text, message('request-invitation-name:fields.firstName.errors.required'));
        });

        it('should return error when firstName is invalid', () => {
          const errors = validator({ firstName: 'Derek@' }, lang);
          assert.equal(errors.firstName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.firstName.text, message('request-invitation-name:fields.firstName.errors.format'));
        });

        it('should return error when firstName is greater than 70 characters', () => {
          const errors = validator({ firstName: longString }, lang);
          assert.equal(errors.firstName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.firstName.text, message('request-invitation-name:fields.firstName.errors.length'));
        });
      });
    });
  });

  describe('lastName', () => {
    it('should return no errors when lastName is valid', () => {
      const errors = validator({ lastName: 'Derek' });
      assert.isUndefined(errors.lastName);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.lastName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.lastName.text, message('request-invitation-name:fields.lastName.errors.required'));
        });

        it('should return error when lastName is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.lastName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.lastName.text, message('request-invitation-name:fields.lastName.errors.required'));
        });

        it('should return error when lastName is empty', () => {
          const errors = validator({ lastName: '' }, lang);
          assert.equal(errors.lastName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.lastName.text, message('request-invitation-name:fields.lastName.errors.required'));
        });

        it('should return error when lastName is invalid', () => {
          const errors = validator({ lastName: 'Derek@' }, lang);
          assert.equal(errors.lastName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.lastName.text, message('request-invitation-name:fields.lastName.errors.format'));
        });

        it('should return error when lastName is greater than 70 characters', () => {
          const errors = validator({ lastName: longString }, lang);
          assert.equal(errors.lastName.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.lastName.text, message('request-invitation-name:fields.lastName.errors.length'));
        });
      });
    });
  });
});
