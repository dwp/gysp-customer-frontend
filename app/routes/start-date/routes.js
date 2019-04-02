const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/when-do-you-want-your-state-pension', functions.getStatePensionStartDate);
router.post('/when-do-you-want-your-state-pension', functions.postStatePensionStartDate);

router.get('/your-claim-date', functions.getStatePensionStartDateError);

module.exports = router;
