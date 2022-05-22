const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

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

const baseDetailResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const livedAbroadNoDetails = { 'lived-abroad': { livedAbroad: 'no' }, ...baseDetails };

const livedAbroadNoResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Lived outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'No' },
  actions: {
    items: [{
      href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Lived outside of the UK', attributes: { id: 'haveYouEverLivedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const livedAbroadYesNoCountriesDetails = { 'lived-abroad': { livedAbroad: 'yes' }, ...baseDetails };

const livedAbroadYesNoCountriesResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Lived outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Yes' },
  actions: {
    items: [{
      href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Lived outside of the UK', attributes: { id: 'haveYouEverLivedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const livedAbroadYesNoDetailsDetails = {
  'lived-abroad': { livedAbroad: 'yes' },
  'lived-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
  ...baseDetails,
};

const livedAbroadYesNoDetailsResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Lived outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />France' },
  actions: {
    items: [{
      href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Lived outside of the UK', attributes: { id: 'haveYouEverLivedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const livedAbroadYesWithDetailsDetails = {
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
  ...baseDetails,
};

const livedAbroadYesWithDetailsResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Lived outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001' },
  actions: {
    items: [{
      href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Lived outside of the UK', attributes: { id: 'haveYouEverLivedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const livedAbroadYesWithDetailsOverseasDetails = {
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
  ...baseDetails,
};

const livedAbroadYesWithDetailsOverseasResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Where you lived outside the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001' },
  actions: {
    items: [{
      href: '/what-countries-have-you-lived-in?edit=true', text: 'Change', visuallyHiddenText: 'Where you lived outside the UK', attributes: { id: 'whatCountriesHaveYouLivedIn' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const livedAbroadYesWithDetailsWelshResult = [{
  key: { text: 'Dyddiad rydych am gael eich Pensiwn y Wladwriaeth', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Newid', visuallyHiddenText: 'Dyddiad rydych am gael eich Pensiwn y Wladwriaeth', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: "Wedi byw y tu allan i'r DU", classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />Ion 2000 - Rhag 2000<br />France<br />Ion 2001 - Rhag 2001' },
  actions: {
    items: [{
      href: '/have-you-ever-lived-outside-of-the-uk?edit=true', text: 'Newid', visuallyHiddenText: "Wedi byw y tu allan i'r DU", attributes: { id: 'haveYouEverLivedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Manylion Cyswllt', classes: 'govuk-!-width-one-third' },
  value: { html: 'Ffôn cartref<br />00000 000000<br />Ffôn symudol<br />22222 222222<br />Ffôn gwaith<br />11111 111111<br />Cyfeiriad e-bost<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Newid', visuallyHiddenText: 'Manylion Cyswllt', attributes: { id: 'contactDetails' },
    }],
  },
}];

const workedAbroadNoDetails = { 'worked-abroad': { workedAbroad: 'no' }, ...baseDetails };

const workedAbroadNoResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Worked outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'No' },
  actions: {
    items: [{
      href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Worked outside of the UK', attributes: { id: 'haveYouWorkedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const workedAbroadYesNoCountriesDetails = { 'worked-abroad': { workedAbroad: 'yes' }, ...baseDetails };

const workedAbroadYesNoCountriesResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Worked outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Yes' },
  actions: {
    items: [{
      href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Worked outside of the UK', attributes: { id: 'haveYouWorkedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const workedAbroadYesNoDetailsDetails = {
  'worked-abroad': { workedAbroad: 'yes' },
  'worked-abroad-countries': {
    'country-name[0]': 'Spain', 'country-name[1]': 'France', 'country-name[2]': '', 'country-name[3]': '',
  },
  ...baseDetails,
};

const workedAbroadYesNoDetailsResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Worked outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />France' },
  actions: {
    items: [{
      href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Worked outside of the UK', attributes: { id: 'haveYouWorkedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const workedAbroadYesWithDetailsDetails = {
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
  ...baseDetails,
};

const workedAbroadYesWithDetailsResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Worked outside of the UK', classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />Jan 2000 - Dec 2000<br />SPAIN1234<br />France<br />Jan 2001 - Dec 2001<br />FRANCE1234' },
  actions: {
    items: [{
      href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Change', visuallyHiddenText: 'Worked outside of the UK', attributes: { id: 'haveYouWorkedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const workedAbroadYesWithDetailsWelshResult = [{
  key: { text: 'Dyddiad rydych am gael eich Pensiwn y Wladwriaeth', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Newid', visuallyHiddenText: 'Dyddiad rydych am gael eich Pensiwn y Wladwriaeth', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: "Wedi gweithio y tu allan i'r DU", classes: 'govuk-!-width-one-third' },
  value: { html: 'Spain<br />Ion 2000 - Rhag 2000<br />SPAIN1234<br />France<br />Ion 2001 - Rhag 2001<br />FRANCE1234' },
  actions: {
    items: [{
      href: '/have-you-worked-outside-of-the-uk?edit=true', text: 'Newid', visuallyHiddenText: "Wedi gweithio y tu allan i'r DU", attributes: { id: 'haveYouWorkedOutsideOfTheUk' },
    }],
  },
}, {
  key: { text: 'Manylion Cyswllt', classes: 'govuk-!-width-one-third' },
  value: { html: 'Ffôn cartref<br />00000 000000<br />Ffôn symudol<br />22222 222222<br />Ffôn gwaith<br />11111 111111<br />Cyfeiriad e-bost<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Newid', visuallyHiddenText: 'Manylion Cyswllt', attributes: { id: 'contactDetails' },
    }],
  },
}];

const maritalStatusSingleDetails = { 'marital-select': { maritalStatus: 'single' }, ...baseDetails };

const altFormatDetails = { 'alt-formats': 'yes', 'alt-formats-choose': 'audioCassette', ...baseDetails };
const altFormatDetailsNo = { 'alt-formats': 'no', ...baseDetails };

const maritalStatusSingleResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Current marital status', classes: 'govuk-!-width-one-third' },
  value: { html: 'Never been married' },
  actions: {
    items: [{
      href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'Current marital status', attributes: { id: 'whatIsYourCurrentMaritalStatus' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const maritalStatusMarriedDetails = {
  'marital-select': { maritalStatus: 'married' },
  'marital-date-married': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-married': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
  ...baseDetails,
};

const maritalStatusMarriedResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Current marital status', classes: 'govuk-!-width-one-third' },
  value: { html: 'Married<br />01/01/1960' },
  actions: {
    items: [{
      href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'Current marital status', attributes: { id: 'whatIsYourCurrentMaritalStatus' },
    }],
  },
}, {
  key: { text: 'About your spouse', classes: 'govuk-!-width-one-third' },
  value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
  actions: {
    items: [{
      href: '/about-your-spouse?edit=true', text: 'Change', visuallyHiddenText: 'About your spouse', attributes: { id: 'aboutYourSpouse' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const maritalStatusCivilDetails = {
  'marital-select': { maritalStatus: 'civil' },
  'marital-date-civil': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-civil': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
  ...baseDetails,
};

const maritalStatusCivilResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Current marital status', classes: 'govuk-!-width-one-third' },
  value: { html: 'Civil partnership<br />01/01/1960' },
  actions: {
    items: [{
      href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'Current marital status', attributes: { id: 'whatIsYourCurrentMaritalStatus' },
    }],
  },
}, {
  key: { text: 'About your civil partner', classes: 'govuk-!-width-one-third' },
  value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
  actions: {
    items: [{
      href: '/about-your-civil-partner?edit=true', text: 'Change', visuallyHiddenText: 'About your civil partner', attributes: { id: 'aboutYourCivilPartner' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const maritalStatusDivorcedDetails = {
  'marital-select': { maritalStatus: 'divorced' },
  'marital-date-divorced': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-divorced': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
  ...baseDetails,
};

const maritalStatusDivorcedResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Current marital status', classes: 'govuk-!-width-one-third' },
  value: { html: 'Divorced<br />01/01/1960' },
  actions: {
    items: [{
      href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'Current marital status', attributes: { id: 'whatIsYourCurrentMaritalStatus' },
    }],
  },
}, {
  key: { text: 'About your ex-spouse', classes: 'govuk-!-width-one-third' },
  value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
  actions: {
    items: [{
      href: '/about-your-ex-spouse?edit=true', text: 'Change', visuallyHiddenText: 'About your ex-spouse', attributes: { id: 'aboutYourExSpouse' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const maritalStatusDissolvedDetails = {
  'marital-select': { maritalStatus: 'dissolved' },
  'marital-date-dissolved': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-dissolved': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
  ...baseDetails,
};

const maritalStatusDissolvedResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Current marital status', classes: 'govuk-!-width-one-third' },
  value: { html: 'Dissolved civil partnership<br />01/01/1960' },
  actions: {
    items: [{
      href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'Current marital status', attributes: { id: 'whatIsYourCurrentMaritalStatus' },
    }],
  },
}, {
  key: { text: 'About your ex-partner', classes: 'govuk-!-width-one-third' },
  value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
  actions: {
    items: [{
      href: '/about-your-ex-partner?edit=true', text: 'Change', visuallyHiddenText: 'About your ex-partner', attributes: { id: 'aboutYourExPartner' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const maritalStatusWidowedDetails = {
  'marital-select': { maritalStatus: 'widowed' },
  'marital-date-widowed': { dateYear: '1960', dateMonth: '01', dateDay: '01' },
  'marital-partner-widowed': {
    firstName: 'Joanne', surname: 'Bloggs', otherName: 'Other Name', dobYear: '1940', dobMonth: '01', dobDay: '01',
  },
  ...baseDetails,
};

const maritalStatusWidowedResult = [{
  key: { text: 'Date you want your State Pension', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Current marital status', classes: 'govuk-!-width-one-third' },
  value: { html: 'Widowed<br />01/01/1960' },
  actions: {
    items: [{
      href: '/what-is-your-current-marital-status?edit=true', text: 'Change', visuallyHiddenText: 'Current marital status', attributes: { id: 'whatIsYourCurrentMaritalStatus' },
    }],
  },
}, {
  key: { text: 'About your late spouse', classes: 'govuk-!-width-one-third' },
  value: { html: 'Joanne Bloggs<br />Other Name<br />01/01/1940' },
  actions: {
    items: [{
      href: '/about-your-late-spouse?edit=true', text: 'Change', visuallyHiddenText: 'About your late spouse', attributes: { id: 'aboutYourLateSpouse' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const claimFromDateAfterSpaDetails = {
  'dob-details': { dateYear: '1953', dateMonth: '01', dateDay: '01' },
  claimFromDate: { dateYear: '2018', dateMonth: '01', dateDay: '01' },
  'contact-details': {
    homeTelephoneNumber: '00000 000000', workTelephoneNumber: '11111 111111', mobileTelephoneNumber: '22222 222222', email: 'a@b.com',
  },
  isBeforeSpa: false,
};

const claimFromDateAfterSpaDetailResult = [{
  key: { text: 'Date you want your State Pension from', classes: 'govuk-!-width-one-third' },
  value: { text: ['01/01/2018'] },
  actions: {
    items: [{
      href: '/when-do-you-want-your-state-pension?edit=true', text: 'Change', visuallyHiddenText: 'Date you want your State Pension from', attributes: { id: 'whenDoYouWantYourStatePension' },
    }],
  },
}, {
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />00000 000000<br />Mobile phone<br />22222 222222<br />Work phone<br />11111 111111<br />Email address<br />a@b.com' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

const emptyRequest = {};
const emptySession = { session: {} };
const editTrueQueryRequest = { session: {}, query: { edit: 'true' } };
const editFalseQueryRequest = { session: {}, query: { edit: 'false' } };

const editSectionValidRequest = { session: { editSection: 'section' } };
const editSectionInvalidRequest = { session: {} };

const sessionRequest = { session: { foo: { foo: 'bar' } } };

const editSection = { session: { editSection: true, editSectionShowError: true } };

describe('Check Change Helper ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe(' requestFilter ', () => {
    it('should return a blank array when empty detail supplied', async () => {
      const result = await checkChangeHelper.requestFilter(emptyDetails, englishLangauge);
      assert.equal(result.length, 0);
      assert.equal(JSON.stringify(result), '[]');
    });

    it('should return a array when base details are supplied', async () => {
      const result = await checkChangeHelper.requestFilter(baseDetails, englishLangauge);
      assert.equal(result.length, 2);
      assert.equal(JSON.stringify(result), JSON.stringify(baseDetailResult));
    });

    describe(' livedAbroad ', () => {
      it('should return a array that contains livedAbroad as No when base details are supplied with lived abroad', async () => {
        const result = await checkChangeHelper.requestFilter(livedAbroadNoDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadNoResult));
      });

      it('should return a array that contains livedAbroad as Yes when lived abroad is supplied without countires', async () => {
        const result = await checkChangeHelper.requestFilter(livedAbroadYesNoCountriesDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Yes');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesNoCountriesResult));
      });

      it('should return a array that contains livedAbroad as a list of countires when lived abroad and lived abroad is yes and countries are supplied without countires details', async () => {
        const result = await checkChangeHelper.requestFilter(livedAbroadYesNoDetailsDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />France');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesNoDetailsResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied with english language', async () => {
        const result = await checkChangeHelper.requestFilter(livedAbroadYesWithDetailsDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied with welsh language', async () => {
        const result = await checkChangeHelper.requestFilter(livedAbroadYesWithDetailsDetails, welshLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />Ion 2000 - Rhag 2000<br />France<br />Ion 2001 - Rhag 2001');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsWelshResult));
      });

      it('should return a array that contains livedAbroad as a list of countires and to and from dates when lived abroad is yes, has countries and the dates are supplied and is an overseas customer', async () => {
        const result = await checkChangeHelper.requestFilter(livedAbroadYesWithDetailsOverseasDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />Jan 2000 - Dec 2000<br />France<br />Jan 2001 - Dec 2001');
        assert.equal(JSON.stringify(result), JSON.stringify(livedAbroadYesWithDetailsOverseasResult));
      });
    });

    describe(' workedAbroad ', () => {
      it('should return a array that contains workedAbroad as No when base details are supplied with worked abroad', async () => {
        const result = await checkChangeHelper.requestFilter(workedAbroadNoDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadNoResult));
      });

      it('should return a array that contains workedAbroad as Yes when worked abroad is supplied without countires', async () => {
        const result = await checkChangeHelper.requestFilter(workedAbroadYesNoCountriesDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Yes');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesNoCountriesResult));
      });

      it('should return a array that contains workedAbroad as a list of countires when worked abroad and worked abroad is yes and countries are supplied without countires details', async () => {
        const result = await checkChangeHelper.requestFilter(workedAbroadYesNoDetailsDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />France');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesNoDetailsResult));
      });

      it('should return a array that contains workedAbroad as a list of countires and to and from dates when worked abroad is yes, has countries and the dates are supplied with english language', async () => {
        const result = await checkChangeHelper.requestFilter(workedAbroadYesWithDetailsDetails, englishLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />Jan 2000 - Dec 2000<br />SPAIN1234<br />France<br />Jan 2001 - Dec 2001<br />FRANCE1234');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesWithDetailsResult));
      });

      it('should return a array that contains workedAbroad as a list of countires and to and from dates when worked abroad is yes, has countries and the dates are supplied with welsh language', async () => {
        const result = await checkChangeHelper.requestFilter(workedAbroadYesWithDetailsDetails, welshLangauge);
        assert.equal(result.length, 3);
        assert.equal(result[1].value.html, 'Spain<br />Ion 2000 - Rhag 2000<br />SPAIN1234<br />France<br />Ion 2001 - Rhag 2001<br />FRANCE1234');
        assert.equal(JSON.stringify(result), JSON.stringify(workedAbroadYesWithDetailsWelshResult));
      });
    });

    describe(' alt-formats ', () => {
      describe(' filled in ', () => {
        it('should return alt formats section when one of the alt formats option is selected', async () => {
          const result = await checkChangeHelper.requestFilter(altFormatDetails, englishLangauge);
          assert.equal(result.length, 3);
          assert.equal(result[2].value.html, 'Audio cassette');
        });

        it('should return alt formats section with "None" when answer to alt-formats question is no', async () => {
          const result = await checkChangeHelper.requestFilter(altFormatDetailsNo, englishLangauge);
          assert.equal(result.length, 3);
          assert.equal(result[2].value.html, 'None');
        });
      });
    });

    describe(' maritalStatus ', () => {
      describe(' single ', () => {
        it('should return a array that contains maritalStatus as Single when single marital status are supplied', async () => {
          const result = await checkChangeHelper.requestFilter(maritalStatusSingleDetails, englishLangauge);
          assert.equal(result.length, 3);
          assert.equal(result[1].value.html, 'Never been married');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusSingleResult));
        });
      });

      describe(' married ', () => {
        it('should return a array that contains maritalStatus as Married with date when married marital status are supplied', async () => {
          const result = await checkChangeHelper.requestFilter(maritalStatusMarriedDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[1].value.html, 'Married<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusMarriedResult));
        });
      });

      describe(' civil ', () => {
        it('should return a array that contains maritalStatus as civil partnership with date when civil partnership marital status are supplied', async () => {
          const result = await checkChangeHelper.requestFilter(maritalStatusCivilDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[1].value.html, 'Civil partnership<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusCivilResult));
        });
      });

      describe(' divorced ', () => {
        it('should return a array that contains maritalStatus as divorced with date when divorced marital status are supplied', async () => {
          const result = await checkChangeHelper.requestFilter(maritalStatusDivorcedDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[1].value.html, 'Divorced<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusDivorcedResult));
        });
      });

      describe(' dissolved ', () => {
        it('should return a array that contains maritalStatus as dissolved with date when dissolved marital status are supplied', async () => {
          const result = await checkChangeHelper.requestFilter(maritalStatusDissolvedDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[1].value.html, 'Dissolved civil partnership<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusDissolvedResult));
        });
      });

      describe(' widowed ', () => {
        it('should return a array that contains maritalStatus as widowed with date when widowed marital status are supplied', async () => {
          const result = await checkChangeHelper.requestFilter(maritalStatusWidowedDetails, englishLangauge);
          assert.equal(result.length, 4);
          assert.equal(result[1].value.html, 'Widowed<br />01/01/1960');
          assert.equal(JSON.stringify(result), JSON.stringify(maritalStatusWidowedResult));
        });
      });
    });

    describe('claimFromDate', () => {
      it('should return a array that contains claimFromDate question as after spa when session is after spa', async () => {
        const result = await checkChangeHelper.requestFilter(claimFromDateAfterSpaDetails, englishLangauge);
        assert.equal(result.length, 2);
        assert.equal(JSON.stringify(result), JSON.stringify(claimFromDateAfterSpaDetailResult));
      });
    });
  });

  describe('checkAndSetEditMode', () => {
    it('should return false when query is undefined', async () => {
      assert.equal(checkChangeHelper.checkAndSetEditMode(emptyRequest, 'section'), false);
    });

    it('should return false when query edit is not true', async () => {
      assert.equal(checkChangeHelper.checkAndSetEditMode(editFalseQueryRequest, 'section'), false);
    });

    it('should return true when query edit is true', async () => {
      checkChangeHelper.checkAndSetEditMode(editTrueQueryRequest, 'section');
      assert.equal(editTrueQueryRequest.session.editSection, 'section');
    });
  });

  describe('isEditMode', () => {
    it('should return false with empty request', async () => {
      assert.equal(checkChangeHelper.isEditMode(emptyRequest, 'section'), false);
    });

    it('should return false when edit section does not match', async () => {
      assert.equal(checkChangeHelper.isEditMode(editSectionInvalidRequest, 'section'), false);
    });

    it('should return true when edit section does match', async () => {
      assert.equal(checkChangeHelper.isEditMode(editSectionValidRequest, 'section'), true);
    });

    it('should return true when edit section does match when an array is supplied', async () => {
      assert.equal(checkChangeHelper.isEditMode(editSectionValidRequest, ['section', 'section2']), true);
    });
  });

  describe('idFormatter', () => {
    it('should convert uri formatted string to a camalCase id format when valid uri provided', async () => {
      assert.equal(checkChangeHelper.idFormatter('/this-is-a-uri'), 'thisIsAUri');
    });

    it('should convert uri formatted string to a camalCase id format when multiple forward slashes are provided', async () => {
      assert.equal(checkChangeHelper.idFormatter('////this-is-a-uri//'), 'thisIsAUri');
    });
  });

  describe('analyticsTagFormatter', () => {
    it('should remove forward slash from string when a string with a forward slash is provided', async () => {
      assert.equal(checkChangeHelper.analyticsTagFormatter('/this-is-a-uri'), 'this-is-a-uri');
    });

    it('should remove forward slash from string when a string with a multiple forward slashes are provided', async () => {
      assert.equal(checkChangeHelper.analyticsTagFormatter('////this-is-a-uri//'), 'this-is-a-uri');
    });
  });

  describe('checkSessionHasntChanged', () => {
    it('should return true when key is not in session', async () => {
      assert.isTrue(checkChangeHelper.checkSessionHasntChanged(emptySession, 'bob', {}));
    });

    it('should return true when session data is the same as details', async () => {
      assert.isTrue(checkChangeHelper.checkSessionHasntChanged(sessionRequest, 'foo', sessionRequest.session.foo));
    });

    it('should return false when session data is different to details', async () => {
      assert.isFalse(checkChangeHelper.checkSessionHasntChanged(sessionRequest, 'foo', { bar: 'foo' }));
    });
  });

  describe('clearCheckChange', () => {
    it('should return editSection session as undefined when editSection in session', async () => {
      checkChangeHelper.clearCheckChange(editSection);
      assert.isUndefined(editSection.session.editSection);
    });
  });

  describe('processEditSectionShowError', () => {
    it('should return editSectionShowError session as undefined when editSectionShowError in session and return true', async () => {
      const processEditSectionShowError = checkChangeHelper.processEditSectionShowError(editSection);
      assert.isFalse(processEditSectionShowError);
      assert.isUndefined(editSection.session.editSectionShowError);
    });

    it('should return false when editSectionShowError is not in session', async () => {
      assert.isFalse(checkChangeHelper.processEditSectionShowError(emptySession));
    });
  });

  describe('setupDataAndShowErrorsMessages', () => {
    it('should return false when editSectionShowError is not in session', async () => {
      assert.isFalse(checkChangeHelper.setupDataAndShowErrorsMessages(emptySession));
    });

    it('should return false when editSectionShowError is in session but editSection does not match', async () => {
      assert.isFalse(checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'bob', lang: 'en' } }));
    });

    it('should return errors when show section errors is present in session and edit section is lived-abroad', async () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'lived-abroad', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
    });

    it('should return errors when show section errors is present in session and edit section is worked-abroad', async () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'worked-abroad', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
    });

    it('should return errors when show section errors is present in session and edit section is marital-select', async () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'marital-select', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
    });

    it('should return errors when show section errors is present in session and edit section is alt-formats', async () => {
      const response = checkChangeHelper.setupDataAndShowErrorsMessages({ session: { editSectionShowError: true, editSection: 'alt-formats', lang: 'en' } });
      assert.lengthOf(Object.keys(response), 2);
      assert.equal(response.errorSummary.length, 1);
      assert.deepEqual(response.fieldLevelErrors.altFormat, { text: 'Select yes if you would like us to send letters to you in another format', href: '#altFormat-Yes' });
    });
  });

  describe('checkEditSectionAndClearCheckChange', () => {
    it('should return false when edit mode is false', async () => {
      assert.isFalse(checkChangeHelper.checkEditSectionAndClearCheckChange(emptySession, false));
    });

    it('should return false when edit mode is undefined', async () => {
      assert.isFalse(checkChangeHelper.checkEditSectionAndClearCheckChange(emptySession));
    });

    it('should return false when edit mode true but does not match session', async () => {
      assert.isFalse(checkChangeHelper.checkEditSectionAndClearCheckChange(emptySession, true));
    });

    it('should clear check change for section when lived-abroad request is provided', async () => {
      const request = { session: { editSection: 'lived-abroad' }, body: { livedAbroad: 'no' } };
      checkChangeHelper.checkEditSectionAndClearCheckChange(request, true);
      assert.isUndefined(request.editSection);
    });

    it('should clear check change for section when worked-abroad request is provided', async () => {
      const request = { session: { editSection: 'worked-abroad' }, body: { workedAbroad: 'no' } };
      checkChangeHelper.checkEditSectionAndClearCheckChange(request, true);
      assert.isUndefined(request.editSection);
    });

    it('should clear check change for section when marital-selectrequest is provided', async () => {
      const request = { session: { editSection: 'marital-select' }, body: { maritalStatus: 'single' } };
      checkChangeHelper.checkEditSectionAndClearCheckChange(request, true);
      assert.isUndefined(request.editSection);
    });
  });
});
