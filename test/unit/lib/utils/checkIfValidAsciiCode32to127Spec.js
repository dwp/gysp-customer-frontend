const { assert } = require('chai');
const generalHelper = require('../../../../lib/validations/utils/general');

const basicText = 'BASIC';

describe('checkIfValidAsciiCode32to127', () => {
  const tests = '\\!"#$%&\'()*+,-./@[]^_`{|}~:;<=>?';
  const testArray = tests.split('');
  testArray.forEach((test) => {
    it(`should return true for ${test} args`, () => {
      assert.isTrue(generalHelper.checkIfValidAsciiCode32to127(basicText + test));
    });
  });
});
