const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const validation = require('../../../../lib/validations/accountValidation');

const errorBankSummaryCyResponse = [
  { href: '#bankAccountHolder', text: 'Rhowch enw deiliad y cyfrif.', attributes: { 'data-journey': 'account-details:error:bank-account-holder' } },
  { href: '#bankSortCodeField1', text: 'Rhowch god didoli.', attributes: { 'data-journey': 'account-details:error:bank-sort-code' } },
  { href: '#bankAccountNumber', text: 'Rhowch rif cyfrif.', attributes: { 'data-journey': 'account-details:error:bank-account-number' } },
];

const errorBuildingSummaryCyResponse = [
  { href: '#buildingAccountHolder', text: 'Rhowch enw deiliad y cyfrif.', attributes: { 'data-journey': 'account-details:error:building-account-holder' } },
  { href: '#buildingSortCodeField1', text: 'Rhowch god didoli.', attributes: { 'data-journey': 'account-details:error:building-sort-code' } },
  { href: '#buildingAccountNumber', text: 'Rhowch rif cyfrif.', attributes: { 'data-journey': 'account-details:error:building-account-number' } },
];

/* Objects */
const bankObjects = {
  emptyObject: {
    bankAccountHolder: '', bankAccountNumber: '', bankSortCodeField1: '', bankSortCodeField2: '', bankSortCodeField3: '',
  },
  longTextObject: {
    bankAccountHolder: 'qwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiowe', bankAccountNumber: '', bankSortCodeField1: '', bankSortCodeField2: '', bankSortCodeField3: '',
  },
  validObject: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
  },
  shortAccount: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '1234567', bankSortCodeField1: '1', bankSortCodeField2: '2', bankSortCodeField3: '3',
  },
  longAccount: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '123456789', bankSortCodeField1: '111', bankSortCodeField2: '222', bankSortCodeField3: '333',
  },
  textAccount: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: 'AAnereo', bankSortCodeField1: 'a', bankSortCodeField2: 'b', bankSortCodeField3: 'c',
  },
  nonAlphaName: { bankAccountHolder: '££', bankAccountNumber: '123456789' },
  includesAnd: { bankAccountHolder: 'One && Two', bankAccountNumber: '123456789' },
  startNotAlphaName: { bankAccountHolder: ' Space Mistake', bankAccountNumber: '123456789' },
  dashAccountNumberAndSortCode: {
    bankAccountHolder: ' Space Mistake',
    bankAccountNumber: '-1234567',
    bankSortCodeField1: '-1',
    bankSortCodeField2: '-2',
    bankSortCodeField3: '-3',
  },
  fullStopAccountNumber: {
    bankAccountHolder: ' Space Mistake',
    bankAccountNumber: '.1234567',
    bankSortCodeField1: '11',
    bankSortCodeField2: '22',
    bankSortCodeField3: '33',
  },
  dashAndFullStopAccountNumber: {
    bankAccountHolder: ' Space Mistake',
    bankAccountNumber: '-.123456',
    bankSortCodeField1: '11',
    bankSortCodeField2: '22',
    bankSortCodeField3: '33',
  },
};

const paymentMethodBank = { paymentMethod: 'bank' };
const paymentMethodBuilding = { paymentMethod: 'building' };
const paymentMethodEmpty = { paymentMethod: '' };

const paymentMethodBankEmpty = {
  paymentMethod: 'bank', bankAccountHolder: '', bankAccountNumber: '', bankSortCodeField1: '', bankSortCodeField2: '', bankSortCodeField3: '',
};
const paymentMethodBuildingEmpty = {
  paymentMethod: 'building', buildingAccountHolder: '', buildingAccountNumber: '', buildingSortCodeField1: '', buildingSortCodeField2: '', buildingSortCodeField3: '', buildingRoll: '',
};

