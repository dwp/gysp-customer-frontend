const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/contact-details', functions.contactDetailsGet);
router.post('/contact-details', functions.contactDetailsPost);

module.exports = router;
