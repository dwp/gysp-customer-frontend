const i18n = require('i18next');
const _ = require('lodash');

const errorHelper = require('../utils/errorHelper');
const generalHelper = require('./utils/general.js');

function validCountry(countryName, countryList) {
  if (_.find(countryList, { name: countryName }) === undefined) {
    return false;
  }
  return true;
}

function emptyCountries(postRequest) {
  if (generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[0]'])
      && generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[1]'])
      && generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[2]'])
      && generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[3]'])) {
    return true;
  }
  return false;
}

function checkDuplicateCountiesAndNotFirst(postRequest, filter, index) {
  const countriesArray = _.flatMap(postRequest);
  if (_.filter(postRequest, o => o === postRequest[filter]).length > 1) {
    if (_.findIndex(countriesArray, o => o === postRequest[filter]) !== index) {
      return true;
    }
  }
  return false;
}

function isToDatePastFromDate(errors, postRequest) {
  if (errors.dateTo === undefined && errors.dateFrom === undefined
      && (postRequest.dateFromYear > postRequest.dateToYear
      || (postRequest.dateToYear === postRequest.dateFromYear && (Number(postRequest.dateFromMonth) > Number(postRequest.dateToMonth))))) {
    return true;
  }
  return false;
}

module.exports = {
  livedAbroad(postRequest, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (!generalHelper.checkIfYesOrNo(postRequest.livedAbroad)) {
      errors.livedAbroad = {
        text: i18n.t('lived-abroad:fields.livedAbroad.errors.required'),
      };
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'livedAbroad',
          i18n.t('lived-abroad:header'),
          errors.livedAbroad.text,
          i18n.t('google-analytics:pages.lived-abroad.error'),
        ),
      );
    }
    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  workedAbroad(postRequest, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (!generalHelper.checkIfYesOrNo(postRequest.workedAbroad)) {
      errors.workedAbroad = {
        text: i18n.t('worked-abroad:fields.workedAbroad.errors.required'),
      };
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'workedAbroad',
          i18n.t('worked-abroad:header'),
          errors.workedAbroad.text,
          i18n.t('google-analytics:pages.worked-abroad.error'),
        ),
      );
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }

    return errors;
  },
  countries(postRequest, type, countriesList, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (emptyCountries(postRequest)) {
      errors['country-name[0]'] = {
        text: i18n.t('countries:fields.country.errors.required'),
      };
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'country-name[0]',
          i18n.t('countries:fields.country.label'),
          errors['country-name[0]'].text,
        ),
      );
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[0]'])) {
      if (!validCountry(postRequest['country-name[0]'], countriesList)) {
        errors['country-name[0]'] = {
          text: i18n.t('countries:fields.country.errors.valid'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[0]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[0]'].text,
          ),
        );
      }
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[1]'])) {
      if (!validCountry(postRequest['country-name[1]'], countriesList)) {
        errors['country-name[1]'] = {
          text: i18n.t('countries:fields.country.errors.valid'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[1]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[1]'].text,
          ),
        );
      } else if (checkDuplicateCountiesAndNotFirst(postRequest, 'country-name[1]', 1)) {
        errors['country-name[1]'] = {
          text: i18n.t('countries:fields.country.errors.duplicate'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[1]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[1]'].text,
          ),
        );
      }
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[2]'])) {
      if (!validCountry(postRequest['country-name[2]'], countriesList)) {
        errors['country-name[2]'] = {
          text: i18n.t('countries:fields.country.errors.valid'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[2]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[2]'].text,
          ),
        );
      } else if (checkDuplicateCountiesAndNotFirst(postRequest, 'country-name[2]', 2)) {
        errors['country-name[2]'] = {
          text: i18n.t('countries:fields.country.errors.duplicate'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[2]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[2]'].text,
          ),
        );
      }
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(postRequest['country-name[3]'])) {
      if (!validCountry(postRequest['country-name[3]'], countriesList)) {
        errors['country-name[3]'] = {
          text: i18n.t('countries:fields.country.errors.valid'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[3]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[3]'].text,
          ),
        );
      } else if (checkDuplicateCountiesAndNotFirst(postRequest, 'country-name[3]', 3)) {
        errors['country-name[3]'] = {
          text: i18n.t('countries:fields.country.errors.duplicate'),
        };
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'country-name[3]',
            i18n.t('countries:fields.country.label'),
            errors['country-name[3]'].text,
          ),
        );
      }
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }
    return errors;
  },
  countryDetials(postRequest, withReferenceNumber, countryName, url, lang) {
    const errors = [];
    const errorSummary = [];
    i18n.setLng(lang);

    if (postRequest.dateToMonth === '' || postRequest.dateToYear === '') {
      errors.dateTo = {
        text: i18n.t('lived-abroad-country:fields.dateTo.errors.required'),
      };
    } else if (!generalHelper.isValidMonthYear(postRequest.dateToMonth, postRequest.dateToYear)) {
      errors.dateTo = {
        text: i18n.t('lived-abroad-country:fields.dateTo.errors.invalid'),
      };
    } else if (!generalHelper.isFutureMonthYear(postRequest.dateToMonth, postRequest.dateToYear)) {
      errors.dateTo = {
        text: i18n.t('lived-abroad-country:fields.dateTo.errors.future'),
      };
    }

    if (postRequest.dateFromMonth === '' || postRequest.dateFromYear === '') {
      errors.dateFrom = {
        text: i18n.t('lived-abroad-country:fields.dateFrom.errors.required'),
      };
    } else if (!generalHelper.isValidMonthYear(postRequest.dateFromMonth, postRequest.dateFromYear)) {
      errors.dateFrom = {
        text: i18n.t('lived-abroad-country:fields.dateFrom.errors.invalid'),
      };
    } else if (!generalHelper.isFutureMonthYear(postRequest.dateFromMonth, postRequest.dateFromYear)) {
      errors.dateFrom = {
        text: i18n.t('lived-abroad-country:fields.dateFrom.errors.future'),
      };
    }

    if (errors.dateFrom !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'dateFrom',
          i18n.t('lived-abroad-country:fields.dateFrom.legend'),
          errors.dateFrom.text,
          i18n.t('google-analytics:pages.country-details.error', { URL: url, FIELD: 'date-from' }),
        ),
      );
    }

    if (isToDatePastFromDate(errors, postRequest)) {
      errors.dateTo = {
        text: i18n.t('lived-abroad-country:fields.dateTo.errors.after'),
      };
    }

    if (errors.dateTo !== undefined) {
      errorSummary.push(
        errorHelper.generateGlobalErrorSuppliedLabel(
          'dateTo',
          i18n.t('lived-abroad-country:fields.dateTo.legend'),
          errors.dateTo.text,
          i18n.t('google-analytics:pages.country-details.error', { URL: url, FIELD: 'date-to' }),
        ),
      );
    }

    if (withReferenceNumber && postRequest.referenceNumber !== '') {
      if (generalHelper.checkIfGreaterThenTwentyFour(postRequest.referenceNumber)) {
        errors.referenceNumber = {
          text: i18n.t('worked-abroad-country:fields.referenceNumber.errors.toLong'),
        };
      } else if (generalHelper.checkIfStartsWithSpace(postRequest.referenceNumber)) {
        errors.referenceNumber = {
          text: i18n.t('worked-abroad-country:fields.referenceNumber.errors.space'),
        };
      } else if (!generalHelper.checkIfValidAsciiCode32to127(postRequest.referenceNumber)) {
        errors.referenceNumber = {
          text: i18n.t('worked-abroad-country:fields.referenceNumber.errors.invalid'),
        };
      }
      if (errors.referenceNumber !== undefined) {
        errorSummary.push(
          errorHelper.generateGlobalErrorSuppliedLabel(
            'referenceNumber',
            i18n.t('worked-abroad-country:fields.referenceNumber.label', { COUNTRY: countryName }),
            errors.referenceNumber.text,
            i18n.t('google-analytics:pages.country-details.error', { URL: url, FIELD: 'reference-number' }),
          ),
        );
      }
    }

    if (Object.keys(errors).length !== 0) {
      errors.errorSummary = errorSummary;
    }
    return errors;
  },
};
