const i18n = require('i18next');

const generalHelper = require('../validations/utils/general.js');
const dateFormatter = require('../helpers/dateFormatter');
const redirectHelper = require('../helpers/redirectHelper');
const countryHelper = require('./countriesHelper.js');
const deleteSession = require('../deleteSession');
const overseasValidation = require('../validations/overseasValidation');
const maritalValidation = require('../validations/maritalValidation');

const removeForwardSlash = new RegExp(/\//g);

i18n.init({ sendMissingTo: 'fallback' });

module.exports = {
  requestFilter(details, lang) {
    i18n.setLng(lang);
    const data = [];
    if (details['dob-details']) {
      const dobAnswer = [this.dateTransformer(details['dob-details'])];
      data.push({
        uri: '/date-of-birth',
        question: i18n.t('dob-confirmation:header'),
        answer: dobAnswer,
      });
    }
    if (details.claimFromDate) {
      let claimFromDateQ = i18n.t('pension-start-date:afterSpa.fields.claimFromDate.legend');
      if (details.isBeforeSpa) {
        claimFromDateQ = i18n.t('pension-start-date:beforeSpa.fields.claimFromDate.legend');
      }
      const claimFromDateAnswer = [this.dateTransformer(details.claimFromDate)];
      data.push({
        uri: '/when-do-you-want-your-state-pension',
        question: claimFromDateQ,
        answer: claimFromDateAnswer,
      });
    }
    if (details['lived-abroad']) {
      const livedAbroadQuestion = details.isOverseas ? 'countries:header-overseas' : 'lived-abroad:header';
      let livedAbroadAnswer = [i18n.t(`lived-abroad:fields.livedAbroad.options.${details['lived-abroad'].livedAbroad}`)];
      if (details['lived-abroad'].livedAbroad === 'yes' && details['lived-abroad-countries']) {
        livedAbroadAnswer = this.countryDetailsTransformer(
          details['lived-abroad-countries'],
          details['lived-abroad-countries-details'], lang,
        );
      }
      data.push({
        uri: '/have-you-ever-lived-outside-of-the-uk',
        question: i18n.t(livedAbroadQuestion),
        answer: livedAbroadAnswer,
      });
    }
    if (details['lived-abroad'] === undefined && details['lived-abroad-countries']) {
      const livedAbroadAnswer = this.countryDetailsTransformer(
        details['lived-abroad-countries'],
        details['lived-abroad-countries-details'],
        lang,
      );
      data.push({
        uri: '/what-countries-have-you-lived-in',
        question: i18n.t('countries:lived.header-overseas'),
        answer: livedAbroadAnswer,
      });
    }

    if (details['worked-abroad']) {
      let workedAbroadAnswer = [i18n.t(`worked-abroad:fields.workedAbroad.options.${details['worked-abroad'].workedAbroad}`)];
      if (details['worked-abroad'].workedAbroad === 'yes' && details['worked-abroad-countries']) {
        workedAbroadAnswer = this.countryDetailsTransformer(
          details['worked-abroad-countries'],
          details['worked-abroad-countries-details'],
          lang,
        );
      }
      data.push({
        uri: '/have-you-worked-outside-of-the-uk',
        question: i18n.t('worked-abroad:header'),
        answer: workedAbroadAnswer,
      });
    }
    if (details['marital-select']) {
      const { maritalStatus } = details['marital-select'];
      const maritalAnswers = this.maritalStatusTransformer(maritalStatus, details[`marital-date-${maritalStatus}`]);
      data.push({
        uri: '/what-is-your-current-marital-status',
        question: i18n.t('marital-select:header'),
        answer: maritalAnswers,
      });

      if (maritalStatus !== 'single' && details[`marital-partner-${maritalStatus}`]) {
        const partnerDetailAnswers = this.partnerDetailTransformer(details[`marital-partner-${maritalStatus}`]);
        data.push({
          uri: `/${redirectHelper.redirectBasedOnStatusPartner(maritalStatus)}`,
          question: i18n.t(`marital-details:header.${maritalStatus}`),
          answer: partnerDetailAnswers,
        });
      }
    }

    if (details.benefits) {
      const benefitsAnswer = [this.benefitsTransformer(details.benefits)];
      data.push({
        uri: '/are-you-receiving-any-benefits',
        question: i18n.t('benefits:header'),
        answer: benefitsAnswer,
      });
    }

    if (details['contact-details']) {
      const contactDetailAnswers = this.contactDetailsTransformer(details['contact-details']);
      data.push({
        uri: '/contact-details',
        question: i18n.t('contact:header'),
        answer: contactDetailAnswers,
      });
    }

    return data;
  },
  countryDateFormat(countryDetails, lang, type) {
    return dateFormatter.monthYearDate(
      countryDetails.data[`date${type}Year`],
      countryDetails.data[`date${type}Month`],
      lang,
    );
  },
  countryTransform(country, countryDetails, lang) {
    const countryPeriod = [];
    countryPeriod.push(country);
    if (countryDetails !== undefined) {
      const countryIndex = countryHelper.returnIndexOfCountryByName(country, countryDetails);
      if (countryIndex !== -1) {
        const from = this.countryDateFormat(countryDetails[countryIndex], lang, 'From');
        const to = this.countryDateFormat(countryDetails[countryIndex], lang, 'To');
        countryPeriod.push(`${from} - ${to}`);
        if (!generalHelper.isThisUndefinedOrEmtpy(countryDetails[countryIndex].data.referenceNumber)) {
          countryPeriod.push(countryDetails[countryIndex].data.referenceNumber);
        }
      }
    }
    return countryPeriod;
  },
  countryDetailsTransformer(country, countryDetails, lang) {
    const periodsAbroad = [];
    if (country !== undefined) {
      Object.keys(country).forEach((key) => {
        if (country[key] !== '') {
          const countryData = this.countryTransform(country[key], countryDetails, lang);
          periodsAbroad.push(...countryData);
        }
      });
    }
    return periodsAbroad;
  },
  maritalStatusTransformer(maritalStatus, maritalStatusDate) {
    const maritalStatusData = [
      i18n.t(`marital-select:fields.maritalStatus.options.${maritalStatus}`),
    ];

    if (maritalStatusDate !== undefined) {
      maritalStatusData.push(this.dateTransformer(maritalStatusDate));
    }
    return maritalStatusData;
  },
  dateTransformer(dateObject) {
    return dateFormatter.dayMonthYearSlash(dateObject.dateYear, dateObject.dateMonth, dateObject.dateDay);
  },
  partnerDetailTransformer(partnerDetail) {
    const partnerDetailTransformed = [
      `${partnerDetail.firstName} ${partnerDetail.surname}`,
    ];

    if (!generalHelper.isThisUndefinedOrEmtpy(partnerDetail.otherName)) {
      partnerDetailTransformed.push(partnerDetail.otherName);
    }

    if (partnerDetail.dobYear !== '' && partnerDetail.dobMonth !== '' && partnerDetail.dobDay !== '') {
      partnerDetailTransformed.push(dateFormatter.dayMonthYearSlash(partnerDetail.dobYear, partnerDetail.dobMonth, partnerDetail.dobDay));
    }
    return partnerDetailTransformed;
  },
  benefitsTransformer(benefits) {
    if (benefits.receivingBenefits === 'yes') {
      return i18n.t('benefits:fields.receivingBenefits.options.yes');
    }
    return i18n.t('benefits:fields.receivingBenefits.options.no');
  },
  contactDetailsTransformer(contactDetail) {
    const contactDetailTransformed = [];
    if (!generalHelper.isThisUndefinedOrEmtpy(contactDetail.homeTelephoneNumber)) {
      contactDetailTransformed.push(i18n.t('contact:fields.checkbox.options.home'), contactDetail.homeTelephoneNumber);
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(contactDetail.mobileTelephoneNumber)) {
      contactDetailTransformed.push(i18n.t('contact:fields.checkbox.options.mobile'), contactDetail.mobileTelephoneNumber);
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(contactDetail.workTelephoneNumber)) {
      contactDetailTransformed.push(i18n.t('contact:fields.checkbox.options.work'), contactDetail.workTelephoneNumber);
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(contactDetail.email)) {
      contactDetailTransformed.push(i18n.t('contact:fields.email.label'), contactDetail.email);
    }
    return contactDetailTransformed;
  },
  checkAndSetEditMode(req, section) {
    if (req.query !== undefined && req.query.edit === 'true') {
      req.session.editSection = section;
    }
    return false;
  },
  isEditMode(req, section) {
    if (req.session !== undefined) {
      if (Array.isArray(section) && section.includes(req.session.editSection)) {
        return true;
      }
      if (req.session.editSection === section) {
        return true;
      }
    }
    return false;
  },
  checkSessionHasntChanged(req, key, details) {
    if (req.session[key] === undefined) {
      return true;
    }
    if (JSON.stringify(req.session[key]) !== JSON.stringify(details)) {
      return false;
    }
    return true;
  },
  clearCheckChange(req) {
    deleteSession.deleteEditSection(req);
  },
  idFormatter(string) {
    let formatedId = string.replace(removeForwardSlash, '');
    formatedId = formatedId.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return formatedId;
  },
  analyticsTagFormatter(string) {
    return string.replace(removeForwardSlash, '');
  },
  processEditSectionShowError(req) {
    if (req.session.editSectionShowError) {
      delete req.session.editSectionShowError;
      return true;
    }
    return false;
  },
  setupDataAndShowErrorsMessages(req) {
    if (this.processEditSectionShowError(req)) {
      if (req.session.editSection === 'lived-abroad') {
        deleteSession.deleteLivedAbroad(req);
        deleteSession.deleteLivedAbroadCountries(req);
        deleteSession.deleteLivedAbroadCountriesDetails(req);
        return overseasValidation.livedAbroad({}, req.session.lang);
      }
      if (req.session.editSection === 'worked-abroad') {
        deleteSession.deleteWorkedAbroad(req);
        deleteSession.deleteWorkedAbroadCountries(req);
        deleteSession.deleteWorkedAbroadCountriesDetails(req);
        return overseasValidation.workedAbroad({}, req.session.lang);
      }
      if (req.session.editSection === 'marital-select') {
        deleteSession.deletePartnerStatus(req);
        deleteSession.deletePartnerDate(req);
        deleteSession.deletePartnerDetails(req);
        return maritalValidation.selectionValidation({}, req.session.lang);
      }
      return false;
    }
    return false;
  },
  checkEditSectionAndClearCheckChange(req, editMode) {
    if (editMode) {
      if (req.session.editSection === 'lived-abroad' && req.body.livedAbroad === 'no') {
        this.clearCheckChange(req);
      }
      if (req.session.editSection === 'worked-abroad' && req.body.workedAbroad === 'no') {
        this.clearCheckChange(req);
      }
      if (req.session.editSection === 'marital-select' && req.body.maritalStatus === 'single') {
        this.clearCheckChange(req);
      }
      return false;
    }
    return false;
  },
};
