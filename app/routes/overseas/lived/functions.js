const validation = require('../../../../lib/validations/overseasValidation');
const filterRequest = require('../../../../lib/utils/requestHelper');
const redirectHelper = require('../../../../lib/helpers/redirectHelper');
const requestHelper = require('../../../../lib/helpers/requestHelper');
const countries = require('../../../../lib/validations/data/countries');
const countryHelper = require('../../../../lib/utils/countriesHelper');
const checkChangeHelper = require('../../../../lib/utils/checkChangeHelper');
const countriesListObject = require('../../../../lib/objects/countriesListObject');

const dataStore = require('../../../../lib/dataStore');

const statusCodeErrorWrap = 200;
const statusCode500 = 500;

function checkNumberOfDaysBetweenSpaAndClaimFromDate(req) {
  if (req.session.numberOfDaysBetweenSpaAndClaimFromDate) {
    return req.session.numberOfDaysBetweenSpaAndClaimFromDate;
  }
  return false;
}

function livedAbroadGet(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'lived-abroad');
  const errors = checkChangeHelper.setupDataAndShowErrorsMessages(req);
  const formData = dataStore.get(req, 'lived-abroad');
  const numberOfDaysBetweenSpaAndClaimFromDate = checkNumberOfDaysBetweenSpaAndClaimFromDate(req);
  res.render('pages/lived-abroad', { details: formData, errors, numberOfDaysBetweenSpaAndClaimFromDate });
}

function livedAbroadPost(req, res) {
  const editMode = checkChangeHelper.isEditMode(req, 'lived-abroad');
  const errors = validation.livedAbroad(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/lived-abroad', { errors });
  } else {
    const filteredRequest = filterRequest.requestFilter(filterRequest.livedAbroad(), req.body);
    dataStore.checkAndSave(req, 'lived-abroad', filteredRequest, editMode);
    checkChangeHelper.checkEditSectionAndClearCheckChange(req, editMode);
    const redirectUrl = redirectHelper.redirectBasedOnLivingAbroad(req.body.livedAbroad, editMode);
    res.redirect(redirectUrl);
  }
}

function whatCountriesHaveYouLivedInGet(req, res, countriesList) {
  checkChangeHelper.checkAndSetEditMode(req, 'lived-abroad');
  const formData = dataStore.get(req, 'lived-abroad-countries');
  const pageSuffix = req.session.isOverseas ? '-overseas' : '';
  const countriesListFormatter = countriesListObject.formatter;
  res.render('pages/country-select', {
    countriesList, countriesListFormatter, formURL: 'what-countries-have-you-lived-in', type: 'lived', details: formData, pageSuffix,
  });
}

/* istanbul ignore next */
function whatCountriesHaveYouLivedInCountriesGetCached(req, res) {
  countries.getCountryList((err, request) => {
    if (err) {
      const traceID = requestHelper.getTraceID(err);
      requestHelper.errorLoggingHelper(err, '/api/customer/countries', traceID, res.locals.logger);
      res.status(statusCodeErrorWrap);
      res.render('pages/error', { status: statusCode500 });
    } else {
      whatCountriesHaveYouLivedInGet(req, res, request);
    }
  });
}

function whatCountriesHaveYouLivedInPost(req, res, countriesList) {
  const editMode = checkChangeHelper.isEditMode(req, 'lived-abroad');
  const errors = validation.countries(req.body, 'lived', countriesList);
  if (Object.keys(errors).length > 0) {
    const pageSuffix = req.session.isOverseas ? '-overseas' : '';
    const countriesListFormatter = countriesListObject.formatter;
    res.render('pages/country-select', {
      details: req.body,
      countriesList,
      countriesListFormatter,
      formURL: 'what-countries-have-you-lived-in',
      type: 'lived',
      errors,
      pageSuffix,
    });
  } else {
    const filteredRequest = filterRequest.requestFilter(filterRequest.countries(), req.body);
    dataStore.checkAndSave(req, 'lived-abroad-countries', filteredRequest, editMode);
    const countryDetails = countryHelper.returnFilteredListOfCountries(filteredRequest, countriesList);
    dataStore.checkAndSaveCountryList(req, 'lived-abroad-countries-details', countryDetails, editMode);

    if (countryDetails.length > 0) {
      res.redirect(`/when-did-you-live-in-${countryDetails[0].url}`);
    } else if (editMode) {
      res.redirect('/check-your-details');
    } else {
      res.redirect('/have-you-worked-outside-of-the-uk');
    }
  }
}

/* istanbul ignore next */
function whatCountriesHaveYouLivedInCountriesPostCached(req, res) {
  countries.getCountryList((err, request) => {
    if (err) {
      const traceID = requestHelper.getTraceID(err);
      requestHelper.errorLoggingHelper(err, '/api/customer/countries', traceID, res.locals.logger);
      res.status(statusCodeErrorWrap);
      res.render('pages/error', { status: statusCode500 });
    } else {
      whatCountriesHaveYouLivedInPost(req, res, request);
    }
  });
}

function whenDidYouLiveGet(req, res) {
  const countryDetails = dataStore.get(req, 'lived-abroad-countries-details');
  const countryIndex = countryHelper.returnIndexOfCountry(req.params.country, countryDetails);
  const pageSuffix = req.session.isOverseas ? '-overseas' : '';
  res.render('pages/lived-abroad-country', {
    details: countryDetails[countryIndex].data,
    country: countryDetails[countryIndex],
    location: {
      current: (countryIndex + 1),
      total: countryDetails.length,
    },
    pageSuffix,
  });
}

function whenDidYouLivePost(req, res) {
  const editMode = checkChangeHelper.isEditMode(req, 'lived-abroad');
  const countryDetails = dataStore.get(req, 'lived-abroad-countries-details');
  const countryIndex = countryHelper.returnIndexOfCountry(req.params.country, countryDetails);
  const errors = validation.countryDetials(
    req.body,
    false,
    '',
    `/when-did-you-work-in-${countryDetails[countryIndex].url}`,
    req.session.lang,
  );
  if (Object.keys(errors).length > 0) {
    const pageSuffix = req.session.isOverseas ? '-overseas' : '';
    res.render('pages/lived-abroad-country', {
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
    const filteredRequest = filterRequest.requestFilter(filterRequest.livedAbroadCountries(), req.body);
    dataStore.checkAndSaveCountryIndividual(req, 'lived-abroad-countries-details', countryIndex, filteredRequest, editMode);

    const nextUrl = countryIndex + 1;
    if (countryDetails[nextUrl]) {
      res.redirect(`/when-did-you-live-in-${countryDetails[nextUrl].url}`);
    } else if (editMode) {
      checkChangeHelper.clearCheckChange(req);
      res.redirect('/check-your-details');
    } else {
      res.redirect('/have-you-worked-outside-of-the-uk');
    }
  }
}

module.exports.livedAbroadGet = livedAbroadGet;
module.exports.livedAbroadPost = livedAbroadPost;

module.exports.whenDidYouLiveGet = whenDidYouLiveGet;
module.exports.whenDidYouLivePost = whenDidYouLivePost;

module.exports.whatCountriesHaveYouLivedInCountriesGetCached = whatCountriesHaveYouLivedInCountriesGetCached;
module.exports.whatCountriesHaveYouLivedInCountriesPostCached = whatCountriesHaveYouLivedInCountriesPostCached;

module.exports.whatCountriesHaveYouLivedInGet = whatCountriesHaveYouLivedInGet;
module.exports.whatCountriesHaveYouLivedInPost = whatCountriesHaveYouLivedInPost;
