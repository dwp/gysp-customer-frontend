const assert = require('assert');

const object = require('../../../../lib/objects/countriesListObject');

const countries = [
  {
    name: 'Afghanistan',
    tokens: 123456789
  },
  {
    name: 'Zimbabwe',
    tokens: 987654321
  }
];

const countriesResponse = [
  {},
  {
    value: 'Afghanistan',
    text: 'Afghanistan',
    attributes: { 'data-aliases': '123456789' },
    selected: true
  },
  {
    value: 'Zimbabwe',
    text: 'Zimbabwe',
    attributes: { 'data-aliases': '987654321' }
  }
];

describe('Countries List object ', () => {
  describe(' formatter ', () => {
    it('should return an array of formatted county objects ', () => {
      const objectValue = object.formatter(countries, 'Afghanistan');
      assert.equal(JSON.stringify(objectValue), JSON.stringify(countriesResponse));
    });
  });
});
