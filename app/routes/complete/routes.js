const express = require('express');
const functions = require('./functions');
const auditAdapter = require('../../../middleware/auditAdapter');

const router = new express.Router();

router.get('/complete',
  [
    auditAdapter.fireEvent('E0900001', 'SUCCESSFUL_EVENT'),
    functions.completePage,
  ]);

module.exports = router;
