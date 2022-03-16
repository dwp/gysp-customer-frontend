const { assert } = require('chai');
const mockdate = require('mockdate');
const generalHelper = require('../../../../../lib/validations/utils/general');

const januaryDays = 31;
const februaryDays = 28;
const marchDays = 31;
const aprilDays = 30;
const mayDays = 31;
const juneDays = 30;
const julyDays = 31;
const septemberDays = 30;
const octoberDays = 31;
const novemberDays = 30;
const decemberDays = 31;

let days = 1;
const currentYear = new Date().getFullYear();

const invalidDates = [{ day: 9, month: 13, year: 2000 },
  { day: 1, month: 30, year: 2000 }];

const validEaseofUse = ['veryEasy', 'easy', 'difficult', 'veryDifficult'];
const validHelperReg = ['yourself', 'someoneElse', 'onBehalf'];
const validStatus = ['verySatisfied', 'satisfied', 'neither', 'dissatisfied', 'veryDissatisfied'];

const basicText = 'BASIC';

describe('General Helper ', () => {
  beforeEach(() => {
    days = 1;
  });

  describe(' validEaseofUse ', () => {
    validEaseofUse.forEach((value) => {
      it(`should return true when ${value} is passed`, () => {
        assert.ok(generalHelper.easeOfUseValidator(value));
      });
    });
  });

  describe(' helperInfoValidator ', () => {
    validHelperReg.forEach((value) => {
      it(`should return true when ${value} is passed`, () => {
        assert.ok(generalHelper.helperInfoValidator(value));
      });
    });
  });

  describe(' serviceReceivedValidator ', () => {
    validStatus.forEach((value) => {
      it(`should return true when ${value} is passed`, () => {
        assert.ok(generalHelper.serviceReceivedValidator(value));
      });
    });
  });

  describe(' isValidDate ', () => {
    it('should return errors when Year is Y, YY or YYY format', () => {
      assert.notOk(generalHelper.isDateValid('01', '01', '1'));
      assert.notOk(generalHelper.isDateValid('01', '01', '11'));
      assert.notOk(generalHelper.isDateValid('01', '01', '111'));
    });

    it('should return error for invalid dates i.e month is invalid but day is', () => {
      invalidDates.forEach((test) => {
        assert.notOk(generalHelper.isDateValid(test.day, test.month, test.year));
      });
    });

    it('should return true for all 31 days in Janaury and month is 01', () => {
      while (days <= januaryDays) {
        assert.ok(generalHelper.isDateValid(days, '01', '2000'));
        days++;
      }
    });

    it('should return true for all 28 days in February and month is 2', () => {
      while (days <= januaryDays) {
        assert.ok(generalHelper.isDateValid(days, '1', '2000'));
        days++;
      }
    });

    it('should return true for all 28 days in February and month is 02', () => {
      while (days <= februaryDays) {
        assert.ok(generalHelper.isDateValid(days, '02', '2000'));
        days++;
      }
    });

    it('should return true for all 28 days in February and month is 1', () => {
      while (days <= februaryDays) {
        assert.ok(generalHelper.isDateValid(days, '2', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in March and month is 03', () => {
      while (days <= marchDays) {
        assert.ok(generalHelper.isDateValid(days, '03', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in March and month is 3', () => {
      while (days <= marchDays) {
        assert.ok(generalHelper.isDateValid(days, '3', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in April and month is 04', () => {
      while (days <= aprilDays) {
        assert.ok(generalHelper.isDateValid(days, '04', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in April and month is 4', () => {
      while (days <= aprilDays) {
        assert.ok(generalHelper.isDateValid(days, '4', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in May and month is 05', () => {
      while (days <= mayDays) {
        assert.ok(generalHelper.isDateValid(days, '05', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in May and month is 5', () => {
      while (days <= mayDays) {
        assert.ok(generalHelper.isDateValid(days, '5', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in June and month is 06', () => {
      while (days <= juneDays) {
        assert.ok(generalHelper.isDateValid(days, '06', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in June and month is 6', () => {
      while (days <= juneDays) {
        assert.ok(generalHelper.isDateValid(days, '6', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in June and month is 07', () => {
      while (days <= juneDays) {
        assert.ok(generalHelper.isDateValid(days, '07', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in June and month is 7', () => {
      while (days <= juneDays) {
        assert.ok(generalHelper.isDateValid(days, '7', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in July and month is 08', () => {
      while (days <= julyDays) {
        assert.ok(generalHelper.isDateValid(days, '07', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in July and month is 8', () => {
      while (days <= julyDays) {
        assert.ok(generalHelper.isDateValid(days, '7', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in September and month is 09', () => {
      while (days <= septemberDays) {
        assert.ok(generalHelper.isDateValid(days, '09', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in September and month is 9', () => {
      while (days <= septemberDays) {
        assert.ok(generalHelper.isDateValid(days, '9', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in October and month is 10', () => {
      while (days <= octoberDays) {
        assert.ok(generalHelper.isDateValid(days, '10', '2000'));
        days++;
      }
    });

    it('should return true for all 30 days in November and month is 11', () => {
      while (days <= novemberDays) {
        assert.ok(generalHelper.isDateValid(days, '11', '2000'));
        days++;
      }
    });

    it('should return true for all 31 days in December and month is 12', () => {
      while (days <= decemberDays) {
        assert.ok(generalHelper.isDateValid(days, '12', '2000'));
        days++;
      }
    });

    it('should return true for valid leap year date ', () => {
      assert.ok(generalHelper.isDateValid('29', '02', '2012'));
    });

    it('should return false for invalid leap year date ', () => {
      assert.notOk(generalHelper.isDateValid('29', '02', '2011'));
    });
  });

  describe(' isFutureMonthYear ', () => {
    it('should return true when + 1 year', () => {
      mockdate.set(new Date('2020-01-01'));
      assert.isTrue(generalHelper.isFutureMonthYear('01', '2021'));
      mockdate.reset();
    });

    it('should return true when + 1 month', () => {
      mockdate.set(new Date('2020-01-01'));
      assert.isTrue(generalHelper.isFutureMonthYear('02', '2020'));
      mockdate.reset();
    });

    it('should return true when + 1 year and + 1 month and is across 2 years', () => {
      mockdate.set(new Date('2020-12-31'));
      assert.isTrue(generalHelper.isFutureMonthYear('01', '2021'));
      mockdate.reset();
    });

    it('should return false when same month and year', () => {
      mockdate.set(new Date('2020-01-01'));
      assert.isFalse(generalHelper.isFutureMonthYear('01', '2020'));
      mockdate.reset();
    });

    it('should return false when - 1 month', () => {
      mockdate.set(new Date('2020-02-01'));
      assert.isFalse(generalHelper.isFutureMonthYear('01', '2020'));
      mockdate.reset();
    });

    it('should return false when - 1 year', () => {
      mockdate.set(new Date('2020-02-01'));
      assert.isFalse(generalHelper.isFutureMonthYear('01', '2019'));
      mockdate.reset();
    });

    it('should return false when - 1 year and - 1 month and is across 2 years', () => {
      mockdate.set(new Date('2021-01-01'));
      assert.isFalse(generalHelper.isFutureMonthYear('12', '2020'));
      mockdate.reset();
    });
  });

  describe(' isDateAfterToday ', () => {
    it('should return true for day + 1 years', () => {
      assert.isTrue(generalHelper.isDateAfterToday('5', '5', currentYear + 1));
    });

    it('should return false as date is before today', () => {
      mockdate.set(new Date('2018-03-15'));
      assert.isFalse(generalHelper.isDateAfterToday('14', '3', '2018'));
      mockdate.reset();
    });

    it('should return false as date is equel to today', () => {
      mockdate.set(new Date('2018-03-15'));
      assert.isFalse(generalHelper.isDateAfterToday('15', '3', '2018'));
      mockdate.reset();
    });

    it('should return true as date is after today', () => {
      mockdate.set(new Date('2018-03-15'));
      assert.isTrue(generalHelper.isDateAfterToday('16', '3', '2018'));
      mockdate.reset();
    });
  });

  describe(' isThisUndefinedOrEmtpy ', () => {
    it('should return true when undefined is passed', () => {
      assert.ok(generalHelper.isThisUndefinedOrEmtpy(undefined));
    });
  });

  describe(' isThisDefined ', () => {
    it('should return false when undefined is passed', () => {
      assert.notOk(generalHelper.isThisDefined(undefined));
    });

    it('should return true when string is passed', () => {
      assert.ok(generalHelper.isThisDefined('string'));
    });
  });

  describe(' checkInviteKeyCharacters ', () => {
    it('should return false when a single space is supplied', () => {
      assert.isFalse(generalHelper.checkInviteKeyCharacters(' '));
    });

    it('should return false when multiple spaces are supplied', () => {
      assert.isFalse(generalHelper.checkInviteKeyCharacters('     '));
    });

    it('should return false when invalid characters supplied', () => {
      assert.isFalse(generalHelper.checkInviteKeyCharacters('INVITECODE!!!!'));
    });

    it('should return true when valid upper case characters supplied', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('INVITECODE'));
    });

    it('should return true when valid lower case characters supplied', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('invitecode'));
    });

    it('should return true when valid characters supplied with spaces at start', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('  INVITECODE'));
    });

    it('should return true when valid characters supplied with spaces at end', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('INVITECODE   '));
    });

    it('should return true when valid characters supplied with spaces in middle', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('INV  ITE'));
    });

    it('should return true when valid characters supplied with spaces at start and end', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('   INVITECODE   '));
    });

    it('should return true when valid characters supplied with spaces extreme ', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('   I   N   V I T E  C  O  D         E   '));
    });
  });

  describe(' checkSurnameCharacters ', () => {
    it('should return true when name is slanted aspostrophe is supplied', () => {
      assert.isTrue(generalHelper.checkSurnameCharacters('P ’hil '));
    });
  });

  describe('checkIfValidAsciiCode32to127', () => {
    const tests = '\\!"#$%&\'()*+,-./@[]^_`{|}~:;<=>?';
    const testArray = tests.split('');
    testArray.forEach((test) => {
      it(`should return true for ${test} args`, () => {
        assert.isTrue(generalHelper.checkIfValidAsciiCode32to127(basicText + test));
      });
    });
  });

  describe('Roll Number validation', () => {
    const tests = {
      valid: [
        { args: '/' },
        { args: '.' },
        { args: ',' },
        { args: '45454' },
        { args: '-' },
        { args: '\'' },
        { args: '(' },
        { args: ')' },
        { args: '*' },
        { args: ' ' },
        { args: '&' },
        { args: ' ’' },
      ],
      invalid: [
        { args: '|' },
        { args: '#' },
        { args: '\\' },
        { args: '{' },
        { args: '}' },
        { args: '~' },
        { args: '$' },
        { args: ';' },
        { args: ':' },
        { args: '?' },
        { args: '!' },
        { args: '@' },
        { args: '%' },
        { args: '^' },
        { args: '"' },
        { args: '£' },
        { args: '\n' },
        { args: '\r' },
      ],
    };

    tests.valid.forEach((test) => {
      it(`should return true for ${test.args} args`, () => {
        assert.isTrue(generalHelper.checkIfValidRollNumber(basicText + test.args));
      });
    });

    tests.invalid.forEach((test) => {
      it(`should return false for ${test.args} args`, () => {
        assert.isFalse(generalHelper.checkIfValidRollNumber(basicText + test.args));
      });
    });
  });

  describe('checkIfGreaterThenThirtyFive', () => {
    it('should return true when string length greater than 35', () => {
      const thirtySix = 'qwertyuiopasdfghjklzxcvbnmqwertyuiop';
      assert.isTrue(generalHelper.checkIfGreaterThenThirtyFive(thirtySix));
    });

    it('should return false when string length is 35', () => {
      const thirtyFive = 'qwertyuiopasdfghjklzxcvbnmqwertyuio';
      assert.isFalse(generalHelper.checkIfGreaterThenThirtyFive(thirtyFive));
    });

    it('should return false when string length is 34', () => {
      const thirtyFour = 'qwertyuiopasdfghjklzxcvbnmqwertyuio';
      assert.isFalse(generalHelper.checkIfGreaterThenThirtyFive(thirtyFour));
    });
  });

  describe('postcodeRegEx', () => {
    // Just checking basic formatting here as RegEx used is a DWP approved pattern
    it('should return true when postcode is valid with space', () => {
      assert.isTrue(generalHelper.isValidUkPostcode('NE1 1ET'));
      assert.isTrue(generalHelper.isValidUkPostcode('ne1 1et'));
    });

    it('should return true when postcode is valid with no space', () => {
      assert.isTrue(generalHelper.isValidUkPostcode('NE11ET'));
      assert.isTrue(generalHelper.isValidUkPostcode('ne11et'));
    });

    it('should return false when postcode is empty', () => {
      assert.isFalse(generalHelper.isValidUkPostcode(''));
    });

    it('should return false when postcode is not a postcode', () => {
      assert.isFalse(generalHelper.isValidUkPostcode('@'));
    });
  });

  describe('checkIfValidBuildingNameNumber', () => {
    const validArray = '., \u2019\'-'.split('');
    const invalidArray = '\\!"#$%&()*+/@[]^_{|}~:;<=>?'.split('');

    it('should return true when building name', () => {
      assert.isTrue(generalHelper.checkIfValidBuildingNameNumber('The building'));
    });

    it('should return true when building number', () => {
      assert.isTrue(generalHelper.checkIfValidBuildingNameNumber('3'));
    });

    validArray.forEach((char) => {
      it(`should return true when a valid special character is in between (${char})`, () => {
        assert.isTrue(generalHelper.checkIfValidBuildingNameNumber(basicText + char + basicText));
      });

      it(`should return false when a valid special character is first (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidBuildingNameNumber(char + basicText));
      });

      it(`should return false when a valid special character is last (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidBuildingNameNumber(basicText + char));
      });

      it(`should return false when repeating valid special characters are between (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidBuildingNameNumber(basicText + char + char + basicText));
      });

      it(`should return false when valid special character only (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidBuildingNameNumber(char));
      });
    });

    invalidArray.forEach((char) => {
      it(`should return false when a invalid special character is in between (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidBuildingNameNumber(basicText + char + basicText));
      });
    });
  });

  describe('checkIfValidStreet', () => {
    const validArray = '., \u2019\'-'.split('');
    const invalidArray = '\\!"#$%&()*+/@[]^_{|}~:;<=>?'.split('');

    it('should return true when letters', () => {
      assert.isTrue(generalHelper.checkIfValidStreet('Street close'));
    });

    it('should return false when a number', () => {
      assert.isFalse(generalHelper.checkIfValidStreet('3'));
    });

    validArray.forEach((char) => {
      it(`should return true when a valid special character is in between (${char})`, () => {
        assert.isTrue(generalHelper.checkIfValidStreet(basicText + char + basicText));
      });

      it(`should return false when a valid special character is first (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidStreet(char + basicText));
      });

      it(`should return false when a valid special character is last (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidStreet(basicText + char));
      });

      it(`should return false when repeating valid special characters are between (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidStreet(basicText + char + char + basicText));
      });

      it(`should return false when valid special character only (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidStreet(char));
      });
    });

    invalidArray.forEach((char) => {
      it(`should return false when a invalid special character is in between (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidStreet(basicText + char + basicText));
      });
    });
  });

  describe('checkIfValidTown', () => {
    const validArray = '. \u2019\'-'.split('');
    const invalidArray = '\\,!"#$%&()*+/@[]^_{|}~:;<=>?'.split('');

    it('should return true when letters', () => {
      assert.isTrue(generalHelper.checkIfValidTown('Street close'));
    });

    it('should return false when a number', () => {
      assert.isFalse(generalHelper.checkIfValidTown('3'));
    });

    validArray.forEach((char) => {
      it(`should return true when a valid special character is in between (${char})`, () => {
        assert.isTrue(generalHelper.checkIfValidTown(basicText + char + basicText));
      });

      it(`should return false when a valid special character is first (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidTown(char + basicText));
      });

      it(`should return false when a valid special character is last (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidTown(basicText + char));
      });

      it(`should return false when repeating valid special characters are between (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidTown(basicText + char + char + basicText));
      });

      it(`should return false when valid special character only (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidTown(char));
      });
    });

    invalidArray.forEach((char) => {
      it(`should return false when a invalid special character is in between (${char})`, () => {
        assert.isFalse(generalHelper.checkIfValidTown(basicText + char + basicText));
      });
    });
  });
});
