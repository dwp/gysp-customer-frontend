const express = require('express');

const router = new express.Router();
const { get } = require('./functions');

router.route('/home-address')
  .get(get);

module.exports = router;
