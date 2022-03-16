const express = require('express');

const router = new express.Router();
const { get } = require('./functions');

router.get('/no-addresses-found', get);

module.exports = router;
