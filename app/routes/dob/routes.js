const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/date-of-birth', functions.dobConfirm);
router.post('/date-of-birth', functions.dobConfirmRedirect);

router.get('/you-are-too-early-to-get-your-state-pension', functions.tooEarlyForPensionGet);
router.get('/call-us-to-get-your-state-pension', functions.beforePensionAgeGet);

router.get('/you-need-to-send-proof-of-your-date-of-birth', functions.dobProofGet);

module.exports = router;
