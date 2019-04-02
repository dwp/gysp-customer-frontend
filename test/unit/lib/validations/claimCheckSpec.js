const { assert } = require('chai');
const validation = require('../../../../lib/validations/claimCheck');

const singleValidSession = {
  'lived-abroad': { livedAbroad: true },
  'lived-abroad-countries': true,
  'worked-abroad': false,
  'marital-select': { maritalStatus: 'single' },
  'contact-details': true,
  'account-details': true,
};

const marriedValidSession = {
  'lived-abroad': { livedAbroad: true },
  'lived-abroad-countries': true,
  'worked-abroad': false,
  'marital-select': { maritalStatus: 'married' },
  'marital-date-married': true,
  'marital-partner-married': true,
  'contact-details': true,
  'account-details': true,
};

let tearDownSession = {};

describe('Claim check ', () => {
  beforeEach((done) => {
    tearDownSession = {
      'lived-abroad': { livedAbroad: true },
      'lived-abroad-countries': true,
      'worked-abroad': { workedAbroad: true },
      'worked-abroad-countries': true,
      'marital-select': { maritalStatus: 'married' },
      'marital-date-married': true,
      'marital-partner-married': true,
      'contact-details': true,
      'account-details': true,
      'account-details-overseas': true,
      isOverseas: false,
    };
    done();
  });
  it('should return true if valid session single is supplied', () => {
    const claimCheck = validation.data(singleValidSession);
    assert.isOk(claimCheck);
  });

  it('should return true if valid session married ', () => {
    const claimCheck = validation.data(marriedValidSession);
    assert.isOk(claimCheck);
  });

  it('should no error if lived-abroad-countries is not in session but lived-abroad is false ', () => {
    delete tearDownSession['lived-abroad-countries'];
    tearDownSession['lived-abroad'].livedAbroad = false;
    const claimCheck = validation.data(tearDownSession);
    assert.isOk(claimCheck);
  });

  it('should return false if account-details is not in session ', () => {
    delete tearDownSession['account-details'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if contact-details is not in session ', () => {
    delete tearDownSession['contact-details'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if marital-partner-married is not in session ', () => {
    delete tearDownSession['marital-partner-married'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if marital-date-married is not in session ', () => {
    delete tearDownSession['marital-date-married'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if marital-select is not in session ', () => {
    delete tearDownSession['marital-select'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if lived-abroad-countries is not in session ', () => {
    delete tearDownSession['lived-abroad-countries'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if lived-abroad is not in session ', () => {
    delete tearDownSession['lived-abroad'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if worked-abroad is not in session ', () => {
    delete tearDownSession['worked-abroad'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return false if worked-abroad-countries is not in session but worked-abroad is true ', () => {
    tearDownSession['worked-abroad'].workedAbroad = true;
    delete tearDownSession['worked-abroad-countries'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return true as lived-abroad is not in session but isOverseas is true', () => {
    tearDownSession.isOverseas = true;
    const claimCheck = validation.data(tearDownSession);
    assert.isOk(claimCheck);
  });

  it('should return false as lived-abroad-countries is not in session but isOverseas is true', () => {
    tearDownSession.isOverseas = true;
    delete tearDownSession['lived-abroad-countries'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });

  it('should return true as isOverseas is true and account-details-overseas is in session', () => {
    tearDownSession.isOverseas = true;
    delete tearDownSession['account-details'];
    const claimCheck = validation.data(tearDownSession);
    assert.isOk(claimCheck);
  });

  it('should return false as isOverseas is true but account-details-overseas is not in session', () => {
    tearDownSession.isOverseas = true;
    delete tearDownSession['account-details'];
    delete tearDownSession['account-details-overseas'];
    const claimCheck = validation.data(tearDownSession);
    assert.isNotOk(claimCheck);
  });
});
