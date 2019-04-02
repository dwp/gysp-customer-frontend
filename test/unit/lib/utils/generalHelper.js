const { assert } = require('chai');
const mockdate = require('mockdate');
const generalHelper = require('../../../../lib/validations/utils/general');

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
    it('should return false when invalid characters supplied', () => {
      assert.isFalse(generalHelper.checkInviteKeyCharacters('INVITECODE!!!!'));
    });
    it('should return true when valid characters supplied', () => {
      assert.isTrue(generalHelper.checkInviteKeyCharacters('INVITECODE'));
    });
  });
});
