const { assert } = require('chai');
const checkChangeHelper = require('../../../../lib/utils/checkChangeHelper');

const englishLangauge = 'en-GB';
const welshLangauge = 'cy-GB';

const emptyDetails = {};
const baseDetails = {
  'dob-details': { dateYear: '1953', dateMonth: '01', dateDay: '01' },
  claimFromDate: { dateYear: '2018', dateMonth: '01', dateDay: '01' },
  'contact-details': {
    homeTelephoneNumber: '00000 000000', workTelephoneNumber: '11111 111111', mobileTelephoneNumber: '22222 222222', email: 'a@b.com',
  },
  isBeforeSpa: true,
};

const baseDetailResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const livedAbroadNoDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'no' },
}, baseDetails);

const livedAbroadNoResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'lived-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'lived-abroad:fields.livedAbroad.options.no' },
    actions: {
      items: [{
        href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'lived-abroad:header', attributes: { id: 'haveYouEverLivedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const livedAbroadYesNoCountriesDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'yes' },
}, baseDetails);

const livedAbroadYesNoCountriesResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'lived-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'lived-abroad:fields.livedAbroad.options.yes' },
    actions: {
      items: [{
        href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'lived-abroad:header', attributes: { id: 'haveYouEverLivedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const livedAbroadYesNoDetailsDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
}, baseDetails);

const livedAbroadYesNoDetailsResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'lived-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />France' },
    actions: {
      items: [{
        href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'lived-abroad:header', attributes: { id: 'haveYouEverLivedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const livedAbroadYesWithDetailsDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
  'lived-abroad-countries-details': [
    {
      name: 'Spain',
      url: 'spain',
      data: {
        dateFromMonth: '01', dateFromYear: '2000', dateToMonth: '12', dateToYear: '2000',
      },
    },
    {
      name: 'France',
      url: 'france',
      data: {
        dateFromMonth: '01', dateFromYear: '2001', dateToMonth: '12', dateToYear: '2001',
      },
    },
  ],
}, baseDetails);

const livedAbroadYesWithDetailsResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'lived-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001' },
    actions: {
      items: [{
        href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'lived-abroad:header', attributes: { id: 'haveYouEverLivedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const livedAbroadYesWithDetailsOverseasDetails = Object.assign({
  'lived-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
  'lived-abroad-countries-details': [
    {
      name: 'Spain',
      url: 'spain',
      data: {
        dateFromMonth: '01', dateFromYear: '2000', dateToMonth: '12', dateToYear: '2000',
      },
    },
    {
      name: 'France',
      url: 'france',
      data: {
        dateFromMonth: '01', dateFromYear: '2001', dateToMonth: '12', dateToYear: '2001',
      },
    },
  ],
  isOverseas: true,
}, baseDetails);

const livedAbroadYesWithDetailsOverseasResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'countries:lived.header-overseas', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001' },
    actions: {
      items: [{
        href: '/what-countries-have-you-lived-in?edit=true', text: 'Change', visuallyHiddenText: 'countries:lived.header-overseas', attributes: { id: 'whatCountriesHaveYouLivedIn', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const livedAbroadYesWithDetailsWelshResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'lived-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />Ion 2000 - Rhag 2000<br />France<br />Ion 2001 - Rhag 2001' },
    actions: {
      items: [{
        href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'lived-abroad:header', attributes: { id: 'haveYouEverLivedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const workedAbroadNoDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'no' },
}, baseDetails);

const workedAbroadNoResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'worked-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'worked-abroad:fields.workedAbroad.options.no' },
    actions: {
      items: [{
        href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'worked-abroad:header', attributes: { id: 'haveYouWorkedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const workedAbroadYesNoCountriesDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'yes' },
}, baseDetails);

const workedAbroadYesNoCountriesResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'worked-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'worked-abroad:fields.workedAbroad.options.yes' },
    actions: {
      items: [{
        href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'worked-abroad:header', attributes: { id: 'haveYouWorkedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const workedAbroadYesNoDetailsDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
}, baseDetails);

const workedAbroadYesNoDetailsResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'worked-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />France' },
    actions: {
      items: [{
        href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'worked-abroad:header', attributes: { id: 'haveYouWorkedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const workedAbroadYesWithDetailsDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
  'worked-abroad-countries-details': [
    {
      name: 'Spain',
      url: 'spain',
      data: {
        dateFromMonth: '01', dateFromYear: '2000', dateToMonth: '12', dateToYear: '2000', referenceNumber: 'SPAIN1234',
      },
    },
    {
      name: 'France',
      url: 'france',
      data: {
        dateFromMonth: '01', dateFromYear: '2001', dateToMonth: '12', dateToYear: '2001', referenceNumber: 'FRANCE1234',
      },
    },
  ],
}, baseDetails);

const workedAbroadYesWithDetailsResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'worked-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />Jan 2000 - Dec 2000<br />SPAIN1234<br />France<br />Jan 2001 - Dec 2001<br />FRANCE1234' },
    actions: {
      items: [{
        href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'worked-abroad:header', attributes: { id: 'haveYouWorkedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const workedAbroadYesWithDetailsWelshResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'worked-abroad:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Spain<br />Ion 2000 - Rhag 2000<br />SPAIN1234<br />France<br />Ion 2001 - Rhag 2001<br />FRANCE1234' },
    actions: {
      items: [{
        href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'worked-abroad:header', attributes: { id: 'haveYouWorkedOutsideOfTheUk', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const maritalStatusSingleDetails = Object.assign({
  'marital-select': { maritalStatus: 'single' },
}, baseDetails);

const maritalStatusSingleResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-select:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'marital-select:fields.maritalStatus.options.single' },
    actions: {
      items: [{
        href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'marital-select:header', attributes: { id: 'whatIsYourCurrentMaritalStatus', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const maritalStatusMarriedDetails = Object.assign({
  'marital-select': { maritalStatus: 'married' },
  'marital-date-married': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-married': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusMarriedResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-select:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'marital-select:fields.maritalStatus.options.married<br />01/01/1960' },
    actions: {
      items: [{
        href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'marital-select:header', attributes: { id: 'whatIsYourCurrentMaritalStatus', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-details:header.married', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
    actions: {
      items: [{
        href: '/about-your-spouse?edit=true', text: 'Change', visuallyHiddenText: 'marital-details:header.married', attributes: { id: 'aboutYourSpouse', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const maritalStatusCivilDetails = Object.assign({
  'marital-select': { maritalStatus: 'civil' },
  'marital-date-civil': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-civil': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusCivilResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-select:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'marital-select:fields.maritalStatus.options.civil<br />01/01/1960' },
    actions: {
      items: [{
        href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'marital-select:header', attributes: { id: 'whatIsYourCurrentMaritalStatus', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-details:header.civil', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
    actions: {
      items: [{
        href: '/about-your-civil-partner?edit=true', text: 'Change', visuallyHiddenText: 'marital-details:header.civil', attributes: { id: 'aboutYourCivilPartner', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const maritalStatusDivorcedDetails = Object.assign({
  'marital-select': { maritalStatus: 'divorced' },
  'marital-date-divorced': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-divorced': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusDivorcedResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-select:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'marital-select:fields.maritalStatus.options.divorced<br />01/01/1960' },
    actions: {
      items: [{
        href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'marital-select:header', attributes: { id: 'whatIsYourCurrentMaritalStatus', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-details:header.divorced', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
    actions: {
      items: [{
        href: '/about-your-ex-spouse?edit=true', text: 'Change', visuallyHiddenText: 'marital-details:header.divorced', attributes: { id: 'aboutYourExSpouse', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const maritalStatusDissolvedDetails = Object.assign({
  'marital-select': { maritalStatus: 'dissolved' },
  'marital-date-dissolved': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-dissolved': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusDissolvedResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-select:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'marital-select:fields.maritalStatus.options.dissolved<br />01/01/1960' },
    actions: {
      items: [{
        href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'marital-select:header', attributes: { id: 'whatIsYourCurrentMaritalStatus', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-details:header.dissolved', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
    actions: {
      items: [{
        href: '/about-your-ex-partner?edit=true', text: 'Change', visuallyHiddenText: 'marital-details:header.dissolved', attributes: { id: 'aboutYourExPartner', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const maritalStatusWidowedDetails = Object.assign({
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-widowed': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusWidowedResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-select:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'marital-select:fields.maritalStatus.options.widowed<br />01/01/1960' },
    actions: {
      items: [{
        href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'marital-select:header', attributes: { id: 'whatIsYourCurrentMaritalStatus', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'marital-details:header.widowed', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
    actions: {
      items: [{
        href: '/about-your-late-spouse?edit=true', text: 'Change', visuallyHiddenText: 'marital-details:header.widowed', attributes: { id: 'aboutYourLateSpouse', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const claimFromDateAfterSpaDetails = {
  'dob-details': { dateYear: '1953', dateMonth: '01', dateDay: '01' },
  claimFromDate: { dateYear: '2018', dateMonth: '01', dateDay: '01' },
  'contact-details': {
    homeTelephoneNumber: '00000 000000', workTelephoneNumber: '11111 111111', mobileTelephoneNumber: '22222 222222', email: 'a@b.com',
  },
  isBeforeSpa: false,
};

const claimFromDateAfterSpaDetailResult = [
  {
    key: { text: 'dob-confirmation:header', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/1953'] },
    actions: {
      items: [{
        href: '/date-of-birth?edit=true', text: 'Change', visuallyHiddenText: 'dob-confirmation:header', attributes: { id: 'dateOfBirth', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'pension-start-date:afterSpa.fields.claimFromDate.legend', classes: 'govuk-!-width-two-thirds' },
    value: { text: ['01/01/2018'] },
    actions: {
      items: [{
        href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'pension-start-date:afterSpa.fields.claimFromDate.legend', attributes: { id: 'whenDoYouWantYourStatePension', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
  {
    key: { text: 'contact:header', classes: 'govuk-!-width-two-thirds' },
    value: { html: 'contact:fields.checkbox.options.home<br />00000 000000<br />contact:fields.checkbox.options.mobile<br />22222 222222<br />contact:fields.checkbox.options.work<br />11111 111111<br />contact:fields.email.label<br />a@b.com' },
    actions: {
      items: [{
        href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'contact:header', attributes: { id: 'contactDetails', 'data-journey-click': 'google-analytics:pages.check-change.change' },
      }],
    },
  },
];

const emptyRequest = {};
const emptySession = { session: {} };
const editTrueQueryRequest = { session: {}, query: { edit: 'true' } };
const editFalseQueryRequest = { session: {}, query: { edit: 'false' } };

const editSectionValidRequest = { session: { editSection: 'section' } };
const editSectionInvalidRequest = { session: {} };

const sessionRequest = { session: { foo: { foo: 'bar' } } };

const editSection = { session: { editSection: true, editSectionShowError: true } };

describe('Check Change Helper ', () => {
  describe(' requestFilter ', () => {
    it('should return a blank array when empty detail supplied', () => {
      const result = checkChangeHelper.requestFilter(emptyDetails, englishLangauge);
      assert.equal(result.length, 0);
      assert.equal(JSON.stringify(result), '[]');
    });

    it('should return a array when base details are supplied', () => {
      const result = checkChangeHelper.requestFilter(baseDetails, englishLangauge);
      assert.equal(result.length, 3);
      assert.equal(JSON.stringify(result), JSON.stringify(baseDetailResult));
    });

    describe(' livedAbroad ', () => {
      it('should return a array that contains livedAbroad as No when base details are supplied with lived abroad', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadNoDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadNoResult));
      });

      it('should return a array that contains livedAbroad as Yes when lived abroad is supplied without countires', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesNoCountriesDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'lived-abroad:fields.livedAbroad.options.yes');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesNoCountriesResult));
      });

      it('should return a array that contains livedAbroad as a list of countires when lived abroad and lived abroad is yes and countries are supplied without countires details', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesNoDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />France');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesNoDetailsResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied with english language', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesWithDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied with welsh language', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesWithDetailsDetails, welshLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />Ion 2000 - Rhag 2000<br />France<br />Ion 2001 - Rhag 2001');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsWelshResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied and is an overseas customer', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesWithDetailsOverseasDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsOverseasResult));
      });
    });

    describe(' workedAbroad ', () => {
      it('should return a array that contains workedAbroad as No when base details are supplied with worked abroad', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadNoDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadNoResult));
      });

      it('should return a array that contains workedAbroad as Yes when worked abroad is supplied without countires', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesNoCountriesDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'worked-abroad:fields.workedAbroad.options.yes');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesNoCountriesResult));
      });

      it('should return a array that contains workedAbroad as a list of countires when worked abroad and worked abroad is yes and countries are supplied without countires details', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesNoDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />France');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesNoDetailsResult));
      });

      it('should return a array that contains workedAbroad as a list of countires and to and from dates when worked abroad is yes, has countries and the dates are supplied with english language', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesWithDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />Jan 2000 - Dec 2000<br />SPAIN1234<br />France<br />Jan 2001 - Dec 2001<br />FRANCE1234');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesWithDetailsResult));
      });

      it('should return a array that contains workedAbroad as a list of countires and to and from dates when worked abroad is yes, has countries and the dates are supplied with welsh language', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesWithDetailsDetails, welshLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].value.html, 'Spain<br />Ion 2000 - Rhag 2000<br />SPAIN1234<br />France<br />Ion 2001 - Rhag 2001<br />FRANCE1234');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesWithDetailsWelshResult));
      });
    });

    describe(' maritalStatus ', () => {
      describe(' single ', () => {
        it('should return a array that contains maritalStatus as Single when single marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusSingleDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[2].value.html, 'marital-select:fields.maritalStatus.options.single');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusSingleResult));
        });
      });

      describe(' married ', () => {
        it('should return a array that contains maritalStatus as Married with date when married marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusMarriedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].value.html, 'marital-select:fields.maritalStatus.options.married<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusMarriedResult));
        });
      });

      describe(' civil ', () => {
        it('should return a array that contains maritalStatus as civil partnership with date when civil partnership marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusCivilDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].value.html, 'marital-select:fields.maritalStatus.options.civil<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusCivilResult));
        });
      });

      describe(' divorced ', () => {
        it('should return a array that contains maritalStatus as divorced with date when divorced marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusDivorcedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].value.html, 'marital-select:fields.maritalStatus.options.divorced<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusDivorcedResult));
        });
      });

      describe(' dissolved ', () => {
        it('should return a array that contains maritalStatus as dissolved with date when dissolved marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusDissolvedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].value.html, 'marital-select:fields.maritalStatus.options.dissolved<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusDissolvedResult));
        });
      });

      describe(' widowed ', () => {
        it('should return a array that contains maritalStatus as widowed with date when widowed marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusWidowedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].value.html, 'marital-select:fields.maritalStatus.options.widowed<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusWidowedResult));
        });
      });
    });

    describe('claimFromDate', () => {
      it('should return a array that contains claimFromDate question as after spa when session is after spa', () => {
        const result = checkChangeHelper.requestFilter(claimFromDateAfterSpaDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(JSON.stringify(result), JSON.stringify(claimFromDateAfterSpaDetailResult));
      });
    });
  });
  describe('checkAndSetEditMode', () => {
    it('should return false when query is undefined', () => {
      assert.equal(checkChangeHelper.checkAndSetEditMode(emptyRequest, 'section'), false);
    });

    it('should return false when query edit is not true', () => {
      assert.equal(checkChangeHelper.checkAndSetEditMode(editFalseQueryRequest, 'section'), false);
    });

    it('should return true when query edit is true', () => {
      checkChangeHelper.checkAndSetEditMode(editTrueQueryRequest, 'section');
      assert.equal(editTrueQueryRequest.session.editSection, 'section');
    });
  });

  describe('isEditMode', () => {
    it('should return false with empty request', () => {
      assert.equal(checkChangeHelper.isEditMode(emptyRequest, 'section'), false);
    });

    it('should return false when edit section does not match', () => {
      assert.equal(checkChangeHelper.isEditMode(editSectionInvalidRequest, 'section'), false);
    });

    it('should return true when edit section does match', () => {
      assert.equal(checkChangeHelper.isEditMode(editSectionValidRequest, 'section'), true);
    });

    it('should return true when edit section does match when an array is supplied', () => {
      assert.equal(checkChangeHelper.isEditMode(editSectionValidRequest, ['section', 'section2']), true);
    });
  });

  describe('idFormatter', () => {
    it('should convert uri formatted string to a camalCase id format when valid uri provided', () => {
      assert.equal(checkChangeHelper.idFormatter('/this-is-a-uri'), 'thisIsAUri');
    });
    it('should convert uri formatted string to a camalCase id format when multiple forward slashes are provided', () => {
      assert.equal(checkChangeHelper.idFormatter('////this-is-a-uri//'), 'thisIsAUri');
    });
  });
  describe('analyticsTagFormatter', () => {
    it('should remove forward slash from string when a string with a forward slash is provided', () => {
      assert.equal(checkChangeHelper.analyticsTagFormatter('/this-is-a-uri'), 'this-is-a-uri');
    });
    it('should remove forward slash from string when a string with a multiple forward slashes are provided', () => {
      assert.equal(checkChangeHelper.analyticsTagFormatter('////this-is-a-uri//'), 'this-is-a-uri');
    });
  });
  describe('checkSessionHasntChanged', () => {
    it('should return true when key is not in session', () => {
      assert.isTrue(checkChangeHelper.checkSessionHasntChanged(emptySession, 'bob', {}));
    });
    it('should return true when session data is the same as details', () => {
      assert.isTrue(checkChangeHelper.checkSessionHasntChanged(sessionRequest, 'foo', sessionRequest.session.foo));
    });
    it('should return false when session data is different to details', () => {
      assert.isFalse(checkChangeHelper.checkSessionHasntChanged(sessionRequest, 'foo', { bar: 'foo' }));
    });
  });
  describe('clearCheckChange', () => {
    it('should return editSection session as undefined when editSection in session', () => {
      checkChangeHelper.clearCheckChange(editSection);
      assert.isUndefined(editSection.session.editSection);
    });
  });
  describe('processEditSectionShowError', () => {
    it('should return editSectionShowError session as undefined when editSectionShowError in session and return true', () => {
      const processEditSectionShowError = checkChangeHelper.processEditSectionShowError(editSection);
      assert.isFalse(processEditSectionShowError);
      assert.isUndefined(editSection.session.editSectionShowError);
    });
    it('should return false when editSectionShowError is not in session', () => {
      assert.isFalse(checkChangeHelper.processEditSectionShowError(emptySession));
    });
  });
  describe('setupDataAndShowErrorsMessages', () => {
    it('should return false when editSectionShowError is not in session', () => {
      assert.isFalse(checkChangeHelper.setupDataAndShowErrorsMessages(emptySession));
    });
    it('should return false when editSectionShowError is in session but editSection does not match', () => {
      assert.isFalse(checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'bob', lang: 'en' } }));
    });
    it('should return errors when show section errors is present in session and edit section is lived-abroad', () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'lived-abroad', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
    });
    it('should return errors when show section errors is present in session and edit section is worked-abroad', () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'worked-abroad', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
    });
    it('should return errors when show section errors is present in session and edit section is marital-select', () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'marital-select', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
    });
  });
  describe('checkEditSectionAndClearCheckChange', () => {
    it('should return false when edit mode is false', () => {
      assert.isFalse(checkChangeHelper.checkEditSectionAndClearCheckChange(emptySession, false));
    });
    it('should return false when edit mode is undefined', () => {
      assert.isFalse(checkChangeHelper.checkEditSectionAndClearCheckChange(emptySession));
    });
    it('should return false when edit mode true but does not match session', () => {
      assert.isFalse(checkChangeHelper.checkEditSectionAndClearCheckChange(emptySession, true));
    });
    it('should clear check change for section when lived-abroad request is provided', () => {
      const request = { session: { editSection: 'lived-abroad' }, body: { livedAbroad: 'no' } };
      checkChangeHelper.checkEditSectionAndClearCheckChange(request, true);
      assert.isUndefined(request.editSection);
    });
    it('should clear check change for section when worked-abroad request is provided', () => {
      const request = { session: { editSection: 'worked-abroad' }, body: { workedAbroad: 'no' } };
      checkChangeHelper.checkEditSectionAndClearCheckChange(request, true);
      assert.isUndefined(request.editSection);
    });
    it('should clear check change for section when marital-selectrequest is provided', () => {
      const request = { session: { editSection: 'marital-select' }, body: { maritalStatus: 'single' } };
      checkChangeHelper.checkEditSectionAndClearCheckChange(request, true);
      assert.isUndefined(request.editSection);
    });
  });
});
