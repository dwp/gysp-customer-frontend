const express = require('express');
const overseasAuth = require('../../../lib/middleware/overseasAuth');

const router = new express.Router();
const functions = require('./functions');

router.get('/are-you-receiving-any-benefits', overseasAuth, functions.getBenefits);
router.post('/are-you-receiving-any-benefits', overseasAuth, functions.postBenefits);

module.exports = router;
