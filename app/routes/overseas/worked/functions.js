const validation = require('../../../../lib/validations/overseasValidation');
const filterRequest = require('../../../../lib/utils/requestHelper');
const redirectHelper = require('../../../../lib/helpers/redirectHelper');
const dataStore = require('../../../../lib/dataStore');
const requestHelper = require('../../../../lib/helpers/requestHelper');
const countries = require('../../../../lib/validations/data/countries');
const countryHelper = require('../../../../lib/utils/countriesHelper');
const checkChangeHelper = require('../../../../lib/utils/checkChangeHelper');
const countriesListObject = require('../../../../lib/objects/countriesListObject');

const statusCodeErrorWrap = 200;
const statusCode500 = 500;
const withReferenceNumber = true;

function workedAbroadGet(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'worked-abroad');
  const errors = checkChangeHelper.setupDataAndShowErrorsMessages(req);
  const formData = dataStore.get(req, 'worked-abroad');
  res.render('pages/worked-abroad', { details: formData, errors });
}

function workedAbroadPost(req, res) {
  const editMode = checkChangeHelper.isEditMode(req, 'worked-abroad');
  const errors = validation.workedAbroad(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/worked-abroad', { errors });
  } else {
    const filteredRequest = filterRequest.requestFilter(filterRequest.workedAbroad(), req.body);
    dataStore.checkAndSave(req, 'worked-abroad', filteredRequest, editMode);
    checkChangeHelper.checkEditSectionAndClearCheckChange(req, editMode);
    const redirectUrl = redirectHelper.redirectBasedOnWorkedAbroad(req.body.workedAbroad, editMode);
    res.redirect(redirectUrl);
  }
}

function whatCountriesHaveYouWorkedInGet(req, res, countriesList) {
  const formData = dataStore.get(req, 'worked-abroad-countries');
  const countriesListFormatter = countriesListObject.formatter;
  res.render('pages/country-select', {
    countriesList, countriesListFormatter, formURL: 'what-countries-have-you-worked-in', type: 'worked', details: formData, pageSuffix: '',
  });
}

/* istanbul ignore next */
function whatCountriesHaveYouWorkedInCountriesGetCached(req, res) {
  countries.getCountryList((err, request) => {
    if (err) {
      const traceID = requestHelper.getTraceID(err);
      requestHelper.errorLoggingHelper(err, '/api/customer/countries', traceID, res.locals.logger);
      res.status(statusCodeErrorWrap);
      res.render('pages/error', { status: statusCode500 });
    } else {
      whatCountriesHaveYouWorkedInGet(req, res, request);
    }
  });
}

function whatCountriesHaveYouWorkedInPost(req, res, countriesList) {
  const errors = validation.countries(req.body, 'lived', countriesList, req.session.lang);
  if (Object.keys(errors).length > 0) {
    const countriesListFormatter = countriesListObject.formatter;
    res.render('pages/country-select', {
      details: req.body,
      countriesList,
      countriesListFormatter,
      formURL: 'what-countries-have-you-worked-in',
      type: 'worked',
      errors,
      pageSuffix: '',
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'worked-abroad');
    const filteredRequest = filterRequest.requestFilter(filterRequest.countries(), req.body);
    dataStore.checkAndSave(req, 'worked-abroad-countries', filteredRequest, editMode);
    const countryDetails = countryHelper.returnFilteredListInsuranceCountries(filteredRequest, countriesList, req.session.isBeforeSpa);
    dataStore.checkAndSaveCountryList(req, 'worked-abroad-countries-details', countryDetails, editMode);

    if (countryDetails.length > 0) {
      res.redirect(`/when-did-you-work-in-${countryDetails[0].url}`);
    } else if (editMode) {
      checkChangeHelper.clearCheckChange(req);
      res.redirect('/check-your-details');
    } else {
      res.redirect('what-is-your-current-marital-status');
    }
  }
}

/* istanbul ignore next */
function whatCountriesHaveYouWorkedInCountriesPostCached(req, res) {
  countries.getCountryList((err, request) => {
    if (err) {
      const traceID = requestHelper.getTraceID(err);
      requestHelper.errorLoggingHelper(err, '/api/customer/countries', traceID, res.locals.logger);
      res.status(statusCodeErrorWrap);
      res.render('pages/error', { status: statusCode500 });
    } else {
      whatCountriesHaveYouWorkedInPost(req, res, request);
    }
  });
}

function whenDidYouWorkGet(req, res) {
  const countryDetails = dataStore.get(req, 'worked-abroad-countries-details');
  const countryIndex = countryHelper.returnIndexOfCountry(req.params.country, countryDetails);
  const pageSuffix = req.session.isOverseas ? '-overseas' : '';
  res.render('pages/worked-abroad-country', {
    details: countryDetails[countryIndex].data,
    country: countryDetails[countryIndex],
    location: {
      current: (countryIndex + 1),
      total: countryDetails.length,
    },
    pageSuffix,
  });
}

function whenDidYouWorkPost(req, res) {
  const countryDetails = dataStore.get(req, 'worked-abroad-countries-details');
  const countryIndex = countryHelper.returnIndexOfCountry(req.params.country, countryDetails);
  const errors = validation.countryDetials(
    req.body,
    withReferenceNumber,
    countryDetails[countryIndex].name,
    `/when-did-you-work-in-${countryDetails[countryIndex].url}`,
    req.session.lang,
  );
  if (Object.keys(errors).length > 0) {
    const pageSuffix = req.session.isOverseas ? '-overseas' : '';
    res.render('pages/worked-abroad-country', {
      details: req.body,
      errors,
      country: countryDetails[countryIndex],
      location: {
        current: (countryIndex + 1),
        total: countryDetails.length,
      },
      pageSuffix,
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'worked-abroad');
    const filteredRequest = filterRequest.requestFilter(filterRequest.workedAbroadCountries(), req.body);
    dataStore.checkAndSaveCountryIndividual(req, 'worked-abroad-countries-details', countryIndex, filteredRequest, editMode);

    const nextUrl = countryIndex + 1;
    if (countryDetails[nextUrl]) {
      res.redirect(`/when-did-you-work-in-${countryDetails[nextUrl].url}`);
    } else if (editMode) {
      checkChangeHelper.clearCheckChange(req);
      res.redirect('/check-your-details');
    } else {
      res.redirect('/what-is-your-current-marital-status');
    }
  }
}

module.exports.workedAbroadGet = workedAbroadGet;
module.exports.workedAbroadPost = workedAbroadPost;

module.exports.whenDidYouWorkGet = whenDidYouWorkGet;
module.exports.whenDidYouWorkPost = whenDidYouWorkPost;

module.exports.whatCountriesHaveYouWorkedInCountriesGetCached = whatCountriesHaveYouWorkedInCountriesGetCached;
module.exports.whatCountriesHaveYouWorkedInCountriesPostCached = whatCountriesHaveYouWorkedInCountriesPostCached;

module.exports.whatCountriesHaveYouWorkedInGet = whatCountriesHaveYouWorkedInGet;
module.exports.whatCountriesHaveYouWorkedInPost = whatCountriesHaveYouWorkedInPost;
