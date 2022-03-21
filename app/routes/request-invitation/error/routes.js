const express = require('express');

const router = new express.Router();
const { get } = require('./functions');

router.get('/problem-with-the-service', get);

module.exports = router;
