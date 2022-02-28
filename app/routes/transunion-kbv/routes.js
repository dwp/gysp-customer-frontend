const { Router } = require('express');
const {
  questionsGet, questionsPost, checkFailed, checkSuccessful, cannotGoBackToCreditRecordQuestions, cannotGoBackToAccountDetails,
} = require('./functions');

const router = new Router();

router.get('/security-question-:questionNum', questionsGet);
router.post('/security-question-:questionNum', questionsPost);
router.get('/could-not-confirm-identity', checkFailed);
router.get('/successfully-confirmed-identity', checkSuccessful);
router.get('/cannot-go-back-to-questions', cannotGoBackToCreditRecordQuestions);
router.get('/cannot-go-back', cannotGoBackToAccountDetails);

module.exports = router;
