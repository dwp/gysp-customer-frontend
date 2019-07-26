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
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const livedAbroadNoDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'no' },
}, baseDetails);

const livedAbroadNoResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-ever-lived-outside-of-the-uk', question: 'lived-abroad:header', answer: ['lived-abroad:fields.livedAbroad.options.no'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const livedAbroadYesNoCountriesDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'yes' },
}, baseDetails);

const livedAbroadYesNoCountriesResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-ever-lived-outside-of-the-uk', question: 'lived-abroad:header', answer: ['lived-abroad:fields.livedAbroad.options.yes'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const livedAbroadYesNoDetailsDetails = Object.assign({
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
}, baseDetails);

const livedAbroadYesNoDetailsResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-ever-lived-outside-of-the-uk', question: 'lived-abroad:header', answer: ['Spain', 'France'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
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
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-ever-lived-outside-of-the-uk', question: 'lived-abroad:header', answer: ['Spain', 'Jan 2000 - Dec 2000', 'France', 'Jan 2001 - Dec 2001'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
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
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-countries-have-you-lived-in', question: 'countries:lived.header-overseas', answer: ['Spain', 'Jan 2000 - Dec 2000', 'France', 'Jan 2001 - Dec 2001'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const livedAbroadYesWithDetailsWelshResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-ever-lived-outside-of-the-uk', question: 'lived-abroad:header', answer: ['Spain', 'Ion 2000 - Rhag 2000', 'France', 'Ion 2001 - Rhag 2001'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const workedAbroadNoDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'no' },
}, baseDetails);

const workedAbroadNoResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-worked-outside-of-the-uk', question: 'worked-abroad:header', answer: ['worked-abroad:fields.workedAbroad.options.no'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const workedAbroadYesNoCountriesDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'yes' },
}, baseDetails);

const workedAbroadYesNoCountriesResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-worked-outside-of-the-uk', question: 'worked-abroad:header', answer: ['worked-abroad:fields.workedAbroad.options.yes'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const workedAbroadYesNoDetailsDetails = Object.assign({
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
}, baseDetails);

const workedAbroadYesNoDetailsResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-worked-outside-of-the-uk', question: 'worked-abroad:header', answer: ['Spain', 'France'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
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
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-worked-outside-of-the-uk', question: 'worked-abroad:header', answer: ['Spain', 'Jan 2000 - Dec 2000', 'SPAIN1234', 'France', 'Jan 2001 - Dec 2001', 'FRANCE1234'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const workedAbroadYesWithDetailsWelshResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/have-you-worked-outside-of-the-uk', question: 'worked-abroad:header', answer: ['Spain', 'Ion 2000 - Rhag 2000', 'SPAIN1234', 'France', 'Ion 2001 - Rhag 2001', 'FRANCE1234'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const maritalStatusSingleDetails = Object.assign({
  'marital-select': { maritalStatus: 'single' },
}, baseDetails);

const maritalStatusSingleResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-is-your-current-marital-status', question: 'marital-select:header', answer: ['marital-select:fields.maritalStatus.options.single'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const maritalStatusMarriedDetails = Object.assign({
  'marital-select': { maritalStatus: 'married' },
  'marital-date-married': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-married': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusMarriedResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-is-your-current-marital-status', question: 'marital-select:header', answer: ['marital-select:fields.maritalStatus.options.married', '01/01/1960'] },
  { uri: '/about-your-spouse', question: 'marital-details:header.married', answer: ['Joanne Bloggs', 'Other Name', '01/01/1940'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const maritalStatusCivilDetails = Object.assign({
  'marital-select': { maritalStatus: 'civil' },
  'marital-date-civil': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-civil': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusCivilResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-is-your-current-marital-status', question: 'marital-select:header', answer: ['marital-select:fields.maritalStatus.options.civil', '01/01/1960'] },
  { uri: '/about-your-civil-partner', question: 'marital-details:header.civil', answer: ['Joanne Bloggs', 'Other Name', '01/01/1940'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const maritalStatusDivorcedDetails = Object.assign({
  'marital-select': { maritalStatus: 'divorced' },
  'marital-date-divorced': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-divorced': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusDivorcedResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-is-your-current-marital-status', question: 'marital-select:header', answer: ['marital-select:fields.maritalStatus.options.divorced', '01/01/1960'] },
  { uri: '/about-your-ex-spouse', question: 'marital-details:header.divorced', answer: ['Joanne Bloggs', 'Other Name', '01/01/1940'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const maritalStatusDissolvedDetails = Object.assign({
  'marital-select': { maritalStatus: 'dissolved' },
  'marital-date-dissolved': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-dissolved': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusDissolvedResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-is-your-current-marital-status', question: 'marital-select:header', answer: ['marital-select:fields.maritalStatus.options.dissolved', '01/01/1960'] },
  { uri: '/about-your-ex-partner', question: 'marital-details:header.dissolved', answer: ['Joanne Bloggs', 'Other Name', '01/01/1940'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const maritalStatusWidowedDetails = Object.assign({
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-widowed': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
}, baseDetails);

const maritalStatusWidowedResult = [
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:beforeSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/what-is-your-current-marital-status', question: 'marital-select:header', answer: ['marital-select:fields.maritalStatus.options.widowed', '01/01/1960'] },
  { uri: '/about-your-late-spouse', question: 'marital-details:header.widowed', answer: ['Joanne Bloggs', 'Other Name', '01/01/1940'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
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
  { uri: '/date-of-birth', question: 'dob-confirmation:header', answer: ['01/01/1953'] },
  { uri: '/when-do-you-want-your-state-pension', question: 'pension-start-date:afterSpa.fields.claimFromDate.legend', answer: ['01/01/2018'] },
  { uri: '/contact-details', question: 'contact:header', answer: ['contact:fields.checkbox.options.home', '00000 000000', 'contact:fields.checkbox.options.mobile', '22222 222222', 'contact:fields.checkbox.options.work', '11111 111111', 'contact:fields.email.label', 'a@b.com'] },
];

const emptyRequest = {};
const editTrueQueryRequest = { session: {}, query: { edit: 'true' } };
const editFalseQueryRequest = { session: {}, query: { edit: 'false' } };

const editSectionValidRequest = { session: { editSection: 'section' } };
const editSectionInvalidRequest = { session: {} };

const requestWithYesLivedAboardNoCountires = { session: { 'lived-abroad': { livedAbroad: 'yes' } } };
const responseWithYesLivedAboardNoCountires = { session: { 'lived-abroad': { livedAbroad: 'no' } } };

const requestWithYesLivedAboardWithCountires = { session: { 'lived-abroad': { livedAbroad: 'yes' }, 'lived-abroad-countries': {} } };
const responseWithYesLivedAboardWithCountires = { session: { 'lived-abroad': { livedAbroad: 'yes' }, 'lived-abroad-countries': {} } };

const requestWithYesWorkedAboardNoCountires = { session: { 'worked-abroad': { workedAbroad: 'yes' } } };
const responseWithYesWorkedAboardNoCountires = { session: { 'worked-abroad': { workedAbroad: 'no' } } };

const requestWithYesWorkedAboardWithCountires = { session: { 'worked-abroad': { workedAbroad: 'yes' }, 'worked-abroad-countries': {} } };
const responseWithYesWorkedAboardWithCountires = { session: { 'worked-abroad': { workedAbroad: 'yes' }, 'worked-abroad-countries': {} } };

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
        assert.equal(result[2].answer.length, 1);
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesNoCountriesResult));
      });

      it('should return a array that contains livedAbroad as a list of countires when lived abroad and lived abroad is yes and countries are supplied without countires details', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesNoDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 2);
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesNoDetailsResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied with english language', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesWithDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 4);
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied with welsh language', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesWithDetailsDetails, welshLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 4);
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsWelshResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied and is an overseas customer', () => {
        const result = checkChangeHelper.requestFilter(livedAbroadYesWithDetailsOverseasDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 4);
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
        assert.equal(result[2].answer.length, 1);
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesNoCountriesResult));
      });

      it('should return a array that contains workedAbroad as a list of countires when worked abroad and worked abroad is yes and countries are supplied without countires details', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesNoDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 2);
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesNoDetailsResult));
      });

      it('should return a array that contains workedAbroad as a list of countires and to and from dates when worked abroad is yes, has countries and the dates are supplied with english language', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesWithDetailsDetails, englishLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 6);
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesWithDetailsResult));
      });

      it('should return a array that contains workedAbroad as a list of countires and to and from dates when worked abroad is yes, has countries and the dates are supplied with welsh language', () => {
        const result = checkChangeHelper.requestFilter(workedAbroadYesWithDetailsDetails, welshLangauge);
        assert.equal(result.length, 4);
        assert.equal(result[2].answer.length, 6);
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesWithDetailsWelshResult));
      });
    });

    describe(' maritalStatus ', () => {
      describe(' single ', () => {
        it('should return a array that contains maritalStatus as Single when single marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusSingleDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[2].answer.length, 1);
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusSingleResult));
        });
      });

      describe(' married ', () => {
        it('should return a array that contains maritalStatus as Married with date when married marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusMarriedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].answer.length, 2);
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusMarriedResult));
        });
      });

      describe(' civil ', () => {
        it('should return a array that contains maritalStatus as civil partnership with date when civil partnership marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusCivilDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].answer.length, 2);
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusCivilResult));
        });
      });

      describe(' divorced ', () => {
        it('should return a array that contains maritalStatus as divorced with date when divorced marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusDivorcedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].answer.length, 2);
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusDivorcedResult));
        });
      });

      describe(' dissolved ', () => {
        it('should return a array that contains maritalStatus as dissolved with date when dissolved marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusDissolvedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].answer.length, 2);
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusDissolvedResult));
        });
      });

      describe(' widowed ', () => {
        it('should return a array that contains maritalStatus as widowed with date when widowed marital status are supplied', () => {
          const result = checkChangeHelper.requestFilter(maritalStatusWidowedDetails, englishLangauge);
          assert.equal(result.length, 5);
          assert.equal(result[2].answer.length, 2);
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
  describe('cleanSessionForCheckAndChange', () => {
    it('should remove yes from lived abroad country when there are no country names in session', () => {
      const object = checkChangeHelper.cleanSessionForCheckAndChange(requestWithYesLivedAboardNoCountires);
      assert.equal(JSON.stringify(object), JSON.stringify(responseWithYesLivedAboardNoCountires));
    });
    it('should leave session untouched when there are lived abroad country names in session', () => {
      const object = checkChangeHelper.cleanSessionForCheckAndChange(requestWithYesLivedAboardWithCountires);
      assert.equal(JSON.stringify(object), JSON.stringify(responseWithYesLivedAboardWithCountires));
    });
    it('should remove yes from worked abroad country when there are no country names in session', () => {
      const object = checkChangeHelper.cleanSessionForCheckAndChange(requestWithYesWorkedAboardNoCountires);
      assert.equal(JSON.stringify(object), JSON.stringify(responseWithYesWorkedAboardNoCountires));
    });
    it('should leave session untouched when there are worked abroad country names in session', () => {
      const object = checkChangeHelper.cleanSessionForCheckAndChange(requestWithYesWorkedAboardWithCountires);
      assert.equal(JSON.stringify(object), JSON.stringify(responseWithYesWorkedAboardWithCountires));
    });
  });
});
