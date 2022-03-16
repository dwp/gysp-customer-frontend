const express = require('express');

const router = new express.Router();
const { get, post } = require('./functions');

router.route('/confirm-full-address')
  .get(get)
  .post(post);

module.exports = router;
