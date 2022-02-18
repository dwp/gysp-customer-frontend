const express = require('express');

const router = new express.Router();

router.get('/extra-checks', (_req, res) => {
  res.render('pages/account-additional-checks');
});

router.post('/extra-checks', (_req, res) => {
  res.redirect('security-question-1');
});

module.exports = router;
