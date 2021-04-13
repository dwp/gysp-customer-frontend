const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/session-keep-alive', functions.getSessionKeepAlive);
router.get('/session-timeout/:language?', functions.getSessionTimeout);

module.exports = router;
