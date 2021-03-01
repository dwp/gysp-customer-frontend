const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.route('/cookie-policy')
  .get(functions.getCookiePage)
  .post(functions.postCookiePage);

module.exports = router;
