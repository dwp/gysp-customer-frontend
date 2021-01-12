const express = require('express');
const passport = require('passport');
const overseasAuth = require('../../../middleware/overseasAuth');

const router = new express.Router();
const functions = require('./functions');

router.get('/verify', overseasAuth, functions.getVerifyAbout);
router.get('/verify/start', overseasAuth, passport.authenticate('verify'));
router.post('/verify/response', overseasAuth, functions.postVerifyResponse);

router.get('/verify/cancel', overseasAuth, functions.getCancel);
router.get('/verify/no-match', overseasAuth, functions.getNoMatch);
router.get('/verify/you-are-too-early-to-get-your-state-pension', overseasAuth, functions.getTooEarlyForPension);
router.get('/verify/you-can-now-sign-in-with-govuk-verify', overseasAuth, functions.getSignInWithVerify);
router.get('/verify/you-can-now-sign-in-with-govuk-verify/:language', overseasAuth, functions.getSwitchLanguage);
router.post('/verify/you-can-now-sign-in-with-govuk-verify', overseasAuth, functions.postSignInWithVerify);

module.exports = router;
