const express = require('express');
const { get, post } = require('./functions');

const router = new express.Router();

router.get('/alt-formats-choose', get);
router.post('/alt-formats-choose', post);

module.exports = router;
