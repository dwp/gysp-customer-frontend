const { assert } = require('chai');
const generalHelper = require('../../../../lib/validations/utils/general');

const basicText = 'BASIC';

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
    it(`should return true for ${test.args} args`, () => {
      assert.isFalse(generalHelper.checkIfValidRollNumber(basicText + test.args));
    });
  });
});
