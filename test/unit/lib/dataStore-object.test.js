const { assert } = require('chai');
const dataStore = require('../../../lib/dataStore');

const req = { session: {} };
const editModeTrue = true;

describe('Data store object', () => {
  it('save should add to object', () => {
    const response = dataStore.save(req, 'test', { data: true });
    assert.equal(response, true);
    assert.equal(req.session.test.data, true);
  });

  it('get should return object', () => {
    const response = dataStore.get(req, 'test');
    assert.equal(response.data, true);
  });

  it('getAll should return object', () => {
    dataStore.save(req, 'test2', { data: true });
    const response = dataStore.getAll(req);
    assert.equal(response.test.data, true);
    assert.equal(response.test2.data, true);
  });

  describe(' checkAndSave when populated living abroad', () => {
    beforeEach(() => {
      req.session = { 'worked-abroad-countries-details': [{ name: 'a', url: 'a', data: { val1: 1, val2: 2 } }, { name: 'b', url: 'b', data: { val1: 1, val2: 2 } }, { name: 'c', url: 'c', data: { val1: 1, val2: 2 } }, { name: 'd', url: 'd', data: { val1: 1, val2: 2 } }] };
    });

    it('checkAndSaveCountryIndividual should clear out details after first country has changed', () => {
      dataStore.checkAndSaveCountryIndividual(req, 'worked-abroad-countries-details', 0, { val1: 2, val2: 3 }, false);
      assert.equal(req.session['worked-abroad-countries-details'][0].name, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val1, 2);
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val2, 3);
      assert.isUndefined(req.session['worked-abroad-countries-details'][1].data);
      assert.isUndefined(req.session['worked-abroad-countries-details'][2].data);
      assert.isUndefined(req.session['worked-abroad-countries-details'][3].data);
    });

    it('checkAndSaveCountryIndividual should clear out details after second country has changed', () => {
      dataStore.checkAndSaveCountryIndividual(req, 'worked-abroad-countries-details', 1, { val1: 2, val2: 3 }, false);
      assert.equal(req.session['worked-abroad-countries-details'][0].name, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][1].name, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].url, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val1, 2);
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val2, 3);
      assert.isUndefined(req.session['worked-abroad-countries-details'][2].data);
      assert.isUndefined(req.session['worked-abroad-countries-details'][3].data);
    });

    it('checkAndSaveCountryIndividual should clear out details after third country has changed', () => {
      dataStore.checkAndSaveCountryIndividual(req, 'worked-abroad-countries-details', 2, { val1: 2, val2: 3 }, false);
      assert.equal(req.session['worked-abroad-countries-details'][0].name, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][1].name, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].url, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][2].name, 'c');
      assert.equal(req.session['worked-abroad-countries-details'][2].url, 'c');
      assert.equal(req.session['worked-abroad-countries-details'][2].data.val1, 2);
      assert.equal(req.session['worked-abroad-countries-details'][2].data.val2, 3);
      assert.isUndefined(req.session['worked-abroad-countries-details'][3].data);
    });

    it('checkAndSaveCountryIndividual should clear out details after fourth country has changed', () => {
      dataStore.checkAndSaveCountryIndividual(req, 'worked-abroad-countries-details', 3, { val1: 2, val2: 3 }, false);
      assert.equal(req.session['worked-abroad-countries-details'][0].name, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][1].name, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].url, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][2].name, 'c');
      assert.equal(req.session['worked-abroad-countries-details'][2].url, 'c');
      assert.equal(req.session['worked-abroad-countries-details'][2].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][2].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][3].name, 'd');
      assert.equal(req.session['worked-abroad-countries-details'][3].url, 'd');
      assert.equal(req.session['worked-abroad-countries-details'][3].data.val1, 2);
      assert.equal(req.session['worked-abroad-countries-details'][3].data.val2, 3);
    });

    it('checkAndSaveCountryIndividual should not clear out details when in edit mode', () => {
      dataStore.checkAndSaveCountryIndividual(req, 'worked-abroad-countries-details', 0, { val1: 2, val2: 3 }, true);
      assert.equal(req.session['worked-abroad-countries-details'][0].name, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val1, 2);
      assert.equal(req.session['worked-abroad-countries-details'][0].data.val2, 3);
      assert.equal(req.session['worked-abroad-countries-details'][1].name, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].url, 'b');
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][1].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][2].name, 'c');
      assert.equal(req.session['worked-abroad-countries-details'][2].url, 'c');
      assert.equal(req.session['worked-abroad-countries-details'][2].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][2].data.val2, 2);
      assert.equal(req.session['worked-abroad-countries-details'][3].name, 'd');
      assert.equal(req.session['worked-abroad-countries-details'][3].url, 'd');
      assert.equal(req.session['worked-abroad-countries-details'][3].data.val1, 1);
      assert.equal(req.session['worked-abroad-countries-details'][3].data.val2, 2);
    });
  });

  describe(' checkAndSave when populated working abroad', () => {
    beforeEach(() => {
      req.session = { 'lived-abroad-countries-details': [{ name: 'a', url: 'a' }, { name: 'b', url: 'b' }, { name: 'c', url: 'c' }, { name: 'd', url: 'd' }] };
    });

    it('checkAndSaveCountryList should delete the session when any details are changed changed', () => {
      dataStore.checkAndSaveCountryList(req, 'lived-abroad-countries-details', [{ name: 'Z', url: 'z' }]);
      assert.equal(req.session['lived-abroad-countries-details'][0].name, 'Z');
      assert.equal(req.session['lived-abroad-countries-details'][0].url, 'z');
      assert.isUndefined(req.session['lived-abroad-countries-details'][1]);
      assert.isUndefined(req.session['lived-abroad-countries-details'][2]);
      assert.isUndefined(req.session['lived-abroad-countries-details'][3]);
    });

    it('checkAndSaveCountryList should delete session when only one thing is in session and is changed', () => {
      req.session = { 'lived-abroad-countries-details': [{ name: 'a', url: 'a' }] };

      dataStore.checkAndSaveCountryList(req, 'lived-abroad-countries-details', [{ name: 'Z', url: 'z' }]);
      assert.equal(req.session['lived-abroad-countries-details'][0].name, 'Z');
      assert.equal(req.session['lived-abroad-countries-details'][0].url, 'z');
      assert.isUndefined(req.session['lived-abroad-countries-details'][1]);
      assert.isUndefined(req.session['lived-abroad-countries-details'][2]);
      assert.isUndefined(req.session['lived-abroad-countries-details'][3]);
    });

    it('checkAndSaveCountryList should make no changes when details are provided as the same', () => {
      dataStore.checkAndSaveCountryList(req, 'lived-abroad-countries-details', [{ name: 'a', url: 'a' }, { name: 'b', url: 'b' }, { name: 'c', url: 'c' }, { name: 'd', url: 'd' }]);
      assert.equal(req.session['lived-abroad-countries-details'][0].name, 'a');
      assert.equal(req.session['lived-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['lived-abroad-countries-details'][1].name, 'b');
      assert.equal(req.session['lived-abroad-countries-details'][1].url, 'b');
      assert.equal(req.session['lived-abroad-countries-details'][2].name, 'c');
      assert.equal(req.session['lived-abroad-countries-details'][2].url, 'c');
      assert.equal(req.session['lived-abroad-countries-details'][3].name, 'd');
      assert.equal(req.session['lived-abroad-countries-details'][3].url, 'd');
    });

    it('checkAndSaveCountryList should rebuild session when in edit mode and details have changed', () => {
      req.session = { 'lived-abroad-countries-details': [{ name: 'A', url: 'a', data: 'data-a' }] };
      dataStore.checkAndSaveCountryList(req, 'lived-abroad-countries-details', [{ name: 'A', url: 'a' }, { name: 'B', url: 'b' }], editModeTrue);
      assert.equal(req.session['lived-abroad-countries-details'][0].name, 'A');
      assert.equal(req.session['lived-abroad-countries-details'][0].url, 'a');
      assert.equal(req.session['lived-abroad-countries-details'][0].data, 'data-a');
      assert.equal(req.session['lived-abroad-countries-details'][1].name, 'B');
      assert.equal(req.session['lived-abroad-countries-details'][1].url, 'b');
      assert.isUndefined(req.session['lived-abroad-countries-details'][1].data);
      assert.isUndefined(req.session['lived-abroad-countries-details'][2]);
      assert.isUndefined(req.session['lived-abroad-countries-details'][3]);
    });
  });

  describe(' checkAndSave when populated ', () => {
    beforeEach(() => {
      req.session = {
        'lived-abroad': true,
        'lived-abroad-countries': true,
        'lived-abroad-countries-details': true,
        'worked-abroad': true,
        'worked-abroad-countries': true,
        'worked-abroad-countries-details': true,
        'marital-select': true,
        'marital-date-married': true,
        'marital-partner-married': true,
        'contact-details': true,
        'account-details': true,
      };
    });

    it('should remove all session objects after lived-abroad has been changed', () => {
      dataStore.checkAndSave(req, 'lived-abroad', false);
      assert.isFalse(req.session['lived-abroad']);
      assert.isUndefined(req.session['lived-abroad-countries']);
      assert.isUndefined(req.session['lived-abroad-countries-details']);
      assert.isUndefined(req.session['worked-abroad']);
      assert.isUndefined(req.session['worked-abroad-countries']);
      assert.isUndefined(req.session['worked-abroad-countries-details']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove no session objects when lived-abroad is the same', () => {
      dataStore.checkAndSave(req, 'lived-abroad', true);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });

    it('should remove all session objects after lived-abroad-countries has been changed', () => {
      dataStore.checkAndSave(req, 'lived-abroad-countries', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isFalse(req.session['lived-abroad-countries']);
      assert.isUndefined(req.session['lived-abroad-countries-details']);
      assert.isUndefined(req.session['worked-abroad']);
      assert.isUndefined(req.session['worked-abroad-countries']);
      assert.isUndefined(req.session['worked-abroad-countries-details']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove no session objects when lived-abroad-countries is the same', () => {
      dataStore.checkAndSave(req, 'lived-abroad-countries', true);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });

    it('should remove all session objects after lived-abroad-countries-details has been changed', () => {
      dataStore.checkAndSave(req, 'lived-abroad-countries-details', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isFalse(req.session['lived-abroad-countries-details']);
      assert.isUndefined(req.session['worked-abroad']);
      assert.isUndefined(req.session['worked-abroad-countries']);
      assert.isUndefined(req.session['worked-abroad-countries-details']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove no session objects when lived-abroad-countries-details is the same', () => {
      dataStore.checkAndSave(req, 'lived-abroad-countries-details', true);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });

    it('should remove all session objects after worked-abroad has been changed', () => {
      dataStore.checkAndSave(req, 'worked-abroad', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isFalse(req.session['worked-abroad']);
      assert.isUndefined(req.session['worked-abroad-countries']);
      assert.isUndefined(req.session['worked-abroad-countries-details']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove no session objects when worked-abroad-countries is the same', () => {
      dataStore.checkAndSave(req, 'worked-abroad-countries', true);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });

    it('should remove all session details after worked-abroad-counties when it has changed', () => {
      dataStore.checkAndSave(req, 'worked-abroad-countries', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isFalse(req.session['worked-abroad-countries']);
      assert.isUndefined(req.session['worked-abroad-countries-details']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove no session objects when worked-abroad is the same', () => {
      dataStore.checkAndSave(req, 'worked-abroad', true);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });

    it('should remove no session objects when worked-abroad-countries-details is the same', () => {
      dataStore.checkAndSave(req, 'worked-abroad-countries-details', true);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });

    it('should remove all session details after worked-abroad-counties when it has changed with worked-abroad-countries-details', () => {
      dataStore.checkAndSave(req, 'worked-abroad-countries-details', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isFalse(req.session['worked-abroad-countries-details']);
      assert.isUndefined(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove only marital details and contact when marital select is provided', () => {
      dataStore.checkAndSave(req, 'marital-select', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isFalse(req.session['marital-select']);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove only partner details and contact when marital select is provided', () => {
      dataStore.checkAndSave(req, 'marital-date-married', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isFalse(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove only contact when marital parner is provided', () => {
      dataStore.checkAndSave(req, 'marital-partner-married', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isFalse(req.session['marital-partner-married']);
      assert.isUndefined(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove only account details when banking details are changed', () => {
      dataStore.checkAndSave(req, 'contact-details', false);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-select']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isFalse(req.session['contact-details']);
      assert.isUndefined(req.session['account-details']);
    });

    it('should remove nothing when contact details are provided as the same', () => {
      dataStore.checkAndSave(req, 'contact-details', true);
      assert.isTrue(req.session['lived-abroad']);
      assert.isTrue(req.session['lived-abroad-countries']);
      assert.isTrue(req.session['lived-abroad-countries-details']);
      assert.isTrue(req.session['worked-abroad']);
      assert.isTrue(req.session['worked-abroad-countries']);
      assert.isTrue(req.session['worked-abroad-countries-details']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-date-married']);
      assert.isTrue(req.session['marital-partner-married']);
      assert.isTrue(req.session['contact-details']);
      assert.isTrue(req.session['account-details']);
    });
  });

  describe(' checkAndSave when not populated ', () => {
    it('should store session when called', () => {
      req.session = {};
      dataStore.checkAndSave(req, 'lived-abroad', false);
      assert.isFalse(req.session['lived-abroad']);
    });
  });

  describe('rebuildCountryDetailsObject', () => {
    beforeEach(() => {
      req.session = { 'lived-abroad-countries-details': [{ name: 'A', url: 'a', data: 'data-a' }, { name: 'B', url: 'b', data: 'data-b' }, { name: 'C', url: 'c', data: 'data-c' }, { name: 'D', url: 'd', data: 'data-d' }] };
    });

    it('should reorder but keep pervious data if it matches', () => {
      const details = dataStore.rebuildCountryDetailsObject(req, 'lived-abroad-countries-details', [{ name: 'C', url: 'c' }, { name: 'A', url: 'a' }, { name: 'D', url: 'd' }, { name: 'B', url: 'b' }]);
      assert.equal(details[0].name, 'C');
      assert.equal(details[0].url, 'c');
      assert.equal(details[0].data, 'data-c');
      assert.equal(details[1].name, 'A');
      assert.equal(details[1].url, 'a');
      assert.equal(details[1].data, 'data-a');
      assert.equal(details[2].name, 'D');
      assert.equal(details[2].url, 'd');
      assert.equal(details[2].data, 'data-d');
      assert.equal(details[3].name, 'B');
      assert.equal(details[3].url, 'b');
      assert.equal(details[3].data, 'data-b');
    });

    it('should return without data as new countries', () => {
      req.session = { 'lived-abroad-countries-details': [{ name: 'A', url: 'a', data: 'data-a' }] };
      const details = dataStore.rebuildCountryDetailsObject(req, 'lived-abroad-countries-details', [{ name: 'B', url: 'b' }, { name: 'C', url: 'c' }]);
      assert.equal(details[0].name, 'B');
      assert.equal(details[0].url, 'b');
      assert.isUndefined(details[0].data);
      assert.equal(details[1].name, 'C');
      assert.equal(details[1].url, 'c');
      assert.isUndefined(details[1].data);
      assert.isUndefined(details[2]);
      assert.isUndefined(details[3]);
    });
  });
});
