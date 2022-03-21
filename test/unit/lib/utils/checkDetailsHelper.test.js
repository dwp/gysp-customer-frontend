const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const checkDetailsHelper = require('../../../../lib/utils/checkDetailsHelper');

const englishLanguage = 'en';
const welshLanguage = 'cy';

const emptyDetails = {};

const resultTemplate = (name, dob, address, lang) => [
  {
    key: { text: i18next.getFixedT(lang)('request-invitation-check-details:keys.name'), classes: 'govuk-!-width-two-thirds' },
    value: { text: name, html: undefined },
  },
  {
    key: { text: i18next.getFixedT(lang)('request-invitation-check-details:keys.dob'), classes: 'govuk-!-width-two-thirds' },
    value: { text: dob, html: undefined },
  },
  {
    key: { text: i18next.getFixedT(lang)('request-invitation-check-details:keys.address'), classes: 'govuk-!-width-two-thirds' },
    value: { text: null, html: address },
  },
];

const validFormData = {
  addressLookup: [{
    uprn: '123456', singleLine: 'Test Street, Newcastle, NE1 2RT',
  }],
  'request-invitation-name': { firstName: 'Jeff', lastName: 'Banks' },
  'request-invitation-dob': { dateYear: '1956', dateMonth: '5', dateDay: '1' },
  'request-invitation-address-choose': { uprn: '123456' },
};

const validAddressFormData = {
  addressLookup: [{
    uprn: '123456', singleLine: 'Test Street, Newcastle, NE1 2RT',
  }],
  'request-invitation-address-choose': { uprn: '123456' },
};

const validManualAddressFormData = {
  'request-invitation-address-manual': {
    addressLine1: '1',
    addressLine2: 'Test Street',
    addressTown: 'Newcastle',
    addressPostcode: 'NE1 2RT',
  },
};

describe('Check Details Helper ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('requestFilter', () => {
    it('should return a blank value array when undefined formData supplied', () => {
      const result = checkDetailsHelper.requestFilter(undefined, englishLanguage);
      assert.lengthOf(result, 3);
      assert.deepEqual(result, resultTemplate(null, null, null, englishLanguage));
    });

    it('should return a blank value array when empty formData supplied', () => {
      const result = checkDetailsHelper.requestFilter(emptyDetails, englishLanguage);
      assert.lengthOf(result, 3);
      assert.deepEqual(result, resultTemplate(null, null, null, englishLanguage));
    });

    describe('name', () => {
      it('should return a array that contains name in english', () => {
        const result = checkDetailsHelper.requestFilter({ 'request-invitation-name': validFormData['request-invitation-name'] }, englishLanguage);
        assert.deepEqual(result, resultTemplate('Jeff Banks', null, null, englishLanguage));
      });

      it('should return a array that contains name in welsh', () => {
        const result = checkDetailsHelper.requestFilter({ 'request-invitation-name': validFormData['request-invitation-name'] }, welshLanguage);
        assert.deepEqual(result, resultTemplate('Jeff Banks', null, null, welshLanguage));
      });
    });

    describe('date of birth', () => {
      it('should return a array that contains dob in english', () => {
        const result = checkDetailsHelper.requestFilter({ 'request-invitation-dob': validFormData['request-invitation-dob'] }, englishLanguage);
        assert.deepEqual(result, resultTemplate(null, '01/05/1956', null, englishLanguage));
      });

      it('should return a array that contains dob in welsh', () => {
        const result = checkDetailsHelper.requestFilter({ 'request-invitation-dob': validFormData['request-invitation-dob'] }, welshLanguage);
        assert.deepEqual(result, resultTemplate(null, '01/05/1956', null, welshLanguage));
      });
    });

    describe('address', () => {
      describe('address picker', () => {
        it('should return a array that contains address in english', () => {
          const result = checkDetailsHelper.requestFilter(validAddressFormData, englishLanguage);
          assert.deepEqual(result, resultTemplate(null, null, 'Test Street<br /> Newcastle<br /> NE1 2RT', englishLanguage));
        });

        it('should return a array that contains address in welsh', () => {
          const result = checkDetailsHelper.requestFilter(validAddressFormData, welshLanguage);
          assert.deepEqual(result, resultTemplate(null, null, 'Test Street<br /> Newcastle<br /> NE1 2RT', welshLanguage));
        });
      });

      describe('address manual', () => {
        it('should return a array that contains address in english', () => {
          const result = checkDetailsHelper.requestFilter(validManualAddressFormData, englishLanguage);
          assert.deepEqual(result, resultTemplate(null, null, '1<br />Test Street<br />Newcastle<br />NE1 2RT', englishLanguage));
        });

        it('should return a array that contains address in welsh', () => {
          const result = checkDetailsHelper.requestFilter(validManualAddressFormData, welshLanguage);
          assert.deepEqual(result, resultTemplate(null, null, '1<br />Test Street<br />Newcastle<br />NE1 2RT', welshLanguage));
        });
      });
    });
  });
});
