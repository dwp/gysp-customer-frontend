const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const { validator } = require('../../../../../lib/validations/request-invitation/addressManualValidation');

const longString = 'qwertyuiopasdfghjklzxcvbnmqwertyuiop';
const validAddress = {
  addressLine1: '1',
  addressLine2: 'Edward Street',
  addressTown: 'Newcastle',
  addressPostcode: 'NE1 1ET',
};

const languages = ['en', 'cy'];

describe('Validation: request invitation address manual', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  it('should return no errors when all fields are complete', () => {
    const errors = validator(validAddress);
    assert.lengthOf(Object.keys(errors), 0);
  });

  describe('addressLine1', () => {
    it('should return no errors when addressLine1 is valid', () => {
      const errors = validator({ addressLine1: '1' });
      assert.isUndefined(errors.addressLine1);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.addressLine1.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine1.text, message('request-invitation-address-manual:fields.addressLine1.errors.required'));
        });

        it('should return error when addressLine1 is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.addressLine1.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine1.text, message('request-invitation-address-manual:fields.addressLine1.errors.required'));
        });

        it('should return error when addressLine1 is empty', () => {
          const errors = validator({ addressLine1: '' }, lang);
          assert.equal(errors.addressLine1.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine1.text, message('request-invitation-address-manual:fields.addressLine1.errors.required'));
        });

        it('should return error when addressLine1 is invalid', () => {
          const errors = validator({ addressLine1: '@@' }, lang);
          assert.equal(errors.addressLine1.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine1.text, message('request-invitation-address-manual:fields.addressLine1.errors.format'));
        });

        it('should return error when addressLine1 is greater than 35 characters', () => {
          const errors = validator({ addressLine1: longString }, lang);
          assert.equal(errors.addressLine1.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine1.text, message('request-invitation-address-manual:fields.addressLine1.errors.length'));
        });
      });
    });
  });

  describe('addressLine2', () => {
    it('should return no errors when addressLine1 is valid', () => {
      const errors = validator({ addressLine2: 'Street Close' });
      assert.isUndefined(errors.addressLine2);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.addressLine2.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine2.text, message('request-invitation-address-manual:fields.addressLine2.errors.required'));
        });

        it('should return error when addressLine2 is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.addressLine2.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine2.text, message('request-invitation-address-manual:fields.addressLine2.errors.required'));
        });

        it('should return error when addressLine2 is empty', () => {
          const errors = validator({ addressLine2: '' }, lang);
          assert.equal(errors.addressLine2.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine2.text, message('request-invitation-address-manual:fields.addressLine2.errors.required'));
        });

        it('should return error when addressLine2 is invalid', () => {
          const errors = validator({ addressLine2: '@@' }, lang);
          assert.equal(errors.addressLine2.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine2.text, message('request-invitation-address-manual:fields.addressLine2.errors.format'));
        });

        it('should return error when addressLine2 is greater than 35 characters', () => {
          const errors = validator({ addressLine2: longString }, lang);
          assert.equal(errors.addressLine2.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressLine2.text, message('request-invitation-address-manual:fields.addressLine2.errors.length'));
        });
      });
    });
  });

  describe('addressTown', () => {
    it('should return no errors when addressLine1 is valid', () => {
      const errors = validator({ addressTown: 'Street Close' });
      assert.isUndefined(errors.addressTown);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.addressTown.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressTown.text, message('request-invitation-address-manual:fields.addressTown.errors.required'));
        });

        it('should return error when addressTown is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.addressTown.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressTown.text, message('request-invitation-address-manual:fields.addressTown.errors.required'));
        });

        it('should return error when addressLine2 is empty', () => {
          const errors = validator({ addressTown: '' }, lang);
          assert.equal(errors.addressTown.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressTown.text, message('request-invitation-address-manual:fields.addressTown.errors.required'));
        });

        it('should return error when addressLine2 is invalid', () => {
          const errors = validator({ addressTown: '@@' }, lang);
          assert.equal(errors.addressTown.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressTown.text, message('request-invitation-address-manual:fields.addressTown.errors.format'));
        });

        it('should return error when addressTown is greater than 35 characters', () => {
          const errors = validator({ addressTown: longString }, lang);
          assert.equal(errors.addressTown.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressTown.text, message('request-invitation-address-manual:fields.addressTown.errors.length'));
        });
      });
    });
  });

  describe('addressPostcode', () => {
    it('should return no errors when addressPostcode is valid', () => {
      const errors = validator({ addressPostcode: 'NE1 1ET' });
      assert.isUndefined(errors.addressPostcode);
    });

    languages.forEach((lang) => {
      context(lang, () => {
        const message = i18next.getFixedT(lang);

        it('should return error when post request is undefined', () => {
          const errors = validator(undefined, lang);
          assert.equal(errors.addressPostcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressPostcode.text, message('request-invitation-address-manual:fields.addressPostcode.errors.required'));
        });

        it('should return error when addressPostcode is undefined', () => {
          const errors = validator({ }, lang);
          assert.equal(errors.addressPostcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressPostcode.text, message('request-invitation-address-manual:fields.addressPostcode.errors.required'));
        });

        it('should return error when addressPostcode is empty', () => {
          const errors = validator({ addressPostcode: '' }, lang);
          assert.equal(errors.addressPostcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressPostcode.text, message('request-invitation-address-manual:fields.addressPostcode.errors.required'));
        });

        it('should return error when addressPostcode is invalid', () => {
          const errors = validator({ addressPostcode: '111111' }, lang);
          assert.equal(errors.addressPostcode.visuallyHiddenText, message('app:error-message.visuallyHiddenText'));
          assert.equal(errors.addressPostcode.text, message('request-invitation-address-manual:fields.addressPostcode.errors.format'));
        });
      });
    });
  });
});
