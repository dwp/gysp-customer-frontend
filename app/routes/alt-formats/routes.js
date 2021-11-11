const express = require('express');
const { get, post } = require('./functions');

const router = new express.Router();

router.get('/alt-formats', get);
router.post('/alt-formats', post);

module.exports = router;
