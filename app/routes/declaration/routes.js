const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/declaration', functions.declarationGet);
router.post('/declaration', functions.declarationPost);

module.exports = router;
