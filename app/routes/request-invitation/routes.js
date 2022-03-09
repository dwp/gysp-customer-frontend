const express = require('express');
const overseasAuth = require('../../../middleware/overseasAuth');

const FEATURE_BASE_URL = '/request-invitation-code';

const router = new express.Router();
router.use(FEATURE_BASE_URL, overseasAuth);
router.use(FEATURE_BASE_URL, require('./index/routes'));
router.use(FEATURE_BASE_URL, require('./name/routes'));
router.use(FEATURE_BASE_URL, require('./dob/routes'));
router.use(FEATURE_BASE_URL, require('./address/routes'));
router.use(FEATURE_BASE_URL, require('./cannot-request/routes'));

module.exports = router;
