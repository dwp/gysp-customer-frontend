const i18n = require('i18next');

const MONTHS = '(?:January|February|March|April|May|June|July|August|September|October|November|December)';
const YEARS = '(?:19[7-9]\\d|2\\d{3})(?=\\D|$)';
const MONTH_YEAR_REGEX = `\\b${MONTHS} ${YEARS}`;
const BRITISH_FORMAT_DATE_REGEX = '([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)+\\d{4}';

const orOption = ['KBV6', 'KBV8', 'KBV11'];

const yesNo = (text) => {
  if (['Yes', 'No'].includes(text)) {
    return i18n.t(`kbv-questions:answers.${text.toLowerCase()}`);
  }
  return text;
};

const money = (text, category) => {
  const moneyArray = text.match(/£?[0-9]{1,3}(,\d{3})*(\.\d{2})?/g) || [];
  const [FROM_AMOUNT, TO_AMOUNT] = moneyArray;

  if (text.includes('Less than')) {
    return i18n.t('kbv-questions:money.lessThan', { FROM_AMOUNT });
  }
  if (moneyArray.length === 2) {
    return i18n.t('kbv-questions:money.between', { FROM_AMOUNT, TO_AMOUNT });
  }
  if (text.includes('More than')) {
    return i18n.t('kbv-questions:money.moreThan', { FROM_AMOUNT });
  }
  if (text.includes('I don\'t')) {
    return i18n.t(`kbv-questions:${category}.answers.never`);
  }

  return text;
};

const years = (text, category, includeAgoSuffix = false) => {
  let answerKey = 'never';
  if (text.includes('Less than')) {
    answerKey = 'lessThan';
  } else if (text.includes('Between')) {
    answerKey = 'between';
  } else if (text.includes('More than')) {
    answerKey = 'moreThan';
  }

  if (answerKey === 'never') {
    return i18n.t(`kbv-questions:${category}.answers.${answerKey}`);
  }

  const yearsArray = text.match(/\d+/g) || [];
  const [FROM_YEAR, TO_YEAR] = yearsArray.map((num) => (num ? Number(num) : num));

  const YEAR_TEXT = i18n.t(`kbv-questions:answers.${FROM_YEAR > 1 ? 'years' : 'year'}`);
  const SUFFIX = includeAgoSuffix ? ` ${i18n.t('kbv-questions:answers.ago')}` : null;
  return i18n.t(`kbv-questions:years.${answerKey}`, {
    YEAR_TEXT,
    FROM_YEAR,
    TO_YEAR,
    SUFFIX,
  });
};

const months = (text) => {
  const regEx = new RegExp(MONTHS);
  return text.replace(regEx, (match) => {
    const lowerItem = match.toLowerCase();
    return i18n.t(`kbv-questions:months.${lowerItem}`);
  });
};

const questionMapper = (category, questionText) => {
  // Fall back to original question when no category translation available
  if (!i18n.exists(`kbv-questions:${category}.question`)) {
    // @TODO Do we need to log anything here
    return questionText;
  }

  // Find date in MONTH YEAR format
  const monthYearDateRegEx = new RegExp(MONTH_YEAR_REGEX);
  let [MONTH_YEAR] = questionText.match(monthYearDateRegEx) || [];

  // Translate month
  if (MONTH_YEAR) {
    MONTH_YEAR = months(MONTH_YEAR);
  }

  // Find date format DD/MM/YYYY
  const dateRegEx = new RegExp(BRITISH_FORMAT_DATE_REGEX);
  const [DATE] = questionText.match(dateRegEx) || [];

  return i18n.t(`kbv-questions:${category}.question`, {
    MONTH_YEAR,
    DATE,
  });
};

const answerOptionsMapper = (category) => (option) => {
  let { text } = option;

  // eslint-disable-next-line default-case
  switch (category) {
    case 'KBV1':
    case 'KBV2':
    case 'KBV5':
    case 'KBV7':
    case 'KBV10':
      text = yesNo(option.text);
      break;
    case 'KBV3':
    case 'KBV8':
    case 'KBV9':
    case 'KBV37':
    case 'KBV38':
      text = money(option.text, category);
      break;
    case 'KBV6':
    case 'KBV12':
      text = years(option.text, category, false);
      break;
    case 'KBV29':
    case 'KBV30':
    case 'KBV31':
    case 'KBV32':
    case 'KBV33':
    case 'KBV34':
    case 'KBV35':
      text = years(option.text, category, true);
      break;
    case 'KBV11':
      text = option.text.replace('None of the above', i18n.t(`kbv-questions:${category}.answers.none`));
      break;
    case 'KBV22':
    case 'KBV36':
      text = months(option.text);
      break;
  }

  return {
    ...option,
    text,
  };
};

const beforeLastOption = (category) => orOption.includes(category);

const translateQuestion = (obj, lang = 'en') => {
  const { category, questionText, options } = obj;

  // Globally set language
  i18n.changeLanguage(lang);

  return {
    question: questionMapper(category, questionText),
    options: options.map(answerOptionsMapper(category)),
    orBeforeLastOption: beforeLastOption(category),
    error: i18n.t(`kbv-questions:${category}.error`),
  };
};

module.exports = {
  translateQuestion,
};