const buildingObjects = {
  emptyObject: {
    buildingAccountHolder: '', buildingAccountNumber: '', buildingSortCodeField1: '', buildingSortCodeField2: '', buildingSortCodeField3: '', buildingRoll: '',
  },
  validObject: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: 'CXJ-K6 897/98X',
  },
  validObjectNoRoll: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: '',
  },
  longTextObject: {
    buildingAccountHolder: 'qwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiowe', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: 'CXJ-K6 897/98X',
  },
  shortAccount: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '1234567', buildingSortCodeField1: '1', buildingSortCodeField2: '2', buildingSortCodeField3: '3', buildingRoll: '',
  },
  longAccount: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '123456789', buildingSortCodeField1: '111', buildingSortCodeField2: '222', buildingSortCodeField3: '333', buildingRoll: '',
  },
  textAccount: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: 'AAnereo', buildingSortCodeField1: 'a', buildingSortCodeField2: 'b', buildingSortCodeField3: 'c', buildingRoll: '',
  },
  validRoll: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: 'AAnereo', buildingSortCodeField1: 'a', buildingSortCodeField2: 'b', buildingSortCodeField3: 'c', buildingRoll: '342',
  },
  invalidRoll: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: 'AAnereo', buildingSortCodeField1: 'a', buildingSortCodeField2: 'b', buildingSortCodeField3: 'c', buildingRoll: '$$roll',
  },
  longRoll: {
    buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: 'AAnereo', buildingSortCodeField1: 'a', buildingSortCodeField2: 'b', buildingSortCodeField3: 'c', buildingRoll: 'qwertyqwertyqwertyq',
  },
  nonAlphaName: { buildingAccountHolder: '££', buildingAccountNumber: '123456789', buildingRoll: '' },
  includesAnd: { buildingAccountHolder: 'One && Two', buildingAccountNumber: '123456789', buildingRoll: '' },
  startNotAlphaName: { buildingAccountHolder: ' Space Mistake', buildingAccountNumber: '123456789', buildingRoll: '' },
  dashAccountNumberAndSortCode: {
    buildingAccountHolder: 'Mr Joe Bloggs',
    buildingAccountNumber: '-1234567',
    buildingSortCodeField1: '-1',
    buildingSortCodeField2: '-2',
    buildingSortCodeField3: '-3',
    buildingRoll: 'CXJ-K6 897/98X',
  },
};

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
      assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorBankSummaryCyResponse));
    });

    it('should return building errors when called with building as a select', () => {
      const accountValidationResponse = validation.accountValidator(paymentMethodBuildingEmpty, 'cy');
      assert.lengthOf(Object.keys(accountValidationResponse), 4);
      assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorBuildingSummaryCyResponse));
    });
  });

  describe('payment validator', () => {
    it('should return no error when bank is supplied ', () => {
      const accountValidationResponse = validation.paymentValidator(paymentMethodBank);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    it('should return no error when building is supplied ', () => {
      const accountValidationResponse = validation.paymentValidator(paymentMethodBuilding);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    it('should return error when nothing is supplied - CY', () => {
      const accountValidationResponse = validation.paymentValidator(paymentMethodEmpty);
      assert.equal(accountValidationResponse.paymentMethod.visuallyHiddenText, 'Gwall');
      assert.equal(accountValidationResponse.paymentMethod.text, 'Dewiswch os hoffech gael eich talu i gyfrif banc neu gymdeithas adeiladu.');
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
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Rhowch enw deiliad y cyfrif.');
      });
      it('should return error if to long (greater then 70 characters) ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longTextObject);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Mae\'n rhaid i\'r enw fod yn 70 nod neu lai.');
      });
      it('should return error if text includes none alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.nonAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Mae\'n rhaid i\'r enw ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn, gofodau ac ampersand.');
      });
      it('should return error if text does not start with alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Mae\'n rhaid i\'r enw ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn, gofodau ac ampersand.');
      });
      it('should return no error if text includes a & ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.includesAnd);
        assert.equal(accountValidationResponse.bankAccountHolder, undefined);
      });
    });

    describe('account number', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Rhowch rif cyfrif.');
      });
      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });
    });

    describe('sort code', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Rhowch god didoli.');
      });
      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.textAccount);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });
      it('should return error if incorrect format dash and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.dashAccountNumberAndSortCode);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });
      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });
      it('should return error if length greater then 2', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });
    });
  });

  describe('building validator', () => {
    it('should return no error when valid object supplied', () => {
      const accountValidationResponse = validation.buildingValidation(buildingObjects.validObject);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    it('should return no error when valid object with empty roll number is supplied', () => {
      const accountValidationResponse = validation.buildingValidation(buildingObjects.validObjectNoRoll);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    describe('accountName', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Rhowch enw deiliad y cyfrif.');
      });
      it('should return error if to long (greater then 70 characters)', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longTextObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Mae\'n rhaid i\'r enw fod yn 70 nod neu lai.');
      });
      it('should return error if text includes none alpha', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.nonAlphaName);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Mae\'n rhaid i\'r enw ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn, gofodau ac ampersand.');
      });
      it('should return no error if text includes a &', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.includesAnd);
        assert.equal(accountValidationResponse.buildingAccountHolder, undefined);
      });
      it('should return error if text does not start with alpha', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Mae\'n rhaid i\'r enw ddechrau gyda llythyren a dim ond llythrennau a i z, cysylltnodau, collnodau, atalnodau llawn, gofodau ac ampersand.');
      });
    });

    describe('account number', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Rhowch rif cyfrif.');
      });
      it('should return error if contains text', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.textAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });

      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.shortAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });

      it('should return error if incorrect format dash and numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.dashAccountNumberAndSortCode);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });

      it('should return error if incorrect format full stop and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.fullStopAccountNumber);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });

      it('should return error if incorrect format full stop, dash and numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.dashAndFullStopAccountNumber);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Mae\'n rhaid i rif y cyfrif fod yn 8 rhif.');
      });
    });

    describe('sort code', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Rhowch god didoli.');
      });

      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.textAccount);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });

      it('should return error if incorrect format dash and numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.dashAccountNumberAndSortCode);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });

      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.shortAccount);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });

      it('should return error if length greater then 2', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longAccount);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Rhowch god didoli yn y fformat cywir, fel 11 22 33.');
      });
    });

    describe('buildingRoll', () => {
      it('should return no error if roll is valid', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.validRoll);
        assert.equal(accountValidationResponse.buildingRoll, undefined);
      });
      it('should return error if contains $$', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.invalidRoll);
        assert.equal(accountValidationResponse.buildingRoll.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingRoll.text, 'Mae\'n rhaid i\'r rif rhôl neu\'r cyfeirnod gynnwys rhifau 0 i 9 yn unig, llythrennau a i z, cysylltnodau, atalnodau llawn, gofodau, atalnodau, slaes, collnodau, serennau, ampersand a chromfachau.');
      });
      it('should return error if to long', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longRoll);
        assert.equal(accountValidationResponse.buildingRoll.visuallyHiddenText, 'Gwall');
        assert.equal(accountValidationResponse.buildingRoll.text, 'Mae\'n rhaid i\'r rif rhôl neu\'r cyfeirnod fod yn 18 nod neu lai.');
      });
    });
  });
});
