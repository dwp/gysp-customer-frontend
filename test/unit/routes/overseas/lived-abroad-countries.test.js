const { assert } = require('chai');

const overseasController = require('../../../../app/routes/overseas/lived/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const sessionRequest = { session: { 'lived-abroad-countries': true }, body: {} };
const sessionOverseasRequest = { session: { 'lived-abroad-countries': true, isOverseas: true }, body: {} };
const populatedRequestEmpty = {
  session: {},
  body: {
    'country-name[0]': '', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValid = {
  session: {},
  body: {
    'country-name[0]': 'France', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValidNoneResPostSpa = {
  session: { isBeforeSpa: false },
  body: {
    'country-name[0]': 'Afghanistan', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValidNoneRes = {
  session: { isBeforeSpa: true },
  body: {
    'country-name[0]': 'Afghanistan', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const populatedRequestValidNoneResEdit = {
  session: { editSection: 'lived-abroad', isBeforeSpa: true },
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
  session: { isBeforeSpa: true },
  body: {
    hats: true, 'country-name[0]': 'France', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};

const countrySession = {
  params: { country: 'france' },
  session: { 'lived-abroad-countries-details': [{ country: 'France', url: 'france' }] },
  body: {
    'country-name[0]': 'France', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
  },
};
const countrySessionWithValidPost = {
  params: { country: 'france' },
  session: { 'lived-abroad-countries-details': [{ country: 'France', url: 'france' }] },
  body: {
    dateToMonth: '01', dateToYear: '2010', dateFromMonth: '01', dateFromYear: '2009',
  },
};
const countrySessionWithValidPostAndSecondCountry = {
  params: { country: 'france' },
  session: { 'lived-abroad-countries-details': [{ country: 'France', url: 'france' }, { country: 'Germany', url: 'germany' }] },
  body: {
    dateToMonth: '01', dateToYear: '2010', dateFromMonth: '01', dateFromYear: '2009',
  },
};
const countrySessionWithValidPostEdit = {
  params: { country: 'france' },
  session: { editSection: 'lived-abroad', 'lived-abroad-countries-details': [{ country: 'France', url: 'france' }] },
  body: {
    dateToMonth: '01', dateToYear: '2010', dateFromMonth: '01', dateFromYear: '2009',
  },
};

const countryList = require('../../../resource/countries.json');

describe('Overseas controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' whatCountriesHaveYouLivedInGet function (GET /what-countries-have-you-lived-in)', () => {
    it('should return view name when called with no view session data', (done) => {
      overseasController.whatCountriesHaveYouLivedInGet(emptyRequest, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      assert.isUndefined(genericResponse.data.details);
      done();
    });

    it('should return view name when called with view session data when session is populated', (done) => {
      overseasController.whatCountriesHaveYouLivedInGet(sessionRequest, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' whatCountriesHaveYouLivedInPost function (POST /what-countries-have-you-lived-in)', () => {
    it('should return default view name when called', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestEmpty, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      done();
    });

    it('should return default view with error when invalid country supplied', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestInvalid, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      done();
    });

    it('should return redirect to France when valid country used', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestValid, genericResponse, countryList);
      assert.equal(genericResponse.address, '/when-did-you-live-in-france');
      assert.equal(populatedRequestValid.session['lived-abroad-countries']['country-name[0]'], 'France');
      done();
    });

    it('should return redirect to worked when a single country is selected and is not insurance or res and is before spa', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestValidNoneRes, genericResponse, countryList);
      assert.equal(genericResponse.address, '/have-you-worked-outside-of-the-uk');
      assert.equal(populatedRequestValid.session['lived-abroad-countries']['country-name[0]'], 'France');
      done();
    });

    it('should return redirect to when did you live in when not insurance or res and is post spa', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestValidNoneResPostSpa, genericResponse, countryList);
      assert.equal(genericResponse.address, '/when-did-you-live-in-afghanistan');
      assert.equal(populatedRequestValidNoneResPostSpa.session['lived-abroad-countries']['country-name[0]'], 'Afghanistan');
      done();
    });

    it('should return redirect to check and change when a single country is selected and is not insurance or res and in edit mode and is before spa', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestValidNoneResEdit, genericResponse, countryList);
      assert.equal(genericResponse.address, '/check-your-details');
      assert.equal(populatedRequestValid.session['lived-abroad-countries']['country-name[0]'], 'France');
      done();
    });

    it('should filter out any post items that are not allowed and redirect to France', (done) => {
      overseasController.whatCountriesHaveYouLivedInPost(populatedRequestMoreFields, genericResponse, countryList);
      assert.equal(genericResponse.address, '/when-did-you-live-in-france');
      assert.equal(populatedRequestMoreFields.session['lived-abroad-countries']['country-name[0]'], 'France');
      assert.isUndefined(populatedRequestMoreFields.session['lived-abroad-countries'].hats);
      done();
    });
  });

  describe(' whatCountriesHaveYouLivedInGet function (GET /where-have-you-lived-outside-the-uk)', () => {
    it('should return view name when called with no view session data', (done) => {
      overseasController.whatCountriesHaveYouLivedInGet(emptyRequest, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      assert.isUndefined(genericResponse.data.details);
      done();
    });

    it('should return view name when called with view session data when session is populated', (done) => {
      overseasController.whatCountriesHaveYouLivedInGet(sessionOverseasRequest, genericResponse, countryList);
      assert.equal(genericResponse.viewName, 'pages/country-select');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' whenDidYouLiveGet function (GET /when-did-you-live-in-:country)', () => {
    it('should return view with country when valid currenty is supplied', (done) => {
      overseasController.whenDidYouLiveGet(countrySession, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/lived-abroad-country');
      assert.deepEqual(genericResponse.data.country, { country: 'France', url: 'france' });
      done();
    });
  });

  describe(' whenDidYouLivePost function (POST /when-did-you-live-in-:country)', () => {
    it('should return view with country when valid currenty is supplied but form error is present', (done) => {
      overseasController.whenDidYouLivePost(countrySession, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/lived-abroad-country');
      assert.deepEqual(genericResponse.data.country, { country: 'France', url: 'france' });
      done();
    });

    it('should return redirect to have you worked outside of the uk when valid details are used', (done) => {
      overseasController.whenDidYouLivePost(countrySessionWithValidPost, genericResponse);
      assert.equal(genericResponse.address, '/have-you-worked-outside-of-the-uk');
      assert.equal(countrySessionWithValidPost.session['lived-abroad-countries-details'][0].country, 'France');
      done();
    });

    it('should return redirect to have you worked outside of the uk when valid second details are used', (done) => {
      overseasController.whenDidYouLivePost(countrySessionWithValidPostAndSecondCountry, genericResponse);
      assert.equal(genericResponse.address, '/when-did-you-live-in-germany');
      done();
    });

    it('should return redirect to check and change when valid details are used and in edit mode', (done) => {
      overseasController.whenDidYouLivePost(countrySessionWithValidPostEdit, genericResponse);
      assert.equal(genericResponse.address, '/check-your-details');
      done();
    });
  });
});
