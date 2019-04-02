const express = require('express');

const router = new express.Router();
const functions = require('./functions');

router.get('/auth', functions.authPageGet);
router.post('/auth', functions.authPageProcess);
router.get('/auth/:language', functions.languageGet);
router.get('/auth-error', functions.authError);

module.exports = router;
