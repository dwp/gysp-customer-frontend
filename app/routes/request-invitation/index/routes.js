const express = require('express');
const overseasAuth = require('../../../../middleware/overseasAuth');

const router = new express.Router();
const { get, post, getLanguage } = require('./functions');

router.route('/request-invitation-code')
  .get(get)
  .post(post);
router.get('/request-invitation-code/:language(en|cy)', overseasAuth, getLanguage);

module.exports = router;
