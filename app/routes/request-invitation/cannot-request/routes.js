const express = require('express');

const router = new express.Router();
const { get } = require('./functions');

router.get('/cannot-request-code', get);

module.exports = router;
