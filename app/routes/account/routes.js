const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/account-details', functions.accountPageGet);
router.get('/cannot-pay-money-to-account', (req, res) => res.render('pages/cannot-pay-money-to-account',
  { details: req.session['account-details'] }));
router.post('/account-details', functions.accountPagePost);

module.exports = router;
