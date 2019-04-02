const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/health', functions.endPoint);

module.exports = router;
