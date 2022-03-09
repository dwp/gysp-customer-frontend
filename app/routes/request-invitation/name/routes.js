const express = require('express');

const router = new express.Router();
const { get, post } = require('./functions');

router.route('/your-name')
  .get(get)
  .post(post);

module.exports = router;
