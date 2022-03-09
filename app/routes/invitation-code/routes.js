const express = require('express');
const overseasAuth = require('../../../middleware/overseasAuth');

const router = new express.Router();
const functions = require('./functions');

// Redirect to handle old URL
router.all('/confirm-identity', (_req, res) => res.redirect(301, '/invitation-code'));
router.all('/confirm-identity/:language', (req, res) => res.redirect(301, `/invitation-code/${req.params.language}`));

router.get('/invitation-code', overseasAuth, functions.getInvitationCodeChoose);
router.post('/invitation-code', overseasAuth, functions.postInvitationCodeChoose);
router.get('/invitation-code/:language', overseasAuth, functions.getLanguage);

module.exports = router;
