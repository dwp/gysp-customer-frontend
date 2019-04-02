const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/check-your-details', functions.getCheckChange);

module.exports = router;
