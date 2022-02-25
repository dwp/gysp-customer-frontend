module.exports = {
  KBV1Request: () => ({
    category: 'KBV1',
    questionText: 'Have you taken out a credit card or store card in the last 12 months?',
    options: [{
      correct: true,
      text: 'Yes',
    }, {
      correct: false,
      text: 'No',
    }],
  }),
  KBV2Request: () => ({
    category: 'KBV2',
    questionText: 'Is your current account that was opened in January 2018 a joint account?',
    options: [{
      correct: false,
      text: 'Yes',
    }, {
      correct: true,
      text: 'No',
    }],
  }),
  KBV3Request: () => ({
    category: 'KBV3',
    questionText: 'You took out a loan in July 2021, what is the current outstanding balance?',
    options: [{
      correct: true,
      text: 'Less than £1,500',
    }, {
      correct: false,
      text: '£1,500 - £2,999',
    }, {
      correct: false,
      text: '£3,000 - £5,999',
    }, {
      correct: false,
      text: '£6,000 - £10,000',
    }, {
      correct: false,
      text: 'More than £10,000',
    }],
  }),
  KBV4Request: () => ({
    category: 'KBV4',
    questionText: 'When did you last take out a personal loan (excluding student loans)?',
    options: [{
      correct: true,
      text: 'Less than 1 year ago',
    }, {
      correct: false,
      text: 'Between 1 and 3 years ago',
    }, {
      correct: false,
      text: 'Between 3 and 5 years ago',
    }, {
      correct: false,
      text: 'More than 5 years ago or I have never had one',
    }],
  }),
  KBV5Request: () => ({
    category: 'KBV5',
    questionText: 'Do you currently have a personal loan (excluding student loans)?',
    options: [{
      correct: true,
      text: 'Yes',
    }, {
      correct: false,
      text: 'No',
    }],
  }),
  KBV6Request: () => ({
    category: 'KBV6',
    questionText: 'How long have you had a personal mobile phone contract with your current provider?',
    options: [{
      correct: true,
      text: 'Less than 1 year ago',
    }, {
      correct: false,
      text: 'Between 1 and 3 years ago',
    }, {
      correct: false,
      text: 'Between 3 and 5 years ago',
    }, {
      correct: false,
      text: 'More than 5 years ago',
    }, {
      correct: false,
      text: 'I don\'t currently have one',
    }],
  }),
  KBV7Request: () => ({
    category: 'KBV7',
    questionText: 'Do you have a personal mobile phone contract registered to your current address?',
    options: [{
      correct: true,
      text: 'Yes',
    }, {
      correct: false,
      text: 'No',
    }],
  }),
  KBV8Request: () => ({
    category: 'KBV8',
    questionText: 'What is the current outstanding balance of your most recent mortgage?',
    options: [{
      correct: true,
      text: 'Less than £25,000 ',
    }, {
      correct: false,
      text: '£25,000 - £74,999 ',
    }, {
      correct: false,
      text: '£75,000 - £124,999',
    }, {
      correct: false,
      text: '£125,000 - £175,000',
    }, {
      correct: false,
      text: 'More than £175,000',
    }, {
      correct: false,
      text: 'I don\'t have one',
    }],
  }),
  KBV9Request: () => ({
    category: 'KBV9',
    questionText: 'You took out a mortgage in December 2020, what is the current outstanding balance?',
    options: [{
      correct: true,
      text: 'Less than £25,000 ',
    }, {
      correct: false,
      text: '£25,000 - £74,999 ',
    }, {
      correct: false,
      text: '£75,000 - £124,999',
    }, {
      correct: false,
      text: '£125,000 - £175,000',
    }, {
      correct: false,
      text: 'More than £175,000',
    }],
  }),
  KBV10Request: () => ({
    category: 'KBV10',
    questionText: 'Do you currently have a personal mortgage?',
    options: [{
      correct: true,
      text: 'Yes',
    }, {
      correct: false,
      text: 'No',
    }],
  }),
  KBV11Request: () => ({
    category: 'KBV11',
    questionText: 'Which one of the following addresses have you been associated with?',
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
      text: 'None of the above',
    }],
  }),
  KBV12Request: () => ({
    category: 'KBV12',
    questionText: 'How long have you been resident in your current address?',
    options: [{
      correct: true,
      text: 'Less than 1 year',
    }, {
      correct: false,
      text: 'Between 1 and 3 years',
    }, {
      correct: false,
      text: 'Between 3 and 5 years',
    }, {
      correct: false,
      text: 'Between 5 and 8 years',
    }, {
      correct: false,
      text: 'More than 8 years',
    }],
  }),
  KBV13Request: () => ({
    category: 'KBV13',
    questionText: 'You took out a credit card or store card in January 2021, Which card issuer was it with?',
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
  }),
  KBV14Request: () => ({
    category: 'KBV14',
    questionText: 'You opened a current account in January 2019, which provider was it with?',
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
  }),
  KBV15Request: () => ({
    category: 'KBV15',
    questionText: 'You opened a hire purchase in March 2019, which provider was it with?',
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
  }),
  KBV16Request: () => ({
    category: 'KBV16',
    questionText: 'You took out a personal loan in June 2019, which provider was it with?',
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
  }),
  KBV17Request: () => ({
    category: 'KBV17',
    questionText: 'You opened a mail order account in October 2019, which provider was it with?',
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
  }),
  KBV18Request: () => ({
    category: 'KBV18',
    questionText: 'You took out a mobile phone contract in May 2005, which provider was it with?',
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
  }),
  KBV19Request: () => ({
    category: 'KBV19',
    questionText: 'You took out a mortgage in December 2019, which provider was it with?',
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
  }),
  KBV20Request: () => ({
    category: 'KBV20',
    questionText: 'Which one of the following addresses have you been associated with?',
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
  }),
  KBV21Request: () => ({
    category: 'KBV21',
    questionText: 'What is your year of birth?',
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
  }),
  KBV22Request: () => ({
    category: 'KBV22',
    questionText: 'What is your month of birth?',
    options: [{
      correct: true,
      text: 'March',
    }, {
      correct: false,
      text: 'April',
    }, {
      correct: false,
      text: 'May',
    }, {
      correct: false,
      text: 'July',
    }, {
      correct: false,
      text: 'September',
    }],
  }),
  KBV29Request: () => ({
    category: 'KBV29',
    questionText: 'When did you last take out a personal loan?',
    options: [{
      correct: true,
      text: 'Less than 1 year ago',
    }, {
      correct: false,
      text: 'Between 1 and 3 years ago',
    }, {
      correct: false,
      text: 'Between 3 and 5 years ago',
    }, {
      correct: false,
      text: 'More than 5 years ago',
    }],
  }),
  KBV30Request: () => ({
    category: 'KBV30',
    questionText: 'When did you last take out a personal mobile phone contract?',
    options: [{
      correct: true,
      text: 'Less than 1 year ago',
    }, {
      correct: false,
      text: 'Between 1 and 3 years ago',
    }, {
      correct: false,
      text: 'Between 3 and 5 years ago',
    }, {
      correct: false,
      text: 'More than 5 years ago',
    }],
  }),
  KBV31Request: () => ({
    category: 'KBV31',
    questionText: 'When did you last take out a personal mortgage?',
    options: [{
      correct: true,
      text: 'Less than 2 years ago',
    }, {
      correct: false,
      text: 'Between 2 and 4 years ago',
    }, {
      correct: false,
      text: 'Between 4 and 6 years ago',
    }, {
      correct: false,
      text: 'More than 6 years ago',
    }],
  }),
  KBV32Request: () => ({
    category: 'KBV32',
    questionText: 'When did you last take out a personal credit card?',
    options: [{
      correct: true,
      text: 'Less than 1 year ago',
    }, {
      correct: false,
      text: 'Between 1 and 3 years ago',
    }, {
      correct: false,
      text: 'Between 3 and 5 years ago',
    }, {
      correct: false,
      text: 'Between 5 and 7 years ago',
    }, {
      correct: false,
      text: 'More than 7 years ago',
    }],
  }),
  KBV33Request: () => ({
    category: 'KBV33',
    questionText: 'When did you last open a personal current account?',
    options: [{
      correct: true,
      text: 'Less than 1 year ago',
    }, {
      correct: false,
      text: 'Between 1 and 3 years ago',
    }, {
      correct: false,
      text: 'Between 3 and 5 years ago',
    }, {
      correct: false,
      text: 'More than 5 years ago',
    }],
  }),
  KBV34Request: () => ({
    category: 'KBV34',
    questionText: 'When did you last take out a hire purchase agreement?',
    options: [{
      correct: true,
      text: 'Less than 2 years ago',
    }, {
      correct: false,
      text: 'Between 2 and 4 years ago',
    }, {
      correct: false,
      text: 'Between 4 and 6 years ago',
    }, {
      correct: false,
      text: 'More than 6 years ago',
    }],
  }),
  KBV35Request: () => ({
    category: 'KBV35',
    questionText: 'When did you last open a mail order account with a credit facility?',
    options: [{
      correct: true,
      text: 'Less than 2 years ago',
    }, {
      correct: false,
      text: 'Between 2 and 4 years ago',
    }, {
      correct: false,
      text: 'Between 4 and 6 years ago',
    }, {
      correct: false,
      text: 'Between 6 and 8 years ago',
    }, {
      correct: false,
      text: 'Between 8 and 10 years ago',
    }, {
      correct: false,
      text: 'More than 10 years ago',
    }],
  }),
  KBV36Request: () => ({
    category: 'KBV36',
    questionText: 'What is your month and year of birth?',
    options: [{
      correct: true,
      text: 'February 1943',
    }, {
      correct: false,
      text: 'October 1944',
    }, {
      correct: false,
      text: 'June 1947',
    }, {
      correct: false,
      text: 'May 1949',
    }, {
      correct: false,
      text: 'June 1950',
    }],
  }),
  KBV37Request: () => ({
    category: 'KBV37',
    questionText: 'You took out a credit card in May 2020, what was the credit limit on 16/02/2022?',
    options: [{
      correct: true,
      text: 'Less than £500',
    }, {
      correct: false,
      text: '£500 - £1,499',
    }, {
      correct: false,
      text: '£1,500 - £2,499',
    }, {
      correct: false,
      text: '£2,500 - £5,000',
    }, {
      correct: false,
      text: 'More than £5,000',
    }],
  }),
  KBV38Request: () => ({
    category: 'KBV38',
    questionText: 'You opened a current account in January 2018, what was the overdraft limit on 16/02/2022?',
    options: [{
      correct: true,
      text: 'Less than £150',
    }, {
      correct: false,
      text: '£150 - £299',
    }, {
      correct: false,
      text: '£300 - £749',
    }, {
      correct: false,
      text: '£750 - £1,500',
    }, {
      correct: false,
      text: 'More than £1,500',
    }],
  }),
};
