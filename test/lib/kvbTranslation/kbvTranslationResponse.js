const i18n = require('i18next');

module.exports = {
  KBV1Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV1.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:answers.yes'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:answers.no'),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV1.error'),
  }),
  KBV2Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV2.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.january')} 2018`,
    }),
    options: [{
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:answers.yes'),
    }, {
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:answers.no'),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV2.error'),
  }),
  KBV3Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV3.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.july')} 2021`,
    }),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:money.lessThan', { FROM_AMOUNT: '£1,500' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£1,500', TO_AMOUNT: '£2,999' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£3,000', TO_AMOUNT: '£5,999' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£6,000', TO_AMOUNT: '£10,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.moreThan', { FROM_AMOUNT: '£10,000' }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV3.error'),
  }),
  KBV5Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV5.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:answers.yes'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:answers.no'),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV5.error'),
  }),
  KBV6Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV6.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 1, SUFFIX: i18n.getFixedT(lang)('kbv-questions:answers.year') }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 1, TO_YEAR: 3 }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 3, TO_YEAR: 5 }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 5, SUFFIX: i18n.getFixedT(lang)('kbv-questions:answers.years') }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:KBV6.answers.never'),
    }],
    orBeforeLastOption: true,
    error: i18n.getFixedT(lang)('kbv-questions:KBV6.error'),
  }),
  KBV7Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV7.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:answers.yes'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:answers.no'),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV7.error'),
  }),
  KBV8Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV8.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:money.lessThan', { FROM_AMOUNT: '£25,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£25,000', TO_AMOUNT: '£74,999' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£75,000', TO_AMOUNT: '£124,999' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£125,000', TO_AMOUNT: '£175,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.moreThan', { FROM_AMOUNT: '£175,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:KBV8.answers.never'),
    }],
    orBeforeLastOption: true,
    error: i18n.getFixedT(lang)('kbv-questions:KBV8.error'),
  }),
  KBV9Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV9.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.december')} 2020`,
    }),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:money.lessThan', { FROM_AMOUNT: '£25,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£25,000', TO_AMOUNT: '£74,999' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£75,000', TO_AMOUNT: '£124,999' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£125,000', TO_AMOUNT: '£175,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.moreThan', { FROM_AMOUNT: '£175,000' }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV9.error'),
  }),
  KBV10Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV10.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:answers.yes'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:answers.no'),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV10.error'),
  }),
  KBV11Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV11.question'),
    options: [{
      correct: true,
      text: 'FLAT 57, 97 TULLY AVENUE',
    }, {
      correct: false,
      text: 'FLAT 2, MARILYN COTTAGE, EMMA ROAD',
    }, {
      correct: false,
      text: 'FLAT 1, BENFORD MANSIONS, 1 VAIDAS STREET',
    }, {
      correct: false,
      text: '28 TOP GEAR LANE',
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:KBV11.answers.none'),
    }],
    orBeforeLastOption: true,
    error: i18n.getFixedT(lang)('kbv-questions:KBV11.error'),
  }),
  KBV12Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV12.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 1, SUFFIX: i18n.getFixedT(lang)('kbv-questions:answers.year') }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 1, TO_YEAR: 3 }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 3, TO_YEAR: 5 }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 5, TO_YEAR: 8 }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 8, SUFFIX: i18n.getFixedT(lang)('kbv-questions:answers.years') }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV12.error'),
  }),
  KBV13Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV13.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.january')} 2021`,
    }),
    options: [{
      correct: true,
      text: 'DEBENHAMS (NEWDAY LTD)',
    }, {
      correct: false,
      text: 'HOME RETAIL GROUP SERVICES',
    }, {
      correct: false,
      text: 'NATWEST',
    }, {
      correct: false,
      text: 'MARKS AND SPENCER',
    }, {
      correct: false,
      text: 'TESCO BANK',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV13.error'),
  }),
  KBV14Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV14.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.january')} 2019`,
    }),
    options: [{
      correct: true,
      text: 'TEST BANK 1',
    }, {
      correct: false,
      text: 'TEST BANK 2',
    }, {
      correct: false,
      text: 'TEST BANK 3',
    }, {
      correct: false,
      text: 'TEST BANK 4',
    }, {
      correct: false,
      text: 'TEST BANK 5',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV14.error'),
  }),
  KBV15Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV15.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.march')} 2019`,
    }),
    options: [{
      correct: true,
      text: 'TEST HIRE PURCHASE 1',
    }, {
      correct: false,
      text: 'TEST HIRE PURCHASE 2',
    }, {
      correct: false,
      text: 'TEST HIRE PURCHASE 3',
    }, {
      correct: false,
      text: 'TEST HIRE PURCHASE 4',
    }, {
      correct: false,
      text: 'TEST HIRE PURCHASE 5',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV15.error'),
  }),
  KBV16Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV16.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.june')} 2019`,
    }),
    options: [{
      correct: true,
      text: 'TEST BANK 1',
    }, {
      correct: false,
      text: 'TEST BANK 2',
    }, {
      correct: false,
      text: 'TEST BANK 3',
    }, {
      correct: false,
      text: 'TEST BANK 4',
    }, {
      correct: false,
      text: 'TEST BANK 5',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV16.error'),
  }),
  KBV17Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV17.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.october')} 2019`,
    }),
    options: [{
      correct: true,
      text: 'TEST MAIL ORDER 1',
    }, {
      correct: false,
      text: 'TEST MAIL ORDER 2',
    }, {
      correct: false,
      text: 'TEST MAIL ORDER 3',
    }, {
      correct: false,
      text: 'TEST MAIL ORDER 4',
    }, {
      correct: false,
      text: 'TEST MAIL ORDER 5',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV17.error'),
  }),
  KBV18Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV18.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.may')} 2005`,
    }),
    options: [{
      correct: true,
      text: 'T-MOBILE',
    }, {
      correct: false,
      text: 'EE',
    }, {
      correct: false,
      text: 'THREE',
    }, {
      correct: false,
      text: 'ORANGE',
    }, {
      correct: false,
      text: 'O2',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV18.error'),
  }),
  KBV19Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV19.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.december')} 2019`,
    }),
    options: [{
      correct: true,
      text: 'SKIPTON BUILDING SOCIETY',
    }, {
      correct: false,
      text: 'LLOYDS BANK (WAS LLOYDS TSB)',
    }, {
      correct: false,
      text: 'LLOYDS BANK (WAS LLOYDS TSB)',
    }, {
      correct: false,
      text: 'BRITANNIA',
    }, {
      correct: false,
      text: 'TSB BANK (WAS LLOYDS TSB)',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV19.error'),
  }),
  KBV20Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV20.question'),
    options: [{
      correct: true,
      text: 'FLAT 58, ONEONLY AVENUE',
    }, {
      correct: false,
      text: 'MCYEBUAH CASTLE, 14 EMMA ROAD',
    }, {
      correct: false,
      text: 'FLAT 1, BENFORD MANSIONS, 1 VAIDAS STREET',
    }, {
      correct: false,
      text: '28 TOP GEAR LANE',
    }, {
      correct: false,
      text: 'THE RANGAS, PATCH SQUARE',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV20.error'),
  }),
  KBV21Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV21.question'),
    options: [{
      correct: true,
      text: '1983',
    }, {
      correct: false,
      text: '1987',
    }, {
      correct: false,
      text: '1990',
    }, {
      correct: false,
      text: '1991',
    }, {
      correct: false,
      text: '1992',
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV21.error'),
  }),
  KBV22Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV22.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:months.march'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:months.april'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:months.may'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:months.july'),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:months.september'),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV22.error'),
  }),
  KBV29Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV29.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 1, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.year'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 1, TO_YEAR: 3, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 3, TO_YEAR: 5, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 5, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV29.error'),
  }),
  KBV30Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV30.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 1, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.year'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 1, TO_YEAR: 3, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 3, TO_YEAR: 5, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 5, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV30.error'),
  }),
  KBV31Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV31.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 2, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 2, TO_YEAR: 4, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 4, TO_YEAR: 6, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 6, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV31.error'),
  }),
  KBV32Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV32.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 1, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.year'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 1, TO_YEAR: 3, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 3, TO_YEAR: 5, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 5, TO_YEAR: 7, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 7, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV32.error'),
  }),
  KBV33Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV33.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 1, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.year'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 1, TO_YEAR: 3, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 3, TO_YEAR: 5, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 5, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV33.error'),
  }),
  KBV34Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV34.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 2, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 2, TO_YEAR: 4, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 4, TO_YEAR: 6, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 6, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV34.error'),
  }),
  KBV35Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV35.question'),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:years.lessThan', { FROM_YEAR: 2, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 2, TO_YEAR: 4, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 4, TO_YEAR: 6, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 6, TO_YEAR: 8, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.between', { FROM_YEAR: 8, TO_YEAR: 10, SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:years.moreThan', { FROM_YEAR: 10, YEAR_TEXT: i18n.getFixedT(lang)('kbv-questions:answers.years'), SUFFIX: ` ${i18n.getFixedT(lang)('kbv-questions:answers.ago')}` }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV35.error'),
  }),
  KBV36Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV36.question'),
    options: [{
      correct: true,
      text: `${i18n.getFixedT(lang)('kbv-questions:months.february')} 1943`,
    }, {
      correct: false,
      text: `${i18n.getFixedT(lang)('kbv-questions:months.october')} 1944`,
    }, {
      correct: false,
      text: `${i18n.getFixedT(lang)('kbv-questions:months.june')} 1947`,
    }, {
      correct: false,
      text: `${i18n.getFixedT(lang)('kbv-questions:months.may')} 1949`,
    }, {
      correct: false,
      text: `${i18n.getFixedT(lang)('kbv-questions:months.june')} 1950`,
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV36.error'),
  }),
  KBV37Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV37.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.may')} 2020`,
      DATE: '16/02/2022',
    }),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:money.lessThan', { FROM_AMOUNT: '£500' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£500', TO_AMOUNT: '£1,499' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£1,500', TO_AMOUNT: '£2,499' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£2,500', TO_AMOUNT: '£5,000' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.moreThan', { FROM_AMOUNT: '£5,000' }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV37.error'),
  }),
  KBV38Response: (lang = 'en') => ({
    question: i18n.getFixedT(lang)('kbv-questions:KBV38.question', {
      MONTH_YEAR: `${i18n.getFixedT(lang)('kbv-questions:months.january')} 2018`,
      DATE: '16/02/2022',
    }),
    options: [{
      correct: true,
      text: i18n.getFixedT(lang)('kbv-questions:money.lessThan', { FROM_AMOUNT: '£150' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£150', TO_AMOUNT: '£299' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£300', TO_AMOUNT: '£749' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.between', { FROM_AMOUNT: '£750', TO_AMOUNT: '£1,500' }),
    }, {
      correct: false,
      text: i18n.getFixedT(lang)('kbv-questions:money.moreThan', { FROM_AMOUNT: '£1,500' }),
    }],
    orBeforeLastOption: false,
    error: i18n.getFixedT(lang)('kbv-questions:KBV38.error'),
  }),
};
