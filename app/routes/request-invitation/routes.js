const express = require('express');
const overseasAuth = require('../../../middleware/overseasAuth');
const inviteRequest = require('../../../middleware/inviteRequest');

const FEATURE_BASE_URL = '/request-invitation-code';

const router = new express.Router();
router.use(FEATURE_BASE_URL, [overseasAuth, inviteRequest]);
router.use(FEATURE_BASE_URL, require('./name/routes'));
router.use(FEATURE_BASE_URL, require('./dob/routes'));
router.use(FEATURE_BASE_URL, require('./cannot-request/routes'));
router.use(FEATURE_BASE_URL, require('./address/routes'));
router.use(FEATURE_BASE_URL, require('./address-choose/routes'));
router.use(FEATURE_BASE_URL, require('./address-not-found/routes'));
router.use(FEATURE_BASE_URL, require('./address-manual/routes'));
router.use(FEATURE_BASE_URL, require('./check-details/routes'));
router.use(FEATURE_BASE_URL, require('./cannot-send-code/routes'));
router.use(FEATURE_BASE_URL, require('./complete/routes'));
router.use(FEATURE_BASE_URL, require('./error/routes'));

module.exports = router;
