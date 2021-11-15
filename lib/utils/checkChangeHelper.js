const i18n = require('i18next');

const generalHelper = require('../validations/utils/general.js');
const dateFormatter = require('../helpers/dateFormatter');
const redirectHelper = require('../helpers/redirectHelper');
const countryHelper = require('./countriesHelper.js');
const deleteSession = require('../deleteSession');
const overseasValidation = require('../validations/overseasValidation');
const maritalValidation = require('../validations/maritalValidation');

const removeForwardSlash = new RegExp(/\//g);

module.exports = {
  async requestFilter(details, lang) {
    await i18n.changeLanguage(lang);
    const data = [];
    if (details['dob-details']) {
      const dobAnswer = [this.dateTransformer(details['dob-details'])];
      data.push({
        key: {
          text: i18n.t('check-change:keys.date-of-birth'),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          text: dobAnswer,
        },
        actions: {
          items: [{
            href: '/date-of-birth?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t('check-change:keys.date-of-birth'),
            attributes: {
              id: 'dateOfBirth',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'date-of-birth' }),
            },
          }],
        },
      });
    }
    if (details.claimFromDate) {
      let claimFromDateQ = i18n.t('check-change:keys.date-want-state-pension-from');
      if (details.isBeforeSpa) {
        claimFromDateQ = i18n.t('check-change:keys.date-want-state-pension');
      }
      const claimFromDateAnswer = [this.dateTransformer(details.claimFromDate)];
      data.push({
        key: {
          text: claimFromDateQ,
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          text: claimFromDateAnswer,
        },
        actions: {
          items: [{
            href: '/when-do-you-want-your-state-pension?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: claimFromDateQ,
            attributes: {
              id: 'whenDoYouWantYourStatePension',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'when-do-you-want-your-state-pension' }),
            },
          }],
        },
      });
    }
    if (details['lived-abroad']) {
      const livedAbroadQuestion = details.isOverseas ? 'check-change:keys.where-lived-outside-uk' : 'check-change:keys.lived-outside-uk';
      let livedAbroadAnswer = [i18n.t(`lived-abroad:fields.livedAbroad.options.${details['lived-abroad'].livedAbroad}`)];
      if (details['lived-abroad'].livedAbroad === 'yes' && details['lived-abroad-countries']) {
        livedAbroadAnswer = this.countryDetailsTransformer(
          details['lived-abroad-countries'],
          details['lived-abroad-countries-details'], lang,
        );
      }
      data.push({
        key: {
          text: i18n.t(livedAbroadQuestion),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          html: livedAbroadAnswer.join('<br />'),
        },
        actions: {
          items: [{
            href: '/have-you-ever-lived-outside-of-the-uk?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t(livedAbroadQuestion),
            attributes: {
              id: 'haveYouEverLivedOutsideOfTheUk',
              'data-journey-click': i18n.t(
                'google-analytics:pages.check-change.change', { VALUE: 'have-you-ever-lived-outside-of-the-uk' },
              ),
            },
          }],
        },
      });
    }
    if (details['lived-abroad'] === undefined && details['lived-abroad-countries']) {
      const livedAbroadAnswer = this.countryDetailsTransformer(
        details['lived-abroad-countries'],
        details['lived-abroad-countries-details'],
        lang,
      );
      data.push({
        key: {
          text: i18n.t('check-change:keys.where-lived-outside-uk'),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          html: livedAbroadAnswer.join('<br />'),
        },
        actions: {
          items: [{
            href: '/what-countries-have-you-lived-in?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t('check-change:keys.where-lived-outside-uk'),
            attributes: {
              id: 'whatCountriesHaveYouLivedIn',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'what-countries-have-you-lived-in' }),
            },
          }],
        },
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
        key: {
          text: i18n.t('check-change:keys.worked-outside-uk'),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          html: workedAbroadAnswer.join('<br />'),
        },
        actions: {
          items: [{
            href: '/have-you-worked-outside-of-the-uk?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t('check-change:keys.worked-outside-uk'),
            attributes: {
              id: 'haveYouWorkedOutsideOfTheUk',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'have-you-worked-outside-of-the-uk' }),
            },
          }],
        },
      });
    }

    if (details['marital-select']) {
      const { maritalStatus } = details['marital-select'];
      const maritalAnswers = this.maritalStatusTransformer(maritalStatus, details[`marital-date-${maritalStatus}`]);
      data.push({
        key: {
          text: i18n.t('check-change:keys.marital-status'),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          html: maritalAnswers.join('<br />'),
        },
        actions: {
          items: [{
            href: '/what-is-your-current-marital-status?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t('check-change:keys.marital-status'),
            attributes: {
              id: 'whatIsYourCurrentMaritalStatus',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'what-is-your-current-marital-status' }),
            },
          }],
        },
      });

      if (maritalStatus !== 'single' && details[`marital-partner-${maritalStatus}`]) {
        const partnerDetailAnswers = this.partnerDetailTransformer(details[`marital-partner-${maritalStatus}`]);
        const partnerDetailhref = redirectHelper.redirectBasedOnStatusPartner(maritalStatus);
        data.push({
          key: {
            text: i18n.t(`marital-details:header.${maritalStatus}`),
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            html: partnerDetailAnswers.join('<br />'),
          },
          actions: {
            items: [{
              href: `/${partnerDetailhref}?edit=true`,
              text: i18n.t('check-change:link-text'),
              visuallyHiddenText: i18n.t(`marital-details:header.${maritalStatus}`),
              attributes: {
                id: this.idFormatter(partnerDetailhref),
                'data-journey-click': i18n.t(
                  'google-analytics:pages.check-change.change', { VALUE: this.analyticsTagFormatter(partnerDetailhref) },
                ),
              },
            }],
          },
        });
      }
    }

    if (details['contact-details']) {
      const contactDetailAnswers = this.contactDetailsTransformer(details['contact-details']);
      data.push({
        key: {
          text: i18n.t('check-change:keys.contact-details'),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          html: contactDetailAnswers.join('<br />'),
        },
        actions: {
          items: [{
            href: '/contact-details?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t('check-change:keys.contact-details'),
            attributes: {
              id: 'contactDetails',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'contact-details' }),
            },
          }],
        },
      });
    }

    if (details['alt-formats']) {
      const answer = details['alt-formats'];
      let value;

      if (answer === 'yes') {
        value = i18n.t(`alt-formats-choose:fields.${details['alt-formats-choose']}`);
      } else {
        value = i18n.t('alt-formats:fields.noOptionAsNone');
      }

      data.push({
        key: {
          text: i18n.t('check-change:keys.alt-formats'),
          classes: 'govuk-!-width-two-thirds',
        },
        value: {
          html: value,
        },
        actions: {
          items: [{
            href: '/alt-formats?edit=true',
            text: i18n.t('check-change:link-text'),
            visuallyHiddenText: i18n.t('check-change:keys.alt-formats'),
            attributes: {
              id: 'altFormatChange',
              'data-journey-click': i18n.t('google-analytics:pages.check-change.change', { VALUE: 'alt-formats' }),
            },
          }],
        },
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
    formatedId = formatedId.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
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
