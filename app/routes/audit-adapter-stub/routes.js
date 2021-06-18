const express = require('express');
const config = require('../../../config/application');
const log = require('../../../config/logging')('customer-frontend', config.application.logs);

const router = new express.Router();

const auditEventLog = async (req, res) => {
  const { eventNumber } = req.params;
  log.error(`Event: ${eventNumber} - ${JSON.stringify(req.body)}`);
  res.sendStatus(201);
};
router.post('/api/v1/:eventNumber/audits', auditEventLog);

module.exports = router;
