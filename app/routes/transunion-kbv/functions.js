/* eslint-disable max-classes-per-file */
const { StatusCodes } = require('http-status-codes');
const i18n = require('i18next');
const dataStore = require('../../../lib/dataStore');
const bankVerificationStatus = require('../../../lib/helpers/bankVerificationStatus');
const { generateGlobalErrorGenericField } = require('../../../lib/utils/errorHelper');

const buildGovukOptions = (options, orBeforeLastOption, selection) => {
  const govukOptionItems = [];
  for (let i = 0; i < options.length; i++) {
    const genericOptionName = `option-${i}`;
    const isLastItem = i === options.length - 1;
    const option = options[i];
    if (isLastItem && orBeforeLastOption) {
      govukOptionItems.push({
        divider: i18n.t('transunion-kbv-questions:or'),
      });
    }
    govukOptionItems.push({
      text: option.text,
      value: genericOptionName,
      checked: selection === genericOptionName,
    });
  }
  return govukOptionItems;
};

const checkAnswerIsCorrect = (allTranslatedQs, currentQuestionNum, currentSelectedOption) => {
  const fullQuestionObj = allTranslatedQs[currentQuestionNum - 1];
  const selectedOptionIndex = parseInt(currentSelectedOption.split('option-')[1], 10);
  const correctAnswerOptionIndex = fullQuestionObj.options.findIndex((option) => option.correct);
  return selectedOptionIndex === correctAnswerOptionIndex;
};

const checkAtleastTwoAnswersAreCorrect = (req) => {
  const sessionKeys = [1, 2, 3].map((questionNum) => `security-question-${questionNum}`);
  const numCorrectAnswers = sessionKeys.map((key) => req.session[key]).filter((val) => val && val.isCorrect);
  return numCorrectAnswers.length >= 2;
};

const handleLastQuestionActions = (req, res) => {
  const atleastTwoCorrect = checkAtleastTwoAnswersAreCorrect(req);
  const details = dataStore.getAll(req);
  const accountDetails = details['account-details'];
  accountDetails.kbvFlag = true;
  accountDetails.kbvPassed = atleastTwoCorrect;
  // NB: This `kbvAnswered` flag is used in middleware to decide
  //     if user should be allowed to return to `kbv` questions
  dataStore.save(req, 'kbvAnswered', true);

  const { accountStatus } = details;
  if (atleastTwoCorrect) {
    accountStatus.result = bankVerificationStatus.pass();
    return res.redirect('successfully-confirmed-identity');
  }
  accountStatus.result = bankVerificationStatus.badRequest();
  return res.redirect('could-not-confirm-identity');
};

const isReqFromExpectedPages = (req) => {
  const referer = req.get('Referer');
  const expectedFromPaths = ['extra-checks', 'security-question-'];
  const reqFromExpectedPaths = expectedFromPaths.filter((path) => referer.includes(path));
  return reqFromExpectedPaths.length > 0;
};

const isDateOfBirthNotVerified = (req) => {
  if (req.session.userDateOfBirthInfo
  && req.session.userDateOfBirthInfo.newStatePensionDate) {
    return req.session.userDateOfBirthInfo.newDobVerification !== 'V';
  }
  // returning false here means DoB verified (double negative unfortunately, but same logic as in account/functions)
  // since there are 2 different ways to 'verify' DoB (one through customer details) and another through
  // user entering the same DoB (held against the customer as 'not verified') it's easier to do the 'not
  // verified' check as anything other than that specific scenario can all be treated as 'verified' DoB.
  return false;
};

const getRedirectUrlBasedOnDateOfBirthVerificationStatus = (req) => {
  const redirectUrl = isDateOfBirthNotVerified(req) ? 'you-need-to-send-proof-of-your-date-of-birth' : 'check-your-details';
  return {
    redirectUrl,
  };
};

const showKBVDecisionPage = (viewName) => (req, res) => res.render(viewName,
  getRedirectUrlBasedOnDateOfBirthVerificationStatus(req));

