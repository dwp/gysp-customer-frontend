const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/account-details', functions.accountPageGet);
router.post('/account-details', functions.accountPagePost);

module.exports = router;
