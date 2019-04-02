const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/complete', functions.completePage);

module.exports = router;
