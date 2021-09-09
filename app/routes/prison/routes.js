const express = require('express');

const router = new express.Router();
const functions = require('./functions');

router.route('/have-you-spent-any-time-in-prison')
  .get(functions.getPrison)
  .post(functions.postPrison);

module.exports = router;
