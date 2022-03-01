const i18n = require('i18next');

const MONTHS = '(?:January|February|March|April|May|June|July|August|September|October|November|December)';
const YEARS = '(?:19[7-9]\\d|2\\d{3})(?=\\D|$)';
const MONTH_YEAR_REGEX = `\\b${MONTHS} ${YEARS}`;
const BRITISH_FORMAT_DATE_REGEX = '([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)+\\d{4}';
const GBP_MONEY_FORMAT_REGEX = /£?[0-9]{1,3}(,\d{3})*(\.\d{2})?/g;

const YES_NO_V1_OPTIONS = ['KBV1', 'KBV2'];
const YES_NO_V2_OPTIONS = ['KBV5', 'KBV7', 'KBV10'];
const MONETARY_OPTIONS = ['KBV3', 'KBV8', 'KBV9', 'KBV37', 'KBV38'];
const YEARS_WITHOUT_SUFFIX_OPTIONS = ['KBV6', 'KBV12'];
const YEARS_WITH_SUFFIX_OPTIONS = ['KBV29', 'KBV30', 'KBV31', 'KBV32', 'KBV33', 'KBV34', 'KBV35'];
const MONTHS_OPTIONS = ['KBV22', 'KBV36'];

const OR_OPTIONS = ['KBV6', 'KBV8', 'KBV11'];

const extractMoneyFromString = (string) => string.match(GBP_MONEY_FORMAT_REGEX) || [];

const translateYesNoOption = (text, useV2Yes = false) => {
  const formatted = text.trim();
  if (formatted === 'Yes') {
    // We have two version of yes for welsh language support
    if (useV2Yes) {
      return i18n.t('kbv-questions:answers.yes.v2');
    }
    return i18n.t('kbv-questions:answers.yes.v1');
  }
  if (formatted === 'No') {
    return i18n.t('kbv-questions:answers.no');
  }
  return text;
};

const translateExtractMoney = (text, category) => {
  const moneyArray = extractMoneyFromString(text);
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

const translateExtractYears = (text, category, includeAgoSuffix = false) => {
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

const translateMonths = (text) => {
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
    MONTH_YEAR = translateMonths(MONTH_YEAR);
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

  if (YES_NO_V1_OPTIONS.includes(category)) {
    text = translateYesNoOption(option.text);
  } else if (YES_NO_V2_OPTIONS.includes(category)) {
    text = translateYesNoOption(option.text, true);
  } else if (MONETARY_OPTIONS.includes(category)) {
    text = translateExtractMoney(option.text, category);
  } else if (YEARS_WITHOUT_SUFFIX_OPTIONS.includes(category)) {
    text = translateExtractYears(option.text, category, false);
  } else if (YEARS_WITH_SUFFIX_OPTIONS.includes(category)) {
    text = translateExtractYears(option.text, category, true);
  } else if (MONTHS_OPTIONS.includes(category)) {
    text = translateMonths(option.text);
  } else if (category === 'KBV11') {
    text = option.text.replace('None of the above', i18n.t(`kbv-questions:${category}.answers.none`));
  }

  return {
    ...option,
    text,
  };
};

const beforeLastOption = (category) => OR_OPTIONS.includes(category);

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
  extractMoneyFromString,
  translateYesNoOption,
  translateExtractMoney,
  translateExtractYears,
  translateMonths,
};
