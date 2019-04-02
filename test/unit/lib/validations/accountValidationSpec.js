const { assert } = require('chai');

const validation = require('../../../../lib/validations/accountValidation');

const errorBankSummaryResponse = [
  { href: '#bankAccountHolder', text: 'account:fields.accountHolder.label - account:fields.accountHolder.errors.required', attributes: { 'data-journey': 'google-analytics:pages.account-details.error' } },
  { href: '#bankSortCode', text: 'account:fields.sortCode.label - account:fields.sortCode.errors.required', attributes: { 'data-journey': 'google-analytics:pages.account-details.error' } },
  { href: '#bankAccountNumber', text: 'account:fields.accountNumber.label - account:fields.accountNumber.errors.required', attributes: { 'data-journey': 'google-analytics:pages.account-details.error' } },
];

const errorBuildingSummaryResponse = [
  { href: '#buildingAccountHolder', text: 'account:fields.accountHolder.label - account:fields.accountHolder.errors.required', attributes: { 'data-journey': 'google-analytics:pages.account-details.error' } },
  { href: '#buildingSortCode', text: 'account:fields.sortCode.label - account:fields.sortCode.errors.required', attributes: { 'data-journey': 'google-analytics:pages.account-details.error' } },
  { href: '#buildingAccountNumber', text: 'account:fields.accountNumber.label - account:fields.accountNumber.errors.required', attributes: { 'data-journey': 'google-analytics:pages.account-details.error' } },
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
};

describe('Form', () => {
  describe('accountValidator validator', () => {
    it('should return banking errros when called with banking as a select', () => {
      const accountValidationResponse = validation.accountValidator(paymentMethodBankEmpty);
      assert.lengthOf(Object.keys(accountValidationResponse), 4);
      assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorBankSummaryResponse));
    });
    it('should return building errros when called with building as a select', () => {
      const accountValidationResponse = validation.accountValidator(paymentMethodBuildingEmpty);
      assert.lengthOf(Object.keys(accountValidationResponse), 4);
      assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorBuildingSummaryResponse));
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
    it('should return error when nothing is supplied ', () => {
      const accountValidationResponse = validation.paymentValidator(paymentMethodEmpty);
      assert.equal(accountValidationResponse.paymentMethod.text, 'account:fields.paymentMethod.errors.required');
    });
  });
  describe('bank validator', () => {
    it('should return no error when valid object supplied ', () => {
      const accountValidationResponse = validation.bankValidation(bankObjects.validObject);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    describe(' accountName ', () => {
      it('should return error if empty ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'account:fields.accountHolder.errors.required');
      });
      it('should return error if to long (greater then 70 characters) ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longTextObject);
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'account:fields.accountHolder.errors.length');
      });
      it('should return error if text includes none alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.nonAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'account:fields.accountHolder.errors.format');
      });
      it('should return no error if text includes a & ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.includesAnd);
        assert.equal(accountValidationResponse.bankAccountHolder, undefined);
      });
      it('should return error if text does not start with alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'account:fields.accountHolder.errors.format');
      });
    });

    describe('account number ', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'account:fields.accountNumber.errors.required');
      });
      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'account:fields.accountNumber.errors.length');
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'account:fields.accountNumber.errors.length');
      });
    });

    describe('sort code ', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankSortCode.text, 'account:fields.sortCode.errors.required');
      });
      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.textAccount);
        assert.equal(accountValidationResponse.bankSortCode.text, 'account:fields.sortCode.errors.format');
      });
      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankSortCode.text, 'account:fields.sortCode.errors.length');
      });
      it('should return error if length greater then 2', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankSortCode.text, 'account:fields.sortCode.errors.length');
      });
    });
  });

  describe('building validator', () => {
    it('should return no error when valid object supplied ', () => {
      const accountValidationResponse = validation.buildingValidation(buildingObjects.validObject);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    it('should return no error when valid object with empty roll number is supplied ', () => {
      const accountValidationResponse = validation.buildingValidation(buildingObjects.validObjectNoRoll);
      assert.lengthOf(Object.keys(accountValidationResponse), 0);
    });

    describe(' accountName ', () => {
      it('should return error if empty ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'account:fields.accountHolder.errors.required');
      });
      it('should return error if to long (greater then 70 characters) ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longTextObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'account:fields.accountHolder.errors.length');
      });
      it('should return error if text includes none alpha ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.nonAlphaName);
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'account:fields.accountHolder.errors.format');
      });
      it('should return no error if text includes a & ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.includesAnd);
        assert.equal(accountValidationResponse.buildingAccountHolder, undefined);
      });
      it('should return error if text does not start with alpha ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'account:fields.accountHolder.errors.format');
      });
    });

    describe('account number ', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'account:fields.accountNumber.errors.required');
      });
      it('should return error if contains text', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.textAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'account:fields.accountNumber.errors.format');
      });

      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.shortAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'account:fields.accountNumber.errors.length');
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'account:fields.accountNumber.errors.length');
      });
    });

    describe('sort code ', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingSortCode.text, 'account:fields.sortCode.errors.required');
      });
      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.textAccount);
        assert.equal(accountValidationResponse.buildingSortCode.text, 'account:fields.sortCode.errors.format');
      });
      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.shortAccount);
        assert.equal(accountValidationResponse.buildingSortCode.text, 'account:fields.sortCode.errors.length');
      });
      it('should return error if length greater then 2', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longAccount);
        assert.equal(accountValidationResponse.buildingSortCode.text, 'account:fields.sortCode.errors.length');
      });
    });

    describe('buildingRoll  ', () => {
      it('should return no error if roll is valid', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.validRoll);
        assert.equal(accountValidationResponse.buildingRoll, undefined);
      });
      it('should return error if contains $$', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.invalidRoll);
        assert.equal(accountValidationResponse.buildingRoll.text, 'account:fields.buildingRoll.errors.format');
      });
      it('should return error if to long', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longRoll);
        assert.equal(accountValidationResponse.buildingRoll.text, 'account:fields.buildingRoll.errors.length');
      });
    });
  });
});
