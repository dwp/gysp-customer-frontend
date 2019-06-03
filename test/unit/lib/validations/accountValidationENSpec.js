const { assert } = require('chai');
const i18n = require('i18next');

const i18nConfig = require('../../../../config/i18n');

const validation = require('../../../../lib/validations/accountValidation');

const errorBankSummaryResponse = [
  { href: '#bankAccountHolder', text: 'Enter the account holder’s name.', attributes: { 'data-journey': 'account-details:error:bank-account-holder' } },
  { href: '#bankSortCodeField1', text: 'Enter a sort code.', attributes: { 'data-journey': 'account-details:error:bank-sort-code' } },
  { href: '#bankAccountNumber', text: 'Enter an account number.', attributes: { 'data-journey': 'account-details:error:bank-account-number' } },
];

const errorBuildingSummaryResponse = [
  { href: '#buildingAccountHolder', text: 'Enter the account holder’s name.', attributes: { 'data-journey': 'account-details:error:building-account-holder' } },
  { href: '#buildingSortCodeField1', text: 'Enter a sort code.', attributes: { 'data-journey': 'account-details:error:building-sort-code' } },
  { href: '#buildingAccountNumber', text: 'Enter an account number.', attributes: { 'data-journey': 'account-details:error:building-account-number' } },
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

describe('accountValidator - EN', () => {
  before((done) => {
    i18n.init(i18nConfig, done);
  });
  describe('accountValidator summary', () => {
    it('should return banking errors when called with banking as a select', () => {
      const accountValidationResponse = validation.accountValidator(paymentMethodBankEmpty, 'en');
      assert.lengthOf(Object.keys(accountValidationResponse), 4);
      assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorBankSummaryResponse));
    });
    it('should return building errors when called with building as a select', () => {
      const accountValidationResponse = validation.accountValidator(paymentMethodBuildingEmpty, 'en');
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
    it('should return error when nothing is supplied', () => {
      const accountValidationResponse = validation.paymentValidator(paymentMethodEmpty);
      assert.equal(accountValidationResponse.paymentMethod.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.paymentMethod.text, 'Select whether you would like to be paid into a bank or a building society account.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Select whether you would like to be paid into a bank or a building society account.');
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
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Enter the account holder’s name.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter the account holder’s name.');
      });
      it('should return error if to long (greater then 70 characters) ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longTextObject);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Name must be 70 characters or less.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must be 70 characters or less.');
      });
      it('should return error if text includes none alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.nonAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
      });
      it('should return error if text does not start with alpha ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.bankAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountHolder.text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
      });
      it('should return no error if text includes a & ', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.includesAnd);
        assert.equal(accountValidationResponse.bankAccountHolder, undefined);
      });
    });

    describe('account number', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Enter an account number.');
        assert.equal(accountValidationResponse.errorSummary[2].text, 'Enter an account number.');
      });
      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Account number must be 8 numbers.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Account number must be 8 numbers.');
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Account number must be 8 numbers.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Account number must be 8 numbers.');
      });

      it('should return error if incorrect format', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.textAccount);
        assert.equal(accountValidationResponse.bankAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankAccountNumber.text, 'Account number must be 8 numbers.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Account number must be 8 numbers.');
      });
    });

    describe('sort code', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.emptyObject);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Enter a sort code.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Enter a sort code.');
      });
      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.textAccount);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Enter a sort code in the correct format, like 11 22 33.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter a sort code in the correct format, like 11 22 33.');
      });
      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.shortAccount);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Enter a sort code in the correct format, like 11 22 33.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter a sort code in the correct format, like 11 22 33.');
      });
      it('should return error if length greater then 2', () => {
        const accountValidationResponse = validation.bankValidation(bankObjects.longAccount);
        assert.equal(accountValidationResponse.bankSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.bankSortCode.text, 'Enter a sort code in the correct format, like 11 22 33.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter a sort code in the correct format, like 11 22 33.');
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

    describe('accountName', () => {
      it('should return error if empty ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Enter the account holder’s name.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter the account holder’s name.');
      });
      it('should return error if to long (greater then 70 characters) ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longTextObject);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Name must be 70 characters or less.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must be 70 characters or less.');
      });
      it('should return error if text includes none alpha ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.nonAlphaName);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
      });
      it('should return no error if text includes a & ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.includesAnd);
        assert.equal(accountValidationResponse.buildingAccountHolder, undefined);
      });
      it('should return error if text does not start with alpha ', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.startNotAlphaName);
        assert.equal(accountValidationResponse.buildingAccountHolder.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountHolder.text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
      });
    });

    describe('account number', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Enter an account number.');
        assert.equal(accountValidationResponse.errorSummary[2].text, 'Enter an account number.');
      });
      it('should return error if contains text', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.textAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Account number must be 8 numbers.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Account number must be 8 numbers.');
      });

      it('should return error if less then 8 numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.shortAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Account number must be 8 numbers.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Account number must be 8 numbers.');
      });

      it('should return error if more then 8 numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longAccount);
        assert.equal(accountValidationResponse.buildingAccountNumber.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingAccountNumber.text, 'Account number must be 8 numbers.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Account number must be 8 numbers.');
      });
    });

    describe('sort code', () => {
      it('should return error if empty', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.emptyObject);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Enter a sort code.');
        assert.equal(accountValidationResponse.errorSummary[1].text, 'Enter a sort code.');
      });
      it('should return error if not numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.textAccount);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Enter a sort code in the correct format, like 11 22 33.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter a sort code in the correct format, like 11 22 33.');
      });
      it('should return error if one numbers', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.shortAccount);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Enter a sort code in the correct format, like 11 22 33.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter a sort code in the correct format, like 11 22 33.');
      });
      it('should return error if length greater then 2', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longAccount);
        assert.equal(accountValidationResponse.buildingSortCode.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingSortCode.text, 'Enter a sort code in the correct format, like 11 22 33.');
        assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter a sort code in the correct format, like 11 22 33.');
      });
    });

    describe('buildingRoll', () => {
      it('should return no error if roll is valid', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.validRoll);
        assert.equal(accountValidationResponse.buildingRoll, undefined);
      });
      it('should return error if contains $$', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.invalidRoll);
        assert.equal(accountValidationResponse.buildingRoll.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingRoll.text, 'Roll or reference number must only include numbers 0 to 9, letters a to z, hyphens, full stops, spaces, commas, slashes, apostrophes, asterisks, ampersands and brackets.');
        assert.equal(accountValidationResponse.errorSummary[2].text, 'Roll or reference number must only include numbers 0 to 9, letters a to z, hyphens, full stops, spaces, commas, slashes, apostrophes, asterisks, ampersands and brackets.');
      });
      it('should return error if to long', () => {
        const accountValidationResponse = validation.buildingValidation(buildingObjects.longRoll);
        assert.equal(accountValidationResponse.buildingRoll.visuallyHiddenText, 'Error');
        assert.equal(accountValidationResponse.buildingRoll.text, 'Roll or reference number must be 18 characters or less.');
        assert.equal(accountValidationResponse.errorSummary[2].text, 'Roll or reference number must be 18 characters or less.');
      });
    });
  });
});
