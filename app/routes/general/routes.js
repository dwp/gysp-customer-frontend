const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.all('/', functions.redirectToStart);
router.get('/sign-out', functions.signOut);
router.get('/accessibility-statement', functions.accessibilityStatement);

module.exports = router;
