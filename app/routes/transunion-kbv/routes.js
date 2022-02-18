const { Router } = require('express');
const {
  questionsGet, questionsPost, checkFailed, checkSuccessful,
} = require('./functions');

const router = new Router();

router.get('/security-question-:questionNum', questionsGet);
router.post('/security-question-:questionNum', questionsPost);
router.get('/could-not-confirm-identity', checkFailed);
router.get('/successfully-confirmed-identity', checkSuccessful);

module.exports = router;
