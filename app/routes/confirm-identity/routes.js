const express = require('express');
const overseasAuth = require('../../../middleware/overseasAuth');

const router = new express.Router();
const functions = require('./functions');

router.get('/confirm-identity', overseasAuth, functions.getConfirmIdentity);
router.post('/confirm-identity', overseasAuth, functions.postConfirmIdentity);
router.get('/confirm-identity/:language', overseasAuth, functions.getLanguage);

module.exports = router;
