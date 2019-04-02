const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/your-state-pension-date', functions.statePensionAgeGet);

router.get('/revised-your-state-pension-date', functions.statePensionAgeRevisedGet);

module.exports = router;
