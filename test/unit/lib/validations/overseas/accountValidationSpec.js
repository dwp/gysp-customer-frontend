const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const validation = require('../../../../../lib/validations/accountOverseasValidation');

const errorEmptySummaryResponse = [
  { href: '#accountHolder', text: 'Enter the account holder’s name.', attributes: { 'data-journey': 'account-details-overseas:error:account-name-overseas' } },
  { href: '#accountNumber', text: 'Enter an account number.', attributes: { 'data-journey': 'account-details-overseas:error:account-number-overseas' } },
  { href: '#accountCode', text: 'Enter the bank or branch code.', attributes: { 'data-journey': 'account-details-overseas:error:bank-or-branch-overseas' } },
];

const longString = 'qwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiopasdfghjklzqwertyuiowe';
const nonAlphaName = '££';

/* Objects */
const accountObjects = {
  emptyObject: {
    accountHolder: '', accountNumber: '', accountCode: '',
  },
  validObject: {
    accountHolder: 'Mr Joe Bloggs', accountNumber: '12345678', accountCode: 'CXJ-K6 897/98X',
  },
  accountName: {
    invalidFormat: { accountHolder: nonAlphaName, accountNumber: '123456789', accountCode: 'CXJ-K6 897/98X' },
    long: { accountHolder: longString, accountNumber: '12345678', accountCode: 'CXJ-K6 897/98X' },
    includesAmpersand: { accountHolder: 'One && Two', accountNumber: '123456789', accountCode: 'CXJ-K6 897/98X' },
    startNotAlphaName: { accountHolder: ' Space Mistake', accountNumber: '123456789', accountCode: '' },
  },
  accountNumber: {
    invalidFormat: { accountHolder: 'Mr Joe Bloggs', accountNumber: nonAlphaName, accountCode: 'CXJ-K6 897/98X' },
    long: { accountHolder: 'Mr Joe Bloggs', accountNumber: longString, accountCode: 'CXJ-K6 897/98X' },
  },
  accountCode: {
    invalidFormat: { accountHolder: 'Mr Joe Bloggs', accountNumber: '123456789', accountCode: nonAlphaName },
    long: { accountHolder: 'Mr Joe Bloggs', accountNumber: '123456789', accountCode: longString },
  },
};

describe('overseas account validation', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });
  it('should return no error when valid object supplied ', () => {
    const accountValidationResponse = validation.accountValidator(accountObjects.validObject);
    assert.lengthOf(Object.keys(accountValidationResponse), 0);
  });
  it('should return errors when empty object supplied ', () => {
    const accountValidationResponse = validation.accountValidator(accountObjects.emptyObject);
    assert.equal(JSON.stringify(accountValidationResponse.errorSummary), JSON.stringify(errorEmptySummaryResponse));
  });

  describe('accountName', () => {
    it('should return error if empty ', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.emptyObject);
      assert.equal(accountValidationResponse.accountHolder.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountHolder.text, 'Enter the account holder’s name.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Enter the account holder’s name.');
    });

    it('should return error if to long (greater then 70 characters) ', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountName.long);
      assert.equal(accountValidationResponse.accountHolder.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountHolder.text, 'Name must be 70 characters or less.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must be 70 characters or less.');
    });

    it('should return error if text includes invalid characters', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountName.invalidFormat);
      assert.equal(accountValidationResponse.accountHolder.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountHolder.text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
    });

    it('should return error if text does not start with alpha ', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountName.startNotAlphaName);
      assert.equal(accountValidationResponse.accountHolder.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountHolder.text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Name must start with a letter and only include letters a to z, hyphens, apostrophes, full stops, spaces and ampersands.');
    });

    it('should return no error if text includes a & ', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountName.includesAmpersand);
      assert.equal(accountValidationResponse.accountHolder, undefined);
      assert.equal(accountValidationResponse.errorSummary, undefined);
    });
  });

  describe('accountNumber', () => {
    it('should return error if empty', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.emptyObject);
      assert.equal(accountValidationResponse.accountNumber.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountNumber.text, 'Enter an account number.');
      assert.equal(accountValidationResponse.errorSummary[1].text, 'Enter an account number.');
    });

    it('should return error if contains $$', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountNumber.invalidFormat);
      assert.equal(accountValidationResponse.accountNumber.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountNumber.text, 'Account number must only include numbers 0 to 9, letters a to z, hyphens, full stops, spaces, commas, slashes, apostrophes, asterisks, ampersands and brackets.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Account number must only include numbers 0 to 9, letters a to z, hyphens, full stops, spaces, commas, slashes, apostrophes, asterisks, ampersands and brackets.');
    });

    it('should return error if to long', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountNumber.long);
      assert.equal(accountValidationResponse.accountNumber.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountNumber.text, 'Account number must be 70 characters or less.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Account number must be 70 characters or less.');
    });
  });

  describe('accountCode', () => {
    it('should return error if empty', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.emptyObject);
      assert.equal(accountValidationResponse.accountCode.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountCode.text, 'Enter the bank or branch code.');
      assert.equal(accountValidationResponse.errorSummary[2].text, 'Enter the bank or branch code.');
    });

    it('should return error if contains $$', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountCode.invalidFormat);
      assert.equal(accountValidationResponse.accountCode.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountCode.text, 'Bank or branch code must only include numbers 0 to 9, letters a to z, hyphens, full stops, spaces, commas, slashes, apostrophes, asterisks, ampersands and brackets.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Bank or branch code must only include numbers 0 to 9, letters a to z, hyphens, full stops, spaces, commas, slashes, apostrophes, asterisks, ampersands and brackets.');
    });

    it('should return error if to long', () => {
      const accountValidationResponse = validation.accountValidator(accountObjects.accountCode.long);
      assert.equal(accountValidationResponse.accountCode.visuallyHiddenText, 'Error');
      assert.equal(accountValidationResponse.accountCode.text, 'Bank or branch code must be 70 characters or less.');
      assert.equal(accountValidationResponse.errorSummary[0].text, 'Bank or branch code must be 70 characters or less.');
    });
  });
});
