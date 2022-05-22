const { assert } = require('chai');
const sandbox = require('sinon').createSandbox();
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');
const { StatusCodes } = require('http-status-codes');
const {
  questionsGet, SessionModel, questionsPost, checkSuccessful, checkFailed,
} = require('../../../app/routes/transunion-kbv/functions');
const responseHelper = require('../../lib/responseHelper');

const i18nextConfig = require('../../../config/i18next');

const reqWithQuestionsInSession = (questionNum = '1') => ({
  params: {
    questionNum,
  },
  body: {
  },
  get: () => {},
  session: {
    kbvQuestions: [{
      questions: [
        {
          category: 'KBV26',
          options: [
            {
              correct: false,
              text: 'Less than 1 year ago',
            },
            {
              correct: false,
              text: 'Between 1 and up to 3 years ago',
            },
            {
              correct: true,
              text: 'Over 3 and up to 5 years ago',
            },
            {
              correct: false,
              text: 'Over 5 years and up to 7 years ago',
            },
            {
              correct: false,
              text: 'Over 7 years ago',
            },
          ],
          questionText: 'When did you last open a personal current account?',
        },
      ],
    }],
    translatedKbvQuestions: [
      {
        question: 'When did you last open a personal current account?',
        orBeforeLastOption: true,
        options: [
          {
            correct: false,
            text: 'Less than 1 year ago',
          },
          {
            correct: false,
            text: 'Between 1 and up to 3 years ago',
          },
          {
            correct: true,
            text: 'Over 3 and up to 5 years ago',
          },
          {
            correct: false,
            text: 'Over 5 years and up to 7 years ago',
          },
          {
            correct: false,
            text: 'Over 7 years ago',
          },
        ],
        error: 'Select when you last took out a personal current account',
      },
    ],
  },
});

const reqWithMultipleQuestionsInSession = (questionNum = '1', selection = 'option-0') => Object.assign(Object.create(null), reqWithQuestionsInSession(questionNum), {
  body: {
    [`securityQuestion${questionNum}`]: selection,
  },
  session: {
    kbvQuestions: [
      {
        category: 'KBV21',
        questionText: 'What is your year of birth?',
        options: [
          {
            text: '1983',
            correct: false,
          },
          {
            text: '1987',
            correct: false,
          },
          {
            text: '1990',
            correct: false,
          },
          {
            text: '1991',
            correct: true,
          },
          {
            text: '1992',
            correct: false,
          },
        ],
      },
      {
        category: 'KBV22',
        questionText: 'What is your month of birth?',
        options: [
          {
            text: 'March',
            correct: true,
          },
          {
            text: 'April',
            correct: false,
          },
          {
            text: 'May',
            correct: false,
          },
          {
            text: 'July',
            correct: false,
          },
          {
            text: 'September',
            correct: false,
          },
        ],
      },
    ],
    translatedKbvQuestions: [
      {
        question: 'What is your year of birth?',
        orBeforeLastOption: true,
        options: [
          {
            text: '1983',
            correct: true,
          },
          {
            text: '1987',
            correct: false,
          },
          {
            text: '1990',
            correct: false,
          },
          {
            text: '1991',
            correct: false,
          },
          {
            text: '1992',
            correct: false,
          },
        ],
        error: 'Select your year of birth',
      },
      {
        question: 'What is your month of birth?',
        orBeforeLastOption: true,
        options: [
          {
            text: 'March',
            correct: true,
          },
          {
            text: 'April',
            correct: false,
          },
          {
            text: 'May',
            correct: false,
          },
          {
            text: 'July',
            correct: false,
          },
          {
            text: 'September',
            correct: false,
          },
        ],
        error: 'Select your month of birth',
      },
    ],
  },
});

let genericResponse;

