const { assert } = require('chai');

const overseasController = require('../../../../app/routes/overseas/worked/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const sessionRequest = { session: { 'worked-abroad-countries': true }, body: {} };
const populatedRequestEmpty = {
  session: {},
  body: {
    'country-name[0]': '', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValid = {
  session: {},
  body: {
    'country-name[0]': 'Australia', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValidWithInsurance = {
  session: {},
  body: {
    'country-name[0]': 'Austria', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValidWithoutInsuranceEdit = {
  session: { editSection: 'worked-abroad' },
  body: {
    'country-name[0]': 'Afghanistan', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestInvalid = {
  session: {},
  body: {
    'country-name[0]': 'France2', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestMoreFields = {
  session: {},
  body: {
    hats: true, 'country-name[0]': 'Australia', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};

const countryList = require('../../../resource/countries.json');

const countrySession = {
  params: { country: 'Austria' },
  session: { 'worked-abroad-countries-details': [{ country: 'Austria', url: 'Austria' }] },
  body: {
    'country-name[0]': 'Austria', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const countrySessionWithValidPostEmptyPost = {
  params: { country: 'austria' },
  session: { 'worked-abroad-countries-details': [{ country: 'Austria', url: 'austria' }] },
  body: {
    dateToMonth: '', dateToYear: '', dateFromMonth: '', dateFromYear: '', referenceNumber: '',
  },
};
const countrySessionWithValidPost = {
  params: { country: 'austria' },
  session: { 'worked-abroad-countries-details': [{ country: 'Austria', url: 'austria' }] },
  body: {
    dateToMonth: '01', dateToYear: '2010', dateFromMonth: '01', dateFromYear: '2009', referenceNumber: 'AA',
  },
};
const countrySessionWithValidPostAndSecondCountry = {
  params: { country: 'austria' },
  session: { 'worked-abroad-countries-details': [{ country: 'AAustria', url: 'austria' }, { country: 'Canada', url: 'canada' }] },
  body: {
    dateToMonth: '01', dateToYear: '2010', dateFromMonth: '01', dateFromYear: '2009', referenceNumber: 'AA',
  },
};
const countrySessionWithValidPostEdit = {
  params: { country: 'austria' },
  session: { editSection: 'worked-abroad', 'worked-abroad-countries-details': [{ country: 'Austria', url: 'austria' }] },
  body: {
    dateToMonth: '01', dateToYear: '2010', dateFromMonth: '01', dateFromYear: '2009', referenceNumber: 'AA',
  },
};

describe('Overseas controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' whatCountriesHaveYouWorkedInGet function (GET /what-countries-have-you-worked-in)', () => {
    it('should return view name when called with no view session data', (done) => {
      overseasController.whatCountriesHaveYouWorkedInGet(emptyRequest, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      assert.isUndefined(genericResponse.data.details);
      done();
    });
    it('should return view name when called with view session data when session is populated', (done) => {
      overseasController.whatCountriesHaveYouWorkedInGet(sessionRequest, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' whatCountriesHaveYouLivedInPost function (POST /what-countries-have-you-worked-in)', () => {
    it('should return default view name when called', (done) => {
      overseasController.whatCountriesHaveYouWorkedInPost(populatedRequestEmpty, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      done();
    });

    it('should return default view with error when invalid country supplied', (done) => {
      overseasController.whatCountriesHaveYouWorkedInPost(populatedRequestInvalid, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      done();
    });

    it('should return redirect to marital status page when valid country used', (done) => {
      overseasController.whatCountriesHaveYouWorkedInPost(populatedRequestValid, genericResponse, countryList);
      assert.equal(genericResponse.address, 'what-is-your-current-marital-status');
      assert.equal(populatedRequestValid.session['worked-abroad-countries']['country-name[0]'], 'Australia');
      done();
    });

    it('should return redirect to Austria when valid country used', (done) => {
      overseasController.whatCountriesHaveYouWorkedInPost(populatedRequestValidWithInsurance, genericResponse, countryList);
      assert.equal(genericResponse.address, '/when-did-you-work-in-austria');
      assert.equal(populatedRequestValidWithInsurance.session['worked-abroad-countries']['country-name[0]'], 'Austria');
      done();
    });

    it('should return redirect to check and change when a single country is selected and is not insurance and in edit mode', (done) => {
      overseasController.whatCountriesHaveYouWorkedInPost(populatedRequestValidWithoutInsuranceEdit, genericResponse, countryList);
      assert.equal(genericResponse.address, '/check-your-details');
      assert.equal(populatedRequestValid.session['worked-abroad-countries']['country-name[0]'], 'Australia');
      done();
    });

    it('should filter out any post items that are not allowed', (done) => {
      overseasController.whatCountriesHaveYouWorkedInPost(populatedRequestMoreFields, genericResponse, countryList);
      assert.equal(genericResponse.address, 'what-is-your-current-marital-status');
      assert.equal(populatedRequestMoreFields.session['worked-abroad-countries']['country-name[0]'], 'Australia');
      assert.isUndefined(populatedRequestMoreFields.session['worked-abroad-countries'].hats);
      done();
    });
  });

  describe(' whenDidYouWorkGet function (GET /when-did-you-work-in-:country)', () => {
    it('should return view with country when valid currenty is supplied', (done) => {
      overseasController.whenDidYouWorkGet(countrySession, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/worked-abroad-country');
      assert.deepEqual(genericResponse.data.country, { country: 'Austria', url: 'Austria' });
      done();
    });
  });

  describe(' whenDidYouWorkPost function (POST /when-did-you-work-in-:country)', () => {
    it('should return view with country when valid currenty is supplied but form error is present', (done) => {
      overseasController.whenDidYouWorkPost(countrySessionWithValidPostEmptyPost, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/worked-abroad-country');
      assert.deepEqual(genericResponse.data.country, { country: 'Austria', url: 'austria' });
      done();
    });
    it('should return redirect to have you worked outside of the uk when valid details are used', (done) => {
      overseasController.whenDidYouWorkPost(countrySessionWithValidPost, genericResponse);
      assert.equal(genericResponse.address, '/what-is-your-current-marital-status');
      assert.equal(countrySessionWithValidPost.session['worked-abroad-countries-details'][0].country, 'Austria');
      done();
    });
    it('should return redirect to have you worked outside of the uk when valid second details are used', (done) => {
      overseasController.whenDidYouWorkPost(countrySessionWithValidPostAndSecondCountry, genericResponse);
      assert.equal(genericResponse.address, '/when-did-you-work-in-canada');
      done();
    });
    it('should return redirect to check and change when valid details are used and in edit mode', (done) => {
      overseasController.whenDidYouWorkPost(countrySessionWithValidPostEdit, genericResponse);
      assert.equal(genericResponse.address, '/check-your-details');
      done();
    });
  });
});
