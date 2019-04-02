const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/process-claim', functions.procecssDataToBackend);

module.exports = router;
