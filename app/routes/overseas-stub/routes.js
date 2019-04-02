const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/overseas-stub/active', functions.getActive);
router.get('/overseas-stub/inactive', functions.getInactive);

module.exports = router;
