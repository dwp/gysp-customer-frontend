const { assert } = require('chai');
const { cleanSortCode } = require('../../../../lib/utils/sortCode');

describe('sortCode', () => {
  describe('function: cleanSortCode', () => {
    it('should return sort code without spaces when a string is given: 11 22 33 variant', () => {
      const sortCode = '11 22 33';
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, '112233');
    });

    it('should return sort code without spaces when a string is given: 11 2 233 variant', () => {
      const sortCode = '11 2 233';
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, '112233');
    });

    it('should return sort code without hyphens when a string is given: 11-22-33 variant', () => {
      const sortCode = '11-22-33';
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, '112233');
    });

    it('should return sort code without hyphens when a string is given: 11-2-2-33 variant', () => {
      const sortCode = '11-2-2-33';
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, '112233');
    });

    it('should return sort code without spaces and hyphens when a string is given: 11 2-2-33 variant', () => {
      const sortCode = '11 2-2-33';
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, '112233');
    });

    it('should return what has been passed in if something other than a string (number) is passed in', () => {
      const sortCode = 112233;
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, 112233);
    });

    it('should return what has been passed in if something other than a string (undefined) is passed in', () => {
      const sortCode = undefined;
      const cleaned = cleanSortCode(sortCode);
      assert.equal(cleaned, undefined);
    });
  });
});
