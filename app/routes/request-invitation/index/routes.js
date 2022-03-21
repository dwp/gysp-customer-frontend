const express = require('express');
const overseasAuth = require('../../../../middleware/overseasAuth');

const router = new express.Router();
const { get, getLanguage } = require('./functions');

router.get('/request-invitation-code', get);
router.get('/request-invitation-code/:language(en|cy)', overseasAuth, getLanguage);

module.exports = router;