class ViewModel {
  constructor(question, questionNumString, maxNumQuestions, error, selected) {
    const q = i18n.t('transunion-kbv-questions:caption.question');
    const of = i18n.t('transunion-kbv-questions:caption.of');

    this.questionText = question.question;
    this.options = buildGovukOptions(question.options, question.orBeforeLastOption, selected);
    this.questionNum = questionNumString;
    this.caption = `${q} ${questionNumString} ${of} ${maxNumQuestions}`;
    if (error) {
      const globalErrorMessage = generateGlobalErrorGenericField('kbvQuestion',
        `securityQuestion${questionNumString}`,
        error,
        'kbv-journey');
      this.errors = {
        errorSummary: [globalErrorMessage],
        notSelected: {
          text: error,
          visuallyHiddenText: error,
        },
      };
    }
  }
}

class SessionModel {
  constructor(selection, questionNum, translatedKbvQuestions) {
    this.selection = selection;
    this.isCorrect = checkAnswerIsCorrect(translatedKbvQuestions, questionNum, selection);
  }
}

const questionsGet = (req, res) => {
  const { questionNum } = req.params;
  const { translatedKbvQuestions: translated } = req.session;

  const kbvQuestionsNotInSession = translated === undefined;
  if (kbvQuestionsNotInSession || !isReqFromExpectedPages(req)) {
    return res.redirect('/');
  }

  const intQuestionNum = questionNum && parseInt(questionNum, 10);
  const maxNumQuestions = translated.length;
  const isQuestionInRange = intQuestionNum > 0 && intQuestionNum <= (maxNumQuestions + 1);

  if (isQuestionInRange) {
    const question = translated[intQuestionNum - 1];
    if (question) {
      const { selection } = req.session[`security-question-${questionNum}`] || {};
      const model = new ViewModel(question, questionNum, maxNumQuestions, undefined, selection);
      return res.render('pages/transunion-kbv-question', model);
    }
  }
  return res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
};

const questionsPost = (req, res) => {
  const { questionNum } = req.params;
  const { translatedKbvQuestions: translated } = req.session;
  const selection = req.body[`securityQuestion${questionNum}`];
  const intQuestionNum = parseInt(questionNum, 10);

  if (translated && Array.isArray(translated)) {
    const maxNumQuestions = translated.length;
    const isEmptySelection = selection === undefined;

    if (isEmptySelection) {
      const question = translated[intQuestionNum - 1];
      const { error } = question;
      const model = new ViewModel(question, questionNum, maxNumQuestions, error);
      return res.render('pages/transunion-kbv-question', model);
    }

    dataStore.save(req, `security-question-${questionNum}`,
      new SessionModel(selection, intQuestionNum, translated));
    const isLastQuestion = intQuestionNum === maxNumQuestions;

    if (isLastQuestion) {
      return handleLastQuestionActions(req, res);
    }

    const nextQuestionNum = intQuestionNum + 1;
    if (nextQuestionNum <= maxNumQuestions) {
      return res.redirect(`security-question-${nextQuestionNum}`);
    }
  }
  return res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
};

const checkFailed = showKBVDecisionPage('pages/transunion-kbv-check-failed');

const checkSuccessful = showKBVDecisionPage('pages/transunion-kbv-check-passed');

const findUrlBasedOnKBVSuccessOrFailure = (req) => {
  const details = dataStore.getAll(req);
  const accountDetails = details['account-details'];
  if (accountDetails && accountDetails.kbvFlag && accountDetails.kbvPassed) {
    return 'successfully-confirmed-identity';
  }
  return 'could-not-confirm-identity';
};

const cannotGoBackToCreditRecordQuestions = (req, res) => {
  const redirectUrl = findUrlBasedOnKBVSuccessOrFailure(req);
  res.render('pages/cannot-go-back-to-credit-questions', {
    redirectUrl,
  });
};

const cannotGoBackToAccountDetails = (_req, res) => {
  res.render('pages/cannot-go-back-to-account-details', {});
};

module.exports = {
  questionsGet,
  questionsPost,
  checkFailed,
  checkSuccessful,
  SessionModel,
  cannotGoBackToCreditRecordQuestions,
  cannotGoBackToAccountDetails,
};
