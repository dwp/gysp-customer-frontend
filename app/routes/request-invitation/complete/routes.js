const express = require('express');

const router = new express.Router();
const { get } = require('./functions');

router.get('/code-requested', get);

module.exports = router;
