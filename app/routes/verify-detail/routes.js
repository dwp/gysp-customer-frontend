const express = require('express');

const router = new express.Router();
const functions = require('./functions');

router.get('/verify/your-details', functions.getVerifyDetails);
router.post('/verify/your-details', functions.postVerifyDetails);

router.get('/verify/auth-error', functions.getVerifyAuthError);

module.exports = router;