describe('transunion kbv journey', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('  questionsGet', () => {
    it('should return question page with question and answers taken from session', () => {
      const req = reqWithQuestionsInSession();
      sandbox.stub(req, 'get').returns('extra-checks');
      questionsGet(req, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-question');
      assert.deepEqual(
        genericResponse.data,
        {
          caption: 'Question 1 of 1',
          options: [
            {
              checked: false,
              text: 'Less than 1 year ago',
              value: 'option-0',
            },
            {
              checked: false,
              text: 'Between 1 and up to 3 years ago',
              value: 'option-1',
            },
            {
              checked: false,
              text: 'Over 3 and up to 5 years ago',
              value: 'option-2',
            },
            {
              checked: false,
              text: 'Over 5 years and up to 7 years ago',
              value: 'option-3',
            },
            {
              divider: 'or',
            },
            {
              checked: false,
              text: 'Over 7 years ago',
              value: 'option-4',
            },
          ],
          questionNum: '1',
          questionText: 'When did you last open a personal current account?',
        },
      );
    });

    it('should return error page if requested questionNum is greater than num questions in session', () => {
      const req = reqWithQuestionsInSession('2');
      sandbox.stub(req, 'get').returns('extra-checks');

      questionsGet(req, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/error');
      assert.deepEqual(genericResponse.data, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    });

    it('should redirect to "/" page if request originated from any page other than security-question-* and extra-checks', () => {
      const req = reqWithQuestionsInSession();
      sandbox.stub(req, 'get').returns('extra-foo');

      questionsGet(req, genericResponse);
      assert.equal(genericResponse.address, '/');
    });

    it('should redirect to "/" page if questions are not in session', () => {
      const req = reqWithQuestionsInSession();
      delete req.session.translatedKbvQuestions;

      sandbox.stub(req, 'get').returns('extra-checks');

      questionsGet(req, genericResponse);
      assert.equal(genericResponse.address, '/');
    });

    it('should render the page with data from session if an answer has been selected already for this questionNum (going back journey)', () => {
      const req = reqWithQuestionsInSession();
      sandbox.stub(req, 'get').returns('extra-checks');
      req.session['security-question-1'] = new SessionModel('option-0', 1, req.session.translatedKbvQuestions);

      questionsGet(req, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-question');

      const optionExpectedToBeChecked = genericResponse.data.options[0].checked;
      assert.isTrue(optionExpectedToBeChecked);
      assert.deepEqual(genericResponse.data, {
        caption: 'Question 1 of 1',
        options: [
          {
            checked: true,
            text: 'Less than 1 year ago',
            value: 'option-0',
          },
          {
            checked: false,
            text: 'Between 1 and up to 3 years ago',
            value: 'option-1',
          },
          {
            checked: false,
            text: 'Over 3 and up to 5 years ago',
            value: 'option-2',
          },
          {
            checked: false,
            text: 'Over 5 years and up to 7 years ago',
            value: 'option-3',
          },
          {
            divider: 'or',
          },
          {
            checked: false,
            text: 'Over 7 years ago',
            value: 'option-4',
          },
        ],
        questionNum: '1',
        questionText: 'When did you last open a personal current account?',
      });
    });
  });

  describe('  questionsPost', () => {
    it('should return the page with error fields populated when none of the options were selected', () => {
      const req = reqWithQuestionsInSession();

      questionsPost(req, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-question');
      assert.deepEqual(genericResponse.data, {
        caption: 'Question 1 of 1',
        errors: {
          errorSummary: [
            {
              href: '#securityQuestion1',
              text: 'Select when you last took out a personal current account',
            },
          ],
          notSelected: {
            text: 'Select when you last took out a personal current account',
            visuallyHiddenText: 'Select when you last took out a personal current account',
          },
        },
        options: [
          {
            checked: false,
            text: 'Less than 1 year ago',
            value: 'option-0',
          },
          {
            checked: false,
            text: 'Between 1 and up to 3 years ago',
            value: 'option-1',
          },
          {
            checked: false,
            text: 'Over 3 and up to 5 years ago',
            value: 'option-2',
          },
          {
            checked: false,
            text: 'Over 5 years and up to 7 years ago',
            value: 'option-3',
          },
          {
            divider: 'or',
          },
          {
            checked: false,
            text: 'Over 7 years ago',
            value: 'option-4',
          },
        ],
        questionNum: '1',
        questionText: 'When did you last open a personal current account?',
      });
    });

    it('should redirect to "next" question page after saving selection for "previous" question, when one of the option is selected and its not the last question page', () => {
      const req = reqWithMultipleQuestionsInSession();

      questionsPost(req, genericResponse);
      assert.equal(genericResponse.address, 'security-question-2');
      assert.deepEqual(req.session['security-question-1'].selection, 'option-0');
    });

    it('should redirect to "successfully-confirmed-identity", when one of the option is selected and its the last question page (question 2) and atleast 2 answers are correct', () => {
      const req = reqWithMultipleQuestionsInSession('2');
      req.session['security-question-1'] = new SessionModel('option-0', 1, req.session.translatedKbvQuestions);
      req.session['account-details'] = {};
      req.session.accountStatus = {
        result: 'ADDITIONALCHECKS',
        messages: ['foo1'],
      };

      questionsPost(req, genericResponse);
      assert.equal(genericResponse.address, 'successfully-confirmed-identity');
      assert.deepEqual(req.session['security-question-2'].selection, 'option-0');
      assert.equal(req.session.accountStatus.result, 'Pass');
      assert.equal(req.session.accountStatus.messages.length, 1);
      assert.deepEqual(req.session.accountStatus.messages, ['foo1']);
    });

    it('should redirect to "could-not-confirm-identity", when one of the option is selected and its the last question page (question 2) and less than 2 answers are correct', () => {
      const req = reqWithMultipleQuestionsInSession('2', 'option-1');
      req.session['security-question-1'] = new SessionModel('option-0', 1, req.session.translatedKbvQuestions);
      req.session['account-details'] = {};
      req.session.accountStatus = {
        result: 'ADDITIONALCHECKS',
        messages: ['foo1'],
      };

      questionsPost(req, genericResponse);
      assert.equal(genericResponse.address, 'could-not-confirm-identity');
      assert.deepEqual(req.session['security-question-2'].selection, 'option-1');
      assert.equal(req.session.accountStatus.result, 'Fail');
      assert.equal(req.session.accountStatus.messages.length, 1);
      assert.deepEqual(req.session.accountStatus.messages, ['foo1']);
    });
  });

  describe('  checkSuccessful', () => {
    it('should redirect user to "check-your-details" when DoB is verified', () => {
      const req = {
        session: {
          userDateOfBirthInfo: {
            newStatePensionDate: new Date(), // dummy
            newDobVerification: 'V',
          },
        },
      };

      checkSuccessful(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-passed');
      assert.equal(genericResponse.data.redirectUrl, 'check-your-details');
    });

    it('should redirect user to "you-need-to-send-proof-of-your-date-of-birth" when DoB is not verified', () => {
      const req = {
        session: {
          userDateOfBirthInfo: {
            newStatePensionDate: new Date(), // dummy
            newDobVerification: 'NV',
          },
        },
      };

      checkSuccessful(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-passed');
      assert.equal(genericResponse.data.redirectUrl, 'you-need-to-send-proof-of-your-date-of-birth');
    });

    it('should redirect user to "check-your-details" when user entered DoB is missing as customer has DoB verified set already', () => {
      const req = {
        session: {
          customerDetails: {
            dobVerified: 'V',
          },
        },
      };

      checkSuccessful(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-passed');
      assert.equal(genericResponse.data.redirectUrl, 'check-your-details');
    });

    it('should redirect user to "you-need-to-send-proof-of-your-date-of-birth" when user entered DoB is missing', () => {
      const req = {
        session: {
          userDateOfBirthInfo: {
            newStatePensionDate: new Date(), // dummy
          },
        },
      };

      checkSuccessful(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-passed');
      assert.equal(genericResponse.data.redirectUrl, 'you-need-to-send-proof-of-your-date-of-birth');
    });
  });

  describe('  checkFailed', () => {
    it('should redirect user to "check-your-details" when user entered DoB matches DoB held against the customer', () => {
      const req = {
        session: {
          userDateOfBirthInfo: {
            newStatePensionDate: new Date(), // dummy
            newDobVerification: 'V',
          },
        },
      };

      checkFailed(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-failed');
      assert.equal(genericResponse.data.redirectUrl, 'check-your-details');
    });

    it('should redirect user to "you-need-to-send-proof-of-your-date-of-birth" when user entered DoB is not verified', () => {
      const req = {
        session: {
          userDateOfBirthInfo: {
            newStatePensionDate: new Date(), // dummy
            newDobVerification: 'NV',
          },
        },
      };

      checkFailed(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-failed');
      assert.equal(genericResponse.data.redirectUrl, 'you-need-to-send-proof-of-your-date-of-birth');
    });

    it('should redirect user to "check-your-details" when user entered DoB is missing as customer has DoB verified flag set already', () => {
      const req = {
        session: {
          customerDetails: {
            dobVerified: 'V',
          },
        },
      };

      checkFailed(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-failed');
      assert.equal(genericResponse.data.redirectUrl, 'check-your-details');
    });

    it('should redirect user to "you-need-to-send-proof-of-your-date-of-birth" when user entered DoB is missing', () => {
      const req = {
        session: {
          userDateOfBirthInfo: {
            newStatePensionDate: new Date(), // dummy
          },
        },
      };

      checkFailed(req, genericResponse);

      assert.equal(genericResponse.viewName, 'pages/transunion-kbv-check-failed');
      assert.equal(genericResponse.data.redirectUrl, 'you-need-to-send-proof-of-your-date-of-birth');
    });
  });
});
