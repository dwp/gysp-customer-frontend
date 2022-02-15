const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/accountValidation');
const { fields: translatedErr } = require('../../../../locales/cy/account.json');
const { 'error-message': { visuallyHiddenText: errMsg } } = require('../../../../locales/cy/app.json');

/* Objects */
const bankObjects = {
  emptyObject: {
    bankAccountHolder: '', bankAccountNumber: '', bankSortCode: '',
  },
  longTextObject: {
    bankAccountHolder: 'qwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiowe', bankAccountNumber: '', bankSortCode: '',
  },
  validObject: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233',
  },
  shortAccount: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '1234567', bankSortCode: '112233',
  },
  shortSortCode: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '1234567', bankSortCode: '1122',
  },
  longAccount: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '123456789', bankSortCode: '111222',
  },
  longSortCode: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '123456789', bankSortCode: '11223344',
  },
  textAccount: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: 'AAnereo', bankSortCode: '112233',
  },
  textSortCode: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: 'AAnereo', bankSortCode: 'a',
  },
  nonAlphaName: { bankAccountHolder: '££', bankAccountNumber: '123456789' },
  includesAnd: { bankAccountHolder: 'One && Two', bankAccountNumber: '123456789' },
  startNotAlphaName: { bankAccountHolder: ' Space Mistake', bankAccountNumber: '123456789' },
  dashAccountNumberAndSortCode: {
    bankAccountHolder: ' Space Mistake',
    bankAccountNumber: '-1234567',
    bankSortCode: '-1',
  },
  fullStopAccountNumber: {
    bankAccountHolder: ' Space Mistake',
    bankAccountNumber: '.1234567',
    bankSortCode: '112233',
  },
  dashAndFullStopAccountNumber: {
    bankAccountHolder: ' Space Mistake',
    bankAccountNumber: '-.123456',
    bankSortCode: '112233',
  },
  validObjectWithBuildingSociety: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233', buildingRoll: 'CXJ-K6 897/98X',
  },
  longBuildingSociety: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233', buildingRoll: 'CXJAAAAAAAAAAAAAAAAAA',
  },
  blankBuildingSociety: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233', buildingRoll: '',
  },
  invalidBuildingSociety: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233', buildingRoll: '$$roll',
  },
};

const paymentMethodBankEmpty = {
  paymentMethod: 'bank', bankAccountHolder: '', bankAccountNumber: '', bankSortCode: '',
};

const ACC_NUM_ERR = {
  ...translatedErr.accountNumber.errors,
};

const SORT_CODE_ERR = {
  ...translatedErr.sortCode.errors,
};

const ACC_HOLDER_ERR = {
  ...translatedErr.accountHolder.errors,
};

const BUILDING_SOC_ROLL_ERR = {
  ...translatedErr.buildingRoll.errors,
};

const errorBuildingSummaryCyResponse = [
  { href: '#bankAccountHolder', text: ACC_HOLDER_ERR.required, attributes: { 'data-journey': 'account-details:error:bank-account-holder' } },
  { href: '#bankSortCode', text: SORT_CODE_ERR.required, attributes: { 'data-journey': 'account-details:error:bank-sort-code' } },
  { href: '#bankAccountNumber', text: ACC_NUM_ERR.required, attributes: { 'data-journey': 'account-details:error:bank-account-number' } },
];

describe('accountValidator - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach((done) => {
    i18next.changeLanguage('cy', done());
  });

  describe('accountValidator summary', () => {
    it('should return banking errors when called with banking as a select', () => {
      const accountValidationResponse = validation.accountValidator(paymentMethodBankEmpty, 'cy');
      assert.lengthOf(Object.keys(accountValidationResponse), 4);
      assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorBuildingSummaryCyResponse));
    });
  });

  describe('bank validator', () => {
    it('should return no error when valid object supplied ', () => {
      const accountValidationResponse = validation.bankValidation(bankObjects.validObject);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    describe('accountName', () => {
      it('should return error if empty ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountHolder.text, ACC_HOLDER_ERR.required);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_HOLDER_ERR.required);
      });
      it('should return error if to long (greater then 70 characters) ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longTextObject);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountHolder.text, ACC_HOLDER_ERR.length);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_HOLDER_ERR.length);
      });
      it('should return error if text includes none alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.nonAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountHolder.text, ACC_HOLDER_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_HOLDER_ERR.format);
      });
      it('should return error if text does not start with alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountHolder.text, ACC_HOLDER_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_HOLDER_ERR.format);
      });
      it('should return no error if text includes a & ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.includesAnd);
        assert.equal(accountValidationResponse.bankAccountHolder, undefined);
      });
    });

    describe('account number', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.required);
        assert.equal(accountValidationResponse.errorSummary[2].text, ACC_NUM_ERR.required);
      });
      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.length);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_NUM_ERR.length);
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.length);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_NUM_ERR.length);
      });

      it('should return error if incorrect format', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.textAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_NUM_ERR.format);
      });

      it('should return error if incorrect format dash and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.dashAccountNumberAndSortCode);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, ACC_HOLDER_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[1].text, SORT_CODE_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[2].text, ACC_NUM_ERR.format);
      });

      it('should return error if incorrect format full stop and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.fullStopAccountNumber);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[1].text, ACC_NUM_ERR.format);
      });

      it('should return error if incorrect format full stop, dash and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.dashAndFullStopAccountNumber);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankAccountNumber.text, ACC_NUM_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[1].text, ACC_NUM_ERR.format);
      });
    });

    describe('sort code', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankSortCode.text, SORT_CODE_ERR.required);
        assert.equal(accountValidationResponse.errorSummary[1].text, SORT_CODE_ERR.required);
      });

      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.textSortCode);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankSortCode.text, SORT_CODE_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, SORT_CODE_ERR.format);
      });

      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortSortCode);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankSortCode.text, SORT_CODE_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, SORT_CODE_ERR.format);
      });

      it('should return error if incorrect format dash and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.dashAccountNumberAndSortCode);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankSortCode.text, SORT_CODE_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[1].text, SORT_CODE_ERR.format);
      });

      it('should return error if length greater than 6', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longSortCode);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.bankSortCode.text, SORT_CODE_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, SORT_CODE_ERR.format);
      });
    });

    describe('buildingRoll', () => {
      it('should return no error if roll is empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.blankBuildingSociety);
        assert.lengthOf(Object.keys(accountValidationResponse), 0);
      });
      it('should return no error if roll is valid', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.validObjectWithBuildingSociety);
        assert.lengthOf(Object.keys(accountValidationResponse), 0);
      });
      it('should return error if contains $$', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.invalidBuildingSociety);
        assert.equal(accountValidationResponse.buildingRoll.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.buildingRoll.text, BUILDING_SOC_ROLL_ERR.format);
        assert.equal(accountValidationResponse.errorSummary[0].text, BUILDING_SOC_ROLL_ERR.format);
      });
      it('should return error if to long', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longBuildingSociety);
        assert.equal(accountValidationResponse.buildingRoll.visuallyHiddenText, errMsg);
        assert.equal(accountValidationResponse.buildingRoll.text, BUILDING_SOC_ROLL_ERR.length);
        assert.equal(accountValidationResponse.errorSummary[0].text, BUILDING_SOC_ROLL_ERR.length);
      });
    });
  });
});
