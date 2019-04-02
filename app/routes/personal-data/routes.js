const express = require('express');
const overseasAuth = require('../../../lib/middleware/overseasAuth');

const router = new express.Router();
const functions = require('./functions');

router.get('/personal-data', overseasAuth, functions.getPersonalData);
router.post('/personal-data', overseasAuth, functions.postPersonalData);

module.exports = router;
