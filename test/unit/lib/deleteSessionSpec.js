const { assert } = require('chai');
const deleteSession = require('../../../lib/deleteSession');

const req = { session: {} };
const reqEmpty = { session: {} };
describe('Data session', () => {
  describe(' delete all data ', () => {
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
    it('should delete all marital dates', () => {
      deleteSession.afterKey(req, 'all');
      assert.isUndefined(req.session['lived-abroad']);
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
    it('calling deleteCustomerFormData should also delete all form data', () => {
      deleteSession.deleteCustomerFormData(req);
      assert.isUndefined(req.session['lived-abroad']);
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
  });
  describe(' deletePartnerDate ', () => {
    beforeEach(() => {
      req.session = {
        'marital-date-married': true,
        'marital-date-civil': true,
        'marital-date-widowed': true,
        'marital-date-divorced': true,
        'marital-date-dissolved': true,
      };
    });

    it('should delete all marital dates', () => {
      deleteSession.deletePartnerDate(req);
      assert.isUndefined(req.session['marital-date-married']);
      assert.isUndefined(req.session['marital-date-civil']);
      assert.isUndefined(req.session['marital-date-widowed']);
      assert.isUndefined(req.session['marital-date-divorced']);
      assert.isUndefined(req.session['marital-date-dissolved']);
    });
    it('should return empty session', () => {
      deleteSession.deletePartnerDate(reqEmpty);
      assert.equal(Object.keys(reqEmpty.session).length, 0);
    });
  });
  describe(' deletePartnerDetails ', () => {
    beforeEach(() => {
      req.session = {
        'marital-partner-married': true,
        'marital-partner-civil': true,
        'marital-partner-widowed': true,
        'marital-partner-divorced': true,
        'marital-partner-dissolved': true,
      };
    });

    it('should delete all marital partner details', () => {
      deleteSession.deletePartnerDetails(req);
      assert.isUndefined(req.session['marital-partner-married']);
      assert.isUndefined(req.session['marital-partner-civil']);
      assert.isUndefined(req.session['marital-partner-widowed']);
      assert.isUndefined(req.session['marital-partner-divorced']);
      assert.isUndefined(req.session['marital-partner-dissolved']);
    });
    it('should return empty session', () => {
      deleteSession.deletePartnerDetails(reqEmpty);
      assert.equal(Object.keys(reqEmpty.session).length, 0);
    });
  });
  describe(' deletePartnerStatus ', () => {
    it('should return empty session', () => {
      deleteSession.deletePartnerStatus(reqEmpty);
      assert.equal(Object.keys(reqEmpty.session).length, 0);
    });
  });
  describe(' deleteContact ', () => {
    it('should return empty session', () => {
      deleteSession.deleteContact(reqEmpty);
      assert.equal(Object.keys(reqEmpty.session).length, 0);
    });
  });
});
